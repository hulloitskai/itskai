import { type PWAInstallElement } from "@khmyznikov/pwa-install";
import PWAInstall from "@khmyznikov/pwa-install/react-legacy";
import { Text } from "@mantine/core";

import PhoneIcon from "~icons/heroicons/device-phone-mobile-20-solid";
// import TextingIcon from "~icons/heroicons/chat-bubble-left-right-20-solid";
import FeedbackIcon from "~icons/heroicons/hand-raised-20-solid";

import AppLayout from "~/components/AppLayout";
import FriendPushNotificationsButton from "~/components/FriendPushNotificationsButton";
import FriendTimeline from "~/components/FriendTimeline";
import FriendVibecheckModal from "~/components/FriendVibecheckModal";
import { useInstallPromptEvent, useIsStandaloneMode } from "~/helpers/pwa";
import { type Friend, type Status } from "~/types";

import classes from "./FriendPage.module.css";

export interface FriendPageProps extends SharedPageProps {
  friend: Friend;
  friendToken: string;
  contactPhone: string;
  emulateStandalone: boolean;
  vibeLastCheckedAt: string | null;
  statuses: Status[];
}

const FriendPage: PageComponent<FriendPageProps> = ({
  friend,
  friendToken,
  contactPhone,
  emulateStandalone,
  vibeLastCheckedAt,
  statuses,
}) => {
  const isStandalone = useIsStandaloneMode();
  useEffect(() => {
    if (isStandalone) {
      void navigator.clearAppBadge();
    }
  }, [isStandalone]);

  const standaloneMode = emulateStandalone || isStandalone;
  const mounted = useMounted();
  const installPromptEvent = useInstallPromptEvent();
  const [pwaInstall, setPWAInstall] = useState<PWAInstallElement | null>(null);
  const [pwaInstalled, setPWAInstalled] = useState(false);

  return (
    <>
      <Stack mt="sm" gap="xl" style={{ flexGrow: 1 }}>
        {standaloneMode ? (
          <>
            <Stack gap={6} lh="xs" ta="center">
              <Text inherit fw={700}>
                Hi, {friend.emoji}{" "}
                <span className={classes.name}>{friend.name}</span>!
              </Text>
              <Text inherit>
                Welcome to the experiment. And thanks for being my friend 🫶
              </Text>
              <Group gap="xs" justify="center">
                <FriendPushNotificationsButton
                  size="compact-sm"
                  {...{ friendToken }}
                  style={{ alignSelf: "center" }}
                />
                <Button
                  variant="subtle"
                  color="gray"
                  size="compact-sm"
                  component="a"
                  href={`sms:${contactPhone}?body=${encodeURIComponent("I have feedback for you: ")}`}
                  leftSection={<FeedbackIcon />}
                >
                  Give feedback
                </Button>
              </Group>
            </Stack>
            <FriendTimeline {...{ statuses, contactPhone }} />
          </>
        ) : (
          <>
            <Stack gap={6} lh="xs">
              <Text inherit fw={700}>
                Hi, {friend.emoji}{" "}
                <span className={classes.name}>{friend.name}</span>!
              </Text>
              <Text inherit>
                I&apos;m running an experiment to see how I can{" "}
                <span className={classes.highlight}>
                  experience more connection
                </span>{" "}
                with people in my life.
              </Text>
              <Text inherit>
                The basic idea is that you get to{" "}
                <span className={classes.highlight}>
                  pin this page to your home screen
                </span>{" "}
                and then you&apos;ll get special fun{" "}
                <span className={classes.highlight}>curated updates</span> from
                me.
              </Text>
              <Text inherit>
                As this experiment evolves, you&apos;ll be able to do more with
                this page. Feel free to{" "}
                <span className={classes.highlight}>randomly check back</span>{" "}
                to see what&apos;s new :)
              </Text>
            </Stack>
            <Stack gap={6} align="center">
              <Button
                loading={!pwaInstall}
                disabled={pwaInstalled}
                leftSection={<PhoneIcon />}
                onClick={() => {
                  if (pwaInstall) {
                    pwaInstall.install();
                    if (
                      pwaInstall.isAppleDesktopPlatform ||
                      pwaInstall.isAppleMobilePlatform
                    ) {
                      pwaInstall.showDialog();
                    }
                  }
                }}
              >
                {pwaInstalled
                  ? "Find me on your home screen"
                  : "Add to home screen"}
              </Button>
              {pwaInstalled && (
                <Text size="xs" c="dimmed" lh="xs">
                  On Android, you&apos;ll find me in your app drawer.
                </Text>
              )}
            </Stack>
          </>
        )}
      </Stack>
      {mounted && !isStandalone && (
        <PWAInstall
          manifestUrl={routes.friends.manifest.path({
            query: {
              friend_token: friendToken,
            },
          })}
          manualApple
          manualChrome
          disableClose
          useLocalStorage={false}
          disableDescription
          externalPromptEvent={installPromptEvent}
          onPwaInstallAvailableEvent={(event: Event) => {
            event.preventDefault();
            setPWAInstall(event.target as PWAInstallElement);
          }}
          onPwaInstallSuccessEvent={event => {
            const pwaInstall = event.target as PWAInstallElement;
            pwaInstall.hideDialog();
            setPWAInstalled(true);
          }}
        />
      )}
      {standaloneMode && (
        <FriendVibecheckModal
          {...{ friendToken, vibeLastCheckedAt }}
          onVibeChecked={() => {
            router.reload({ only: ["vibeLastCheckedAt"] });
          }}
        />
      )}
    </>
  );
};

FriendPage.layout = page => (
  <AppLayout<FriendPageProps>
    title="Friendship Portal"
    manifestUrl={({ friendToken }) =>
      routes.friends.manifest.path({
        query: {
          friend_token: friendToken,
        },
      })
    }
    withContainer
    containerSize="xs"
    withGutter
  >
    {page}
  </AppLayout>
);

export default FriendPage;
