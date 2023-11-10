import type { ComponentPropsWithoutRef, FC } from "react";
import type { BoxProps } from "@mantine/core";

import { useContactMe } from "~/helpers/contactMe";

import classes from "./ExplorationBadge.module.css";

export type ExplorationBadgeProps = BoxProps &
  Omit<ComponentPropsWithoutRef<"div">, "children"> & {
    readonly children: string;
  };

const ExplorationBadge: FC<ExplorationBadgeProps> = ({
  children,
  ...otherProps
}) => {
  const [contactMe, { loading }] = useContactMe({
    body: "i have some thoughts abt this:",
  });
  return (
    <Box pos="relative" {...otherProps}>
      <Tooltip
        label="Have some thoughts to share?"
        color="primary"
        c="var(--mantine-color-white)"
        withArrow
        openDelay={200}
      >
        <Badge
          variant="default"
          size="lg"
          fw={600}
          className={classes.badge}
          h="unset"
          py={4}
          styles={{
            root: {
              cursor: "pointer",
            },
            label: {
              whiteSpace: "unset",
              lineHeight: 1.4,
            },
          }}
          onClick={() => {
            contactMe({
              subject: `you mentioned you were exploring "${children}"`,
            });
          }}
        >
          {children}
        </Badge>
      </Tooltip>
      <LoadingOverlay
        loaderProps={{ size: "xs" }}
        overlayProps={{ radius: "lg" }}
        visible={loading}
      />
    </Box>
  );
};

export default ExplorationBadge;
