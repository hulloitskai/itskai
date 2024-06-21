import AvatarField from "./AvatarField";

export interface SettingsPageProfileFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SettingsPageProfileForm: FC<SettingsPageProfileFormProps> = ({
  ...otherProps
}) => {
  const authenticatedUser = useAuthenticatedUser();

  // == Form
  const initialValues = useMemo(() => {
    const { name, avatar } = authenticatedUser;
    return {
      name,
      avatar: avatar ? { signedId: avatar.signedId } : null,
    };
  }, [authenticatedUser]);
  const { getInputProps, submit, processing, setInitialValues, reset } =
    useInertiaForm({
      action: routes.usersRegistrations.update,
      method: "put",
      descriptor: "update profile",
      mode: "uncontrolled",
      initialValues,
      transformValues: ({ avatar, ...attributes }) => ({
        user: {
          ...deepUnderscoreKeys(attributes),
          avatar: avatar ? avatar.signedId : "",
        },
      }),
    });
  useEffect(() => {
    setInitialValues(initialValues);
    reset();
  }, [initialValues]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Stack gap="xs">
        <TextInput
          {...getInputProps("name")}
          label="Name"
          placeholder="A Friend"
          required
        />
        <AvatarField {...getInputProps("avatar")} label="Avatar" />
        <Button type="submit" loading={processing}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default SettingsPageProfileForm;
