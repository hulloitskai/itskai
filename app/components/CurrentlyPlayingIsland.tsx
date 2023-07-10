import type { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import PlayIcon from "~icons/heroicons/play-circle-20-solid";

import { Image, Text } from "@mantine/core";
import { useNetwork } from "@mantine/hooks";
import type { BoxProps, TextProps } from "@mantine/core";

import {
  CurrentlyPlayingIslandQueryDocument,
  CurrentlyPlayingIslandSubscriptionDocument,
} from "~/helpers/graphql";
import type { CurrentlyPlayingIslandTrackFragment } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";

import CurrentlyPlayingLyricsTooltip from "./CurrentlyPlayingLyricsTooltip";

const MotionImage = motion(Image);

export type CurrentlyPlayingIslandProps = Omit<BoxProps, "children">;

const CurrentlyPlayingIsland: FC<CurrentlyPlayingIslandProps> = ({
  ...otherProps
}) => {
  const { online } = useNetwork();

  // == Query
  const { data: queryData, refetch } = useQuery(
    CurrentlyPlayingIslandQueryDocument,
    {
      fetchPolicy: "no-cache",
      variables: {},
      onError: error => {
        console.error(
          "Failed to load currently playing details",
          formatJSON({ error }),
        );
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
        console.error(
          "Failed to subscribe to currently playing info",
          formatJSON({ error }),
        );
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
    if (online) {
      if (currentlyPlaying?.track?.id !== track?.id) {
        if (track) {
          setMounted(false);
          setTransitioned(false);
        } else if (currentlyPlaying) {
          setTrack(currentlyPlaying.track);
          setMounted(true);
        }
      }
    } else {
      if (mounted) {
        setMounted(false);
        setTransitioned(false);
      }
    }
  }, [currentlyPlaying, online]);

  // == Markup
  return (
    <Transition
      transition="slide-down"
      onEntered={() => setTransitioned(true)}
      onExited={() => {
        setTrack(currentlyPlaying?.track ?? null);
        if (currentlyPlaying && online) {
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
                progressMilliseconds,
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
  readonly progressMilliseconds?: number;
  readonly transitioned: boolean;
};

const _CurrentlyPlayingIsland: FC<_CurrentlyPlayingIslandProps> = ({
  track,
  progressMilliseconds,
  transitioned,
  ...otherProps
}) => {
  const {
    name,
    url,
    album: { imageUrl },
    artists,
    durationMilliseconds,
  } = track;
  const artistNames = useMemo(
    () => artists.map(({ name }) => name).join(", ") || "(missing artists)",
    [artists],
  );

  // == Markup
  return (
    <CurrentlyPlayingLyricsTooltip
      {...(!transitioned && { disabled: true })}
      {...{ durationMilliseconds, progressMilliseconds }}
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
            size="xl"
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
            variant="outline"
            color="gray.5"
            pl={0}
            styles={({ colors, primaryColor, fn }) => {
              const borderColorNoLyrics = colors.dark[3];
              const borderColorLyrics = fn.darken(
                colors[primaryColor]![5],
                0.1,
              );
              const borderColorLyricsExplicit = fn.darken(
                colors[primaryColor]![5],
                0.4,
              );
              return {
                root: {
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
                },
              };
            }}
            {...otherProps}
          >
            <MarqueeText size="xs" color="gray.3">
              {name}
            </MarqueeText>
            <MarqueeText size={10} color="gray.6">
              {artistNames}
            </MarqueeText>
          </Badge>
        );
      }}
    </CurrentlyPlayingLyricsTooltip>
  );
};

const MarqueeText: FC<TextProps> = ({ sx, children, ...otherProps }) => {
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
  }, [textRef.current]);

  // == Markup
  return (
    <Marquee pauseOnHover pauseOnClick speed={18} delay={1} {...{ play }}>
      <Text
        ref={textRef}
        lh={1.1}
        mr={play ? 24 : 0}
        sx={[
          ...packSx(sx),
          {
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          },
        ]}
        {...otherProps}
      >
        {children}
      </Text>
    </Marquee>
  );
};
