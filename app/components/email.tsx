import type { ComponentPropsWithoutRef } from "react";

import type { BoxProps } from "@mantine/core";
import { Box } from "@mantine/core";

import type { ButtonProps as _ButtonProps } from "@react-email/components";
import { Button as _Button } from "@react-email/components";

import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import { Button as MantineButton } from "@mantine/core";

import type { TextProps as MantineTextProps } from "@mantine/core";
import { Text as MantineText } from "@mantine/core";

import type { AnchorProps } from "@mantine/core";
import { Anchor } from "@mantine/core";

import type { ContainerProps as _ContainerProps } from "@react-email/components";
import { Container as _Container } from "@react-email/components";

import type { ImgProps as _ImgProps } from "@react-email/components";
import { Img as _Img } from "@react-email/components";

import type { SectionProps as _SectionProps } from "@react-email/components";
import { Section as _Section } from "@react-email/components";

import type { RowProps as _RowProps } from "@react-email/components";
import { Row as _Row } from "@react-email/components";

import type { ColumnProps as _ColumnProps } from "@react-email/components";
import { Column as _Column } from "@react-email/components";

import type { TextProps as _TextProps } from "@react-email/components";
import { Text as _Text } from "@react-email/components";

import type { LinkProps as _LinkProps } from "@react-email/components";
import { Link as _Link } from "@react-email/components";

import { Heading as _Heading } from "@react-email/components";
type _HeadingProps = ComponentPropsWithoutRef<typeof _Heading>;

export type ContainerProps = Omit<_ContainerProps, "style"> & BoxProps;

export const Container = forwardRef<HTMLTableElement, ContainerProps>(
  ({ children, ...otherProps }, ref) => (
    <Box component={_Container} {...{ ref }} {...otherProps}>
      {children}
    </Box>
  ),
);

export type SectionProps = Omit<_SectionProps, "style"> & BoxProps;

export const Section = forwardRef<HTMLTableElement, SectionProps>(
  ({ children, ...otherProps }, ref) => (
    <Box component={_Section} {...{ ref }} {...otherProps}>
      {children}
    </Box>
  ),
);

export type RowProps = Omit<_RowProps, "style"> & BoxProps;

export const Row = forwardRef<HTMLTableElement, RowProps>(
  ({ children, ...otherProps }, ref) => (
    <Box component={_Row} {...{ ref }} {...otherProps}>
      {children}
    </Box>
  ),
);

export type ColumnProps = Omit<_ColumnProps, "style"> & BoxProps;

export const Column = forwardRef<HTMLTableCellElement, ColumnProps>(
  ({ children, ...otherProps }, ref) => (
    <Box component={_Column} {...{ ref }} {...otherProps}>
      {children}
    </Box>
  ),
);

export type TextProps = Omit<_TextProps, "style"> & MantineTextProps;

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, ...otherProps }, ref) => (
    <MantineText
      component={_Text}
      my={`${rem(4)} !important`}
      {...{ ref }}
      {...otherProps}
    >
      {children}
    </MantineText>
  ),
);

export type HeadingProps = Omit<
  _HeadingProps,
  "style" | "m" | "mx" | "my" | "mt" | "mr" | "mb" | "ml"
> &
  MantineTextProps;

export const Heading = forwardRef<HTMLParagraphElement, HeadingProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <MantineText
        component={_Heading}
        my="var(--mantine-spacing-xs !important"
        {...{ ref }}
        {...otherProps}
      >
        {children}
      </MantineText>
    );
  },
);

export type ImgProps = Omit<_ImgProps, "style"> & BoxProps;

export const Img = forwardRef<HTMLImageElement, ImgProps>(
  ({ children, ...otherProps }, ref) => (
    <Box component={_Img} {...{ ref }} {...otherProps}>
      {children}
    </Box>
  ),
);

export type ButtonProps = Omit<_ButtonProps, "style"> & MantineButtonProps;

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ children, ...otherProps }, ref) => (
    <MantineButton
      component={_Button}
      h="unset"
      px="var(--button-padding-x) !important"
      py="var(--mantine-spacing-xs) !important"
      my={`${rem(4)} !important`}
      {...{ ref }}
      {...otherProps}
    >
      {children}
    </MantineButton>
  ),
);

export type LinkProps = Omit<_LinkProps, "style"> & AnchorProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...otherProps }, ref) => (
    <Anchor
      component={_Link}
      my={`${rem(4)} !important`}
      {...{ ref }}
      {...otherProps}
    >
      {children}
    </Anchor>
  ),
);
