import ImageInput from "./ImageInput";

export interface SettingsPageProfileFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SettingsPageProfileForm: FC<SettingsPageProfileFormProps> = ({
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
  const form = useInertiaForm({
    action: routes.usersRegistrations.update,
    method: "put",
    descriptor: "update profile",
    // mode: "uncontrolled",
    initialValues,
    transformValues: ({ avatar, ...attributes }) => ({
      user: {
        ...deepUnderscoreKeys(attributes),
        avatar: avatar ? avatar.signedId : "",
      },
    }),
  });
  const {
    getInputProps,
    isDirty,
    processing,
    reset,
    setInitialValues,
    submit,
  } = form;
  useEffect(() => {
    setInitialValues(initialValues);
    reset();
  }, [initialValues]); // eslint-disable-line react-hooks/exhaustive-deps
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
