import { type AnchorProps } from "@mantine/core";
import { type ReactNode } from "react";

import { type UseContactOptions } from "~/helpers/contact";
import { useContact } from "~/helpers/contact";

export interface ContactLinkProps extends AnchorProps, UseContactOptions {
  children: ReactNode;
}

const ContactLink: FC<ContactLinkProps> = ({
  type,
  body,
  children,
  subject,
  ...otherProps
}) => {
  const [contact] = useContact({ type, subject, body });
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
