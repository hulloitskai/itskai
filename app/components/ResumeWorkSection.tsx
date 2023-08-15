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
  "SAML",
  "D3",
  "Redux",
  "Websockets",
  "GCP",
  "AWS",
  "first paying customer",
];

const ResumeWorkSection: FC<ResumeWorkSectionProps> = ({
  workInfo: { name, position, url, startDate, endDate, summary, highlights },
}) => {
  const theme = useMantineTheme();
  return (
    <Box>
      <Group spacing={8}>
        <Title
          order={3}
          size="h5"
          sx={({ fn }) => ({ color: fn.primaryColor() })}
        >
          {name}
        </Title>
        {!!url && <WebsiteBadge color={theme.fn.primaryColor()} {...{ url }} />}
        <Space sx={{ flex: 1 }} />
        <Text size="sm" weight={600} color="dark">
          {position}
        </Text>
        <Badge
          color="gray.6"
          variant="outline"
          radius="sm"
          px={6}
          styles={{
            inner: {
              textTransform: "none",
              display: "inline-flex",
              alignItems: "center",
              columnGap: 6,
            },
          }}
        >
          {startDate ? (
            <Time format={{ month: "short", year: "numeric" }}>
              {startDate}
            </Time>
          ) : (
            <Text span>???</Text>
          )}{" "}
          <ArrowRightIcon />{" "}
          {endDate ? (
            <Time format={{ month: "short", year: "numeric" }}>{endDate}</Time>
          ) : (
            <Text span>Present</Text>
          )}
        </Badge>
      </Group>
      {!!summary && (
        <Group spacing="xs" my={4} noWrap>
          <Divider orientation="vertical" size="md" />
          <Text size="sm" sx={{ flexGrow: 1 }}>
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
};

export default ResumeWorkSection;
