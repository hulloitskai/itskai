import React, { FC } from "react";

export type ResumeSkillsSectionProps = {
  readonly info: Record<string, string> & {
    readonly keywords: string[];
  };
};

const ResumeSkillsSection: FC<ResumeSkillsSectionProps> = ({ info }) => {
  const { name, keywords } = info;
  return (
    <Box>
      <Title
        order={3}
        size="h6"
        color="dark.4"
        sx={({ fontSizes }) => ({
          fontSize: fontSizes.xs,
        })}
      >
        {name}
      </Title>
      <Group spacing={2}>
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
