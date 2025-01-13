import { type ButtonProps } from "@mantine/core";

import { useMutateRoute } from "~/helpers/fetch";
import { useWebPush } from "~/helpers/webPush";

export interface FriendPushNotificationsButtonProps extends ButtonProps {
  friendToken: string;
}

const FriendPushNotificationsButton: FC<FriendPushNotificationsButtonProps> = ({
  friendToken,
  ...otherProps
}) => {
  const { subscription, registration, subscribe, subscribing, supported } =
    useWebPush();
  useEffect(
    () => {
      if (registration === null) {
        void subscribe(friendToken);
      }
    },
    [registration], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const { trigger, mutating } = useMutateRoute(routes.pushSubscriptions.test, {
    descriptor: "send test notification",
    params: {
      query: {
        friend_token: friendToken,
      },
    },
  });

  return (
    <Button
      variant="subtle"
      loading={subscribing || mutating}
      disabled={!supported}
      leftSection={<NotificationIcon />}
      onClick={() => {
        if (registration && subscription) {
          void trigger({
            push_subscription: {
              endpoint: subscription.endpoint,
            },
          });
        } else {
          void subscribe(friendToken);
        }
      }}
      {...otherProps}
    >
      {registration === null
        ? "Enable push notifications"
        : "Send test notification"}
    </Button>
  );
};

export default FriendPushNotificationsButton;
