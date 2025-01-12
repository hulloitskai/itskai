import { JsonInput, PasswordInput, Text } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";

import SessionIcon from "~icons/heroicons/identification-20-solid";
import SecurityCodeIcon from "~icons/heroicons/key-20-solid";

import { type ICloudConnection } from "~/types";

import { type AdminICloudDisconnectButtonProps } from "./AdminICloudDisconnectButton";
import AdminICloudDisconnectButton from "./AdminICloudDisconnectButton";
import AdminICloudVerifySecurityCodeForm from "./AdminICloudVerifySecurityCodeForm";

export interface AdminICloudConnectionFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children">,
    Pick<AdminICloudDisconnectButtonProps, "onDisconnected"> {
  connection: ICloudConnection;
  onConnected?: (connection: ICloudConnection) => void;
}

const AdminICloudCredentialsForm: FC<AdminICloudConnectionFormProps> = ({
  connection: { credentials, status },
  onConnected,
  onDisconnected,
  ...otherProps
}) => {
  // == Session info
  const openSessionInfoModal = () => {
    openModal({
      size: "lg",
      title: (
        <Box>
          <Text>Session information</Text>
          <Text size="sm" c="dimmed" fw="normal" lh={1.3}>
            Details about the current iCloud login session.
          </Text>
        </Box>
      ),
      children: (
        <Stack gap={6}>
          {!!credentials?.cookies && (
            <Textarea
              label="Cookies"
              value={credentials.cookies}
              readOnly
              autosize
              maxRows={12}
            />
          )}
          {!!credentials?.session && (
            <JsonInput
              label="Session"
              value={formatJSON(credentials.session)}
              readOnly
              autosize
              maxRows={12}
            />
          )}
        </Stack>
      ),
    });
  };

  // == 2FA
  const openVerifySecurityCodeModal = useCallback(() => {
    openModal({
      title: (
        <Box>
          <Text>Verify security code</Text>
          <Text size="sm" c="dimmed" fw="normal" style={{ lineHeight: 1.3 }}>
            Enter the security code you received on your device to complete
            iCloud authentication.
          </Text>
        </Box>
      ),
      children: (
        <AdminICloudVerifySecurityCodeForm mb="xs" onVerified={onConnected} />
      ),
    });
  }, [onConnected]);

  // == Form
  const initialValues = useMemo(() => {
    const { email } = credentials ?? {};
    return {
      email: email ?? "",
      password: "",
    };
  }, [credentials]);
  interface FormData {
    connection: ICloudConnection;
  }
  const { values, getInputProps, submitting, submit } = useFetchForm({
    name: "icloud-connection",
    action: routes.adminICloudConnections.create,
    descriptor: "authenticate with iCloud",
    // mode: "uncontrolled",
    initialValues,
    validate: {
      email: isNotEmpty("Email is required"),
      password: isNotEmpty("Password is required"),
    },
    transformValues: values => ({ credentials: values }),
    onSuccess: ({ connection }: FormData) => {
      if (connection.status === "requires_2fa") {
        openVerifySecurityCodeModal();
      } else if (connection.status === "connected") {
        onConnected?.(connection);
      }
    },
  });
  const filled = useFieldsFilled(values);

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("email")}
          label="Email"
          placeholder="example@example.com"
          required
          autoComplete="email"
        />
        <PasswordInput
          {...getInputProps("password")}
          label="Password"
          placeholder="applesauce"
          required
          autoComplete="new-password"
        />
        <Stack gap={8}>
          <Button
            type="submit"
            leftSection={<AuthenticateIcon />}
            disabled={!filled}
            loading={submitting}
          >
            {credentials ? "Re-authenticate" : "Authenticate"}
          </Button>
          {(status === "requires_2fa" || !!credentials) && (
            <>
              <Group gap={6} grow>
                {status === "requires_2fa" && (
                  <Button
                    color="gray"
                    leftSection={<SecurityCodeIcon />}
                    onClick={openVerifySecurityCodeModal}
                  >
                    Verify security code
                  </Button>
                )}
                {!!credentials && (
                  <Button
                    color="gray"
                    leftSection={<SessionIcon />}
                    onClick={openSessionInfoModal}
                  >
                    Session information
                  </Button>
                )}
              </Group>
              <AdminICloudDisconnectButton {...{ onDisconnected }} />
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AdminICloudCredentialsForm;
