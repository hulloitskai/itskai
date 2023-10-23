import type { FC } from "react";
import { Text } from "@mantine/core";

import type { ResumeSkillInfo } from "~/helpers/resume";

export type ResumeSkillsSectionProps = {
  readonly skillInfo: ResumeSkillInfo;
};

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
