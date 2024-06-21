import type { ButtonProps } from "@mantine/core";
import SyncIcon from "~icons/heroicons/cloud-arrow-down-20-solid";

export interface AdminJournalEntriesSyncButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick"> {}

const AdminJournalEntriesSyncButton: FC<AdminJournalEntriesSyncButtonProps> = ({
  children,
  ...otherProps
}) => {
  const { submit, processing } = useFetchForm<{
    added: number;
    updated: number;
    removed: number;
  }>({
    action: routes.admin.syncJournalEntries,
    method: "post",
    descriptor: "sync journal entries",
    onSuccess: ({ added, removed, updated }) => {
      showNotice({
        title: "Journal entries synced",
        message: `${added} entries added, ${updated} entries updated, ${removed} entries removed.`,
      });
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
      {children ?? "Sync journal entries"}
    </Button>
  );
};

export default AdminJournalEntriesSyncButton;
