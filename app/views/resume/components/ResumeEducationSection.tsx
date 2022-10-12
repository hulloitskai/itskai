import React, { FC } from "react";
import { Text } from "@mantine/core";

import WebsiteBadge from "~views/shared/components/WebsiteBadge";

export type ResumeExperienceSectionProps = {
  readonly info: Record<string, string>;
};

const ResumeExperienceSection: FC<ResumeExperienceSectionProps> = ({
  info,
}) => {
  const { institution, url, area, studyType, startDate, endDate } = info;
  return (
    <Box>
      <Group spacing={8} mb={-4}>
        <Title order={3} size="h5" color="indigo">
          {institution}
        </Title>
        <WebsiteBadge color="indigo" {...{ url }} />
      </Group>
      <Text size="sm" weight={600} color="dark" mb={-2}>
        {studyType} of {area}{" "}
        <Text size="xs" weight={400} color="dimmed" span>
          (incomplete)
        </Text>
      </Text>
      <Text
        size="sm"
        color="dark"
        sx={() => ({
          display: "inline-flex",
          alignItems: "center",
          columnGap: 4,
        })}
      >
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
      </Text>
    </Box>
  );
};

export default ResumeExperienceSection;
