import type { PageProps } from "@inertiajs/core";
import type { PageComponent } from "~/helpers/inertia";

import { Text } from "@mantine/core";

import PageContainer from "~/components/PageContainer";
import PageLayout from "~/components/PageLayout";

export type SenecaPageProps = PageProps;

const SenecaPage: PageComponent<SenecaPageProps> = () => {
  return (
    <PageContainer size="sm" withGutter>
      <Text>
        Hi Seneca
        <br />
        Thank u for everything
        <br />
        I&apos;m so sorry I hurt you.
      </Text>
    </PageContainer>
  );
};

SenecaPage.layout = page => (
  <PageLayout>
    <Head>
      <title>hi seneca</title>
      <meta name="robots" content="noindex" />
    </Head>
    {page}
  </PageLayout>
);

export default SenecaPage;
