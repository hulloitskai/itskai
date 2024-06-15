import type { ComponentPropsWithoutRef, FC } from "react";
import type { OAuthConnection } from "~/types";
import type { BoxProps } from "@mantine/core";

import FormAuthenticityField from "./FormAuthenticityField";

import type { AdminOAuthDisconnectButtonProps } from "./AdminOAuthDisconnectButton";
import AdminOAuthDisconnectButton from "./AdminOAuthDisconnectButton";

export interface AdminOAuthConnectionFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children">,
    Pick<AdminOAuthDisconnectButtonProps, "onDisconnected"> {
  connection: OAuthConnection;
}

const AdminOAuthConnectionForm: FC<AdminOAuthConnectionFormProps> = ({
  connection,
  onDisconnected,
  ...otherProps
}) => {
  const { credentials, authorizeUrl } = connection;
  return (
    <Stack gap="xs" {...otherProps}>
      {credentials && (
        <>
          <TextInput label="UID (read-only)" value={credentials.uid} />
          {!!credentials.refreshToken && (
            <TextInput
              label="Refresh Token (read-only)"
              value={credentials.refreshToken}
              readOnly
            />
          )}
        </>
      )}
      <form action={authorizeUrl} method="post">
        <FormAuthenticityField />
        <Button type="submit" leftSection={<OpenExternalIcon />} fullWidth>
          Authenticate
        </Button>
      </form>
      {credentials && (
        <AdminOAuthDisconnectButton {...{ connection, onDisconnected }} />
      )}
    </Stack>
  );
};

export default AdminOAuthConnectionForm;
