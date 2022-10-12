import React, { FC } from "react";
import { Affix, Global, Text } from "@mantine/core";

import ResumeEducationSection from "./ResumeEducationSection";
import ResumeSkillsSection from "./ResumeSkillsSection";
import ResumeWorkSection from "./ResumeWorkSection";

import {
  ResumePageQuery,
  ResumePageQueryVariables,
} from "~views/shared/helpers/apollo-generated";

type ResumePageProps = {
  readonly data: ResumePageQuery;
  readonly variables: ResumePageQueryVariables;
  readonly printable?: boolean;
};

const ResumePage: FC<ResumePageProps> = ({ data, printable }) => {
  const { resume } = data;
  const { basics, work, education, skills } = resume as {
    basics: Record<string, string> & { profiles: any[] };
    work: any[];
    education: any[];
    skills: any[];
  };
  const { profiles } = basics;
  const githubProfile = profiles.find(
    x => x.network.toLowerCase() === "github",
  );
  return (
    <>
      <Global
        styles={({ colors }) => ({
          body: {
            backgroundColor: colors.dark[4],
          },
        })}
      />
      <Container
        px="0.75in"
        py="0.4in"
        sx={{ width: "8.5in", height: "11in", backgroundColor: "white" }}
        {...(printable ? {} : { mt: 48, mb: 72 })}
      >
        <Stack spacing="xs">
          <Box>
            <Group spacing="xs" position="apart">
              <Title size="h2">{basics.name}</Title>
              {githubProfile && (
                <Anchor
                  href={githubProfile.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Badge
                    leftSection={
                      <Center>
                        <IconFeatherGithub />
                      </Center>
                    }
                    color="dark "
                    variant="outline"
                    px={6}
                    sx={({ fontFamilyMonospace }) => ({
                      cursor: "pointer",
                      fontFamily: fontFamilyMonospace,
                    })}
                  >
                    github.com/{githubProfile.username}
                  </Badge>
                </Anchor>
              )}
            </Group>
            <Text size="sm" color="dark" sx={{ whiteSpace: "pre-line" }}>
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
              Education
            </Title>
            <Group spacing="xs" grow>
              {education.map((info, index) => (
                <ResumeEducationSection key={index} {...{ info }} />
              ))}
            </Group>
          </Box>
          <Box>
            <Title order={2} size="h4" mb={-1}>
              Skills
            </Title>
            <Stack spacing={6}>
              {skills.map((info, index) => (
                <ResumeSkillsSection key={index} {...{ info }} />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
      {!printable && <DownloadPDFButton />}
    </>
  );
};

const DownloadPDFButton = () => {
  const mounted = useMounted();
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" duration={400} {...{ mounted }}>
        {style => (
          <Button
            component="a"
            href="/resume.pdf"
            color="pink"
            leftIcon={<IconHeroDocumentSolid />}
            {...{ style }}
          >
            I want a PDF!
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export default wrapPage(ResumePage);
