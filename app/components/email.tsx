import {
  Button as MantineButton,
  type ButtonProps as MantineButtonProps,
  getRadius,
  useProps,
} from "@mantine/core";
import {
  type ButtonProps as _ButtonProps,
  type LinkProps as _LinkProps,
  type TextProps as _TextProps,
} from "@react-email/components";
import {
  Button as _Button,
  Heading as _Heading,
  Link as _Link,
  Text as _Text,
} from "@react-email/components";

export interface ButtonProps
  extends _ButtonProps,
    Pick<MantineButtonProps, "radius"> {}

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ children, style, ...props }, ref) => {
    const theme = useMantineTheme();
    const buttonProps = useProps(
      "Button",
      { radius: theme.defaultRadius },
      props,
    );
    const borderRadius = useMemo(
      () => getRadius(buttonProps.radius),
      [buttonProps],
    );
    return (
      <_Button
        {...{ ref }}
        className={MantineButton.classes.root}
        style={{
          padding: "8px 14px",
          backgroundColor: "var(--mantine-primary-color-filled)",
          color: "var(--mantine-color-white)",
          fontWeight: 600,
          borderRadius,
          ...style,
        }}
        {...props}
      >
        {children}
      </_Button>
    );
  },
);

export interface LinkProps extends _LinkProps {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <_Link
        {...{ ref }}
        style={{
          color: "var(--mantine-color-anchor)",
          fontSize: "14px",
          ...style,
        }}
        {...props}
      >
        {children}
      </_Link>
    );
  },
);

export interface TextProps extends _TextProps {}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <_Text {...{ ref }} style={{ margin: "8px 0", ...style }} {...props}>
        {children}
      </_Text>
    );
  },
);

export type HeadingProps = ComponentPropsWithoutRef<typeof _Heading>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, style, ...props }, ref) => {
    const theme = useMantineTheme();
    const { sizes, ...headingStyle } = theme.headings;
    return (
      <_Heading
        {...{ ref }}
        style={{
          margin: "24px 0",
          ...headingStyle,
          ...sizes.h3,
          ...style,
        }}
        {...props}
      >
        {children}
      </_Heading>
    );
  },
);
