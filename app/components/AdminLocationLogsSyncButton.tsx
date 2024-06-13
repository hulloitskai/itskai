import type { ComponentPropsWithoutRef, FC } from "react";
import type { Location } from "~/types";
import type { ButtonProps } from "@mantine/core";
import SyncIcon from "~icons/heroicons/cloud-arrow-down-20-solid";

export interface AdminLocationLogsSyncButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick"> {
  onSynced?: (location: Location) => void;
}

const AdminLocationLogsSyncButton: FC<AdminLocationLogsSyncButtonProps> = ({
  children,
  onSynced,
  ...otherProps
}) => {
  const { submit, processing } = useFetchForm<{ location: Location }>({
    action: routes.admin.syncLocationLogs,
    method: "post",
    descriptor: "sync location logs",
    onSuccess: ({ location }) => {
      showNotice({
        title: "Location logs synced",
        message: (
          <>
            Last logged at:{" "}
            <Time format={DateTime.DATETIME_MED} inherit fw={600}>
              {location.timestamp}
            </Time>
            .
          </>
        ),
      });
      onSynced?.(location);
    },
  });
  return (
    <Button
      variant="default"
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
