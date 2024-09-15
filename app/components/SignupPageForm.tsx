import { PasswordInput } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";

import StrongPasswordInput from "./StrongPasswordInput";

export interface SignupPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SignupPageForm: FC<SignupPageFormProps> = props => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);
  const { getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersRegistrations.create,
    method: "post",
    descriptor: "sign up",
    // mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isEmail("Email is not valid"),
      password: value => {
        if (!value) {
          return "Password is required";
        }
        if (passwordStrength < 1.0) {
          return "Password is too weak";
        }
      },
      passwordConfirmation: (value, { password }) => {
        if (value !== password) {
          return "Password confirmation does not match password";
        }
      },
    },
    transformValues: values => ({
      user: {
        ...deepUnderscoreKeys(values),
      },
    }),
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
      setFieldValue("passwordConfirmation", "");
    },
  });
  return (
    <Box component="form" onSubmit={submit} {...props}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("name")}
          label="Name"
          placeholder="Jon Snow"
          autoComplete="name"
          required
        />
        <TextInput
          {...getInputProps("email")}
          type="email"
          label="Email"
          placeholder="jon.snow@example.com"
          autoComplete="email"
          required
        />
        <StrongPasswordInput
          {...getInputProps("password")}
          label="Password"
          placeholder="secret-passphrase"
          autoComplete="new-password"
          required
          onStrengthCheck={setPasswordStrength}
        />
        <PasswordInput
          {...getInputProps("passwordConfirmation")}
          label="Password confirmation"
          placeholder="secret-passphrase"
          autoComplete="new-password"
          required
        />
        <Button type="submit" loading={processing}>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupPageForm;
