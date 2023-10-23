import {
  ActionIcon,
  Alert,
  Anchor,
  Button,
  DEFAULT_THEME,
  Loader,
  LoadingOverlay,
  Menu,
  Modal,
  NumberInput,
  PasswordInput,
  Text,
  TextInput,
  Textarea,
  ThemeIcon,
  createTheme,
  mergeThemeOverrides,
} from "@mantine/core";
import type { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

import cx from "clsx";
import classes from "./mantine.module.css";

export type CustomColors = "primary" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

const BASE_THEME_OVERRIDE = createTheme({
  colors: {
    primary: DEFAULT_THEME.colors.pink,
  },
  primaryColor: "primary",
  fontFamily:
    "Manrope, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, " +
    "Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontFamilyMonospace:
    "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, " +
    "Liberation Mono, Courier New, monospace",
  headings: {
    fontFamily:
      "Manrope, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, " +
      "Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  },
  focusClassName: cx("mantine-focus-auto", classes.focus),
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "subtle",
      },
    }),
    Alert: Alert.extend({
      defaultProps: {
        radius: "md",
      },
      styles: {
        title: {
          fontWeight: 800,
        },
      },
    }),
    Button: Button.extend({
      defaultProps: {
        radius: "md",
      },
      classNames: {
        root: classes.button,
      },
      styles: {
        label: {
          fontWeight: 700,
        },
      },
    }),
    Card: Card.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Loader: Loader.extend({
      defaultProps: {
        color: "primary.5",
      },
    }),
    LoadingOverlay: LoadingOverlay.extend({
      defaultProps: {
        loaderProps: {
          size: "sm",
        },
      },
    }),
    Menu: Menu.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Modal: Modal.extend({
      styles: ({ headings: { sizes, ...style } }) => ({
        title: {
          ...sizes.h3,
          ...style,
        },
      }),
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: "md",
      },
    }),
    ThemeIcon: ThemeIcon.extend({
      defaultProps: {
        variant: "default",
      },
    }),
  },
  ...(import.meta.env.DEV && { respectReducedMotion: false }),
});

const APP_THEME_OVERRIDE = createTheme({
  components: {
    TextInput: TextInput.extend({
      styles: ({ fontSizes }) => ({
        input: {
          fontSize: fontSizes.md,
        },
      }),
    }),
  },
});

export const APP_THEME = mergeThemeOverrides(
  DEFAULT_THEME,
  BASE_THEME_OVERRIDE,
  APP_THEME_OVERRIDE,
);

const EMAIL_THEME_OVERRIDE = createTheme({
  components: {
    Text: Text.extend({
      defaultProps: {
        size: "sm",
      },
      classNames: {
        root: classes.emailText,
      },
    }),
    Anchor: Anchor.extend({
      defaultProps: {
        underline: "always",
      },
    }),
  },
});

export const EMAIL_THEME = mergeThemeOverrides(
  DEFAULT_THEME,
  BASE_THEME_OVERRIDE,
  EMAIL_THEME_OVERRIDE,
);
