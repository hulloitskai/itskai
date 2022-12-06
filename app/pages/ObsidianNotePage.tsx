import type { FC } from "react";
import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";

import _Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkWikiLink from "remark-wiki-link";

import ObsidianNoteTag from "~/components/ObsidianNoteTag";

import LockIcon from "~icons/heroicons/lock-closed-20-solid";
import DocumentIcon from "~icons/heroicons/document-20-solid";

import type { DeepRequired } from "~/helpers/utils";
import type {
  ObsidianNotePageReferenceFragment,
  ObsidianNotePageQuery,
} from "~/queries";
import invariant from "tiny-invariant";

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
      {content ? (
        <Markdown {...{ referencesByName }}>{content}</Markdown>
      ) : blurb ? (
        <Stack>
          <Markdown {...{ referencesByName }}>{blurb}</Markdown>
          <Alert
            color="gray"
            icon={<LockIcon />}
            title="Access Denied"
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
                You don&apos;t have permission to read the full entry. Sorry
                about that!
              </Text>
              <Button component={Link} href="/">
                Back to Home
              </Button>
            </Stack>
          </Alert>
        </Stack>
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
              This entry has nothing in it! What&apos; up wit h that?
            </Text>
            <Button component={Link} href="/">
              Back to Home
            </Button>
          </Stack>
        </Alert>
      )}
    </Stack>
  );
};

ObsidianNotePage.layout = layoutWithData<ObsidianNotePageProps>(
  (page, { viewer }) => (
    <AppLayout containerProps={{ my: "xl", w: "100%" }} {...{ viewer }}>
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
      p: props => <Text {...props} />,
      a: ({ href, className, ...props }) => {
        const attributes = omit(props, "node") as unknown as any;
        if (href) {
          const classes = className?.split(" ") || [];
          return (
            <Anchor
              component={classes.includes("refernce") ? Link : "a"}
              color="indigo"
              {...{ href, className }}
              {...attributes}
            />
          );
        } else {
          return <Anchor {...attributes} />;
        }
      },
    }}
  >
    {children}
  </_Markdown>
);
