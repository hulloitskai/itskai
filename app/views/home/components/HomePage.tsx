import React, { FC } from "react";

import { Code, Text } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import TestForm from "~views/shared/components/TestForm";
import TestFeed from "~views/shared/components/TestFeed";

import {
  HomePageQuery,
  HomePageQueryVariables,
} from "~views/shared/helpers/apollo-generated";

type HomePageProps = {
  readonly data: HomePageQuery;
  readonly variables: HomePageQueryVariables;
};

type HomePageFormValues = {
  readonly name: string;
};

const HomePage: FC<HomePageProps> = ({ data, variables }) => {
  // == Form ==
  const { values, getInputProps } = useForm<HomePageFormValues>({
    initialValues: resolve<HomePageFormValues>(() => {
      const { name } = variables;
      return { name };
    }),
  });

  const { name } = values;
  const nameDescription = useMemo(() => {
    return `Your name is: ${name}`;
  }, [name]);

  // == Callbacks ==
  const showModal = useCallback(() => {
    openModal({
      title: <Title order={3}>I Am A Modal!</Title>,
      children: <HomePageModalContent {...{ name }} />,
    });
  }, [name]);
  const showAlert = useCallback(() => {
    showNotification({
      color: "yellow",
      icon: <IconHeroExclamationCircle20Solid />,
      title: "I hate Visual Programming",
      message: "Miss me with that visual programming shit.",
    });
  }, []);

  // == Render ==
  return (
    <Container size="xs" my="xl">
      <Stack spacing="xl">
        <Title>My Home Page</Title>
        <Stack spacing="xs">
          <Title order={4}>Test Component Data</Title>
          <Code block>{JSON.stringify(data)}</Code>
          <TextInput
            icon={<IconHeroPencilSquare20Solid />}
            label="Name"
            description={nameDescription}
            placeholder="Some Input"
            {...getInputProps("name")}
          />
          <Group spacing="xs" grow>
            <Button
              leftIcon={<IconHeroArrowTopRightOnSquare20Solid />}
              onClick={showModal}
            >
              Open Modal
            </Button>
            <Button leftIcon={<IconHeroBellAlert20Solid />} onClick={showAlert}>
              Notify Me
            </Button>
          </Group>
        </Stack>
        <Divider />
        <TestForm />
        <Divider />
        <TestFeed />
      </Stack>
    </Container>
  );
};

type HomePageModalContentProps = {
  readonly name: string;
};

const HomePageModalContent: FC<HomePageModalContentProps> = ({ name }) => (
  <Stack spacing="xs">
    <Text>I&apos;m magic! And, your name is:</Text>
    <TextInput value={name} readOnly />
    <Button onClick={() => closeAllModals()}>Uh-huh.</Button>
  </Stack>
);

export default withProviders(HomePage);
