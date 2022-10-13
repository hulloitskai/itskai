import React, { FC } from "react";
import { Affix } from "@mantine/core";

const DownloadResumePDFButton: FC = () => {
  const mounted = useMounted();
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" duration={400} {...{ mounted }}>
        {style => (
          <Button
            component="a"
            href="/resume.pdf"
            color="pink"
            leftIcon={<IconHeroDocumentSolid />}
            {...{ style }}
          >
            I want a PDF!
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export default DownloadResumePDFButton;
