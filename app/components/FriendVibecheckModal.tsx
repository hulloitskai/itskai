import { ActionIcon, Modal, Radio } from "@mantine/core";

import { isTodayIsh } from "~/helpers/time";
import { type FriendVibecheck } from "~/types";

import EmojiPopover from "./EmojiPopover";

import classes from "./FriendVibecheckModal.module.css";

export interface FriendVibecheckModalProps {
  friendToken: string;
  lastVibecheck: FriendVibecheck | null;
  onVibeChecked: () => void;
}

const PRESELECTED_VIBES = ["✨", "🥺", "☺️", "😎", "🤷"];

const FriendVibecheckModal: FC<FriendVibecheckModalProps> = ({
  friendToken,
  lastVibecheck,
  onVibeChecked,
}) => {
  const requiresVibecheck = useMemo(() => {
    if (lastVibecheck) {
      const lastCreatedAt = DateTime.fromISO(
        lastVibecheck.created_at,
      ).toLocal();
      return !isTodayIsh(lastCreatedAt);
    }
    return true;
  }, [lastVibecheck]);

  // == Form
  const { getInputProps, values, submit, submitting, setFieldValue } = useForm({
    action: routes.friends.vibecheck,
    params: {
      query: {
        friend_token: friendToken,
      },
    },
    descriptor: "submit vibe check",
    initialValues: { vibe: "" },
    transformValues: values => ({ vibecheck: values }),
    onSuccess: () => {
      toast("Thanks for checking in!", {
        icon: (
          <span style={{ fontSize: "var(--mantine-font-size-lg)" }}>🫶</span>
        ),
      });
      onVibeChecked();
    },
  });

  return (
    <Modal
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      opened={requiresVibecheck}
      onClose={() => {}}
      title="What's your vibe today?"
      styles={{
        header: {
          justifyContent: "center",
          paddingBottom: rem(8),
          minHeight: 0,
        },
      }}
    >
      <form onSubmit={submit}>
        <Stack gap="sm">
          <Radio.Group pt={3} {...getInputProps("vibe")}>
            <Group gap={6} wrap="wrap" justify="center">
              {PRESELECTED_VIBES.map(vibe => (
                <Radio.Card
                  key={vibe}
                  value={vibe}
                  className={classes.radioCard}
                >
                  <Center w={36} h={36} fz="xl">
                    {vibe}
                  </Center>
                </Radio.Card>
              ))}
              <EmojiPopover
                onEmojiClick={({ emoji }) => {
                  setFieldValue("vibe", emoji);
                }}
              >
                {({ open }) => (
                  <ActionIcon
                    variant="default"
                    radius="xl"
                    onClick={open}
                    w={36}
                    h={36}
                    bg="transparent"
                    c="var(--mantine-color-primary-light-color)"
                    className={classes.customEmojiActionIcon}
                    mod={{
                      selected:
                        !!values.vibe &&
                        !PRESELECTED_VIBES.includes(values.vibe),
                    }}
                  >
                    {!values.vibe || PRESELECTED_VIBES.includes(values.vibe) ? (
                      <EmojiIcon />
                    ) : (
                      values.vibe
                    )}
                  </ActionIcon>
                )}
              </EmojiPopover>
            </Group>
          </Radio.Group>
          <Button
            type="submit"
            loading={submitting}
            disabled={!values.vibe}
            style={{ alignSelf: "center" }}
          >
            And that&apos;s just how I feel
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default FriendVibecheckModal;
