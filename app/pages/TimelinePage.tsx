import type { PageComponent } from "~/helpers/inertia";
import type { SharedPageProps } from "~/types";
import type { Feature, LineString, Point } from "geojson";
import { DateTime } from "luxon";
import { AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "react-use-audio-player";
import { countBy, maxBy } from "lodash-es";

import ResumeIcon from "~icons/heroicons/play-20-solid";
import PauseIcon from "~icons/heroicons/pause-20-solid";
import ForwardIcon from "~icons/heroicons/forward-20-solid";
import BackwardIcon from "~icons/heroicons/backward-20-solid";

import lineSliceAlong from "@turf/line-slice-along";
import lineLength from "@turf/length";

import type { MapRef } from "react-map-gl";
import { Source, Layer } from "react-map-gl";

import { ActionIcon } from "@mantine/core";

import PageLayout from "~/components/PageLayout";
import AppMeta from "~/components/AppMeta";
import Map from "~/components/Map";
import TimelinePagePhoto from "~/components/TimelinePagePhoto";

import fallUnderneathSrc from "~/assets/sounds/fall-underneath.mp3";

export interface TimelinePageProps extends SharedPageProps {}

type TimelineSharedFeatureProperties = {
  opacity: number;
  zoom: number;
};

type TimelineActivitySegmentProperties = TimelineSharedFeatureProperties & {
  startedAt: DateTime;
  endedAt: DateTime;
};

type TimelineActivitySegmentFeature = Feature<
  LineString,
  TimelineActivitySegmentProperties
>;

type TimelinePlaceVisitProperties = TimelineSharedFeatureProperties & {
  name: string | null;
};

type TimelinePlaceVisitFeature = Feature<Point, TimelinePlaceVisitProperties>;

type TimelinePhotoFragment = any;
type TimelinePageActivityFragment = any;
enum TimelineActivityType {
  PlaceVisit = "place_visit",
  ActivitySegment = "activity_segment",
}

type TimelineMoment = {
  time: DateTime;
  activitySegmentFeatures: TimelineActivitySegmentFeature[];
  placeVisitFeatures: TimelinePlaceVisitFeature[];
  lastFeature:
    | TimelineActivitySegmentFeature
    | TimelinePlaceVisitFeature
    | null;
  photos: TimelinePhotoFragment[];
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
    const { type, geometry } = lineSliceAlong(
      feature,
      startDistance,
      stopDistance,
    );
    const { properties } = feature;
    return { type, properties, geometry };
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
  return Math.min(1.0, 1.035 ** -x - 0.3);
};

const deriveTimelineActivityZoom = (
  movementSpeedMetersPerSecond: number,
): number => {
  if (movementSpeedMetersPerSecond > 100) {
    return 5;
  }
  return 12.5;
};

const TimelinePage: PageComponent<TimelinePageProps> = () => {
  const isClient = useIsClient();

  // == Moment
  const [moment, setMoment] = useState<TimelineMoment>(() => ({
    time: DateTime.fromObject({ year: 2023, month: 8, day: 28 }).setZone(
      "America/Toronto",
      { keepLocalTime: true },
    ),
    activitySegmentFeatures: [],
    placeVisitFeatures: [],
    lastFeature: null,
    photos: [],
  }));
  const { time, activitySegmentFeatures, placeVisitFeatures, photos } = moment;

  // == Controls
  const [paused, setPaused] = useState(true);
  const speedRef = useRef(1);
  const zoomRef = useRef(12.5);

  // == Audio player
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
        if (audioPlayer.playing) {
          audioPlayer.pause();
        }
      } else {
        // audioPlayer.play();
      }
    },
    [paused] /* eslint-disable-line react-hooks/exhaustive-deps */,
  );

  // == Activities
  const activitiesRef = useRef<ReadonlyArray<TimelinePageActivityFragment>>([]);

  // == Preloaded photos
  const [preloadedPhotoIdsInitialValue] = useState<Set<string>>(new Set());
  const preloadedPhotoIdsRef = useRef(preloadedPhotoIdsInitialValue);

  // == Activities Loading
  // const onLoadActivitiesError = useApolloAlertCallback(
  //   "Failed to load activities",
  // );
  // const windowStart = useMemo(() => time.startOf("week").toISO(), [time]);
  // const windowEnd = useMemo(
  //   () => time.endOf("week").plus({ days: 4 }).toISO(),
  //   [time],
  // );
  // const {
  //   data: activitiesData,
  //   previousData: previousActivitiesData,
  //   loading: loadingActivities,
  // } = useQuery(TimelinePageActivitiesQueryDocument, {
  //   variables: {
  //     after: windowStart,
  //     before: windowEnd,
  //   },
  //   onCompleted: ({ activities }) => {
  //     activitiesRef.current = activities;
  //   },
  //   onError: onLoadActivitiesError,
  // });
  // const coalescedData = activitiesData ?? previousActivitiesData;
  const coalescedData: any = undefined;

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
          let lastFeature:
            | TimelineActivitySegmentFeature
            | TimelinePlaceVisitFeature
            | null = null;
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
              zoom: deriveTimelineActivityZoom(
                activity.movementSpeedMetersPerSecond,
              ),
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
              lastFeature = feature;
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
              lastFeature = maybeTruncatedFeature;
              activitySegmentFeatures.push(maybeTruncatedFeature);
            }
            timezoneNames.push(activity.timezoneName);
            activity.photos.forEach((photo: any) => {
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
            lastFeature,
            photos,
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
    const { lastFeature, photos } = moment;
    if (!lastFeature) {
      return;
    }
    const {
      properties: { zoom },
      geometry,
    } = lastFeature;
    const lastPosition =
      geometry.type === "Point"
        ? geometry.coordinates
        : last(geometry.coordinates);
    if (!lastPosition) {
      return;
    }
    const map = mapRef.current;
    if (map) {
      if (zoomRef.current !== zoom) {
        zoomRef.current = zoom;
        // map.zoomTo(zoom,);
      }
      map.jumpTo({
        center: lastPosition as [number, number],
        zoom,
      });
    }
    if (geometry.type === "Point" && isEmpty(photos)) {
      speedRef.current = 12;
    } else {
      speedRef.current = 1;
    }
  }, [moment]);

  const ready = !!coalescedData && audioPlayer.isReady;
  return (
    <Flex
      pos="relative"
      h="100dvh"
      style={{
        alignItems: "stretch",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {isClient && (
        <Map
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox-map-design/ckshxkppe0gge18nz20i0nrwq"
          // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          initialViewState={{
            latitude: 43.6532,
            longitude: -79.3832,
            zoom: zoomRef.current,
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
      <AnimatePresence>
        {photos.map(photo => (
          <TimelinePagePhoto key={photo.id} {...{ photo }} />
        ))}
      </AnimatePresence>
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
            <Badge size="lg" radius="sm" miw={220}>
              {time.toLocaleString({
                ...DateTime.DATETIME_MED,
                timeZoneName: "short",
              })}
            </Badge>
            {/* {loadingActivities && <Loader size="xs" />} */}
            <Box style={{ flexGrow: 1 }} />
            {paused && (
              <Tooltip color="primary" label="Start" withArrow>
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
              <Tooltip color="primary" label="Pause" withArrow>
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
            <Tooltip label="Rewind 1 day" color="primary" withArrow>
              <ActionIcon
                variant="light"
                onClick={() => {
                  setMoment(({ time: prevTime }) => ({
                    time: prevTime.plus({ day: -1 }),
                    activitySegmentFeatures: [],
                    placeVisitFeatures: [],
                    lastFeature: null,
                    photos: [],
                  }));
                }}
              >
                <BackwardIcon />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Skip ahead 1 day" color="primary" withArrow>
              <ActionIcon
                variant="light"
                onClick={() => {
                  setMoment(({ time: prevTime }) => ({
                    time: prevTime.plus({ day: 1 }),
                    activitySegmentFeatures: [],
                    placeVisitFeatures: [],
                    lastFeature: null,
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
