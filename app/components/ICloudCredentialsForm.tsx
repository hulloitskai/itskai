import type { FC } from "react";
import { JsonInput, PasswordInput, Text } from "@mantine/core";

import {
  RemoveICloudCredentialsMutationDocument,
  UpdateICloudCredentialsMutationDocument,
} from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { ICloudCredentialsFormCredentialsFragment } from "~/helpers/graphql";

import ICloudVerifySecurityCodeForm from "./ICloudVerifySecurityCodeForm";

export type ICloudCredentialsFormValues = {
  readonly email: string;
  readonly password: string;
};

export type ICloudCredentialsFormProps = {
  readonly credentials: Maybe<ICloudCredentialsFormCredentialsFragment>;
};

const ICloudCredentialsForm: FC<ICloudCredentialsFormProps> = ({
  credentials,
}) => {
  const { cookies, session } = credentials ?? {};
  const router = useRouter();

  // == Callbacks
  const openVerifySecurityCodeModal = useCallback(() => {
    openModal({
      title: (
        <Box>
          <Text>Verify Security Code</Text>
          <Text
            weight="normal"
            color="dimmed"
            size="sm"
            sx={{ lineHeight: 1.3 }}
          >
            Enter the security code you received on your device to complete
            iCloud authentication.
          </Text>
        </Box>
      ),
      children: <ICloudVerifySecurityCodeForm />,
    });
  }, []);

  // == Form
  const initialValues = useMemo<ICloudCredentialsFormValues>(() => {
    const { email, password } = credentials ?? {};
    return {
      email: email ?? "",
      password: password ?? "",
    };
  }, [credentials]);
  const { getInputProps, setValues, setErrors, resetDirty, onSubmit } =
    useForm<ICloudCredentialsFormValues>({
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
    UpdateICloudCredentialsMutationDocument,
    {
      onCompleted: ({ payload: { credentials, errors } }) => {
        if (credentials) {
          router.reload({
            preserveScroll: true,
            onSuccess: () => {
              openVerifySecurityCodeModal();
            },
          });
        } else {
          invariant(errors, "Missing input errors");
          const formErrors = parseFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Couldn't update iCloud credentials");
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
    RemoveICloudCredentialsMutationDocument,
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
        runUpdateMutation({
          variables: {
            input: values,
          },
        });
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
          {credentials && (
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
                            <Text>Session Information</Text>
                            <Text
                              weight="normal"
                              size="sm"
                              color="dimmed"
                              lh={1.3}
                            >
                              Details about the current iCloud login session.
                            </Text>
                          </Box>
                        ),
                        children: (
                          <Stack spacing="xs">
                            {!!cookies && (
                              <Textarea
                                label="Cookies"
                                value={cookies}
                                autosize
                                maxRows={12}
                                readOnly
                              />
                            )}
                            {!!session && (
                              <JsonInput
                                label="Session"
                                value={JSON.stringify(session, undefined, 2)}
                                autosize
                                maxRows={12}
                                readOnly
                              />
                            )}
                          </Stack>
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

export default ICloudCredentialsForm;
