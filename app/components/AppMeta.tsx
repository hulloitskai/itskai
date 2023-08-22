import type { FC } from "react";

const AppMetaSiteType = "website";
const AppMetaSiteName = "it's kai";
const AppMetaSiteDescription = "welcome to my little corner of the internet :)";
const AppMetaSiteImage = "/banner.png";
const AppMetaTitleSeparator = "|";

export type AppMetaProps = {
  readonly title?: string | string[];
  readonly description?: string | null;
  readonly imageUrl?: string | null;
  readonly noIndex?: boolean;
};

const AppMeta: FC<AppMetaProps> = ({
  title: titleProp,
  description = AppMetaSiteDescription,
  imageUrl = AppMetaSiteImage,
  noIndex,
}) => {
  const title = useMemo<string>(() => {
    return new Array(titleProp)
      .filter(component => !!component)
      .join(` ${AppMetaTitleSeparator}`);
  }, [titleProp]);
  const fullTitle = useMemo<string>(() => {
    return [title, AppMetaSiteName]
      .filter(component => !!component)
      .join(` ${AppMetaTitleSeparator} `);
  }, [title]);
  return (
    <Head>
      <title>{fullTitle}</title>
      {!!description && <meta name="description" content={description} />}
      <meta property="og:site_name" content={AppMetaSiteName} />
      <meta property="og:type" content={AppMetaSiteType} />
      <meta property="og:title" content={title} />
      {!!description && (
        <meta property="og:description" content={description} />
      )}
      {!!imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      {!!description && (
        <meta name="twitter:description" content={description} />
      )}
      {!!imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
};

export default AppMeta;
