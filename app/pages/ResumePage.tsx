import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { MantineProvider, Text } from "@mantine/core";
import type { Resume } from "~/helpers/resume";

import EnvelopeIcon from "~icons/heroicons/envelope-20-solid";
import GithubIcon from "~icons/lucide/github";
import LinkedInIcon from "~icons/lucide/linkedin";

import type { ResumePageQuery } from "~/helpers/graphql";

import ResumeLayout from "~/components/ResumeLayout";
import ResumeEducationSection from "~/components/ResumeEducationSection";
import ResumeSkillsSection from "~/components/ResumeSkillsSection";
import ResumeWorkSection from "~/components/ResumeWorkSection";
import ResumeDialog from "~/components/ResumeDialog";

export type ResumePageProps = PagePropsWithData<ResumePageQuery> & {
  readonly printable?: boolean;
};

const ResumePage: PageComponent<ResumePageProps> = ({
  data: { resume },
  printable,
}) => {
  const { basics, work, education, skills } = resume as Resume;
  const { email, profiles } = basics ?? {};
  const obfuscatedEmail = useMemo(() => email!.replace("@", "[at]"), [email]);

  return (
    <MantineProvider
      inherit
      theme={{
        colorScheme: "light",
        primaryColor: "indigo",
        globalStyles: () => ({
          "@media print": {
            "@page": {
              margin: 0,
            },
          },
        }),
      }}
    >
      <ResumeLayout {...{ printable }}>
        <Box>
          <Group spacing="xs" position="apart">
            {!!basics?.name && (
              <Title size="h2" color="dark">
                {basics.name}
              </Title>
            )}
            <Group spacing="sm">
              {!!basics?.summary && (
                <Text
                  size="sm"
                  color="dark"
                  weight={500}
                  lh={1.45}
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {basics.summary}
                </Text>
              )}
              {!!basics?.summary && !!basics?.location?.city && (
                <Divider orientation="vertical" sx={{ borderWidth: rem(2) }} />
              )}
              {!!basics?.location?.city && (
                <Text
                  size="xs"
                  weight={500}
                  sx={({ fontFamilyMonospace }) => ({
                    fontFamily: fontFamilyMonospace,
                  })}
                >
                  {basics.location.city}
                </Text>
              )}
            </Group>
          </Group>
          <Group spacing={8}>
            <Box sx={{ flexGrow: 1 }}>
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
                  color="gray.7"
                  styles={({ fontFamilyMonospace, fn }) => ({
                    root: {
                      borderColor: fn.primaryColor(),
                    },
                    inner: {
                      fontFamily: fontFamilyMonospace,
                      textTransform: "none",
                    },
                  })}
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
                    color="gray.7"
                    px={6}
                    sx={({ fontFamilyMonospace }) => ({
                      fontFamily: fontFamilyMonospace,
                    })}
                    styles={({ fontFamilyMonospace, fn }) => ({
                      root: {
                        borderColor: fn.primaryColor(),
                      },
                      inner: {
                        fontFamily: fontFamilyMonospace,
                        textTransform: "none",
                      },
                    })}
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
            <Title order={2} size="h4" color="dark.4" lh={1.3}>
              Skills
            </Title>
            {skills.map((skillInfo, index) => (
              <ResumeSkillsSection key={index} {...{ skillInfo }} />
            ))}
          </Box>
        )}
        {work && (
          <Box>
            <Title order={2} size="h4" color="dark.4" lh={1.3}>
              Experience
            </Title>
            <Stack spacing={8}>
              {work.map((workInfo, index) => (
                <ResumeWorkSection key={index} {...{ workInfo }} />
              ))}
            </Stack>
          </Box>
        )}
        {education && (
          <Box>
            <Title order={2} size="h4" color="dark.4" lh={1.3}>
              Education
            </Title>
            <Stack spacing={2}>
              {education.map((educationInfo, index) => (
                <ResumeEducationSection key={index} {...{ educationInfo }} />
              ))}
            </Stack>
          </Box>
        )}
      </ResumeLayout>
      {!printable && <ResumeDialog />}
    </MantineProvider>
  );
};

export default ResumePage;
