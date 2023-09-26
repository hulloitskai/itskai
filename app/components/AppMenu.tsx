import type { FC } from "react";
import { format as formatTimeAgo } from "timeago.js";
import AdminIcon from "~icons/heroicons/key-20-solid";
import SignOutIcon from "~icons/heroicons/arrow-left-on-rectangle-20-solid";

import { Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import { createApolloLink } from "~/helpers/apollo";
import type { SharedPageProps } from "~/helpers/inertia";

import { AppMenuQueryDocument } from "~/helpers/graphql";
import type { Maybe } from "~/helpers/graphql";
import type { AppViewerFragment } from "~/helpers/graphql";

import classes from "./AppMenu.module.css";

export type AppMenuProps = Omit<BoxProps, "children"> & {
  readonly viewer: Maybe<AppViewerFragment>;
};

const AppMenu: FC<AppMenuProps> = ({ viewer, style, ...otherProps }) => {
  const router = useRouter();
  const client = useApolloClient();

  // == State
  const [opened, setOpened] = useState(false);

  // == Query
  const onError = useApolloAlertCallback("Failed to load server info");
  const skipQuery = !viewer?.isOwner || !opened;
  const { data } = useQuery(AppMenuQueryDocument, {
    skip: skipQuery,
    onError,
  });
  const { bootedAt } = data ?? {};

  // == Markup
  return viewer ? (
    <Menu
      trigger="hover"
      position="bottom-end"
      offset={4}
      width={220}
      radius="md"
      onChange={setOpened}
      styles={({ colors }) => ({
        dropdown: {
          padding: 0,
          overflow: "hidden",
        },
        item: {
          padding: `${rem(8)} ${rem(10)}`,
          borderRadius: 0,
        },
        itemIcon: {
          width: 16,
          height: 16,
          color: colors.brand[4],
        },
        itemLabel: {
          color: colors.gray[5],
          fontWeight: 500,
        },
      })}
      {...{ opened }}
      {...otherProps}
    >
      <Menu.Target>
        <Badge
          variant="dot"
          color="brand.5"
          c="gray.2"
          className={classes.target}
          style={[style, { cursor: "pointer" }]}
        >
          {viewer.name}
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/user/settings"
          leftSection={<SettingsIcon />}
        >
          My settings
        </Menu.Item>
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
        {viewer.isOwner && (
          <>
            <Menu.Divider />
            <Menu.Item
              component={Link}
              href="/admin"
              leftSection={<AdminIcon />}
            >
              Admin
            </Menu.Item>
          </>
        )}
        {!skipQuery && (
          <>
            <Menu.Divider />
            <Menu.Item disabled pt={4}>
              <Text size="xs" c="dimmed">
                Server booted{" "}
                {bootedAt ? (
                  <Time format={time => formatTimeAgo(time.toJSDate())}>
                    {bootedAt}
                  </Time>
                ) : (
                  <Skeleton
                    display="inline-block"
                    height="min-content"
                    width="fit-content"
                    style={{ verticalAlign: "middle" }}
                  >
                    <Text inherit>2 minutes ago</Text>
                  </Skeleton>
                )}
              </Text>
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  ) : (
    <Badge
      component={Link}
      href="/login"
      variant="dot"
      color="gray.6"
      className={classes.target}
      style={[style, { cursor: "pointer" }]}
      {...otherProps}
    >
      Sign in
    </Badge>
  );
};

export default AppMenu;
