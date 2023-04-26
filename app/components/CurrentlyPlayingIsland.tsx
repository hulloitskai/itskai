import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import PlayIcon from "~icons/heroicons/play-circle-20-solid";

import { Image, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  CurrentlyPlayingIslandQueryDocument,
  CurrentlyPlayingIslandSubscriptionDocument,
} from "~/queries";
import type { CurrentlyPlayingIslandTrackFragment } from "~/queries";
import type { Maybe } from "~/queries";

import CurrentlyPlayingLyricsTooltip from "./CurrentlyPlayingLyricsTooltip";

const MotionImage = motion(Image);

export type CurrentlyPlayingIslandProps = Omit<BoxProps, "children">;

const CurrentlyPlayingIsland: FC<CurrentlyPlayingIslandProps> = ({
  ...otherProps
}) => {
  // == Query
  const { data: queryData, refetch } = useQuery(
    CurrentlyPlayingIslandQueryDocument,
    {
      variables: {},
      onError: error => {
        console.error("Failed to load currently playing details", { error });
      },
    },
  );
  const { currentlyPlaying } = queryData ?? {};

  // == Subscription
  const { data: subscriptionData } = useSubscription(
    CurrentlyPlayingIslandSubscriptionDocument,
    {
      variables: {},
      onData: ({ data: { data } }) => {
        if (data) {
          const { track } = data?.currentlyPlaying ?? {};
          if (track?.id !== currentlyPlaying?.track?.id) {
            refetch();
          }
        }
      },
      onError: error => {
        console.error("Failed to subscribe to currently playing info", {
          error,
        });
      },
    },
  );
  const { progressMilliseconds } = subscriptionData?.currentlyPlaying ?? {};

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
          {track => (
            <_CurrentlyPlayingIsland
              {...{
                track,
                initialProgressMilliseconds: progressMilliseconds,
                transitioned,
                style,
              }}
              {...otherProps}
            />
          )}
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

type _CurrentlyPlayingIslandProps = Omit<BoxProps, "children"> & {
  readonly track: CurrentlyPlayingIslandTrackFragment;
  readonly initialProgressMilliseconds?: number;
  readonly transitioned: boolean;
};

const _CurrentlyPlayingIsland: FC<_CurrentlyPlayingIslandProps> = ({
  track,
  initialProgressMilliseconds,
  transitioned,
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

  // == Markup
  return (
    <CurrentlyPlayingLyricsTooltip
      {...(!transitioned && { disabled: true })}
      {...{ initialProgressMilliseconds }}
    >
      {currentLyricLine => {
        const { words: currentWords, isExplicit: currentlyExplicit } =
          currentLyricLine ?? {};
        const hasLyrics = !!currentWords;
        return (
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
                  borderColor: hasLyrics
                    ? currentlyExplicit
                      ? borderColorLyricsExplicit
                      : borderColorLyrics
                    : borderColorNoLyrics,
                  cursor: "pointer",
                  transitionProperty: "transform, opacity, border !important",
                  "&:hover": {
                    textDecoration: "underline",
                    ...(hasLyrics &&
                      currentlyExplicit && {
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
            {...otherProps}
          >
            <Text size="xs" color="gray.3">
              {name}
            </Text>
            <Text size={10} mt={-5.5} color="gray.6">
              {artistNames}
            </Text>
          </Badge>
        );
      }}
    </CurrentlyPlayingLyricsTooltip>
  );
};
