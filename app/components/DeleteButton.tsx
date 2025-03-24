import { type ButtonProps } from "@mantine/core";

import classes from "./DeleteButton.module.css";

export interface DeleteButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style"> {
  onConfirm: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  children,
  onConfirm,
  ...otherProps
}) => (
  <Menu
    classNames={{
      dropdown: classes.menuDropdown,
      arrow: classes.menuArrow,
      itemLabel: classes.menuItemLabel,
    }}
  >
    <Menu.Target>
      <Button variant="default" leftSection={<DeleteIcon />} {...otherProps}>
        {children ?? "delete"}
      </Button>
    </Menu.Target>
    <Menu.Dropdown>
      <Menu.Item color="red" leftSection={<AlertIcon />} onClick={onConfirm}>
        really delete?
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);

export default DeleteButton;
