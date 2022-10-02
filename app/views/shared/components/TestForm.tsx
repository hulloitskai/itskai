import React, { FC } from "react";

import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";

import { TestMutationDocument } from "~views/shared/helpers/apollo-generated";
import { useErrorCallback } from "~views/shared/hooks/apollo";

type TestFormValues = {
  readonly name: string;
  readonly birthday: string;
};

const TestForm: FC = () => {
  const onError = useErrorCallback("Mutation failed!");
  const [runMutation] = useMutation(TestMutationDocument, {
    onError,
    onCompleted: data => {
      showNotification({
        title: "You won!",
        message: JSON.stringify(data),
      });
    },
  });
  const { getInputProps, onSubmit } = useForm<TestFormValues>();
  return (
    <Stack spacing="xs">
      <Title order={4}>Test Form</Title>
      <form
        onSubmit={onSubmit(({ name, birthday }) => {
          runMutation({
            variables: {
              input: {
                name,
                birthday,
              },
            },
          });
        })}
      >
        <Stack spacing="xs">
          <TextInput label="Name" required {...getInputProps("name")} />
          <DatePicker label="Birthday" {...getInputProps("birthday")} />
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default TestForm;
