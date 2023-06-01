import type { FC } from "react";

import { PasswordInput, Text } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";

import {
  UpdateUserEmailMutationDocument,
  SendUserEmailVerificationInstructionsMutationDocument,
} from "~/helpers/graphql";
import type { UserSettingsPageViewerFragment } from "~/helpers/graphql";

export type UserSettingsPageEmailFormValues = {
  readonly email: string;
  readonly currentPassword: string;
};

export type UserSettingsPageEmailFormProps = {
  readonly viewer: UserSettingsPageViewerFragment;
};

const UserSettingsPageEmailForm: FC<UserSettingsPageEmailFormProps> = ({
  viewer,
}) => {
  const { email, unverifiedEmail } = viewer;
  const router = useRouter();

  // == Form
  const initialValues = useMemo<UserSettingsPageEmailFormValues>(
    () => ({
      email: unverifiedEmail || email,
      currentPassword: "",
    }),
    [viewer],
  );
  const {
    errors,
    getInputProps,
    onSubmit,
    setValues,
    setErrors,
    isDirty,
    resetDirty,
  } = useForm<UserSettingsPageEmailFormValues>({
    initialValues: initialValues,
  });
  useDidUpdate(() => {
    setValues(initialValues);
    resetDirty(initialValues);
  }, [initialValues]);

  // == Mutation
  const onError = useApolloAlertCallback("Failed to change email");
  const [runMutation, { loading }] = useMutation(
    UpdateUserEmailMutationDocument,
    {
      onCompleted: ({ payload: { user, errors } }) => {
        if (user) {
          const { unverifiedEmail } = user;
          router.reload({
            onSuccess: () => {
              if (unverifiedEmail) {
                showNotice({
                  title: "Email verification required",
                  message:
                    "Please check your email and follow the link to " +
                    "verify your new email address.",
                });
              } else {
                showNotice({
                  message: "Email change request has been cancelled.",
                });
              }
            },
          });
        } else {
          invariant(errors, "Missing input errors");
          const formErrors = parseFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Could not change email");
        }
      },
      onError,
    },
  );

  // == Markup
  return (
    <form
      onSubmit={onSubmit(({ email, currentPassword }) => {
        runMutation({
          variables: {
            input: {
              email,
              currentPassword,
            },
          },
        });
      })}
    >
      <Stack spacing="xs">
        <Box>
          <TextInput
            label="Email"
            placeholder="friend@example.com"
            required
            {...getInputProps("email")}
            {...(unverifiedEmail
              ? {
                  rightSectionWidth: 110,
                  rightSection: (
                    <Badge size="xs" variant="outline" color="yellow.8">
                      Unverified
                    </Badge>
                  ),
                }
              : {})}
          />
          {email && unverifiedEmail && (
            <Text size="xs" color="dimmed" mt={4}>
              Last verified email:{" "}
              <Text color="gray.7" weight={500} span>
                {email}
              </Text>
              <br />
              Check your inbox for a link to verify your new email address.
            </Text>
          )}
        </Box>
        <Transition
          transition="fade"
          mounted={!isEmpty(errors) || isDirty("email")}
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
        <Stack spacing={6}>
          <Button
            type="submit"
            disabled={!(isDirty("email") && isDirty("currentPassword"))}
            {...{ loading }}
          >
            Change Email
          </Button>
          {unverifiedEmail && (
            <ResendEmailVerificationInstructionsButton
              variant="outline"
              {...{ viewer }}
            />
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default UserSettingsPageEmailForm;

export type ResendEmailVerificationInstructionsButtonprops = Omit<
  ButtonProps,
  "children"
> & {
  readonly viewer: UserSettingsPageViewerFragment;
};

const ResendEmailVerificationInstructionsButton: FC<
  ResendEmailVerificationInstructionsButtonprops
> = ({ viewer: { email }, ...otherProps }) => {
  const onError = useApolloAlertCallback(
    "Failed to re-send verification email",
  );
  const [runMutation, { loading }] = useMutation(
    SendUserEmailVerificationInstructionsMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          title: "Verification email re-sent",
          message:
            "Please check your email and follow the link to verify your " +
            "new email address.",
        });
      },
      onError,
    },
  );
  return (
    <Button
      onClick={() => {
        runMutation({
          variables: {
            input: {
              email,
            },
          },
        });
      }}
      {...{ loading }}
      {...otherProps}
    >
      Resend Verification Email
    </Button>
  );
};
