import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { findLast } from "lodash-es";

import { Image, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import PlayIcon from "~icons/heroicons/play-circle-20-solid";

import {
  CurrentlyPlayingIslandQueryDocument,
  CurrentlyPlayingIslandSubscriptionDocument,
} from "~/queries";
import type { Maybe, CurrentlyPlayingIslandTrackFragment } from "~/queries";

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

  // == Transition
  const [mounted, setMounted] = useState(false);
  const [transitioned, setTransitioned] = useState(false);
  const [track, setTrack] =
    useState<Maybe<CurrentlyPlayingIslandTrackFragment>>(null);
  useEffect(() => {
    if (currentlyPlaying?.track?.id !== track?.id) {
      if (track) {
        setMounted(false);
        setTransitioned(false);
      } else if (currentlyPlaying) {
        setTrack(currentlyPlaying.track);
        setMounted(true);
      }
    }
  }, [currentlyPlaying]);

  // == Markup
  return (
    <Transition
      transition="slide-down"
      onEntered={() => setTransitioned(true)}
      onExited={() => {
        setTrack(currentlyPlaying?.track ?? null);
        if (currentlyPlaying) {
          setMounted(true);
        }
      }}
      {...{ mounted }}
    >
      {style => (
        <TrackCoalescer {...{ track }}>
          {track => {
            const { progressMilliseconds = 0 } = currentlyPlaying ?? {};
            return (
              <CurrentTrack
                {...{ track, progressMilliseconds, transitioned, style }}
                {...otherProps}
              />
            );
          }}
        </TrackCoalescer>
      )}
    </Transition>
  );
};

export default CurrentlyPlayingIsland;

type TrackCoalescerProps = {
  readonly track?: Maybe<CurrentlyPlayingIslandTrackFragment>;
  readonly children: (track: CurrentlyPlayingIslandTrackFragment) => ReactNode;
};

const TrackCoalescer: FC<TrackCoalescerProps> = ({
  track: trackProp,
  children,
}) => {
  const [track, setTrack] = useState<
    Maybe<CurrentlyPlayingIslandTrackFragment> | undefined
  >(trackProp);
  useEffect(() => {
    if (trackProp) {
      setTrack(trackProp);
    }
  }, [trackProp]);
  return <>{!!track && children(track)}</>;
};

type CurrentTrackProps = Omit<BoxProps, "children"> & {
  readonly track: CurrentlyPlayingIslandTrackFragment;
  readonly progressMilliseconds: number;
  readonly transitioned: boolean;
};

const CurrentTrack: FC<CurrentTrackProps> = ({
  track,
  progressMilliseconds: progressMillisecondsProp,
  transitioned,
  sx,
  ...otherProps
}) => {
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

  // == Progress
  const [progressMilliseconds, setProgressMilliseconds] = useState(
    progressMillisecondsProp,
  );
  useEffect(() => {
    setProgressMilliseconds(progressMillisecondsProp);
    const increment = 500;
    const interval = setInterval(() => {
      setProgressMilliseconds(
        progressMilliseconds => progressMilliseconds + increment,
      );
    }, increment);
    return () => {
      clearInterval(interval);
    };
  }, [progressMillisecondsProp]);

  // == Query
  const { data } = useQuery(CurrentlyPlayingIslandQueryDocument, {
    fetchPolicy: "no-cache",
    variables: {},
    onError: error => {
      console.error("Failed to load lyrics for currently playing track", {
        error,
      });
    },
  });
  const { lyrics } = data?.currentlyPlaying?.track ?? {};

  // == Lyrics
  const currentLyric = useMemo(() => {
    if (lyrics) {
      return findLast(
        lyrics,
        ({ startTimeMilliseconds }) =>
          progressMilliseconds >= startTimeMilliseconds,
      );
    }
    return null;
  }, [lyrics, progressMilliseconds]);
  const [currentWords, setCurrentWords] = useState("");
  useEffect(() => {
    if (currentLyric?.words) {
      const { words, isExplicit } = currentLyric;
      if (!isExplicit) {
        setCurrentWords(words);
      } else {
        setTimeout(() => {
          setCurrentWords(words);
        }, 100);
      }
    }
  }, [currentLyric]);
  const showLyrics = transitioned && !!currentLyric?.words;
  const isExplicit = currentLyric?.isExplicit;

  // == Markup
  return (
    <Tooltip
      label={currentWords}
      multiline
      withArrow
      color="pink"
      transitionProps={{ duration: 200 }}
      disabled={!showLyrics}
      maw={400}
      fz="xs"
      styles={{
        tooltip: {
          lineHeight: 1.3,
        },
      }}
      {...(isExplicit === false && { opened: showLyrics })}
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
        styles={({ colors, fn }) => {
          const borderColorNoLyrics = colors.dark[3];
          const borderColorLyrics = fn.darken(colors.pink[5], 0.1);
          const borderColorLyricsExplicit = fn.darken(colors.pink[5], 0.4);
          return {
            root: {
              height: 30,
              paddingRight: 10,
              borderColor: showLyrics
                ? isExplicit
                  ? borderColorLyricsExplicit
                  : borderColorLyrics
                : borderColorNoLyrics,
              cursor: "pointer",
              transitionProperty: "transform, opacity, border !important",
              "&:hover": {
                textDecoration: "underline",
                ...(showLyrics &&
                  isExplicit && {
                    borderColor: borderColorLyrics,
                  }),
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
          };
        }}
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
