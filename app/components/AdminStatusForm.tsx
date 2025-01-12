import { ActionIcon, Popover, RemoveScroll } from "@mantine/core";

import EmojiPicker from "./EmojiPicker";

export interface AdminStatusFormProps extends BoxProps {
  onStatusCreated: () => void;
}

const AdminStatusForm: FC<AdminStatusFormProps> = ({
  onStatusCreated,
  ...otherProps
}) => {
  const [emojiPickerOpened, setEmojiPickerOpened] = useState(false);
  const { submit, getInputProps, setFieldValue, values, submitting } =
    useFetchForm({
      action: routes.adminStatuses.create,
      descriptor: "create status",
      initialValues: {
        emoji: "",
        text: "",
      },
      transformValues: ({ emoji, ...values }) => ({
        status: {
          emoji: emoji || null,
          ...values,
        },
      }),
      onSuccess: () => {
        onStatusCreated();
      },
    });

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Group align="start" gap="xs">
        <Textarea
          {...getInputProps("text")}
          placeholder="new update??!"
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
                    if (values.emoji) {
                      setFieldValue("emoji", "");
                    } else {
                      setEmojiPickerOpened(true);
                    }
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
          autosize
          minRows={1}
          maxRows={4}
          styles={{
            root: { flexGrow: 1 },
            section: { alignItems: "start", paddingTop: rem(7) },
          }}
        />
        <ActionIcon
          variant="light"
          type="submit"
          size="lg"
          loading={submitting}
          mt={1}
        >
          <SendIcon />
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default AdminStatusForm;
