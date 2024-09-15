import { type ImageProps, type TextProps } from "@mantine/core";
import { Image, Text } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import Marquee from "react-fast-marquee";

import PlayIcon from "~icons/heroicons/play-circle-20-solid";

import {
  type CurrentlyPlaying,
  type CurrentlyPlayingMetadata,
  type RSpotifyTrack,
} from "~/types";

import CurrentlyPlayingLyricsTooltip from "./CurrentlyPlayingLyricsTooltip";

import classes from "./CurrentlyPlayingIsland.module.css";

const MotionImage = motion<
  ImageProps & Omit<ComponentPropsWithoutRef<"img">, "style" | "src">
>(Image);

export interface CurrentlyPlayingIslandProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {}

type TransitionState = {
  mounted: boolean;
  transitioned: boolean;
};

const CurrentlyPlayingIsland: FC<CurrentlyPlayingIslandProps> = ({
  ...otherProps
}) => {
  const { online } = useNetwork();

  // == Track
  const { data, mutate } = useFetch<{
    currentlyPlaying: CurrentlyPlaying;
  }>(routes.currentlyPlayings.show, {
    descriptor: "load currently playing track",
  });
  const { currentlyPlaying } = data ?? {};

  // == Metadata
  const { data: subscriptionData } = useSubscription<{
    currentlyPlaying: CurrentlyPlayingMetadata;
  }>("CurrentlyPlayingChannel", {
    descriptor: "subscribe to currently playing feed",
    failSilently: true,
  });
  const { currentlyPlaying: metadata } = subscriptionData ?? {};
  const progressMs = useMemo(() => {
    if (metadata) {
      const { progressMs, timestamp: timestampISO } = metadata;
      const timestamp = DateTime.fromISO(timestampISO);
      const elappsedMs = DateTime.now().diff(timestamp).as("milliseconds");
      return progressMs + elappsedMs - 1200;
    }
  }, [metadata]);

  // == Transition
  const [{ mounted, transitioned }, setTransitionState] =
    useState<TransitionState>({
      mounted: false,
      transitioned: false,
    });
  const [track, setTrack] = useState<RSpotifyTrack | null>(null);
  useEffect(() => {
    if (online) {
      if (metadata?.trackId !== track?.id) {
        if (track) {
          setTransitionState({ mounted: false, transitioned: false });
          mutate();
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
  }, [online, metadata, mounted, track]); // eslint-disable-line react-hooks/exhaustive-deps

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
              {...{
                track,
                progressMs,
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
  track?: any | null;
  children: (track: any) => ReactNode;
};

const TrackCoalescer: FC<TrackCoalescerProps> = ({
  children,
  track: trackProp,
}) => {
  const [track, setTrack] = useState<RSpotifyTrack | null | undefined>(
    trackProp,
  );
  useEffect(() => {
    if (trackProp) {
      setTrack(trackProp);
    }
  }, [trackProp]);
  return <>{!!track && children(track)}</>;
};

type _CurrentlyPlayingIslandProps = BoxProps & {
  track: RSpotifyTrack;
  progressMs?: number;
  transitioned: boolean;
};

const _CurrentlyPlayingIsland: FC<_CurrentlyPlayingIslandProps> = ({
  progressMs,
  style,
  track,
  transitioned,
  ...otherProps
}) => {
  const { album, artists, durationMs, name } = track;
  const artistNames = useMemo(
    () =>
      artists.map(({ name }: any) => name).join(", ") || "(missing artists)",
    [artists],
  );

  // == Join jam session
  const { processing, submit } = useInertiaForm({
    action: routes.spotifyJamSessions.join,
    method: "post",
    descriptor: "join Spotify jam session",
  });

  return (
    <CurrentlyPlayingLyricsTooltip
      withinPortal={false}
      {...(!transitioned && { disabled: true })}
      {...{
        track,
        durationMs,
        progressMs,
      }}
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
                  src={album.imageUrl}
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
              submit();
            }}
            {...otherProps}
          >
            <MarqueeText size="xs" fw={800} className={classes.trackName}>
              {name}
            </MarqueeText>
            <MarqueeText fz={10} fw={700} className={classes.artistNames}>
              {artistNames}
            </MarqueeText>
            <LoadingOverlay visible={processing} />
          </Badge>
        );
      }}
    </CurrentlyPlayingLyricsTooltip>
  );
};

type MarqueeTextProps = TextProps & ComponentPropsWithoutRef<"p">;

const MarqueeText: FC<MarqueeTextProps> = ({ children, ...otherProps }) => {
  const textRef = useRef<HTMLDivElement>(null);

  // == Play state
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
