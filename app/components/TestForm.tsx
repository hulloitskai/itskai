import type { FC } from "react";
import { DatePicker } from "@mantine/dates";

import { TestMutationDocument } from "~/queries";

export type TestFormValues = {
  readonly name: string;
  readonly birthday: string | null;
};

const TestForm: FC = () => {
  const onError = useApolloErrorCallback("Mutation failed!");
  const [runMutation] = useMutation(TestMutationDocument, {
    onError,
    onCompleted: data => {
      showNotification({
        title: "You won!",
        message: JSON.stringify(data),
      });
    },
  });
  const { getInputProps, onSubmit } = useForm<TestFormValues>({
    initialValues: {
      name: "",
      birthday: null,
    },
  });
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
