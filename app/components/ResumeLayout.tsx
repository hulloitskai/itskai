import AppMeta from "./AppMeta";

import classes from "./ResumeLayout.module.css";
import "./ResumeLayout.css";

export interface ResumeLayoutProps {
  printMode?: boolean;
}

const ResumeLayout: FC<PropsWithChildren<ResumeLayoutProps>> = ({
  children,
  printMode,
}) => (
  <>
    <AppMeta title="Resume" />
    <Container
      px="0.75in"
      pt="0.4in"
      mb={printMode ? 0 : 135}
      bg="white"
      c="black"
      className={cn("resume-layout", classes.container)}
      mod={{ "print-mode": printMode }}
    >
      <Stack gap="xs">{children}</Stack>
    </Container>
  </>
);

export default ResumeLayout;
