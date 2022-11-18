import type { FC } from "react";
import { Footer, Image, Text } from "@mantine/core";

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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Center w="100%">
        <Group spacing={0}>
          <Text size="xs" weight={500} color="dark.3">
            Made with
          </Text>
          <Image src={logoPath} width={24} height={24} />
        </Group>
      </Center>
    </Footer>
  );
};

export default AppFooter;
