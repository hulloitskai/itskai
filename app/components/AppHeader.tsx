import { FC } from "react";
import { Header } from "@mantine/core";

const AppHeader: FC = () => (
  <Header
    p="xs"
    height={36}
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
    <Button
      component={Link}
      href="/work"
      compact
      size="xs"
      radius="lg"
      variant="gradient"
      gradient={{ from: "indigo", to: "pink", deg: 45 }}
      sx={{ fontWeight: 700, textTransform: "uppercase" }}
    >
      Let&apos;s work together!
    </Button>
  </Header>
);

export default AppHeader;
