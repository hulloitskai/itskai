import type { FC } from "react";

const JourneyAppMetaSiteType = "website";
const JourneyAppMetaSiteName = "Journeys";
const JourneyAppMetaSiteDescription = undefined; // "Welcome to my little corner of the internet :)";
const JourneyAppMetaSiteImage = undefined; // "/banner.png";
const JourneyAppMetaTitleSeparator = "|";

export type JourneysAppMetaProps = {
  readonly title?: string | string[];
  readonly description?: string | null;
  readonly imageUrl?: string | null;
  readonly noIndex?: boolean;
};

const JourneysAppMeta: FC<JourneysAppMetaProps> = ({
  title: titleProp,
  description = JourneyAppMetaSiteDescription,
  imageUrl = JourneyAppMetaSiteImage,
  noIndex,
}) => {
  const title = useMemo<string>(() => {
    const components = Array.isArray(titleProp) ? titleProp : [titleProp];
    return components
      .filter(component => !!component)
      .join(` ${JourneyAppMetaTitleSeparator} `);
  }, [titleProp]);
  const titleTag = useMemo<string>(
    () =>
      [title, JourneyAppMetaSiteName]
        .filter(component => !!component)
        .join(` ${JourneyAppMetaTitleSeparator} `),
    [title],
  );

  return (
    <Head>
      <title>{titleTag.toLowerCase()}</title>
      {!!description && (
        <meta name="description" content={description.toLowerCase()} />
      )}
      <meta
        property="og:site_name"
        content={JourneyAppMetaSiteName.toLowerCase()}
      />
      <meta property="og:type" content={JourneyAppMetaSiteType} />
      {!!title && <meta property="og:title" content={title} />}
      {!!description && (
        <meta property="og:description" content={description.toLowerCase()} />
      )}
      {!!imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={titleTag.toLowerCase()} />
      {!!description && (
        <meta name="twitter:description" content={description.toLowerCase()} />
      )}
      {!!imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
};

export default JourneysAppMeta;
