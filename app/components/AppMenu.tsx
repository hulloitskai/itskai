import { type InertiaLinkProps } from "@inertiajs/react";
import { type BoxProps, Loader, type MenuItemProps, Text } from "@mantine/core";

import LocateIcon from "~icons/basil/current-location-solid";
import MenuIcon from "~icons/heroicons/bars-3-20-solid";
import SmileIcon from "~icons/heroicons/face-smile-20-solid";

import { useContact } from "~/helpers/contact";

import classes from "./AppMenu.module.css";

export interface AppMenuProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children" | "onChange"> {}

const AppMenu: FC<AppMenuProps> = ({ ...otherProps }) => {
  const currentUser = useCurrentUser();
  const [opened, setOpened] = useState(false);

  // == Link items
  interface MenuLinkProps
    extends MenuItemProps,
      Omit<InertiaLinkProps, "color" | "style"> {}
  const MenuLink: FC<MenuLinkProps> = props => (
    <Menu.Item component={Link} preserveScroll {...props} />
  );

  return (
    <Menu
      position="bottom-end"
      trigger="click-hover"
      closeDelay={200}
      {...{ opened }}
      onChange={setOpened}
      shadow="sm"
      offset={4}
      width={220}
      arrowPosition="center"
      withinPortal={false}
      classNames={{
        item: classes.item,
        itemSection: classes.itemSection,
        itemLabel: classes.itemLabel,
        dropdown: classes.dropdown,
      }}
      {...otherProps}
    >
      <Menu.Target>
        <Badge
          className={classes.target}
          variant="default"
          size="lg"
          leftSection={<MenuIcon />}
        >
          Menu
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
          href={routes.calendly.show.path()}
          target="_blank"
          rel="noopener noreferrer nofollow"
          leftSection={<SmileIcon />}
        >
          Hang out w/ Kai
        </Menu.Item>
        <ContactItem
          onClose={() => {
            setOpened(false);
          }}
        />
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
            <LogoutItem
              onClose={() => {
                setOpened(false);
              }}
            />
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
        <ServerInfoItem />
      </Menu.Dropdown>
    </Menu>
  );
};

export default AppMenu;

interface LogoutItemProps extends BoxProps {
  onClose: () => void;
}

const LogoutItem: FC<LogoutItemProps> = ({ onClose, ...otherProps }) => {
  const { trigger, mutating } = useRouteMutation(routes.usersSessions.destroy, {
    descriptor: "sign out",
    onSuccess: () => {
      onClose();
      toast.success("Signed out successfully");
      router.visit(routes.home.show.path(), { preserveScroll: true });
    },
  });

  return (
    <Menu.Item
      pos="relative"
      leftSection={mutating ? <Loader size={12} /> : <SignOutIcon />}
      closeMenuOnClick={false}
      onClick={() => {
        void trigger();
      }}
      {...otherProps}
    >
      Sign out
    </Menu.Item>
  );
};

interface ContactItemProps extends BoxProps {
  onClose: () => void;
}

const ContactItem: FC<ContactItemProps> = ({ onClose, ...otherProps }) => {
  const [contact, { loading }] = useContact({
    onTriggered: onClose,
  });

  return (
    <Menu.Item
      leftSection={loading ? <Loader size={12} /> : <SendIcon />}
      closeMenuOnClick={false}
      onClick={() => {
        contact();
      }}
      {...otherProps}
    >
      Shoot Kai a msg
    </Menu.Item>
  );
};

const ServerInfoItem: FC<BoxProps> = props => {
  const { data } = useRouteSWR<{ bootedAt: string }>(
    routes.healthcheckHealthchecks.check,
    {
      descriptor: "load server info",
    },
  );
  const { bootedAt } = data ?? {};

  return (
    <Menu.Item component="div" disabled fz="xs" mod={{ info: true }} {...props}>
      Server booted{" "}
      {bootedAt ? (
        <TimeAgo inherit>{bootedAt}</TimeAgo>
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
    </Menu.Item>
  );
};
