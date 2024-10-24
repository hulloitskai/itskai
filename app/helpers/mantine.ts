import {
  type DefaultMantineColor,
  Drawer,
  type MantineColorsTuple,
  NumberInput,
} from "@mantine/core";
import {
  ActionIcon,
  Alert,
  Button,
  createTheme,
  DEFAULT_THEME,
  Loader,
  Modal,
  Notification,
  PasswordInput,
  TextInput,
  ThemeIcon,
} from "@mantine/core";

import classes from "./mantine.module.css";

export type CustomColors = "primary" | "accent" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

export const THEME = createTheme({
  autoContrast: true,
  cursorType: "pointer",
  colors: {
    primary: DEFAULT_THEME.colors.pink,
    accent: DEFAULT_THEME.colors.teal,
    resumeAccent: DEFAULT_THEME.colors.indigo,
  },
  primaryColor: "primary",
  defaultRadius: "md",
  fontFamily:
    "Manrope Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, " +
    "Arial, sans-serif",
  fontFamilyMonospace:
    "JetBrains Mono Variable, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, " +
    "Liberation Mono, Courier New, monospace",
  headings: {
    fontFamily:
      "Manrope Variable, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, " +
      "Arial, sans-serif",
  },
  focusClassName: cn("mantine-focus-auto", classes.focus),
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "subtle",
      },
    }),
    Alert: Alert.extend({
      styles: {
        title: {
          fontWeight: 800,
        },
      },
    }),
    Button: Button.extend({
      defaultProps: { variant: "light" },
      classNames: {
        root: classes.button,
      },
    }),
    Drawer: Drawer.extend({
      classNames: {
        overlay: classes.overlay,
      },
    }),
    Group: Group.extend({
      defaultProps: {
        wrap: "nowrap",
      },
    }),
    Loader: Loader.extend({
      defaultProps: {
        size: "sm",
        color: "primary.5",
      },
    }),
    Modal: Modal.extend({
      styles: ({ headings: { sizes, ...style } }) => ({
        header: {
          alignItems: "start",
        },
        title: {
          ...sizes.h4,
          ...style,
        },
      }),
      classNames: {
        overlay: classes.overlay,
      },
    }),
    Notification: Notification.extend({
      styles: ({ lineHeights, spacing }) => ({
        title: {
          marginBottom: 0,
        },
        description: {
          lineHeight: lineHeights.xs,
        },
        icon: {
          backgroundColor: "transparent",
          color: "var(--notification-color)",
          marginInlineEnd: spacing.xs,
        },
      }),
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        variant: "filled",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        variant: "filled",
      },
      styles: ({ fontSizes }) => ({
        input: {
          fontSize: fontSizes.md,
        },
      }),
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        variant: "default",
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        variant: "filled",
      },
      styles: ({ fontSizes }) => ({
        input: {
          fontSize: fontSizes.md,
        },
      }),
    }),
  },
});
