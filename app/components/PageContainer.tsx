import type { ContainerProps, MantineSize } from "@mantine/core";
import { getSize, getSpacing } from "@mantine/core";

export interface PageContainerProps
  extends ContainerProps,
    Omit<ComponentPropsWithoutRef<"div">, "style"> {
  withGutter?: boolean;
  gutterSize?: MantineSize | (string & {}) | number;
}

const PageContainer: FC<PageContainerProps> = ({
  withGutter,
  gutterSize = "md",
  size = "md",
  style,
  children,
  ...otherProps
}) => {
  return (
    <Container
      p="md"
      w="100%"
      style={[
        style,
        withGutter
          ? () => {
              const sizeValue = getSize(size, "container-size");
              const gutterSizeValue = getSpacing(gutterSize);
              const margin = `clamp(0px, calc((100vw - ${sizeValue}) / 2), ${gutterSizeValue})`;
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
