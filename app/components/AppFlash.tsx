import type { FC } from "react";
import type { NotificationProps } from "@mantine/notifications";

import InformationCircleIcon from "~icons/heroicons/information-circle-20-solid";
import ExclamationTriangleIcon from "~icons/heroicons/exclamation-triangle-20-solid";

const NOTIFICATION_PROPS: Record<string, Partial<NotificationProps>> = {
  notice: { color: "indigo", icon: <InformationCircleIcon /> },
  alert: { color: "red", icon: <ExclamationTriangleIcon /> },
};

const AppFlash: FC = () => {
  const { flash } = usePageProps();
  useEffect(() => {
    if (flash) {
      Object.entries(flash).forEach(([type, message]) => {
        const props = NOTIFICATION_PROPS[type];
        showNotification({ message, ...props });
      });
    }
  }, [flash]);
  return null;
};

export default AppFlash;
