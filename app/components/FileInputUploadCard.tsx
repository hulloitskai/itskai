import type { Blob } from "@rails/activestorage";
import { useUpload } from "~/helpers/upload";

import type { CardProps } from "@mantine/core";
import { ActionIcon, Progress, Text } from "@mantine/core";

export interface FileInputUploadCardProps extends CardProps {
  file: File;
  onUploaded?: (blob: Blob) => void;
}

const FileInputUploadCard: FC<FileInputUploadCardProps> = ({
  file,
  onUploaded,
  ...props
}) => {
  const { blob, error, progress, uploading, cancel } = useUpload(file, {
    onCompleted: onUploaded,
    onError: ({ message }) => {
      showAlert({ title: `Failed to upload file '${file.name}'`, message });
    },
  });
  return (
    <Card withBorder padding="xs" pr={6} pt={6} {...props}>
      <Stack gap={8}>
        <Group wrap="nowrap" gap="xs">
          <Text size="sm" fw={700} ml={6} mt={6} style={{ flexGrow: 1 }}>
            {file.name}
          </Text>
          {uploading && (
            <ActionIcon color="red" onClick={cancel}>
              <CancelIcon />
            </ActionIcon>
          )}
          {blob && <Box component={SuccessIcon} c="green" />}
        </Group>
        <Progress
          value={progress}
          size="sm"
          color={error ? "red" : "green"}
          ml={6}
          mb={2}
        />
        {error && (
          <Text size="xs" c="red" ml={6}>
            {error.message}
          </Text>
        )}
      </Stack>
    </Card>
  );
};

export default FileInputUploadCard;
