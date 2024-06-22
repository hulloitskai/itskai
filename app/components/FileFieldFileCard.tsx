import type { File } from "~/types";
import prettyBytes from "pretty-bytes";

import type { CardProps } from "@mantine/core";
import { ActionIcon, Text } from "@mantine/core";

export interface FileFieldFileCardProps extends CardProps {
  signedId: string;
  onRemove?: () => void;
}

const FileFieldFileCard: FC<FileFieldFileCardProps> = ({
  signedId,
  onRemove,
  ...props
}) => {
  // == File loading
  const params = useMemo(() => ({ signed_id: signedId }), [signedId]);
  const { data } = useFetch<{ file: File }>(routes.files.show, {
    params: params,
    descriptor: "load file",
  });
  const { file } = data ?? {};
  const sizeText = useMemo(
    () => (file?.byteSize ? prettyBytes(file.byteSize) : null),
    [file?.byteSize],
  );
  useEffect(() => {
    console.log({ signedId });
  }, [signedId]);

  return (
    <Skeleton visible={!data}>
      <Card withBorder padding="xs" pr={6} pt={6} {...props}>
        <Box>
          <Group wrap="nowrap" gap="xs">
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

export default FileFieldFileCard;
