import type { FC } from "react";
import { useContactMe } from "~/helpers/contact";

import EnvelopeIcon from "~icons/heroicons/envelope-20-solid";

const WorkContactButton: FC = () => {
  const [contactMe, { loading }] = useContactMe({
    subject: "Let's work together!",
  });
  return (
    <Button
      variant="outline"
      leftIcon={<EnvelopeIcon />}
      {...{ loading }}
      onClick={contactMe}
    >
      Email me!
    </Button>
  );
};

export default WorkContactButton;
