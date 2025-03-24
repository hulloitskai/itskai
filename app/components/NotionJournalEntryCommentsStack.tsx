import { RenderText } from "@9gustin/react-notion-render";
import { ActionIcon, Text } from "@mantine/core";

import CommentIcon from "~icons/heroicons/chat-bubble-bottom-center-text-20-solid";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";

import { type NotionComment } from "~/types";

import classes from "./NotionJournalEntryCommentsStack.module.css";

export interface NotionJournalEntryCommentsStackProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  entryId: string;
}

const NotionJournalEntryCommentsStack: FC<
  NotionJournalEntryCommentsStackProps
> = ({ entryId, ...otherProps }) => {
  // == Load comments
  const {
    data: commentsData,
    fetching: commentsFetching,
    mutate: mutateComments,
  } = useRouteSWR<{
    comments: NotionComment[];
  }>(routes.notionJournalEntryComments.index, {
    descriptor: "load comments",
    params: {
      entry_id: entryId,
    },
  });
  const { comments } = commentsData ?? {};

  // == Create comment
  const { getInputProps, submit, submitting } = useForm({
    action: routes.notionJournalEntryComments.create,
    params: {
      entry_id: entryId,
    },
    descriptor: "create comment",
    initialValues: { text: "" },
    transformValues: values => ({ comment: values }),
    onSuccess: () => {
      void mutateComments();
    },
  });

  return (
    <Stack gap={6} {...otherProps}>
      {!commentsFetching && comments ? (
        comments.map(comment => (
          <Group
            key={comment.id}
            align="start"
            gap={8}
            fz="sm"
            className={classes.comment}
          >
            <Box component={CommentIcon} mt={2} />
            <Box style={{ flex: 1 }}>
              <Stack gap={4} lh={1.5}>
                {comment.rich_text.map((props: any, index: number) => (
                  <RenderText key={index} {...props} />
                ))}
              </Stack>
              <Box>
                <TimeAgo size="xs" c="dimmed" lh={1.3}>
                  {comment.created_at}
                </TimeAgo>
              </Box>
            </Box>
          </Group>
        ))
      ) : (
        <Skeleton h={40} />
      )}
      <form onSubmit={submit}>
        <TextInput
          {...getInputProps("text")}
          className={classes.textInput}
          variant="filled"
          rightSection={
            <ActionIcon
              color="primary.6"
              radius="xl"
              type="submit"
              loading={submitting}
            >
              <Text component={SendIcon} fz={12} />
            </ActionIcon>
          }
          radius="xl"
          placeholder="write a comment..."
          readOnly={submitting}
          onKeyDown={({ key }) => {
            if (key === "Enter") {
              submit();
            }
          }}
        />
      </form>
    </Stack>
  );
};

export default NotionJournalEntryCommentsStack;
