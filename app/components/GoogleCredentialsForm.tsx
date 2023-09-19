import type { FC } from "react";

import { RemoveGoogleCredentialsMutationDocument } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { OAuthCredentialsFormCredentialsFragment } from "~/helpers/graphql";

import FormAuthenticityField from "./FormAuthenticityField";

export type GoogleCredentialsFormProps = {
  readonly credentials: Maybe<OAuthCredentialsFormCredentialsFragment>;
};

const GoogleCredentialsForm: FC<GoogleCredentialsFormProps> = ({
  credentials,
}) => {
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

export default GoogleCredentialsForm;
