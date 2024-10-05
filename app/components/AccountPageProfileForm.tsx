import { type User } from "~/types";

import ImageInput from "./ImageInput";

export interface AccountPageProfileFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onProfileUpdated: () => void;
}

const AccountPageProfileForm: FC<AccountPageProfileFormProps> = ({
  onProfileUpdated,
  ...otherProps
}) => {
  const authenticatedUser = useAuthenticatedUser();

  // == Form
  const initialValues = useMemo(() => {
    const { avatar, name } = authenticatedUser;
    return {
      name,
      avatar: avatar ? { signedId: avatar.signed_id } : null,
    };
  }, [authenticatedUser]);
  interface FormData {
    user: User;
  }
  const form = useFetchForm({
    action: routes.usersRegistrations.update,
    method: "put",
    descriptor: "update profile",
    initialValues,
    transformValues: ({ avatar, ...attributes }) => ({
      user: {
        ...attributes,
        avatar: avatar ? avatar.signedId : "",
      },
    }),
    onSuccess: ({ user }: FormData, { setInitialValues }) => {
      const { name, avatar } = user;
      setInitialValues({
        name,
        avatar: avatar ? { signedId: avatar.signed_id } : null,
      });
      showChangesSavedNotice({ to: "your profile" });
      onProfileUpdated();
    },
  });
  const {
    getInputProps,
    isDirty,
    processing,
    reset,
    setInitialValues,
    submit,
  } = form;
  useDidUpdate(() => {
    setInitialValues(initialValues);
    reset();
  }, [authenticatedUser]);
  const filled = useFieldsFilled(form, "name");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("name")}
          label="Name"
          placeholder="A Friend"
          required
        />
        <ImageInput
          {...getInputProps("avatar")}
          label="Avatar"
          w={140}
          radius={1000}
          center
        />
        <Button
          type="submit"
          leftSection={<SaveIcon />}
          disabled={!isDirty() || !filled}
          loading={processing}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default AccountPageProfileForm;
