import { type Blob } from "@rails/activestorage";
import { DirectUpload } from "@rails/activestorage?client";
import prettyBytes from "pretty-bytes";

import { requireMeta } from "./meta";

export interface UseUploadParams {
  onProgress?: (progress: number) => void;
  onCompleted?: (blob: Blob) => void;
  onError?: (error: Error) => void;
  failSilently?: boolean;
}

export interface UploadState {
  blob: Blob | null;
  error: Error | null;
  progress: number;
  uploading: boolean;
  cancel: () => void;
}

export const useLazyUpload = (
  params: UseUploadParams = {},
): [(file: File) => Promise<Blob>, UploadState] => {
  const url = requireMeta("active-storage-direct-uploads-url");
  const [state, setState] = useState<UploadState>(() => ({
    blob: null,
    error: null,
    progress: 0,
    uploading: false,
    cancel: () => {},
  }));
  const sizeLimit = useMemo(() => {
    const limit = getMeta("active-storage-direct-uploads-size-limit");
    return limit ? parseInt(limit) : null;
  }, []);
  const upload = useCallback(
    (file: File): Promise<Blob> => {
      const { onProgress, onCompleted, onError, failSilently } = params;
      if (typeof sizeLimit === "number" && file.size > sizeLimit) {
        showAlert({
          title: <>File "{file.name}" is too large</>,
          message: `The maximum file size is ${prettyBytes(sizeLimit)}.`,
        });
        const error = fileSizeLimitExceededError(sizeLimit);
        onError?.(error);
        return Promise.reject(error);
      }
      setState(prevState => {
        if (prevState.uploading) {
          prevState.cancel();
        }
        return {
          blob: null,
          error: null,
          progress: 0,
          uploading: true,
          cancel: () => {},
        };
      });
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
            console.error(`Error uploading file "${file.name}"`, error);
            setState(prevState => ({
              ...prevState,
              error,
              blob: null,
              uploading: false,
              progress: 0,
              cancel: () => {},
            }));
            reject(error);
            onError?.(error);
            if (!failSilently) {
              showAlert({
                title: `Failed to upload file "${file.name}"`,
                message: error.message,
              });
            }
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
  const sizeLimitString = getMeta("active-storage-direct-uploads-size-limit");
  if (sizeLimitString) {
    const sizeLimit = parseInt(sizeLimitString, 10);
    if (file.size > sizeLimit) {
      throw fileSizeLimitExceededError(sizeLimit);
    }
  }
  return new Promise((resolve, reject) => {
    const url = requireMeta("active-storage-direct-uploads-url");
    const upload = new DirectUpload(file, url);
    upload.create((error, blob) => {
      if (error) {
        console.error(`Error uploading file '${file.name}'`, error);
        reject(error);
      } else {
        resolve(blob);
      }
    });
  });
};

const fileSizeLimitExceededError = (limit: number): Error =>
  new Error(`File size exceeds limit of ${prettyBytes(limit)}`);
