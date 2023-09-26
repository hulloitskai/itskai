import type { ComponentPropsWithoutRef, FC } from "react";

import { getSize, getSpacing } from "@mantine/core";
import type { ContainerProps, MantineSize } from "@mantine/core";

export type PageContainerProps = ContainerProps &
  Omit<ComponentPropsWithoutRef<"div">, "style"> & {
    readonly withGutter?: boolean;
    readonly gutterSize?: MantineSize | (string & {}) | number;
  };

const PageContainer: FC<PageContainerProps> = ({
  withGutter,
  gutterSize: gutterSizeProp,
  size: sizeProp,
  style,
  children,
  ...otherProps
}) => {
  const size = sizeProp || "sm";
  return (
    <Container
      p="md"
      w="100%"
      style={[
        style,
        withGutter
          ? () => {
              const containerSize = getSize(size, "container-size");
              const gutterSize = getSpacing(gutterSizeProp ?? "md");
              const margin = `clamp(0px, calc((100vw - ${containerSize}) / 2), ${gutterSize})`;
              return {
                marginTop: margin,
                marginBottom: margin,
              };
            }
          : undefined,
      ]}
      {...{ size }}
      {...otherProps}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
