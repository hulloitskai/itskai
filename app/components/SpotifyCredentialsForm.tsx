import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import { RemoveSpotifyCredentialsMutationDocument } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { OAuthCredentialsFormCredentialsFragment } from "~/helpers/graphql";

import FormAuthenticityField from "./FormAuthenticityField";

export type SpotifyCredentialsFormProps = Omit<BoxProps, "children"> & {
  readonly credentials: Maybe<OAuthCredentialsFormCredentialsFragment>;
  readonly onRemove: () => void;
};

const SpotifyCredentialsForm: FC<SpotifyCredentialsFormProps> = ({
  credentials,
  onRemove,
  ...otherProps
}) => {
  // == Remove Mutation
  const onRemoveError = useApolloAlertCallback(
    "Failed to remove Spotify credentials",
  );
  const [runRemoveMutation, { loading: removing }] = useMutation(
    RemoveSpotifyCredentialsMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Spotify credentials removed successfully.",
        });
        onRemove();
      },
      onError: onRemoveError,
    },
  );

  // == Markup
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
        <form action="/user/auth/spotify" method="post">
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
                loading={removing}
              >
                Deactivate
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={<AlertIcon />}
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
        )}
      </Stack>
    </Stack>
  );
};

export default SpotifyCredentialsForm;
