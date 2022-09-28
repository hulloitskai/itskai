import React, { useCallback } from "react";
import type { FC } from "react";

import {
  Button,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { useForm } from "@mantine/form";

import PencilSquareIcon from "~icons/heroicons/pencil-square-20-solid";

import What from "~components/What";
import Layout from "~components/Layout";
import InputIcon from "~components/InputIcon";
import AnotherComponent from "~components/AnotherComponent";

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
                <PencilSquareIcon />
              </InputIcon>
            }
            {...getInputProps("name")}
          />
          <Button onClick={showModal}>Open Modal</Button>
          <AnotherComponent />
          <What />
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
