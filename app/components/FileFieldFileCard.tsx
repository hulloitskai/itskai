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
  // == Query
  const onError = useApolloAlertCallback(
    "Failed to load uploaded file details",
  );
  const { data } = useQuery(FileFieldFileCardQueryDocument, {
    variables: {
      signedId,
    },
    onError,
  });
  const { filename, byteSize } = data?.file ?? {};
  const sizeText = useMemo(
    () => (byteSize ? prettyBytes(byteSize) : null),
    [byteSize],
  );

  return (
    <Card withBorder padding="xs" pr={6} pt={6} {...props}>
      <Box>
        <Group wrap="nowrap" gap="xs">
          <Skeleton visible={!sizeText} style={{ flexGrow: 1 }}>
            <Text size="sm" fw={700} ml={6} mt={6}>
              {filename ?? "placeholder.png"}
            </Text>
          </Skeleton>
          <ActionIcon color="red" onClick={onRemove}>
            <RemoveIcon />
          </ActionIcon>
        </Group>
        <Skeleton visible={!sizeText}>
          <Text size="xs" c="dimmed" ml={6}>
            {sizeText ?? "..."}
          </Text>
        </Skeleton>
      </Box>
    </Card>
  );
};

export default FileFieldFileCard;
