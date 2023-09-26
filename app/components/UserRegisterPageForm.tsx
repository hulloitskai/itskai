import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

import PasswordWithStrengthCheckInput from "./PasswordWithStrengthCheckInput";

export type UserRegisterPageFormProps = {};

export type UserRegisterPageFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

const UserRegisterPageForm: FC<UserRegisterPageFormProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const initialValues = useMemo<UserRegisterPageFormValues>(
    () => ({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    }),
    [],
  );
  const { getInputProps, setFieldValue, setErrors, isDirty, onSubmit } =
    useForm<UserRegisterPageFormValues>({
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

  // == Markup
  return (
    <form
      onSubmit={onSubmit(({ name, email, password, passwordConfirmation }) => {
        const data = {
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        };
        router.post("/user", data, {
          errorBag: UserRegisterPageForm.name,
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
    </form>
  );
};

export default UserRegisterPageForm;
