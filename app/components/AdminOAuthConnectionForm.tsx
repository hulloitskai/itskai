import type { OAuthConnection } from "~/types";

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
          <TextInput label="UID (read-only)" value={credentials.uid} readOnly />
          {!!credentials.refreshToken && (
            <TextInput
              label="Refresh token (read-only)"
              value={credentials.refreshToken}
              readOnly
            />
          )}
        </>
      )}
      <Stack gap={6}>
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
    </Stack>
  );
};

export default AdminOAuthConnectionForm;
