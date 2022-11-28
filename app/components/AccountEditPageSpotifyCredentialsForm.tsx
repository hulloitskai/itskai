import type { FC } from "react";

import type {
  Maybe,
  AccountEditPageSpotifyCredentialsFragment,
} from "~/queries";
import FormAuthenticityField from "./FormAuthenticityField";

export type AccountEditPageSpotifyCredentialsFormValues = {
  readonly uid: string;
  readonly refreshToken: string | null;
};

export type AccountEditPageSpotifyCredentialsFormProps = {
  readonly spotifyCredentials: Maybe<AccountEditPageSpotifyCredentialsFragment>;
};

const AccountEditPageSpotifyCredentialsForm: FC<
  AccountEditPageSpotifyCredentialsFormProps
> = ({ spotifyCredentials }) => {
  const { uid, refreshToken } = spotifyCredentials || {};
  const initialValues = useMemo<AccountEditPageSpotifyCredentialsFormValues>(
    () => ({
      uid: "",
      refreshToken: "",
      ...pick(spotifyCredentials, "uid", "refreshToken"),
    }),
    [spotifyCredentials],
  );
  const { getInputProps } =
    useForm<AccountEditPageSpotifyCredentialsFormValues>({
      initialValues: initialValues,
    });
  return (
    <form action="/account/auth/spotify" method="post">
      <FormAuthenticityField />
      <Stack spacing="xs">
        {!!uid && <TextInput label="UID" readOnly {...getInputProps("uid")} />}
        {!!refreshToken && (
          <TextInput
            label="Refresh Token"
            readOnly
            {...getInputProps("refreshToken")}
          />
        )}
        <Button type="submit">Authorize</Button>
      </Stack>
    </form>
  );
};

export default AccountEditPageSpotifyCredentialsForm;
