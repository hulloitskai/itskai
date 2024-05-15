import type { FC } from "react";
import SessionIcon from "~icons/heroicons/identification-20-solid";
import SecurityCodeIcon from "~icons/heroicons/key-20-solid";

import type { BoxProps } from "@mantine/core";
import { JsonInput, PasswordInput, Text } from "@mantine/core";

import type { ICloudConnectionFormConnectionFragment } from "~/helpers/graphql";
import {
  CreateICloudConnectionMutationDocument,
  DeleteICloudConnectionMutationDocument,
  ICloudConnectionStatus,
} from "~/helpers/graphql";

import ICloudVerifySecurityCodeForm from "./ICloudVerifySecurityCodeForm";

export type ICloudConnectionFormProps = BoxProps & {
  readonly connection: ICloudConnectionFormConnectionFragment;
  readonly onCreate: () => void;
  readonly onDelete: () => void;
  readonly onVerifySecurityCode: () => void;
};

type ICloudConnectionFormValues = {
  readonly email: string;
  readonly password: string;
};

const ICloudCredentialsForm: FC<ICloudConnectionFormProps> = ({
  connection: { credentials, status },
  onCreate,
  onDelete,
  onVerifySecurityCode,
  ...otherProps
}) => {
  const { cookies, session } = credentials ?? {};

  // == Form
  const initialValues = useMemo<ICloudConnectionFormValues>(() => {
    const { email, password } = credentials ?? {};
    return {
      email: email ?? "",
      password: password ?? "",
    };
  }, [credentials]);
  const { getInputProps, setValues, resetDirty, onSubmit } =
    useForm<ICloudConnectionFormValues>({
      initialValues: initialValues,
    });
  useDidUpdate(() => {
    setValues(initialValues);
    resetDirty(initialValues);
  }, [initialValues]);

  // == Connection Creation
  const onCreateConnectionError = useApolloAlertCallback(
    "Failed to connect to iCloud",
  );
  const [createConnection, { loading: creating }] = useMutation(
    CreateICloudConnectionMutationDocument,
    {
      onCompleted: ({ payload: { requires2fa } }) => {
        if (requires2fa) {
          showNotice({
            message: "Security code required to complete authentication.",
          });
          openVerifySecurityCodeModal();
          onCreate();
        } else {
          showNotice({ message: "Successfully authenticated with iCloud." });
        }
      },
      onError: onCreateConnectionError,
    },
  );

  // == Deleting Connection
  const onDeleteConnectionError = useApolloAlertCallback(
    "Failed to delete iCloud connection",
  );
  const [deleteConnection, { loading: deletingConnection }] = useMutation(
    DeleteICloudConnectionMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "iCloud connection deleted successfully.",
        });
        onDelete();
      },
      onError: onDeleteConnectionError,
    },
  );

  // == Verifying Security Code
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
      children: (
        <ICloudVerifySecurityCodeForm mb="xs" onVerify={onVerifySecurityCode} />
      ),
    });
  }, [onVerifySecurityCode]);

  // == Session info
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
        <Stack gap={6}>
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

  return (
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        createConnection({
          variables: {
            input: values,
          },
        });
      })}
      {...otherProps}
    >
      <Stack gap="xs">
        <Stack gap={6}>
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
        </Stack>
        <Stack gap={6}>
          <Button
            type="submit"
            leftSection={<AuthenticateIcon />}
            loading={creating}
          >
            {credentials ? "Re-authenticate" : "Authenticate"}
          </Button>
          {(status === ICloudConnectionStatus.Requires_2Fa ||
            !!cookies ||
            !!session) && (
            <>
              <Group gap={6} grow>
                {status === ICloudConnectionStatus.Requires_2Fa && (
                  <Button
                    variant="default"
                    leftSection={<SecurityCodeIcon />}
                    onClick={openVerifySecurityCodeModal}
                  >
                    Verify Security Code
                  </Button>
                )}
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
                    loading={deletingConnection}
                  >
                    Deactivate
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<AlertIcon />}
                    color="red"
                    onClick={() => {
                      deleteConnection({
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
