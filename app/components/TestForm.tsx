import type { FC } from "react";
import { Code, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import { TestMutationDocument } from "~/helpers/graphql";

export type TestFormValues = {
  readonly name: string;
  readonly birthday: string | null;
};

const TestForm: FC = () => {
  // == Form
  const { getInputProps, onSubmit, setErrors, reset } = useForm<TestFormValues>(
    {
      initialValues: {
        name: "",
        birthday: null,
      },
    },
  );

  // == Mutation
  const onError = useApolloAlertCallback("Mutation failed!");
  const [runMutation, { data }] = useMutation(TestMutationDocument, {
    onCompleted: ({ payload: { model, errors } }) => {
      if (model) {
        showNotification({ message: "Mutation successful!" });
        reset();
      } else {
        invariant(errors, "Missing input errors");
        const formErrors = parseFormErrors(errors);
        setErrors(formErrors);
        showFormErrorsAlert(formErrors, "Couldn't run mutation");
      }
    },
    onError,
  });

  // == Markup
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
          <DatePickerInput label="Birthday" {...getInputProps("birthday")} />
          <Button type="submit">Submit</Button>
          {data && (
            <>
              <Divider />
              <Stack spacing={4}>
                <Text size="sm" weight={600}>
                  Response:
                </Text>
                <Code block>{JSON.stringify(data, undefined, 2)}</Code>
              </Stack>
            </>
          )}
        </Stack>
      </form>
    </Stack>
  );
};

export default TestForm;
