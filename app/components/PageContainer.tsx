import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

import { getSize } from "@mantine/core";
import type { ContainerProps, MantineNumberSize } from "@mantine/core";

export type PageContainerProps = ContainerProps &
  ComponentPropsWithoutRef<"div"> & {
    readonly withGutter?: boolean;
    readonly gutterSize?: MantineNumberSize;
  };

const PageContainer: FC<PageContainerProps> = ({
  withGutter,
  gutterSize: gutterSizeProp,
  children,
  size: sizeProp,
  ...otherProps
}) => {
  const size = sizeProp || "sm";
  const theme = useMantineTheme();
  let content: ReactNode = children;
  content = (
    <Container
      className={PageContainer.name}
      p="md"
      w="100%"
      {...{ size }}
      {...otherProps}
    >
      {content}
    </Container>
  );
  if (withGutter) {
    const breakpoint = getSize({
      sizes: {
        xs: rem(540),
        sm: rem(720),
        md: rem(960),
        lg: rem(1140),
        xl: rem(1320),
      },
      size,
    });
    const gutterSize = getSize({
      sizes: theme.spacing,
      size: gutterSizeProp ?? "md",
    });
    const marginSize = `clamp(0px, calc((100vw - ${breakpoint}) / 2), ${gutterSize})`;
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

export default PageContainer;
