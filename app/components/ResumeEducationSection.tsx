import type { FC } from "react";
import { Text } from "@mantine/core";
import ArrowRightIcon from "~icons/heroicons/arrow-long-right-20-solid";
import type { ResumeEducationInfo } from "~/helpers/resume";

export type ResumeEducationSectionProps = {
  readonly educationInfo: ResumeEducationInfo;
};

const ResumeEducationSection: FC<ResumeEducationSectionProps> = ({
  educationInfo: { institution, area, studyType, startDate, endDate },
}) => (
  <Box>
    <Group spacing={8}>
      <Title order={3} size="h5" color="indigo">
        {institution}
      </Title>
    </Group>
    <Text size="sm" color="dark" lh={1.2}>
      {!!studyType && <>{studyType} of </>}
      {area}
    </Text>
    <Badge
      variant="outline"
      color="yellow.9"
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
      {startDate} <ArrowRightIcon /> {endDate}
    </Badge>
  </Box>
);

export default ResumeEducationSection;
