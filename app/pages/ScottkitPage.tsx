import { FC, ReactNode } from "react";
import type { PageComponent, PageProps } from "~/helpers/inertia";

import LightbulbIcon from "~icons/heroicons/light-bulb-20-solid";

import { Code, Text } from "@mantine/core";

import {
  ScottkitPageQuery,
  ScottkitSignalMutationDocument,
  ScottkitSignalType,
} from "~/queries";

import {
  scottkitSignalTypeLabel,
  scottkitSignalTypeIcon,
  scottkitSignalTypeColor,
} from "~/helpers/types/ScottkitSignalType";

export type ScottkitPageProps = PageProps<ScottkitPageQuery>;

const ScottkitPage: PageComponent<ScottkitPageProps> = () => {
  return (
    <Stack align="center" spacing="xl">
      <Stack align="center" spacing={8}>
        <Title size="h4" color="white">
          Scottkit™
        </Title>
        <Alert
          icon={
            <Box
              component={LightbulbIcon}
              sx={({ colors }) => ({
                color: colors.yellow[6],
              })}
            />
          }
          color="indigo"
          styles={({ colors }) => ({
            icon: {
              marginRight: 8,
            },
            message: {
              color: colors.indigo[1],
            },
          })}
        >
          This is a toolkit for Scott, built and maintained by his boys.
        </Alert>
      </Stack>
      <Stack w="100%" maw={275}>
        <KitButton
          type={ScottkitSignalType.Break}
          description={
            <>
              Signals that you&apos;re caught in an unproductive cycle and would
              like to exit it. Use when you&apos;re feeling stuck.
            </>
          }
        />
        <KitButton
          type={ScottkitSignalType.Rand}
          description={
            <>
              Signal a desire to try a different experience. Use when
              you&apos;re not feeling alive enough and want to sample some new
              directions.
            </>
          }
        />
        <KitButton
          type={ScottkitSignalType.Panic}
          description={
            <>
              Signals that something has not gone to plan in a major way. Use in
              case of emergency.
            </>
          }
        />
      </Stack>
    </Stack>
  );
};

ScottkitPage.layout = buildLayout<ScottkitPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout title="Scottkit" withContainer withGutter {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default ScottkitPage;

export type KitButtonProps = {
  readonly type: ScottkitSignalType;
  readonly description: ReactNode;
};

const KitButton: FC<KitButtonProps> = ({ type, description }) => {
  const [label, icon, color] = useMemo(
    () => [
      scottkitSignalTypeLabel(type),
      scottkitSignalTypeIcon(type),
      scottkitSignalTypeColor(type),
    ],
    [type],
  );

  // == Mutation
  const onError = useApolloErrorCallback("Failed to send Scottkit signal");
  const [runMutation, { loading }] = useMutation(
    ScottkitSignalMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          title: (
            <>
              A <Code {...{ color }}>{label}</Code> signal was broadcasted
            </>
          ),
          message: <>You will be followed-up with shortly :)</>,
        });
      },
      onError,
    },
  );

  // == Markup
  return (
    <Stack spacing={4}>
      <Button
        size="xl"
        leftIcon={icon}
        styles={{
          root: {
            height: 100,
          },
          inner: {
            flexDirection: "column",
          },
          leftIcon: {
            marginRight: 0,
            marginBottom: 8,
          },
          label: {
            height: "unset",
          },
        }}
        onClick={() => {
          runMutation({
            variables: {
              input: {
                type,
              },
            },
          });
        }}
        {...{ color, loading }}
      >
        <Code color="gray">{label}</Code>
      </Button>
      <Text size="xs" color="dimmed" lh={1.4}>
        {description}
      </Text>
    </Stack>
  );
};
