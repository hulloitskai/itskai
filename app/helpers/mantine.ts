import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  primaryColor: "dark",
  focusRingStyles: {
    styles: ({ colors, colorScheme }) => ({
      outlineOffset: 2,
      outlineStyle: "solid",
      outlineWidth: 1.5,
      outlineColor: colors.indigo[colorScheme === "dark" ? 7 : 5],
    }),
  },
  components: {
    Loader: {
      defaultProps: {
        color: "indigo",
      },
    },
    LoadingOverlay: {
      defaultProps: {
        loaderProps: {
          size: "sm",
        },
      },
    },
    ThemeIcon: {
      defaultProps: {
        variant: "default",
      },
    },
  },
};
