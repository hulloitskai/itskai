import type { ComponentPropsWithoutRef, FC } from "react";
import { BoxProps, PasswordInput } from "@mantine/core";

import StrongPasswordInput from "./StrongPasswordInput";

export interface ChangePasswordPageFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  resetPasswordToken: string;
}

const ChangePasswordPageForm: FC<ChangePasswordPageFormProps> = ({
  resetPasswordToken,
  ...otherProps
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const { values, getInputProps, isDirty, submit, processing } = useInertiaForm(
    {
      action: routes.usersPasswords.update,
      method: "put",
      descriptor: "change password",
      initialValues: {
        password: "",
        passwordConfirmation: "",
      },
      transformValues: values => ({
        user: {
          ...deepUnderscoreKeys(values),
          reset_password_token: resetPasswordToken,
        },
      }),
      validate: {
        password: () => {
          if (passwordStrength < 1.0) {
            return "Password is too weak";
          }
        },
        passwordConfirmation: (value, { password }) => {
          if (password != value) {
            return "Password confirmation does not match password";
          }
        },
      },
    },
  );
  const requiredFieldsFilled = useRequiredFieldsFilled(
    values,
    "password",
    "passwordConfirmation",
  );

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <StrongPasswordInput
          label="New Password"
          placeholder="ultra-secure-password"
          autoComplete="new-password"
          required
          minLength={8}
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <PasswordInput
          label="New Password (confirm)"
          placeholder="ultra-secure-password"
          autoComplete="new-password"
          required
          minLength={8}
          {...getInputProps("passwordConfirmation")}
        />
        <Button
          type="submit"
          disabled={!isDirty() || !requiredFieldsFilled}
          loading={processing}
        >
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePasswordPageForm;
