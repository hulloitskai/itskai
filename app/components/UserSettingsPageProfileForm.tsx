import type { FC } from "react";

import { UpdateUserProfileMutationDocument } from "~/helpers/graphql";
import type { UserSettingsPageViewerFragment } from "~/helpers/graphql";

import AvatarField from "./AvatarField";

export type UserSettingsPageProfileFormValues = {
  readonly name: string;
  readonly avatar: string | null;
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
      avatar: avatar ? avatar.signedId : null,
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

  // == Mutation
  const onError = useApolloAlertCallback("Failed to update profile");
  const [runMutation, { loading }] = useMutation(
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
          const formErrors = parseFormErrors(errors);
          setErrors(formErrors);
          showFormErrorsAlert(formErrors, "Could not update profile");
        }
      },
      onError,
    },
  );

  // == Markup
  return (
    <form
      onSubmit={onSubmit(values => {
        runMutation({
          variables: {
            input: { ...values },
          },
        });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Name"
          placeholder="A Friend"
          required
          {...getInputProps("name")}
        />
        <AvatarField label="Avatar" {...getInputProps("avatar")} />
        <Button type="submit" disabled={!isDirty()} {...{ loading }}>
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default UserSettingsPageProfileForm;
