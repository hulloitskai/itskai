import type { NotionJournalEntry } from "~/types";
import scrollIntoView from "scroll-into-view";

import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import NotionJournalEntryCard from "./NotionJournalEntryCard";

export interface HomePageJournalEntryProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  journalEntry: NotionJournalEntry;
  firstJournalEntryId: string;
  autoscroll: boolean;
}

const HomePageJournalEntry: FC<HomePageJournalEntryProps> = ({
  journalEntry,
  firstJournalEntryId,
  autoscroll,
  ...otherProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextEntryPath = useMemo(() => {
    return routes.home.show.path({
      query: {
        journalEntryId: journalEntry.nextJournalEntryId ?? firstJournalEntryId,
      },
    });
  }, [journalEntry.nextJournalEntryId, firstJournalEntryId]);

  // == Scrolling
  const scrollToContainerTop = useCallback(() => {
    if (containerRef.current) {
      const headerEl = document.querySelector(".mantine-AppShell-header");
      scrollIntoView(containerRef.current, {
        align: {
          top: 0,
          topOffset: (headerEl?.clientHeight ?? 0) + 20,
        },
      });
    }
  }, []);
  useEffect(() => {
    if (autoscroll) {
      scrollToContainerTop();
    }
  }, [journalEntry.id, autoscroll, scrollToContainerTop]);

  return (
    <Stack ref={containerRef} align="center" {...otherProps}>
      <NotionJournalEntryCard {...{ entry: journalEntry }} />
      <Button
        component={Link}
        href={nextEntryPath}
        preserveScroll
        only={["journalEntry", "firstJournalEntryId", "journalAutoscroll"]}
        variant="outline"
        leftSection={
          journalEntry.nextJournalEntryId ? <NextIcon /> : <ResetIcon />
        }
        radius="xl"
      >
        {journalEntry.nextJournalEntryId ? "more words pls" : "from the top!"}
      </Button>
    </Stack>
  );
};

export default HomePageJournalEntry;
