import { FC } from "react";

import DocumentIcon from "~icons/heroicons/document-20-solid";

const ResumeButton: FC = () => (
  <Button
    component="a"
    href="/resume"
    target="_blank"
    leftIcon={<DocumentIcon />}
  >
    Resume, please!
  </Button>
);

export default ResumeButton;
