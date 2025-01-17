import { getPrimaryShade, rgba, Text } from "@mantine/core";
import circle from "@turf/circle";
import { type Feature, type FeatureCollection, type Point } from "geojson";
import { DateTime, type Duration } from "luxon";
import { type MapRef, type ViewState } from "react-map-gl";
import { GeolocateControl, Layer, Marker, Source } from "react-map-gl";

import ClockIcon from "~icons/heroicons/clock-20-solid";

import AppLayout from "~/components/AppLayout";
import LocationAccessForm from "~/components/LocationAccessForm";
import Map from "~/components/Map";
import {
  type ApproximateLocation,
  type Coordinates,
  type LocationAccessGrant,
  type LocationTrailMarker,
  type LocationWithTrail,
} from "~/types";

import classes from "./LocatePage.module.css";

const TORONTO_COORDINATES: Readonly<Coordinates> = {
  latitude: 43.6532,
  longitude: -79.3832,
};

const APPROXIMATE_ZOOM = 11.5;
const PRECISE_ZOOM = 14.5;

export interface LocatePageProps extends SharedPageProps {
  approximateLocation: ApproximateLocation | null;
  location: LocationWithTrail | null;
  password: string | null;
  accessToken: string | null;
  accessGrant: LocationAccessGrant | null;
}

const LocatePage: PageComponent<LocatePageProps> = ({
  accessGrant: initialAccessGrant,
  accessToken,
  approximateLocation: initialApproximateLocation,
  location: initialLocation,
  password,
}) => {
  const mounted = useMounted();
  const theme = useMantineTheme();

  // == Map
  const mapRef = useRef<MapRef>(null);
  const [initialViewState] = useState<Partial<ViewState>>(() => {
    if (initialLocation) {
      return {
        ...initialLocation.coordinates,
        zoom: PRECISE_ZOOM,
      };
    }
    if (initialApproximateLocation) {
      return {
        ...initialApproximateLocation.approximate_coordinates,
        zoom: APPROXIMATE_ZOOM,
      };
    }
    return TORONTO_COORDINATES;
  });

  // == Alert pulse state
  const [alertPulse, setAlertPulse] = useState(false);
  useEffect(() => {
    if (alertPulse) {
      const timeout = setTimeout(() => {
        setAlertPulse(false);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [alertPulse]);

  // == Subscribe to location changes
  const locationSubscriptionFirstLoadRef = useRef(true);
  const { data: locationData } = useSubscription<{
    location: LocationWithTrail;
    accessGrant: LocationAccessGrant;
  }>("LocationUpdatesChannel", {
    descriptor: "subscribe to location updates",
    params: accessToken ? { access_token: accessToken } : null,
    onData: ({ location }) => {
      if (location && mapRef.current) {
        const { latitude, longitude } = location.coordinates;
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: PRECISE_ZOOM,
          animate: true,
        });
        if (!locationSubscriptionFirstLoadRef.current) {
          locationSubscriptionFirstLoadRef.current = false;
          setAlertPulse(true);
        }
      }
    },
  });
  const { accessGrant = initialAccessGrant, location = initialLocation } =
    locationData ?? {};

  // == Region
  const regionData = useMemo(() => {
    if (initialApproximateLocation) {
      const { latitude, longitude } =
        initialApproximateLocation.approximate_coordinates;
      return circle([longitude, latitude], 1);
    }
  }, [initialApproximateLocation]);
  const regionColor = theme.colors.primary[5];

  // == Trail
  const firstMarkerTimestamp = useMemo<DateTime | undefined>(() => {
    const firstMarker = first(location?.trail_markers);
    if (firstMarker) {
      return DateTime.fromISO(firstMarker.timestamp);
    }
  }, [location?.trail_markers]);
  const lastMarkerTimestamp = useMemo<DateTime | undefined>(() => {
    const lastMarker = last(location?.trail_markers);
    if (lastMarker) {
      return DateTime.fromISO(lastMarker.timestamp);
    }
  }, [location?.trail_markers]);
  const trailDurationMilliseconds = useMemo<Duration | undefined>(() => {
    if (firstMarkerTimestamp && lastMarkerTimestamp) {
      return lastMarkerTimestamp.diff(firstMarkerTimestamp);
    }
  }, [firstMarkerTimestamp, lastMarkerTimestamp]);
  const deriveTrailMarkerOpacity = useCallback(
    (marker: LocationTrailMarker): number => {
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
    if (location?.trail_markers) {
      return {
        type: "FeatureCollection",
        features: location.trail_markers.map(marker => {
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
  }, [location?.trail_markers, deriveTrailMarkerOpacity]);
  const { colorScheme } = useMantineColorScheme();
  const trailMarkerColor = useMemo(
    () => theme.colors.primary[getPrimaryShade(theme, colorScheme)],
    [theme, colorScheme],
  );

  // == Trail segments
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
      {mounted && (
        <Map
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox-map-design/ck4014y110wt61ctt07egsel6"
          scrollZoom
          {...{ initialViewState }}
          style={{ flexGrow: 1 }}
        >
          <GeolocateControl />
          {location?.coordinates && (
            <Marker
              color="var(--mantine-primary-color-6)"
              {...location.coordinates}
            />
          )}
          {regionData && !location?.coordinates && (
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
          {location && accessGrant ? (
            resolve(() => {
              const { address, timestamp } = location;
              return (
                <Alert
                  className={classes.alert}
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
                        <TimeAgo inherit>{accessGrant.expires_at}</TimeAgo>.
                      </Text>
                    </Box>
                  </Stack>
                </Alert>
              );
            })
          ) : initialApproximateLocation ? (
            <Alert
              className={classes.alert}
              title="Kai's somewhere around here..."
            >
              <Text inherit mb={8}>
                Got a password? Enter it here to find out where Kai is.
              </Text>
              <LocationAccessForm
                {...(!!password && { autofillPassword: password })}
                size="sm"
                onSuccess={token => {
                  startTransition(() => {
                    router.visit(
                      routes.locations.show.path({
                        query: { access_token: token },
                      }),
                    );
                  });
                }}
              />
            </Alert>
          ) : (
            <Alert
              className={classes.alert}
              title="We couldn't locate Kai :("
              color="red"
            >
              Our radars aren&apos;t detecting anything! Where&apos;d this mans
              go?
            </Alert>
          )}
          <LoadingOverlay
            visible={!!accessToken && !location}
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

LocatePage.layout = page => (
  <AppLayout
    title="Track"
    description="The ultimate Kai-stalking toolkit."
    noIndex
    padding={0}
  >
    {page}
  </AppLayout>
);

export default LocatePage;
