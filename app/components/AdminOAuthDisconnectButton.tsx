import type { ComponentPropsWithoutRef, FC } from "react";
import type { OAuthConnection } from "~/types";
import type { ButtonProps } from "@mantine/core";

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
  const { submit, processing } = useFetchForm({
    action: routes.adminOAuthConnections.destroy,
    params: { provider },
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
          variant="outline"
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

export default AdminOAuthDisconnectButton;
