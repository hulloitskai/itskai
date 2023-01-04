import type { FC } from "react";
import { Footer, Image, Text } from "@mantine/core";

import ActivityStatusBadge from "./ActivityStatusBadge";

import logoPath from "~/assets/images/logo.png";

// import type { Maybe } from "~/queries";
// import type { AppViewerFragment } from "~/queries";

export type AppFooterProps = {
  // readonly viewer: Maybe<AppViewerFragment>;
};

const AppFooter: FC<AppFooterProps> = () => {
  return (
    <Footer
      height={32}
      px={8}
      sx={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Group spacing={0} sx={{ flexShrink: 0 }}>
        <Text size="xs" weight={500} color="dark.3">
          Made with
        </Text>
        <Image src={logoPath} width={24} height={24} />
      </Group>
      <ActivityStatusBadge sx={{ flexShrink: 1 }} />
    </Footer>
  );
};

export default AppFooter;
