import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import { DeleteGoogleConnectionMutationDocument } from "~/helpers/graphql";
import type { OAuthConnectionFormConnectionFragment } from "~/helpers/graphql";

import FormAuthenticityField from "./FormAuthenticityField";

export type GoogleConnectionFormProps = BoxProps & {
  readonly connection: OAuthConnectionFormConnectionFragment;
  readonly onDelete: () => void;
};

const GoogleConnectionForm: FC<GoogleConnectionFormProps> = ({
  connection: { credentials },
  onDelete,
  ...otherProps
}) => {
  // == Delete Mutation
  const onDeleteError = useApolloAlertCallback(
    "Failed to delete Google connection",
  );
  const [runDeleteMutation, { loading: deleting }] = useMutation(
    DeleteGoogleConnectionMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Google connection deleted.",
        });
        onDelete();
      },
      onError: onDeleteError,
    },
  );

  return (
    <Stack gap="xs" {...otherProps}>
      {credentials &&
        resolve(() => {
          const { uid, refreshToken } = credentials;
          return (
            <Stack gap={8}>
              <TextInput label="UID (read-only)" value={uid} readOnly />
              {!!refreshToken && (
                <TextInput
                  label="Refresh Token (read-only)"
                  value={refreshToken}
                  readOnly
                />
              )}
            </Stack>
          );
        })}
      <Stack gap={6}>
        <form action="/user/auth/google" method="post">
          <FormAuthenticityField />
          <Button type="submit" leftSection={<OpenExternalIcon />} fullWidth>
            Authenticate
          </Button>
        </form>
        {credentials && (
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
                loading={deleting}
              >
                Deactivate
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={<AlertIcon />}
                onClick={() => {
                  runDeleteMutation({
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
        )}
      </Stack>
    </Stack>
  );
};

export default GoogleConnectionForm;
