import { type TooltipProps } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { type ReactNode } from "react";

import {
  useInterpolatedProgressMs,
  useProgressLyricsIndexMapping,
} from "~/helpers/currentlyPlaying";
import { type LyricLine, type RSpotifyTrack } from "~/types";

import classes from "./CurrentlyPlayingLyricsTooltip.module.css";

export interface CurrentlyPlayingLyricsTooltipProps
  extends Omit<TooltipProps, "label" | "children"> {
  track: RSpotifyTrack;
  durationMs: number;
  progressMs: number | undefined;
  children: (currentLyricLine: LyricLine | null | undefined) => ReactNode;
}

const CurrentlyPlayingLyricsTooltip: FC<CurrentlyPlayingLyricsTooltipProps> = ({
  children,
  disabled,
  durationMs,
  progressMs = 0,
  track,
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

  // == Load lyrics
  const lyricsParams = useMemo(
    () => ({ spotify_track_id: track.id }),
    [track.id],
  );
  const { data } = useRouteSWR<{ lyrics: LyricLine[] }>(
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
      {...{ ref }}
      label={label ?? prevLabel}
      multiline
      color="primary"
      transitionProps={{ duration: transitionDuration }}
      disabled={disabled ?? (!hasWords && !hovered)}
      opened={!disabled && (hasWords || hovered)}
      maw={350}
      fz="xs"
      classNames={{ tooltip: classes.tooltip }}
      {...otherProps}
    >
      {children(currentLyric)}
    </Tooltip>
  );
};

export default CurrentlyPlayingLyricsTooltip;
