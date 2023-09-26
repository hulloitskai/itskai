import type { FC } from "react";
import { format as formatTimeAgo } from "timeago.js";

import { Code, CopyButton, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import type { LocationAccessGrantCardGrantFragment } from "~/helpers/graphql";
import LocationAccessGrantDeleteActionIcon from "./LocationAccessGrantDeleteActionIcon";

export type LocationAccessGrantCardProps = Omit<BoxProps, "children"> & {
  readonly grant: LocationAccessGrantCardGrantFragment;
  readonly onDeleteGrant: () => void;
};

const LocationAccessGrantCard: FC<LocationAccessGrantCardProps> = ({
  grant: { id: grantId, recipient, password, createdAt, expiresAt },
  onDeleteGrant,
  ...otherProps
}) => (
  <Card
    withBorder
    padding="sm"
    radius="md"
    style={{
      borderColor: "var(--mantine-primary-color-filled)",
    }}
    {...otherProps}
  >
    <Group align="start" wrap="nowrap">
      <Box style={{ flexGrow: 1 }}>
        <Text fw={600} lh={1.4}>
          {recipient}
        </Text>
        <Text size="sm" c="dimmed" lh={1.4}>
          Created on{" "}
          <Time inherit format={DateTime.DATETIME_MED} c="gray.5" fw={500}>
            {createdAt}
          </Time>
        </Text>
        <Text size="sm" c="dimmed" lh={1.4}>
          Expires{" "}
          <Time
            inherit
            format={time => formatTimeAgo(time.toJSDate())}
            c="gray.5"
            fw={500}
          >
            {expiresAt}
          </Time>
        </Text>
        <Text size="sm" c="dimmed" lh={1.4}>
          Password is{" "}
          <CopyButton value={password}>
            {({ copy, copied }) => (
              <Tooltip
                label={copied ? "Copied" : "Click to copy"}
                c="brand"
                withArrow
              >
                <Code
                  c="brand"
                  onClick={copy}
                  // style={({ colors, fn }) => ({
                  //   cursor: "pointer",
                  //   "&:hover": {
                  //     backgroundColor: fn.darken(colors.brand[5], 0.5),
                  //   },
                  // })}
                >
                  {password}
                </Code>
              </Tooltip>
            )}
          </CopyButton>
        </Text>
      </Box>
      <LocationAccessGrantDeleteActionIcon
        onDelete={onDeleteGrant}
        {...{ grantId }}
      />
    </Group>
  </Card>
);

export default LocationAccessGrantCard;
