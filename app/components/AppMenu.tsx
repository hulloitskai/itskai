import { type InertiaLinkProps } from "@inertiajs/react";
import { Avatar, Loader, type MenuItemProps, Text } from "@mantine/core";

import LocateIcon from "~icons/basil/current-location-solid";
import SmileIcon from "~icons/heroicons/face-smile-20-solid";

import { useContact } from "~/helpers/contact";
import { type Status } from "~/types";

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
  const { data } = useFetchRoute<{ status: Status }>(
    routes.healthcheckHealthchecks.check,
    {
      descriptor: "load server info",
    },
  );
  const { status } = data ?? {};

  // == Logout
  const { submit: logout } = useInertiaForm({
    action: routes.usersSessions.destroy,
    descriptor: "sign out",
  });

  // == Components
  interface MenuLinkProps
    extends MenuItemProps,
      Omit<InertiaLinkProps, "color" | "style"> {}
  const MenuLink: FC<MenuLinkProps> = props => (
    <Menu.Item component={Link} {...props} />
  );

  return (
    <Menu
      position="bottom-end"
      trigger="hover"
      offset={4}
      width={220}
      withinPortal={false}
      {...{ opened }}
      onChange={opened => {
        startTransition(() => {
          setOpened(opened);
        });
      }}
      classNames={{
        item: classes.item,
        itemSection: classes.itemSection,
        itemLabel: classes.itemLabel,
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
              maxWidth: 96,
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
        <MenuLink href={routes.home.show.path()} leftSection={<HomeIcon />}>
          Home
        </MenuLink>
        <MenuLink
          href={routes.locations.show.path()}
          leftSection={<LocateIcon />}
        >
          Locate Kai
        </MenuLink>
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
            <MenuLink
              href={routes.usersRegistrations.edit.path()}
              leftSection={<AccountIcon />}
            >
              Account
            </MenuLink>
            {currentUser.is_owner && (
              <MenuLink
                href={routes.admin.show.path()}
                leftSection={<AdminIcon />}
              >
                Admin
              </MenuLink>
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
            {status ? (
              <TimeAgo>{status.booted_at}</TimeAgo>
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
