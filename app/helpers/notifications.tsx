import { type NotificationData } from "@mantine/notifications";
import { showNotification } from "@mantine/notifications";

import ExclamationTriangleIcon from "~icons/heroicons/exclamation-triangle-20-solid";
import InformationCircleIcon from "~icons/heroicons/information-circle-20-solid";

export const showAlert = (props: NotificationData): void => {
  showNotification({
    color: "red",
    icon: <ExclamationTriangleIcon />,
    ...props,
  });
};

export const showNotice = (props: NotificationData): void => {
  showNotification({
    color: "primary",
    icon: <InformationCircleIcon />,
    ...props,
  });
};

export const showSuccessNotice = (props: NotificationData): void => {
  showNotification({
    color: "green",
    icon: <SuccessIcon />,
    ...props,
  });
};

export interface ShowChangesSavedNoticeProps
  extends Omit<NotificationData, "title" | "message"> {
  to: string;
}

export const showChangesSavedNotice = ({
  to,
  ...otherProps
}: ShowChangesSavedNoticeProps): void => {
  showSuccessNotice({
    title: "Changes saved",
    message: `Updated ${to}.`,
    ...otherProps,
  });
};
