import { isEmail, isNotEmpty } from "@mantine/form";

import StrongPasswordInput from "./StrongPasswordInput";

export interface SignupPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SignupPageForm: FC<SignupPageFormProps> = props => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const { values, getInputProps, submitting, submit } = useForm({
    action: routes.usersRegistrations.create,
    descriptor: "sign up",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: isNotEmpty("name is required"),
      email: isEmail("invalid email address"),
      password: (value: string) => {
        if (!value) {
          return "password is required";
        }
        if (passwordStrength < 1.0) {
          return "password is too weak";
        }
      },
    },
    transformValues: attributes => ({ user: attributes }),
    onError: ({ setFieldValue }) => {
      setFieldValue("password", "");
    },
    onSuccess: () => {
      router.visit(routes.home.show.path());
    },
  });
  const filled = useFieldsFilled(values);

  return (
    <Box component="form" onSubmit={submit} {...props}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("name")}
          label="name"
          placeholder="Jon Snow"
          autoComplete="name"
          required
        />
        <TextInput
          {...getInputProps("email")}
          type="email"
          label="email"
          placeholder="jon.snow@example.com"
          autoComplete="email"
          required
        />
        <StrongPasswordInput
          {...getInputProps("password")}
          label="password"
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
          onStrengthCheck={strength => {
            startTransition(() => {
              setPasswordStrength(strength);
            });
          }}
        />
        <Button type="submit" disabled={!filled} loading={submitting}>
          sign up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupPageForm;
