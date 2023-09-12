import type { FC } from "react";
import { Header } from "@mantine/core";

import AppMenu from "./AppMenu";
import CurrentlyPlayingIsland from "./CurrentlyPlayingIsland";

import type { Maybe } from "~/helpers/graphql";
import type { AppViewerFragment } from "~/helpers/graphql";

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
      fz="md"
      color="gray.4"
      sx={({ white, fn }) => ({
        flexShrink: 0,
        fontWeight: 700,
        "&:hover": {
          backgroundColor: fn.rgba(white, 0.1),
        },
      })}
    >
      It&apos;s Kai
    </Button>
    <CurrentlyPlayingIsland />
    <AppMenu sx={{ flexShrink: 0 }} {...{ viewer }} />
  </Header>
);

export default AppHeader;
