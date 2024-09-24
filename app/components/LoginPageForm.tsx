import { PasswordInput } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";

export interface LoginPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const LoginPageForm: FC<LoginPageFormProps> = props => {
  // == Form
  const { getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersSessions.create,
    method: "post",
    descriptor: "sign in",
    // mode: "uncontrolled",
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validate: {
      email: isEmail("Email is invalid"),
      password: isNotEmpty("Password is required"),
    },
    transformValues: values => ({
      user: underscoreKeys(values),
    }),
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
  });

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
            {...getInputProps("rememberMe", { type: "checkbox" })}
            label="Stay signed in"
            styles={{
              input: {
                cursor: "pointer",
              },
              label: {
                cursor: "pointer",
              },
            }}
          />
        </Tooltip>
        <Button type="submit" loading={processing}>
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginPageForm;
