import type { FC } from "react";
import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { Code, Text } from "@mantine/core";

import ExclamationCircleIcon from "~icons/heroicons/exclamation-circle-20-solid";
import PencilSquareIcon from "~icons/heroicons/pencil-square-20-solid";
import BellAlertIcon from "~icons/heroicons/bell-alert-20-solid";
import ArrowTopRightOnSquareIcon from "~icons/heroicons/arrow-top-right-on-square-20-solid";

import type { TestPageQuery } from "~/helpers/graphql";

import TestForm from "~/components/TestForm";
import TestFeed from "~/components/TestFeed";

export type TestPageProps = PagePropsWithData<TestPageQuery> & {
  readonly name: string;
};

type TestPageFormValues = {
  readonly name: string;
};

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
      title: "I hate Visual Programming",
      message: "Miss me with that visual programming shit.",
    });
  }, []);

  // == Markup
  return (
    <Stack spacing="xl">
      <Title>Test Page</Title>
      <Stack spacing="xs">
        <Title order={4}>Test Component Data</Title>
        <Code block>{JSON.stringify(data, undefined, 2)}</Code>
        <TextInput
          icon={<PencilSquareIcon />}
          label="Name"
          description={nameDescription}
          placeholder="Some Input"
          {...getInputProps("name")}
        />
        <Group spacing="xs" grow>
          <Button leftIcon={<ArrowTopRightOnSquareIcon />} onClick={showModal}>
            Open Modal
          </Button>
          <Button leftIcon={<BellAlertIcon />} onClick={showAlert}>
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
  <AppLayout withContainer {...{ viewer }}>
    {page}
  </AppLayout>
));

export default TestPage;

type TestPageModalContentProps = {
  readonly name: string;
};

const TestPageModalContent: FC<TestPageModalContentProps> = ({ name }) => (
  <Stack spacing="xs">
    <Text>Apparently, your name is:</Text>
    <TextInput value={name} readOnly />
    <Button onClick={() => closeAllModals()}>Uh-huh.</Button>
  </Stack>
);
