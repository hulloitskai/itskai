import type { FC } from "react";
import { Footer, Image, Text } from "@mantine/core";

import logoPath from "~/assets/images/logo.png";

import type { Maybe } from "~/queries";
import type { AppViewerFragment } from "~/queries";
import AppIdentityBadge from "./AppIdentityBadge";

export type AppFooterProps = {
  readonly viewer: Maybe<AppViewerFragment>;
};

const AppFooter: FC<AppFooterProps> = ({ viewer }) => {
  return (
    <Footer
      height={32}
      px={8}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Group w="100%" position="apart" spacing={0}>
        <Center>
          <AppIdentityBadge {...{ viewer }} />
        </Center>
        <Group spacing={0}>
          <Text size="xs" weight={500} color="dark.3">
            Made with
          </Text>
          <Image src={logoPath} width={24} height={24} />
        </Group>
      </Group>
    </Footer>
  );
};

export default AppFooter;
