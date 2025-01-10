import { PasswordInput } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";

export interface LoginPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const LoginPageForm: FC<LoginPageFormProps> = props => {
  // == Form
  const { values, getInputProps, submitting, submit } = useInertiaForm({
    action: routes.usersSessions.create,
    descriptor: "sign in",
    initialValues: {
      email: "",
      password: "",
      remember_me: true,
    },
    validate: {
      email: isEmail("Email is invalid"),
      password: isNotEmpty("Password is required"),
    },
    transformValues: values => ({
      user: values,
    }),
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
  });
  const filled = useFieldsFilled(values, "email", "password");

  return (
    <Box component="form" onSubmit={submit} {...props}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("email")}
          type="email"
          label="Email"
          placeholder="jon.snow@example.com"
          autoComplete="email"
          required
          withAsterisk={false}
          autoFocus
        />
        <PasswordInput
          {...getInputProps("password")}
          label="Password"
          placeholder="secret-passphrase"
          autoComplete="current-password"
          required
          withAsterisk={false}
        />
        <Tooltip
          label="Uncheck this if you're signing in from a shared device."
          position="top-start"
          withArrow
        >
          <Checkbox
            {...getInputProps("remember_me", { type: "checkbox" })}
            label="Stay signed in"
          />
        </Tooltip>
        <Button type="submit" disabled={!filled} loading={submitting}>
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPageForm;
