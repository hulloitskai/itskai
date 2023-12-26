import type { FC } from "react";
import type { PageProps } from "@inertiajs/core";
import type { PageComponent } from "~/helpers/inertia";
import type { Feature, FeatureCollection, LineString, Point } from "geojson";
import { DateTime } from "luxon";

import { Image } from "@mantine/core";
import type { ImageProps } from "@mantine/core";

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
  feature: XmasActivitySegmentFeature,
): XmasActivitySegmentFeature => {
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
    ) as XmasActivitySegmentFeature;
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

type XmasActivitySegmentProperties = {
  readonly startedAt: DateTime;
  readonly endedAt: DateTime;
  readonly opacity: number;
};

type XmasActivitySegmentFeature = Feature<
  LineString,
  XmasActivitySegmentProperties
>;

type XmasActivitySegmentFeatureCollection = FeatureCollection<
  LineString,
  XmasActivitySegmentProperties
>;

type XmasPlaceVisitProperties = {
  readonly name: string | null;
  readonly opacity: number;
};

type XmasPlaceVisitFeature = Feature<Point, XmasPlaceVisitProperties>;

type XmasPlaceVisitFeatureCollection = FeatureCollection<
  Point,
  XmasPlaceVisitProperties
>;

const TimelinePage: PageComponent<TimelinePageProps> = () => {
  const isClient = useIsClient();

  // == Activities
  const onError = useApolloAlertCallback("Failed to load activities");
  const { data, loading } = useQuery(TimelineActivitiesQueryDocument, {
    variables: {},
    onError,
  });
  const { activities } = data ?? {};

  // == Map
  const mapRef = useRef<MapRef>(null);
  const mapCenter = TORONTO_COORDINATES;

  // == Timestamp
  const [timestamp, setTimestamp] = useState(() =>
    DateTime.fromObject({ year: 2023, month: 1, day: 3 }),
  );
  const speedRef = useRef(1);
  useEffect(() => {
    if (activities) {
      const february = DateTime.fromObject({ year: 2023, month: 6, day: 1 });
      const interval = setInterval(() => {
        setTimestamp(prevTimestamp => {
          if (prevTimestamp < february) {
            return prevTimestamp.plus({ minutes: speedRef.current });
          }
          return prevTimestamp;
        });
      }, 1.1);
      return () => {
        clearInterval(interval);
      };
    }
  }, [activities, speedRef]);

  // == Photos
  const [photos, setPhotos] = useState<ReadonlyArray<TimelinePhotoFragment>>(
    [],
  );
  const lastPhotoTimeZone = useMemo(() => {
    const lastPhoto = last(photos);
    if (lastPhoto) {
      const takenAt = DateTime.fromISO(lastPhoto.takenAt);
      return takenAt.zoneName;
    }
  }, [timestamp, photos]);
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

  // == Path
  const [activityFeatures, setActivityFeatures] =
    useState<XmasActivitySegmentFeatureCollection | null>(null);
  const [visitFeatures, setVisitFeatures] =
    useState<XmasPlaceVisitFeatureCollection | null>(null);
  useEffect(() => {
    if (activities) {
      const newActivityFeatures: XmasActivitySegmentFeatureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      const newVisitFeatures: XmasPlaceVisitFeatureCollection = {
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
        const opacity = deriveActivityOpacity(timestamp, startedAt);
        if (activity.type === TimelineActivityType.PlaceVisit) {
          const feature: XmasPlaceVisitFeature = {
            type: "Feature",
            properties: {
              name: activity.name ?? null,
              opacity,
            },
            geometry: activity.location,
          };
          newVisitFeatures.features.push(feature);
        } else if (activity.type === TimelineActivityType.ActivitySegment) {
          const feature: XmasActivitySegmentFeature = {
            type: "Feature",
            properties: {
              startedAt,
              endedAt,
              opacity,
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
  useEffect(() => {
    if (activityFeatures) {
      const lastFeature = last(activityFeatures.features);
      if (lastFeature) {
        const { properties, geometry } = lastFeature;
        const lastCoordinate = last(geometry.coordinates);
        if (lastCoordinate) {
          mapRef.current?.flyTo({
            center: lastCoordinate as [number, number],
            animate: false,
          });
          if (timestamp > properties.endedAt) {
            speedRef.current = 6;
          } else {
            speedRef.current = 1;
          }
        }
      }
    }
  }, [activityFeatures]);

  return (
    <Flex
      pos="relative"
      h="100dvh"
      style={{ flexGrow: 1, alignItems: "stretch", flexDirection: "column" }}
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
      <LoadingOverlay visible={loading} loaderProps={{ size: "md" }} />
      <Center
        pos="absolute"
        style={({ spacing }) => ({
          left: spacing.md,
          right: spacing.md,
          bottom: spacing.lg,
        })}
      >
        <Alert
          title={timestamp.toLocaleString({
            ...DateTime.DATETIME_MED,
            timeZone: lastPhotoTimeZone,
            timeZoneName: "short",
          })}
          variant="white"
          miw={440}
          p="xs"
        />
      </Center>
      {take(photos, shownPhotosCount).map(photo => (
        <TimelinePhoto key={photo.id} {...{ photo }} />
      ))}
    </Flex>
  );
};

TimelinePage.layout = page => <PageLayout>{page}</PageLayout>;

export default TimelinePage;

type TimelinePhotoProps = ImageProps & {
  readonly photo: TimelinePhotoFragment;
};

const TimelinePhoto: FC<TimelinePhotoProps> = ({
  photo: { id, image },
  ...otherProps
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      setMounted(false);
    }, 8000);
  }, []);
  const size = 540;
  const key = useMemo(() => Math.floor(Math.random() * 1_000_000), [id]);
  const rotation = useMemo(() => Math.floor(key % 18), [key]);
  const xOffset = useMemo(() => Math.floor(key % 80), [key]);
  const yOffset = useMemo(() => Math.floor((key + 30) % 80), [key]);
  const corner = useMemo(() => Math.floor(key % 4), [key]);
  return (
    <Transition transition="pop" {...{ mounted }}>
      {style => (
        <Image
          pos="absolute"
          w={size}
          h={size}
          fit="contain"
          src={image.url}
          style={[
            style,
            { rotate: `${corner % 2 == 0 ? rotation : -rotation}deg` },
          ]}
          {...(corner === 0 && { left: xOffset, top: yOffset })}
          {...(corner === 1 && { right: xOffset, top: yOffset })}
          {...(corner === 2 && { right: xOffset, bottom: yOffset })}
          {...(corner === 3 && { left: xOffset, bottom: yOffset })}
          {...otherProps}
        />
      )}
    </Transition>
  );
};
