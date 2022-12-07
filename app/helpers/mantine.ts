import type { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  primaryColor: "dark",
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, " +
    "Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontFamilyMonospace:
    "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, " +
    "Liberation Mono, Courier New, monospace",
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
