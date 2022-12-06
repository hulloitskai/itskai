import type { FC } from "react";
import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import invariant from "tiny-invariant";

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
      <Stack spacing="xs">
        <Stack spacing={4}>
          <Title>{name}</Title>
          <Group>
            {tags.map(tag => (
              <ObsidianNoteTag key={tag} size="sm">
                {tag}
              </ObsidianNoteTag>
            ))}
          </Group>
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
    <AppLayout containerProps={{ w: "100%", size: 682 }} {...{ viewer }}>
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
      p: props => <Text {...markdownElementProps(props)} />,
      h1: props => <Title order={1} {...markdownElementProps(props)} />,
      h2: props => <Title order={2} {...markdownElementProps(props)} />,
      h3: props => <Title order={3} {...markdownElementProps(props)} />,
      h4: props => <Title order={4} {...markdownElementProps(props)} />,
      h5: props => <Title order={5} {...markdownElementProps(props)} />,
      h6: props => <Title order={6} {...markdownElementProps(props)} />,
      ul: props => (
        <List type="unordered" withPadding {...markdownElementProps(props)} />
      ),
      ol: props => (
        <List
          type="ordered"
          withPadding
          {...markdownElementProps(omit(props, "type"))}
        />
      ),
      li: props => <List.Item {...markdownElementProps(props)} />,
      a: ({ href, className, ...props }) => {
        if (href) {
          const classes = className?.split(" ") || [];
          return (
            <Anchor<any>
              component={classes.includes("reference") ? Link : "a"}
              color="indigo"
              {...{ href, className }}
              {...markdownElementProps(props)}
            />
          );
        } else {
          return <Anchor {...markdownElementProps(props)} />;
        }
      },
    }}
  >
    {children}
  </_Markdown>
);

const markdownElementProps = <T extends object>(
  props: T,
): Pick<T, Exclude<keyof T, "node">> => {
  return omit(props, "node");
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
