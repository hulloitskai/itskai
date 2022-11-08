import type { FC, PropsWithChildren } from "react";
import { Global } from "@mantine/core";

type ResumeLayoutProps = PropsWithChildren<{
  readonly printable?: boolean;
}>;

const ResumeLayout: FC<ResumeLayoutProps> = ({ printable, children }) => (
  <>
    <Global
      styles={({ colors }) => ({
        body: {
          backgroundColor: colors.dark[4],
        },
      })}
    />
    <MediaQuery largerThan={920} styles={{ marginTop: printable ? 0 : 48 }}>
      <Container
        px="0.75in"
        py="0.4in"
        mb={printable ? 0 : 72}
        sx={{ width: "8.5in", height: "11in", backgroundColor: "white" }}
      >
        <Stack spacing="xs">{children}</Stack>
      </Container>
    </MediaQuery>
  </>
);

export default ResumeLayout;
