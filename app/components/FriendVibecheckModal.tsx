import { Modal, Radio } from "@mantine/core";

import classes from "./FriendVibecheckModal.module.css";

export interface FriendVibecheckModalProps {
  friendToken: string;
  vibeLastCheckedAt: string | null;
  onVibeChecked: () => void;
}

const VIBES = ["✨", "🥺", "☺️", "😎", "🤷"];

const FriendVibecheckModal: FC<FriendVibecheckModalProps> = ({
  friendToken,
  vibeLastCheckedAt,
  onVibeChecked,
}) => {
  const requiresVibeCheck = useMemo(() => {
    if (vibeLastCheckedAt) {
      const lastCheckedAtDate = DateTime.fromISO(vibeLastCheckedAt)
        .toLocal()
        .toISODate();
      const todayDate = DateTime.now().toLocal().toISODate();
      return lastCheckedAtDate !== todayDate;
    }
    return true;
  }, [vibeLastCheckedAt]);

  const { getInputProps, values, submit, submitting } = useFetchForm({
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
      opened={requiresVibeCheck}
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
              {VIBES.map(vibe => (
                <Radio.Card
                  key={vibe}
                  value={vibe}
                  w="unset"
                  className={classes.radioCard}
                >
                  <Center w={36} h={36} fz="xl">
                    {vibe}
                  </Center>
                </Radio.Card>
              ))}
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
