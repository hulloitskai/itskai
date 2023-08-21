import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import type { PensievePageQuery } from "~/helpers/graphql";

import Pensieve from "~/components/Pensieve";

export type PensievePageProps = PagePropsWithData<PensievePageQuery>;

const PensievePage: PageComponent<PensievePageProps> = () => (
  <Stack align="center" spacing="xs" sx={{ flexGrow: 1 }}>
    <Title order={2} size="h3">
      sometimes, kai thinks out loud.
    </Title>
    <Pensieve sx={{ flexGrow: 1 }} />
  </Stack>
);

PensievePage.layout = buildLayout<PensievePageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Pensieve"
      description="Sometimes, Kai thinks out loud."
      withContainer
      containerProps={{ sx: { flexGrow: 1 } }}
      withGutter
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default PensievePage;
