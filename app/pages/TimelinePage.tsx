import type { PageProps } from "@inertiajs/core";
import type { PageComponent } from "~/helpers/inertia";
import type { Feature, FeatureCollection, LineString, Point } from "geojson";
import { DateTime } from "luxon";

import lineSliceAlong from "@turf/line-slice-along";
import lineLength from "@turf/length";

import type { MapRef } from "react-map-gl";
import { Source, Layer } from "react-map-gl";

import {
  TimelineActivityType,
  TimelineActivitiesQueryDocument,
} from "~/helpers/graphql";
import type { Coordinates, TimelinePhotoFragment } from "~/helpers/graphql";

import PageLayout from "~/components/PageLayout";
import Map from "~/components/Map";
import TimelinePhoto from "~/components/TimelinePhoto";
import { Loader, Text } from "@mantine/core";

// import { AnimatePresence } from "framer-motion";

const TORONTO_COORDINATES: Readonly<Coordinates> = {
  latitude: 43.6532,
  longitude: -79.3832,
};

export type TimelinePageProps = PageProps;

const truncateActivitySegmentIfNecessary = (
  timestamp: DateTime,
  cutoff: DateTime,
  startedAt: DateTime,
  endedAt: DateTime,
  feature: TimelineActivitySegmentFeature,
): TimelineActivitySegmentFeature => {
  const durationSeconds = endedAt.diff(startedAt).as("seconds");
  const distance = lineLength(feature);
  let startDistance = 0;
  let stopDistance = distance;
  if (cutoff > startedAt) {
    const startSeconds = cutoff.diff(startedAt).as("seconds");
    startDistance = distance * (startSeconds / durationSeconds);
  }
  if (timestamp < endedAt) {
    const endSeconds = endedAt.diff(timestamp).as("seconds");
    stopDistance = distance * (1 - endSeconds / durationSeconds);
  }
  if (startDistance === 0 && stopDistance === distance) {
    return feature;
  }
  try {
    return lineSliceAlong(
      feature,
      startDistance,
      stopDistance,
    ) as TimelineActivitySegmentFeature;
  } catch (error) {
    console.warn(`Failed to slice LineString: ${error}`);
    return feature;
  }
};

const deriveActivityOpacity = (
  timestamp: DateTime,
  startedAt: DateTime,
): number => {
  const x = timestamp.diff(startedAt).as("hours");
  return Math.min(1.0, 1.05 ** -x);
};

// const stringHash = (str: string): number => {
//   const hash = str
//     .split("")
//     .reduce(
//       (hashCode, currentVal) =>
//         (hashCode =
//           currentVal.charCodeAt(0) +
//           (hashCode << 6) +
//           (hashCode << 16) -
//           hashCode),
//       0,
//     );
//   return Math.abs(hash);
// };

type TimelineSharedFeatureProperties = {
  readonly opacity: number;
  readonly timezone: string;
};

type TimelineActivitySegmentProperties = TimelineSharedFeatureProperties & {
  readonly startedAt: DateTime;
  readonly endedAt: DateTime;
};

type TimelineActivitySegmentFeature = Feature<
  LineString,
  TimelineActivitySegmentProperties
>;

type TimelineActivitySegmentFeatureCollection = FeatureCollection<
  LineString,
  TimelineActivitySegmentProperties
>;

type TimelinePlaceVisitProperties = TimelineSharedFeatureProperties & {
  readonly name: string | null;
};

type TimelinePlaceVisitFeature = Feature<Point, TimelinePlaceVisitProperties>;

type TimelinePlaceVisitFeatureCollection = FeatureCollection<
  Point,
  TimelinePlaceVisitProperties
>;

