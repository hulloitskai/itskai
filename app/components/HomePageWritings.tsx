import { Suspense } from "react";
import type { FC } from "react";
import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import type { BoxProps } from "@mantine/core";

import { HomePageWritingsQueryDocument } from "~/queries";

export type HomePageWritingsProps = BoxProps;

const NotionContent = lazy(() => import("./NotionContent"));

const HomePageWritings: FC<HomePageWritingsProps> = ({ ...otherProps }) => {
  // == Query
  const [startCursor, setStartCursor] = useState<string | null>(null);
  const onError = useApolloErrorCallback("Failed to load Obsidian entries");
  const { data, loading } = useQuery(HomePageWritingsQueryDocument, {
    variables: {
      startCursor,
    },
    onError,
  });
  const { pages = [], nextCursor } = data?.writings ?? {};

  // == Markup
  return (
    <Stack w="100%" maw={540} {...otherProps}>
      {loading ? (
        <CardSkeleton />
      ) : (
        <Suspense fallback={<CardSkeleton />}>
          {pages.map(({ id, title, blocks }) => (
            <Card key={id} withBorder padding="lg" shadow="sm" radius="md">
              <Stack spacing={0}>
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
                <NotionContent {...{ blocks }} />
              </Stack>
            </Card>
          ))}
          {data && (
            <Center>
              <Button
                leftIcon={nextCursor ? <NextIcon /> : <ResetIcon />}
                radius="xl"
                onClick={() => {
                  setStartCursor(nextCursor ?? null);
                }}
              >
                {nextCursor ? "more words pls" : "from the top!"}
              </Button>
            </Center>
          )}
        </Suspense>
      )}
    </Stack>
  );
};

export default HomePageWritings;

const CardSkeleton: FC = () => (
  <Skeleton width="100%" height={340} radius="md" />
);
