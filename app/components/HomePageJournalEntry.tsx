import type { JournalEntry } from "~/types";
import scrollIntoView from "scroll-into-view";

import NextIcon from "~icons/heroicons/arrow-path-rounded-square-20-solid";
import ResetIcon from "~icons/heroicons/arrow-uturn-left-20-solid";

import JournalEntryCard from "./JournalEntryCard";

export interface HomePageJournalEntryProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  entry: JournalEntry;
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
        entryId: entry.nextEntryId || firstEntryId,
      },
    });
  }, [entry.nextEntryId, firstEntryId]);

  // == Scrolling
  const scrollToContainerTop = useCallback(() => {
    if (containerRef.current) {
      const headerEl = document.querySelector(".mantine-AppShell-header");
      console.log("IM GONNA DO IT");
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
  }, [entry.id, autoscroll, scrollToContainerTop]);

  return (
    <Stack ref={containerRef} align="center" {...otherProps}>
      <JournalEntryCard {...{ entry }} />
      <Button
        component={Link}
        href={nextEntryPath}
        preserveScroll
        only={["journalEntry", "autoscroll"]}
        variant="outline"
        leftSection={entry.nextEntryId ? <NextIcon /> : <ResetIcon />}
        radius="xl"
      >
        {entry.nextEntryId ? "more words pls" : "from the top!"}
      </Button>
    </Stack>
  );
};

export default HomePageJournalEntry;
