import { type CardProps } from "@mantine/core";
import { Text } from "@mantine/core";

import EmptyIcon from "~icons/heroicons/inbox-20-solid";

import classes from "./EmptyCard.module.css";

export interface EmptyCardProps
  extends CardProps,
    Omit<ComponentPropsWithoutRef<"div">, "style"> {
  itemLabel: string;
}

const EmptyCard: FC<EmptyCardProps> = ({
  children,
  itemLabel,
  ...otherProps
}) => (
  <Card className={cn("EmptyCard", classes.card)} withBorder {...otherProps}>
    <Flex direction="column" align="center">
      <Box c="dimmed" lh={1.1}>
        <EmptyIcon />
      </Box>
      <Text size="sm" c="dimmed">
        {children ?? <>no {itemLabel} to show</>}
      </Text>
    </Flex>
  </Card>
);

export default EmptyCard;
