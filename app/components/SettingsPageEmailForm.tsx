import type { User } from "~/types";

import type { ButtonProps } from "@mantine/core";
import { PasswordInput, Text } from "@mantine/core";
import { isEmail, isNotEmpty } from "@mantine/form";

export interface SettingsPageEmailFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SettingsPageEmailForm: FC<SettingsPageEmailFormProps> = ({
  ...otherProps
}) => {
  const user = useAuthenticatedUser();

  // == Form
  const initialValues = useMemo(() => {
    const { email, unconfirmedEmail } = user;
    return {
      email: unconfirmedEmail || email,
      currentPassword: "",
    };
  }, [user]);
  const form = useInertiaForm({
    action: routes.usersRegistrations.update,
    method: "put",
    descriptor: "change email",
    // mode: "uncontrolled",
    initialValues,
    validate: {
      email: isEmail("Email is not valid"),
      currentPassword: isNotEmpty("Current password is required"),
    },
    transformValues: values => ({
      user: deepUnderscoreKeys(values),
    }),
  });
  const { getInputProps, isDirty, submit, processing } = form;
  const currentPasswordFilled = useFieldsFilled(form, "currentPassword");

  // == Conditionally show current password field
  const emailFilled = useFieldsFilled(form, "email");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <Box>
          <TextInput
            {...getInputProps("email")}
            label="Email"
            placeholder="jon.snow@example.com"
            required
            {...(user.unconfirmedEmail
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
          {user.email && user.unconfirmedEmail && (
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
              {...getInputProps("currentPassword")}
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
            disabled={!isDirty() || !emailFilled || !currentPasswordFilled}
            loading={processing}
          >
            Change email
          </Button>
          {user.unconfirmedEmail && (
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

export default SettingsPageEmailForm;

interface ResendEmailVerificationInstructionsButtonProps
  extends Omit<ButtonProps, "children"> {
  readonly user: User;
}

const ResendEmailVerificationInstructionsButton: FC<
  ResendEmailVerificationInstructionsButtonProps
> = ({ user, ...otherProps }) => {
  const { submit, processing } = useInertiaForm({
    action: routes.usersConfirmations.create,
    method: "post",
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
