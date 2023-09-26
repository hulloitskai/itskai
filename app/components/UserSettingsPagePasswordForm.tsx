import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

import PasswordWithStrengthCheckInput from "./PasswordWithStrengthCheckInput";

export type UserSettingsPagePasswordFormValues = {
  readonly password: string;
  readonly passwordConfirmation: string;
  readonly currentPassword: string;
};

export type UserSettingsPagePasswordFormProps = {};

const UserSettingsPagePasswordForm: FC<
  UserSettingsPagePasswordFormProps
> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const initialValues: UserSettingsPagePasswordFormValues = useMemo(
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
  } = useForm<UserSettingsPagePasswordFormValues>({
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

  // == Markup
  return (
    <form
      onSubmit={onSubmit(
        ({ password, passwordConfirmation, currentPassword }) => {
          const data = {
            user: {
              password,
              password_confirmation: passwordConfirmation,
              current_password: currentPassword,
            },
          };
          router.put("/user", data, {
            errorBag: UserSettingsPagePasswordForm.name,
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
    >
      <Stack gap="xs">
        <PasswordWithStrengthCheckInput
          label="Password"
          placeholder="applesauce"
          required
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <PasswordInput
          label="New Password (confirm)"
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
              label="Current Password"
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
    </form>
  );
};

export default UserSettingsPagePasswordForm;
