import type { FC } from "react";

import { RemoveSpotifyCredentialsMutationDocument } from "~/queries";
import type { UserSettingsPageOAuthCredentialsFragment } from "~/queries";
import type { Maybe } from "~/queries";

import FormAuthenticityField from "./FormAuthenticityField";

export type UserSettingsPageSpotifyCredentialsFormProps = {
  readonly spotifyCredentials: Maybe<UserSettingsPageOAuthCredentialsFragment>;
};

const userSettingsPageSpotifyCredentialsForm: FC<
  UserSettingsPageSpotifyCredentialsFormProps
> = ({ spotifyCredentials }) => {
  const router = useRouter();

  // == Remove Mutation
  const onRemoveError = useApolloAlertCallback(
    "Failed to remove Spotify credentials",
  );
  const [runRemoveMutation, { loading: removing }] = useMutation(
    RemoveSpotifyCredentialsMutationDocument,
    {
      onCompleted: () => {
        router.reload({
          preserveScroll: true,
          onSuccess: () => {
            showNotice({
              message: "Spotify credentials removed successfully.",
            });
          },
        });
      },
      onError: onRemoveError,
    },
  );

  // == Markup
  return (
    <form action="/user/auth/spotify" method="post">
      <FormAuthenticityField />
      <Stack spacing="xs">
        {spotifyCredentials &&
          resolve(() => {
            const { uid, accessToken, refreshToken } = spotifyCredentials;
            return (
              <>
                <TextInput label="UID (read-only)" value={uid} readOnly />
                {!!accessToken && (
                  <TextInput
                    label="Access Token (read-only)"
                    value={accessToken}
                    readOnly
                  />
                )}
                {!!refreshToken && (
                  <TextInput
                    label="Refresh Token (read-only)"
                    value={refreshToken}
                    readOnly
                  />
                )}
              </>
            );
          })}
        <Stack spacing={6}>
          <Button type="submit">Authorize</Button>
          {spotifyCredentials && (
            <Menu withinPortal>
              <Menu.Target>
                <Button variant="outline" color="red" loading={removing}>
                  Deactivate
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  icon={<AlertIcon />}
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
    </form>
  );
};

export default userSettingsPageSpotifyCredentialsForm;
