import { isEmail } from "@mantine/form";

export interface RequestPasswordResetPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const RequestPasswordResetPageForm: FC<RequestPasswordResetPageFormProps> = ({
  ...otherProps
}) => {
  const { getInputProps, submit, processing } = useInertiaForm({
    action: routes.usersPasswords.create,
    method: "post",
    descriptor: "request password reset",
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Email is not valid"),
    },
    transformValues: values => ({
      user: deepUnderscoreKeys(values),
    }),
  });
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("email")}
          label="Email"
          placeholder="jon.snow@example.com"
          required
        />
        <Button type="submit" loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default RequestPasswordResetPageForm;
