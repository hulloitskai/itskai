import type { FC } from "react";
import { JsonInput, PasswordInput, Text } from "@mantine/core";

import {
  ICloudCredentialsRemoveMutationDocument,
  ICloudCredentialsUpdateMutationDocument,
  ICloudCredentialsVerifySecurityCodeMutationDocument,
} from "~/queries";
import type { UserSettingsPageICloudCredentialsFragment } from "~/queries";
import type { Maybe } from "~/queries";

export type UserSettingsPageICloudCredentialsFormValues = {
  readonly email: string;
  readonly password: string;
};

export type UserSettingsPageICloudCredentialsFormProps = {
  readonly icloudCredentials: Maybe<UserSettingsPageICloudCredentialsFragment>;
};

const UserSettingsPageICloudCredentialsForm: FC<
  UserSettingsPageICloudCredentialsFormProps
> = ({ icloudCredentials }) => {
  const { cookies, session } = icloudCredentials || {};
  const router = useRouter();

  // == Callbacks
  const openVerifySecurityCodeModal = useCallback(() => {
    openModal({
      title: (
        <Box>
          <Title order={2} size="h4">
            Verify Security Code
          </Title>
          <Text size="sm" color="dimmed" sx={{ lineHeight: 1.3 }}>
            Enter the security code you received on your device to complete
            iCloud authentication.
          </Text>
        </Box>
      ),
      children: <VerifySecurityCodeModalContent />,
    });
  }, []);

  // == Form
  const initialValues = useMemo<UserSettingsPageICloudCredentialsFormValues>(
    () => ({
      email: "",
      password: "",
      ...pick(icloudCredentials, "email", "password"),
    }),
    [icloudCredentials],
  );
  const { getInputProps, onSubmit, setValues, setErrors, resetDirty } =
    useForm<UserSettingsPageICloudCredentialsFormValues>({
      initialValues: initialValues,
    });
  useDidUpdate(() => {
    setValues(initialValues);
    resetDirty(initialValues);
  }, [initialValues]);

  // == Update Mutation
  const onUpdateError = useApolloAlertCallback(
    "Failed to update iCloud credentials",
  );
  const [runUpdateMutation, { loading: updating }] = useMutation(
    ICloudCredentialsUpdateMutationDocument,
    {
      onCompleted: ({ payload: { icloudCredentials, errors } }) => {
        if (icloudCredentials) {
          router.reload({
            preserveScroll: true,
            onSuccess: () => {
              openModal({
                title: (
                  <Box>
                    <Title order={2} size="h4">
                      Verify Security Code
                    </Title>
                    <Text size="sm" color="dimmed" sx={{ lineHeight: 1.3 }}>
                      Enter the security code you received on your device to
                      complete iCloud authentication.
                    </Text>
                  </Box>
                ),
                children: <VerifySecurityCodeModalContent />,
              });
            },
          });
        } else {
          invariant(errors, "Missing input errors");
          const formErrors = parseFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(
            formErrors,
            "Could not update iCloud credentials",
          );
        }
      },
      onError: onUpdateError,
    },
  );

  // == Remove Mutation
  const onRemoveError = useApolloAlertCallback(
    "Failed to remove iCloud credentials",
  );
  const [runRemoveMutation, { loading: removing }] = useMutation(
    ICloudCredentialsRemoveMutationDocument,
    {
      onCompleted: () => {
        router.reload({
          preserveScroll: true,
          onSuccess: () => {
            showNotice({
              message: "iCloud credentials removed successfully.",
            });
          },
        });
      },
      onError: onRemoveError,
    },
  );

  // == Markup
  return (
    <form
      onSubmit={onSubmit(values => {
        runUpdateMutation({ variables: { input: { ...values } } });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Email"
          placeholder="example@example.com"
          required
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="applesauce"
          required
          {...getInputProps("password")}
        />
        <Stack spacing={6}>
          <Button type="submit" loading={updating}>
            Authenticate
          </Button>
          {icloudCredentials && (
            <>
              <Group spacing={6} grow>
                <Button variant="default" onClick={openVerifySecurityCodeModal}>
                  Verify Security Code
                </Button>
                {!!(cookies || session) && (
                  <Button
                    variant="default"
                    onClick={() => {
                      openModal({
                        title: (
                          <Box>
                            <Title order={2} size="h4">
                              Session Information
                            </Title>
                            <Text
                              size="sm"
                              color="dimmed"
                              sx={{ lineHeight: 1.3 }}
                            >
                              Details about the current iCloud login session.
                            </Text>
                          </Box>
                        ),
                        children: (
                          <SessionInformationModalContent
                            icloudCredentials={icloudCredentials}
                          />
                        ),
                      });
                    }}
                  >
                    Session Information
                  </Button>
                )}
              </Group>
              <Menu withinPortal>
                <Menu.Target>
                  <Button variant="outline" color="red" loading={removing}>
                    Deactivate
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    color="red"
                    icon={<AlertIcon />}
                    onClick={() => {
                      runRemoveMutation({
                        variables: {
                          input: {},
                        },
                      });
                    }}
                  >
                    Really deactivate?
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default UserSettingsPageICloudCredentialsForm;

const VerifySecurityCodeModalContent: FC = () => {
  const { getInputProps, onSubmit } = useForm({
    initialValues: { code: "" },
  });
  const onError = useApolloAlertCallback("Failed to verify code");
  const [runMutation, { loading }] = useMutation(
    ICloudCredentialsVerifySecurityCodeMutationDocument,
    {
      onCompleted: () => {
        closeAllModals();
        showNotice({ message: "Successfully authenticated with iCloud." });
      },
      onError,
    },
  );
  return (
    <form
      onSubmit={onSubmit(values => {
        runMutation({ variables: { input: { ...values } } });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Security Code"
          placeholder="123456"
          autoComplete="off"
          {...getInputProps("code")}
        />
        <Button type="submit" {...{ loading }}>
          Verify Code
        </Button>
      </Stack>
    </form>
  );
};

type SessionInformationModalContentProps = {
  readonly icloudCredentials: UserSettingsPageICloudCredentialsFragment;
};

const SessionInformationModalContent: FC<
  SessionInformationModalContentProps
> = ({ icloudCredentials: { cookies, session } }) => {
  return (
    <Stack spacing="xs">
      {!!cookies && (
        <Textarea
          label="Cookies"
          value={cookies}
          maxRows={6}
          autosize
          readOnly
          styles={({ colors }) => ({
            input: {
              color: colors.gray[7],
            },
          })}
        />
      )}
      {!!session && (
        <JsonInput
          label="Session"
          value={JSON.stringify(session, undefined, 2)}
          maxRows={6}
          autosize
          readOnly
          styles={({ colors }) => ({
            input: {
              color: colors.gray[7],
            },
          })}
        />
      )}
    </Stack>
  );
};
