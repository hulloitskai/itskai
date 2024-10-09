import { type ButtonProps } from "@mantine/core";
import { PasswordInput, Text } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";

import { type User } from "~/types";

export interface AccountPageEmailFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onEmailChanged: () => void;
}

const AccountPageEmailForm: FC<AccountPageEmailFormProps> = ({
  onEmailChanged,
  ...otherProps
}) => {
  const user = useAuthenticatedUser();

  // == Form
  const initialValues = useMemo(() => {
    const { email, unconfirmed_email } = user;
    return {
      email: unconfirmed_email || email,
      current_password: "",
    };
  }, [user]);
  interface FormData {
    user: User;
    emailNeedsConfirmation: boolean;
  }
  const {
    values,
    getInputProps,
    isDirty,
    processing,
    submit,
    reset,
    setInitialValues,
  } = useFetchForm({
    action: routes.usersRegistrations.changeEmail,
    descriptor: "change email",
    initialValues,
    validate: {
      email: isEmail("Email is not valid"),
      current_password: isNotEmpty("Current password is required"),
    },
    transformValues: attributes => ({
      user: attributes,
    }),
    onSuccess: (
      { user, emailNeedsConfirmation }: FormData,
      { setInitialValues },
    ) => {
      setInitialValues({
        email: user.unconfirmed_email || user.email,
        current_password: "",
      });
      if (emailNeedsConfirmation) {
        showNotice({
          title: "Email verification required",
          message:
            "Please check your email and follow the verification link to " +
            "verify your new email address.",
        });
      } else {
        showChangesSavedNotice({ to: "your email" });
      }
      onEmailChanged();
    },
  });
  useDidUpdate(() => {
    setInitialValues(initialValues);
    reset();
  }, [user]);
  const currentPasswordFilled = useFieldsFilled(values, "current_password");
  const emailFilled = useFieldsFilled(values, "email");
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <Box>
          <TextInput
            {...getInputProps("email")}
            label="Email"
            placeholder="jon.snow@example.com"
            required
            {...(user.unconfirmed_email
              ? {
                  rightSectionWidth: 80,
                  rightSection: (
                    <Badge size="xs" variant="outline" color="orange">
                      Unverified
                    </Badge>
                  ),
                }
              : {})}
          />
          {user.email && user.unconfirmed_email && (
            <Text size="xs" c="dimmed" mt={4}>
              Last verified email:{" "}
              <Text c="gray" fw={500} span>
                {user.email}
              </Text>
              <br />
              Check your inbox for a link to verify your new email address.
            </Text>
          )}
        </Box>
        <Transition transition="fade" mounted={emailFilled && isDirty("email")}>
          {style => (
            <PasswordInput
              {...getInputProps("current_password")}
              label="Current password"
              description="Please confirm your current password to make changes."
              placeholder="password"
              required
              {...{ style }}
            />
          )}
        </Transition>
        <Stack gap={6}>
          <Button
            type="submit"
            disabled={
              !isDirty("email") || !emailFilled || !currentPasswordFilled
            }
            loading={processing}
          >
            Change email
          </Button>
          {user.unconfirmed_email && (
            <ResendEmailVerificationInstructionsButton
              variant="outline"
              {...{ user }}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AccountPageEmailForm;

interface ResendEmailVerificationInstructionsButtonProps
  extends Omit<ButtonProps, "children"> {
  user: User;
}

const ResendEmailVerificationInstructionsButton: FC<
  ResendEmailVerificationInstructionsButtonProps
> = ({ user, ...otherProps }) => {
  const { processing, submit } = useInertiaForm({
    action: routes.usersConfirmations.create,
    descriptor: "resend verification email",
    initialValues: {
      user: {
        email: user.email,
      },
      redirect_url: routes.usersRegistrations.edit.path(),
    },
  });
  return (
    <Button
      loading={processing}
      onClick={() => {
        submit();
      }}
      {...otherProps}
    >
      Resend verification email
    </Button>
  );
};
