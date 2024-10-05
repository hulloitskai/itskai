import scrollIntoView from "scroll-into-view";

import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import { type NotionJournalEntry } from "~/types";

import NotionJournalEntryCard from "./NotionJournalEntryCard";

export interface HomePageJournalEntryProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  journalEntry: NotionJournalEntry;
  firstJournalEntryId: string;
  autoscroll: boolean;
}

const HomePageJournalEntry: FC<HomePageJournalEntryProps> = ({
  autoscroll,
  firstJournalEntryId,
  journalEntry,
  ...otherProps
}) => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const nextEntryPath = useMemo(() => {
    return routes.home.show.path({
      query: {
        journal_entry_id:
          journalEntry.next_journal_entry_id ?? firstJournalEntryId,
      },
    });
  }, [journalEntry.next_journal_entry_id, firstJournalEntryId]);

  // == Scrolling
  const scrollToContainerTop = useCallback(() => {
    if (containerRef) {
      const headerEl = document.querySelector(".mantine-AppShell-header");
      scrollIntoView(containerRef, {
        align: {
          top: 0,
          topOffset: (headerEl?.clientHeight ?? 0) + 20,
        },
      });
    }
  }, [containerRef]);
  useEffect(() => {
    if (autoscroll) {
      scrollToContainerTop();
    }
  }, [journalEntry.id, autoscroll, scrollToContainerTop]);

  return (
    <Stack ref={setContainerRef} align="center" {...otherProps}>
      <NotionJournalEntryCard {...{ entry: journalEntry }} />
      <Button
        component={Link}
        href={nextEntryPath}
        preserveScroll
        only={["journalEntry", "firstJournalEntryId", "journalAutoscroll"]}
        leftSection={
          journalEntry.next_journal_entry_id ? <NextIcon /> : <ResetIcon />
        }
        radius="xl"
      >
        {journalEntry.next_journal_entry_id
          ? "more words pls"
          : "from the top!"}
      </Button>
    </Stack>
  );
};

export default HomePageJournalEntry;
