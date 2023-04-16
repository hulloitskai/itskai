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
      columnGap: 6,
    }}
  >
    <Button
      component={Link}
      href="/"
      compact
      variant="subtle"
      p={4}
      sx={({ fontSizes, colors, white, fn }) => ({
        color: colors.gray[4],
        flexShrink: 0,
        fontSize: fontSizes.md,
        fontWeight: 700,
        "&:hover": {
          backgroundColor: fn.rgba(white, 0.1),
        },
      })}
    >
      it&apos;s kai
    </Button>
    <CurrentlyPlayingIsland />
    <AppMenu sx={{ flexShrink: 0 }} {...{ viewer }} />
  </Header>
);

export default AppHeader;
