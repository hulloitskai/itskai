import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

import StrongPasswordInput from "./StrongPasswordInput";

export interface SettingsPagePasswordFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SettingsPagePasswordForm: FC<SettingsPagePasswordFormProps> = ({
  ...otherProps
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const { values, getInputProps, isDirty, submit, processing } = useInertiaForm(
    {
      action: routes.usersRegistrations.update,
      method: "put",
      descriptor: "change password",
      initialValues: {
        password: "",
        passwordConfirmation: "",
        currentPassword: "",
      },
      transformValues: values => ({
        user: deepUnderscoreKeys(values),
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
    "currentPassword",
  );

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <StrongPasswordInput
          label="New password"
          placeholder="ultra-secure-password"
          autoComplete="new-password"
          required
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <PasswordInput
          label="New password (confirm)"
          placeholder="ultra-secure-password"
          autoComplete="new-password"
          required
          minLength={8}
          {...getInputProps("passwordConfirmation")}
        />
        <Transition
          transition="fade"
          mounted={!!(values.password && values.passwordConfirmation)}
        >
          {style => (
            <PasswordInput
              label="Current password"
              description="Please confirm your current password to make changes."
              placeholder="password"
              autoComplete="current-password"
              required
              {...{ style }}
              {...getInputProps("currentPassword")}
            />
          )}
        </Transition>
        <Button
          type="submit"
          disabled={!isDirty() || !requiredFieldsFilled}
          loading={processing}
        >
          Change Password
        </Button>
      </Stack>
    </Box>
  );
};

export default SettingsPagePasswordForm;
