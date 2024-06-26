import type { ReactNode } from "react";
import type { AnchorProps } from "@mantine/core";

import { useContactMe } from "~/helpers/contactMe";
import type { ContactMeOptions } from "~/helpers/contactMe";

export interface ContactMeLinkProps extends AnchorProps, ContactMeOptions {
  children: ReactNode;
}

const ContactMeLink: FC<ContactMeLinkProps> = ({
  subject,
  children,
  ...otherProps
}) => {
  const [contactMe] = useContactMe({ subject });
  return (
    <Anchor
      component="button"
      fw={500}
      onClick={() => {
        contactMe();
      }}
      {...otherProps}
    >
      {children}
    </Anchor>
  );
};

export default ContactMeLink;
