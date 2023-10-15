import type { FC, PropsWithChildren } from "react";

import AppMeta from "./AppMeta";

import "./ResumeLayout.css";
import classes from "./ResumeLayout.module.css";

type ResumeLayoutProps = PropsWithChildren<{
  readonly printable?: boolean;
}>;

const ResumeLayout: FC<ResumeLayoutProps> = ({ printable, children }) => (
  <>
    <AppMeta title="Resume" />
    <Container
      px="0.75in"
      py="0.4in"
      mb={printable ? 0 : 135}
      bg="var(--mantine-color-white)"
      c="var(--mantine-color-black)"
      className={classes.container}
      {...(printable && { "data-printable": true })}
    >
      <Stack gap="xs">{children}</Stack>
    </Container>
  </>
);

export default ResumeLayout;
