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

const CurrentlyPlayingIsland: FC = () => {
  const { data } = useSubscription(CurrentlyPlayingIslandSubscriptionDocument, {
    variables: {},
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
          {track => <CurrentTrack {...{ track, style }} />}
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

type CurrentTrackProps = Pick<BoxProps, "style"> & {
  readonly track: CurrentlyPlayingIslandSpotifyTrackFragment;
};

const CurrentTrack: FC<CurrentTrackProps> = ({ track, ...otherProps }) => {
  const {
    name,
    url,
    album: { imageUrl },
    artists,
  } = track;
  const artistNames = useMemo(() => {
    return artists.map(({ name }) => name).join(", ");
  }, [artists]);
  return (
    <Tooltip
      label={
        <>
          Kai is listening to{" "}
          <Text weight={600} span>
            {name}
          </Text>{" "}
          right now.
        </>
      }
      withArrow
    >
      <Badge
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        variant="outline"
        color="gray"
        leftSection={
          <Box pos="relative" p={2}>
            <MotionImage
              src={imageUrl}
              width={27}
              height={27}
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
        styles={{
          root: {
            transitionProperty: "width",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          },
          leftSection: {
            marginRight: 6,
          },
          inner: {
            maxWidth: 200,
          },
        }}
        {...otherProps}
      >
        <Text size="xs" color="dark" lineClamp={1}>
          {name}
        </Text>
        <Text size={10} mt={-5} lineClamp={1}>
          {artistNames}
        </Text>
      </Badge>
    </Tooltip>
  );
};
