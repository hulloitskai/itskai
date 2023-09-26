import type { FC } from "react";
import { format as formatTimeAgo } from "timeago.js";
import LocationIcon from "~icons/heroicons/map-pin-20-solid";

import { Text } from "@mantine/core";
import type { AlertProps } from "@mantine/core";

import { LocationAlertSubscriptionDocument } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { LocationAlertLocationFragment } from "~/helpers/graphql";

export type LocationAlertProps = Omit<
  AlertProps,
  "title" | "styles" | "children"
> & {
  readonly initialLocation: Maybe<LocationAlertLocationFragment>;
  readonly onUpdate: (location: Maybe<LocationAlertLocationFragment>) => void;
};

const LocationAlert: FC<LocationAlertProps> = ({
  initialLocation,
  onUpdate,
  ...otherProps
}) => {
  // == Subscription
  const onError = useApolloAlertCallback(
    "Failed to subscribe to location updates",
  );
  const { data } = useSubscription(LocationAlertSubscriptionDocument, {
    onData: ({ data: { data } }) => {
      if (data) {
        const { location } = data ?? {};
        onUpdate(location);
      }
    },
    onError,
  });
  const location = data?.location ?? initialLocation;

  // == Location
  const { approximateAddress, googleMapsAreaUrl, timestamp } = location ?? {};

  return (
    <Alert
      icon={<LocationIcon />}
      title="In the area?"
      radius="md"
      styles={{
        root: {
          alignSelf: "center",
        },
        title: {
          marginBottom: rem(2),
        },
      }}
      {...(location && { pb: 8 })}
      {...otherProps}
    >
      <Stack gap={4}>
        {approximateAddress && googleMapsAreaUrl ? (
          <Text inherit>
            I&apos;m currently around{" "}
            <Anchor
              href={googleMapsAreaUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              inherit
              fw={600}
            >
              {approximateAddress}
            </Anchor>
            . If you&apos;re nearby, text me and come say hi!
          </Text>
        ) : (
          <Text>My location could not be detected :(</Text>
        )}
        {timestamp && (
          <Text size="xs" c="dimmed">
            From Find My iPhone,{" "}
            <Time inherit format={time => formatTimeAgo(time.toJSDate())}>
              {timestamp}
            </Time>
            .
          </Text>
        )}
      </Stack>
    </Alert>
  );
};

export default LocationAlert;
