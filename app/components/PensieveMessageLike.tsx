import HeartFilledIcon from "~icons/heroicons/heart-20-solid";
import HeartUnfilledIcon from "~icons/heroicons/heart";

import { Loader, Text } from "@mantine/core";

type PensieveMessageLikeMessageFragment = any;

export interface PensieveMessageLikeProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"button">, "style"> {
  message: PensieveMessageLikeMessageFragment;
}

const PensieveMessageLike: FC<PensieveMessageLikeProps> = ({
  message: { /* id: messageId, */ likes, likedByViewer },
  ...otherProps
}) => {
  // == Message Liking
  // const onLikeMessageError = useApolloAlertCallback("Failed to like message");
  // const [likeMessage, { loading: likingMessage }] = useMutation(
  //   LikePensieveMessageMutationDocument,
  //   {
  //     onError: onLikeMessageError,
  //   },
  // );

  // == Message Unliking
  // const onUnlikeMessageError = useApolloAlertCallback(
  //   "Failed to unlike message",
  // );
  // const [unlikeMessage, { loading: unlikingMessage }] = useMutation(
  //   UnlikePensieveMessageMutationDocument,
  //   {
  //     onError: onUnlikeMessageError,
  //   },
  // );

  const updating = false; // likingMessage || unlikingMessage
  return (
    <Button
      variant="subtle"
      color="pink"
      size="compact-xs"
      radius="xl"
      pos="relative"
      onClick={() => {
        if (!likedByViewer) {
          // likeMessage({
          //   variables: {
          //     input: {
          //       messageId,
          //     },
          //   },
          // });
        } else {
          // unlikeMessage({
          //   variables: {
          //     input: {
          //       messageId,
          //     },
          //   },
          // });
        }
      }}
      {...otherProps}
    >
      <Group gap={4} wrap="nowrap">
        {updating ? (
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
