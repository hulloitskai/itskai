import type { FC } from "react";

import { RemoveGoogleCredentialsMutationDocument } from "~/helpers/graphql";
import type { UserSettingsPageOAuthCredentialsFragment } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";

import FormAuthenticityField from "./FormAuthenticityField";

export type UserSettingsPageGoogleCredentialsFormProps = {
  readonly credentials: Maybe<UserSettingsPageOAuthCredentialsFragment>;
};

const UserSettingsPageGoogleCredentialsForm: FC<
  UserSettingsPageGoogleCredentialsFormProps
> = ({ credentials }) => {
  const router = useRouter();

  // == Remove Mutation
  const onRemoveError = useApolloAlertCallback(
    "Failed to remove Google credentials",
  );
  const [runRemoveMutation, { loading: removing }] = useMutation(
    RemoveGoogleCredentialsMutationDocument,
    {
      onCompleted: () => {
        router.reload({
          preserveScroll: true,
          onSuccess: () => {
            showNotice({
              message: "Google credentials removed successfully.",
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
          const { uid, accessToken, refreshToken } = credentials;
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
        <form action="/user/auth/google" method="post">
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

export default UserSettingsPageGoogleCredentialsForm;
