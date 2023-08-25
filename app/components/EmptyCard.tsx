import type { FC } from "react";
import { CardProps, Text } from "@mantine/core";

import EmptyIcon from "~icons/heroicons/inbox-20-solid";

export type EmptyCardProps = Omit<CardProps, "children"> & {
  readonly itemLabel: string;
};

const EmptyCard: FC<EmptyCardProps> = ({ itemLabel, ...otherProps }) => (
  <Card withBorder py="lg" {...otherProps}>
    <Flex direction="column" align="center">
      <Box sx={({ colors }) => ({ color: colors.gray[6], lineHeight: 1.1 })}>
        <EmptyIcon />
      </Box>
      <Text size="sm" color="dimmed">
        No {itemLabel} to show
      </Text>
    </Flex>
  </Card>
);

export default EmptyCard;
