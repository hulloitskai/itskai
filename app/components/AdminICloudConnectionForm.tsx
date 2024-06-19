import type { ComponentPropsWithoutRef, FC } from "react";
import type { ICloudConnection } from "~/types";
import SessionIcon from "~icons/heroicons/identification-20-solid";
import SecurityCodeIcon from "~icons/heroicons/key-20-solid";

import type { BoxProps } from "@mantine/core";
import { JsonInput, PasswordInput, Text } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";

import type { AdminICloudDisconnectButtonProps } from "./AdminICloudDisconnectButton";
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
              autosize
              maxRows={12}
              readOnly
            />
          )}
          {!!credentials?.session && (
            <JsonInput
              label="Session"
              value={JSON.stringify(credentials.session, undefined, 2)}
              autosize
              maxRows={12}
              readOnly
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
    const { email, password } = credentials ?? {};
    return {
      email: email ?? "",
      password: password ?? "",
    };
  }, [credentials]);
  const { getInputProps, submit, processing } = useFetchForm<{
    connection: ICloudConnection;
  }>({
    action: routes.adminICloudConnections.create,
    method: "post",
    descriptor: "authenticate with iCloud",
    mode: "uncontrolled",
    initialValues,
    validate: {
      email: isNotEmpty("Email is required"),
      password: isNotEmpty("Password is required"),
    },
    transformValues: values => ({ credentials: values }),
    onSuccess: ({ connection }) => {
      if (connection.status === "requires_2fa") {
        openVerifySecurityCodeModal();
      } else if (connection.status === "connected") {
        onConnected?.(connection);
      }
    },
  });

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
          autoComplete="off"
        />
        <Button
          type="submit"
          leftSection={<AuthenticateIcon />}
          loading={processing}
        >
          {credentials ? "Re-authenticate" : "Authenticate"}
        </Button>
        {(status === "requires_2fa" || !!credentials) && (
          <Stack gap={6}>
            <Group gap={6} grow>
              {status === "requires_2fa" && (
                <Button
                  variant="default"
                  leftSection={<SecurityCodeIcon />}
                  onClick={openVerifySecurityCodeModal}
                >
                  Verify security code
                </Button>
              )}
              {!!credentials && (
                <Button
                  variant="default"
                  leftSection={<SessionIcon />}
                  onClick={openSessionInfoModal}
                >
                  Session information
                </Button>
              )}
            </Group>
            <AdminICloudDisconnectButton {...{ onDisconnected }} />
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default AdminICloudCredentialsForm;
