import type { FC } from "react";
import { Affix } from "@mantine/core";

import DocumentIcon from "~icons/heroicons/document-20-solid";

const ResumePDFDownloadButton: FC = () => {
  const mounted = useMounted();
  const [loading, setLoading] = useState(false);
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" duration={400} {...{ mounted }}>
        {style => (
          <Button
            component="a"
            href="/resume.pdf"
            leftIcon={<DocumentIcon />}
            variant="gradient"
            gradient={{
              from: "indigo",
              to: "pink",
              deg: 45,
            }}
            onClick={() => {
              setLoading(true);
            }}
            {...{ style, loading }}
          >
            {loading ? "Generating PDF..." : "I want a PDF!"}
          </Button>
        )}
      </Transition>
    </Affix>
  );
};

export default ResumePDFDownloadButton;
