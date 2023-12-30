import type { PageProps } from "@inertiajs/core";
import type { PageComponent } from "~/helpers/inertia";
import type { Feature, LineString, Point } from "geojson";
import { countBy, maxBy } from "lodash-es";
import { useAudioPlayer } from "react-use-audio-player";
import { DateTime } from "luxon";

import ResumeIcon from "~icons/heroicons/play-20-solid";
import PauseIcon from "~icons/heroicons/pause-20-solid";
import ForwardIcon from "~icons/heroicons/forward-20-solid";
import BackwardIcon from "~icons/heroicons/backward-20-solid";

import lineSliceAlong from "@turf/line-slice-along";
import lineLength from "@turf/length";

import type { MapRef } from "react-map-gl";
import { Source, Layer } from "react-map-gl";

import { ActionIcon, Loader } from "@mantine/core";

import type {
  TimelinePageActivityFragment,
  TimelinePhotoFragment,
} from "~/helpers/graphql";
import {
  TimelineActivityType,
  TimelinePageActivitiesQueryDocument,
} from "~/helpers/graphql";

import PageLayout from "~/components/PageLayout";
import AppMeta from "~/components/AppMeta";
import Map from "~/components/Map";
import TimelinePhoto from "~/components/TimelinePhoto";

import fallUnderneathSrc from "~/assets/sounds/fall-underneath.mp3";

export type TimelinePageProps = PageProps;

type TimelineSharedFeatureProperties = {
  readonly opacity: number;
};

type TimelineActivitySegmentProperties = TimelineSharedFeatureProperties & {
  readonly startedAt: DateTime;
  readonly endedAt: DateTime;
};

type TimelineActivitySegmentFeature = Feature<
  LineString,
  TimelineActivitySegmentProperties
>;

type TimelinePlaceVisitProperties = TimelineSharedFeatureProperties & {
  readonly name: string | null;
};

type TimelinePlaceVisitFeature = Feature<Point, TimelinePlaceVisitProperties>;

type TimelineMoment = {
  readonly time: DateTime;
  readonly activitySegmentFeatures: TimelineActivitySegmentFeature[];
  readonly placeVisitFeatures: TimelinePlaceVisitFeature[];
  readonly photos: TimelinePhotoFragment[];
};

