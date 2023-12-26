import type { PageProps } from "@inertiajs/core";
import type { PageComponent } from "~/helpers/inertia";
import type { Feature, FeatureCollection, LineString, Point } from "geojson";
import { useAudioPlayer } from "react-use-audio-player";
import { ActionIcon, Loader } from "@mantine/core";
import { DateTime } from "luxon";

import ResumeIcon from "~icons/heroicons/play-20-solid";
import PauseIcon from "~icons/heroicons/pause-20-solid";
import ForwardIcon from "~icons/heroicons/forward-20-solid";
import BackwardIcon from "~icons/heroicons/backward-20-solid";

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

import fallUnderneathSrc from "~/assets/sounds/fall-underneath.mp3";

const TORONTO_COORDINATES: Readonly<Coordinates> = {
  latitude: 43.6532,
  longitude: -79.3832,
};

export type TimelinePageProps = PageProps;

const truncateActivitySegmentIfNecessary = (
  feature: TimelineActivitySegmentFeature,
  startedAt: DateTime,
  endedAt: DateTime,
  windowStart: DateTime,
  windowEnd: DateTime,
): TimelineActivitySegmentFeature => {
  const durationSeconds = endedAt.diff(startedAt).as("seconds");
  const distance = lineLength(feature);
  let startDistance = 0;
  let stopDistance = distance;
  if (windowStart > startedAt) {
    const startSeconds = windowStart.diff(startedAt).as("seconds");
    startDistance = distance * (startSeconds / durationSeconds);
  }
  if (windowEnd < endedAt) {
    const endSeconds = endedAt.diff(windowEnd).as("seconds");
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
  const [paused, setPaused] = useState(true);
  const [timestamp, setTimestamp] = useState(() =>
    DateTime.fromObject({ year: 2023, month: 1, day: 3 }),
  );
  const speedRef = useRef(1);

  // == Audio Player
  const audioPlayer = useAudioPlayer();
  useEffect(() => {
    audioPlayer.load(fallUnderneathSrc, { loop: true });
  }, []);
  useEffect(() => {
    if (paused) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  }, [paused]);

  // == Activities
  const onError = useApolloAlertCallback("Failed to load activities");
  const windowStart = useMemo(
    () =>
      timestamp
        .startOf("week")
        .plus({ day: -1 })
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISO(),
    [timestamp],
  );
  const windowEnd = useMemo(
    () =>
      timestamp
        .endOf("week")
        .plus({ day: 1 })
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .toISO(),
    [timestamp],
  );
  const { data, previousData, loading } = useQuery(
    TimelineActivitiesQueryDocument,
    {
      variables: {
        after: windowStart,
        before: windowEnd,
      },
      onError,
    },
  );
  const coalescedData = data ?? previousData;
  const { activities } = coalescedData ?? {};

  // == Timeline Progression
  useEffect(() => {
    if (!paused) {
      const interval = setInterval(() => {
        setTimestamp(prevTimestamp =>
          prevTimestamp.plus({ seconds: speedRef.current * 14 }),
        );
      }, 1.2);
      return () => {
        clearInterval(interval);
      };
    }
  }, [paused, speedRef]);

  // == Map
  const mapRef = useRef<MapRef>(null);
  const mapCenter = TORONTO_COORDINATES;

  // == Photos
  const [photos, setPhotos] = useState<ReadonlyArray<TimelinePhotoFragment>>(
    [],
  );
  useEffect(() => {
    photos.forEach(({ image }) => {
      // Preload photos by creating an Image object for each one.
      new Image().src = image.url;
    });
  }, [photos]);
  const visiblePhotos = useMemo(
    () =>
      photos.filter(photo => {
        const takenAt = DateTime.fromISO(photo.takenAt);
        const hideAt = takenAt.plus({ hours: 3 });
        return timestamp > takenAt && timestamp < hideAt;
      }),
    [timestamp, photos],
  );

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
      const windowEnd = timestamp;
      const windowStart = windowEnd.plus({ week: -1 });
      for (const activity of activities) {
        const startedAt = DateTime.fromISO(activity.startedAt);
        const endedAt = DateTime.fromISO(activity.endedAt);
        if (startedAt > windowEnd) {
          continue;
        }
        if (endedAt < windowStart) {
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
              feature,
              startedAt,
              endedAt,
              windowStart,
              windowEnd,
            ),
          );
        }
        newPhotos.push(...activity.photos);
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

  // == Map Following + Timeline Speed
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
          if (isEmpty(visiblePhotos) && timestamp > properties.endedAt) {
            speedRef.current = 12;
          } else {
            speedRef.current = 1;
          }
        }
      }
    }
  }, [lastActivityFeature, visiblePhotos]);

  const ready = !!coalescedData && audioPlayer.isReady;
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
      {photos.map(photo => (
        <TimelinePhoto key={photo.id} {...{ photo, timestamp }} />
      ))}
      <Center
        pos="absolute"
        style={({ spacing }) => ({
          left: spacing.md,
          right: spacing.md,
          bottom: spacing.lg,
        })}
      >
        <Card withBorder w={440} padding="xs">
          <Group gap={8}>
            <Badge miw={170}>
              {timestamp.toLocaleString({
                ...DateTime.DATETIME_MED,
                timeZone: lastActivityTimezone,
                timeZoneName: "short",
              })}
            </Badge>
            {loading && <Loader size="xs" />}
            <Box style={{ flexGrow: 1 }} />
            {paused && (
              <Tooltip
                color="primary"
                c="var(--mantine-color-white)"
                label="Start"
                withArrow
              >
                <ActionIcon
                  variant="light"
                  disabled={!ready}
                  onClick={() => {
                    setPaused(false);
                  }}
                >
                  <ResumeIcon />
                </ActionIcon>
              </Tooltip>
            )}
            {!paused && (
              <Tooltip
                color="primary"
                c="var(--mantine-color-white)"
                label="Pause"
                withArrow
              >
                <ActionIcon
                  variant="light"
                  onClick={() => {
                    setPaused(true);
                  }}
                >
                  <PauseIcon />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip
              label="Rewind 1 day"
              color="primary"
              c="var(--mantine-color-white)"
              withArrow
            >
              <ActionIcon
                variant="light"
                onClick={() => {
                  setTimestamp(prevTimestamp =>
                    prevTimestamp.plus({ day: -1 }),
                  );
                }}
              >
                <BackwardIcon />
              </ActionIcon>
            </Tooltip>
            <Tooltip
              label="Skip ahead 1 day"
              color="primary"
              c="var(--mantine-color-white)"
              withArrow
            >
              <ActionIcon
                variant="light"
                onClick={() => {
                  setTimestamp(prevTimestamp => prevTimestamp.plus({ day: 1 }));
                }}
              >
                <ForwardIcon />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Card>
      </Center>
      <LoadingOverlay visible={!ready} loaderProps={{ size: "md" }} />
    </Flex>
  );
};

TimelinePage.layout = page => <PageLayout>{page}</PageLayout>;

export default TimelinePage;
