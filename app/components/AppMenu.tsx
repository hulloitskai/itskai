import { Loader, Text } from "@mantine/core";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";

import AdminIcon from "~icons/heroicons/key-20-solid";
import SignInIcon from "~icons/heroicons/arrow-right-on-rectangle-20-solid";
import SignOutIcon from "~icons/heroicons/arrow-left-on-rectangle-20-solid";
import SmileIcon from "~icons/heroicons/face-smile-20-solid";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";
import LocateIcon from "~icons/lucide/locate-fixed";
import HomeIcon from "~icons/heroicons/home-20-solid";

import { useContactMe } from "~/helpers/contactMe";

import menuAnimationData from "~/assets/animations/menu.json";
import classes from "./AppMenu.module.css";

export interface AppMenuProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children" | "onChange"> {}

const AppMenu: FC<AppMenuProps> = ({ style, ...otherProps }) => {
  const isClient = useIsClient();
  const { currentUser } = usePageProps();
  const [contactMe, { loading: loadingContactMe }] = useContactMe();

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

  // == Server Status
  const { data: statusData } = useFetch(routes.healthcheckHealthchecks.check, {
    descriptor: "load server info",
  });
  const { bootedAt } = statusData ?? {};

  // == Logout
  const { submit: logout } = useInertiaForm({
    action: routes.usersSessions.destroy,
    method: "post",
    descriptor: "sign out",
  });

  return (
    <Menu
      trigger="hover"
      position="bottom-end"
      offset={4}
      width={220}
      withinPortal={false}
      onChange={setOpened}
      classNames={{
        itemSection: classes.itemSection,
        itemLabel: classes.itemLabel,
      }}
      styles={{
        dropdown: {
          padding: 0,
          overflow: "hidden",
        },
        item: {
          padding: `${rem(8)} ${rem(10)}`,
          borderRadius: 0,
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
        <Menu.Item
          component={Link}
          href={routes.home.show.path()}
          leftSection={<HomeIcon />}
        >
          Home
        </Menu.Item>
        <Menu.Item
          component={Link}
          href={routes.locations.show.path()}
          leftSection={<LocateIcon />}
        >
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
          leftSection={loadingContactMe ? <Loader size={12} /> : <SendIcon />}
          onClick={() => {
            contactMe();
          }}
        >
          Shoot Kai a msg
        </Menu.Item>
        <Menu.Divider />
        {currentUser ? (
          <>
            <Menu.Item
              component={Link}
              href={routes.usersRegistrations.edit.path()}
              leftSection={<SettingsIcon />}
            >
              Settings
            </Menu.Item>
            {currentUser.isOwner && (
              <>
                <Menu.Item
                  component={Link}
                  href={routes.admin.show.path()}
                  leftSection={<AdminIcon />}
                >
                  Admin
                </Menu.Item>
              </>
            )}
            <Menu.Item
              leftSection={<SignOutIcon />}
              onClick={() => {
                logout();
              }}
            >
              Sign out
            </Menu.Item>
          </>
        ) : (
          <Menu.Item
            leftSection={<SignInIcon />}
            component={Link}
            href={routes.usersSessions.new.path()}
          >
            Sign in
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item component="div" disabled pt={4}>
          <Text span size="xs">
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
