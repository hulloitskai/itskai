import { Text } from "@mantine/core";

import ArrowRightIcon from "~icons/heroicons/arrow-long-right-20-solid";

import { type ResumeEducationInfo } from "~/types";

export interface ResumeEducationSectionProps {
  educationInfo: ResumeEducationInfo;
}

const ResumeEducationSection: FC<ResumeEducationSectionProps> = ({
  educationInfo: { area, endDate, institution, startDate, studyType },
}) => (
  <Group gap={8}>
    <Text
      size="sm"
      fw={600}
      c="var(--mantine-color-primary-filled)"
      style={{ flexGrow: 1 }}
    >
      {institution}
    </Text>
    <Text size="sm" fw={500} c="dark.4">
      {!!studyType && <>{studyType} of </>}
      {area}
    </Text>
    <Badge
      variant="outline"
      color="resumeAccent"
      radius="sm"
      px={6}
      styles={{
        label: {
          display: "inline-flex",
          alignItems: "center",
          columnGap: 6,
          textTransform: "none",
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
);

export default ResumeEducationSection;
