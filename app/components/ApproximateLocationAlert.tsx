import { type AlertProps } from "@mantine/core";
import { rgba, Text } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

import LocationIcon from "~icons/heroicons/map-pin-20-solid";

import { type ApproximateLocation } from "~/types";

export interface ApproximateLocationAlertProps
  extends Omit<AlertProps, "title" | "styles" | "children">,
    Omit<ComponentPropsWithoutRef<"div">, "color" | "style" | "children"> {
  initialLocation: ApproximateLocation | null;
  onUpdate: (location: ApproximateLocation) => void;
}

const ApproximateLocationAlert: FC<ApproximateLocationAlertProps> = ({
  initialLocation,
  onUpdate,
  ...otherProps
}) => {
  const colorScheme = useColorScheme();

  // == Subscription
  const { data: locationData } = useSubscription<{
    location: ApproximateLocation;
  }>("ApproximateLocationUpdatesChannel", {
    descriptor: "subscribe to approximate location updates",
    onData: ({ location }) => {
      onUpdate(location);
    },
  });
  const { location = initialLocation } = locationData ?? {};

  return (
    <Alert
      icon={<LocationIcon />}
      title="In the area?"
      styles={{
        root: {
          alignSelf: "center",
        },
        body: {
          rowGap: rem(2),
        },
      }}
      {...(location && { pb: "sm" })}
      {...otherProps}
    >
      <Stack gap={4}>
        {location ? (
          <Text inherit>
            I&apos;m currently around{" "}
            <Anchor
              href={location.google_maps_area_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              inherit
              fw={600}
            >
              {location.approximate_address}
            </Anchor>
            . If you&apos;re nearby, text me and come say hi!
          </Text>
        ) : (
          <Text>My location could not be detected :(</Text>
        )}
        {location && (
          <Text size="xs" c="dimmed">
            From Find My iPhone, <TimeAgo inherit>{location.timestamp}</TimeAgo>
            .{" "}
            <Anchor
              component={Link}
              href="/locate"
              style={theme => {
                const color = parseThemeColor({ theme, color: "primary.4" });
                return {
                  color: rgba(color.value, colorScheme === "dark" ? 0.8 : 1.0),
                };
              }}
            >
              Need to find me?
            </Anchor>
          </Text>
        )}
      </Stack>
    </Alert>
  );
};

export default ApproximateLocationAlert;
