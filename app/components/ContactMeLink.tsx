import type { FC, ReactNode } from "react";
import type { AnchorProps } from "@mantine/core";

import { useContactMe } from "~/helpers/contactMe";

export type ContactMeLinkProps = Omit<AnchorProps, "children"> & {
  readonly children: ReactNode;
};

const ContactMeLink: FC<ContactMeLinkProps> = ({ children, ...otherProps }) => {
  const [contactMe] = useContactMe();
  return (
    <Anchor component="button" weight={500} onClick={contactMe} {...otherProps}>
      {children}
    </Anchor>
  );
};

export default ContactMeLink;
