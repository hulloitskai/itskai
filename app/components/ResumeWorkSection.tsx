import type { FC } from "react";
import { Highlight, Text } from "@mantine/core";
import ArrowRightIcon from "~icons/heroicons/arrow-long-right-20-solid";

import type { ResumeWorkInfo } from "~/helpers/resume";

import WebsiteBadge from "./WebsiteBadge";

export type ResumeWorkSectionProps = {
  readonly workInfo: ResumeWorkInfo;
};

const HIGHLIGHT_WORDS = [
  "Ruby on Rails",
  "React",
  "OpenAI",
  "ElasticSearch",
  "Kubernetes",
  "Sentry",
  "Stripe",
  "Golang",
  "MongoDB",
  "Postgres",
  "Neo4J",
  "SAML SSO",
  "D3",
  "XSS",
  "Redux",
  "Websockets",
  "GCP",
  "AWS",
  "first paying customer",
];

const ResumeWorkSection: FC<ResumeWorkSectionProps> = ({
  workInfo: { name, position, url, startDate, endDate, summary, highlights },
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
      <Text size="sm" c="pink" fw={600}>
        {position}
      </Text>
      <Badge
        variant="outline"
        radius="sm"
        color="var(--mantine-color-pink-filled)"
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
    {!!summary && (
      <Group gap="xs" wrap="nowrap" my={4}>
        <Divider orientation="vertical" size="md" />
        <Text size="sm" style={{ flexGrow: 1 }}>
          {summary}
        </Text>
      </Group>
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
          <List.Item key={index}>
            <Highlight
              highlight={HIGHLIGHT_WORDS}
              highlightStyles={{
                fontWeight: 500,
                backgroundColor: "unset",
              }}
              inherit
            >
              {highlight}
            </Highlight>
          </List.Item>
        ))}
      </List>
    )}
  </Box>
);

export default ResumeWorkSection;
