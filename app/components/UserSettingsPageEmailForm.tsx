import type { FC } from "react";
import { PasswordInput, Text } from "@mantine/core";

import { UserChangeEmailMutationDocument } from "~/queries";
import type { UserSettingsPageViewerFragment } from "~/queries";

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
  const { email, unconfirmedEmail } = viewer;
  const router = useRouter();

  // == Form
  const initialValues = useMemo<UserSettingsPageEmailFormValues>(
    () => ({
      email: unconfirmedEmail || email,
      currentPassword: "",
    }),
    [viewer],
  );
  const {
    errors,
    getInputProps,
    onSubmit,
    setValues,
    resetDirty,
    setErrors,
    isDirty,
  } = useForm<UserSettingsPageEmailFormValues>({
    initialValues: initialValues,
  });
  useDidUpdate(() => {
    setValues(initialValues);
    resetDirty(initialValues);
  }, [initialValues]);

  // == Mutation
  const onError = useApolloErrorCallback("Failed to change email");
  const [runMutation, { loading }] = useMutation(
    UserChangeEmailMutationDocument,
    {
      onCompleted: ({ payload: { user, errors } }) => {
        if (user) {
          const { unconfirmedEmail } = user;
          router.reload({
            onSuccess: () => {
              if (unconfirmedEmail) {
                showNotice({
                  title: "Confirm your new email address",
                  message:
                    "Please check your email and follow the confirmation " +
                    "link to confirm your new email address.",
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
          setErrors(formErrors(errors));
          showFormErrors("Could not change email");
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
            {...(unconfirmedEmail
              ? {
                  rightSectionWidth: 110,
                  rightSection: (
                    <Badge size="xs" color="yellow.8" variant="outline">
                      Unconfirmed
                    </Badge>
                  ),
                }
              : {})}
          />
          {email && unconfirmedEmail && (
            <Text size="xs" color="dimmed" mt={4}>
              Last confirmed email:{" "}
              <Text color="gray.7" weight={500} span>
                {email}
              </Text>
              <br />
              Check your inbox to confirm your new email address.
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
        <Button
          type="submit"
          disabled={!(isDirty("email") && isDirty("currentPassword"))}
          {...{ loading }}
        >
          Change Email
        </Button>
      </Stack>
    </form>
  );
};

export default UserSettingsPageEmailForm;
