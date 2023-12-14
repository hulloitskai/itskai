import { useReactMediaRecorder } from "react-media-recorder?client";
import type {
  ReactMediaRecorderHookProps,
  ReactMediaRecorderRenderProps,
} from "react-media-recorder";

export type MediaRecorderOptions = ReactMediaRecorderHookProps;
export type MediaRecorder = ReactMediaRecorderRenderProps;

export const useMediaRecorder = (
  options: MediaRecorderOptions,
): Pick<MediaRecorder, "status" | "startRecording" | "stopRecording"> => {
  if (typeof useReactMediaRecorder !== "undefined") {
    return useReactMediaRecorder(options); // eslint-disable-line react-hooks/rules-of-hooks
  }
  return { status: "idle", startRecording: () => {}, stopRecording: () => {} };
};
