import { type CardProps, Text } from "@mantine/core";

import { useMutateRoute } from "~/helpers/fetch";
import { type Status } from "~/types";

import DeleteButton from "./DeleteButton";

export interface AdminStatusCardProps extends CardProps {
  status: Status;
  onStatusDeleted: () => void;
}

const AdminStatusCard: FC<AdminStatusCardProps> = ({
  status,
  onStatusDeleted,
  ...otherProps
}) => {
  const { trigger: triggerDelete, mutating: deleting } = useMutateRoute(
    routes.adminStatuses.destroy,
    {
      params: { id: status.id },
      descriptor: "delete status",
      onSuccess: () => {
        onStatusDeleted();
      },
    },
  );

  return (
    <Card withBorder {...otherProps}>
      <Card.Section withBorder inheritPadding pr="xs" py="xs">
        <Group justify="space-between">
          <Time
            format={DateTime.DATETIME_MED}
            size="xs"
            c="dimmed"
            display="block"
          >
            {status.created_at}
          </Time>
          <DeleteButton
            size="compact-xs"
            loading={deleting}
            onConfirm={() => {
              void triggerDelete();
            }}
          />
        </Group>
      </Card.Section>
      <Card.Section withBorder p="xs">
        <Group align="start" gap="xs">
          <Text w={22} ta="end" display="block" lh="xs">
            {status.emoji}
          </Text>
          <Text lh="xs" style={{ whiteSpace: "pre-line" }}>
            {status.text}
          </Text>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default AdminStatusCard;
