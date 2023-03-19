import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import type { ContainerProps } from "@mantine/core";

export type ContentContainerProps = ContainerProps &
  ComponentPropsWithoutRef<"div"> & {
    readonly withGutter?: boolean;
  };

const ContentContainer: FC<ContentContainerProps> = ({
  withGutter,
  children,
  size: sizeProp,
  ...otherProps
}) => {
  const theme = useMantineTheme();
  const size = sizeProp || "sm";
  let content: ReactNode = children;
  content = (
    <Container p="md" w="100%" {...{ size }} {...otherProps}>
      {content}
    </Container>
  );
  if (withGutter) {
    const { spacing, fn } = theme;
    const breakpoint = fn.size({
      sizes: {
        xs: 540,
        sm: 720,
        md: 960,
        lg: 1140,
        xl: 1320,
      },
      size,
    });
    const marginSize = `clamp(0px, calc((100vw - ${breakpoint}px) / 2 - ${spacing.md}px), ${spacing.md}px)`;
    content = (
      <MediaQuery
        largerThan={breakpoint}
        styles={{ marginTop: marginSize, marginBottom: marginSize }}
      >
        {content}
      </MediaQuery>
    );
  }
  return content;
};

export default ContentContainer;
