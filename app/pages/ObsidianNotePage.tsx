import type { FC, ReactNode } from "react";
import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import type { DeepRequired } from "~/helpers/utils";
import { useContactMe } from "~/helpers/contact";

import { Code, Text } from "@mantine/core";

import ObsidianNoteMarkdown from "~/components/ObsidianNoteContent";
import ObsidianNoteTag from "~/components/ObsidianNoteTag";
import ObsidianNotePageGraph from "~/components/ObsidianNotePageGraph";

import HiddenIcon from "~icons/heroicons/eye-slash-20-solid";
import DocumentIcon from "~icons/heroicons/document-20-solid";

import type {
  ObsidianNotePageNoteFragment,
  ObsidianNotePageQuery,
} from "~/helpers/graphql";

export type ObsidianNotePageProps = PagePropsWithData<
  DeepRequired<ObsidianNotePageQuery, ["note"]>
>;

const ObsidianNotePage: PageComponent<ObsidianNotePageProps> = ({
  data: { note },
}) => {
  const { id, name, title, tags, content, blurb, references } = note;
  useEffect(() => {
    if (isFSInitialized()) {
      setFSVars("page", {
        pageName: ObsidianNotePage.name,
        noteName: name,
      });
    }
  }, [name]);
  return (
    <>
      <Layout>
        <Stack spacing={4}>
          <Box>
            <Title
              size={28}
              weight={800}
              sx={({ fontFamilyMonospace }) => ({
                fontFamily: fontFamilyMonospace,
              })}
            >
              {title}
            </Title>

            {title !== name && (
              <Box mt={-2}>
                <Code>{name}</Code>
              </Box>
            )}
          </Box>
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
            <ObsidianNoteMarkdown {...{ references }}>
              {content}
            </ObsidianNoteMarkdown>
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
            {!!blurb && (
              <Box pos="relative">
                <Card withBorder>
                  <ObsidianNoteMarkdown {...{ references }}>
                    {blurb}
                  </ObsidianNoteMarkdown>
                </Card>
                <Center pos="absolute" left={0} top={-10} right={0}>
                  <Badge variant="filled" color="gray">
                    Summary
                  </Badge>
                </Center>
              </Box>
            )}
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
      </Layout>
      <ObsidianNotePageGraph noteId={id} />
    </>
  );
};

ObsidianNotePage.layout = buildLayout<ObsidianNotePageProps>(
  (page, { data: { viewer, note } }) => (
    <AppLayout title={note.title} padding={0} {...{ viewer }}>
      {page}
    </AppLayout>
  ),
);

export default ObsidianNotePage;

type LayoutProps = {
  readonly children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <MediaQuery
    largerThan="sm"
    styles={({ spacing }) => ({
      marginTop: spacing.xl,
    })}
  >
    <Container size="sm" w="100%" pt="sm">
      <Stack spacing="lg">{children}</Stack>
    </Container>
  </MediaQuery>
);

type RequestAccessButtonProps = {
  readonly note: ObsidianNotePageNoteFragment;
};

const RequestAccessButton: FC<RequestAccessButtonProps> = ({ note }) => {
  const [contactMe, { loading }] = useContactMe({
    subject: `I want to read what you wrote about ${note.title}!`,
  });
  return (
    <Button variant="outline" onClick={contactMe} {...{ loading }}>
      Request Access
    </Button>
  );
};
