import type { FC } from "react";

export type ResumeSkillsSectionProps = {
  readonly info: Record<string, string> & {
    readonly keywords: string[];
  };
};

const ResumeSkillsSection: FC<ResumeSkillsSectionProps> = ({
  info: { name, keywords },
}) => (
  <Box>
    <Title order={3} size="h6" color="dark.4" fz="xs">
      {name}
    </Title>
    <Group spacing={2}>
      {keywords.map((keyword, index) => (
        <Badge key={index} size="xs" variant="outline" color="dark.3">
          {keyword}
        </Badge>
      ))}
    </Group>
  </Box>
);

export default ResumeSkillsSection;
