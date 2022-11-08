import type { FC } from "react";
import { CSSObject, Text } from "@mantine/core";

export type PageHeaderProps = {
  readonly title: string;
  readonly description?: string;
  readonly small?: boolean;
};

const PageHeader: FC<PageHeaderProps> = ({ title, description, small }) => {
  const theme = useMantineTheme();
  return (
    <Stack spacing={4}>
      <MediaQuery smallerThan={780} styles={{ height: 4 }}>
        <Box sx={{ height: theme.spacing.xl }} />
      </MediaQuery>
      <MediaQuery
        smallerThan="xs"
        styles={theme.headings.sizes.h2 as CSSObject}
      >
        <Title order={small ? 2 : 1}>{title}</Title>
      </MediaQuery>
      {!!description && <Text color="dark.3">{description}</Text>}
    </Stack>
  );
};

export default PageHeader;
