import type { FC, ReactNode } from "react";
import type { TooltipProps } from "@mantine/core";
import { findLast } from "lodash-es";

import { CurrentlyPlayingLyricsTooltipQueryDocument } from "~/queries";
import type { CurrentlyPlayingLyricsTooltipLyricLineFragment } from "~/queries";
import type { Maybe } from "~/queries";
import { useHover } from "@mantine/hooks";

export type CurrentlyPlayingLyricsTooltipProps = Pick<
  TooltipProps,
  "disabled"
> & {
  readonly initialProgressMilliseconds?: number;
  readonly children: (
    currentLyricLine:
      | Maybe<CurrentlyPlayingLyricsTooltipLyricLineFragment>
      | undefined,
  ) => ReactNode;
};

const CurrentlyPlayingLyricsTooltip: FC<CurrentlyPlayingLyricsTooltipProps> = ({
  initialProgressMilliseconds = 0,
  disabled,
  children,
  ...otherProps
}) => {
  const { hovered, ref } = useHover();

  // == Progress
  const [progressMilliseconds, setProgressMilliseconds] = useState<number>(
    initialProgressMilliseconds,
  );
  useEffect(() => {
    setProgressMilliseconds(initialProgressMilliseconds);
    const increment = 500;
    const interval = setInterval(() => {
      setProgressMilliseconds(
        progressMilliseconds => progressMilliseconds + increment,
      );
    }, increment);
    return () => {
      clearInterval(interval);
    };
  }, [initialProgressMilliseconds]);

  // == Query
  const { data } = useQuery(CurrentlyPlayingLyricsTooltipQueryDocument, {
    fetchPolicy: "no-cache",
    variables: {},
    onError: error => {
      console.error("Failed to load lyrics for currently playing track", {
        error,
      });
    },
  });
  const { lyrics } = data?.currentlyPlaying?.track ?? {};

  // == Current Lyric & Words
  const currentLyric = useMemo(() => {
    if (lyrics) {
      return findLast(
        lyrics,
        ({ startTimeMilliseconds }) =>
          progressMilliseconds >= startTimeMilliseconds,
      );
    }
    return null;
  }, [lyrics, progressMilliseconds]);
  const [currentWords, setCurrentWords] = useState("");
  useEffect(() => {
    if (currentLyric?.words) {
      const { words, isExplicit } = currentLyric;
      if (!isExplicit || hovered) {
        setCurrentWords(words);
      } else {
        setTimeout(() => {
          setCurrentWords(words);
        }, 175);
      }
    }
  }, [currentLyric]);

  // == Helpers
  const hasWords = !!currentLyric?.words;
  const currentlyExplicit = currentLyric?.isExplicit;

  // == Markup
  const renderedChildren = useMemo<ReactNode>(
    () => children(currentLyric),
    [children, currentLyric],
  );
  return (
    <Tooltip
      label={currentWords}
      multiline
      withArrow
      color="pink"
      transitionProps={{ duration: 200 }}
      disabled={disabled ?? !hasWords}
      maw={400}
      fz="xs"
      styles={{
        tooltip: {
          lineHeight: 1.3,
        },
      }}
      {...(currentlyExplicit === false && { opened: hasWords })}
      {...{ ref }}
      {...otherProps}
    >
      {renderedChildren}
    </Tooltip>
  );
};

export default CurrentlyPlayingLyricsTooltip;
