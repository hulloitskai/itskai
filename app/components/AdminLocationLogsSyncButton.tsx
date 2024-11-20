import { type ButtonProps } from "@mantine/core";

import SyncIcon from "~icons/heroicons/cloud-arrow-down-20-solid";

export interface AdminLocationLogsSyncButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick"> {
  onSynced?: () => void;
}

const AdminLocationLogsSyncButton: FC<AdminLocationLogsSyncButtonProps> = ({
  children,
  onSynced,
  ...otherProps
}) => {
  const { processing, submit } = useFetchForm<{
    lastSyncedTimestamp: string;
  }>({
    action: routes.adminLocationLogs.sync,
    descriptor: "sync location logs",
    onSuccess: ({ lastSyncedTimestamp }) => {
      toast.success("Location logs synced", {
        description: (
          <>
            Last logged at:{" "}
            <Time format={DateTime.DATETIME_MED} inherit fw={600}>
              {lastSyncedTimestamp}
            </Time>
            .
          </>
        ),
      });
      onSynced?.();
    },
  });
  return (
    <Button
      color="gray"
      loading={processing}
      leftSection={<SyncIcon />}
      onClick={() => {
        submit();
      }}
      {...otherProps}
    >
      {children ?? "Sync location logs"}
    </Button>
  );
};

export default AdminLocationLogsSyncButton;
