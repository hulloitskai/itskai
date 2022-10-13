import React, { FC } from "react";
import { AnchorProps, Text } from "@mantine/core";

import { useContactMe } from "~views/shared/hooks/contact";

import {
  HomePageQuery,
  HomePageQueryVariables,
} from "~views/shared/helpers/apollo-generated";

type HomePageProps = {
  readonly data: HomePageQuery;
  readonly variables: HomePageQueryVariables;
};

const HomePage: FC<HomePageProps> = () => (
  <AppLayout spacing="xl">
    <Space h="xl" />
    <Stack spacing={0} align="center">
      <Title size={48}>Hullo!</Title>
      <Text color="dark.3" sx={{ alignSelf: "center" }}>
        I&apos;m{" "}
        <Text color="dark" weight={600} span>
          Kai
        </Text>
        ! Welcome to my little corner of the internet :)
      </Text>
    </Stack>
    <Alert
      color="indigo"
      icon={<IconHeroExclamationCircle20Solid />}
      title="Kai is currently looking for work!"
      styles={({ spacing, colors }) => ({
        icon: {
          marginRight: spacing.xs,
        },
        title: {
          marginBottom: 0,
        },
        message: {
          color: colors.dark[3],
        },
      })}
    >
      My{" "}
      <Anchor href="/work" target="_blank" color="indigo">
        portfolio
      </Anchor>{" "}
      is a work-in-progress, but in the meantime you can{" "}
      <Anchor href="/resume" color="indigo">
        check out my resume
      </Anchor>{" "}
      :)
    </Alert>
    <Divider />
    <Container size="sm">
      <Stack spacing={8}>
        <Text color="dark.3">
          This website is still very much in construction! And so here are some
          design goals I am keeping in mind as I build it:
        </Text>
        <List
          withPadding
          styles={({ colors, fn }) => ({
            item: {
              color: colors.dark[fn.primaryShade()],
            },
          })}
        >
          <List.Item>
            To create a space where I can share my thoughts, feelings, and
            ideas.
          </List.Item>
          <List.Item>
            To make it easy for others to collaborate with me on the things I
            care about.
          </List.Item>
          <List.Item>
            To encourage others to interact with me and do fun things together
            with me in The Real World™!
          </List.Item>
        </List>
        <Text color="dark.3">
          Is there something you wanted to chat with me about? Please reach out!
          You can <ContactLink color="indigo" /> or{" "}
          <Anchor
            href="http://calendly.com/hulloitskai/hangout"
            target="_blank"
            rel="noopener noreferrer nofollow"
            color="indigo"
          >
            schedule a hangout with me
          </Anchor>{" "}
          :)
        </Text>
      </Stack>
    </Container>
  </AppLayout>
);

const ContactLink: FC<AnchorProps> = ({ ...otherProps }) => {
  const [contactMe] = useContactMe();
  return (
    <Anchor component="button" onClick={contactMe} {...otherProps}>
      email me
    </Anchor>
  );
};

export default wrapPage(HomePage);
