import { type CardProps } from "@mantine/core";
import { Text } from "@mantine/core";

import EmptyIcon from "~icons/heroicons/inbox-20-solid";

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
  <Card withBorder py="lg" style={{ borderStyle: "dashed" }} {...otherProps}>
    <Flex direction="column" align="center">
      <Box c="gray.6" lh={1.1}>
        <EmptyIcon />
      </Box>
      <Text size="sm" c="dimmed">
        {children ?? <>No {itemLabel} to show</>}
      </Text>
    </Flex>
  </Card>
);

export default EmptyCard;
