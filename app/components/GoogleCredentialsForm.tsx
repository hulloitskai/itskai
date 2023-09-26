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
    <Stack gap="xs">
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
          <Button type="submit" fullWidth>
            Authenticate
          </Button>
        </form>
        {credentials && (
          <Menu
            withinPortal
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
              <Button variant="outline" color="red" loading={removing}>
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

export default GoogleCredentialsForm;
