import { type ActionIconProps, type BoxProps } from "@mantine/core";
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
    Omit<ComponentPropsWithoutRef<"div">, "style">,
    Pick<ActionIconProps, "disabled"> {
  numLogsWithoutAddresses: number;
  onBackfilling?: () => void;
}

const AdminLocationLogsBackfillAddressesButtons: FC<
  AdminLocationLogsBackfillAddressesButtonProps
> = ({
  numLogsWithoutAddresses,
  disabled,
  children,
  onBackfilling,
  ...otherProps
}) => {
  const [popoverOpened, { close: closePopover, open: openPopover }] =
    useDisclosure(false);
  const initialValues = { limit: "" as number | "" };
  const { getInputProps, processing, submit, watch } = useFetchForm<
    { numLogsBackfilling: number },
    typeof initialValues
  >({
    action: routes.admin.backfillLocationLogAddresses,
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
  const [limit, setLimit] = useState<number | "">("");
  watch("limit", ({ value }) => {
    setLimit(value);
  });

  return (
    <Group gap={6} {...otherProps}>
      <Button
        color="gray"
        loading={processing}
        leftSection={<QueueingIcon />}
        style={{ flexGrow: 1 }}
        {...{ disabled }}
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
          <ActionIcon
            variant="light"
            color="gray"
            size="lg"
            {...{ disabled }}
            onClick={openPopover}
          >
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
              disabled={typeof limit !== "number"}
              loading={processing}
              onClick={() => {
                submit();
              }}
            >
              <Text inherit span>
                Backfill up to{" "}
                {typeof limit === "number" ? (
                  <NumberFormatter value={limit} thousandSeparator />
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
