import { type ButtonProps } from "@mantine/core";

import { useMutateRoute } from "~/helpers/fetch";
import { useWebPush } from "~/helpers/webPush";

export interface FriendTestPushNotificationButtonProps extends ButtonProps {
  friendToken: string;
}

const FriendTestPushNotificationButton: FC<
  FriendTestPushNotificationButtonProps
> = ({ friendToken, ...otherProps }) => {
  const { subscription } = useWebPush();
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
      loading={mutating}
      disabled={!subscription}
      leftSection={<NotificationIcon />}
      onClick={() => {
        invariant(subscription, "Subscription is missing");
        void trigger({
          push_subscription: {
            endpoint: subscription.endpoint,
          },
        });
      }}
      {...otherProps}
    >
      {subscription === null
        ? "Please enable push notifications"
        : "Send test notification"}
    </Button>
  );
};

export default FriendTestPushNotificationButton;
