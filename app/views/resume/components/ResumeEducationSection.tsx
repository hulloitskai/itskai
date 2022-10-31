import React, { FC } from "react";
import { Text } from "@mantine/core";

import WebsiteBadge from "~views/shared/components/WebsiteBadge";

export type ResumeExperienceSectionProps = {
  readonly info: Record<string, string>;
};

const ResumeExperienceSection: FC<ResumeExperienceSectionProps> = ({
  info,
}) => {
  const { institution, area, studyType, startDate, endDate } = info;
  return (
    <Box>
      <Group spacing={8} mb={-4}>
        <Title order={3} size="h5" color="indigo">
          {institution}
        </Title>
      </Group>
      <Text size="sm" weight={600} color="dark" mb={-3}>
        {studyType} of {area}
        <Text
          weight={400}
          span
          sx={({ colors, fn }) => ({ color: fn.darken(colors.yellow[8], 0.1) })}
        >
          *
        </Text>
      </Text>
      <Badge
        color="gray"
        variant="outline"
        radius="sm"
        px={6}
        styles={{
          inner: {
            display: "inline-flex",
            alignItems: "center",
            columnGap: 6,
          },
        }}
      >
        {startDate} <IconHeroArrowLongRight20Solid /> {endDate}
      </Badge>
    </Box>
  );
};

export default ResumeExperienceSection;
