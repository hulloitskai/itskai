import type { FC } from "react";

import type { Maybe } from "~/queries";
import type { UserSettingsPageSpotifyCredentialsFragment } from "~/queries";
import FormAuthenticityField from "./FormAuthenticityField";

export type UserSettingsPageSpotifyCredentialsFormValues = {
  readonly uid: string;
  readonly refreshToken: string | null;
};

export type UserSettingsPageSpotifyCredentialsFormProps = {
  readonly spotifyCredentials: Maybe<UserSettingsPageSpotifyCredentialsFragment>;
};

const UserSettingsPageSpotifyCredentialsForm: FC<
  UserSettingsPageSpotifyCredentialsFormProps
> = ({ spotifyCredentials }) => {
  const { uid, refreshToken } = spotifyCredentials || {};
  const initialValues = useMemo<UserSettingsPageSpotifyCredentialsFormValues>(
    () => ({
      uid: "",
      refreshToken: "",
      ...pick(spotifyCredentials, "uid", "refreshToken"),
    }),
    [spotifyCredentials],
  );
  const { getInputProps } =
    useForm<UserSettingsPageSpotifyCredentialsFormValues>({
      initialValues: initialValues,
    });
  return (
    <form action="/user/auth/spotify" method="post">
      <FormAuthenticityField />
      <Stack spacing="xs">
        {!!uid && (
          <TextInput
            label="UID (read-only)"
            readOnly
            {...getInputProps("uid")}
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

export default UserSettingsPageSpotifyCredentialsForm;
