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

  // == Form
  const initialValues = useMemo<UserSettingsPageProfileFormValues>(
    () => pick(viewer, "name"),
    [viewer],
  );
  const { getInputProps, onSubmit, setErrors, isDirty } =
    useForm<UserSettingsPageProfileFormValues>({
      initialValues,
    });

  // == Mutation
  const onError = useApolloErrorCallback("Failed to update profile");
  const [runMutation, { loading }] = useMutation(UserUpdateMutationDocument, {
    onCompleted: ({ payload: { user, errors } }) => {
      if (user) {
        router.reload({
          onSuccess: () => {
            showNotice({ message: "Profile updated successfully" });
          },
        });
      } else {
        invariant(errors);
        setErrors(formErrors(errors));
        showAlert({ message: "Failed to update profile" });
      }
    },
    onError,
  });

  // == Markup
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
        <Button type="submit" disabled={!isDirty()} {...{ loading }}>
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default UserSettingsPageProfileForm;
