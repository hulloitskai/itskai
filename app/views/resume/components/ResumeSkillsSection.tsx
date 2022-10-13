import { MantineColor } from "@mantine/core";
import React, { FC } from "react";

export type ResumeSkillsSectionProps = {
  readonly info: Record<string, string> & {
    readonly keywords: string[];
  };
};

const ResumeSkillsSection: FC<ResumeSkillsSectionProps> = ({ info }) => {
  const { name, level, keywords } = info;
  const badgeColor = useMemo<MantineColor>(
    () => ({ Expertise: "violet", Proficiency: "teal" }[level] || "gray"),
    [level],
  );
  return (
    <Box>
      <Group spacing={8}>
        <Title order={3} size="h6" color="dark.4">
          {name}
        </Title>
        <Badge size="xs" color={badgeColor} variant="dot" radius="sm">
          {level}
        </Badge>
      </Group>
      <Group spacing={2} mt={2}>
        {keywords.map((keyword, index) => (
          <Badge key={index} size="xs" color="dark.3" variant="outline">
            {keyword}
          </Badge>
        ))}
      </Group>
    </Box>
  );
};

export default ResumeSkillsSection;
