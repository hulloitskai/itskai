import type { ButtonProps } from "@mantine/core";

import DocumentIcon from "~icons/heroicons/document-20-solid";

export interface ResumeButtonProps
  extends ButtonProps,
    Omit<ComponentPropsWithoutRef<"a">, "color" | "style" | "children"> {}

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
