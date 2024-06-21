import type { ReactNode } from "react";
import type { LyricLine, RSpotifyTrack } from "~/types";

import type { TooltipProps } from "@mantine/core";
import { useHover } from "@mantine/hooks";

import {
  useInterpolatedProgressMs,
  useProgressLyricsIndexMapping,
} from "~/helpers/currentlyPlaying";

import classes from "./CurrentlyPlayingLyricsTooltip.module.css";

export interface CurrentlyPlayingLyricsTooltipProps
  extends Omit<TooltipProps, "label" | "children"> {
  track: RSpotifyTrack;
  durationMs: number;
  progressMs: number | undefined;
  children: (currentLyricLine: LyricLine | null | undefined) => ReactNode;
}

const CurrentlyPlayingLyricsTooltip: FC<CurrentlyPlayingLyricsTooltipProps> = ({
  track,
  durationMs,
  progressMs = 0,
  disabled,
  children,
  ...otherProps
}) => {
  const interpolationMs = 250;
  const transitionDuration = 200;
  const { hovered, ref } = useHover();

  // == Progress
  const interpolatedProgressMs = useInterpolatedProgressMs({
    progressMs,
    interpolationMs,
  });

  // == Lyrics
  const lyricsParams = useMemo(
    () => ({ spotify_track_id: track.id }),
    [track.id],
  );
  const { data } = useFetch<{ lyrics: LyricLine[] }>(
    routes.spotifyTracks.lyrics,
    {
      params: lyricsParams,
      descriptor: "load lyrics",
      failSilently: true,
    },
  );
  const { lyrics } = data ?? {};

  // == Current lyric
  const progressLyricsIndexMapping = useProgressLyricsIndexMapping({
    lyrics,
    durationMs,
    interpolationMs,
  });
  const currentLyric = useMemo(() => {
    if (lyrics) {
      const currentLyricIndex =
        progressLyricsIndexMapping[interpolatedProgressMs];
      if (typeof currentLyricIndex === "number") {
        return lyrics[currentLyricIndex];
      }
      return null;
    }
  }, [lyrics, progressLyricsIndexMapping, interpolatedProgressMs]);

  const hasWords = !!currentLyric?.words;
  const label = useMemo(
    () => (hovered ? "Click to jam with me :)" : currentLyric?.words),
    [currentLyric, hovered],
  );
  const prevLabel = usePrevious(label);
  return (
    <Tooltip
      label={label || prevLabel}
      withArrow
      multiline
      color="primary"
      transitionProps={{ duration: transitionDuration }}
      disabled={disabled ?? (!hasWords && !hovered)}
      opened={!disabled && (hasWords || hovered)}
      maw={350}
      fz="xs"
      classNames={{ tooltip: classes.tooltip }}
      {...{ ref }}
      {...otherProps}
    >
      {children(currentLyric)}
    </Tooltip>
  );
};

export default CurrentlyPlayingLyricsTooltip;
