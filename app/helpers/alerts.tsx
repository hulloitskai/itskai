import { type ExternalToast } from "sonner";

export interface ToastChangesSavedProps extends ExternalToast {
  to: string;
}

export const toastChangesSaved = ({
  to,
  ...options
}: ToastChangesSavedProps): void => {
  toast.success("changes saved", {
    description: `updated ${to}.`,
    ...options,
  });
};
