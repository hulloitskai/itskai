import { Text } from "@mantine/core";

import ExclamationCircleIcon from "~icons/heroicons/exclamation-circle-20-solid";
import PencilSquareIcon from "~icons/heroicons/pencil-square-20-solid";
import BellAlertIcon from "~icons/heroicons/bell-alert-20-solid";
import ArrowTopRightOnSquareIcon from "~icons/heroicons/arrow-top-right-on-square-20-solid";

import AppLayout from "~/components/AppLayout";
import TestForm from "~/components/TestForm";
import TestFeed from "~/components/TestFeed";

import type { FileValue } from "~/components/FileField";
import FileField from "~/components/FileField";

export interface TestPageProps extends SharedPageProps {
  name: string;
  files: FileValue[];
}

const TestPage: PageComponent<TestPageProps> = ({ name: initialName }) => {
  // == Form
  const { getValues, getInputProps } = useForm({
    mode: "uncontrolled",
    initialValues: { name: initialName },
  });
  const nameDescription = useMemo(() => {
    const { name } = getValues();
    return `Your name is: ${name}`;
  }, [getValues]);

  // == Callbacks
  const showModal = useCallback(() => {
    const { name } = getValues();
    openModal({
      title: "I'm a modal!",
      children: <TestPageModalContent name={name} />,
    });
  }, [getValues]);
  const showAlert = useCallback(() => {
    showNotification({
      color: "yellow",
      icon: <ExclamationCircleIcon />,
      title: "Graphic design is my passion",
      message: "I love graphic design.",
    });
  }, []);

  return (
    <Stack gap="xl">
      <Title fw={900}>Test page</Title>
      <Stack gap="xs">
        <Title order={3}>Test component</Title>
        <TextInput
          {...getInputProps("name")}
          label="Name"
          description={nameDescription}
          placeholder="Some input"
          leftSection={<PencilSquareIcon />}
        />
        <FileField {...getInputProps("files")} label="Files" multiple />
        <Group gap="xs" grow>
          <Button
            leftSection={<ArrowTopRightOnSquareIcon />}
            onClick={showModal}
          >
            Open modal
          </Button>
          <Button leftSection={<BellAlertIcon />} onClick={showAlert}>
            Notify me
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

TestPage.layout = buildLayout<TestPageProps>(page => (
  <AppLayout title="Test page" withContainer containerSize="sm" withGutter>
    {page}
  </AppLayout>
));

export default TestPage;

interface TestPageModalContentProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  name: string;
}

const TestPageModalContent: FC<TestPageModalContentProps> = ({
  name,
  ...otherProps
}) => (
  <Stack gap="xs" {...otherProps}>
    <Text>Apparently, your name is:</Text>
    <TextInput value={name} />
    <Button onClick={() => closeAllModals()}>Uh-huh.</Button>
  </Stack>
);
