import { Render as NotionRenderer } from "@9gustin/react-notion-render";
import type { WithContentValidationProps as NotionComponentProps } from "@9gustin/react-notion-render/dist/hoc/withContentValidation";

import classes from "./NotionContent.module.css";
import "@9gustin/react-notion-render/dist/index.css";

type NotionRendererProps = ComponentPropsWithoutRef<typeof NotionRenderer>;

export interface NotionContentProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "content" | "style" | "children"> {
  content: NotionRendererProps["blocks"];
}

const NotionContent: FC<NotionContentProps> = ({ content, ...otherProps }) => (
  <Box className={classes.root} {...otherProps}>
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
