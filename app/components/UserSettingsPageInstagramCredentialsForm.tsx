import type { FC } from "react";
import { JsonInput, PasswordInput, Text } from "@mantine/core";

import {
  RemoveInstagramCredentialsMutationDocument,
  UpdateInstagramCredentialsMutationDocument,
} from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { UserSettingsPageInstagramCredentialsFragment } from "~/helpers/graphql";

export type UserSettingsPageInstagramCredentialsFormValues = {
  readonly username: string;
  readonly password: string;
  readonly securityCode: string;
};

export type UserSettingsPageInstagramCredentialsFormProps = {
  readonly credentials: Maybe<UserSettingsPageInstagramCredentialsFragment>;
};

const UserSettingsPageInstagramCredentialsForm: FC<
  UserSettingsPageInstagramCredentialsFormProps
> = ({ credentials }) => {
  const { session } = credentials ?? {};
  const router = useRouter();

  // == Form
  const initialValues =
    useMemo<UserSettingsPageInstagramCredentialsFormValues>(() => {
      const { username, password } = credentials ?? {};
      return {
        username: username ?? "",
        password: password ?? "",
        securityCode: "",
      };
    }, [credentials]);
  const { values, getInputProps, setValues, setErrors, resetDirty, onSubmit } =
    useForm<UserSettingsPageInstagramCredentialsFormValues>({
      initialValues: initialValues,
    });
  useDidUpdate(() => {
    setValues(initialValues);
    resetDirty(initialValues);
  }, [initialValues]);

  // == Update Mutation
  const onUpdateError = useApolloAlertCallback(
    "Failed to update Instagram credentials",
  );
  const [runUpdateMutation, { loading: updating }] = useMutation(
    UpdateInstagramCredentialsMutationDocument,
    {
      onCompleted: ({ payload: { credentials, errors } }) => {
        if (credentials) {
          router.reload({ preserveScroll: true });
        } else {
          invariant(errors, "Missing input errors");
          const formErrors = parseFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(
            formErrors,
            "Couldn't update Instagram credentials",
          );
        }
      },
      onError: onUpdateError,
    },
  );

  // == Remove Mutation
  const onRemoveError = useApolloAlertCallback(
    "Failed to remove Instagram credentials",
  );
  const [runRemoveMutation, { loading: removing }] = useMutation(
    RemoveInstagramCredentialsMutationDocument,
    {
      onCompleted: () => {
        router.reload({
          preserveScroll: true,
          onSuccess: () => {
            showNotice({
              message: "Instagram credentials removed successfully.",
            });
          },
        });
      },
      onError: onRemoveError,
    },
  );

  // == Markup
  return (
    <form
      onSubmit={onSubmit(values => {
        runUpdateMutation({
          variables: {
            input: values,
          },
        });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Username"
          placeholder="example@example.com"
          required
          {...getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          placeholder="applesauce"
          required
          {...getInputProps("password")}
        />
        <TextInput
          label="Security Code"
          placeholder="123456"
          required
          autoComplete="off"
          {...getInputProps("securityCode")}
        />
        <Stack spacing={6}>
          <Button
            type="submit"
            loading={updating}
            disabled={!values.securityCode}
          >
            Authenticate
          </Button>
          {credentials && (
            <>
              {!!session && (
                <Button
                  variant="default"
                  onClick={() => {
                    openModal({
                      title: (
                        <Box>
                          <Text>Session Information</Text>
                          <Text
                            weight="normal"
                            size="sm"
                            color="dimmed"
                            lh={1.3}
                          >
                            Details about the current Instagram login session.
                          </Text>
                        </Box>
                      ),
                      children: (
                        <SessionInformationModalContent {...{ credentials }} />
                      ),
                    });
                  }}
                >
                  Session Information
                </Button>
              )}
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
            </>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default UserSettingsPageInstagramCredentialsForm;

// const VerifySecurityCodeModalContent: FC = () => {
//   const { getInputProps, isDirty, onSubmit } = useForm({
//     initialValues: { code: "" },
//   });
//   const onError = useApolloAlertCallback("Failed to verify code");
//   const [runMutation, { loading }] = useMutation(
//     VerifyInstagramSecurityCodeMutationDocument,
//     {
//       onCompleted: () => {
//         closeAllModals();
//         showNotice({ message: "Successfully authenticated with Instagram." });
//       },
//       onError,
//     },
//   );
//   return (
//     <form
//       onSubmit={onSubmit(values => {
//         runMutation({ variables: { input: { ...values } } });
//       })}
//     >
//       <Stack spacing="xs">
//         <TextInput
//           label="Security Code"
//           placeholder="123456"
//           autoComplete="off"
//           {...getInputProps("code")}
//         />
//         <Button type="submit" disabled={!isDirty()} {...{ loading }}>
//           Verify Code
//         </Button>
//       </Stack>
//     </form>
//   );
// };

type SessionInformationModalContentProps = {
  readonly credentials: UserSettingsPageInstagramCredentialsFragment;
};

const SessionInformationModalContent: FC<
  SessionInformationModalContentProps
> = ({ credentials: { session } }) => (
  <Stack spacing="xs">
    {!!session && (
      <JsonInput
        label="Session"
        value={JSON.stringify(session, undefined, 2)}
        maxRows={12}
        autosize
        readOnly
      />
    )}
  </Stack>
);
