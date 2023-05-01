import type { FC } from "react";
import { BadgeProps } from "@mantine/core";

import LinkIcon from "~icons/heroicons/link-20-solid";

export type WebsiteBadgeProps = Omit<BadgeProps, "children"> & {
  readonly url: string;
};

const WebsiteBadge: FC<WebsiteBadgeProps> = ({ url, ...otherProps }) => {
  const host = useMemo(() => new URL(url).hostname, [url]);
  return (
    <Anchor href={url} target="_blank" rel="noopener noreferrer nofollow">
      <Badge
        size="sm"
        leftSection={
          <Center>
            <LinkIcon />
          </Center>
        }
        variant="outline"
        color="gray"
        px={6}
        sx={{ cursor: "pointer" }}
        {...otherProps}
      >
        {host}
      </Badge>
    </Anchor>
  );
};

export default WebsiteBadge;
