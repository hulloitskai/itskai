import type { FC } from "react";
import type { AnchorProps } from "@mantine/core";

import { useContactMe } from "~/helpers/contactMe";

const HomePageContactLink: FC<AnchorProps> = ({ ...otherProps }) => {
  const [contactMe] = useContactMe();
  return (
    <Anchor component="button" weight={500} onClick={contactMe} {...otherProps}>
      email me
    </Anchor>
  );
};

export default HomePageContactLink;
