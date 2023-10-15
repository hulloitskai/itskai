import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { MantineProvider, Text } from "@mantine/core";

import EnvelopeIcon from "~icons/heroicons/envelope-20-solid";
import GithubIcon from "~icons/lucide/github";
import LinkedInIcon from "~icons/lucide/linkedin";

import type { ResumePageQuery } from "~/helpers/graphql";
import type { Resume } from "~/helpers/resume";

import ResumeLayout from "~/components/ResumeLayout";
import ResumeEducationSection from "~/components/ResumeEducationSection";
import ResumeSkillsSection from "~/components/ResumeSkillsSection";
import ResumeWorkSection from "~/components/ResumeWorkSection";
import ResumeDialog from "~/components/ResumeDialog";

export type ResumePageProps = PagePropsWithData<ResumePageQuery> & {
  readonly variant?: string;
  readonly printable?: boolean;
};

const ResumePage: PageComponent<ResumePageProps> = ({
  variant,
  printable,
  data: { resume },
}) => {
  const { basics, work, education, skills } = resume as Resume;
  const { email, profiles } = basics ?? {};
  const obfuscatedEmail = useMemo(() => email!.replace("@", "[at]"), [email]);

  return (
    <MantineProvider
      theme={{ primaryColor: "indigo" }}
      forceColorScheme="light"
    >
      <ResumeLayout {...{ printable }}>
        <Box>
          <Group justify="space-between" gap="xs" wrap="nowrap">
            {!!basics?.name && (
              <Title size="h2" c="dark">
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
                <Text
                  size="xs"
                  ff="var(--mantine-font-family-monospace)"
                  fw={500}
                >
                  {basics.location.city}
                </Text>
              )}
            </Group>
          </Group>
          <Group gap={8}>
            <Box style={{ flexGrow: 1 }}>
              <Anchor
                target="_blank"
                rel="noopener noreferrer nofollow"
                {...(printable && {
                  href: `mailto:Kai Xie<${email}>?subject=Let's%20work%20together!`,
                })}
              >
                <Badge
                  leftSection={
                    <Center>
                      <EnvelopeIcon />
                    </Center>
                  }
                  variant="outline"
                  color="var(--mantine-color-gray-filled)"
                  styles={{
                    root: {
                      borderColor: "var(--mantine-color-primary-border)",
                    },
                    label: {
                      fontFamily: "var(--mantine-font-family-monospace)",
                      textTransform: "none",
                    },
                  }}
                >
                  {printable ? email : obfuscatedEmail}
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
                    color="var(--mantine-color-gray-filled)"
                    px={6}
                    ff="var(--mantine-font-family-monospace)"
                    styles={{
                      root: {
                        borderColor: "var(--mantine-color-primary-border)",
                      },
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
      {!printable && <ResumeDialog {...{ variant }} />}
    </MantineProvider>
  );
};

export default ResumePage;
