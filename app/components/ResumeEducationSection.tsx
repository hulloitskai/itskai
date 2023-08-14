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
  <Group spacing={8}>
    <Text
      size="sm"
      weight={600}
      sx={({ fn }) => ({ flexGrow: 1, color: fn.primaryColor() })}
    >
      {institution}
    </Text>
    <Text size="sm" weight={600} color="dark" lh={1.2}>
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
  </Group>
);

export default ResumeEducationSection;
