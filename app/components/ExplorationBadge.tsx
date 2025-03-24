import { type Exploration } from "~/types";

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
      title: <>your thoughts on: {exploration.label}</>,
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
        label="have some thoughts to share?"
        color="primary"
        openDelay={200}
      >
        <Badge
          variant="default"
          size="lg"
          className={classes.badge}
          onClick={openCommentModal}
        >
          {exploration.label}
        </Badge>
      </Tooltip>
    </Box>
  );
};

export default ExplorationBadge;