const truncateTimelineActivitySegmentIfNecessary = (
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

const deriveTimelineActivityOpacity = (
  timestamp: DateTime,
  startedAt: DateTime,
): number => {
  const x = timestamp.diff(startedAt).as("hours");
  return Math.min(1.0, 1.035 ** -x);
};

const TimelinePage: PageComponent<TimelinePageProps> = () => {
  const isClient = useIsClient();

  // == Moment
  const [moment, setMoment] = useState<TimelineMoment>(() => ({
    time: DateTime.fromObject({ year: 2023, month: 8, day: 30 }).setZone(
      "America/Toronto",
      { keepLocalTime: true },
    ),
    activitySegmentFeatures: [],
    placeVisitFeatures: [],
    photos: [],
  }));
  const { time, activitySegmentFeatures, placeVisitFeatures, photos } = moment;

  // == Controls
  const [paused, setPaused] = useState(true);
  const speedRef = useRef(1);

  // == Audio Player
  const audioPlayer = useAudioPlayer();
  useEffect(
    () => {
      audioPlayer.load(fallUnderneathSrc, { loop: true });
      return () => {
        audioPlayer.cleanup();
      };
    },
    [] /* eslint-disable-line react-hooks/exhaustive-deps */,
  );
  useEffect(
    () => {
      if (paused) {
        audioPlayer.pause();
      } else {
        audioPlayer.play();
      }
    },
    [paused] /* eslint-disable-line react-hooks/exhaustive-deps */,
  );

  // == Activities
  const activitiesRef = useRef<ReadonlyArray<TimelinePageActivityFragment>>([]);

  // == Preloaded Photos
  const [preloadedPhotoIdsInitialValue] = useState<Set<string>>(new Set());
  const preloadedPhotoIdsRef = useRef(preloadedPhotoIdsInitialValue);

  // == Query
  const onError = useApolloAlertCallback("Failed to load activities");
  const windowStart = useMemo(() => time.startOf("week").toISO(), [time]);
  const windowEnd = useMemo(
    () => time.endOf("week").plus({ days: 4 }).toISO(),
    [time],
  );
  const { data, previousData, loading } = useQuery(
    TimelinePageActivitiesQueryDocument,
    {
      variables: {
        after: windowStart,
        before: windowEnd,
      },
      onCompleted: ({ activities }) => {
        activitiesRef.current = activities;
      },
      onError,
    },
  );
  const coalescedData = data ?? previousData;

  // == Progression
  const cancelProgressionRef = useRef(false);
  useEffect(() => {
    if (paused) {
      return;
    }
    cancelProgressionRef.current = false;
    let lastTimeStamp: DOMHighResTimeStamp | null = null;
    const step = (timeStamp: DOMHighResTimeStamp): void => {
      if (cancelProgressionRef.current) {
        return;
      }
      if (lastTimeStamp) {
        const elapsedMilliseconds = timeStamp - lastTimeStamp;
        setMoment(({ time: prevTime }) => {
          const time = prevTime.plus({
            seconds: speedRef.current * elapsedMilliseconds * 3,
          });
          const activitySegmentFeatures: TimelineActivitySegmentFeature[] = [];
          const placeVisitFeatures: TimelinePlaceVisitFeature[] = [];
          const photos: TimelinePhotoFragment[] = [];
          const timezoneNames: string[] = [];
          const windowEnd = time;
          const windowStart = windowEnd.plus({ week: -1 });
          for (const activity of activitiesRef.current) {
            const startedAt = DateTime.fromISO(activity.startedAt);
            const endedAt = DateTime.fromISO(activity.endedAt);
            if (startedAt > windowEnd) {
              continue;
            }
            if (endedAt < windowStart) {
              continue;
            }
            const sharedProperties: TimelineSharedFeatureProperties = {
              opacity: deriveTimelineActivityOpacity(time, startedAt),
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
              placeVisitFeatures.push(feature);
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
              const maybeTruncatedFeature =
                truncateTimelineActivitySegmentIfNecessary(
                  feature,
                  startedAt,
                  endedAt,
                  windowStart,
                  windowEnd,
                );
              activitySegmentFeatures.push(maybeTruncatedFeature);
            }
            timezoneNames.push(activity.timezoneName);
            photos.forEach(photo => {
              const { id: photoId, image } = photo;
              const takenAt = DateTime.fromISO(photo.takenAt);
              const hideAt = takenAt.plus({ hours: 3 });
              if (time > takenAt && time < hideAt) {
                photos.push(photo);
              }
              if (!preloadedPhotoIdsRef.current.has(photoId)) {
                // Preload photo by creating an in-memory image object.
                new Image().src = image.src;
                preloadedPhotoIdsRef.current.add(photoId);
              }
            });
          }
          const predominantTimezone = maxBy(
            Object.entries(countBy(timezoneNames)),
            last,
          )?.[0];
          return {
            time: predominantTimezone
              ? time.setZone(predominantTimezone, { keepLocalTime: true })
              : time,
            activitySegmentFeatures,
            placeVisitFeatures,
            photos,
            predominantTimezone,
          };
        });
      }
      lastTimeStamp = timeStamp;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return () => {
      cancelProgressionRef.current = true;
    };
  }, [paused]);

  // == Map
  const mapRef = useRef<MapRef>(null);
  useEffect(() => {
    const { time, activitySegmentFeatures, photos } = moment;
    const lastFeature = last(activitySegmentFeatures);
    if (lastFeature) {
      const { properties, geometry } = lastFeature;
      const lastCoordinate = last(geometry.coordinates);
      if (lastCoordinate) {
        mapRef.current?.flyTo({
          center: lastCoordinate as [number, number],
          animate: false,
        });
        if (isEmpty(photos) && time > properties.endedAt) {
          speedRef.current = 12;
        } else {
          speedRef.current = 1;
        }
      }
    }
  }, [moment]);

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
          initialViewState={{
            latitude: 43.6532,
            longitude: -79.3832,
            zoom: 12.5,
          }}
          navigationControl={false}
          style={{ flexGrow: 1 }}
        >
          {!isEmpty(activitySegmentFeatures) && (
            <Source
              id="activity-segments"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: activitySegmentFeatures,
              }}
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
          {!isEmpty(placeVisitFeatures) && (
            <Source
              id="place-visits"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: placeVisitFeatures,
              }}
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
        <TimelinePhoto key={photo.id} {...{ photo, timestamp: time }} />
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
            <Badge miw={170} radius="sm">
              {time.toLocaleString({
                ...DateTime.DATETIME_MED,
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
                  setMoment(({ time: prevTime }) => ({
                    time: prevTime.plus({ day: -1 }),
                    activitySegmentFeatures: [],
                    placeVisitFeatures: [],
                    photos: [],
                  }));
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
                  setMoment(({ time: prevTime }) => ({
                    time: prevTime.plus({ day: 1 }),
                    activitySegmentFeatures: [],
                    placeVisitFeatures: [],
                    photos: [],
                  }));
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

TimelinePage.layout = page => (
  <PageLayout>
    <AppMeta title="Timeline" />
    {page}
  </PageLayout>
);

export default TimelinePage;
