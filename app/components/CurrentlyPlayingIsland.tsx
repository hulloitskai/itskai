import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";

import { Image, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import PlayIcon from "~icons/heroicons/play-circle-20-solid";

import { CurrentlyPlayingIslandSubscriptionDocument } from "~/queries";
import type {
  Maybe,
  CurrentlyPlayingIslandSpotifyTrackFragment,
} from "~/queries";

const MotionImage = motion(Image);

export type CurrentlyPlayingIslandProps = Omit<BoxProps, "children">;

const CurrentlyPlayingIsland: FC<CurrentlyPlayingIslandProps> = ({
  ...otherProps
}) => {
  const { data } = useSubscription(CurrentlyPlayingIslandSubscriptionDocument, {
    variables: {},
    onError: error => {
      console.error("Failed to load currently playing track", { error });
    },
  });
  const { currentlyPlaying } = data ?? {};
  const [mounted, setMounted] = useState(false);
  const [track, setTrack] =
    useState<Maybe<CurrentlyPlayingIslandSpotifyTrackFragment>>(null);
  useEffect(() => {
    if (track) {
      setMounted(false);
    } else if (currentlyPlaying) {
      setTrack(currentlyPlaying);
      setMounted(true);
    }
  }, [currentlyPlaying]);
  return (
    <Transition
      transition="slide-down"
      onExited={() => {
        setTrack(currentlyPlaying || null);
        if (currentlyPlaying) {
          setMounted(true);
        }
      }}
      {...{ mounted }}
    >
      {style => (
        <TrackCoalescer {...{ track }}>
          {track => <CurrentTrack {...{ track, style }} {...otherProps} />}
        </TrackCoalescer>
      )}
    </Transition>
  );
};

export default CurrentlyPlayingIsland;

type TrackCoalescerProps = {
  readonly track?: Maybe<CurrentlyPlayingIslandSpotifyTrackFragment>;
  readonly children: (
    track: CurrentlyPlayingIslandSpotifyTrackFragment,
  ) => ReactNode;
};

const TrackCoalescer: FC<TrackCoalescerProps> = ({
  track: trackProp,
  children,
}) => {
  const [track, setTrack] = useState<
    Maybe<CurrentlyPlayingIslandSpotifyTrackFragment> | undefined
  >(trackProp);
  useEffect(() => {
    if (trackProp) {
      setTrack(trackProp);
    }
  }, [trackProp]);
  return <>{!!track && children(track)}</>;
};

type CurrentTrackProps = Omit<BoxProps, "children"> & {
  readonly track: CurrentlyPlayingIslandSpotifyTrackFragment;
};

const CurrentTrack: FC<CurrentTrackProps> = ({ track, sx, ...otherProps }) => {
  const {
    name,
    url,
    album: { imageUrl },
    artists,
  } = track;
  const artistNames = useMemo(
    () => artists.map(({ name }) => name).join(", ") || "(missing artists)",
    [artists],
  );
  return (
    <Tooltip
      label={
        <>
          Kai is listening to{" "}
          <Text weight={600} span>
            {name}
          </Text>{" "}
          by{" "}
          <Text weight={600} span>
            {first(artists)?.name || "(missing artists)"}
          </Text>{" "}
          right now.
        </>
      }
      multiline
      withArrow
      maw={400}
    >
      <Badge
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        variant="outline"
        color="gray.5"
        leftSection={
          <Box pos="relative" p={2}>
            <MotionImage
              src={imageUrl}
              width={24}
              height={24}
              radius="xl"
              animate={{ rotate: 360 }}
              transition={{ ease: "linear", duration: 4, repeat: Infinity }}
            />
            <Center
              pos="absolute"
              inset={0}
              sx={({ white }) => ({ color: white })}
            >
              <PlayIcon width={14} height={14} />
            </Center>
          </Box>
        }
        size="xl"
        pl={0}
        styles={({ colors }) => ({
          root: {
            height: 30,
            paddingRight: 10,
            borderColor: colors.gray[6],
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          },
          leftSection: {
            marginRight: 3,
          },
          inner: {
            maxWidth: 200,
            "> *": {
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            },
          },
        })}
        {...{ sx }}
        {...otherProps}
      >
        <Text size="xs" color="gray.3">
          {name}
        </Text>
        <Text size={10} mt={-5.5} color="gray.6">
          {artistNames}
        </Text>
      </Badge>
    </Tooltip>
  );
};
