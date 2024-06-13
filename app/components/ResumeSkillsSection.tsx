import type { FC } from "react";
import type { ResumeSkillInfo } from "~/types/Resume";
import { Text } from "@mantine/core";

export interface ResumeSkillsSectionProps {
  skillInfo: ResumeSkillInfo;
}

const ResumeSkillsSection: FC<ResumeSkillsSectionProps> = ({
  skillInfo: { name, keywords },
}) => (
  <Group align="start" wrap="nowrap">
    <Text size="sm" c="var(--mantine-color-primary-filled)" fw={600} miw={72}>
      {name}
    </Text>
    {keywords && <Text size="sm">{keywords.join(", ")}</Text>}
  </Group>
);

export default ResumeSkillsSection;
