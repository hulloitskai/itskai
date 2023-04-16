import type { FC } from "react";
import type { BoxProps, BadgeProps } from "@mantine/core";

import CogIcon from "~icons/heroicons/cog-6-tooth-20-solid";
import SignOutIcon from "~icons/heroicons/arrow-left-on-rectangle-20-solid";

import type { AppViewerFragment } from "~/queries";
import type { Maybe } from "~/queries";

import { createApolloLink } from "~/helpers/apollo";

export type AppMenuProps = Pick<BoxProps, "sx"> & {
  readonly viewer: Maybe<AppViewerFragment>;
};

const AppMenu: FC<AppMenuProps> = ({ viewer, sx }) => {
  const router = useRouter();
  const client = useApolloClient();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const badgeActiveColor = theme.colors.gray[5];
  const badgeProps = useMemo<BadgeProps>(
    () => ({
      variant: "dot",
      sx: [
        ...packSx(sx),
        {
          cursor: "pointer",
          borderColor: opened ? badgeActiveColor : undefined,
          "&:hover": {
            borderColor: badgeActiveColor,
          },
        },
      ],
    }),
    [opened],
  );
  return viewer ? (
    <Menu
      trigger="hover"
      position="bottom-end"
      offset={4}
      width={160}
      onChange={setOpened}
      styles={({ colors }) => ({
        dropdown: { padding: "0 !important" },
        item: {
          padding: "8px 10px",
        },
        itemIcon: {
          width: 16,
          height: 16,
          color: colors.black,
        },
        itemLabel: {
          color: colors.gray[5],
          fontWeight: 500,
        },
      })}
    >
      <Menu.Target>
        <Badge variant="dot" color="indigo" {...badgeProps}>
          {viewer.name}
        </Badge>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href="/user/settings" icon={<CogIcon />}>
          Settings
        </Menu.Item>
        <Menu.Item
          icon={<SignOutIcon />}
          onClick={() => {
            router.post("/user/logout", undefined, {
              onSuccess: ({ props: { csrf } }) => {
                const csrfToken = (csrf as any).token;
                const link = createApolloLink({ csrfToken });
                client.setLink(link);
                client.resetStore();
              },
            });
          }}
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <Badge component={Link} href="/login" color="gray.4" {...badgeProps}>
      Sign In
    </Badge>
  );
};

export default AppMenu;
