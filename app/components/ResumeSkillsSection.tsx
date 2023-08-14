import { Text } from "@mantine/core";
import type { FC } from "react";
import type { ResumeSkillInfo } from "~/helpers/resume";

export type ResumeSkillsSectionProps = {
  readonly skillInfo: ResumeSkillInfo;
};

const ResumeSkillsSection: FC<ResumeSkillsSectionProps> = ({
  skillInfo: { name, keywords },
}) => (
  <Group align="start" noWrap>
    <Text
      size="sm"
      weight={600}
      miw={72}
      sx={({ fn }) => ({ color: fn.primaryColor() })}
    >
      {name}
    </Text>
    {keywords && <Text size="sm">{keywords.join(", ")}</Text>}
  </Group>
);

export default ResumeSkillsSection;
