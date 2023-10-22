import type { PageProps } from "@inertiajs/core";
import type { PageComponent } from "~/helpers/inertia";

import { Text } from "@mantine/core";

import PageContainer from "~/components/PageContainer";
import PageLayout from "~/components/PageLayout";

import "~/components/AppLayout.css";
import classes from "./SenecaPage.module.css";

export type SenecaPageProps = PageProps & {
  readonly whenWeMet: string;
  readonly lastIncident: string;
};

const SenecaPage: PageComponent<SenecaPageProps> = ({
  lastIncident: lastIncidentISO,
}) => {
  const daysSinceLastIncident = useMemo(() => {
    const dateTime = DateTime.fromISO(lastIncidentISO);
    const diffDays = DateTime.now().diff(dateTime).as("days");
    return Math.round(diffDays);
  }, [lastIncidentISO]);
  return (
    <PageContainer size="sm" withGutter>
      <Card
        radius="lg"
        bg="var(--mantine-color-black)"
        p="md"
        className={classes.safetyCard}
      >
        <Stack
          gap={36}
          p="xs"
          pb="xl"
          bg="#F8D448"
          style={({ radius }) => ({ borderRadius: radius.md })}
        >
          <Box
            bg="var(--mantine-color-black)"
            p="sm"
            style={({ radius }) => ({
              borderTopLeftRadius: radius.md,
              borderTopRightRadius: radius.md,
            })}
          >
            <Text
              c="#F8D448"
              fz={72}
              fw={900}
              lh={1.2}
              style={{ textAlign: "center" }}
            >
              Safety first
            </Text>
          </Box>
          <Center
            pb={24}
            px={60}
            bg="var(--mantine-color-white)"
            style={({ black }) => ({
              border: `${rem(4)} solid ${black}`,
              alignSelf: "center",
            })}
          >
            <Text
              ff="Pacifico, cursive"
              fz={160}
              fw={900}
              lh={1}
              c="var(--mantine-color-black)"
            >
              {daysSinceLastIncident}
            </Text>
          </Center>
          <Text
            fz={48}
            fw={900}
            lh={1.1}
            c="var(--mantine-color-black)"
            maw={400}
            style={{ alignSelf: "center", textAlign: "center" }}
          >
            <Text span inherit fz={100}>
              days
            </Text>
            <br />
            since last injury
          </Text>
        </Stack>
      </Card>
    </PageContainer>
  );
};

SenecaPage.layout = page => (
  <PageLayout>
    <Head>
      <title>hi seneca</title>
      <meta name="robots" content="noindex" />
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
    </Head>
    {page}
  </PageLayout>
);

export default SenecaPage;
