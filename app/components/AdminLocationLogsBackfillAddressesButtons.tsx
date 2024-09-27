import { type BoxProps } from "@mantine/core";
import {
  ActionIcon,
  NumberFormatter,
  NumberInput,
  Popover,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import MoreIcon from "~icons/heroicons/ellipsis-vertical-20-solid";
import QueueingIcon from "~icons/heroicons/queue-list-20-solid";

export interface AdminLocationLogsBackfillAddressesButtonProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style"> {
  numLogsWithoutAddresses: number;
  onBackfilling?: () => void;
}

const AdminLocationLogsBackfillAddressesButtons: FC<
  AdminLocationLogsBackfillAddressesButtonProps
> = ({ children, numLogsWithoutAddresses, onBackfilling, ...otherProps }) => {
  const [popoverOpened, { close: closePopover, open: openPopover }] =
    useDisclosure(false);
  const initialValues = { limit: "" as number | "" };
  const { getInputProps, processing, submit, values } = useFetchForm<
    { numLogsBackfilling: number },
    typeof initialValues
  >({
    action: routes.admin.backfillLocationLogAddresses,
    method: "post",
    descriptor: "backfill location log addresses",
    initialValues,
    onSuccess: ({ numLogsBackfilling }) => {
      closePopover();
      const goodJobUrl = new URL("/good_job/jobs", location.href);
      const { searchParams } = goodJobUrl;
      searchParams.set("state", "queued");
      searchParams.set("job_class", "ReverseGeocodeLocationLogJob");
      searchParams.set("poll", "true");
      if (numLogsBackfilling > 0) {
        showSuccessNotice({
          title: (
            <>
              Started backfilling {numLogsBackfilling}{" "}
              {inflect("log", numLogsBackfilling)}
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
              min={Math.min(1000, numLogsWithoutAddresses)}
              max={numLogsWithoutAddresses}
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
            <Text size="xs" c="dimmed" style={{ alignSelf: "center" }}>
              ({numLogsWithoutAddresses} logs without addresses)
            </Text>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default AdminLocationLogsBackfillAddressesButtons;
