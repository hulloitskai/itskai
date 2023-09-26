import type { ComponentPropsWithoutRef, FC } from "react";
import type { ButtonProps } from "@mantine/core";

export type DeleteButtonProps = ButtonProps &
  ComponentPropsWithoutRef<"button"> & {
    readonly onConfirm: () => void;
  };

const DeleteButton: FC<DeleteButtonProps> = ({
  onConfirm,
  children,
  ...otherProps
}) => (
  <Menu
    withArrow
    radius="md"
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
      <Button variant="default" leftSection={<DeleteIcon />} {...otherProps}>
        {children}
      </Button>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item color="red" leftSection={<AlertIcon />} onClick={onConfirm}>
        Really delete?
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

export default DeleteButton;
