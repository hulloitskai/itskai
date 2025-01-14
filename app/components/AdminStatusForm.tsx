import { ActionIcon, Box, Group, Textarea } from "@mantine/core";

import EmojiPopover from "./EmojiPopover";

export interface AdminStatusFormProps extends BoxProps {
  onStatusCreated: () => void;
}

const AdminStatusForm: FC<AdminStatusFormProps> = ({
  onStatusCreated,
  ...otherProps
}) => {
  // == Form
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
  const filled = useFieldsFilled(values, "text");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Group align="start" gap="xs">
        <Textarea
          {...getInputProps("text")}
          placeholder="new update??!"
          leftSection={
            <EmojiPopover
              middlewares={{ flip: { fallbackAxisSideDirection: "end" } }}
              onEmojiClick={({ emoji }) => {
                setFieldValue("emoji", emoji);
              }}
            >
              {({ open }) => (
                <ActionIcon
                  type="button"
                  size="sm"
                  radius="xl"
                  onClick={() => {
                    if (values.emoji) {
                      setFieldValue("emoji", "");
                    } else {
                      open();
                    }
                  }}
                >
                  {values.emoji || <EmojiIcon />}
                </ActionIcon>
              )}
            </EmojiPopover>
          }
          required
          withAsterisk={false}
          autosize
          minRows={1}
          styles={{
            root: { flexGrow: 1 },
            section: { alignItems: "start", paddingTop: rem(7) },
          }}
        />
        <ActionIcon
          variant="light"
          type="submit"
          size={38}
          disabled={!filled}
          loading={submitting}
        >
          <SendIcon />
        </ActionIcon>
      </Group>
    </Box>
  );
};

export default AdminStatusForm;
