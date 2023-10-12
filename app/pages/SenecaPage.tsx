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
    const diff = DateTime.now().diff(dateTime, "days");
    return Math.round(diff.days);
  }, [lastIncidentISO]);
  return (
    <PageContainer size="sm" withGutter>
      <Card
        radius="lg"
        bg="#F8D448"
        p={6}
        className={classes.safetyCard}
        style={({ black }) => ({
          borderColor: black,
          borderWidth: rem(16),
        })}
      >
        <Stack gap={36} pb="xl">
          <Box bg="var(--mantine-color-black)" p="xs">
            <Text c="#F8D448" fz={72} fw={900} style={{ textAlign: "center" }}>
              Safety first
            </Text>
          </Box>
          <Center
            py={24}
            px={60}
            bg="var(--mantine-color-white)"
            style={({ black }) => ({
              border: `${rem(4)} solid ${black}`,
              alignSelf: "center",
            })}
          >
            <Text fz={120} fw={900} lh={1.2} c="var(--mantine-color-black)">
              {daysSinceLastIncident}
            </Text>
          </Center>
          <Text
            fz={48}
            fw={900}
            lh={1.2}
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
    </Head>
    {page}
  </PageLayout>
);

export default SenecaPage;
