import { Text } from "@mantine/core";

import { type ResumeSkillInfo } from "~/types";

export interface ResumeSkillsSectionProps {
  skillInfo: ResumeSkillInfo;
}

const ResumeSkillsSection: FC<ResumeSkillsSectionProps> = ({
  skillInfo: { keywords, name },
}) => (
  <Group align="start">
    <Text size="sm" c="var(--mantine-primary-color-filled)" fw={600} miw={72}>
      {name}
    </Text>
    {keywords && <Text size="sm">{keywords.join(", ")}</Text>}
  </Group>
);

export default ResumeSkillsSection;
