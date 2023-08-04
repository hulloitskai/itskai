import type { FC, ReactNode } from "react";
import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Code, Text } from "@mantine/core";

import LightbulbIcon from "~icons/heroicons/light-bulb-20-solid";

import { ActivateScottkitSignalMutationDocument } from "~/helpers/graphql";
import { ScottkitSignal } from "~/helpers/graphql";
import type { ScottkitPageQuery } from "~/helpers/graphql";

import {
  scottkitSignalLabel,
  scottkitSignalIcon,
  scottkitSignalColor,
} from "~/helpers/scottkitSignal";

import AppMeta from "~/components/AppMeta";
import PageLayout from "~/components/PageLayout";
import PageContainer from "~/components/PageContainer";

export type ScottkitPageProps = PagePropsWithData<ScottkitPageQuery>;

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
          signal={ScottkitSignal.Break}
          description={
            <>
              Signals that you&apos;re caught in an unproductive cycle and would
              like to exit it. Use when you&apos;re feeling stuck.
            </>
          }
        />
        <KitButton
          signal={ScottkitSignal.Rand}
          description={
            <>
              Signal a desire to try a different experience. Use when
              you&apos;re not feeling alive enough and want to sample some new
              directions.
            </>
          }
        />
        <KitButton
          signal={ScottkitSignal.Panic}
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

ScottkitPage.layout = buildLayout<ScottkitPageProps>(page => (
  <PageLayout>
    <AppMeta title="Scottkit" />
    <PageContainer withGutter>{page}</PageContainer>
  </PageLayout>
));

export default ScottkitPage;

export type KitButtonProps = {
  readonly signal: ScottkitSignal;
  readonly description: ReactNode;
};

const KitButton: FC<KitButtonProps> = ({ signal: signal, description }) => {
  const [label, icon, color] = useMemo(
    () => [
      scottkitSignalLabel(signal),
      scottkitSignalIcon(signal),
      scottkitSignalColor(signal),
    ],
    [signal],
  );

  // == Mutation
  const onError = useApolloAlertCallback("Failed to activate Scottkit signal");
  const [runMutation, { loading }] = useMutation(
    ActivateScottkitSignalMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          title: (
            <>
              A <Code {...{ color }}>{label}</Code> signal was activated
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
                signal,
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
