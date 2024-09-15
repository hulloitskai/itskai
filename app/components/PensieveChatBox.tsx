import { type TextInputProps } from "@mantine/core";
import { ActionIcon, Text } from "@mantine/core";

import SendIcon from "~icons/heroicons/paper-airplane-20-solid";

import classes from "./PensieveChatBox.module.css";

export interface PensieveChatBoxProps
  extends TextInputProps,
    Omit<ComponentPropsWithoutRef<"input">, "size" | "children" | "style"> {}

const PensieveChatBox: FC<PensieveChatBoxProps> = ({ ...otherProps }) => {
  const [messageText, setMessageText] = useState("");

  // == Message Sending
  // const onSendMessageError = useApolloAlertCallback("Failed to send message");
  // const [sendMessage, { loading: sendingMessage }] = useMutation(
  //   SendPensieveMessageMutationDocument,
  //   { onError: onSendMessageError },
  // );
  // const createComment = () => {
  //   sendMessage({
  //     variables: {
  //       input: {
  //         text: messageText,
  //       },
  //     },
  //   }).then(() => {
  //     setMessageText("");
  //   });
  // };

  return (
    <TextInput
      variant="filled"
      rightSection={
        <ActionIcon
          variant="filled"
          color="primary.6"
          radius="xl"
          // loading={sendingMessage}
          // onClick={createComment}
        >
          <Text component={SendIcon} fz={12} />
        </ActionIcon>
      }
      radius="xl"
      placeholder="Write a message..."
      value={messageText}
      // readOnly={sendingMessage}
      onChange={({ target }) => setMessageText(target.value)}
      // onKeyUp={({ key }) => {
      //   if (key === "Enter") {
      //     createComment();
      //   }
      // }}
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
