import type { FC } from "react";

import { UpdateUserProfileMutationDocument } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type {
  UploadInput,
  UserSettingsPageViewerFragment,
} from "~/helpers/graphql";

import AvatarField from "./AvatarField";

export type UserSettingsPageProfileFormValues = {
  readonly name: string;
  readonly avatar: Maybe<UploadInput>;
};

export type UserSettingsPageProfileFormProps = {
  readonly viewer: UserSettingsPageViewerFragment;
};

const UserSettingsPageProfileForm: FC<UserSettingsPageProfileFormProps> = ({
  viewer,
}) => {
  const router = useRouter();

  // == Form
  const initialValues = useMemo<UserSettingsPageProfileFormValues>(() => {
    const { name, avatar } = viewer;
    return {
      name,
      avatar: avatar ? { signedId: avatar.signedId } : null,
    };
  }, [viewer]);
  const { getInputProps, onSubmit, setErrors, isDirty, setValues, resetDirty } =
    useForm<UserSettingsPageProfileFormValues>({
      initialValues,
    });
  useDidUpdate(() => {
    setValues(initialValues);
    resetDirty(initialValues);
  }, [initialValues]);

  // == Updating Profile
  const onUpdateProfileError = useApolloAlertCallback(
    "Failed to update profile",
  );
  const [updateProfile, { loading: updatingProfile }] = useMutation(
    UpdateUserProfileMutationDocument,
    {
      onCompleted: ({ payload: { user, errors } }) => {
        if (user) {
          router.reload({
            onSuccess: () => {
              showNotice({ message: "Profile updated successfully." });
            },
          });
        } else {
          invariant(errors, "Missing input errors");
          const formErrors = buildFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Couldn't update profile");
        }
      },
      onError: onUpdateProfileError,
    },
  );

  return (
    <form
      onSubmit={onSubmit(values => {
        updateProfile({
          variables: {
            input: values,
          },
        });
      })}
    >
      <Stack gap="xs">
        <TextInput
          label="Name"
          placeholder="A Friend"
          required
          {...getInputProps("name")}
        />
        <AvatarField label="Avatar" {...getInputProps("avatar")} />
        <Button type="submit" disabled={!isDirty()} loading={updatingProfile}>
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default UserSettingsPageProfileForm;
