import { PasswordInput } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";

import { handleNonInertiaDocumentResponse } from "~/helpers/inertia";
import { type User } from "~/types";

export interface LoginPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const LoginPageForm: FC<LoginPageFormProps> = props => {
  // == Form
  const { values, getInputProps, submitting, submit } = useForm({
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
    onFailure: (error, { setFieldValue }) => {
      setFieldValue("password", "");
    },
    onSuccess: ({ user, redirectUrl }: { user: User; redirectUrl: string }) => {
      toast.success(<>Welcome back, {user.name} :)</>);
      const removeHandler = handleNonInertiaDocumentResponse();
      router.visit(redirectUrl, {
        onFinish: () => {
          removeHandler();
        },
      });
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
