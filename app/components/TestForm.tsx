import { Code, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

import "@mantine/dates/styles.layer.css";

const TestForm: FC = () => {
  // == Form
  const { data, getInputProps, submit, submitting } = useForm({
    name: "test-form",
    action: routes.test.submit,
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
      <Title order={3}>Test form</Title>
      <Box component="form" onSubmit={submit}>
        <Stack gap="xs">
          <TextInput
            {...getInputProps("name")}
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
          />
          <DatePickerInput {...getInputProps("birthday")} label="Birthday" />
          <Button type="submit" loading={submitting}>
            Submit
          </Button>
          {data && (
            <>
              <Divider />
              <Stack gap={4}>
                <Text size="sm" fw={600}>
                  Response:
                </Text>
                <Code block>{formatJSON(data)}</Code>
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </Stack>
  );
};

export default TestForm;
