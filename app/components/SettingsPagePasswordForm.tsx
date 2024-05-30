import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";
import { PasswordInput } from "@mantine/core";

import PasswordWithStrengthCheckInput from "./PasswordWithStrengthCheckInput";

export type SettingsPagePasswordFormValues = {
  password: string;
  passwordConfirmation: string;
  currentPassword: string;
};

export type SettingsPagePasswordFormProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"form">, "children" | "onSubmit">;

const SettingsPagePasswordForm: FC<SettingsPagePasswordFormProps> = ({
  ...otherProps
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const initialValues: SettingsPagePasswordFormValues = useMemo(
    () => ({
      password: "",
      passwordConfirmation: "",
      currentPassword: "",
    }),
    [],
  );
  const {
    getInputProps,
    setFieldValue,
    setErrors,
    isDirty,
    isValid,
    reset,
    onSubmit,
  } = useForm<SettingsPagePasswordFormValues>({
    initialValues,
    validate: {
      password: () => {
        if (passwordStrength < 1.0) {
          return "Too weak";
        }
      },
      passwordConfirmation: (value, { password }) => {
        if (password != value) {
          return "Does not match password";
        }
      },
    },
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit(
        ({ password, passwordConfirmation, currentPassword }) => {
          const data = {
            user: {
              password,
              password_confirmation: passwordConfirmation,
              current_password: currentPassword,
            },
          };
          router.put("/settings", data, {
            errorBag: SettingsPagePasswordForm.name,
            preserveScroll: true,
            onBefore: () => setLoading(true),
            onSuccess: () => {
              reset();
              showNotice({ message: "Password changed successfully." });
            },
            onError: errors => {
              if (
                ["password", "passwordConfirmation"].some(key => key in errors)
              ) {
                reset();
              } else {
                setFieldValue("currentPassword", "");
              }
              setErrors(errors);
              showFormErrorsAlert(errors, "Couldn't change password");
            },
            onFinish: () => setLoading(false),
          });
        },
      )}
      {...otherProps}
    >
      <Stack gap="xs">
        <PasswordWithStrengthCheckInput
          label="New password"
          placeholder="applesauce"
          required
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <PasswordInput
          label="New password (confirm)"
          placeholder="applesauce"
          required
          minLength={8}
          {...getInputProps("passwordConfirmation")}
        />
        <Transition
          transition="fade"
          mounted={isDirty("password") && isDirty("passwordConfirmation")}
        >
          {style => (
            <PasswordInput
              label="Current password"
              description="Please confirm your current password to make changes."
              placeholder="password"
              required
              {...{ style }}
              {...getInputProps("currentPassword")}
            />
          )}
        </Transition>
        <Button
          type="submit"
          disabled={
            !(
              isDirty("password") &&
              isDirty("passwordConfirmation") &&
              isDirty("currentPassword")
            ) || !isValid()
          }
          {...{ loading }}
        >
          Change Password
        </Button>
      </Stack>
    </Box>
  );
};

export default SettingsPagePasswordForm;
