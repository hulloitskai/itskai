import { type ButtonProps } from "@mantine/core";

import { type OAuthConnection } from "~/types";

export interface AdminOAuthDisconnectButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "children"> {
  connection: OAuthConnection;
  onDisconnected?: () => void;
}

const AdminOAuthDisconnectButton: FC<AdminOAuthDisconnectButtonProps> = ({
  connection: { provider },
  onDisconnected: onDisconnected,
  ...otherProps
}) => {
  const { submitting, submit } = useForm({
    action: routes.adminOAuthConnections.destroy,
    params: { provider },
    descriptor: "remove connection",
    onSuccess: () => {
      onDisconnected?.();
    },
  });
  return (
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
          variant="subtle"
          color="red"
          leftSection={<DeactivateIcon />}
          loading={submitting}
          {...otherProps}
        >
          disconnect
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
          really disconnect?
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AdminOAuthDisconnectButton;
