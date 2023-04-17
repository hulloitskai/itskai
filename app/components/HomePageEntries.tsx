import { Suspense } from "react";
import type { FC } from "react";
import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import type { BoxProps } from "@mantine/core";

import { HomePageEntriesQueryDocument } from "~/queries";
import type { Maybe } from "~/queries";

export type HomePageEntriesProps = BoxProps & {
  readonly startCursor: Maybe<string>;
};

const NotionEntry = lazy(() => import("./NotionEntry"));

const HomePageEntries: FC<HomePageEntriesProps> = ({
  startCursor,
  ...otherProps
}) => {
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // == Query
  const onError = useApolloErrorCallback("Failed to load Obsidian entries");
  const { data, previousData, loading } = useQuery(
    HomePageEntriesQueryDocument,
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
        {loading ? (
          <CardSkeleton />
        ) : (
          <Suspense fallback={<CardSkeleton />}>
            {items.map(page => {
              const { id: pageId } = page;
              return <NotionEntry key={pageId} {...{ page }} />;
            })}
          </Suspense>
        )}
        <Center>
          <Transition transition="fade" mounted={!loading}>
            {style => (
              <Button
                leftIcon={nextCursor ? <NextIcon /> : <ResetIcon />}
                radius="xl"
                onClick={() => {
                  const url = new URL(location.href);
                  url.search = resolve(() => {
                    const params = url.searchParams;
                    if (nextCursor) {
                      params.set("entry", nextCursor);
                    } else {
                      params.delete("entry");
                    }
                    return params.toString();
                  });
                  router.visit(url.toString(), {
                    only: ["entriesStartCursor"],
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

export default HomePageEntries;

const CardSkeleton: FC = () => (
  <Skeleton width="100%" height={340} radius="md" />
);
