import type { FC } from "react";

import { Code, CopyButton, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import type { LocationAccessGrantCardGrantFragment } from "~/helpers/graphql";

import classes from "./LocationAccessGrantCard.module.css";
import LocationAccessGrantDeleteButton from "./LocationAccessGrantDeleteButton";

export type LocationAccessGrantCardProps = Omit<BoxProps, "children"> & {
  readonly grant: LocationAccessGrantCardGrantFragment;
  readonly onDeleteGrant: () => void;
};

const LocationAccessGrantCard: FC<LocationAccessGrantCardProps> = ({
  grant: { id: grantId, recipient, password, createdAt, expiresAt, locateUrl },
  onDeleteGrant,
  ...otherProps
}) => (
  <Card
    withBorder
    padding="sm"
    style={{
      borderColor: "var(--mantine-color-primary-filled)",
    }}
    {...otherProps}
  >
    <Stack gap="xs">
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
                c="var(--mantine-color-white)"
                withArrow
                {...(copied && { opened: true })}
              >
                <Code
                  color="primary"
                  onClick={copy}
                  ml={2}
                  className={classes.copyCode}
                  style={theme => ({
                    "--lagc-copy-code-bg": theme.variantColorResolver({
                      color: "primary",
                      variant: "filled",
                      theme,
                    }).hover,
                  })}
                >
                  {password}
                </Code>
              </Tooltip>
            )}
          </CopyButton>
        </Text>
      </Box>
      <Group gap="xs" wrap="nowrap" grow>
        <CopyButton value={locateUrl}>
          {({ copy, copied }) => (
            <Button
              variant="default"
              leftSection={<ClipboardIcon />}
              onClick={copy}
            >
              {copied ? "Copied!" : "Copy locate URL"}
            </Button>
          )}
        </CopyButton>
        <LocationAccessGrantDeleteButton
          onDelete={onDeleteGrant}
          {...{ grantId }}
        />
      </Group>
    </Stack>
  </Card>
);

export default LocationAccessGrantCard;
