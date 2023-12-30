import type { Blob } from "@rails/activestorage";
import { DirectUpload } from "@rails/activestorage?client";

import { requireMeta } from "./meta";

export type UseUploadParams = {
  readonly onProgress?: (progress: number) => void;
  readonly onCompleted?: (blob: Blob) => void;
  readonly onError?: (error: Error) => void;
};

export type UploadState = {
  readonly blob: Blob | null;
  readonly error: Error | null;
  readonly progress: number;
  readonly uploading: boolean;
  readonly cancel: () => void;
};

export const useLazyUpload = (
  params?: UseUploadParams,
): [(file: File) => Promise<Blob>, UploadState] => {
  const { onProgress, onCompleted, onError } = params ?? {};
  const [state, setState] = useState<UploadState>(() => ({
    blob: null,
    error: null,
    progress: 0,
    uploading: false,
    cancel: () => {},
  }));
  const upload = useCallback((file: File): Promise<Blob> => {
    setState(prevState => {
      if (prevState.uploading) {
        prevState.cancel();
      }
      return {
        blob: null,
        error: null,
        progress: 0,
        uploading: false,
        cancel: () => {},
      };
    });
    const url = requireMeta("active-storage-direct-uploads-url");
    const upload = new DirectUpload(file, url, {
      directUploadWillStoreFileWithXHR: request => {
        request.upload.addEventListener("progress", event => {
          const { loaded, total } = event;
          const progress = (loaded / total) * 100;
          setState(prevState => ({
            ...prevState,
            progress,
            cancel: () => {
              request.abort();
              setState({
                blob: null,
                error: null,
                progress: 0,
                uploading: false,
                cancel: () => {},
              });
            },
          }));
          onProgress?.(progress);
        });
      },
    });
    return new Promise((resolve, reject) => {
      upload.create((error, blob) => {
        if (error) {
          console.error(
            `Error uploading file '${file.name}'`,
            formatJSON({ error }),
          );
          setState(prevState => ({
            ...prevState,
            error,
            blob: null,
            uploading: false,
            cancel: () => {},
          }));
          reject(error);
          onError?.(error);
        } else {
          setState({
            blob,
            error: null,
            uploading: false,
            progress: 100,
            cancel: () => {},
          });
          resolve(error);
          onCompleted?.(blob);
        }
      });
    });
  }, []);
  return [upload, state];
};

export const useUpload = (
  file: File,
  params?: UseUploadParams,
): UploadState => {
  const [upload, state] = useLazyUpload(params);
  useEffect(() => {
    upload(file);
  }, [file]);
  return state;
};
