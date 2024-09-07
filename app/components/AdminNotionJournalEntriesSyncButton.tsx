import type { NotionJournalEntrySyncResults } from "~/types";
import type { ButtonProps } from "@mantine/core";
import NotionIcon from "~icons/basil/notion-solid";

export interface AdminNotionJournalEntriesSyncButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick"> {}

const AdminNotionJournalEntriesSyncButton: FC<
  AdminNotionJournalEntriesSyncButtonProps
> = ({ children, ...otherProps }) => {
  const { submit, processing } = useFetchForm<{
    syncResults: NotionJournalEntrySyncResults;
  }>({
    action: routes.admin.syncNotionJournalEntries,
    method: "post",
    descriptor: "sync Notion journal entries",
    onSuccess: ({ syncResults: { added, removed, updated } }) => {
      showNotice({
        title: "Notion journal entries synced",
        message: `${added} added, ${updated} updated, ${removed} removed.`,
      });
    },
  });
  return (
    <Button
      variant="default"
      loading={processing}
      leftSection={<NotionIcon />}
      onClick={() => {
        submit();
      }}
      {...otherProps}
    >
      {children ?? "Sync Notion journal entries"}
    </Button>
  );
};

export default AdminNotionJournalEntriesSyncButton;
