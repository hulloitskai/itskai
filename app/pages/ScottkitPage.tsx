import type { FC, ReactNode } from "react";
import type { PageComponent, PageProps } from "~/helpers/inertia";
import { Code, Text } from "@mantine/core";
import LightbulbIcon from "~icons/heroicons/light-bulb-20-solid";

import {
  ActivateScottkitSignalMutationDocument,
  ScottkitSignalType,
} from "~/helpers/graphql";
import type { ScottkitPageQuery } from "~/helpers/graphql";

import {
  scottkitSignalTypeLabel,
  scottkitSignalTypeIcon,
  scottkitSignalTypeColor,
} from "~/helpers/types/ScottkitSignalType";

import AppMeta from "~/components/AppMeta";
import BlankLayout from "~/components/BlankLayout";
import ContentContainer from "~/components/ContentContainer";

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

ScottkitPage.layout = buildLayout<ScottkitPageProps>(page => (
  <BlankLayout>
    <AppMeta title="Scottkit" />
    <ContentContainer withGutter>{page}</ContentContainer>
  </BlankLayout>
));

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
