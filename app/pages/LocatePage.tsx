import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import type { Feature, FeatureCollection, Point } from "geojson";
import ClockIcon from "~icons/heroicons/clock-20-solid";
import { Text, rgba } from "@mantine/core";

import type { MapRef } from "react-map-gl";
import { GeolocateControl, Marker, Source, Layer } from "react-map-gl";

import { LocatePageSubscriptionDocument } from "~/helpers/graphql";
import type {
  LocatePageQuery,
  LocatePageSubscriptionVariables,
  LocatePageTrailMarkerFragment,
} from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { Coordinates } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import Map from "~/components/Map";
import LocationTrackForm from "~/components/LocationTrackForm";
import circle from "@turf/circle";

const TORONTO_COORDINATES: Readonly<Coordinates> = {
  latitude: 43.6532,
  longitude: -79.3832,
};

export type LocatePageProps = PagePropsWithData<LocatePageQuery> & {
  readonly password: Maybe<string>;
};

const LocatePage: PageComponent<LocatePageProps> = ({
  password,
  data: { location: initialLocation },
}) => {
  const isClient = useIsClient();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  // == Colors
  const theme = useMantineTheme();
  const trailMarkerColor = theme.colors.primary[7];
  const trailSegmentColor = theme.colors.primary[4];
  const alertTitleColor = "#B9F4D7";
  const alertBorderColor = "#5A7B6A";
  const alertPulseBorderColor = theme.colors.primary[4];
  const regionColor = theme.colors.primary[5];

  // == Map
  const mapRef = useRef<MapRef>(null);
  const mapCenter =
    initialLocation?.approximateCoordinates ?? TORONTO_COORDINATES;

  // == Alert
  const alertProps = { bg: "dark", w: "100%" };
  const [alertPulse, setAlertPulse] = useState(false);
  useEffect(() => {
    if (alertPulse) {
      setTimeout(() => {
        setAlertPulse(false);
      }, 500);
    }
  }, [alertPulse]);

  // == Subscription
  const subscriptionVariables = useMemo<
    LocatePageSubscriptionVariables | undefined
  >(
    () => (!pageLoading && password ? { password } : undefined),
    [password, pageLoading],
  );
  const [subscriptionFirstLoad, setSubscriptionFirstLoad] = useState(true);
  const onSubscriptionError = useApolloAlertCallback(
    "Failed to subscribe to location updates",
  );
  const { data, loading } = useSubscription(LocatePageSubscriptionDocument, {
    variables: subscriptionVariables,
    skip: !subscriptionVariables,
    onData: ({ data: { data, error } }) => {
      if (data) {
        const { location } = data;
        if (location && mapRef.current) {
          const { latitude, longitude } = location.details.coordinates;
          mapRef.current.flyTo({
            center: [longitude, latitude],
            zoom: 14.5,
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
  const { coordinates, trail } = location?.details ?? {};

  // == Region
  const regionData = useMemo(() => {
    if (initialLocation) {
      const { latitude, longitude } = initialLocation.approximateCoordinates;
      return circle([longitude, latitude], 1);
    }
  }, [initialLocation]);

  // == Trail
  const deriveTrailMarkerOpacity = useMemo<
    (marker: LocatePageTrailMarkerFragment) => number
  >(() => {
    const firstTimestampISO = first(trail)?.timestamp;
    const lastTimestampISO = last(trail)?.timestamp;
    if (firstTimestampISO && lastTimestampISO) {
      const firstTimestamp = DateTime.fromISO(firstTimestampISO);
      const lastTimestamp = DateTime.fromISO(lastTimestampISO);
      const totalDistance = lastTimestamp
        .diff(firstTimestamp)
        .as("milliseconds");
      return ({ timestamp: timestampISO }) => {
        const timestamp = DateTime.fromISO(timestampISO);
        const markerDistance = lastTimestamp.diff(timestamp).as("milliseconds");
        return Math.min(markerDistance / totalDistance + 0.1, 1.0);
      };
    }
    return () => 0.0;
  }, [trail]);
  const trailMarkersData = useMemo<
    FeatureCollection<Point, { opacity: number }> | undefined
  >(() => {
    if (trail) {
      return {
        type: "FeatureCollection",
        features: trail.map(marker => {
          const { latitude, longitude } = marker.coordinates;
          return {
            type: "Feature",
            properties: {
              opacity: deriveTrailMarkerOpacity(marker),
            },
            geometry: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          };
        }),
      };
    }
  }, [trail]);
  const trailSegmentsData = useMemo<FeatureCollection | undefined>(() => {
    if (trailMarkersData) {
      const markerFeatures = trailMarkersData.features;
      const segmentFeatures: Feature[] = [];
      for (let i = 0; i < markerFeatures.length - 1; i++) {
        const startMarker = markerFeatures[i];
        const endMarker = markerFeatures[i + 1];
        invariant(startMarker && endMarker);
        segmentFeatures.push({
          type: "Feature",
          properties: {
            startColor: rgba(trailSegmentColor, startMarker.properties.opacity),
            endColor: rgba(trailSegmentColor, endMarker.properties.opacity),
            opacity:
              (startMarker.properties.opacity + endMarker.properties.opacity) /
              2,
          },
          geometry: {
            type: "LineString",
            coordinates: [
              startMarker.geometry.coordinates,
              endMarker.geometry.coordinates,
            ],
          },
        });
      }
      return {
        type: "FeatureCollection",
        features: segmentFeatures,
      };
    }
  }, [trailMarkersData]);

  return (
    <Flex
      pos="relative"
      style={{ flexGrow: 1, alignItems: "stretch", flexDirection: "column" }}
    >
      {isClient && (
        <Map
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox-map-design/ck4014y110wt61ctt07egsel6"
          initialViewState={{ ...mapCenter, zoom: 11.5 }}
          scrollZoom
          style={{ flexGrow: 1 }}
        >
          <GeolocateControl />
          {coordinates && (
            <Marker color="var(--mantine-color-primary-6)" {...coordinates} />
          )}
          {regionData && !coordinates && (
            <Source id="region" type="geojson" data={regionData}>
              <Layer
                id="region-fill"
                type="fill"
                paint={{
                  "fill-color": rgba(regionColor, 0.3),
                }}
              />
              <Layer
                id="region-outline"
                type="line"
                paint={{
                  "line-color": regionColor,
                }}
              />
            </Source>
          )}
          {trailSegmentsData && (
            <Source
              id="trail-segments"
              type="geojson"
              data={trailSegmentsData}
              lineMetrics
            >
              <Layer
                id="trail-segments"
                type="line"
                paint={{
                  "line-color": trailSegmentColor,
                  "line-width": 5,
                  "line-opacity": ["get", "opacity"],
                  "line-dasharray": [1, 1.5],
                }}
                layout={{
                  "line-cap": "round",
                }}
              />
            </Source>
          )}
          {trailMarkersData && (
            <Source id="trail-markers" type="geojson" data={trailMarkersData}>
              <Layer
                id="trail-markers"
                type="circle"
                paint={{
                  "circle-radius": 5,
                  "circle-color": trailMarkerColor,
                  "circle-opacity": ["get", "opacity"],
                }}
              />
            </Source>
          )}
        </Map>
      )}
      <Center
        pos="absolute"
        style={({ spacing }) => ({
          left: spacing.md,
          right: spacing.md,
          bottom: spacing.lg,
        })}
      >
        <Box pos="relative" w="100%" maw={540}>
          {location ? (
            resolve(() => {
              const {
                timestamp,
                details: { address, expiresAt },
              } = location;
              return (
                <Alert
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
                    root: {
                      transition: "border 250ms ease",
                      border: `${rem(1)} solid`,
                      borderColor: alertPulse
                        ? alertPulseBorderColor
                        : alertBorderColor,
                    },
                    title: {
                      color: alertTitleColor,
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
                </Alert>
              );
            })
          ) : initialLocation ? (
            <Alert
              title="Kai's somewhere around here..."
              styles={{
                title: {
                  color: alertTitleColor,
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
                  router.visit(
                    window.location.pathname + "?" + params.toString(),
                    {
                      preserveState: true,
                      onBefore: () => {
                        setPageLoading(true);
                      },
                      onFinish: () => {
                        setPageLoading(false);
                      },
                    },
                  );
                }}
              />
            </Alert>
          ) : (
            <Alert
              title="We couldn't locate Kai :("
              color="red"
              styles={{
                title: {
                  marginBottom: 2,
                },
                message: {
                  color: "var(--mantine-color-dark-0)",
                },
              }}
              {...alertProps}
            >
              Our radars aren&apos;t detecting anything! Where&apos;d this mans
              go?
            </Alert>
          )}
          <LoadingOverlay
            visible={loading}
            styles={({ radius }) => ({
              overlay: {
                borderRadius: radius.md,
              },
            })}
          />
        </Box>
      </Center>
    </Flex>
  );
};

LocatePage.layout = buildLayout<LocatePageProps>(
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

export default LocatePage;
