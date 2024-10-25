import { PasswordInput } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";

import StrongPasswordInput from "./StrongPasswordInput";

export interface AccountPagePasswordFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const AccountPagePasswordForm: FC<AccountPagePasswordFormProps> = ({
  ...otherProps
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const { values, getInputProps, isDirty, processing, submit } = useInertiaForm(
    {
      action: routes.usersRegistrations.changePassword,
      descriptor: "change password",
      initialValues: {
        password: "",
        current_password: "",
      },
      transformValues: attributes => ({
        user: attributes,
      }),
      validate: {
        password: value => {
          if (!value) {
            return "Password is required";
          }
          if (passwordStrength < 1.0) {
            return "Password is too weak";
          }
        },
        current_password: isNotEmpty("Current password is required"),
      },
      onSuccess: () => {
        toast.success("Password changed successfully.");
      },
    },
  );
  const currentPasswordFilled = useFieldsFilled(values, "current_password");
  const passwordFieldsFilled = useFieldsFilled(values, "password");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <StrongPasswordInput
          label="New password"
          placeholder="paS$w0rD"
          autoComplete="new-password"
          required
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <Transition
          transition="fade"
          mounted={isDirty("password") && passwordFieldsFilled}
        >
          {style => (
            <PasswordInput
              {...getInputProps("current_password")}
              label="Current password"
              description="Please confirm your current password to make changes."
              placeholder="password"
              autoComplete="current-password"
              required
              {...{ style }}
            />
          )}
        </Transition>
        <Button
          type="submit"
          disabled={
            !isDirty("password") ||
            !passwordFieldsFilled ||
            !currentPasswordFilled
          }
          loading={processing}
        >
          Change password
        </Button>
      </Stack>
    </Box>
  );
};

export default AccountPagePasswordForm;
