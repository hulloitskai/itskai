import { Avatar, Loader, Text } from "@mantine/core";

import LocateIcon from "~icons/basil/current-location-solid";
import SignOutIcon from "~icons/heroicons/arrow-left-on-rectangle-20-solid";
import SignInIcon from "~icons/heroicons/arrow-right-on-rectangle-20-solid";
import SmileIcon from "~icons/heroicons/face-smile-20-solid";
import HomeIcon from "~icons/heroicons/home-20-solid";
import AdminIcon from "~icons/heroicons/key-20-solid";
import SendIcon from "~icons/heroicons/paper-airplane-20-solid";

import { useContact } from "~/helpers/contact";

import classes from "./AppMenu.module.css";

export interface AppMenuProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children" | "onChange"> {}

const AppMenu: FC<AppMenuProps> = ({ ...otherProps }) => {
  const currentUser = useCurrentUser();
  const [contact, { loading: loadingContact }] = useContact();

  // == State
  const [opened, setOpened] = useState(false);

  // == Load server info
  const { data: statusData } = useFetchSWR(
    routes.healthcheckHealthchecks.check,
    {
      descriptor: "load server info",
    },
  );
  const { bootedAt } = statusData ?? {};

  // == Logout
  const { submit: logout } = useInertiaForm({
    action: routes.usersSessions.destroy,
    method: "post",
    descriptor: "sign out",
  });

  return (
    <Menu
      position="bottom-end"
      trigger="hover"
      offset={4}
      width={220}
      withinPortal={false}
      {...{ opened }}
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
      {...otherProps}
    >
      <Menu.Target>
        <Badge
          variant="default"
          size="lg"
          leftSection={
            currentUser ? (
              <Avatar src={currentUser.avatar?.src} size={21} />
            ) : (
              <UserIcon />
            )
          }
          styles={{
            label: {
              fontWeight: 500,
              maxWidth: 140,
            },
            root: {
              paddingLeft: currentUser ? 2 : 8,
            },
          }}
        >
          {currentUser?.name ?? "Sign in & more"}
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
          leftSection={loadingContact ? <Loader size={12} /> : <SendIcon />}
          onClick={() => {
            contact();
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
