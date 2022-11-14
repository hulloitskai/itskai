import type { FC } from "react";
import { Footer, Image, Text, Tooltip } from "@mantine/core";

import logoPath from "~/assets/images/logo.png";

import { AppFooterViewerFragment } from "~/queries";

const AppFooter: FC = () => {
  const { data } = usePageProps();
  const viewer = useMemo(() => {
    if (typeof data === "object" && data) {
      const viewer = (data as Record<string, any>)["viewer"];
      if (viewer) {
        return viewer as AppFooterViewerFragment;
      }
    }
  }, [data]);
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
          {viewer && (
            <Tooltip label="You're signed in!" withArrow>
              <Badge variant="dot" color="indigo">
                {viewer.name}
              </Badge>
            </Tooltip>
          )}
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
