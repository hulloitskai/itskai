import type { FC } from "react";
import { JsonInput, PasswordInput, Text } from "@mantine/core";

import {
  ICloudCredentialsUpdateMutationDocument,
  ICloudCredentialsVerifySecurityCodeMutationDocument,
} from "~/queries";
import type {
  Maybe,
  AccountEditPageICloudCredentialsFragment,
} from "~/queries";

export type AccountEditPageICloudCredentialsFormValues = {
  readonly email: string;
  readonly password: string;
};

export type AccountEditPageICloudCredentialsFormProps = {
  readonly icloudCredentials: Maybe<AccountEditPageICloudCredentialsFragment>;
};

const AccountEditPageICloudCredentialsForm: FC<
  AccountEditPageICloudCredentialsFormProps
> = ({ icloudCredentials }) => {
  const { password, cookies, session } = icloudCredentials || {};
  const router = useRouter();
  const initialValues = useMemo<AccountEditPageICloudCredentialsFormValues>(
    () => ({
      email: "",
      password: "",
      ...pick(icloudCredentials, "email", "password"),
    }),
    [icloudCredentials],
  );
  const { getInputProps, onSubmit, setErrors } =
    useForm<AccountEditPageICloudCredentialsFormValues>({
      initialValues: initialValues,
    });
  const onError = useApolloErrorCallback("Failed to update iCloud credentials");
  const [runMutation, { loading }] = useMutation(
    ICloudCredentialsUpdateMutationDocument,
    {
      onCompleted: ({ payload: { icloudCredentials, errors } }) => {
        if (icloudCredentials) {
          router.reload();
          showNotice({ message: "You've authenticated with iCloud." });
        } else {
          invariant(errors);
          setErrors(formErrors(errors));
          showAlert({ message: "Failed to update iCloud credentials." });
        }
      },
      onError,
    },
  );
  return (
    <form
      onSubmit={onSubmit(values => {
        runMutation({ variables: { input: { ...values } } });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Email"
          placeholder="example@example.com"
          required
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="applesauce"
          required
          {...getInputProps("password")}
        />
        <Stack spacing={6}>
          <Button type="submit" fullWidth {...{ loading }}>
            Authenticate
          </Button>
          <Group spacing={6} grow>
            {!!password && (
              <Button
                variant="default"
                onClick={() => {
                  openModal({
                    title: (
                      <Box>
                        <Title order={2} size="h4">
                          Verify Security Code
                        </Title>
                        <Text size="sm" color="dimmed" sx={{ lineHeight: 1.3 }}>
                          Enter the security code you received on your device to
                          complete iCloud authentication.
                        </Text>
                      </Box>
                    ),
                    children: <VerifySecurityCodeModalContent />,
                  });
                }}
              >
                Verify Security Code
              </Button>
            )}
            {!!(icloudCredentials && (cookies || session)) && (
              <Button
                variant="default"
                onClick={() => {
                  openModal({
                    title: (
                      <Box>
                        <Title order={2} size="h4">
                          Session Information
                        </Title>
                        <Text size="sm" color="dimmed" sx={{ lineHeight: 1.3 }}>
                          Details about the current iCloud login session.
                        </Text>
                      </Box>
                    ),
                    children: (
                      <SessionInformationModalContent
                        icloudCredentials={icloudCredentials}
                      />
                    ),
                  });
                }}
              >
                Session Information
              </Button>
            )}
          </Group>
        </Stack>
      </Stack>
    </form>
  );
};

export default AccountEditPageICloudCredentialsForm;

const VerifySecurityCodeModalContent: FC = () => {
  const { getInputProps, onSubmit } = useForm({
    initialValues: { code: "" },
  });
  const onError = useApolloErrorCallback("Failed to verify code");
  const [runMutation, { loading }] = useMutation(
    ICloudCredentialsVerifySecurityCodeMutationDocument,
    {
      onCompleted: () => {
        closeAllModals();
        showNotice({ message: "iCloud security code verified." });
      },
      onError,
    },
  );
  return (
    <form
      onSubmit={onSubmit(values => {
        runMutation({ variables: { input: { ...values } } });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Security Code"
          placeholder="123456"
          autoComplete="off"
          {...getInputProps("code")}
        />
        <Button type="submit" {...{ loading }}>
          Verify Code
        </Button>
      </Stack>
    </form>
  );
};

type SessionInformationModalContentProps = {
  readonly icloudCredentials: AccountEditPageICloudCredentialsFragment;
};

const SessionInformationModalContent: FC<
  SessionInformationModalContentProps
> = ({ icloudCredentials: { cookies, session } }) => {
  return (
    <Stack spacing="xs">
      {!!cookies && (
        <Textarea
          label="Cookies"
          value={cookies}
          maxRows={6}
          autosize
          readOnly
          styles={({ colors }) => ({
            input: {
              color: colors.gray[7],
            },
          })}
        />
      )}
      {!!session && (
        <JsonInput
          label="Session"
          value={JSON.stringify(session, undefined, 2)}
          maxRows={6}
          autosize
          readOnly
          styles={({ colors }) => ({
            input: {
              color: colors.gray[7],
            },
          })}
        />
      )}
    </Stack>
  );
};
