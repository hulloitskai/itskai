import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";

import AvatarField from "./AvatarField";

import type {
  UploadInput,
  SettingsPageViewerFragment,
} from "~/helpers/graphql";
import { UpdateUserProfileMutationDocument } from "~/helpers/graphql";

export type SettingsPageProfileFormProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"form">, "children" | "onSubmit"> & {
    readonly viewer: SettingsPageViewerFragment;
  };

type SettingsPageProfileFormValues = {
  readonly name: string;
  readonly avatar: UploadInput | null;
};

const SettingsPageProfileForm: FC<SettingsPageProfileFormProps> = ({
  viewer,
  ...otherProps
}) => {
  // == Routing
  const router = useRouter();

  // == Form
  const initialValues = useMemo<SettingsPageProfileFormValues>(() => {
    const { name, avatar } = viewer;
    return {
      name,
      avatar: avatar ? { signedId: avatar.signedId } : null,
    };
  }, [viewer]);
  const { getInputProps, onSubmit, setErrors, isDirty, setValues, resetDirty } =
    useForm<SettingsPageProfileFormValues>({
      initialValues,
    });
  useDidUpdate(() => {
    setValues(initialValues);
    resetDirty(initialValues);
  }, [initialValues]);

  // == Profile Update
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
    <Box
      component="form"
      onSubmit={onSubmit(values => {
        updateProfile({
          variables: {
            input: {
              userId: viewer.id,
              ...values,
            },
          },
        });
      })}
      {...otherProps}
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
    </Box>
  );
};

export default SettingsPageProfileForm;
