import { Code, CopyButton, Text } from "@mantine/core";

import { type LocationAccessGrant } from "~/types";

import { type AdminLocationAccessGrantDeleteButtonProps } from "./AdminLocationAccessGrantDeleteButton";
import AdminLocationAccessGrantDeleteButton from "./AdminLocationAccessGrantDeleteButton";

import classes from "./AdminLocationAccessGrantCard.module.css";

export interface AdminLocationAccessGrantCardProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children">,
    Pick<AdminLocationAccessGrantDeleteButtonProps, "onGrantDeleted"> {
  grant: LocationAccessGrant;
  autocopy?: boolean;
}

const AdminLocationAccessGrantCard: FC<AdminLocationAccessGrantCardProps> = ({
  autocopy,
  grant,
  onGrantDeleted,
  ...otherProps
}) => {
  const [locateUrl, setLocateUrl] = useState("");
  useEffect(
    () => {
      const path = routes.locations.show.path({
        query: { password: grant.password },
      });
      const url = new URL(path, location.href);
      setLocateUrl(url.toString());
      if (autocopy) {
        showSuccessNotice({
          title: "Location access granted!",
          message: (
            <Stack gap={8}>
              <Text inherit>
                Access granted until{" "}
                <Time inherit format={DateTime.DATETIME_SHORT}>
                  {grant.expires_at}
                </Time>
              </Text>
              <Box>
                <CopyButton value={url.toString()}>
                  {({ copied, copy }) => (
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
        void navigator.clipboard.writeText(url.toString());
      }
    },
    [grant.password], // eslint-disable-line react-hooks/exhaustive-deps
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
            {grant.recipient}
          </Text>
          <Text size="sm" c="dimmed" lh={1.4}>
            Created on{" "}
            <Time inherit format={DateTime.DATETIME_MED} c="gray.5" fw={500}>
              {grant.created_at}
            </Time>
          </Text>
          <Text size="sm" c="dimmed" lh={1.4}>
            Expires{" "}
            <TimeAgo inherit c="gray.5" fw={500}>
              {grant.expires_at}
            </TimeAgo>
          </Text>
          <Text size="sm" c="dimmed" lh={1.4}>
            Password is{" "}
            <CopyButton value={grant.password}>
              {({ copied, copy }) => (
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
                    {grant.password}
                  </Code>
                </Tooltip>
              )}
            </CopyButton>
          </Text>
        </Box>
        <Group gap="xs" grow>
          <CopyButton value={locateUrl}>
            {({ copied, copy }) => (
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
          <AdminLocationAccessGrantDeleteButton
            grantId={grant.id}
            {...{ onGrantDeleted }}
          />
        </Group>
      </Stack>
    </Card>
  );
};

export default AdminLocationAccessGrantCard;
