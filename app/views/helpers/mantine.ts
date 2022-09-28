import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  primaryColor: "dark",
  components: {
    ThemeIcon: {
      defaultProps: {
        variant: "default",
      },
    },
  },
};
