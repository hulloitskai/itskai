import type { FC } from "react";

import { Text } from "@mantine/core";
import type { BoxProps } from "@mantine/core";

import { JourneysHomePageSessionsQueryDocument } from "~/helpers/graphql";

export type JourneysHomePageSessionsProps = BoxProps;

const JourneysHomePageSessions: FC<JourneysHomePageSessionsProps> = ({
  ...otherProps
}) => {
  const { data } = useQuery(JourneysHomePageSessionsQueryDocument, {
    variables: {
      first: 10,
    },
  });
  return (
    <Box {...otherProps}>
      <Title order={2} size="h4">
        Past sessions
      </Title>
      <Stack mt="xs">
        {data
          ? data.sessions.edges.map(
              ({ node: { id: sessionId, url, startedAt, participations } }) => (
                <AnchorContainer key={sessionId} component={Link} href={url}>
                  <Card withBorder>
                    <Time format={DateTime.DATETIME_MED} fw={700}>
                      {startedAt}
                    </Time>
                    <List listStyleType="none" size="sm" c="dimmed">
                      {participations.map(
                        ({ id: participationId, participantName, goal }) => (
                          <List.Item key={participationId}>
                            <Text span inherit c="primary">
                              {participantName}
                            </Text>
                            :{" "}
                            <Text span inherit>
                              {goal}
                            </Text>
                          </List.Item>
                        ),
                      )}
                    </List>
                  </Card>
                </AnchorContainer>
              ),
            )
          : [...new Array(3)].map((_, index) => (
              <Skeleton key={index} radius="md" h={80} />
            ))}
      </Stack>
    </Box>
  );
};

export default JourneysHomePageSessions;
