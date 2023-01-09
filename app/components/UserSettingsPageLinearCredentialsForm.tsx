import type { FC } from "react";

import type { Maybe } from "~/queries";
import type { UserSettingsPageOAuthCredentialsFragment } from "~/queries";
import FormAuthenticityField from "./FormAuthenticityField";

export type UserSettingsPageOAuthCredentialsFormValues = {
  readonly uid: string;
  readonly accessToken: string | null;
  readonly refreshToken: string | null;
};

export type UserSettingsPageOAuthCredentialsFormProps = {
  readonly linearCredentials: Maybe<UserSettingsPageOAuthCredentialsFragment>;
};

const UserSettingsPageOAuthCredentialsForm: FC<
  UserSettingsPageOAuthCredentialsFormProps
> = ({ linearCredentials }) => {
  const { uid, accessToken, refreshToken } = linearCredentials || {};
  const initialValues = useMemo<UserSettingsPageOAuthCredentialsFormValues>(
    () => ({
      uid: "",
      accessToken: "",
      refreshToken: "",
      ...pick(linearCredentials, "uid", "accessToken", "refreshToken"),
    }),
    [linearCredentials],
  );
  const { getInputProps } = useForm<UserSettingsPageOAuthCredentialsFormValues>(
    {
      initialValues: initialValues,
    },
  );
  return (
    <form action="/user/auth/linear" method="post">
      <FormAuthenticityField />
      <Stack spacing="xs">
        {!!uid && (
          <TextInput
            label="UID (read-only)"
            readOnly
            {...getInputProps("uid")}
          />
        )}
        {!!accessToken && (
          <TextInput
            label="Access Token (read-only)"
            readOnly
            {...getInputProps("accessToken")}
          />
        )}
        {!!refreshToken && (
          <TextInput
            label="Refresh Token (read-only)"
            readOnly
            {...getInputProps("refreshToken")}
          />
        )}
        <Button type="submit">Authorize</Button>
      </Stack>
    </form>
  );
};

export default UserSettingsPageOAuthCredentialsForm;
