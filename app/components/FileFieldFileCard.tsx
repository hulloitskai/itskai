import type { FC } from "react";
import prettyBytes from "pretty-bytes";

import type { CardProps } from "@mantine/core";
import { ActionIcon, Text } from "@mantine/core";

import { FileFieldFileCardQueryDocument } from "~/helpers/graphql";

export type FileFieldFileCardProps = CardProps & {
  readonly signedId: string;
  readonly onRemove?: () => void;
};

const FileFieldFileCard: FC<FileFieldFileCardProps> = ({
  signedId,
  onRemove,
  ...props
}) => {
  // == Loading File
  const onLoadFileError = useApolloAlertCallback(
    "Failed to load uploaded file details",
  );
  const { data: fileData } = useQuery(FileFieldFileCardQueryDocument, {
    variables: {
      signedId,
    },
    onError: onLoadFileError,
  });
  const { filename, byteSize } = fileData?.file ?? {};
  const sizeText = useMemo(
    () => (byteSize ? prettyBytes(byteSize) : null),
    [byteSize],
  );

  return (
    <Skeleton visible={!fileData}>
      <Card withBorder padding="xs" pr={6} pt={6} {...props}>
        <Box>
          <Group wrap="nowrap" gap="xs">
            <Text size="sm" fw={700} ml={6} mt={6} style={{ flexGrow: 1 }}>
              {filename ?? "placeholder.png"}
            </Text>
            <ActionIcon color="red" onClick={onRemove}>
              <RemoveIcon />
            </ActionIcon>
          </Group>
          <Text size="xs" c="dimmed" ml={6}>
            {sizeText ?? "..."}
          </Text>
        </Box>
      </Card>
    </Skeleton>
  );
};

export default FileFieldFileCard;
