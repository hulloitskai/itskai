import { Suspense } from "react";
import type { FC } from "react";
import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import type { BoxProps } from "@mantine/core";

import { HomePageJournalEntriesQueryDocument } from "~/queries";
import type { Maybe } from "~/queries";

export type HomePageJournalEntriesProps = BoxProps & {
  readonly startCursor: Maybe<string>;
  readonly startCursorParam: string;
};

const JournalEntry = lazy(() => import("./JournalEntry"));

const HomePageJournalEntries: FC<HomePageJournalEntriesProps> = ({
  startCursor,
  startCursorParam,
  ...otherProps
}) => {
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // == Query
  const onError = useApolloAlertCallback("Failed to load journal entries");
  const { data, previousData, loading } = useQuery(
    HomePageJournalEntriesQueryDocument,
    {
      variables: {
        startCursor,
      },
      onError,
    },
  );
  const { items = [], nextCursor } = (data ?? previousData)?.entries ?? {};

  // == Markup
  return (
    <>
      <Box ref={topRef} />
      <Stack maw={540} {...otherProps}>
        {data ? (
          <Suspense fallback={<CardSkeleton />}>
            {items.map(page => {
              const { id: pageId } = page;
              return <JournalEntry key={pageId} {...{ page }} />;
            })}
          </Suspense>
        ) : (
          <CardSkeleton />
        )}
        <Center>
          <Transition transition="fade" mounted={!loading}>
            {style => (
              <Button
                variant="outline"
                leftIcon={nextCursor ? <NextIcon /> : <ResetIcon />}
                radius="xl"
                onClick={() => {
                  const url = new URL(location.href);
                  url.search = resolve(() => {
                    const params = url.searchParams;
                    if (nextCursor) {
                      params.set(startCursorParam, nextCursor);
                    } else {
                      params.delete(startCursorParam);
                    }
                    return params.toString();
                  });
                  router.visit(url.toString(), {
                    only: ["after"],
                    onSuccess: () => {
                      if (topRef.current) {
                        topRef.current.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                    },
                  });
                }}
                {...{ style }}
              >
                {nextCursor ? "more words pls" : "from the top!"}
              </Button>
            )}
          </Transition>
        </Center>
      </Stack>
    </>
  );
};

export default HomePageJournalEntries;

const CardSkeleton: FC = () => (
  <Skeleton width="100%" height={340} radius="md" />
);
