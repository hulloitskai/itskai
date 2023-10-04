import type { FC } from "react";

import { Code, CopyButton, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import type { LocationAccessGrantCardGrantFragment } from "~/helpers/graphql";

import LocationAccessGrantDeleteActionIcon from "./LocationAccessGrantDeleteActionIcon";

import classes from "./LocationAccessGrantCard.module.css";

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
          <TimeAgo inherit c="gray.5" fw={500}>
            {expiresAt}
          </TimeAgo>
        </Text>
        <Text size="sm" c="dimmed" lh={1.4}>
          Password is{" "}
          <CopyButton value={password}>
            {({ copy, copied }) => (
              <Tooltip
                label={copied ? "Copied!" : "Click to copy"}
                color="dark"
                c="white"
                withArrow
              >
                <Code
                  color="brand"
                  onClick={copy}
                  ml={2}
                  className={classes.copyCode}
                  style={{
                    cursor: "pointer",
                    transition: "background 150ms ease",
                  }}
                  __vars={theme => {
                    return {
                      "--lagc-copy-code-bg": theme.variantColorResolver({
                        color: "brand",
                        variant: "filled",
                        theme,
                      }).hover,
                    };
                  }}
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
