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
  const {
    values,
    getInputProps,
    isDirty,
    submitting,
    reset,
    setInitialValues,
    submit,
  } = useFetchForm({
    name: "profile",
    action: routes.usersRegistrations.update,
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
      toastChangesSaved({ to: "your profile" });
      onProfileUpdated();
    },
  });
  useDidUpdate(() => {
    setInitialValues(initialValues);
    reset();
  }, [initialValues]); // eslint-disable-line react-hooks/exhaustive-deps
  const filled = useFieldsFilled(values, "name");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput {...getInputProps("name")} label="Name" required />
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
          loading={submitting}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default AccountPageProfileForm;
