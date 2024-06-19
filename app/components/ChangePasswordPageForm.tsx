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
  const { getInputProps, submit, processing } = useInertiaForm({
    action: routes.usersPasswords.update,
    method: "put",
    descriptor: "change password",
    mode: "uncontrolled",
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validate: {
      password: value => {
        if (!value) {
          return "Password is required";
        }
        if (passwordStrength < 1.0) {
          return "Password is too weak";
        }
      },
      passwordConfirmation: (value, { password }) => {
        if (!value) {
          return "Password confirmation is required";
        }
        if (value !== password) {
          return "Password confirmation does not match password";
        }
      },
    },
    transformValues: values => ({
      user: {
        ...deepUnderscoreKeys(values),
        reset_password_token: resetPasswordToken,
      },
    }),
  });

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <StrongPasswordInput
          {...getInputProps("password")}
          label="New password"
          placeholder="ultra-secure-password"
          autoComplete="new-password"
          required
          minLength={8}
          onStrengthCheck={setPasswordStrength}
        />
        <PasswordInput
          {...getInputProps("passwordConfirmation")}
          label="New password (confirm)"
          placeholder="ultra-secure-password"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <Button type="submit" loading={processing}>
          Continue
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePasswordPageForm;
