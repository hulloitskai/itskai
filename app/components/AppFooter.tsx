import type { FC } from "react";
import { Footer, Image, Text } from "@mantine/core";

import logoPath from "~/assets/images/logo.png";

const AppFooter: FC = () => (
  <Footer
    height={32}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Group spacing={0}>
      <Text size="xs" weight={500} color="dark.3">
        Made with
      </Text>
      <Image src={logoPath} width={24} height={24} />
    </Group>
  </Footer>
);

export default AppFooter;
