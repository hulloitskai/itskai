import { ActionIcon, Popover, RemoveScroll } from "@mantine/core";

import EmojiPicker from "./EmojiPicker";

export interface AdminFriendFormProps extends BoxProps {
  onFriendCreated: () => void;
}

const AdminFriendForm: FC<AdminFriendFormProps> = ({
  onFriendCreated,
  ...otherProps
}) => {
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  const { submit, getInputProps, setFieldValue, values, submitting } =
    useFetchForm({
      action: routes.adminFriends.create,
      descriptor: "register friend",
      initialValues: {
        emoji: "",
        name: "",
      },
      transformValues: values => ({ friend: values }),
      onSuccess: () => {
        onFriendCreated();
      },
    });

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Group align="start" gap="xs">
        <TextInput
          {...getInputProps("name")}
          placeholder="(friend's name)"
          leftSection={
            <Popover
              middlewares={{ flip: { fallbackAxisSideDirection: "end" } }}
              withArrow
              trapFocus
              styles={{ dropdown: { padding: 0, border: "none" } }}
              opened={emojiPickerOpened}
              onChange={setEmojiPickerOpened}
            >
              <Popover.Target>
                <ActionIcon
                  type="button"
                  size="sm"
                  radius="xl"
                  onClick={() => {
                    setEmojiPickerOpened(true);
                  }}
                  {...otherProps}
                >
                  {values.emoji || <EmojiIcon />}
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown>
                <RemoveScroll removeScrollBar={false}>
                  <EmojiPicker
                    onEmojiClick={({ emoji }) => {
                      setFieldValue("emoji", emoji);
                      setEmojiPickerOpened(false);
                    }}
                  />
                </RemoveScroll>
              </Popover.Dropdown>
            </Popover>
          }
          required
          withAsterisk={false}
          style={{ flexGrow: 1 }}
        />
        <Button variant="light" type="submit" loading={submitting}>
          Register
        </Button>
      </Group>
    </Box>
  );
};

export default AdminFriendForm;
