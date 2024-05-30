import type { FC } from "react";

import { Code, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import { TestMutationMutationDocument } from "~/helpers/graphql";

import "@mantine/dates/styles.layer.css";

export type TestFormValues = {
  name: string;
  birthday: string | null;
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

  // == Mutating
  const onMutateError = useApolloAlertCallback("Mutation failed");
  const [mutate, { data }] = useMutation(TestMutationMutationDocument, {
    onCompleted: ({ payload: { model, errors } }) => {
      if (model) {
        showNotification({ message: "Mutation successful." });
        reset();
      } else {
        invariant(errors, "Missing input errors");
        const formErrors = buildFormErrors(errors);
        setErrors(formErrors);
        showFormErrorsAlert(formErrors, "Couldn't run mutation");
      }
    },
    onError: onMutateError,
  });

  return (
    <Stack gap="xs">
      <Title order={4}>Test Form</Title>
      <form
        onSubmit={onSubmit(({ name, birthday }) => {
          mutate({
            variables: {
              input: {
                name,
                birthday,
              },
            },
          });
        })}
      >
        <Stack gap="xs">
          <TextInput
            label="Name"
            description={
              <>
                The only accepted value is:{" "}
                <Text span inherit style={{ textTransform: "none" }}>
                  George
                </Text>
              </>
            }
            required
            {...getInputProps("name")}
          />
          <DatePickerInput label="Birthday" {...getInputProps("birthday")} />
          <Button type="submit">Submit</Button>
          {data && (
            <>
              <Divider />
              <Stack gap={4}>
                <Text size="sm" fw={600}>
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
