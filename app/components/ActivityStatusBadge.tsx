import type { FC } from "react";

import { useNetwork } from "@mantine/hooks";
import type { BoxProps } from "@mantine/core";

import { ActivityStatusBadgeSubscriptionDocument } from "~/queries";

export type ActivityStatusBadgeProps = Omit<BoxProps, "children">;

const ActivityStatusBadge: FC<ActivityStatusBadgeProps> = ({
  sx,
  ...otherProps
}) => {
  const { online } = useNetwork();

  // == Query
  const { data } = useSubscription(ActivityStatusBadgeSubscriptionDocument, {
    variables: {},
    onError: error => {
      console.error("Failed to subscribe to activity status updates", {
        error,
      });
    },
  });
  const { activityStatus } = data ?? {};

  // == Status Text
  const [statusText, setStatusText] = useState(activityStatus || "");
  useEffect(() => {
    if (!online) {
      setStatusText("Offline");
    } else if (activityStatus) {
      setStatusText(activityStatus);
    }
  }, [activityStatus, online]);

  // == Markup
  return (
    <Center sx={[{ overflow: "hidden" }, ...packSx(sx)]} {...otherProps}>
      <Transition transition="fade" mounted={!!activityStatus || !online}>
        {style => (
          <Badge
            size="xs"
            variant="dot"
            color={online ? "green" : "red"}
            {...{ style }}
          >
            {statusText}
          </Badge>
        )}
      </Transition>
    </Center>
  );
};

export default ActivityStatusBadge;
