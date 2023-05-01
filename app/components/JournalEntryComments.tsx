import type { FC } from "react";
import { format as formatTimeAgo } from "timeago.js";
import { RenderText } from "@9gustin/react-notion-render";
import CommentIcon from "~icons/heroicons/chat-bubble-bottom-center-text-20-solid";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";

import { ActionIcon } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  JournalEntryCommentMutationDocument,
  JournalEntryCommentsQueryDocument,
} from "~/queries";

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
  const onError = useApolloAlertCallback("Failed to load Notion comments");
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
  const onMutationError = useApolloAlertCallback(
    "Failed to create Notion comment",
  );
  const [runMutation, { loading: mutating }] = useMutation(
    JournalEntryCommentMutationDocument,
    {
      onCompleted: () => {
        refetch({ startCursor: undefined });
      },
      onError: onMutationError,
    },
  );
  const createComment = () => {
    runMutation({
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
    <Stack spacing={6} {...otherProps}>
      {!loading && comments ? (
        comments.items.map(comment => {
          const { id: commentId, createdAt, richText } = comment;
          return (
            <Group
              key={commentId}
              align="start"
              spacing={8}
              fz="sm"
              color="gray.5"
            >
              <Box component={CommentIcon} mt={2} />
              <Box sx={{ flex: 1 }}>
                <Stack spacing={4}>
                  {richText.map((props: any, index: number) => (
                    <RenderText key={index} {...props} />
                  ))}
                </Stack>
                <Box mt={-4}>
                  <Time
                    size="xs"
                    color="dimmed"
                    format={time => formatTimeAgo(time.toJSDate())}
                  >
                    {createdAt}
                  </Time>
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
            color="pink.5"
            radius="xl"
            loading={mutating}
            onClick={createComment}
          >
            <Box component={SendIcon} w={16} h={16} />
          </ActionIcon>
        }
        radius="xl"
        placeholder="write a comment..."
        value={commentText}
        readOnly={mutating}
        onChange={({ currentTarget }) => {
          setCommentText(currentTarget.value);
        }}
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            createComment();
          }
        }}
        mt={2}
        styles={({ colors }) => ({
          input: {
            minHeight: "unset",
            height: "auto",
            lineHeight: 2,
            "&:focus": {
              borderColor: colors.gray[7],
            },
          },
          rightSection: {
            width: "unset",
            marginRight: 2,
          },
        })}
      />
    </Stack>
  );
};

export default JournalEntryComments;
