import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import ResumeLayout from "~/components/ResumeLayout";
import ResumeEducationSection from "~/components/ResumeEducationSection";
import ResumeSkillsSection from "~/components/ResumeSkillsSection";
import ResumeWorkSection from "~/components/ResumeWorkSection";
import ResumePDFDownloadButton from "~/components/ResumePDFDownloadButton";

import EnvelopeIcon from "~icons/heroicons/envelope-20-solid";
import GithubIcon from "~icons/feather/github";

import { ResumePageQuery, ResumePageQueryVariables } from "~/queries";

type ResumePageProps = {
  readonly data: ResumePageQuery;
  readonly variables: ResumePageQueryVariables;
  readonly printable?: boolean;
};

const ResumePage: PageComponent<ResumePageProps> = ({ data, printable }) => {
  const { resume } = data;
  const { basics, work, education, skills } = resume as {
    basics: Record<string, string> & { profiles: any[] };
    work: any[];
    education: any[];
    skills: any[];
  };
  const { email, profiles } = basics;
  const githubProfile = profiles.find(
    x => x.network.toLowerCase() === "github",
  );
  const splitEmail = useMemo(() => {
    return email.replace("@", " [at] ");
  }, [email]);
  return (
    <>
      <ResumeLayout {...{ printable }}>
        <Box>
          <Group spacing="xs" position="apart">
            <Title size="h2">{basics.name}</Title>
            <Group spacing="xs" align="center">
              <Badge
                leftSection={
                  <Center>
                    <EnvelopeIcon />
                  </Center>
                }
                color="dark"
                variant="outline"
                styles={({ fontFamilyMonospace }) => ({
                  inner: {
                    fontFamily: fontFamilyMonospace,
                    textTransform: "none",
                  },
                })}
              >
                {splitEmail}
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
                    color="dark "
                    variant="outline"
                    px={6}
                    sx={({ fontFamilyMonospace }) => ({
                      fontFamily: fontFamilyMonospace,
                    })}
                    styles={({ fontFamilyMonospace }) => ({
                      root: { cursor: "pointer" },
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
        </Box>
        <Box>
          <Title order={2} size="h4">
            Experience
          </Title>
          <Stack spacing={8}>
            {work.map((info, index) => (
              <ResumeWorkSection key={index} {...{ info }} />
            ))}
          </Stack>
        </Box>
        <Box>
          <Title order={2} size="h4" mb={-1}>
            Skills
          </Title>
          <Stack spacing={4}>
            {skills.map((info, index) => (
              <ResumeSkillsSection key={index} {...{ info }} />
            ))}
          </Stack>
        </Box>
        <Box>
          <Title order={2} size="h4" mb={-1}>
            Education
          </Title>
          <Group spacing="xs" grow>
            {education.map((info, index) => (
              <ResumeEducationSection key={index} {...{ info }} />
            ))}
          </Group>
          <Text size="xs" weight={500} color="gray.7" mt={4}>
            <Text
              span
              sx={({ colors, fn }) => ({
                color: fn.darken(colors.yellow[8], 0.1),
              })}
            >
              *
            </Text>
            I dropped out of school to build a startup halfway through my second
            year ✌️ (see experience:{" "}
            <Text weight={700} span>
              Playces
            </Text>
            )
          </Text>
        </Box>
      </ResumeLayout>
      {!printable && <ResumePDFDownloadButton />}
    </>
  );
};

ResumePage.layout = null;

export default ResumePage;
