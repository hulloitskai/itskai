import type { FC } from "react";
import type { NotificationProps } from "@mantine/notifications";
import { Inertia } from "@inertiajs/inertia";

import InformationCircleIcon from "~icons/heroicons/information-circle-20-solid";
import ExclamationTriangleIcon from "~icons/heroicons/exclamation-triangle-20-solid";

const AppFlashNotificationProps: Record<string, Partial<NotificationProps>> = {
  notice: { color: "indigo", icon: <InformationCircleIcon /> },
  alert: { color: "red", icon: <ExclamationTriangleIcon /> },
};

type AppFlashState = { flashed: boolean };

const AppFlash: FC = () => {
  const { flash } = usePageProps();
  useEffect(() => {
    const state = Inertia.restore(AppFlash.name) as AppFlashState | undefined;
    const { flashed } = state || {};
    if (flash && !flashed) {
      Object.entries(flash).forEach(([type, message]) => {
        const props = AppFlashNotificationProps[type];
        showNotification({ message, ...props });
      });
      const state: AppFlashState = { flashed: true };
      Inertia.remember(state, AppFlash.name);
    }
  }, [flash]);
  return null;
};

export default AppFlash;
