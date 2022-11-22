import type { NotificationProps } from "@mantine/notifications";

import InformationCircleIcon from "~icons/heroicons/information-circle-20-solid";
import ExclamationTriangleIcon from "~icons/heroicons/exclamation-triangle-20-solid";

export const showAlert = (props: NotificationProps) => {
  showNotification({
    color: "red",
    icon: <ExclamationTriangleIcon />,
    ...props,
  });
};

export const showNotice = (props: NotificationProps) => {
  showNotification({
    color: "indigo",
    icon: <InformationCircleIcon />,
    ...props,
  });
};
