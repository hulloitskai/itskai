import type { Resume } from "~/types";
import { MantineProvider, Text, DEFAULT_THEME } from "@mantine/core";

import EnvelopeIcon from "~icons/heroicons/envelope-20-solid";
import GithubIcon from "~icons/lucide/github";
import LinkedInIcon from "~icons/lucide/linkedin";

import ResumeLayout from "~/components/ResumeLayout";
import ResumeEducationSection from "~/components/ResumeEducationSection";
import ResumeSkillsSection from "~/components/ResumeSkillsSection";
import ResumeWorkSection from "~/components/ResumeWorkSection";
import ResumeDialog from "~/components/ResumeDialog";
import ResumeProjectSection from "~/components/ResumeProjectSection";

export interface ResumePageProps extends SharedPageProps {
  resume: Resume;
  variant: string | null;
  printMode: boolean;
}

const ResumePage: PageComponent<ResumePageProps> = ({
  resume,
  variant,
  printMode,
}) => {
  const { basics, work, education, skills, projects } = resume;
  const { email, profiles } = basics ?? {};
  const obfuscatedEmail = useMemo(() => email!.replace("@", "[at]"), [email]);

  return (
    <MantineProvider
      theme={{ colors: { accent: DEFAULT_THEME.colors.indigo } }}
      forceColorScheme="light"
    >
      <ResumeLayout {...{ printMode }}>
        <Box>
          <Group justify="space-between" gap="xs" wrap="nowrap">
            {!!basics?.name && (
              <Title size="h3" c="dark">
                {basics.name}
              </Title>
            )}
            <Group gap="sm">
              {!!basics?.summary && (
                <Text
                  size="sm"
                  fw={500}
                  c="dark"
                  lh={1.45}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {basics.summary}
                </Text>
              )}
              {!!basics?.summary && !!basics?.location?.city && (
                <Divider
                  orientation="vertical"
                  color="gray.4"
                  style={{ borderWidth: rem(2) }}
                />
              )}
              {!!basics?.location?.city && (
                <Text size="xs" ff="monospace" fw={500}>
                  {basics.location.city}
                </Text>
              )}
            </Group>
          </Group>
          <Group gap={8}>
            <Box style={{ flexGrow: 1 }}>
              <Anchor
                component="button"
                onClick={() => {
                  open(
                    `mailto:Kai Xie<${email}>?subject=Let's%20work%20together!`,
                    "_blank",
                  );
                }}
              >
                <Badge
                  leftSection={
                    <Center>
                      <EnvelopeIcon />
                    </Center>
                  }
                  variant="outline"
                  color="accent"
                  styles={{
                    label: {
                      fontFamily: "var(--mantine-font-family-monospace)",
                      textTransform: "none",
                    },
                  }}
                >
                  {printMode ? email : obfuscatedEmail}
                </Badge>
              </Anchor>
            </Box>
            {profiles?.map(({ network, url }) => {
              const parsedUrl = url ? new URL(url) : null;
              return (
                <Anchor
                  key={network}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Badge
                    variant="outline"
                    color="accent"
                    px={6}
                    styles={{
                      label: {
                        fontFamily: "var(--mantine-font-family-monospace)",
                        textTransform: "none",
                      },
                    }}
                    {...(network === "GitHub" && {
                      leftSection: (
                        <Center>
                          <GithubIcon />
                        </Center>
                      ),
                    })}
                    {...(network === "LinkedIn" && {
                      leftSection: (
                        <Center>
                          <LinkedInIcon />
                        </Center>
                      ),
                    })}
                  >
                    {parsedUrl
                      ? `${parsedUrl.hostname}${parsedUrl.pathname}`
                      : "(missing URL)"}
                  </Badge>
                </Anchor>
              );
            })}
          </Group>
        </Box>
        {skills && (
          <Box>
            <Title order={2} size="h4" c="dark.4" fw={800} lh={1.3}>
              Skills
            </Title>
            {skills.map((skillInfo, index) => (
              <ResumeSkillsSection key={index} {...{ skillInfo }} />
            ))}
          </Box>
        )}
        {work && (
          <Box>
            <Title order={2} size="h4" c="dark.4" fw={800} lh={1.3}>
              Experience
            </Title>
            <Stack gap={8}>
              {work.map((workInfo, index) => (
                <ResumeWorkSection key={index} {...{ workInfo }} />
              ))}
            </Stack>
          </Box>
        )}
        {projects && (
          <Box>
            <Title order={2} size="h4" c="dark.4" fw={800} lh={1.3}>
              Projects
            </Title>
            <Stack gap={8}>
              {projects.map((projectInfo, index) => (
                <ResumeProjectSection key={index} {...{ projectInfo }} />
              ))}
            </Stack>
          </Box>
        )}
        {education && (
          <Box>
            <Title order={2} size="h4" c="dark.4" fw={800} lh={1.3}>
              Education
            </Title>
            <Stack gap={4}>
              {education.map((educationInfo, index) => (
                <ResumeEducationSection key={index} {...{ educationInfo }} />
              ))}
            </Stack>
          </Box>
        )}
      </ResumeLayout>
      {!printMode && <ResumeDialog variant={variant ?? undefined} />}
    </MantineProvider>
  );
};

export default ResumePage;
