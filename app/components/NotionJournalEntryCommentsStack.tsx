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
  // == Input
  const [commentText, setCommentText] = useState("");

  // == Comments
  const {
    data: commentsData,
    fetching: commentsFetching,
    // mutate: mutateComments,
  } = useFetch<{
    comments: NotionComment[];
  }>(routes.notionJournalEntries.comments, {
    descriptor: "load comments",
    params: {
      id: entryId,
    },
  });
  const { comments } = commentsData ?? {};

  // == Adding Comment
  // const addCommentErrorContext = useMemo(
  //   () => ({ entryId, comment: commentText }),
  //   [commentText, entryId],
  // );
  // const onAddCommentError = useApolloAlertCallback(
  //   "Failed to add comment",
  //   addCommentErrorContext,
  // );
  // const [addComment, { loading: commenting }] = useMutation(
  //   AddJournalEntryCommentMutationDocument,
  //   {
  //     onCompleted: () => {
  //       mutateComments(/* ({ comments }) => new comments? */);
  //     },
  //     onError: onAddCommentError,
  //   },
  // );

  // == Commenting
  const createComment = () => {
    // addComment({
    //   variables: {
    //     input: {
    //       entryId,
    //       text: commentText,
    //     },
    //   },
    // }).then(() => {
    //   setCommentText("");
    // });
  };

  return (
    <Stack gap={6} {...otherProps}>
      {!commentsFetching && comments ? (
        comments.map(comment => {
          const { createdAt, id: commentId, richText } = comment;
          return (
            <Group
              key={commentId}
              align="start"
              gap={8}
              fz="sm"
              className={classes.comment}
            >
              <Box component={CommentIcon} mt={2} />
              <Box style={{ flex: 1 }}>
                <Stack gap={4} lh={1.5}>
                  {richText.map((props: any, index: number) => (
                    <RenderText key={index} {...props} />
                  ))}
                </Stack>
                <Box>
                  <TimeAgo size="xs" c="dimmed" lh={1.3}>
                    {createdAt}
                  </TimeAgo>
                </Box>
              </Box>
            </Group>
          );
        })
      ) : (
        <Skeleton h={40} />
      )}
      <TextInput
        variant="filled"
        rightSection={
          <ActionIcon
            variant="filled"
            color="primary.6"
            radius="xl"
            // loading={commenting}
            onClick={createComment}
          >
            <Text component={SendIcon} fz={12} />
          </ActionIcon>
        }
        radius="xl"
        placeholder="Write a comment..."
        value={commentText}
        // readOnly={commenting}
        onChange={({ currentTarget }) => {
          setCommentText(currentTarget.value);
        }}
        onKeyUp={({ key }) => {
          if (key === "Enter") {
            createComment();
          }
        }}
        mt={2}
        classNames={{
          input: classes.input,
        }}
        styles={{
          section: {
            width: "unset",
            marginRight: 3,
          },
        }}
      />
    </Stack>
  );
};

export default NotionJournalEntryCommentsStack;
