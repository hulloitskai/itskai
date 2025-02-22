import {
  type DefaultMantineColor,
  Drawer,
  InputBase,
  JsonInput,
  type MantineColorsTuple,
  type MantineThemeOverride,
  NumberInput,
  Overlay,
  PinInput,
  Popover,
} from "@mantine/core";
import {
  ActionIcon,
  Alert,
  Button,
  createTheme as createMantineTheme,
  DEFAULT_THEME,
  Loader,
  Modal,
  PasswordInput,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { type PopoverMiddlewares } from "@mantine/core/lib/components/Popover/Popover.types";

import { type Rect, useSafeViewportRect } from "./safeArea";

import classes from "./mantine.module.css";
import "./mantine.css";

export type CustomColors = "primary" | "accent" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

const createTheme = (
  safeViewportRect: Rect | undefined,
): MantineThemeOverride => {
  const floatingMiddlewares: PopoverMiddlewares = {
    shift: {
      rootBoundary: safeViewportRect,
    },
    flip: {
      rootBoundary: safeViewportRect,
    },
  };
  return createMantineTheme({
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
        styles: ({ headings: { sizes, ...style } }) => ({
          title: {
            ...sizes.h4,
            ...style,
          },
        }),
      }),
      Group: Group.extend({
        defaultProps: {
          wrap: "nowrap",
        },
      }),
      Loader: Loader.extend({
        defaultProps: {
          type: "dots",
          size: "sm",
          color: "primary.5",
        },
      }),
      Modal: Modal.extend({
        classNames: {
          inner: classes.modalInner,
        },
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
      Overlay: Overlay.extend({
        defaultProps: {
          blur: 2,
        },
      }),
      JsonInput: JsonInput.extend({
        defaultProps: {
          variant: "filled",
        },
        classNames: {
          input: classes.input,
        },
      }),
      NumberInput: NumberInput.extend({
        defaultProps: {
          variant: "filled",
        },
        classNames: {
          input: classes.input,
        },
      }),
      TextInput: TextInput.extend({
        defaultProps: {
          variant: "filled",
        },
        classNames: {
          input: classes.input,
        },
      }),
      Textarea: Textarea.extend({
        defaultProps: {
          variant: "filled",
        },
        classNames: {
          input: classes.input,
        },
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
        classNames: {
          input: classes.input,
        },
      }),
      Popover: Popover.extend({
        defaultProps: {
          middlewares: floatingMiddlewares,
        },
      }),
      Tooltip: Tooltip.extend({
        defaultProps: {
          middlewares: floatingMiddlewares,
        },
      }),
      InputBase: InputBase.extend({
        defaultProps: {
          variant: "filled",
        },
        classNames: {
          input: classes.input,
        },
      }),
      PinInput: PinInput.extend({
        classNames: {
          input: classes.input,
        },
      }),
    },
  });
};

export const useTheme = (): MantineThemeOverride => {
  const safeViewportRect = useSafeViewportRect();
  return useMemo(() => createTheme(safeViewportRect), [safeViewportRect]);
};
