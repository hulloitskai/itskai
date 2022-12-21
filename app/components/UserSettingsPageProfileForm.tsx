import type { FC } from "react";

import { UserUpdateMutationDocument } from "~/queries";
import type { UserSettingsPageViewerFragment } from "~/queries";

export type UserSettingsPageProfileFormValues = {
  readonly name: string;
};

export type UserSettingsPageProfileFormProps = {
  readonly viewer: UserSettingsPageViewerFragment;
};

const UserSettingsPageProfileForm: FC<UserSettingsPageProfileFormProps> = ({
  viewer,
}) => {
  const router = useRouter();
  const initialValues = useMemo<UserSettingsPageProfileFormValues>(
    () => pick(viewer, "name"),
    [viewer],
  );
  const { getInputProps, onSubmit, setErrors } =
    useForm<UserSettingsPageProfileFormValues>({
      initialValues,
    });
  const onError = useApolloErrorCallback("Failed to update account");
  const [runMutation, { loading }] = useMutation(UserUpdateMutationDocument, {
    onCompleted: ({ payload: { user, errors } }) => {
      if (user) {
        router.reload({
          onSuccess: () => {
            showNotice({ message: "Profile updated." });
          },
        });
      } else {
        invariant(errors);
        setErrors(formErrors(errors));
        showAlert({ message: "Failed to update profile." });
      }
    },
    onError,
  });
  return (
    <form
      onSubmit={onSubmit(values => {
        runMutation({ variables: { input: { ...values } } });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Name"
          placeholder="A Friend"
          required
          {...getInputProps("name")}
        />
        <Button type="submit" {...{ loading }}>
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default UserSettingsPageProfileForm;
