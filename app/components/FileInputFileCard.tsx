import { type CardProps } from "@mantine/core";
import { ActionIcon, Text } from "@mantine/core";
import prettyBytes from "pretty-bytes";

import { type File } from "~/types";

export interface FileInputFileCardProps extends CardProps {
  signedId: string;
  onRemove?: () => void;
}

const FileInputFileCard: FC<FileInputFileCardProps> = ({
  onRemove,
  signedId,
  ...props
}) => {
  // == Load file metadata
  const params = useMemo(() => ({ signed_id: signedId }), [signedId]);
  const { data } = useRouteSWR<{ file: File }>(routes.files.show, {
    params: params,
    descriptor: "load file",
  });
  const { file } = data ?? {};
  const sizeText = useMemo(
    () => (file?.byte_size ? prettyBytes(file.byte_size) : null),
    [file?.byte_size],
  );

  return (
    <Skeleton visible={!data}>
      <Card withBorder padding="xs" pr={6} pt={6} {...props}>
        <Box>
          <Group gap="xs">
            <Text size="sm" fw={700} ml={6} mt={6} style={{ flexGrow: 1 }}>
              {file?.filename ?? "placeholder.png"}
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

export default FileInputFileCard;
