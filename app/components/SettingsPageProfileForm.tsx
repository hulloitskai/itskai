import { type User } from "~/types";

import ImageInput from "./ImageInput";

export interface SettingsPageProfileFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {
  onUpdated: () => void;
}

const SettingsPageProfileForm: FC<SettingsPageProfileFormProps> = ({
  onUpdated,
  ...otherProps
}) => {
  const authenticatedUser = useAuthenticatedUser();

  // == Form
  const initialValues = useMemo(() => {
    const { avatar, name } = authenticatedUser;
    return {
      name,
      avatar: avatar ? { signedId: avatar.signedId } : null,
    };
  }, [authenticatedUser]);
  const form = useFetchForm<{ user: User }, typeof initialValues>({
    action: routes.usersRegistrations.update,
    method: "put",
    descriptor: "update profile",
    initialValues,
    transformValues: ({ avatar, ...attributes }) => ({
      user: {
        ...underscoreKeys(attributes),
        avatar: avatar ? avatar.signedId : "",
      },
    }),
    onSuccess: ({ user }, { setInitialValues }) => {
      const { name, avatar } = user;
      setInitialValues({
        name,
        avatar: avatar ? { signedId: avatar.signedId } : null,
      });
      showChangesSavedNotice({ to: "your profile" });
      onUpdated();
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

export default SettingsPageProfileForm;
