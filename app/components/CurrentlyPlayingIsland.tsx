import { Image, Text } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";
import { type ReactNode, useLayoutEffect } from "react";
import Marquee from "react-fast-marquee";

import PlayIcon from "~icons/heroicons/play-circle-20-solid";

import {
  type CurrentlyPlaying,
  type CurrentlyPlayingMetadata,
  type RSpotifyTrack,
} from "~/types";

import CurrentlyPlayingLyricsTooltip from "./CurrentlyPlayingLyricsTooltip";

import classes from "./CurrentlyPlayingIsland.module.css";

export interface CurrentlyPlayingIslandProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {}

const CurrentlyPlayingIsland: FC<CurrentlyPlayingIslandProps> = ({
  ...otherProps
}) => {
  // == Load currently playing track
  const { data, mutate } = useRouteSWR<{
    currentlyPlaying: CurrentlyPlaying | null;
  }>(routes.currentlyPlayings.show, {
    descriptor: "load currently playing track",
  });
  const { track } = data?.currentlyPlaying ?? {};

  // == Mounting & transitioning
  const { online } = useNetwork();
  const [mounted, setMounted] = useState<boolean>(() => !!track && online);
  const [transitioning, setTransitioning] = useState(false);
  useDidUpdate(() => {
    setTransitioning(true);
  }, [mounted]); // eslint-disable-line react-hooks/exhaustive-deps
  useDidUpdate(() => {
    if (!transitioning) {
      setMounted(!!track && online);
    }
  }, [track, online, transitioning]);

  // == Subscribe to track progression
  const { data: subscriptionData } = useSubscription<{
    currentlyPlaying: CurrentlyPlayingMetadata | null;
  }>("CurrentlyPlayingChannel", {
    descriptor: "subscribe to currently playing feed",
    failSilently: true,
    onData: ({ currentlyPlaying }) => {
      if (currentlyPlaying?.track_id !== track?.id) {
        setMounted(false);
        void mutate();
      }
    },
  });

  // == Calculate progress
  const progressMs = useMemo(() => {
    if (subscriptionData?.currentlyPlaying) {
      const { currentlyPlaying } = subscriptionData;
      const timestamp = DateTime.fromISO(currentlyPlaying.timestamp);
      const elappsedMs = DateTime.now().diff(timestamp).as("milliseconds");
      return currentlyPlaying.progress_ms + elappsedMs - 1200;
    }
  }, [subscriptionData]);

  return (
    <Transition
      transition="slide-down"
      onEntered={() => {
        setTransitioning(false);
      }}
      onExited={() => {
        setTransitioning(false);
      }}
      {...{ mounted }}
    >
      {style => (
        <TrackCoalescer {...{ track }}>
          {track => (
            <IslandContent
              {...{
                track,
                progressMs,
                transitioning,
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

interface TrackCoalescerProps {
  track?: RSpotifyTrack | null;
  children: (track: RSpotifyTrack) => ReactNode;
}

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

type IslandContentProps = BoxProps & {
  track: RSpotifyTrack;
  progressMs?: number;
  transitioning: boolean;
};

const IslandContent: FC<IslandContentProps> = ({
  progressMs,
  track,
  transitioning,
  className,
  ...otherProps
}) => {
  const { album, artists } = track;
  const artistNames = useMemo(
    () => artists.map(({ name }) => name).join(", ") || "(missing artists)",
    [artists],
  );

  // == Join jam session
  const { trigger: joinJam, mutating: joiningJam } = useRouteMutation<{
    joinUrl: string;
  }>(routes.spotifyJamSessions.join, {
    descriptor: "join Spotify jam session",
    onSuccess: ({ joinUrl }) => {
      open(joinUrl, "_blank");
    },
  });

  return (
    <CurrentlyPlayingLyricsTooltip
      withinPortal={false}
      position="bottom"
      durationMs={track.duration_ms}
      {...(transitioning && { disabled: true })}
      {...{ track, progressMs }}
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
                <Image
                  className={classes.albumArt}
                  src={album.image_url ?? undefined}
                  w={26}
                  h={26}
                  radius="xl"
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
            variant="default"
            className={cn(classes.badge, className)}
            mod={{
              "with-lyrics": hasLyrics,
            }}
            onClick={() => {
              void joinJam();
            }}
            {...otherProps}
          >
            <MarqueeText size="xs" fw={800} className={classes.trackName}>
              {track.name}
            </MarqueeText>
            <MarqueeText fz={10} fw={700} className={classes.artistNames}>
              {artistNames}
            </MarqueeText>
            <LoadingOverlay visible={joiningJam} />
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
    <Marquee
      className={classes.marquee}
      pauseOnHover
      pauseOnClick
      speed={18}
      delay={1}
      {...{ play }}
    >
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
