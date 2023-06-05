import { Suspense } from "react";
import type { FC } from "react";
import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import type { BoxProps } from "@mantine/core";

import {
  HomePageJournalEntryQuery,
  HomePageJournalEntryQueryDocument,
  HomePageJournalEntryQueryVariables,
} from "~/helpers/graphql";
import type { HomePageJournalEntryEntryFragment } from "~/helpers/graphql";

export type HomePageJournalEntryProps = BoxProps & {
  readonly initialEntry: HomePageJournalEntryEntryFragment;
};

const JournalEntry = lazy(() => import("./JournalEntry"));

const HomePageJournalEntry: FC<HomePageJournalEntryProps> = ({
  initialEntry,
  ...otherProps
}) => {
  const topRef = useRef<HTMLDivElement>(null);

  // == Query
  const onError = useApolloAlertCallback("Failed to load journal entry");
  const { data, previousData, loading, refetch } = usePreloadedQuery<
    HomePageJournalEntryQuery,
    HomePageJournalEntryQueryVariables
  >(HomePageJournalEntryQueryDocument, {
    initialData: {
      entry: initialEntry,
    },
    variables: {
      entryId: initialEntry.id,
    },
    onError,
  });
  const { entry } = data ?? previousData ?? {};
  const { nextEntryId } = entry ?? {};
  const hasNextEntry = !!nextEntryId;

  // == Markup
  return (
    <>
      <Box ref={topRef} />
      <Stack maw={540} {...otherProps}>
        {entry ? (
          <Suspense fallback={<CardSkeleton />}>
            <JournalEntry {...{ entry }} />
          </Suspense>
        ) : (
          <CardSkeleton />
        )}
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
                      if (topRef.current) {
                        topRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
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
    </>
  );
};

export default HomePageJournalEntry;

const CardSkeleton: FC = () => (
  <Skeleton width="100%" height={340} radius="md" />
);
