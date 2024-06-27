import type { Exploration } from "~/types";

import ExplorationCommentForm from "./ExplorationCommentForm";

import classes from "./ExplorationBadge.module.css";

export interface ExplorationBadgeProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  exploration: Exploration;
}

const ExplorationBadge: FC<ExplorationBadgeProps> = ({
  exploration,
  ...otherProps
}) => {
  // == Comment modal
  const openCommentModal = useCallback(() => {
    openModal({
      title: <>Your thoughts on: {exploration.label}</>,
      children: (
        <ExplorationCommentForm
          {...{ exploration }}
          onCommented={() => {
            closeAllModals();
          }}
        />
      ),
    });
  }, [exploration]);

  return (
    <Box pos="relative" {...otherProps}>
      <Tooltip
        label="Have some thoughts to share?"
        color="primary"
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
          onClick={openCommentModal}
        >
          {exploration.label}
        </Badge>
      </Tooltip>
    </Box>
  );
};

export default ExplorationBadge;
