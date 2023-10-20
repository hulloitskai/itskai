import type { FC } from "react";
import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Code, Text } from "@mantine/core";

import ExclamationCircleIcon from "~icons/heroicons/exclamation-circle-20-solid";
import PencilSquareIcon from "~icons/heroicons/pencil-square-20-solid";
import BellAlertIcon from "~icons/heroicons/bell-alert-20-solid";
import ArrowTopRightOnSquareIcon from "~icons/heroicons/arrow-top-right-on-square-20-solid";

import type { TestPageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import TestForm from "~/components/TestForm";
import TestFeed from "~/components/TestFeed";

export type TestPageProps = PagePropsWithData<TestPageQuery> & {
  readonly name: string;
};

type TestPageFormValues = {
  readonly name: string;
};

type TestPageModalContentProps = {
  readonly name: string;
};

const TestPageModalContent: FC<TestPageModalContentProps> = ({ name }) => (
  <Stack gap="xs">
    <Text>Apparently, your name is:</Text>
    <TextInput value={name} readOnly />
    <Button onClick={() => closeAllModals()}>Uh-huh.</Button>
  </Stack>
);

const TestPage: PageComponent<TestPageProps> = ({
  data,
  name: initialName,
}) => {
  // == Form
  const { values, getInputProps } = useForm<TestPageFormValues>({
    initialValues: resolve<TestPageFormValues>(() => {
      return { name: initialName };
    }),
  });

  const { name } = values;
  const nameDescription = useMemo(() => {
    return `Your name is: ${name}`;
  }, [name]);

  // == Callbacks
  const showModal = useCallback(() => {
    openModal({
      title: "I'm a modal!",
      children: <TestPageModalContent {...{ name }} />,
    });
  }, [name]);
  const showAlert = useCallback(() => {
    showNotification({
      color: "yellow",
      icon: <ExclamationCircleIcon />,
      title: "Graphic design is my passion",
      message: "I love graphic design.",
    });
  }, []);

  // == Markup
  return (
    <Stack gap="xl">
      <Title fw={900}>Test Page</Title>
      <Stack gap="xs">
        <Title order={4}>Test Component Data</Title>
        <Code block>{JSON.stringify(data, undefined, 2)}</Code>
        <TextInput
          label="Name"
          description={nameDescription}
          placeholder="Some Input"
          leftSection={<PencilSquareIcon />}
          {...getInputProps("name")}
        />
        <Group gap="xs" grow>
          <Button
            leftSection={<ArrowTopRightOnSquareIcon />}
            onClick={showModal}
          >
            Open Modal
          </Button>
          <Button leftSection={<BellAlertIcon />} onClick={showAlert}>
            Notify Me
          </Button>
        </Group>
      </Stack>
      <Divider />
      <TestForm />
      <Divider />
      <TestFeed />
    </Stack>
  );
};

TestPage.layout = buildLayout<TestPageProps>((page, { data: { viewer } }) => (
  <AppLayout withContainer containerSize="sm" withGutter {...{ viewer }}>
    {page}
  </AppLayout>
));

export default TestPage;
