export interface AccountPageDeleteAccountFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const AccountPageDeleteAccountForm: FC<AccountPageDeleteAccountFormProps> = ({
  ...otherProps
}) => {
  const { processing, submit } = useInertiaForm({
    action: routes.usersRegistrations.destroy,
    descriptor: "delete account",
  });
  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Menu
        withArrow
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
            variant="subtle"
            color="red"
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

export default AccountPageDeleteAccountForm;
