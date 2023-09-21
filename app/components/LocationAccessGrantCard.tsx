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
    sx={({ fn }) => ({
      "&[data-with-border]": {
        borderColor: fn.primaryColor(),
      },
    })}
    {...otherProps}
  >
    <Group align="start" noWrap>
      <Box sx={{ flexGrow: 1 }}>
        <Text weight={600} lh={1.4}>
          {recipient}
        </Text>
        <Text size="sm" color="dimmed" lh={1.4}>
          Created on{" "}
          <Time inherit format={DateTime.DATETIME_MED} color="gray.5" fw={500}>
            {createdAt}
          </Time>
        </Text>
        <Text size="sm" color="dimmed" lh={1.4}>
          Expires{" "}
          <Time
            inherit
            format={time => formatTimeAgo(time.toJSDate())}
            color="gray.5"
            fw={500}
          >
            {expiresAt}
          </Time>
        </Text>
        <Text size="sm" color="dimmed" lh={1.4}>
          Password is{" "}
          <CopyButton value={password}>
            {({ copy, copied }) => (
              <Tooltip
                label={copied ? "Copied" : "Click to copy"}
                color="brand"
                withArrow
              >
                <Code
                  color="brand"
                  onClick={copy}
                  sx={({ colors, fn }) => ({
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: fn.darken(colors.brand[5], 0.5),
                    },
                  })}
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
