import type { FC, PropsWithChildren } from "react";

import AppMeta from "./AppMeta";

import "./ResumeLayout.css";
import classes from "./ResumeLayout.module.css";

type ResumeLayoutProps = PropsWithChildren<{
  readonly printMode?: boolean;
}>;

const ResumeLayout: FC<ResumeLayoutProps> = ({ printMode, children }) => (
  <>
    <AppMeta title="Resume" />
    <Container
      px="0.75in"
      pt="0.4in"
      mb={printMode ? 0 : 135}
      bg="var(--mantine-color-white)"
      c="var(--mantine-color-black)"
      className={cx("resume-layout", classes.container)}
      mod={{ "print-mode": printMode }}
    >
      <Stack gap="xs">{children}</Stack>
    </Container>
  </>
);

export default ResumeLayout;
