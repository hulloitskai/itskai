import { type OAuthConnection } from "~/types";

import { type AdminOAuthDisconnectButtonProps } from "./AdminOAuthDisconnectButton";
import AdminOAuthDisconnectButton from "./AdminOAuthDisconnectButton";
import FormAuthenticityField from "./FormAuthenticityField";

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
  const { credentials } = connection;
  return (
    <Stack gap="xs" {...otherProps}>
      {credentials && (
        <>
          <TextInput label="UID (read-only)" value={credentials.uid} readOnly />
          {!!credentials.refresh_token && (
            <TextInput
              label="Refresh token (read-only)"
              value={credentials.refresh_token}
              readOnly
            />
          )}
        </>
      )}
      <Stack gap={6}>
        <form action={connection.authorize_url} method="post">
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
