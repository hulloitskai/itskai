import { Suspense } from "react";
import type { FC } from "react";
import { format as formatTimeAgo } from "timeago.js";
import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import { Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import { HomePageWritingsQueryDocument } from "~/queries";
import type { Maybe } from "~/queries";

export type HomePageWritingsProps = BoxProps & {
  readonly startCursor: Maybe<string>;
};

const NotionContent = lazy(() => import("./NotionContent"));

const HomePageWritings: FC<HomePageWritingsProps> = ({
  startCursor,
  ...otherProps
}) => {
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // == Query
  const onError = useApolloErrorCallback("Failed to load Obsidian entries");
  const { data, previousData, loading } = useQuery(
    HomePageWritingsQueryDocument,
    {
      variables: {
        startCursor,
      },
      onError,
    },
  );
  const { pages = [], nextCursor } = (data ?? previousData)?.writings ?? {};

  // == Markup
  return (
    <>
      <Box ref={topRef} />
      <Stack maw={540} {...otherProps}>
        {loading ? (
          <CardSkeleton />
        ) : (
          <Suspense fallback={<CardSkeleton />}>
            {pages.map(({ id, createdAt, title, blocks }) => (
              <Card key={id} withBorder padding="lg" shadow="sm" radius="md">
                <Stack spacing={2}>
                  <Box>
                    <Title
                      order={3}
                      size="h4"
                      weight={900}
                      color="white"
                      sx={({ fontFamilyMonospace }) => ({
                        fontFamily: fontFamilyMonospace,
                      })}
                    >
                      {title}
                    </Title>
                    <Text size="xs" color="dimmed">
                      written{" "}
                      <Time format={time => formatTimeAgo(time.toJSDate())}>
                        {createdAt}
                      </Time>{" "}
                    </Text>
                  </Box>
                  <NotionContent {...{ blocks }} />
                </Stack>
              </Card>
            ))}
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
                    only: ["writingsStartCursor"],
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

export default HomePageWritings;

const CardSkeleton: FC = () => (
  <Skeleton width="100%" height={340} radius="md" />
);
