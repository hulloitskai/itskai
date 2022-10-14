import React, { FC } from "react";
import { Text } from "@mantine/core";

import WebsiteBadge from "~views/shared/components/WebsiteBadge";

export type ResumeWorkSectionProps = {
  readonly info: Record<string, string> & {
    highlights: string[];
  };
};

const ResumeWorkSection: FC<ResumeWorkSectionProps> = ({ info }) => {
  const { name, position, url, startDate, endDate, summary, highlights } = info;
  return (
    <Box>
      <Group spacing={8} mb={-2}>
        <Title order={3} size="h5" color="indigo">
          {name}
        </Title>
        <WebsiteBadge color="indigo" {...{ url }} />
        <Space sx={{ flex: 1 }} />
        <Text size="sm" weight={600} color="dark">
          {position}
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
      </Group>
      {!!summary && (
        <Group spacing="xs" my={4}>
          <Divider orientation="vertical" size="md" />
          <Text size="sm" color="gray.6" sx={{ flex: 1 }}>
            {summary}
          </Text>
        </Group>
      )}
      <List
        size="sm"
        styles={{
          item: {
            lineHeight: 1.45,
          },
        }}
      >
        {highlights.map((highlight, index) => (
          <List.Item key={index}>{highlight}</List.Item>
        ))}
      </List>
    </Box>
  );
};

export default ResumeWorkSection;
