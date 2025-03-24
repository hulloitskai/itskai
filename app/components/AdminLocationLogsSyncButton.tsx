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
  const { submitting, submit } = useForm<{
    lastSyncedTimestamp: string;
  }>({
    action: routes.adminLocationLogs.sync,
    descriptor: "sync location logs",
    onSuccess: ({ lastSyncedTimestamp }) => {
      toast.success("location logs synced", {
        description: (
          <>
            last logged at:{" "}
            <Time
              format={DateTime.DATETIME_MED}
              inherit
              fw={600}
              style={{ textTransform: "lowercase" }}
            >
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
      loading={submitting}
      leftSection={<SyncIcon />}
      onClick={() => {
        submit();
      }}
      {...otherProps}
    >
      {children ?? "sync location logs"}
    </Button>
  );
};

export default AdminLocationLogsSyncButton;
