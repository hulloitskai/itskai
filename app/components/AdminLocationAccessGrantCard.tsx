import type { LocationAccessGrant } from "~/types";

import { Code, CopyButton, Text } from "@mantine/core";

import type { AdminLocationAccessGrantDeleteButtonProps } from "./AdminLocationAccessGrantDeleteButton";
import AdminLocationAccessGrantDeleteButton from "./AdminLocationAccessGrantDeleteButton";

import classes from "./AdminLocationAccessGrantCard.module.css";

export interface AdminLocationAccessGrantCardProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children">,
    Pick<AdminLocationAccessGrantDeleteButtonProps, "onDeleted"> {
  grant: LocationAccessGrant;
  autocopy?: boolean;
}

const AdminLocationAccessGrantCard: FC<AdminLocationAccessGrantCardProps> = ({
  grant: {
    id: grantId,
    recipient,
    password,
    createdAt,
    expiresAt: expiresAtISO,
  },
  autocopy,
  onDeleted,
  ...otherProps
}) => {
  const [locateUrl, setLocateUrl] = useState("");
  const expiresAt = useParseDateTime(expiresAtISO);
  useEffect(
    () => {
      const path = routes.locations.show.path({ query: { password } });
      const url = new URL(path, window.location.href);
      setLocateUrl(url.toString());
      if (autocopy) {
        showNotice({
          title: "Location access granted!",
          message: (
            <Stack gap={8}>
              <Text inherit>
                Access granted until{" "}
                {expiresAt.toLocaleString(DateTime.DATETIME_SHORT)}.
              </Text>
              <Box>
                <CopyButton value={url.toString()}>
                  {({ copy, copied }) => (
                    <Button
                      leftSection={<ClipboardIcon />}
                      size="xs"
                      onClick={copy}
                    >
                      {copied ? "Copied!" : "Copy locate URL"}
                    </Button>
                  )}
                </CopyButton>
              </Box>
            </Stack>
          ),
        });
        navigator.clipboard.writeText(url.toString()).then(() => {});
      }
    },
    [password], // eslint-disable-line react-hooks/exhaustive-deps
  );
  return (
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
                  color="primary"
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
                disabled={!locateUrl}
                onClick={copy}
              >
                {copied ? "Copied!" : "Copy locate URL"}
              </Button>
            )}
          </CopyButton>
          <AdminLocationAccessGrantDeleteButton {...{ grantId, onDeleted }} />
        </Group>
      </Stack>
    </Card>
  );
};

export default AdminLocationAccessGrantCard;
