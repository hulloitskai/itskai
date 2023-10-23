import type { FC } from "react";
import { RenderText } from "@9gustin/react-notion-render";

import CommentIcon from "~icons/heroicons/chat-bubble-bottom-center-text-20-solid";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";

import { ActionIcon, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  AddJournalEntryCommentMutationDocument,
  JournalEntryCommentsQueryDocument,
} from "~/helpers/graphql";

import classes from "./JournalEntryComments.module.css";

export type JournalEntryCommentsProps = BoxProps & {
  readonly entryId: string;
};

const JournalEntryComments: FC<JournalEntryCommentsProps> = ({
  entryId,
  ...otherProps
}) => {
  // == Input
  const [commentText, setCommentText] = useState("");

  // == Query
  const onError = useApolloAlertCallback("Failed to load comments");
  const { data, loading, refetch } = useQuery(
    JournalEntryCommentsQueryDocument,
    {
      variables: {
        entryId,
      },
      onError,
    },
  );
  const { comments } = data ?? {};

  // == Mutation
  const addErrorContext = useMemo(
    () => ({ entryId, comment: commentText }),
    [commentText, entryId],
  );
  const onAddError = useApolloAlertCallback(
    "Failed to add comment",
    addErrorContext,
  );
  const [runAddMutation, { loading: mutating }] = useMutation(
    AddJournalEntryCommentMutationDocument,
    {
      onCompleted: () => {
        refetch();
      },
      onError: onAddError,
    },
  );
  const createComment = () => {
    runAddMutation({
      variables: {
        input: {
          entryId,
          text: commentText,
        },
      },
    }).then(() => {
      setCommentText("");
    });
  };

  // == Markup
  return (
    <Stack gap={6} {...otherProps}>
      {!loading && comments ? (
        comments.map(comment => {
          const { id: commentId, createdAt, richText } = comment;
          return (
            <Group key={commentId} align="start" gap={8} fz="sm" c="gray.5">
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
            loading={mutating}
            onClick={createComment}
          >
            <Text component={SendIcon} fz={12} />
          </ActionIcon>
        }
        radius="xl"
        placeholder="Write a comment..."
        value={commentText}
        readOnly={mutating}
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

export default JournalEntryComments;
