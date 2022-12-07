import type { FC } from "react";
import type { PageComponent } from "~/helpers/inertia";

import { Text } from "@mantine/core";

import ObsidianNoteMarkdown from "~/components/ObsidianNoteContent";
import ObsidianNoteTag from "~/components/ObsidianNoteTag";

import HiddenIcon from "~icons/heroicons/eye-slash-20-solid";
import DocumentIcon from "~icons/heroicons/document-20-solid";

import { useContactMe } from "~/helpers/contactMe";
import type { DeepRequired } from "~/helpers/utils";

import type {
  ObsidianNotePageNoteFragment,
  ObsidianNotePageQuery,
} from "~/queries";

export type ObsidianNotePageProps = {
  readonly data: DeepRequired<ObsidianNotePageQuery, ["note"]>;
};

const ObsidianNotePage: PageComponent<ObsidianNotePageProps> = ({
  data: { note },
}) => {
  const { name, tags, content, blurb, references } = note;
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
              <ObsidianNoteMarkdown {...{ references }}>
                {blurb}
              </ObsidianNoteMarkdown>
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
