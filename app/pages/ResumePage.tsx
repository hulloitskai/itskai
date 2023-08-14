import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { MantineProvider, Text } from "@mantine/core";
import EnvelopeIcon from "~icons/heroicons/envelope-20-solid";
import GithubIcon from "~icons/lucide/github";
import type { Resume } from "~/helpers/resume";

import type { ResumePageQuery } from "~/helpers/graphql";

import ResumeLayout from "~/components/ResumeLayout";
import ResumeEducationSection from "~/components/ResumeEducationSection";
import ResumeSkillsSection from "~/components/ResumeSkillsSection";
import ResumeWorkSection from "~/components/ResumeWorkSection";
import ResumePDFDownloadButton from "~/components/ResumePDFDownloadButton";

export type ResumePageProps = PagePropsWithData<ResumePageQuery> & {
  readonly printable?: boolean;
};

const ResumePage: PageComponent<ResumePageProps> = ({
  data: { resume },
  printable,
}) => {
  const { basics, work, education, skills } = resume as Resume;
  const { email, profiles } = basics ?? {};
  const githubProfile = profiles?.find(
    ({ network }) => network?.toLowerCase() === "github",
  );
  const obfuscatedEmail = useMemo(() => email!.replace("@", " [at] "), [email]);

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
            {basics && (
              <Title size="h2" color="dark">
                {basics.name}
              </Title>
            )}
            <Group spacing="xs" align="center">
              <Badge
                leftSection={
                  <Center>
                    <EnvelopeIcon />
                  </Center>
                }
                variant="outline"
                color="dark"
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
                {obfuscatedEmail}
              </Badge>
              {githubProfile && (
                <Anchor
                  href={githubProfile.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Badge
                    leftSection={
                      <Center>
                        <GithubIcon />
                      </Center>
                    }
                    variant="outline"
                    color="dark"
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
                  >
                    github.com/{githubProfile.username}
                  </Badge>
                </Anchor>
              )}
            </Group>
          </Group>
          {basics && (
            <Text
              size="sm"
              color="dark"
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.45,
              }}
            >
              {basics.summary}
            </Text>
          )}
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
      {!printable && <ResumePDFDownloadButton />}
    </MantineProvider>
  );
};

export default ResumePage;
