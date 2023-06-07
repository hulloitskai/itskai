import type { FC } from "react";
import { useContactMe } from "~/helpers/contact";

import EnvelopeIcon from "~icons/heroicons/envelope-20-solid";

const WorkContactButton: FC = () => {
  const [contactMe, { loading }] = useContactMe({
    subject: "Let's work together!",
  });
  return (
    <Button
      leftIcon={<EnvelopeIcon />}
      variant="outline"
      onClick={contactMe}
      {...{ loading }}
    >
      Email me!
    </Button>
  );
};

export default WorkContactButton;
