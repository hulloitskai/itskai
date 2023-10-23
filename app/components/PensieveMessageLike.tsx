import type { FC } from "react";
import HeartFilledIcon from "~icons/heroicons/heart-20-solid";
import HeartUnfilledIcon from "~icons/heroicons/heart";

import { Loader, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import {
  LikePensieveMessageMutationDocument,
  UnlikePensieveMessageMutationDocument,
} from "~/helpers/graphql";
import type { PensieveMessageLikeMessageFragment } from "~/helpers/graphql";

export type PensieveMessageLikeProps = Omit<BoxProps, "children"> & {
  readonly message: PensieveMessageLikeMessageFragment;
};

const PensieveMessageLike: FC<PensieveMessageLikeProps> = ({
  message: { id: messageId, likes, likedByViewer },
  ...otherProps
}) => {
  // == Like Mutation
  const onLikeError = useApolloAlertCallback("Failed to like message");
  const [runLikeMutation, { loading: liking }] = useMutation(
    LikePensieveMessageMutationDocument,
    {
      onError: onLikeError,
    },
  );

  // == Unlike Mutation
  const onUnlikeError = useApolloAlertCallback("Failed to unlike message");
  const [runUnlikeMutation, { loading: unliking }] = useMutation(
    UnlikePensieveMessageMutationDocument,
    {
      onError: onUnlikeError,
    },
  );

  const loading = liking || unliking;
  return (
    <Button
      variant="subtle"
      color="pink"
      size="compact-xs"
      radius="xl"
      pos="relative"
      onClick={() => {
        if (!likedByViewer) {
          runLikeMutation({
            variables: {
              input: {
                messageId,
              },
            },
          });
        } else {
          runUnlikeMutation({
            variables: {
              input: {
                messageId,
              },
            },
          });
        }
      }}
      {...otherProps}
    >
      <Group gap={4} wrap="nowrap">
        {loading ? (
          <Loader size={14} c="primary.5" />
        ) : (
          <Text
            component={likedByViewer ? HeartFilledIcon : HeartUnfilledIcon}
            size="xs"
          />
        )}
        {likes > 0 && (
          <Text size="xs" c="primary.4">
            {likes}
          </Text>
        )}
      </Group>
    </Button>
  );
};

export default PensieveMessageLike;
