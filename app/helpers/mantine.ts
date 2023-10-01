import {
  ActionIcon,
  Alert,
  Anchor,
  Button,
  DEFAULT_THEME,
  Loader,
  LoadingOverlay,
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

import classes from "./mantine.module.css";

export type CustomColors = "brand" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

export const APP_THEME = createTheme({
  colors: {
    brand: DEFAULT_THEME.colors.pink,
  },
  primaryColor: "brand",
  fontFamily:
    "Manrope, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, " +
    "Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
  fontFamilyMonospace:
    "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, " +
    "Liberation Mono, Courier New, monospace",
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
    Loader: Loader.extend({
      defaultProps: {
        color: "brand.5",
      },
    }),
    LoadingOverlay: LoadingOverlay.extend({
      defaultProps: {
        loaderProps: {
          size: "sm",
        },
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
});

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

export const EMAIL_THEME = mergeThemeOverrides(APP_THEME, EMAIL_THEME_OVERRIDE);
