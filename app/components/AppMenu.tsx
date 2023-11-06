import type { FC } from "react";

import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";

import AdminIcon from "~icons/heroicons/key-20-solid";
// import SignInIcon from "~icons/heroicons/arrow-right-on-rectangle-20-solid";
import SignOutIcon from "~icons/heroicons/arrow-left-on-rectangle-20-solid";
import SmileIcon from "~icons/heroicons/face-smile-20-solid";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";
import LocateIcon from "~icons/lucide/locate-fixed";
import HomeIcon from "~icons/heroicons/home-20-solid";

import { Loader, Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import { createApolloLink } from "~/helpers/apollo";
import type { SharedPageProps } from "~/helpers/inertia";

import { AppMenuQueryDocument } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { AppViewerFragment } from "~/helpers/graphql";

import { useContactMe } from "~/helpers/contactMe";

import menuAnimationData from "~/assets/animations/menu.json";
import classes from "./AppMenu.module.css";

export type AppMenuProps = Omit<BoxProps, "children"> & {
  readonly viewer: Maybe<AppViewerFragment>;
};

const AppMenu: FC<AppMenuProps> = ({ viewer, style, ...otherProps }) => {
  const isClient = useIsClient();
  const router = useRouter();
  const client = useApolloClient();
  const [contactMe, { loading: contactMeLoading }] = useContactMe();

  // == State
  const [opened, setOpened] = useState(false);

  // == Icon
  const menuIconRef = useRef<LottieRefCurrentProps>(null);
  useEffect(() => {
    const menuIcon = menuIconRef.current;
    if (menuIcon) {
      menuIcon.setSpeed(2);
      if (opened) {
        menuIcon.setDirection(1);
        menuIcon.play();
      } else {
        menuIcon.setDirection(-1);
        menuIcon.play();
      }
    }
  }, [opened]);

  // == Query
  const onError = useApolloAlertCallback("Failed to load server info");
  const { data } = useQuery(AppMenuQueryDocument, { skip: !opened, onError });
  const { bootedAt } = data ?? {};

  // == Markup
  return (
    <Menu
      trigger="hover"
      position="bottom-end"
      offset={4}
      width={220}
      withinPortal={false}
      onChange={setOpened}
      styles={{
        dropdown: {
          padding: 0,
          overflow: "hidden",
        },
        item: {
          padding: `${rem(8)} ${rem(10)}`,
          borderRadius: 0,
        },
        itemSection: {
          width: 16,
          height: 16,
          color: "var(--mantine-color-primary-4)",
        },
        itemLabel: {
          color: "var(--mantine-color-gray-5)",
          fontWeight: 500,
        },
      }}
      {...{ opened }}
      {...otherProps}
    >
      <Menu.Target>
        <Badge
          variant="outline"
          leftSection={
            <>
              {isClient && (
                <Lottie
                  lottieRef={menuIconRef}
                  animationData={menuAnimationData}
                  loop={false}
                  autoplay={false}
                  className={classes.icon}
                />
              )}
            </>
          }
          className={classes.target}
          color="gray"
          style={[
            style,
            {
              "--badge-height": "var(--badge-height-lg)",
            },
          ]}
        >
          Menu
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href="/" leftSection={<HomeIcon />}>
          Home
        </Menu.Item>
        <Menu.Item component={Link} href="/locate" leftSection={<LocateIcon />}>
          Locate Kai
        </Menu.Item>
        <Menu.Item
          component="a"
          href="/hangout"
          target="_blank"
          rel="noopener noreferrer nofollow"
          leftSection={<SmileIcon />}
        >
          Hang out w/ Kai
        </Menu.Item>
        <Menu.Item
          leftSection={contactMeLoading ? <Loader size={12} /> : <SendIcon />}
          onClick={() => {
            contactMe();
          }}
        >
          Shoot Kai a msg
        </Menu.Item>
        {!!viewer && (
          <>
            <Menu.Divider />
            <Menu.Item
              component={Link}
              href="/user/settings"
              leftSection={<SettingsIcon />}
            >
              My account
            </Menu.Item>
            {viewer.isOwner && (
              <>
                <Menu.Item
                  component={Link}
                  href="/admin"
                  leftSection={<AdminIcon />}
                >
                  Admin
                </Menu.Item>
              </>
            )}
            <Menu.Item
              leftSection={<SignOutIcon />}
              onClick={() => {
                router.post("/logout", undefined, {
                  onSuccess: ({ props }) => {
                    const { csrf } = props as unknown as SharedPageProps;
                    const link = createApolloLink({ csrfToken: csrf.token });
                    client.setLink(link);
                    client.resetStore();
                  },
                });
              }}
            >
              Sign out
            </Menu.Item>
          </>
        )}
        <Menu.Divider />
        <Menu.Item component="div" disabled pt={4}>
          <Text span size="xs" c="gray.5">
            Server booted{" "}
            {bootedAt ? (
              <TimeAgo>{bootedAt}</TimeAgo>
            ) : (
              <Skeleton
                display="inline-block"
                height="min-content"
                width="fit-content"
                lh={1}
                style={{ verticalAlign: "middle" }}
              >
                <Text span inherit display="inline-block" lh={1}>
                  2 minutes ago
                </Text>
              </Skeleton>
            )}
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AppMenu;
