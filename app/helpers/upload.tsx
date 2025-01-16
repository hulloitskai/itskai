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
  const [state, setState] = useState<UploadState>(() => ({
    blob: null,
    error: null,
    progress: 0,
    uploading: false,
    cancel: () => {},
  }));
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const upload = useCallback((file: File): Promise<Blob> => {
    const { onProgress, onCompleted, onError, failSilently } =
      paramsRef.current;
    const sizeLimitValue = getMeta("active-storage-direct-uploads-size-limit");
    const sizeLimit = sizeLimitValue ? parseInt(sizeLimitValue) : null;
    if (typeof sizeLimit === "number" && file.size > sizeLimit) {
      toast.error(`File '${file.name}' is too large`, {
        description: `The maximum file size is ${prettyBytes(sizeLimit)}.`,
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
            toast.error(`Failed to upload file '${file.name}'`, {
              description: error.message,
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
  }, []);
  return [upload, state];
};

export const useUpload = (
  file: File,
  params?: UseUploadParams,
): UploadState => {
  const [upload, state] = useLazyUpload(params);
  const uploadStartedRef = useRef(false);
  useEffect(() => {
    if (!uploadStartedRef.current) {
      uploadStartedRef.current = true;
      void upload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
