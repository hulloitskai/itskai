import type { PageComponent } from "~/helpers/inertia";
import type { PageProps } from "@inertiajs/core";
import { Text } from "@mantine/core";
import humanizeDuration from "humanize-duration";

import PageContainer from "~/components/PageContainer";

export type SenecaPageProps = PageProps & {
  readonly whenWeMet: string;
};

const SenecaPage: PageComponent<SenecaPageProps> = ({
  whenWeMet: whenWeMetISO,
}) => {
  const whenWeMet = useParseDateTime(whenWeMetISO);

  // == Since We Met
  const [millisecondsSinceWeMet, setMillisecondsSinceWeMet] = useState(
    whenWeMet.diffNow().milliseconds,
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setMillisecondsSinceWeMet(whenWeMet.diffNow().milliseconds);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <PageContainer size="sm" withGutter>
      <Text fw={500} style={{ textAlign: "center" }}>
        hi seneca
        <br />
        i&apos;ve known u for{" "}
        {humanizeDuration(millisecondsSinceWeMet, {
          largest: 5,
          round: true,
          conjunction: " and ",
        })}
        <br />
        ty for everything
        <br />
        you mean so much to me.
        <br />
        &lt;3
      </Text>
    </PageContainer>
  );
};

export default SenecaPage;
