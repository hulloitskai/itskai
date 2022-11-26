import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type AccountEditPagePasswordFormValues = {
  readonly password: string;
  readonly passwordConfirmation: string;
  readonly currentPassword: string;
};

export type AccountEditPagePasswordFormProps = {};

const AccountEditPagePasswordForm: FC<
  AccountEditPagePasswordFormProps
> = () => {
  const router = useRouter();
  const initialValues: AccountEditPagePasswordFormValues = useMemo(
    () => ({
      password: "",
      passwordConfirmation: "",
      currentPassword: "",
    }),
    [],
  );
  const { getInputProps, onSubmit, reset, setErrors } =
    useForm<AccountEditPagePasswordFormValues>({ initialValues });
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
          router.put("/account", data, {
            errorBag: "AccountPasswordForm",
            preserveScroll: true,
            onSuccess: () => {
              reset();
              showNotice({
                message: "You've updated your account password.",
              });
            },
            onError: errors => {
              reset();
              setErrors(errors);
            },
          });
        },
      )}
    >
      <Stack spacing="xs">
        <PasswordInput
          label="New Password"
          placeholder="applesauce"
          required
          {...getInputProps("password")}
        />
        <PasswordInput
          label="New Password (confirm)"
          placeholder="applesauce"
          required
          {...getInputProps("passwordConfirmation")}
        />
        <PasswordInput
          label="Current Password"
          placeholder="potato-123"
          required
          {...getInputProps("currentPassword")}
        />
        <Button type="submit">Change Password</Button>
      </Stack>
    </form>
  );
};

export default AccountEditPagePasswordForm;
