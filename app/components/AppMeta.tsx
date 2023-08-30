import type { FC } from "react";

const AppMetaSiteType = "website";
const AppMetaSiteName = "It's Kai";
const AppMetaSiteDescription = "Welcome to my little corner of the internet :)";
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
      <title>{fullTitle.toLowerCase()}</title>
      {!!description && (
        <meta name="description" content={description.toLowerCase()} />
      )}
      <meta property="og:site_name" content={AppMetaSiteName.toLowerCase()} />
      <meta property="og:type" content={AppMetaSiteType} />
      <meta property="og:title" content={title} />
      {!!description && (
        <meta property="og:description" content={description.toLowerCase()} />
      )}
      {!!imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle.toLowerCase()} />
      {!!description && (
        <meta name="twitter:description" content={description.toLowerCase()} />
      )}
      {!!imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
};

export default AppMeta;
