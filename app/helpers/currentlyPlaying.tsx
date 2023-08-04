import type { LyricLine } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";

export type InterpolatedProgressMillisecondsParams = {
  readonly progressMilliseconds: number;
  readonly interpolationMilliseconds: number;
};

export const useInterpolatedProgressMilliseconds = ({
  progressMilliseconds,
  interpolationMilliseconds,
}: InterpolatedProgressMillisecondsParams): number => {
  const [
    interpolatedProgressMilliseconds,
    setInterpolatedProgressMilliseconds,
  ] = useState<number>(0);
  useEffect(() => {
    const roundedProgressMilliseconds =
      Math.round(progressMilliseconds / interpolationMilliseconds) *
      interpolationMilliseconds;
    setInterpolatedProgressMilliseconds(roundedProgressMilliseconds);
    const interval = setInterval(() => {
      setInterpolatedProgressMilliseconds(
        progressMilliseconds =>
          progressMilliseconds + interpolationMilliseconds,
      );
    }, interpolationMilliseconds);
    return () => {
      clearInterval(interval);
    };
  }, [progressMilliseconds, interpolationMilliseconds]);
  return interpolatedProgressMilliseconds;
};

export type ProgressLyricsIndexMappingParams = {
  readonly lyrics:
    | Maybe<Pick<LyricLine, "startTimeMilliseconds">[]>
    | undefined;
  readonly durationMilliseconds: number;
  readonly interpolationMilliseconds: number;
};

export const useProgressLyricsIndexMapping = ({
  lyrics,
  durationMilliseconds,
  interpolationMilliseconds,
}: ProgressLyricsIndexMappingParams): Record<number, number | null> => {
  const [mapping, setMapping] = useState<Record<number, number | null>>({});
  useEffect(() => {
    if (lyrics) {
      requestIdleCallback(() => {
        const mapping: Record<number, number | null> = {};
        lyrics.forEach(({ startTimeMilliseconds }, index) => {
          const roundedStartTimeMilliseconds =
            Math.round(startTimeMilliseconds / interpolationMilliseconds) *
            interpolationMilliseconds;
          mapping[roundedStartTimeMilliseconds] = index;
        });
        for (
          let incrementMilliseconds = 0;
          incrementMilliseconds <= durationMilliseconds;
          incrementMilliseconds += interpolationMilliseconds
        ) {
          if (!(incrementMilliseconds in mapping)) {
            const coalescedIndex =
              mapping[incrementMilliseconds - interpolationMilliseconds];
            mapping[incrementMilliseconds] = coalescedIndex ?? null;
          }
        }
        setMapping(mapping);
      });
    } else if (!isEmpty(mapping)) {
      setMapping({});
    }
  }, [lyrics, durationMilliseconds, interpolationMilliseconds]);
  return mapping;
};
