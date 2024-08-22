import type { ResumeProjectInfo } from "~/types";
import { Text } from "@mantine/core";
import ArrowRightIcon from "~icons/heroicons/arrow-long-right-20-solid";

import WebsiteBadge from "./WebsiteBadge";

export interface ResumeProjectSectionProps {
  projectInfo: ResumeProjectInfo;
}

const ResumeProjectSection: FC<ResumeProjectSectionProps> = ({
  projectInfo: { name, url, startDate, endDate, description, highlights },
}) => (
  <Box>
    <Group gap={8}>
      <Title
        order={3}
        size="h5"
        style={{ color: "var(--mantine-color-primary-filled)" }}
      >
        {name}
      </Title>
      {!!url && <WebsiteBadge {...{ url }} />}
      <Space style={{ flexGrow: 1 }} />
      <Badge
        variant="outline"
        radius="sm"
        color="resumeAccent"
        px={6}
        styles={{
          label: {
            textTransform: "none",
            display: "inline-flex",
            alignItems: "center",
            columnGap: 6,
          },
        }}
      >
        {startDate ? (
          <Time inherit format={{ month: "short", year: "numeric" }}>
            {startDate}
          </Time>
        ) : (
          <Text span inherit>
            ???
          </Text>
        )}{" "}
        <ArrowRightIcon />{" "}
        {endDate ? (
          <Time inherit format={{ month: "short", year: "numeric" }}>
            {endDate}
          </Time>
        ) : (
          <Text span inherit>
            Present
          </Text>
        )}
      </Badge>
    </Group>
    {!!description && (
      <Text size="sm" style={{ flexGrow: 1 }}>
        {description}
      </Text>
    )}
    {highlights && (
      <List
        size="sm"
        spacing={4}
        styles={() => ({
          root: {
            listStylePosition: "unset",
          },
          item: {
            lineHeight: 1.375,
          },
        })}
      >
        {highlights.map((highlight, index) => (
          <List.Item key={index}>{highlight}</List.Item>
        ))}
      </List>
    )}
  </Box>
);

export default ResumeProjectSection;
