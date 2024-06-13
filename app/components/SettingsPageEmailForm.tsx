import type { ComponentPropsWithoutRef, FC } from "react";
import type { User } from "~/types";

import type { BoxProps, ButtonProps } from "@mantine/core";
import { PasswordInput, Text } from "@mantine/core";

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
  const { values, errors, getInputProps, isDirty, submit, processing } =
    useInertiaForm({
      action: routes.usersRegistrations.update,
      method: "put",
      descriptor: "change email",
      // onSuccess: ({ props }) => {
      //   const { user } = props as SettingsPageProps;
      //   if (user.unverifiedEmail) {
      //     showNotice({
      //       title: "Email verification required",
      //       message:
      //         "Please check your email and follow the link to verify your new " +
      //         "email address.",
      //     });
      //   } else {
      //     showNotice({
      //       message: "Email change request has been cancelled.",
      //     });
      //   }
      // },
      initialValues,
      transformValues: values => ({
        user: deepUnderscoreKeys(values),
      }),
    });
  const requiredFieldsFilled = useRequiredFieldsFilled(
    values,
    "email",
    "current_password",
  );
  // useDidUpdate(() => {
  //   setValues(initialValues);
  //   resetDirty(initialValues);
  // }, [initialValues]);

  // const [updateEmail, { loading: updatingEmail }] = useMutation(
  //   UpdateUserEmailMutationDocument,
  //   {
  //     onCompleted: ({ payload: { user, errors } }) => {
  //       if (user) {
  //         const { unverifiedEmail } = user;
  //         router.reload({
  //           onSuccess: () => {
  //             if (unverifiedEmail) {
  //               showNotice({
  //                 title: "Email verification required",
  //                 message:
  //                   "Please check your email and follow the link to " +
  //                   "verify your new email address.",
  //               });
  //             } else {
  //             }
  //           },
  //         });
  //       } else {
  //         invariant(errors, "Missing input errors");
  //         const formErrors = buildFormErrors(errors);
  //         setErrors(formErrors);
  //         showFormErrorsAlert(formErrors, "Couldn't change email");
  //       }
  //     },
  //     onError: onUpdateEmailError,
  //   },
  // );

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <Box>
          <TextInput
            label="Email"
            placeholder="jon.snow@example.com"
            required
            {...getInputProps("email")}
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
        <Transition
          transition="fade"
          mounted={!isEmpty(errors) || (isDirty("email") && !!values.email)}
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
        <Stack gap={6}>
          <Button
            type="submit"
            disabled={!isDirty("email") || !requiredFieldsFilled}
            loading={processing}
          >
            Change Email
          </Button>
          <Transition
            transition="fade"
            mounted={!!user.unconfirmedEmail && !isDirty("email")}
          >
            {style => (
              <ResendEmailVerificationInstructionsButton
                variant="outline"
                {...{ user, style }}
              />
            )}
          </Transition>
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
