import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import ArrowTopRightOnSquareIcon from "~icons/heroicons/arrow-top-right-on-square-20-solid";
import BellAlertIcon from "~icons/heroicons/bell-alert-20-solid";
import PencilSquareIcon from "~icons/heroicons/pencil-square-20-solid";

import AppLayout from "~/components/AppLayout";
import { type FileValue } from "~/components/FileInput";
import FileInput from "~/components/FileInput";
import TestFeed from "~/components/TestFeed";
import TestForm from "~/components/TestForm";

export interface TestPageProps extends SharedPageProps {
  name: string;
  files: FileValue[];
}

const TestPage: PageComponent<TestPageProps> = ({ name: initialName }) => {
  // == Form
  const { getValues, getInputProps } = useForm({
    name: "TestPage",
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
      children: <TestPageModalBody name={name} />,
    });
  }, [getValues]);
  const showAlert = useCallback(() => {
    toast.info("Graphic design is my passion", {
      description: "I love graphic design.",
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
        <FileInput {...getInputProps("files")} label="Files" multiple />
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

TestPage.layout = page => (
  <AppLayout title="Test page" withContainer containerSize="sm" withGutter>
    {page}
  </AppLayout>
);

export default TestPage;

interface TestPageModalBodyProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  name: string;
}

const TestPageModalBody: FC<TestPageModalBodyProps> = ({
  name,
  ...otherProps
}) => (
  <Stack gap="xs" {...otherProps}>
    <Text>Apparently, your name is:</Text>
    <TextInput defaultValue={name} />
    <Button onClick={() => closeAllModals()}>Uh-huh.</Button>
  </Stack>
);
