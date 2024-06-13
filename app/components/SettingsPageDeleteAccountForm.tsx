import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";

import FormAuthenticityField from "./FormAuthenticityField";

export interface SettingsPageDeleteAccountFormProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"form">, "style" | "children" | "onSubmit"> {}

const SettingsPageDeleteAccountForm: FC<SettingsPageDeleteAccountFormProps> = ({
  ...otherProps
}) => {
  return (
    <Box component="form" action="/signup" method="DELETE" {...otherProps}>
      <FormAuthenticityField />
      <Menu
        withArrow
        radius="md"
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
          <Button variant="default" leftSection={<DeleteIcon />}>
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
