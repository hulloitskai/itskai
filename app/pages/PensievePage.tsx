import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import type { PensievePageQuery } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import PensieveRecordingCreateForm from "~/components/PensieveRecordingCreateForm";
import PensieveRecordingCard from "~/components/PensieveRecordingCard";

export type PensievePageProps = PagePropsWithData<PensievePageQuery>;

const PensievePage: PageComponent<PensievePageProps> = ({
  data: { viewer },
}) => {
  invariant(viewer, "Missing viewer");

  // == Routing
  const router = useRouter();

  return (
    <Stack gap="sm">
      <PensieveRecordingCreateForm
        onCreate={() => {
          router.reload({ preserveScroll: true });
        }}
      />
      {viewer.recordings.map(recording => (
        <PensieveRecordingCard key={recording.id} {...{ recording }} />
      ))}
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
      withGutter
      containerSize="xs"
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default PensievePage;
