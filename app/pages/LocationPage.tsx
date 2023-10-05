import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import ClockIcon from "~icons/heroicons/clock-20-solid";
import { motion } from "framer-motion";
import { Text } from "@mantine/core";

import type { MapRef } from "react-map-gl";
import { GeolocateControl, Marker } from "react-map-gl";

import { LocationPageSubscriptionDocument } from "~/helpers/graphql";
import type {
  LocationPageQuery,
  LocationPageSubscriptionVariables,
} from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { Coordinates } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import Map from "~/components/Map";
import LocationTrackForm from "~/components/LocationTrackForm";

const TORONTO_COORDINATES: Readonly<Coordinates> = {
  latitude: 43.6532,
  longitude: -79.3832,
};

const MotionAlert = motion(Alert);

export type LocationPageProps = PagePropsWithData<LocationPageQuery> & {
  readonly password: Maybe<string>;
};

const LocationPage: PageComponent<LocationPageProps> = ({
  password,
  data: { location: initialLocation },
}) => {
  // == Routing
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  // == Map
  const mapRef = useRef<MapRef>(null);
  const mapCenter =
    initialLocation?.approximateCoordinates ?? TORONTO_COORDINATES;

  // == Alert
  const alertProps = { bg: "dark", w: "100%" };
  const [alertPulse, setAlertPulse] = useState(false);
  useEffect(() => {
    if (alertProps) {
      setTimeout(() => {
        setAlertPulse(false);
      }, 500);
    }
  }, [alertPulse]);

  // == Subscription
  const subscriptionVariables = useMemo<
    LocationPageSubscriptionVariables | undefined
  >(
    () => (!pageLoading && password ? { password } : undefined),
    [password, pageLoading],
  );
  const [subscriptionFirstLoad, setSubscriptionFirstLoad] = useState(true);
  const onSubscriptionError = useApolloAlertCallback(
    "Failed to subscribe to location updates",
  );
  const { data, loading } = useSubscription(LocationPageSubscriptionDocument, {
    variables: subscriptionVariables,
    skip: !subscriptionVariables,
    onData: ({ data: { data, error } }) => {
      if (data) {
        const { location } = data;
        if (location && mapRef.current) {
          const { coordinates } = location.details;
          mapRef.current.flyTo({
            center: { lat: coordinates.latitude, lng: coordinates.longitude },
            zoom: 14,
            animate: true,
          });
          if (!subscriptionFirstLoad) {
            setAlertPulse(true);
          }
          setSubscriptionFirstLoad(false);
        }
      } else if (error) {
        console.error("Error during location update", formatJSON({ error }));
      }
    },
    onError: onSubscriptionError,
  });
  const { location } = data ?? {};

  return (
    <Flex
      pos="relative"
      style={{ flexGrow: 1, alignItems: "stretch", flexDirection: "column" }}
    >
      <Map
        ref={mapRef}
        initialViewState={{ ...mapCenter, zoom: 11.5 }}
        scrollZoom
        style={{ flexGrow: 1 }}
      >
        <GeolocateControl />
        {location && (
          <Marker
            color="var(--mantine-color-brand-6)"
            {...location.details.coordinates}
          />
        )}
      </Map>
      <Center
        pos="absolute"
        style={({ spacing }) => ({
          left: spacing.md,
          right: spacing.md,
          bottom: spacing.lg,
        })}
      >
        <Box
          pos="relative"
          w="100%"
          maw={540}
          style={({ radius }) => ({
            borderRadius: radius.md,
            overflow: "hidden",
          })}
        >
          {location ? (
            resolve(() => {
              const {
                timestamp,
                details: { address, expiresAt },
              } = location;
              return (
                <MotionAlert
                  animate={{
                    border: alertPulse
                      ? `${rem(1)} solid var(--mantine-color-brand-5)`
                      : `${rem(1)} solid transparent`,
                  }}
                  transition={{ duration: 250, ease: "easeInOut" }}
                  title={
                    <Group justify="space-between">
                      <Text span inherit>
                        Kai was last seen at
                      </Text>
                      <Badge
                        variant="outline"
                        size="xs"
                        pl={2}
                        leftSection={<ClockIcon />}
                      >
                        <TimeAgo inherit>{timestamp}</TimeAgo>
                      </Badge>
                    </Group>
                  }
                  styles={{
                    title: {
                      marginBottom: rem(4),
                    },
                    label: {
                      width: "100%",
                    },
                  }}
                  {...alertProps}
                >
                  <Stack gap={4}>
                    <Text span fw={700} lh={1.3}>
                      {address}
                    </Text>
                    <Box>
                      <Text size="xs" c="gray.4">
                        From Find My iPhone,{" "}
                        <TimeAgo inherit>{timestamp}</TimeAgo>.
                      </Text>
                      <Text size="xs" c="gray.6">
                        Location access expires{" "}
                        <TimeAgo inherit>{expiresAt}</TimeAgo>.
                      </Text>
                    </Box>
                  </Stack>
                </MotionAlert>
              );
            })
          ) : (
            <Alert
              title="Kai's somewhere around here..."
              styles={{
                title: {
                  marginBottom: 2,
                },
              }}
              {...alertProps}
            >
              <Text inherit mb={8}>
                Got a password? Enter it here to find out where Kai is.
              </Text>
              <LocationTrackForm
                size="sm"
                onSubmit={password => {
                  const params = new URLSearchParams([["password", password]]);
                  router.visit("/track?" + params.toString(), {
                    preserveState: true,
                    onBefore: () => {
                      setPageLoading(true);
                    },
                    onFinish: () => {
                      setPageLoading(false);
                    },
                  });
                }}
              />
            </Alert>
          )}
          <LoadingOverlay visible={loading} />
        </Box>
      </Center>
    </Flex>
  );
};

LocationPage.layout = buildLayout<LocationPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Track"
      description="The ultimate Kai-stalking toolkit."
      noIndex
      padding={0}
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default LocationPage;
