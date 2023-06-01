import type { FC } from "react";

import { TypographyStylesProvider, MantineProvider } from "@mantine/core";

import _Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkWikiLink from "remark-wiki-link";

import type {
  ObsidianNoteContentNoteReferenceFragment,
  ObsidianNoteContentReferenceFragment,
} from "~/helpers/graphql";

type ObsidianNoteContentProps = {
  readonly children: string;
  readonly references?: ReadonlyArray<ObsidianNoteContentReferenceFragment>;
};

const ObsidianNoteMarkdown: FC<ObsidianNoteContentProps> = ({
  children,
  references = [],
}) => {
  const referencesByName = useMemo(
    () => keyBy(references, "name"),
    [references],
  );
  return (
    <MantineProvider
      theme={{
        fontSizes: {
          md: rem(15),
        },
        headings: {
          sizes: {
            h1: { fontSize: rem(28), fontWeight: 800, lineHeight: 1.25 },
            h2: { fontSize: rem(24), fontWeight: 800, lineHeight: 1.3 },
            h3: { fontSize: rem(20), fontWeight: 800, lineHeight: 1.35 },
            h4: { fontSize: rem(16), fontWeight: 800, lineHeight: 1.4 },
            h5: { fontSize: rem(14), fontWeight: 800, lineHeight: 1.45 },
            h6: { fontSize: rem(13), fontWeight: 800, lineHeight: 1.5 },
          },
        },
      }}
      inherit
    >
      <TypographyStylesProvider
        sx={({ colors, fontFamilyMonospace, fontSizes, fn }) => ({
          fontFamily: `${fontFamilyMonospace}`,
          "> *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */":
            {
              marginTop: `0 !important`,
            },
          "> *:last-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */":
            {
              marginBottom: `0 !important`,
            },
          "h1, h2, h3, h4, h5, h6": {
            fontFamily: `${fontFamilyMonospace}`,
          },
          li: {
            margin: `0 !important`,
            "ul, ol": {
              marginBottom: 0,
            },
          },
          p: {
            whiteSpace: "pre-line",
          },
          a: {
            fontWeight: 600,
            "&[href]": {
              color: colors.indigo[fn.primaryShade()],
            },
            "&:not([href])": {
              cursor: "not-allowed",
            },
          },
          blockquote: {
            fontSize: fontSizes.md,
            paddingTop: 0,
            paddingBottom: 0,
          },
          "blockquote > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */":
            {
              marginTop: `0 !important`,
            },
          "blockquote > *:last-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */":
            {
              marginBottom: `0 !important`,
            },
        })}
      >
        <_Markdown
          remarkPlugins={[
            [remarkGfm, { singleTilde: false }],
            [
              remarkWikiLink,
              {
                pageResolver: (name: string) => {
                  const reference = referencesByName[name];
                  if (reference?.type === "ObsidianNote") {
                    return [reference];
                  }
                  return [];
                },
                hrefTemplate: (
                  reference?: ObsidianNoteContentNoteReferenceFragment,
                ) => {
                  if (reference) {
                    return reference.url;
                  }
                },
                aliasDivider: "|",
                wikiLinkClassName: "reference",
                newClassName: "stub",
              },
            ],
          ]}
          components={{
            a: ({ href, className, ...props }) => {
              if (href) {
                const classes = className?.split(" ") || [];
                const Component = classes.includes("reference") ? Link : "a";
                return (
                  <Component
                    {...{ href, className }}
                    {...(propsWithoutNode(props) as any)}
                  />
                );
              } else {
                return <a {...propsWithoutNode(props)} />;
              }
            },
          }}
          skipHtml
        >
          {children}
        </_Markdown>
      </TypographyStylesProvider>
    </MantineProvider>
  );
};

export default ObsidianNoteMarkdown;

const propsWithoutNode = <T extends object>(
  props: T,
): Pick<T, Exclude<keyof T, "node">> => {
  return omit(props, "node");
};
