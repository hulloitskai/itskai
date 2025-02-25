import { Highlight, Text } from "@mantine/core";

import ArrowRightIcon from "~icons/heroicons/arrow-long-right-20-solid";

import { type ResumeWorkInfo } from "~/types";

import WebsiteBadge from "./WebsiteBadge";

export interface ResumeWorkSectionProps {
  workInfo: ResumeWorkInfo;
}

const HIGHLIGHT_WORDS = [
  "Ruby on Rails",
  "React",
  "NIH",
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
  "GPT-4-vision",
  "YC 23",
  "Conversational AI",
];

const ResumeWorkSection: FC<ResumeWorkSectionProps> = ({
  workInfo: { endDate, highlights, name, position, startDate, summary, url },
}) => (
  <Box>
    <Group gap={8}>
      <Title
        order={3}
        size="h5"
        style={{ color: "var(--mantine-primary-color-filled)" }}
      >
        {name}
      </Title>
      {!!url && <WebsiteBadge {...{ url }} />}
      <Space style={{ flexGrow: 1 }} />
      <Text size="sm" c="resumeAccent" fw={600}>
        {position}
      </Text>
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
    {!!summary && (
      <Group gap="xs" my={4}>
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
                fontWeight: 600,
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
