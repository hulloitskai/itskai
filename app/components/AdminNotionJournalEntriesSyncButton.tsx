import { type ButtonProps } from "@mantine/core";

import NotionIcon from "~icons/basil/notion-solid";

import { type NotionJournalEntrySyncResults } from "~/types";

export interface AdminNotionJournalEntriesSyncButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"button">, "color" | "style" | "onClick"> {}

const AdminNotionJournalEntriesSyncButton: FC<
  AdminNotionJournalEntriesSyncButtonProps
> = ({ children, ...otherProps }) => {
  const { submitting, submit } = useForm<{
    syncResults: NotionJournalEntrySyncResults;
  }>({
    action: routes.adminNotionJournalEntries.sync,
    descriptor: "sync Notion journal entries",
    onSuccess: ({ syncResults: { added, removed, updated } }) => {
      toast.success("Notion journal entries synced", {
        description: `${added} added, ${updated} updated, ${removed} removed.`,
      });
    },
  });
  return (
    <Button
      color="gray"
      loading={submitting}
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
