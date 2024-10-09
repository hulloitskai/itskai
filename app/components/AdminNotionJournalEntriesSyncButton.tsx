import { type ButtonProps } from "@mantine/core";

import NotionIcon from "~icons/basil/notion-solid";

import { type NotionJournalEntrySyncResults } from "~/types";

export interface AdminNotionJournalEntriesSyncButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick"> {}

const AdminNotionJournalEntriesSyncButton: FC<
  AdminNotionJournalEntriesSyncButtonProps
> = ({ children, ...otherProps }) => {
  const { processing, submit } = useFetchForm<{
    syncResults: NotionJournalEntrySyncResults;
  }>({
    action: routes.admin.syncNotionJournalEntries,
    descriptor: "sync Notion journal entries",
    onSuccess: ({ syncResults: { added, removed, updated } }) => {
      showSuccessNotice({
        title: "Notion journal entries synced",
        message: `${added} added, ${updated} updated, ${removed} removed.`,
      });
    },
  });
  return (
    <Button
      color="gray"
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
