import type { FC } from "react";

const AppMetaSiteName = "It's Kai";
const AppMetaSiteType = "website";
const AppMetaSiteDescription = "Welcome to my little corner of the internet :)";
const AppMetaTitleSeparator = "|";

export type AppMetaProps = {
  readonly title?: string | string[];
  readonly description?: string;
};

const AppMeta: FC<AppMetaProps> = ({
  title: titleProp,
  description = AppMetaSiteDescription,
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
      <meta name="description" content={description} />
      <meta property="og:site_name" content={AppMetaSiteName} />
      <meta property="og:type" content={AppMetaSiteType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/banner.png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/banner.png" />
    </Head>
  );
};

export default AppMeta;
