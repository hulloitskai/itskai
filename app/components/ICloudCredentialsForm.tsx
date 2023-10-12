import type { FC } from "react";
import SessionIcon from "~icons/heroicons/identification-20-solid";
import SecurityCodeIcon from "~icons/heroicons/key-20-solid";

import { JsonInput, PasswordInput, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  RemoveICloudCredentialsMutationDocument,
  UpdateICloudCredentialsMutationDocument,
} from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { ICloudCredentialsFormCredentialsFragment } from "~/helpers/graphql";

import ICloudVerifySecurityCodeForm from "./ICloudVerifySecurityCodeForm";

export type ICloudCredentialsFormProps = Omit<BoxProps, "children"> & {
  readonly credentials: Maybe<ICloudCredentialsFormCredentialsFragment>;
  readonly onUpdate: () => void;
  readonly onRemove: () => void;
};

type ICloudCredentialsFormValues = {
  readonly email: string;
  readonly password: string;
};

const ICloudCredentialsForm: FC<ICloudCredentialsFormProps> = ({
  credentials,
  onUpdate,
  onRemove,
  ...otherProps
}) => {
  const { cookies, session } = credentials ?? {};

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
          openVerifySecurityCodeModal();
          onUpdate();
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
        showNotice({
          message: "iCloud credentials removed successfully.",
        });
        onRemove();
      },
      onError: onRemoveError,
    },
  );

  // == Security Code
  const openVerifySecurityCodeModal = useCallback(() => {
    openModal({
      title: (
        <Box>
          <Text>Verify Security Code</Text>
          <Text size="sm" c="dimmed" fw="normal" style={{ lineHeight: 1.3 }}>
            Enter the security code you received on your device to complete
            iCloud authentication.
          </Text>
        </Box>
      ),
      children: <ICloudVerifySecurityCodeForm />,
    });
  }, []);

  // == Session Info
  const openSessionInfoModal = () => {
    openModal({
      title: (
        <Box>
          <Text>Session Information</Text>
          <Text size="sm" c="dimmed" fw="normal" lh={1.3}>
            Details about the current iCloud login session.
          </Text>
        </Box>
      ),
      children: (
        <Stack gap="xs">
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
  };

  // == Markup
  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        runUpdateMutation({
          variables: {
            input: values,
          },
        });
      })}
      {...otherProps}
    >
      <Stack gap="xs">
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
        <Stack gap={6}>
          <Button
            type="submit"
            leftSection={<AuthenticateIcon />}
            loading={updating}
          >
            Authenticate
          </Button>
          {credentials && (
            <>
              <Group gap={6} grow>
                <Button
                  variant="default"
                  leftSection={<SecurityCodeIcon />}
                  onClick={openVerifySecurityCodeModal}
                >
                  Verify Security Code
                </Button>
                {!!(cookies || session) && (
                  <Button
                    variant="default"
                    leftSection={<SessionIcon />}
                    onClick={openSessionInfoModal}
                  >
                    Session Information
                  </Button>
                )}
              </Group>
              <Menu
                withArrow
                styles={{
                  dropdown: {
                    borderColor: "var(--mantine-color-red-outline)",
                  },
                  arrow: {
                    borderColor: "var(--mantine-color-red-outline)",
                  },
                }}
              >
                <Menu.Target>
                  <Button
                    variant="outline"
                    color="red"
                    leftSection={<DeactivateIcon />}
                    loading={removing}
                  >
                    Deactivate
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<AlertIcon />}
                    color="red"
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
    </Box>
  );
};

export default ICloudCredentialsForm;
