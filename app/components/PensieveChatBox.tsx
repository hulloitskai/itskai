import type { FC } from "react";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";

import { ActionIcon, Text } from "@mantine/core";
import type { TextInputProps } from "@mantine/core";

import { SendPensieveMessageMutationDocument } from "~/helpers/graphql";

import classes from "./PensieveChatBox.module.css";

export type PensieveChatBoxProps = Omit<TextInputProps, "children">;

const PensieveChatBox: FC<PensieveChatBoxProps> = ({ ...otherProps }) => {
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
          color="primary.6"
          radius="xl"
          loading={mutating}
          onClick={createComment}
        >
          <Text component={SendIcon} fz={12} />
        </ActionIcon>
      }
      radius="xl"
      placeholder="Write a message..."
      value={messageText}
      readOnly={mutating}
      onChange={({ target }) => setMessageText(target.value)}
      onKeyUp={({ key }) => {
        if (key === "Enter") {
          createComment();
        }
      }}
      classNames={{
        input: classes.input,
      }}
      styles={{
        section: {
          width: "unset",
          marginRight: 3,
        },
      }}
      {...otherProps}
    />
  );
};

export default PensieveChatBox;
