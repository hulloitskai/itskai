import type { LyricLine } from "~/types";

export type InterpolatedProgressMsParams = {
  progressMs: number;
  interpolationMs: number;
};

export const useInterpolatedProgressMs = ({
  progressMs,
  interpolationMs,
}: InterpolatedProgressMsParams): number => {
  const [interpolatedProgressMs, setInterpolatedProgressMs] =
    useState<number>(0);
  useEffect(() => {
    const roundedProgressMs =
      Math.round(progressMs / interpolationMs) * interpolationMs;
    setInterpolatedProgressMs(roundedProgressMs);
    const interval = setInterval(() => {
      setInterpolatedProgressMs(progressMs => progressMs + interpolationMs);
    }, interpolationMs);
    return () => {
      clearInterval(interval);
    };
  }, [progressMs, interpolationMs]);
  return interpolatedProgressMs;
};

export type ProgressLyricsIndexMappingParams = {
  lyrics: Pick<LyricLine, "startTimeMs">[] | null | undefined;
  durationMs: number;
  interpolationMs: number;
};

export const useProgressLyricsIndexMapping = ({
  lyrics,
  durationMs,
  interpolationMs,
}: ProgressLyricsIndexMappingParams): Record<number, number | null> => {
  const [mapping, setMapping] = useState<Record<number, number | null>>({});
  useEffect(() => {
    if (lyrics) {
      requestIdleCallback(() => {
        const mapping: Record<number, number | null> = {};
        lyrics.forEach(({ startTimeMs }, index) => {
          const roundedStartTimeMs =
            Math.round(startTimeMs / interpolationMs) * interpolationMs;
          mapping[roundedStartTimeMs] = index;
        });
        for (
          let incrementMs = 0;
          incrementMs <= durationMs;
          incrementMs += interpolationMs
        ) {
          if (!(incrementMs in mapping)) {
            const coalescedIndex = mapping[incrementMs - interpolationMs];
            mapping[incrementMs] = coalescedIndex ?? null;
          }
        }
        setMapping(mapping);
      });
    } else {
      setMapping({});
    }
  }, [lyrics, durationMs, interpolationMs]);
  return mapping;
};
