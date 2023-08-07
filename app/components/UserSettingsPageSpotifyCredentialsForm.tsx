import type { FC } from "react";

import { RemoveSpotifyCredentialsMutationDocument } from "~/helpers/graphql";
import type { UserSettingsPageOAuthCredentialsFragment } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";

import FormAuthenticityField from "./FormAuthenticityField";

export type UserSettingsPageSpotifyCredentialsFormProps = {
  readonly credentials: Maybe<UserSettingsPageOAuthCredentialsFragment>;
};

const UserSettingsPageSpotifyCredentialsForm: FC<
  UserSettingsPageSpotifyCredentialsFormProps
> = ({ credentials }) => {
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
    <Stack spacing="xs">
      {credentials &&
        resolve(() => {
          const { uid, refreshToken } = credentials;
          return (
            <Stack spacing={8}>
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
      <Stack spacing={6}>
        <form action="/user/auth/spotify" method="post">
          <FormAuthenticityField />
          <Button type="submit" fullWidth>
            Authenticate
          </Button>
        </form>
        {credentials && (
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
  );
};

export default UserSettingsPageSpotifyCredentialsForm;
