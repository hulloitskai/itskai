import React, { FC } from "react";

const ResumeButton: FC = () => (
  <Button
    component="a"
    href="/resume"
    target="_blank"
    leftIcon={<IconHeroDocument20Solid />}
  >
    Resume, please!
  </Button>
);

export default ResumeButton;
