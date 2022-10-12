import React, { FC } from "react";

import { Code, Text } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

import TestForm from "~views/shared/components/TestForm";
import TestFeed from "~views/shared/components/TestFeed";

import {
  TestPageQuery,
  TestPageQueryVariables,
} from "~views/shared/helpers/apollo-generated";

type TestPageProps = {
  readonly data: TestPageQuery;
  readonly variables: TestPageQueryVariables;
};

type TestPageFormValues = {
  readonly name: string;
};

const TestPage: FC<TestPageProps> = ({ data, variables }) => {
  // == Form ==
  const { values, getInputProps } = useForm<TestPageFormValues>({
    initialValues: resolve<TestPageFormValues>(() => {
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
      children: <TestPageModalContent {...{ name }} />,
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
    <AppLayout>
      <Stack spacing="xl">
        <Title>Test Page</Title>
        <Stack spacing="xs">
          <Title order={4}>Test Component Data</Title>
          <Code block>{JSON.stringify(data, undefined, 2)}</Code>
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
    </AppLayout>
  );
};

type TestPageModalContentProps = {
  readonly name: string;
};

const TestPageModalContent: FC<TestPageModalContentProps> = ({ name }) => (
  <Stack spacing="xs">
    <Text>I&apos;m magic! And, your name is:</Text>
    <TextInput value={name} readOnly />
    <Button onClick={() => closeAllModals()}>Uh-huh.</Button>
  </Stack>
);

export default wrapPage(TestPage);
