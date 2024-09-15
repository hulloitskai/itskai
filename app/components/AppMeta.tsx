import { usePageVisibilityChange } from "~/helpers/page";

const APP_META_SITE_TYPE = "website";
const APP_META_SITE_NAME = "It's Kai";
const APP_META_SITE_DESCRIPTION =
  "Welcome to my little corner of the internet :)";
const APP_META_SITE_IMAGE = "/banner.png";
const APP_META_TITLE_SEPARATOR = "|";

export interface AppMetaProps {
  siteName?: string;
  title?: string | string[];
  description?: string | null;
  imageUrl?: string | null;
  noIndex?: boolean;
}

const transformMeta = (value: string): string => value.toLocaleLowerCase();

const AppMeta: FC<AppMetaProps> = ({
  description = APP_META_SITE_DESCRIPTION,
  imageUrl = APP_META_SITE_IMAGE,
  noIndex,
  siteName = APP_META_SITE_NAME,
  title: titleProp,
}) => {
  const pageVisible = usePageVisibilityChange("visible");
  const pageTitle = useMemo<string>(() => {
    const components = Array.isArray(titleProp) ? titleProp : [titleProp];
    return components
      .filter(component => !!component)
      .join(` ${APP_META_TITLE_SEPARATOR} `);
  }, [titleProp]);
  const siteTitle = useMemo<string>(
    () =>
      [pageTitle, siteName]
        .filter(component => !!component)
        .join(` ${APP_META_TITLE_SEPARATOR} `),
    [pageTitle, siteName],
  );
  const tabTitle = useMemo<string>(() => {
    let title = pageTitle;
    if (!pageVisible && !title && siteName === APP_META_SITE_NAME) {
      title = "🥺 come back";
    }
    return [title, siteName]
      .filter(component => !!component)
      .join(` ${APP_META_TITLE_SEPARATOR} `);
  }, [pageTitle, pageVisible, siteName]);

  return (
    <Head>
      <title>{transformMeta(tabTitle)}</title>
      {!!description && (
        <meta name="description" content={transformMeta(description)} />
      )}
      <meta property="og:site_name" content={transformMeta(siteName)} />
      <meta property="og:type" content={APP_META_SITE_TYPE} />
      {!!pageTitle && <meta property="og:title" content={pageTitle} />}
      {!!description && (
        <meta property="og:description" content={transformMeta(description)} />
      )}
      {!!imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={transformMeta(siteTitle)} />
      {!!description && (
        <meta name="twitter:description" content={transformMeta(description)} />
      )}
      {!!imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
};

export default AppMeta;
