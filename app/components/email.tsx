import type { ComponentPropsWithoutRef } from "react";
import { getRadius } from "@mantine/core";

import { Button as MantineButton } from "@mantine/core";

import type { ButtonProps as _ButtonProps } from "@react-email/components";
import { Button as _Button } from "@react-email/components";

import type { LinkProps as _LinkProps } from "@react-email/components";
import { Link as _Link } from "@react-email/components";

import type { TextProps as _TextProps } from "@react-email/components";
import { Text as _Text } from "@react-email/components";

import { Heading as _Heading } from "@react-email/components";

export interface ButtonProps extends _ButtonProps {}

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ style, children, ...props }, ref) => {
    const theme = useMantineTheme();
    const borderRadius = useMemo(
      () => getRadius(theme.components["Button"]?.defaultProps?.radius),
      [theme],
    );
    return (
      <_Button
        className={MantineButton.classes.root}
        style={{
          padding: "8px 14px",
          backgroundColor: "var(--mantine-color-primary-filled)",
          color: "var(--mantine-color-white)",
          fontWeight: 600,
          borderRadius,
          ...style,
        }}
        {...{ ref }}
        {...props}
      >
        {children}
      </_Button>
    );
  },
);

export interface LinkProps extends _LinkProps {}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <_Link
        style={{
          color: "var(--mantine-color-anchor)",
          fontSize: "14px",
          ...style,
        }}
        {...{ ref }}
        {...props}
      >
        {children}
      </_Link>
    );
  },
);

export interface TextProps extends _TextProps {}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ style, children, ...props }, ref) => {
    return (
      <_Text
        style={{
          margin: "8px 0",
          ...style,
        }}
        {...{ ref }}
        {...props}
      >
        {children}
      </_Text>
    );
  },
);

export type HeadingProps = ComponentPropsWithoutRef<typeof _Heading>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ style, children, ...props }, ref) => {
    const theme = useMantineTheme();
    const { sizes, ...headingStyle } = theme.headings;
    return (
      <_Heading
        style={{
          margin: "24px 0",
          ...headingStyle,
          ...sizes.h3,
          ...style,
        }}
        {...{ ref }}
        {...props}
      >
        {children}
      </_Heading>
    );
  },
);
