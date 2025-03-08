import {
  ActionIcon,
  Alert,
  Button,
  createTheme as createMantineTheme,
  DEFAULT_THEME,
  type DefaultMantineColor,
  Drawer,
  HoverCard,
  InputBase,
  JsonInput,
  Loader,
  type MantineColorsTuple,
  type MantineThemeOverride,
  Menu,
  Modal,
  NavLink,
  NumberInput,
  Overlay,
  PasswordInput,
  PinInput,
  Popover,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { type PopoverMiddlewares } from "@mantine/core/lib/components/Popover/Popover.types";

import { type Rect, useSafeViewportRect } from "./safeArea";

import classes from "./mantine.module.css";
import "./mantine.css";

export type CustomColors = "primary" | "accent" | "rose" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<CustomColors, MantineColorsTuple>;
  }
}

const ROSE_COLORS: MantineColorsTuple = [
  "oklch(0.969 0.015 12.422)",
  "oklch(0.941 0.03 12.58)",
  "oklch(0.892 0.058 10.001)",
  "oklch(0.81 0.117 11.638)",
  "oklch(0.712 0.194 13.428)",
  "oklch(0.645 0.246 16.439)",
  "oklch(0.586 0.253 17.585)",
  "oklch(0.514 0.222 16.935)",
  "oklch(0.455 0.188 13.697)",
  "oklch(0.41 0.159 10.272)",
];

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
      rose: ROSE_COLORS,
      primary: ROSE_COLORS,
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
      Card: Card.extend({
        classNames: {
          root: classes.card,
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
      HoverCard: HoverCard.extend({
        classNames: {
          dropdown: classes.dropdown,
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
      JsonInput: JsonInput.extend({
        defaultProps: {
          variant: "filled",
        },
        classNames: {
          input: classes.input,
        },
      }),
      Menu: Menu.extend({
        defaultProps: {
          withArrow: true,
        },
        classNames: {
          dropdown: classes.dropdown,
        },
      }),
      NavLink: NavLink.extend({
        classNames: {
          root: classes.navLink,
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
      Overlay: Overlay.extend({
        defaultProps: {
          blur: 2,
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
          withArrow: true,
          middlewares: floatingMiddlewares,
        },
      }),
      Tooltip: Tooltip.extend({
        defaultProps: {
          withArrow: true,
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
