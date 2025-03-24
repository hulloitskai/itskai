import { type AlertProps } from "@mantine/core";
import { rgba, Text } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";

import LocationIcon from "~icons/heroicons/map-pin-20-solid";

import { type ApproximateLocation } from "~/types";

export interface ApproximateLocationAlertProps
  extends Omit<AlertProps, "title" | "styles" | "children">,
    Omit<ComponentPropsWithoutRef<"div">, "color" | "style" | "children"> {
  location: ApproximateLocation | null;
  onUpdate: (location: ApproximateLocation) => void;
}

const ApproximateLocationAlert: FC<ApproximateLocationAlertProps> = ({
  location: initialLocation,
  onUpdate,
  ...otherProps
}) => {
  const colorScheme = useColorScheme();

  // == Subscription
  const { data } = useSubscription<{
    location: ApproximateLocation;
  }>("ApproximateLocationUpdatesChannel", {
    descriptor: "subscribe to approximate location updates",
    fallbackData: { location: initialLocation },
    onData: ({ location }) => {
      onUpdate(location);
    },
  });
  const location = data?.location ?? initialLocation;

  return (
    <Alert
      icon={<LocationIcon />}
      title="In the area?"
      {...(location && { pb: "sm" })}
      {...otherProps}
    >
      <Stack gap={4}>
        {location ? (
          <Text inherit>
            i&apos;m currently around{" "}
            <Anchor
              href={location.google_maps_area_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              inherit
              fw={600}
            >
              {location.approximate_address}
            </Anchor>
            . if you&apos;re nearby, text me and come say hi!
          </Text>
        ) : (
          <Text>my location could not be detected :(</Text>
        )}
        {location && (
          <Text size="xs" c="dimmed">
            From Find My iPhone, <TimeAgo inherit>{location.timestamp}</TimeAgo>
            .{" "}
            <Anchor
              component={Link}
              href={routes.locations.show.path()}
              style={theme => {
                const color = parseThemeColor({ theme, color: "primary.4" });
                return {
                  color: rgba(color.value, colorScheme === "dark" ? 0.8 : 1.0),
                };
              }}
            >
              need to find me?
            </Anchor>
          </Text>
        )}
      </Stack>
    </Alert>
  );
};

export default ApproximateLocationAlert;
