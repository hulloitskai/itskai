import { isEmail, isNotEmpty } from "@mantine/form";

import StrongPasswordInput from "./StrongPasswordInput";

export interface SignupPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SignupPageForm: FC<SignupPageFormProps> = props => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);
  const { values, getInputProps, processing, submit } = useInertiaForm({
    action: routes.usersRegistrations.create,
    method: "post",
    descriptor: "sign up",
    initialValues: {
      name: "",
      email: "",
      password: "",
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
    },
    transformValues: attributes => ({ user: attributes }),
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
  });
  const filled = useFieldsFilled(values);

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
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
          onStrengthCheck={setPasswordStrength}
        />
        <Button type="submit" disabled={!filled} loading={processing}>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupPageForm;
