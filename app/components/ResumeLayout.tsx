import type { FC, PropsWithChildren } from "react";
import { Global } from "@mantine/core";

import AppMeta from "./AppMeta";

type ResumeLayoutProps = PropsWithChildren<{
  readonly printable?: boolean;
}>;

const ResumeLayout: FC<ResumeLayoutProps> = ({ printable, children }) => (
  <>
    <Global
      styles={({ colors, black }) => ({
        body: {
          color: black,
          backgroundColor: colors.dark[4],
        },
      })}
    />
    <AppMeta title="Resume" />
    <MediaQuery largerThan={920} styles={{ marginTop: printable ? 0 : 48 }}>
      <Container
        px="0.75in"
        py="0.4in"
        mb={printable ? 0 : 135}
        sx={{ width: "8.5in", height: "11in", backgroundColor: "white" }}
      >
        <Stack spacing="xs">{children}</Stack>
      </Container>
    </MediaQuery>
  </>
);

export default ResumeLayout;
