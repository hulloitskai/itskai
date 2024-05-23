import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

import PasswordWithStrengthCheckInput from "./PasswordWithStrengthCheckInput";

export type SignupPageFormProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"form">, "children" | "onSubmit">;

type SignupFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

const SignupPageForm: FC<SignupPageFormProps> = props => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const initialValues = useMemo<SignupFormValues>(
    () => ({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    }),
    [],
  );
  const { getInputProps, setFieldValue, setErrors, isDirty, onSubmit } =
    useForm<SignupFormValues>({
      initialValues,
      validate: {
        password: () => {
          if (passwordStrength < 1.0) {
            return "Too weak.";
          }
        },
        passwordConfirmation: (value, { password }) => {
          if (password != value) {
            return "Does not match password.";
          }
        },
      },
    });

  return (
    <Box
      component="form"
      onSubmit={onSubmit(({ name, email, password, passwordConfirmation }) => {
        const data = {
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        };
        router.post("/signup", data, {
          errorBag: SignupPageForm.name,
          onBefore: () => setLoading(true),
          onError: errors => {
            setFieldValue("password", "");
            setFieldValue("passwordConfirmation", "");
            setErrors(errors);
            showFormErrorsAlert(errors, "Registration failed");
          },
          onFinish: () => setLoading(false),
        });
      })}
      {...props}
    >
      <Stack gap="xs">
        <TextInput
          label="Name"
          placeholder="Kai's Friend"
          required
          {...getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder="friend@example.com"
          required
          {...getInputProps("email")}
        />
        <PasswordWithStrengthCheckInput
          label="Password"
          placeholder="potato-123"
          required
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <PasswordInput
          label="Password Confirmation"
          placeholder="potato-123"
          required
          {...getInputProps("passwordConfirmation")}
        />
        <Button type="submit" disabled={!isDirty()} {...{ loading }}>
          Sign up
        </Button>
      </Stack>
    </Box>
  );
};

export default SignupPageForm;
