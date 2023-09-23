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
    styles={({ colors, fn }) => {
      const borderColor = colors.red[fn.primaryShade()];
      return {
        dropdown: {
          borderColor,
        },
        arrow: {
          borderColor,
        },
      };
    }}
  >
    <Menu.Target>
      <Button variant="default" leftIcon={<DeleteIcon />} {...otherProps}>
        {children}
      </Button>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item color="red" icon={<AlertIcon />} onClick={onConfirm}>
        Really delete?
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

export default DeleteButton;
