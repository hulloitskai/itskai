import {
  DEFAULT_THEME,
  Loader,
  Modal,
  NumberInput,
  PasswordInput,
  ThemeIcon,
  createTheme,
} from "@mantine/core";
import type { DefaultMantineColor, MantineColorsTuple } from "@mantine/core";

export type CustomColor = "brand";

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<DefaultMantineColor | CustomColor, MantineColorsTuple>;
  }
}

export const THEME = createTheme({
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
      styles: {
        label: {
          fontWeight: 700,
        },
      },
    }),
    // Input: Input.extend({
    //   defaultProps: {
    //     radius: "md",
    //   },
    // }),
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
