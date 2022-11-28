import type { FC } from "react";
import { Header } from "@mantine/core";

import AppMenu from "./AppMenu";
import CurrentlyPlayingIsland from "./CurrentlyPlayingIsland";

import type { Maybe, AppViewerFragment } from "~/queries";

export type AppHeaderProps = {
  readonly viewer: Maybe<AppViewerFragment>;
};

const AppHeader: FC<AppHeaderProps> = ({ viewer }) => (
  <Header
    height={38}
    p={8}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Button
      component={Link}
      href="/"
      variant="subtle"
      compact
      p={4}
      sx={({ colors, fontSizes }) => ({
        fontSize: fontSizes.md,
        fontWeight: 700,
        "&:hover": {
          backgroundColor: colors.gray[1],
        },
      })}
    >
      It&apos;s Kai!
    </Button>
    <CurrentlyPlayingIsland />
    <AppMenu {...{ viewer }} />
  </Header>
);

export default AppHeader;
