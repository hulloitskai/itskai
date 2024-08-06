import type { ButtonProps } from "@mantine/core";

export interface DeleteButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style"> {
  onConfirm: () => void;
}

const DeleteButton: FC<DeleteButtonProps> = ({
  onConfirm,
  children,
  ...otherProps
}) => (
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
      <Button variant="default" leftSection={<DeleteIcon />} {...otherProps}>
        {children ?? "Delete"}
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
