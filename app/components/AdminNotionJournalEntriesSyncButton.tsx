import type { ButtonProps } from "@mantine/core";
import NotionIcon from "~icons/basil/notion-solid";

export interface AdminNotionJournalEntriesSyncButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick"> {}

const AdminNotionJournalEntriesSyncButton: FC<
  AdminNotionJournalEntriesSyncButtonProps
> = ({ children, ...otherProps }) => {
  const { submit, processing } = useFetchForm<{
    added: number;
    updated: number;
    removed: number;
  }>({
    action: routes.admin.syncNotionJournalEntries,
    method: "post",
    descriptor: "sync Notion journal entries",
    onSuccess: ({ added, removed, updated }) => {
      showNotice({
        title: "Notion journal entries synced",
        message: `${added} entries added, ${updated} entries updated, ${removed} entries removed.`,
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
