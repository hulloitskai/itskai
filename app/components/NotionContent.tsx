import type { ComponentPropsWithoutRef, FC } from "react";

import { Render as NotionRenderer } from "@9gustin/react-notion-render";
import type { WithContentValidationProps as NotionComponentProps } from "@9gustin/react-notion-render/dist/hoc/withContentValidation";

import "@9gustin/react-notion-render/dist/index.css";

type NotionRendererProps = ComponentPropsWithoutRef<typeof NotionRenderer>;

export type NotionContentProps = {
  readonly content: NotionRendererProps["blocks"];
};

const NotionContent: FC<NotionContentProps> = ({ content }) => (
  <Box
    sx={({ fontFamilyMonospace, fontSizes }) => ({
      fontFamily: fontFamilyMonospace,
      "> .rnr-container *": {
        fontSize: fontSizes.sm,
      },
      p: {
        margin: `${rem(8)} 0`,
      },
    })}
  >
    <NotionRenderer
      blockComponentsMapper={{
        divider: NotionContentDivider,
      }}
      blocks={content}
      useStyles
      emptyBlocks
    />
  </Box>
);

export default NotionContent;

const NotionContentDivider: FC<NotionComponentProps> = () => (
  <Divider my="md" />
);
