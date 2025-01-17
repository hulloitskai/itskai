import scrollIntoView from "scroll-into-view";

import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import { type NotionJournalEntry } from "~/types";

import NotionJournalEntryCard from "./NotionJournalEntryCard";

export interface HomePageJournalEntryProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  entry: NotionJournalEntry;
  firstEntryId: string;
  autoscroll: boolean;
}

const HomePageJournalEntry: FC<HomePageJournalEntryProps> = ({
  entry,
  firstEntryId,
  autoscroll,
  ...otherProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextEntryPath = useMemo(() => {
    return routes.home.show.path({
      query: {
        journal_entry_id: entry.next_entry_id ?? firstEntryId,
      },
    });
  }, [entry.next_entry_id, firstEntryId]);

  // == Scrolling
  const scrollToContainerTop = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      const headerEl = document.querySelector(".mantine-AppShell-header");
      scrollIntoView(container, {
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
  }, [entry.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stack ref={containerRef} align="center" {...otherProps}>
      <NotionJournalEntryCard {...{ entry }} onCopy={scrollToContainerTop} />
      <Button
        component={Link}
        href={nextEntryPath}
        preserveScroll
        only={[
          "journalEntry",
          "journalEntryPermalinked",
          "firstJournalEntryId",
        ]}
        leftSection={entry.next_entry_id ? <NextIcon /> : <ResetIcon />}
        radius="xl"
      >
        {entry.next_entry_id ? "more words pls" : "from the top!"}
      </Button>
    </Stack>
  );
};

export default HomePageJournalEntry;
