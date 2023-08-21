import type { FC } from "react";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";

import { ActionIcon, Text } from "@mantine/core";
import type { TextInputProps } from "@mantine/core";

import { SendPensieveMessageMutationDocument } from "~/helpers/graphql";

export type PensieveChatBoxProps = Omit<TextInputProps, "children">;

const PensieveChatBox: FC<PensieveChatBoxProps> = ({ ...otherProps }) => {
  const theme = useMantineTheme();
  const [messageText, setMessageText] = useState("");

  // == Mutation
  const onSendError = useApolloAlertCallback("Failed to send message");
  const [runSendMutation, { loading: mutating }] = useMutation(
    SendPensieveMessageMutationDocument,
    { onError: onSendError },
  );
  const createComment = () => {
    runSendMutation({
      variables: {
        input: {
          text: messageText,
        },
      },
    }).then(() => {
      setMessageText("");
    });
  };

  return (
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
          <Text component={SendIcon} size={12} />
        </ActionIcon>
      }
      radius="xl"
      placeholder="write a message..."
      value={messageText}
      readOnly={mutating}
      onChange={({ target }) => setMessageText(target.value)}
      onKeyUp={({ key }) => {
        if (key === "Enter") {
          createComment();
        }
      }}
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
      {...otherProps}
    />
  );
};

export default PensieveChatBox;
