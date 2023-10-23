import type { FC } from "react";
import type { NotificationProps } from "@mantine/core";

import InformationCircleIcon from "~icons/heroicons/information-circle-20-solid";
import ExclamationTriangleIcon from "~icons/heroicons/exclamation-triangle-20-solid";

const AppFlashNotificationProps: Record<string, Partial<NotificationProps>> = {
  notice: {
    color: "var(--mantine-color-primary-filled)",
    icon: <InformationCircleIcon />,
  },
  alert: {
    color: "var(--mantine-color-red-filled)",
    icon: <ExclamationTriangleIcon />,
  },
};

const AppFlash: FC = () => {
  const { flash } = usePageProps();
  useEffect(() => {
    if (flash) {
      Object.entries(flash).forEach(([type, message]) => {
        const props = AppFlashNotificationProps[type];
        showNotification({ message, ...props });
      });
    }
  }, [flash]);
  useWindowEvent("popstate", ({ state }) => {
    if (state instanceof Object && "props" in state) {
      const { props } = state;
      invariant(
        props instanceof Object,
        "Expected `state.props` to be an Object",
      );
      if (props && "flash" in props) {
        delete props.flash;
      }
    }
  });
  return null;
};

export default AppFlash;
