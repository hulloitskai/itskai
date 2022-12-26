import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

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
  const initialValues: UserSettingsPagePasswordFormValues = useMemo(
    () => ({
      password: "",
      passwordConfirmation: "",
      currentPassword: "",
    }),
    [],
  );
  const { getInputProps, onSubmit, reset, setErrors, isDirty } =
    useForm<UserSettingsPagePasswordFormValues>({
      initialValues,
    });
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
              reset();
              setErrors(errors);
              showAlert({ message: "Failed to change password." });
            },
            onFinish: () => setLoading(false),
          });
        },
      )}
    >
      <Stack spacing="xs">
        <PasswordInput
          label="New Password"
          placeholder="applesauce"
          required
          minLength={8}
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
              placeholder="potato-123"
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
            )
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
