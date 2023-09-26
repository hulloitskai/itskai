import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

import PasswordWithStrengthCheckInput from "./PasswordWithStrengthCheckInput";

export type UserChangePasswordPageFormValues = {
  readonly password: string;
  readonly passwordConfirmation: string;
};

export type UserChangePasswordPageFormProps = {
  readonly resetPasswordToken: string;
};

const UserChangePasswordPageForm: FC<UserChangePasswordPageFormProps> = ({
  resetPasswordToken,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const { getInputProps, reset, isDirty, onSubmit } =
    useForm<UserChangePasswordPageFormValues>({
      initialValues: {
        password: "",
        passwordConfirmation: "",
      },
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
      onSubmit={onSubmit(({ password, passwordConfirmation }) => {
        const data = {
          user: {
            password,
            password_confirmation: passwordConfirmation,
            reset_password_token: resetPasswordToken,
          },
        };
        router.put("/user/password", data, {
          onBefore: () => {
            setLoading(true);
          },
          onFinish: () => {
            reset();
            setLoading(false);
          },
        });
      })}
    >
      <Stack gap="xs">
        <PasswordWithStrengthCheckInput
          label="New Password"
          placeholder="new-password"
          required
          minLength={8}
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <PasswordInput
          label="New Password (confirm)"
          placeholder="new-password"
          required
          minLength={8}
          {...getInputProps("passwordConfirmation")}
        />
        <Button type="submit" disabled={!isDirty()} {...{ loading }}>
          Continue
        </Button>
      </Stack>
    </form>
  );
};

export default UserChangePasswordPageForm;
