import React, { FC } from "react";

import { Text } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { useForm } from "@mantine/form";

type IndexHelloWorldPageProps = {
  readonly name: string;
};

type IndexHelloWorldPageFormValues = {
  name: string;
};

const IndexHelloWorldPage: FC<IndexHelloWorldPageProps> = ({ name }) => {
  const { values, getInputProps } = useForm<IndexHelloWorldPageFormValues>({
    initialValues: {
      name,
    },
  });
  const showModal = useCallback(() => {
    const { name } = values;
    openModal({
      title: <Title order={3}>I Am A Modal!</Title>,
      children: <IndexHelloWorldPageModalContent {...{ name }} />,
    });
  }, [values]);
  return (
    <Layout>
      <Container size="xs">
        <Stack spacing="xs">
          <Title>{values.name}</Title>
          <TextInput
            placeholder="Some Input"
            icon={
              <InputIcon>
                <IconHeroPencilSquare20Solid />
              </InputIcon>
            }
            {...getInputProps("name")}
          />
          <Button onClick={showModal}>Open Modal</Button>
          <AnotherComponent />
        </Stack>
      </Container>
    </Layout>
  );
};

type IndexHelloWorldPageModalContentProps = {
  readonly name: string;
};

const IndexHelloWorldPageModalContent: FC<
  IndexHelloWorldPageModalContentProps
> = ({ name }) => {
  return (
    <Stack spacing="xs">
      <Text>I&apos;m magic! And, your name is:</Text>
      <TextInput value={name} readOnly />
      <Button onClick={() => closeAllModals()}>Uh-huh.</Button>
    </Stack>
  );
};

export default IndexHelloWorldPage;
