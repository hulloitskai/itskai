import type { FC } from "react";
import type { ResumeSkillInfo } from "~/helpers/resume";

export type ResumeSkillsSectionProps = {
  readonly skillInfo: ResumeSkillInfo;
};

const ResumeSkillsSection: FC<ResumeSkillsSectionProps> = ({
  skillInfo: { name, keywords },
}) => (
  <Box>
    <Title order={3} size="h6" color="dark.4" fz="xs">
      {name}
    </Title>
    {keywords && (
      <Group spacing={2}>
        {keywords.map((keyword, index) => (
          <Badge key={index} size="xs" variant="outline" color="dark.3">
            {keyword}
          </Badge>
        ))}
      </Group>
    )}
  </Box>
);

export default ResumeSkillsSection;
