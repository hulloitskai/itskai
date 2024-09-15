export interface SettingsPageDeleteAccountFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SettingsPageDeleteAccountForm: FC<SettingsPageDeleteAccountFormProps> = ({
  ...otherProps
}) => {
  const { processing, submit } = useInertiaForm({
    action: routes.usersRegistrations.destroy,
    method: "delete",
    descriptor: "delete account",
  });
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Menu
        withArrow
        withinPortal={false}
        styles={{
          dropdown: {
            borderColor: "var(--mantine-color-red-outline)",
          },
          arrow: {
            borderColor: "var(--mantine-color-red-outline)",
          },
        }}
      >
        <Menu.Target>
          <Button
            variant="default"
            leftSection={<DeleteIcon />}
            loading={processing}
            fullWidth
          >
            Delete account
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item type="submit" color="red" leftSection={<AlertIcon />}>
            Really delete?
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default SettingsPageDeleteAccountForm;
