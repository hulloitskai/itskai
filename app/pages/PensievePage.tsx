import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import type { PensievePageQuery } from "~/helpers/graphql";
import { Text } from "@mantine/core";

import AppLayout from "~/components/AppLayout";

export type PensievePageProps = PagePropsWithData<PensievePageQuery>;

const PensievePage: PageComponent<PensievePageProps> = () => {
  return (
    <Stack>
      <Text>hi</Text>
    </Stack>
  );
};

PensievePage.layout = buildLayout<PensievePageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Pensieve"
      description="Sometimes, Kai thinks out loud."
      imageUrl="/pensieve-banner.png"
      breadcrumbs={[
        { title: "Home", href: "/" },
        { title: "Pensieve", href: "/pensieve" },
      ]}
      withContainer
      containerProps={{
        style: { flexGrow: 1, display: "flex", flexDirection: "column" },
      }}
      withGutter
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default PensievePage;
