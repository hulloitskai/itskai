import type { BoxProps } from "@mantine/core";
import {
  ActionIcon,
  NumberFormatter,
  NumberInput,
  Popover,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import QueueingIcon from "~icons/heroicons/queue-list-20-solid";
import MoreIcon from "~icons/heroicons/ellipsis-vertical-20-solid";

export interface AdminLocationLogsBackfillAddressesButtonProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style"> {
  onBackfilling?: () => void;
}

const AdminLocationLogsBackfillAddressesButtons: FC<
  AdminLocationLogsBackfillAddressesButtonProps
> = ({ children, onBackfilling, ...otherProps }) => {
  const [popoverOpened, { open: openPopover, close: closePopover }] =
    useDisclosure(false);
  const initialValues = { limit: "" as number | "" };
  const { values, submit, processing, getInputProps } = useFetchForm<
    { logsQueued: number },
    typeof initialValues
  >({
    action: routes.admin.backfillLocationLogAddresses,
    method: "post",
    descriptor: "backfill location log addresses",
    onSuccess: ({ logsQueued }) => {
      closePopover();
      const goodJobUrl = new URL("/good_job/jobs", location.href);
      const goodJobParams = goodJobUrl.searchParams;
      goodJobParams.set("state", "queued");
      goodJobParams.set("job_class", "ReverseGeocodeLocationLogJob");
      goodJobParams.set("poll", "true");
      if (logsQueued > 0) {
        showNotice({
          title: (
            <>
              Started backfilling {logsQueued}{" "}
              {logsQueued === 1 ? "log" : "logs"}
            </>
          ),
          message: (
            <>
              <Anchor href={goodJobUrl.toString()} target="_blank" inherit>
                View progress on the GoodJob dashboard
              </Anchor>
              .
            </>
          ),
        });
      } else {
        showNotice({
          title: "No logs to backfill",
          message: "All location logs already have addresses.",
        });
      }
      onBackfilling?.();
    },
  });

  return (
    <Group gap={6} wrap="nowrap" {...otherProps}>
      <Button
        variant="default"
        loading={processing}
        leftSection={<QueueingIcon />}
        style={{ flexGrow: 1 }}
        onClick={() => {
          submit();
        }}
      >
        {children ?? "Backfill location log addresses"}
      </Button>
      <Popover
        withArrow
        position="left"
        width={275}
        shadow="lg"
        opened={popoverOpened}
        onOpen={openPopover}
        onClose={closePopover}
      >
        <Popover.Target>
          <ActionIcon variant="default" size="lg" onClick={openPopover}>
            <MoreIcon />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack gap={8}>
            <NumberInput
              {...getInputProps("limit")}
              placeholder="1000"
              step={1000}
              min={1000}
              thousandSeparator
            />
            <Button
              disabled={typeof values.limit !== "number"}
              loading={processing}
              onClick={() => {
                submit();
              }}
            >
              <Text inherit span>
                Backfill up to{" "}
                {typeof values.limit === "number" ? (
                  <NumberFormatter value={values.limit} thousandSeparator />
                ) : (
                  "..."
                )}{" "}
                logs
              </Text>
            </Button>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default AdminLocationLogsBackfillAddressesButtons;
