import SubscribeIcon from "~icons/heroicons/bell-20-solid";
import UnsubscribeIcon from "~icons/heroicons/bell-slash-20-solid";

import { useWebPush } from "~/helpers/webPush";

export interface AdminPushSubscriptionFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {}

const AdminPushSubscriptionForm: FC<AdminPushSubscriptionFormProps> = ({
  ...otherProps
}) => {
  const {
    supported,
    subscription,
    registration,
    subscribe,
    unsubscribe,
    loading,
  } = useWebPush();

  // == Test notification
  const [testNotificationSent, setTestNotificationSent] = useState(false);
  useDidUpdate(() => {
    if (testNotificationSent) {
      const timeout = setTimeout(() => {
        setTestNotificationSent(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [testNotificationSent]);
  const {
    trigger: triggerSendTestNotification,
    mutating: sendingTestNotification,
  } = useRouteMutation(routes.pushSubscriptions.test, {
    descriptor: "send test notification",
  });
  const sendTestNotification = useCallback(
    (subscription: PushSubscription) => {
      void triggerSendTestNotification({
        push_subscription: {
          endpoint: subscription.endpoint,
        },
      }).then(() => {
        setTestNotificationSent(true);
      });
    },
    [triggerSendTestNotification],
  );

  return (
    <Stack gap={8} {...otherProps}>
      <Button
        variant={registration ? "outline" : "filled"}
        leftSection={registration ? <UnsubscribeIcon /> : <SubscribeIcon />}
        {...{ loading }}
        disabled={!supported || registration === undefined}
        onClick={() => {
          if (registration) {
            void unsubscribe();
          } else {
            void subscribe();
          }
        }}
        fullWidth
      >
        {supported
          ? registration
            ? "disable push notifications"
            : "enable push notifications"
          : "push notifications not supported on this browser"}
      </Button>
      {subscription && registration && (
        <Anchor
          component="button"
          size="xs"
          inline
          onClick={() => {
            sendTestNotification(subscription);
          }}
          style={{ alignSelf: "center" }}
        >
          {testNotificationSent
            ? "sent!"
            : sendingTestNotification
              ? "sending..."
              : "send me a test notification"}
        </Anchor>
      )}
    </Stack>
  );
};

export default AdminPushSubscriptionForm;
