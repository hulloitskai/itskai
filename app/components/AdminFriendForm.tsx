import EmojiPopover from "./EmojiPopover";

export interface AdminFriendFormProps extends BoxProps {
  onFriendCreated: () => void;
}

const AdminFriendForm: FC<AdminFriendFormProps> = ({
  onFriendCreated,
  ...otherProps
}) => {
  // == Form
  const { submit, getInputProps, setFieldValue, values, submitting } = useForm({
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
  const filled = useFieldsFilled(values, "emoji", "name");

  return (
    <Box component="form" onSubmit={submit} {...otherProps}>
      <Group align="start" gap="xs">
        <EmojiPopover
          middlewares={{ flip: { fallbackAxisSideDirection: "end" } }}
          onEmojiClick={({ emoji }) => {
            setFieldValue("emoji", emoji);
          }}
        >
          {({ open }) => (
            <Button variant="light" color="gray" onClick={open}>
              {values.emoji ? (
                <span style={{ fontSize: "var(--mantine-font-size-lg)" }}>
                  {values.emoji}
                </span>
              ) : (
                <EmojiIcon />
              )}
            </Button>
          )}
        </EmojiPopover>
        <TextInput
          {...getInputProps("name")}
          placeholder="(friend's name)"
          required
          withAsterisk={false}
          style={{ flexGrow: 1 }}
        />
        <Button
          variant="light"
          type="submit"
          disabled={!filled}
          loading={submitting}
        >
          Register
        </Button>
      </Group>
    </Box>
  );
};

export default AdminFriendForm;
