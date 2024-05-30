import type { Blob } from "@rails/activestorage";
import { DirectUpload } from "@rails/activestorage?client";

import { requireMeta } from "./meta";

export type UseUploadParams = {
  onProgress?: (progress: number) => void;
  onCompleted?: (blob: Blob) => void;
  onError?: (error: Error) => void;
};

export type UploadState = {
  blob: Blob | null;
  error: Error | null;
  progress: number;
  uploading: boolean;
  cancel: () => void;
};

export const useLazyUpload = (
  params: UseUploadParams = {},
): [(file: File) => Promise<Blob>, UploadState] => {
  const [state, setState] = useState<UploadState>(() => ({
    blob: null,
    error: null,
    progress: 0,
    uploading: false,
    cancel: () => {},
  }));
  const upload = useCallback(
    (file: File): Promise<Blob> => {
      const { onProgress, onCompleted, onError } = params;
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
    },
    [] /* eslint-disable-line react-hooks/exhaustive-deps */,
  );
  return [upload, state];
};

export const useUpload = (
  file: File,
  params?: UseUploadParams,
): UploadState => {
  const [upload, state] = useLazyUpload(params);
  useEffect(() => {
    upload(file);
  }, [upload, file]);
  return state;
};

export const upload = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const url = requireMeta("active-storage-direct-uploads-url");
    const upload = new DirectUpload(file, url);
    upload.create((error, blob) => {
      if (error) {
        console.error(
          `Error uploading file '${file.name}'`,
          formatJSON({ error }),
        );
        reject(error);
      } else {
        resolve(blob);
      }
    });
  });
};
