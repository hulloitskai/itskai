import type { FC } from "react";
import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import type { Feature, FeatureCollection, LineString } from "geojson";
import { DateTime } from "luxon";

import { Image } from "@mantine/core";
import type { ImageProps } from "@mantine/core";

import lineSliceAlong from "@turf/line-slice-along";
import lineLength from "@turf/length";
// import pointOnFeature from "@turf/point-on-feature";

import type { MapRef } from "react-map-gl";
import { Source, Layer } from "react-map-gl";

import {
  GoogleTimelineActivityType,
  Xmas2023ActivitiesQueryDocument,
} from "~/helpers/graphql";
import type {
  Coordinates,
  Xmas2023PageQuery,
  Xmas2023TimelinePhotoFragment,
} from "~/helpers/graphql";

import PageLayout from "~/components/PageLayout";
import Map from "~/components/Map";

// import { AnimatePresence } from "framer-motion";

const TORONTO_COORDINATES: Readonly<Coordinates> = {
  latitude: 43.6532,
  longitude: -79.3832,
};

export type Xmas2023PageProps = PagePropsWithData<Xmas2023PageQuery>;

type XmasTimelinePhotoWithOpacity = Xmas2023TimelinePhotoFragment & {
  readonly opacity: number;
};

const truncateActivityIfNecessary = (
  timestamp: DateTime,
  cutoff: DateTime,
  startedAt: DateTime,
  endedAt: DateTime,
  feature: Feature<LineString>,
): Feature<LineString> => {
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
    return lineSliceAlong(feature, startDistance, stopDistance);
  } catch (error) {
    console.warn(`Failed to slice LineString: ${error}`);
    return feature;
  }
};

const deriveActivityOpacity = (
  cutoff: DateTime,
  startedAt: DateTime,
): number => {
  const diffFromCutoff = startedAt.diff(cutoff).as("hours");
  return Math.min(1.0, diffFromCutoff / 4);
};

const stringHash = (str: string): number => {
  const hash = str
    .split("")
    .reduce(
      (hashCode, currentVal) =>
        (hashCode =
          currentVal.charCodeAt(0) +
          (hashCode << 6) +
          (hashCode << 16) -
          hashCode),
      0,
    );
  return Math.abs(hash);
};

const Xmas2023Page: PageComponent<Xmas2023PageProps> = () => {
  const isClient = useIsClient();

  // == Activities
  const onError = useApolloAlertCallback("Failed to load activities");
  const { data, loading } = useQuery(Xmas2023ActivitiesQueryDocument, {
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
  useEffect(() => {
    if (activities) {
      const february = DateTime.fromObject({ year: 2023, month: 2, day: 1 });
      const interval = setInterval(() => {
        setTimestamp(prevTimestamp => {
          if (prevTimestamp < february) {
            return prevTimestamp.plus({ minutes: 1 });
          }
          return prevTimestamp;
        });
      }, 1);
      return () => {
        clearInterval(interval);
      };
    }
  }, [activities]);

  // == Path
  const [path, setPath] = useState<FeatureCollection<LineString> | null>(null);
  const [photos, setPhotos] = useState<
    ReadonlyArray<XmasTimelinePhotoWithOpacity>
  >([]);
  useEffect(() => {
    if (activities) {
      const path: FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: [],
      };
      const photos: XmasTimelinePhotoWithOpacity[] = [];
      for (const activity of activities) {
        const startedAt = DateTime.fromISO(activity.startedAt);
        const endedAt = DateTime.fromISO(activity.endedAt);
        const cutoff = timestamp.plus({ day: -1 });
        if (endedAt < cutoff || startedAt > timestamp) {
          continue;
        }
        const opacity = deriveActivityOpacity(cutoff, startedAt);
        activity.photos.forEach(photo => {
          photos.push({ ...photo, opacity });
        });
        if (activity.type !== GoogleTimelineActivityType.ActivitySegment) {
          continue;
        }
        const feature: Feature<LineString> = {
          type: "Feature",
          properties: {
            opacity,
          },
          geometry: activity.location,
        };
        path.features.push(
          truncateActivityIfNecessary(
            timestamp,
            cutoff,
            startedAt,
            endedAt,
            feature,
          ),
        );
      }
      setPath(path);
      setPhotos(photos);
    }
  }, [activities, timestamp]);
  useEffect(() => {
    if (path) {
      const lastFeature = last(path.features);
      if (lastFeature) {
        const lastCoordinate = last(lastFeature.geometry.coordinates);
        if (lastCoordinate) {
          mapRef.current?.flyTo({
            center: lastCoordinate as [number, number],
            animate: false,
          });
        }
      }
    }
  }, [path]);
  // const activitiesData = useMemo<
  //   FeatureCollection<Point | LineString> | undefined
  // >(() => {
  //   if (activities) {
  //     return {
  //       type: "FeatureCollection",
  //       features: activities.map(({ location }) => ({
  //         type: "Feature",
  //         properties: {},
  //         geometry: location,
  //       })),
  //     };
  //   }
  // }, [activities]);

  return (
    <Flex
      pos="relative"
      h="100dvh"
      style={{ flexGrow: 1, alignItems: "stretch", flexDirection: "column" }}
    >
      {isClient && (
        <Map
          ref={mapRef}
          mapStyle="mapbox://styles/mapbox-map-design/cks97e1e37nsd17nzg7p0308g"
          initialViewState={{ ...mapCenter, zoom: 11.5 }}
          navigationControl={false}
          style={{ flexGrow: 1 }}
        >
          {path && (
            <Source id="activities" type="geojson" data={path} lineMetrics>
              <Layer
                id="activities-lines"
                type="line"
                paint={{
                  "line-color": "#FF4499",
                  "line-width": 3,
                  "line-opacity": ["get", "opacity"],
                }}
                layout={{
                  "line-cap": "round",
                }}
              />
              {/* <Layer
              id="activities-dots"
              type="fill"
              paint={{
                "fill-color": "coral",
              }}
            /> */}
            </Source>
          )}
          {/* {photos.map(({ key, src, latitude, longitude }) => (
            <Marker key={key} {...{ latitude, longitude }}>
              <Image w={140} h={140} fit="contain" {...{ src }} />
            </Marker>
          ))} */}
        </Map>
      )}
      <LoadingOverlay visible={loading} />
      <Center
        pos="absolute"
        style={({ spacing }) => ({
          left: spacing.md,
          right: spacing.md,
          bottom: spacing.lg,
        })}
      >
        <Alert
          title={timestamp.toLocaleString(DateTime.DATETIME_MED)}
          variant="white"
          miw={440}
          p="xs"
        />
      </Center>
      {photos.map(photo => (
        <TimelinePhoto key={photo.id} {...{ photo }} />
      ))}
    </Flex>
  );
};

Xmas2023Page.layout = page => <PageLayout>{page}</PageLayout>;

export default Xmas2023Page;

type TimelinePhotoProps = ImageProps & {
  readonly photo: XmasTimelinePhotoWithOpacity;
};

const TimelinePhoto: FC<TimelinePhotoProps> = ({
  photo: { id, image, opacity },
  ...otherProps
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const size = 540;
  const hash = useMemo(() => stringHash(id), [id]);
  const rotation = useMemo(() => Math.floor(hash % 18), [hash]);
  const xOffset = useMemo(() => Math.floor(hash % 120), [hash]);
  const yOffset = useMemo(() => Math.floor((hash + 30) % 80), [hash]);
  const corner = useMemo(() => Math.floor(hash % 4), [hash]);
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
          {...{ opacity }}
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
