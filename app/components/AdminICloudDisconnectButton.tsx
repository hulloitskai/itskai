import { type ButtonProps } from "@mantine/core";

export interface AdminICloudDisconnectButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "children"> {
  onDisconnected?: () => void;
}

const AdminICloudDisconnectButton: FC<AdminICloudDisconnectButtonProps> = ({
  onDisconnected: onDisconnected,
  ...otherProps
}) => {
  const { processing, submit } = useFetchForm({
    action: routes.adminICloudConnections.destroy,
    method: "delete",
    descriptor: "remove connection",
    onSuccess: () => {
      onDisconnected?.();
    },
  });
  return (
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
          leftSection={<DeactivateIcon />}
          loading={processing}
          {...otherProps}
        >
          Disconnect
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<AlertIcon />}
          onClick={() => {
            submit();
          }}
        >
          Really disconnect?
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AdminICloudDisconnectButton;
