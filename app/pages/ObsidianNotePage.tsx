import type { FC } from "react";
import type { PageComponent } from "~/helpers/inertia";
import invariant from "tiny-invariant";

import { Text, TypographyStylesProvider, MantineProvider } from "@mantine/core";
import type { Sx } from "@mantine/core";

import _Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkWikiLink from "remark-wiki-link";

import ObsidianNoteTag from "~/components/ObsidianNoteTag";

import HiddenIcon from "~icons/heroicons/eye-slash-20-solid";
import DocumentIcon from "~icons/heroicons/document-20-solid";

import { useContactMe } from "~/helpers/contactMe";
import type { DeepRequired } from "~/helpers/utils";

import type {
  ObsidianNotePageNoteFragment,
  ObsidianNotePageReferenceFragment,
  ObsidianNotePageQuery,
} from "~/queries";

export type ObsidianNotePageProps = {
  readonly data: DeepRequired<ObsidianNotePageQuery, ["note"]>;
};

const ObsidianNotePage: PageComponent<ObsidianNotePageProps> = ({
  data: { note },
}) => {
  const { name, tags, content, blurb, references } = note;
  const referencesByName = useMemo(
    () => keyBy(references, "name"),
    [references],
  );
  return (
    <MediaQuery
      largerThan="sm"
      styles={({ spacing }) => ({
        marginTop: spacing.xl,
      })}
    >
      <Stack spacing="lg">
        <Stack spacing={4}>
          <Title
            size={28}
            weight={800}
            sx={({ fontFamilyMonospace }) => ({
              fontFamily: fontFamilyMonospace,
            })}
          >
            {name}
          </Title>
          {!isEmpty(tags) && (
            <Group>
              {tags.map(tag => (
                <ObsidianNoteTag key={tag} size="sm">
                  {tag}
                </ObsidianNoteTag>
              ))}
            </Group>
          )}
        </Stack>
        {typeof content === "string" ? (
          content ? (
            <Markdown {...{ referencesByName }}>{content}</Markdown>
          ) : (
            <Alert
              color="gray"
              icon={<DocumentIcon />}
              title="Empty Entry"
              py="xl"
              styles={{
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                },
                body: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                },
                icon: { marginRight: 0 },
                title: { marginBottom: 4 },
              }}
            >
              <Stack align="center" spacing={6}>
                <Text size="md">
                  This entry is empty! What&apos;s up with that?
                </Text>
                <Button component={Link} href="/">
                  Back to Home
                </Button>
              </Stack>
            </Alert>
          )
        ) : (
          <Stack>
            {!!blurb && <Markdown {...{ referencesByName }}>{blurb}</Markdown>}
            <Alert
              color="gray"
              icon={<HiddenIcon />}
              title="Private Entry"
              py="xl"
              styles={{
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                },
                body: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                },
                icon: { marginRight: 0 },
                title: { marginBottom: 4 },
              }}
            >
              <Stack align="center" spacing="xs">
                <Text size="md">
                  This entry has private content that I can&apos;t share here.
                  This might change later on!
                </Text>
                <Group spacing="xs">
                  <Button component={Link} href="/">
                    Back to Home
                  </Button>
                  <RequestAccessButton {...{ note }} />
                </Group>
              </Stack>
            </Alert>
          </Stack>
        )}
      </Stack>
    </MediaQuery>
  );
};

ObsidianNotePage.layout = layoutWithData<ObsidianNotePageProps>(
  (page, { viewer }) => (
    <AppLayout
      withContainer
      containerProps={{ w: "100%", size: 682 }}
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default ObsidianNotePage;

type MarkdownProps = {
  readonly referencesByName: Record<string, ObsidianNotePageReferenceFragment>;
  readonly children: string;
};

const Markdown: FC<MarkdownProps> = ({ referencesByName, children }) => (
  <MantineProvider
    theme={{
      fontSizes: {
        md: 15,
      },
      headings: {
        sizes: {
          h1: { fontSize: 28, fontWeight: 800, lineHeight: 1.25 },
          h2: { fontSize: 24, fontWeight: 800, lineHeight: 1.3 },
          h3: { fontSize: 20, fontWeight: 800, lineHeight: 1.35 },
          h4: { fontSize: 16, fontWeight: 800, lineHeight: 1.4 },
          h5: { fontSize: 14, fontWeight: 800, lineHeight: 1.45 },
          h6: { fontSize: 13, fontWeight: 800, lineHeight: 1.5 },
        },
      },
    }}
    inherit
  >
    <TypographyStylesProvider
      sx={({ colors, fontFamilyMonospace, fn }) => ({
        fontFamily: `${fontFamilyMonospace}`,
        "> *:first-child": {
          marginTop: `0 !important`,
        },
        "> *:last-child": {
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
        "a[href]": {
          color: colors.indigo[fn.primaryShade()],
          fontWeight: 500,
        },
      })}
    >
      <_Markdown
        remarkPlugins={[
          remarkGfm,
          [
            remarkWikiLink,
            {
              aliasDivider: "|",
              pageResolver: (name: string) => {
                const reference = referencesByName[name];
                return reference && reference.type == "ObsidianNote"
                  ? [reference]
                  : [];
              },
              hrefTemplate: (reference?: ObsidianNotePageReferenceFragment) => {
                if (reference) {
                  invariant(reference.type === "ObsidianNote");
                  return reference.url;
                }
              },
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
                  {...(markdownElementProps(props) as any)}
                />
              );
            } else {
              return <a {...markdownElementProps(props)} />;
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

const markdownElementProps = <T extends object>(
  props: T,
): Pick<T, Exclude<keyof T, "node">> & { sx: Sx } => {
  return {
    ...omit(props, "node"),
    sx: ({ fontFamilyMonospace }) => ({
      fontFamily: fontFamilyMonospace,
    }),
  };
};

type RequestAccessButtonProps = {
  readonly note: ObsidianNotePageNoteFragment;
};

const RequestAccessButton: FC<RequestAccessButtonProps> = ({
  note: { name },
}) => {
  const [contactMe, { loading }] = useContactMe({
    subject: `I want to read what you wrote about ${name}!`,
  });
  return (
    <Button variant="outline" {...{ loading }} onClick={contactMe}>
      Request Access
    </Button>
  );
};
