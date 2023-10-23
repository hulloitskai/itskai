import type { FC } from "react";
import type { BadgeProps } from "@mantine/core";

import LinkIcon from "~icons/heroicons/link-20-solid";

export type WebsiteBadgeProps = Omit<BadgeProps, "children"> & {
  readonly url: string;
};

const WebsiteBadge: FC<WebsiteBadgeProps> = ({ url, ...otherProps }) => {
  const host = useMemo(() => {
    const { hostname } = new URL(url);
    if (hostname.startsWith("www.")) {
      return hostname.slice(4);
    }
    return hostname;
  }, [url]);
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
        color="var(--mantine-color-primary-filled)"
        px={6}
        styles={{
          root: {
            cursor: "pointer",
            borderColor: "var(--mantine-color-primary-border)",
          },
          label: {
            textTransform: "none",
          },
        }}
        {...otherProps}
      >
        {host}
      </Badge>
    </Anchor>
  );
};

export default WebsiteBadge;
