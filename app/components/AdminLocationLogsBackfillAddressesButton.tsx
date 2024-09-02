import type { ButtonProps } from "@mantine/core";
import QueueingIcon from "~icons/heroicons/queue-list-20-solid";

export interface AdminLocationLogsBackfillAddressesButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick"> {
  onBackfilling?: () => void;
}

const AdminLocationLogsBackfillAddressesButton: FC<
  AdminLocationLogsBackfillAddressesButtonProps
> = ({ children, onBackfilling, ...otherProps }) => {
  const { submit, processing } = useFetchForm<{ logsQueued: number }>({
    action: routes.admin.backfillLocationLogAddresses,
    method: "post",
    descriptor: "backfill location log addresses",
    onSuccess: ({ logsQueued }) => {
      const goodJobUrl = new URL("/good_job/jobs", location.href);
      goodJobUrl.searchParams.set("state", "queued");
      goodJobUrl.searchParams.set("job_class", "ReverseGeocodeLocationLogJob");
      goodJobUrl.searchParams.set("poll", "true");
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
    <Button
      variant="default"
      loading={processing}
      leftSection={<QueueingIcon />}
      onClick={() => {
        submit();
      }}
      {...otherProps}
    >
      {children ?? "Backfill location log addresses"}
    </Button>
  );
};

export default AdminLocationLogsBackfillAddressesButton;
