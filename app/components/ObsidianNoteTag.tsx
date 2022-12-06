import { BadgeProps } from "@mantine/core";
import type { FC } from "react";

const TAG_COLORS: Record<string, string> = {
  person: "pink",
  day: "gray",
  month: "gray",
  place: "orange",
  event: "red",
};

export type ObsidianNoteTagProps = Omit<BadgeProps, "children"> & {
  children: string;
};

const ObsidianNoteTag: FC<ObsidianNoteTagProps> = ({
  children,
  sx,
  ...otherProps
}) => {
  const color = useMemo(() => TAG_COLORS[children] || "gray", [children]);
  return (
    <Badge
      variant="outline"
      radius="sm"
      sx={[{ flexShrink: 0 }, ...packSx(sx)]}
      {...{ color }}
      {...otherProps}
    >
      {children}
    </Badge>
  );
};

export default ObsidianNoteTag;
