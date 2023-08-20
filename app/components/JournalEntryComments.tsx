import type { FC } from "react";
import { format as formatTimeAgo } from "timeago.js";
import { RenderText } from "@9gustin/react-notion-render";

import CommentIcon from "~icons/heroicons/chat-bubble-bottom-center-text-20-solid";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";

import { ActionIcon } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  AddJournalEntryCommentMutationDocument,
  JournalEntryCommentsQueryDocument,
} from "~/helpers/graphql";

export type JournalEntryCommentsProps = BoxProps & {
  readonly entryId: string;
};

const JournalEntryComments: FC<JournalEntryCommentsProps> = ({
  entryId,
  ...otherProps
}) => {
  const theme = useMantineTheme();

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
    <Stack spacing={6} {...otherProps}>
      {!loading && comments ? (
        comments.map(comment => {
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
                <Stack spacing={4} lh={1.5}>
                  {richText.map((props: any, index: number) => (
                    <RenderText key={index} {...props} />
                  ))}
                </Stack>
                <Box>
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
            color={theme.colors[theme.primaryColor]![5]}
            radius="xl"
            loading={mutating}
            onClick={createComment}
          >
            <Box component={SendIcon} fz={12} />
          </ActionIcon>
        }
        radius="xl"
        placeholder="write a comment..."
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
