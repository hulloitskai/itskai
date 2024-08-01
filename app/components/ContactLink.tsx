import type { ReactNode } from "react";
import type { AnchorProps } from "@mantine/core";

import type { ContactOptions } from "~/helpers/contact";
import { useContact } from "~/helpers/contact";

export interface ContactLinkProps extends AnchorProps, ContactOptions {
  children: ReactNode;
}

const ContactLink: FC<ContactLinkProps> = ({
  subject,
  body,
  children,
  ...otherProps
}) => {
  const [contact] = useContact({ subject, body });
  return (
    <Anchor
      component="button"
      fw={500}
      onClick={() => {
        contact();
      }}
      {...otherProps}
    >
      {children}
    </Anchor>
  );
};

export default ContactLink;
