import type { ComponentPropsWithoutRef, FC } from "react";

import { Render } from "@9gustin/react-notion-render";
import type { WithContentValidationProps } from "@9gustin/react-notion-render/dist/hoc/withContentValidation";

import "@9gustin/react-notion-render/dist/index.css";

type RenderProps = ComponentPropsWithoutRef<typeof Render>;

export type NotionContentProps = {
  readonly content: RenderProps["blocks"];
};

const NotionContent: FC<NotionContentProps> = ({ content }) => {
  return (
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
      <Render
        blockComponentsMapper={{
          divider: NotionContentDivider,
        }}
        blocks={content}
        useStyles
        emptyBlocks
      />
    </Box>
  );
};

export default NotionContent;

const NotionContentDivider: FC<WithContentValidationProps> = () => {
  return <Divider my="md" />;
};
