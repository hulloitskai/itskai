import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import PlayIcon from "~icons/heroicons/play-circle-20-solid";

import type { BoxProps, ImageProps, TextProps } from "@mantine/core";
import { Image, Text } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";

import type { CurrentlyPlayingIslandTrackFragment } from "~/helpers/graphql";
import {
  ActivateSpotifyJamSessionMutationDocument,
  CurrentlyPlayingIslandQueryDocument,
  CurrentlyPlayingIslandSubscriptionDocument,
} from "~/helpers/graphql";

import CurrentlyPlayingLyricsTooltip from "./CurrentlyPlayingLyricsTooltip";

import classes from "./CurrentlyPlayingIsland.module.css";

const MotionImage = motion<
  ImageProps & Omit<ComponentPropsWithoutRef<"img">, "style" | "src">
>(Image);

export type CurrentlyPlayingIslandProps = BoxProps;

type TransitionState = {
  mounted: boolean;
  transitioned: boolean;
};

const CurrentlyPlayingIsland: FC<CurrentlyPlayingIslandProps> = ({
  ...otherProps
}) => {
  const { online } = useNetwork();

  // == Currently Playing Loading
  const { data: currentlyPlayingData, refetch: refetchCurrentlyPlaying } =
    useQuery(CurrentlyPlayingIslandQueryDocument, {
      fetchPolicy: "no-cache",
      variables: {},
      onError: error => {
        console.error(
          "Failed to load currently playing details",
          formatJSON({ error }),
        );
      },
    });
  const { currentlyPlaying } = currentlyPlayingData ?? {};

  // == Watching Currently Playing
  const { data: currentlyPlayingSubscription } = useSubscription(
    CurrentlyPlayingIslandSubscriptionDocument,
    {
      variables: {},
      onData: ({ data: { data, error } }) => {
        if (data) {
          const { track } = data?.currentlyPlaying ?? {};
          if (track?.id !== currentlyPlaying?.track?.id) {
            refetchCurrentlyPlaying();
          }
        } else if (error) {
          console.error(
            "Error while watching currently playing updates",
            formatJSON({ error }),
          );
        }
      },
      onError: error => {
        console.error(
          "Failed to watch currently playing updates",
          formatJSON({ error }),
        );
      },
    },
  );
  const { currentlyPlaying: currentlyPlayingMetadata } =
    currentlyPlayingSubscription ?? {};
  const progressMilliseconds = useMemo(() => {
    if (currentlyPlayingMetadata) {
      const { progressMilliseconds } = currentlyPlayingMetadata;
      const timestamp = DateTime.fromISO(currentlyPlayingMetadata.timestamp);
      const ellapsedMilliseconds = DateTime.now()
        .diff(timestamp)
        .as("milliseconds");
      return progressMilliseconds + ellapsedMilliseconds - 1200;
    }
  }, [currentlyPlayingMetadata]);

  // == Transition
  const [{ mounted, transitioned }, setTransitionState] =
    useState<TransitionState>({
      mounted: false,
      transitioned: false,
    });
  const [track, setTrack] =
    useState<CurrentlyPlayingIslandTrackFragment | null>(null);
  useEffect(() => {
    if (online) {
      if (currentlyPlaying?.track?.id !== track?.id) {
        if (track) {
          setTransitionState({ mounted: false, transitioned: false });
        } else if (currentlyPlaying) {
          setTrack(currentlyPlaying.track);
          if (!mounted) {
            setTransitionState({
              mounted: true,
              transitioned: false,
            });
          }
        }
      }
    } else {
      if (mounted) {
        setTransitionState({ mounted: false, transitioned: false });
      }
    }
  }, [online, currentlyPlaying, mounted, track]);

  return (
    <Transition
      transition="slide-down"
      onEntered={() =>
        setTransitionState({ mounted: true, transitioned: true })
      }
      onExited={() => {
        setTrack(currentlyPlaying?.track ?? null);
        if (currentlyPlaying && online) {
          setTransitionState({ mounted: true, transitioned: false });
        } else {
          setTransitionState({ mounted: false, transitioned: true });
        }
      }}
      {...{ mounted }}
    >
      {style => (
        <TrackCoalescer {...{ track }}>
          {track => (
            <_CurrentlyPlayingIsland
              {...{ track, progressMilliseconds, transitioned, style }}
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
  track?: CurrentlyPlayingIslandTrackFragment | null;
  children: (track: CurrentlyPlayingIslandTrackFragment) => ReactNode;
};

const TrackCoalescer: FC<TrackCoalescerProps> = ({
  track: trackProp,
  children,
}) => {
  const [track, setTrack] = useState<
    CurrentlyPlayingIslandTrackFragment | null | undefined
  >(trackProp);
  useEffect(() => {
    if (trackProp) {
      setTrack(trackProp);
    }
  }, [trackProp]);
  return <>{!!track && children(track)}</>;
};

type _CurrentlyPlayingIslandProps = BoxProps & {
  track: CurrentlyPlayingIslandTrackFragment;
  progressMilliseconds?: number;
  transitioned: boolean;
};

const _CurrentlyPlayingIsland: FC<_CurrentlyPlayingIslandProps> = ({
  track,
  progressMilliseconds,
  transitioned,
  style,
  ...otherProps
}) => {
  const {
    name,
    album: { imageUrl },
    artists,
    durationMilliseconds,
  } = track;
  const artistNames = useMemo(
    () => artists.map(({ name }) => name).join(", ") || "(missing artists)",
    [artists],
  );

  // == Activating Jam Session
  const onActivateJamSessionError = useApolloAlertCallback(
    "Failed to activate jam session",
  );
  const [activateJamSession, { loading: activatingJamSession }] = useMutation(
    ActivateSpotifyJamSessionMutationDocument,
    {
      onError: onActivateJamSessionError,
    },
  );

  return (
    <>
      <CurrentlyPlayingLyricsTooltip
        withinPortal={false}
        {...(!transitioned && { disabled: true })}
        {...{ durationMilliseconds, progressMilliseconds }}
      >
        {currentLyricLine => {
          const { words: currentWords } = currentLyricLine ?? {};
          const hasLyrics = !!currentWords;
          return (
            <Badge
              component="button"
              size="xl"
              leftSection={
                <Box pos="relative" p={2} mr={3}>
                  <MotionImage
                    src={imageUrl}
                    w={26}
                    h={26}
                    radius="xl"
                    animate={{ rotate: 360 }}
                    transition={{
                      ease: "linear",
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />
                  <Center
                    pos="absolute"
                    inset={0}
                    style={({ white }) => ({ color: white })}
                  >
                    <PlayIcon width={14} height={14} />
                  </Center>
                </Box>
              }
              variant="outline"
              color="dark.3"
              pl={0}
              className={classes.badge}
              style={[
                style,
                theme => {
                  const borderColor = parseThemeColor({
                    theme,
                    color: theme.primaryColor,
                  }).value;
                  return {
                    "--cpi-border-color-active": borderColor,
                  };
                },
              ]}
              styles={{
                section: {
                  margin: 0,
                },
                label: {
                  maxWidth: 200,
                  textTransform: "none",
                },
              }}
              mod={{
                "with-lyrics": hasLyrics,
              }}
              onClick={() => {
                const newTab = open("./loading", "_blank");
                activateJamSession({
                  variables: {
                    input: {},
                  },
                }).then(({ data }) => {
                  if (newTab) {
                    if (data) {
                      newTab.location.href = data.payload.session.joinUrl;
                    } else {
                      newTab.close();
                    }
                  } else {
                    console.warn("Missing new tab reference");
                  }
                });
              }}
              {...otherProps}
            >
              <MarqueeText size="xs" fw={800} className={classes.trackName}>
                {name}
              </MarqueeText>
              <MarqueeText fz={10} fw={700} className={classes.artistNames}>
                {artistNames}
              </MarqueeText>
              <LoadingOverlay visible={activatingJamSession} />
            </Badge>
          );
        }}
      </CurrentlyPlayingLyricsTooltip>
    </>
  );
};

type MarqueeTextProps = TextProps & ComponentPropsWithoutRef<"p">;

const MarqueeText: FC<MarqueeTextProps> = ({ children, ...otherProps }) => {
  const textRef = useRef<HTMLDivElement>(null);

  // == Play State
  const [play, setPlay] = useState(false);
  useLayoutEffect(() => {
    const el = textRef.current;
    if (el) {
      if (el.clientWidth > 200) {
        setPlay(true);
      }
    }
  }, []);

  return (
    <Marquee pauseOnHover pauseOnClick speed={18} delay={1} {...{ play }}>
      <Text
        ref={textRef}
        lh={1.1}
        mr={play ? 24 : 0}
        className={classes.marqueeText}
        {...otherProps}
      >
        {children}
      </Text>
    </Marquee>
  );
};
