import EmailLayout from "~/components/EmailLayout";
import PageLayout from "~/components/PageLayout";
import { PageType } from "~/helpers/inertia/page";

export const preparePage = <Props extends SharedPageProps>(
  page: PageComponent<Props>,
  type: PageType,
): void => {
  if (!page.layout) {
    if (type == PageType.Email) {
      page.layout = children => <EmailLayout>{children}</EmailLayout>;
    } else {
      page.layout = children => <PageLayout>{children}</PageLayout>;
    }
  }
};
