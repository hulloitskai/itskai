import type { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";
import { DEFAULT_THEME } from "@mantine/core";
import {
  ActionIcon,
  Alert,
  Button,
  Loader,
  Modal,
  Notification,
  TextInput,
  ThemeIcon,
  createTheme,
} from "@mantine/core";

import cx from "clsx";
import classes from "./mantine.module.css";

export type CustomColors = "primary" | "accent" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

export const THEME = createTheme({
  autoContrast: true,
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
  focusClassName: cx("mantine-focus-auto", classes.focus),
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
      classNames: {
        root: classes.button,
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
    }),
    Notification: Notification.extend({
      styles: {
        description: {
          lineHeight: "var(--mantine-line-height-xs)",
        },
      },
    }),
    TextInput: TextInput.extend({
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
  },
});
