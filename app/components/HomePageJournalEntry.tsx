import type { FC } from "react";
import type { BoxProps } from "@mantine/core";
import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import scrollIntoView from "scroll-into-view";

import { HomePageJournalEntryQueryDocument } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type {
  HomePageJournalEntryEntryFragment,
  HomePageJournalEntryQuery,
  HomePageJournalEntryQueryVariables,
} from "~/helpers/graphql";

import JournalEntry from "./JournalEntry";

export type HomePageJournalEntryProps = BoxProps & {
  readonly firstEntryId: string;
  readonly initialEntry: Maybe<HomePageJournalEntryEntryFragment> | undefined;
  readonly autoscroll: boolean;
};

const HomePageJournalEntry: FC<HomePageJournalEntryProps> = ({
  firstEntryId,
  initialEntry,
  autoscroll,
  ...otherProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // == Query
  const onError = useApolloAlertCallback("Failed to load journal entry");
  const { coalescedData, loading, refetch } = usePreloadedQuery<
    HomePageJournalEntryQuery,
    HomePageJournalEntryQueryVariables
  >(HomePageJournalEntryQueryDocument, {
    initialData: { entry: initialEntry || null },
    variables: initialEntry ? { entryId: initialEntry.id } : undefined,
    skip: !initialEntry,
    onError,
  });
  const { entry } = coalescedData;
  const { nextEntryId } = entry ?? {};
  const hasNextEntry = !!nextEntryId;

  // == Scrolling
  const [requiresScrolling, setRequiresScrolling] = useState(false);
  const scrollToContainerTop = useCallback(() => {
    if (containerRef.current) {
      const headerEl = document.querySelector(".mantine-AppShell-header");
      scrollIntoView(containerRef.current, {
        align: {
          top: 0,
          topOffset: (headerEl?.clientHeight ?? 0) + 20,
        },
      });
    }
  }, [containerRef]);
  useDidUpdate(() => {
    if (containerRef.current && requiresScrolling) {
      setRequiresScrolling(false);
      setTimeout(() => {
        scrollToContainerTop();
      }, 100);
    }
  }, [containerRef, requiresScrolling]);
  useEffect(() => {
    if (autoscroll) {
      scrollToContainerTop();
    }
  }, []);

  // == Markup
  return (
    <Stack align="center" {...{ ref: containerRef }} {...otherProps}>
      {entry ? <JournalEntry {...{ entry }} /> : <CardSkeleton />}
      <Transition
        transition={{
          transitionProperty: "transform, opacity, max-height",
          out: { opacity: 0, transform: "scale(0)", maxHeight: 0 },
          in: { opacity: 1, transform: "scale(1)", maxHeight: 140 },
        }}
        mounted={!!coalescedData}
      >
        {style => (
          <Button
            variant="outline"
            leftSection={hasNextEntry ? <NextIcon /> : <ResetIcon />}
            radius="xl"
            onClick={() => {
              refetch({ entryId: nextEntryId || firstEntryId }).then(
                ({ data: { entry } }) => {
                  invariant(entry, "Missing entry");
                  setRequiresScrolling(true);
                  history.pushState(null, "", entry.url);
                },
              );
            }}
            {...{ style, loading }}
          >
            {hasNextEntry ? "more words pls" : "from the top!"}
          </Button>
        )}
      </Transition>
    </Stack>
  );
};

export default HomePageJournalEntry;

const CardSkeleton: FC = () => (
  <Skeleton width="100%" height={340} radius="md" />
);
