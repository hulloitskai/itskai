import { createPolymorphicComponent } from "@mantine/core";
import type { ComponentPropsWithRef } from "react";
import type { AnchorProps, MantineColor } from "@mantine/core";

import classes from "./AnchorContainer.module.css";

export interface AnchorContainerProps
  extends AnchorProps,
    Omit<ComponentPropsWithRef<"a">, "color" | "style"> {
  borderColor?: MantineColor;
}

const _AnchorContainer = forwardRef<HTMLAnchorElement, AnchorContainerProps>(
  (
    { borderColor, display = "contents", style, children, ...otherProps },
    ref,
  ) => (
    <Anchor
      unstyled
      className={classes.root}
      style={[
        style,
        theme => ({
          "--ac-inactive-border-color-light": "var(--mantine-color-gray-3)",
          "--ac-inactive-border-color-dark": "var(--mantine-color-dark-4)",
          "--ac-active-border-color": getThemeColor(
            borderColor ?? theme.primaryColor,
            theme,
          ),
        }),
      ]}
      {...{ ref, display }}
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
