import { showNotification } from "@mantine/notifications";
import type { NotificationData } from "@mantine/notifications";

import InformationCircleIcon from "~icons/heroicons/information-circle-20-solid";
import ExclamationTriangleIcon from "~icons/heroicons/exclamation-triangle-20-solid";

export const showAlert = (props: NotificationData) => {
  showNotification({
    color: "red",
    icon: <ExclamationTriangleIcon />,
    ...props,
  });
};

export const showNotice = (props: NotificationData) => {
  showNotification({
    color: "primary",
    icon: <InformationCircleIcon />,
    ...props,
  });
};
