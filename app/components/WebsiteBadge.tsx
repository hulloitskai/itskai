import { type BadgeProps } from "@mantine/core";

import LinkIcon from "~icons/heroicons/link-20-solid";

export interface WebsiteBadgeProps
  extends BadgeProps,
    Omit<ComponentPropsWithoutRef<"div">, "color" | "style"> {
  url: string;
}

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
        color="var(--mantine-primary-color-filled)"
        px={6}
        styles={{
          root: {
            cursor: "pointer",
            borderColor: "var(--mantine-primary-color-border)",
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
