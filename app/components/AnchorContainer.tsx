import { createPolymorphicComponent } from "@mantine/core";
import type { AnchorProps, MantineColor } from "@mantine/core";

export type AnchorContainerProps = AnchorProps & {
  readonly borderColor?: MantineColor;
};

const _AnchorContainer = forwardRef<HTMLAnchorElement, AnchorContainerProps>(
  ({ borderColor, sx, children, ...otherProps }, ref) => (
    <Anchor
      unstyled
      sx={[
        ...packSx(sx),
        ({ colors, primaryColor, colorScheme, fn }) => {
          const borderColors = colors[borderColor ?? primaryColor]!;
          const activeBorder = `${rem(1)} solid ${
            borderColors[fn.primaryShade()]
          }`;
          const inactiveBorder = `${rem(1)} solid ${
            colorScheme === "dark" ? colors.dark[4] : colors.gray[3]
          }`;
          return {
            "> *": {
              border: inactiveBorder,
              "&[data-with-border]": {
                border: inactiveBorder,
              },
              "&:hover": {
                textDecoration: "none",
                border: activeBorder,
                "&[data-with-border]": {
                  border: activeBorder,
                },
              },
            },
          };
        },
      ]}
      {...{ ref }}
      {...otherProps}
    >
      {children}
    </Anchor>
  ),
);

const AnchorContainer = createPolymorphicComponent<"a", AnchorContainerProps>(
  _AnchorContainer,
);

export default AnchorContainer;
