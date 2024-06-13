import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";

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
  const {
    getInputProps,
    isDirty,
    submit,
    processing,
    setInitialValues,
    reset,
  } = useInertiaForm({
    action: routes.usersRegistrations.update,
    method: "put",
    descriptor: "update profile",
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
          label="Name"
          placeholder="A Friend"
          required
          {...getInputProps("name")}
        />
        <AvatarField label="Avatar" {...getInputProps("avatar")} />
        <Button type="submit" disabled={!isDirty()} loading={processing}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default SettingsPageProfileForm;
