import type { FC } from "react";
import scrollIntoView from "scroll-into-view";
import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import type { BoxProps } from "@mantine/core";

import { HomePageJournalEntryQueryDocument } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type {
  HomePageJournalEntryQuery,
  HomePageJournalEntryQueryVariables,
  HomePageJournalEntryEntryFragment,
} from "~/helpers/graphql";

import JournalEntry from "./JournalEntry";

export type HomePageJournalEntryProps = BoxProps & {
  readonly initialEntry: Maybe<HomePageJournalEntryEntryFragment>;
};

const HomePageJournalEntry: FC<HomePageJournalEntryProps> = ({
  initialEntry,
  ...otherProps
}) => {
  // == Query
  const onError = useApolloAlertCallback("Failed to load journal entry");
  const { coalescedData, loading, refetch } = usePreloadedQuery<
    HomePageJournalEntryQuery,
    HomePageJournalEntryQueryVariables
  >(HomePageJournalEntryQueryDocument, {
    initialData: { entry: initialEntry },
    variables: initialEntry ? { entryId: initialEntry.id } : {},
    skip: !initialEntry,
    onError,
  });
  const { entry } = coalescedData;
  const { nextEntryId } = entry ?? {};
  const hasNextEntry = !!nextEntryId;

  // == Autoscroll
  const [requiresScrolling, setRequiresScrolling] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useDidUpdate(() => {
    if (ref.current && requiresScrolling) {
      setRequiresScrolling(false);
      const headerElement = document.querySelector(
        "header.mantine-Header-root",
      );
      scrollIntoView(ref.current, {
        align: {
          top: 0,
          topOffset: headerElement?.clientHeight ?? 0,
        },
      });
    }
  }, [ref.current, requiresScrolling]);

  // == Markup
  return (
    <Stack maw={540} {...{ ref }} {...otherProps}>
      {entry ? <JournalEntry {...{ entry }} /> : <CardSkeleton />}
      <Center>
        <Transition transition="fade" mounted={!loading}>
          {style => (
            <Button
              variant="outline"
              leftIcon={hasNextEntry ? <NextIcon /> : <ResetIcon />}
              radius="xl"
              onClick={() => {
                refetch({ entryId: nextEntryId }).then(
                  ({ data: { entry } }) => {
                    invariant(entry, "Missing entry");
                    setRequiresScrolling(true);
                    history.pushState(null, "", entry.url);
                  },
                );
              }}
              {...{ style }}
            >
              {hasNextEntry ? "more words pls" : "from the top!"}
            </Button>
          )}
        </Transition>
      </Center>
    </Stack>
  );
};

export default HomePageJournalEntry;

const CardSkeleton: FC = () => (
  <Skeleton width="100%" height={340} radius="md" />
);
