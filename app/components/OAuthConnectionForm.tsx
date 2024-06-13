import type { ComponentPropsWithoutRef, FC } from "react";
import type { OAuthConnection } from "~/types";
import type { BoxProps } from "@mantine/core";

import FormAuthenticityField from "./FormAuthenticityField";
import OAuthDisconnectButton, {
  OAuthDisconnectButtonProps,
} from "./OAuthDisconnectButton";

export interface OAuthConnectionFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children">,
    Pick<OAuthDisconnectButtonProps, "onDisconnected"> {
  connection: OAuthConnection;
}

const OAuthConnectionForm: FC<OAuthConnectionFormProps> = ({
  connection,
  onDisconnected,
  ...otherProps
}) => {
  const { credentials, authorizeUrl } = connection;
  return (
    <Stack gap="xs" {...otherProps}>
      {credentials && (
        <Stack gap={8}>
          <TextInput label="UID (read-only)" value={credentials.uid} />
          {!!credentials.refreshToken && (
            <TextInput
              label="Refresh Token (read-only)"
              value={credentials.refreshToken}
              readOnly
            />
          )}
        </Stack>
      )}
      <Stack gap={6}>
        <form action={authorizeUrl} method="post">
          <FormAuthenticityField />
          <Button type="submit" leftSection={<OpenExternalIcon />} fullWidth>
            Authenticate
          </Button>
        </form>
        {credentials && (
          <OAuthDisconnectButton {...{ connection, onDisconnected }} />
        )}
      </Stack>
    </Stack>
  );
};

export default OAuthConnectionForm;
