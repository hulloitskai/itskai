import type { FC } from "react";

import DocumentIcon from "~icons/heroicons/document-20-solid";

const ResumeButton: FC = () => (
  <Button
    component="a"
    href="/resume"
    target="_blank"
    leftSection={<DocumentIcon />}
  >
    Resume, please!
  </Button>
);

export default ResumeButton;
