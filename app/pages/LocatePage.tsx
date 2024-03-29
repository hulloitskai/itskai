import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import type { Feature, FeatureCollection, Point } from "geojson";
import ClockIcon from "~icons/heroicons/clock-20-solid";
import circle from "@turf/circle";

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

import classes from "./LocatePage.module.css";
import { DateTime, Duration } from "luxon";

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
  const theme = useMantineTheme();
  const [pageLoading, setPageLoading] = useState(false);

  // == Map
  const mapRef = useRef<MapRef>(null);
  const mapCenter =
    initialLocation?.approximateCoordinates ?? TORONTO_COORDINATES;

  // == Alert
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
  const regionColor = theme.colors.primary[5];

  // == Trail Markers
  const firstMarkerTimestamp = useMemo<DateTime | undefined>(() => {
    const firstMarker = first(trail);
    if (firstMarker) {
      return DateTime.fromISO(firstMarker.timestamp);
    }
  }, [trail]);
  const lastMarkerTimestamp = useMemo<DateTime | undefined>(() => {
    const lastMarker = last(trail);
    if (lastMarker) {
      return DateTime.fromISO(lastMarker.timestamp);
    }
  }, [trail]);
  const trailDurationMilliseconds = useMemo<Duration | undefined>(() => {
    if (firstMarkerTimestamp && lastMarkerTimestamp) {
      return lastMarkerTimestamp.diff(firstMarkerTimestamp);
    }
  }, [firstMarkerTimestamp, lastMarkerTimestamp]);
  const deriveTrailMarkerOpacity = useCallback(
    (marker: LocatePageTrailMarkerFragment): number => {
      if (trailDurationMilliseconds && lastMarkerTimestamp) {
        const timestamp = DateTime.fromISO(marker.timestamp);
        const markerOffset = lastMarkerTimestamp.diff(timestamp);
        return Math.min(
          markerOffset.as("milliseconds") /
            trailDurationMilliseconds.as("milliseconds") +
            0.1,
          1.0,
        );
      } else {
        return 0.0;
      }
    },
    [trailDurationMilliseconds, lastMarkerTimestamp],
  );
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
  }, [trail, deriveTrailMarkerOpacity]);
  const trailMarkerColor = useMemo(() => {
    const { color } = theme.variantColorResolver({
      theme,
      color: "primary",
      variant: "filled",
    });
    return color;
  }, [theme]);

  // == Trail Segments
  const trailSegmentColor = theme.colors.primary[4];
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
  }, [trailMarkersData, trailSegmentColor]);

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
                  classNames={{
                    root: classes.alert,
                    title: classes.alertTitle,
                    message: classes.alertMessage,
                  }}
                  styles={{
                    root: {
                      transition: "border 250ms ease",
                    },
                    body: {
                      rowGap: rem(2),
                    },
                    label: {
                      width: "100%",
                    },
                  }}
                  mod={{ pulse: alertPulse }}
                >
                  <Stack gap={4}>
                    <Text span fw={700} lh={1.3}>
                      {address}
                    </Text>
                    <Box>
                      <Text size="xs" fw={500} className={classes.source}>
                        From Find My iPhone,{" "}
                        <TimeAgo inherit>{timestamp}</TimeAgo>.
                      </Text>
                      <Text size="xs" c="dimmed">
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
              classNames={{
                root: classes.alert,
                title: classes.alertTitle,
                message: classes.alertMessage,
              }}
              styles={{
                body: {
                  rowGap: rem(2),
                },
              }}
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
              classNames={{
                root: classes.alert,
                title: classes.alertTitle,
                message: classes.alertMessage,
              }}
              styles={{
                body: {
                  rowGap: rem(2),
                },
              }}
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
