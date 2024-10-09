import { isEmail } from "@mantine/form";

export interface RequestPasswordResetPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const RequestPasswordResetPageForm: FC<RequestPasswordResetPageFormProps> = ({
  ...otherProps
}) => {
  const { values, getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersPasswords.create,
    descriptor: "request password reset",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Email is not valid"),
    },
    transformValues: attributes => ({ user: attributes }),
  });
  const filled = useFieldsFilled(values);

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("email")}
          label="Email"
          placeholder="jon.snow@example.com"
          required
          withAsterisk={false}
        />
        <Button type="submit" disabled={!filled} loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestPasswordResetPageForm;
