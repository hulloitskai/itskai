import type { ComponentPropsWithoutRef, FC } from "react";

import { PasswordInput, Text } from "@mantine/core";
import type { BoxProps, ButtonProps } from "@mantine/core";

import type { SettingsPageViewerFragment } from "~/helpers/graphql";
import {
  RequestEmailVerificationMutationDocument,
  UpdateUserEmailMutationDocument,
} from "~/helpers/graphql";

export type SettingsPageEmailFormProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"form">, "children" | "onSubmit"> & {
    readonly viewer: SettingsPageViewerFragment;
  };

type SettingsPageEmailFormValues = {
  readonly email: string;
  readonly currentPassword: string;
};

const SettingsPageEmailForm: FC<SettingsPageEmailFormProps> = ({
  viewer,
  ...otherProps
}) => {
  const router = useRouter();
  const { email, unverifiedEmail } = viewer;

  // == Form
  const initialValues = useMemo<SettingsPageEmailFormValues>(() => {
    const { email, unverifiedEmail } = viewer;
    return {
      email: unverifiedEmail || email,
      currentPassword: "",
    };
  }, [viewer]);
  const {
    errors,
    getInputProps,
    onSubmit,
    setValues,
    setErrors,
    isDirty,
    resetDirty,
  } = useForm<SettingsPageEmailFormValues>({
    initialValues: initialValues,
  });
  useDidUpdate(() => {
    setValues(initialValues);
    resetDirty(initialValues);
  }, [initialValues]);

  // == Email Update
  const onUpdateEmailError = useApolloAlertCallback(
    "Failed to update email address",
  );
  const [updateEmail, { loading: updatingEmail }] = useMutation(
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
          const formErrors = buildFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Couldn't change email");
        }
      },
      onError: onUpdateEmailError,
    },
  );

  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        updateEmail({
          variables: {
            input: {
              userId: viewer.id,
              ...values,
            },
          },
        });
      })}
      {...otherProps}
    >
      <Stack gap="xs">
        <Box>
          <TextInput
            label="Email"
            placeholder="friend@example.com"
            required
            {...getInputProps("email")}
            {...(unverifiedEmail
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
          {email && unverifiedEmail && (
            <Text size="xs" c="dimmed" mt={4}>
              Last verified email:{" "}
              <Text c="gray" fw={500} span>
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
        <Stack gap={6}>
          <Button
            type="submit"
            disabled={!(isDirty("email") && isDirty("currentPassword"))}
            loading={updatingEmail}
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
    </Box>
  );
};

export default SettingsPageEmailForm;

export type ResendEmailVerificationInstructionsButtonprops = Omit<
  ButtonProps,
  "children"
> & {
  readonly viewer: SettingsPageViewerFragment;
};

const ResendEmailVerificationInstructionsButton: FC<
  ResendEmailVerificationInstructionsButtonprops
> = ({ viewer: { email }, ...otherProps }) => {
  // == Email Request
  const onRequestEmailError = useApolloAlertCallback(
    "Failed to re-send verification email",
  );
  const [requestEmail, { loading: requestingEmail }] = useMutation(
    RequestEmailVerificationMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          title: "Verification email re-sent",
          message:
            "Please check your email and follow the link to verify your " +
            "new email address.",
        });
      },
      onError: onRequestEmailError,
    },
  );

  return (
    <Button
      onClick={() => {
        requestEmail({
          variables: {
            input: {
              email,
            },
          },
        });
      }}
      {...{ loading: requestingEmail }}
      {...otherProps}
    >
      Resend Verification Email
    </Button>
  );
};
