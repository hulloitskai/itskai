import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
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
  >(() => (password ? { password } : undefined), [password]);
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
          const { coordinates } = location;
          mapRef.current.flyTo({
            center: { lat: coordinates.latitude, lng: coordinates.longitude },
            zoom: 16,
            animate: true,
          });
          setAlertPulse(true);
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
        {location && <Marker {...location.coordinates}></Marker>}
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
              const { address, timestamp } = location;
              return (
                <MotionAlert
                  {...alertProps}
                  layout
                  animate={{
                    border: alertPulse
                      ? `${rem(1)} solid var(--mantine-color-brand-5)`
                      : `${rem(1)} solid transparent`,
                  }}
                  transition={{ duration: 250, ease: "easeInOut" }}
                  title="Kai was last seen at"
                  styles={() => ({
                    title: {
                      marginBottom: rem(8),
                    },
                  })}
                >
                  <Stack gap={8}>
                    <Text span lh={1.3}>
                      {address}
                    </Text>
                    <Text size="xs" c="gray.5">
                      From Find My iPhone,{" "}
                      <TimeAgo inherit>{timestamp}</TimeAgo>.
                    </Text>
                  </Stack>
                </MotionAlert>
              );
            })
          ) : (
            <Alert
              {...alertProps}
              title="Kai's somewhere around here..."
              styles={{
                title: {
                  marginBottom: 0,
                },
              }}
            >
              <LocationTrackForm
                onSubmit={password => {
                  const params = new URLSearchParams([["password", password]]);
                  router.visit("/track?" + params.toString(), {
                    preserveState: true,
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