const TimelinePage: PageComponent<TimelinePageProps> = () => {
  const isClient = useIsClient();

  // == Timestamp
  const [timestamp, setTimestamp] = useState(() =>
    DateTime.fromObject({ year: 2023, month: 1, day: 3 }),
  );
  const speedRef = useRef(1);

  // == Activities
  const onError = useApolloAlertCallback("Failed to load activities");
  const previousWeekISO = useMemo(
    () =>
      timestamp
        .plus({ weeks: -1 })
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISO(),
    [timestamp],
  );
  const nextWeekISO = useMemo(
    () =>
      timestamp
        .plus({ weeks: 1 })
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISO(),
    [timestamp],
  );
  const { data, previousData, loading } = useQuery(
    TimelineActivitiesQueryDocument,
    {
      variables: {
        after: previousWeekISO,
        before: nextWeekISO,
      },
      onError,
    },
  );
  const coalescedData = data ?? previousData;
  const { activities } = coalescedData ?? {};

  // == Advance Timeline
  useEffect(() => {
    if (activities) {
      const february = DateTime.fromObject({ year: 2023, month: 6, day: 1 });
      const interval = setInterval(() => {
        setTimestamp(prevTimestamp => {
          if (prevTimestamp < february) {
            return prevTimestamp.plus({ seconds: speedRef.current * 12 });
          }
          return prevTimestamp;
        });
      }, 1.2);
      return () => {
        clearInterval(interval);
      };
    }
  }, [activities, speedRef]);

  // == Map
  const mapRef = useRef<MapRef>(null);
  const mapCenter = TORONTO_COORDINATES;

  // == Photos
  const [photos, setPhotos] = useState<ReadonlyArray<TimelinePhotoFragment>>(
    [],
  );
  const [shownPhotosCount, setShownPhotosCount] = useState(photos.length);
  const photosStateRef = useRef({
    photosCount: photos.length,
    shownPhotosCount,
  });
  useEffect(() => {
    photosStateRef.current.photosCount = photos.length;
    photosStateRef.current.shownPhotosCount = shownPhotosCount;
  }, [photos, shownPhotosCount]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        photosStateRef.current.shownPhotosCount <
        photosStateRef.current.photosCount
      ) {
        setShownPhotosCount(count => count + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [photosStateRef]);

  // == Features
  const [activityFeatures, setActivityFeatures] =
    useState<TimelineActivitySegmentFeatureCollection | null>(null);
  const [visitFeatures, setVisitFeatures] =
    useState<TimelinePlaceVisitFeatureCollection | null>(null);
  useEffect(() => {
    if (activities) {
      const newActivityFeatures: TimelineActivitySegmentFeatureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      const newVisitFeatures: TimelinePlaceVisitFeatureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      const newPhotos: TimelinePhotoFragment[] = [];
      for (const activity of activities) {
        const startedAt = DateTime.fromISO(activity.startedAt);
        const endedAt = DateTime.fromISO(activity.endedAt);
        const cutoff = timestamp.plus({ days: -3 });
        if (startedAt > timestamp) {
          continue;
        }
        newPhotos.push(...activity.photos);
        if (endedAt < cutoff) {
          continue;
        }
        const sharedProperties: TimelineSharedFeatureProperties = {
          opacity: deriveActivityOpacity(timestamp, startedAt),
          timezone: activity.timezone.name,
        };
        if (activity.type === TimelineActivityType.PlaceVisit) {
          const feature: TimelinePlaceVisitFeature = {
            type: "Feature",
            properties: {
              ...sharedProperties,
              name: activity.name ?? null,
            },
            geometry: activity.location,
          };
          newVisitFeatures.features.push(feature);
        } else if (activity.type === TimelineActivityType.ActivitySegment) {
          const feature: TimelineActivitySegmentFeature = {
            type: "Feature",
            properties: {
              ...sharedProperties,
              startedAt,
              endedAt,
            },
            geometry: activity.location,
          };
          newActivityFeatures.features.push(
            truncateActivitySegmentIfNecessary(
              timestamp,
              cutoff,
              startedAt,
              endedAt,
              feature,
            ),
          );
        }
      }
      setActivityFeatures(newActivityFeatures);
      setVisitFeatures(newVisitFeatures);
      setPhotos(newPhotos);
    }
  }, [activities, timestamp]);
  const lastActivityFeature = useMemo(
    () => last(activityFeatures?.features),
    [activityFeatures],
  );
  const lastActivityTimezone = useMemo(
    () => lastActivityFeature?.properties.timezone,
    [lastActivityFeature],
  );
  useEffect(() => {
    if (activityFeatures) {
      if (lastActivityFeature) {
        const { properties, geometry } = lastActivityFeature;
        const lastCoordinate = last(geometry.coordinates);
        if (lastCoordinate) {
          mapRef.current?.flyTo({
            center: lastCoordinate as [number, number],
            animate: false,
          });
          if (timestamp > properties.endedAt) {
            speedRef.current = 12;
          } else {
            speedRef.current = 1;
          }
        }
      }
    }
  }, [lastActivityFeature]);

  return (
    <Flex
      pos="relative"
      h="100dvh"
      style={{ alignItems: "stretch", flexDirection: "column" }}
    >
      {isClient && (
        <Map
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox-map-design/ckshxkppe0gge18nz20i0nrwq"
          initialViewState={{ ...mapCenter, zoom: 12.5 }}
          navigationControl={false}
          style={{ flexGrow: 1 }}
        >
          {activityFeatures && (
            <Source
              id="activity-segments"
              type="geojson"
              data={activityFeatures}
              lineMetrics
            >
              <Layer
                id="activity-segments"
                type="line"
                paint={{
                  "line-color": "#406896",
                  "line-width": 3,
                  "line-opacity": ["get", "opacity"],
                }}
                layout={{
                  "line-cap": "round",
                }}
              />
            </Source>
          )}
          {visitFeatures && (
            <Source
              id="place-visits"
              type="geojson"
              data={visitFeatures}
              lineMetrics
            >
              <Layer
                id="place-visits"
                type="circle"
                paint={{
                  "circle-radius": 4,
                  "circle-color": "#cf4674",
                  "circle-opacity": ["get", "opacity"],
                }}
              />
            </Source>
          )}
        </Map>
      )}
      {take(photos, shownPhotosCount).map(photo => (
        <TimelinePhoto key={photo.id} {...{ photo }} />
      ))}
      <Center
        pos="absolute"
        style={({ spacing }) => ({
          left: spacing.md,
          right: spacing.md,
          bottom: spacing.lg,
        })}
      >
        <Alert
          title={
            <>
              <Text span inherit>
                {timestamp.toLocaleString({
                  ...DateTime.DATETIME_MED,
                  timeZone: lastActivityTimezone,
                  timeZoneName: "short",
                })}
              </Text>
              {loading && <Loader size="xs" />}
            </>
          }
          variant="white"
          miw={440}
          p="xs"
          styles={{
            label: {
              width: "100%",
              display: "flex",
              gap: "var(--mantine-spacing-xs)",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        ></Alert>
      </Center>
      <LoadingOverlay visible={!coalescedData} loaderProps={{ size: "md" }} />
    </Flex>
  );
};

TimelinePage.layout = page => <PageLayout>{page}</PageLayout>;

export default TimelinePage;
