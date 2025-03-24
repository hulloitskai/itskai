export interface AccountPageDeleteAccountFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const AccountPageDeleteAccountForm: FC<AccountPageDeleteAccountFormProps> = ({
  ...otherProps
}) => {
  // == Form
  const { submitting, submit } = useForm({
    action: routes.usersRegistrations.destroy,
    descriptor: "delete account",
    onSuccess: () => {
      router.visit(routes.home.show.path());
    },
  });

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Menu
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
            variant="outline"
            color="red"
            leftSection={<DeleteIcon />}
            loading={submitting}
            fullWidth
          >
            delete account
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item type="submit" color="red" leftSection={<AlertIcon />}>
            really delete?
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default AccountPageDeleteAccountForm;
