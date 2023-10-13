import type { FC } from "react";
import { Text } from "@mantine/core";
import type { CardProps } from "@mantine/core";

import EmptyIcon from "~icons/heroicons/inbox-20-solid";

export type EmptyCardProps = Omit<CardProps, "children"> & {
  readonly itemLabel: string;
};

const EmptyCard: FC<EmptyCardProps> = ({ itemLabel, ...otherProps }) => (
  <Card withBorder py="lg" {...otherProps}>
    <Flex direction="column" align="center">
      <Box c="var(--mantine-color-gray-6)" lh={1.1}>
        <EmptyIcon />
      </Box>
      <Text size="sm" c="dimmed">
        No {itemLabel} to show
      </Text>
    </Flex>
  </Card>
);

export default EmptyCard;
