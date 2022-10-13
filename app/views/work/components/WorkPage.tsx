import { Text } from "@mantine/core";
import React, { FC } from "react";

import { useContactMe } from "~views/shared/hooks/contact";
import ResumeButton from "~views/shared/components/ResumeButton";

// eslint-disable-next-line
type WorkPageProps = {};

const WorkPage: FC<WorkPageProps> = () => (
  <AppLayout spacing="xl">
    <Stack>
      <PageHeader
        title="Let's build something beautiful, together."
        description={
          "I'm currently exploring new directions in work and life. Here are " +
          "some things I care about, some things I'm proud of doing, and " +
          "some ways that we can work together!"
        }
        small
      />
      <Group spacing="xs" grow>
        <ResumeButton />
        <ContactButton />
      </Group>
    </Stack>
    <Divider />
    <Center
      p="lg"
      sx={({ colors, radius }) => ({
        backgroundColor: colors.gray[1],
        borderRadius: radius.sm,
        minHeight: 128,
      })}
    >
      <Group
        spacing="xs"
        sx={({ colors }) => ({
          color: colors.dark[3],
        })}
      >
        <IconHeroWrenchScrewdriver />
        <Text size="sm" weight={500}>
          Portfolio projects coming soon!
        </Text>
      </Group>
    </Center>
  </AppLayout>
);

const ContactButton: FC = () => {
  const [contactMe, { loading }] = useContactMe({
    subject: "Let's work together!",
  });
  return (
    <Button
      variant="outline"
      leftIcon={<IconHeroEnvelope20Solid />}
      {...{ loading }}
      onClick={contactMe}
    >
      Email me!
    </Button>
  );
};

export default wrapPage(WorkPage);
