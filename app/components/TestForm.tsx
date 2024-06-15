import type { FC } from "react";

import { Code, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import "@mantine/dates/styles.layer.css";

const TestForm: FC = () => {
  // == Form
  const { data, getInputProps, submit, processing } = useFetchForm({
    action: routes.test.submit,
    method: "post",
    descriptor: "submit test form",
    initialValues: {
      name: "",
      birthday: null as string | null,
    },
    transformValues: values => ({
      model: values,
    }),
  });

  return (
    <Stack gap="xs">
      <Title order={3}>Test Form</Title>
      <Box component="form" onSubmit={submit}>
        <Stack gap="xs">
          <TextInput
            label="Name"
            description={
              <>
                The only server-permitted value is:{" "}
                <Text span inherit style={{ textTransform: "none" }}>
                  George
                </Text>
              </>
            }
            required
            {...getInputProps("name")}
          />
          <DatePickerInput label="Birthday" {...getInputProps("birthday")} />
          <Button type="submit" loading={processing}>
            Submit
          </Button>
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
      </Box>
    </Stack>
  );
};

export default TestForm;
