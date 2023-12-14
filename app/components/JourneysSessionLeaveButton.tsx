import type { ComponentPropsWithoutRef, FC } from "react";
import type { AnchorProps } from "@mantine/core";
import { LeaveJourneysSessionMutationDocument } from "~/helpers/graphql";

export type JourneysSessionLeaveButtonProps = AnchorProps &
  Omit<ComponentPropsWithoutRef<"button">, "children"> & {
    readonly participationId: string;
    readonly onLeave?: () => void;
  };

const JourneysSessionLeaveButton: FC<JourneysSessionLeaveButtonProps> = ({
  participationId,
  onLeave,
  ...otherProps
}) => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to leave session");
  const [runMutation] = useMutation(LeaveJourneysSessionMutationDocument, {
    onCompleted: () => {
      if (onLeave) {
        onLeave();
      }
    },
    onError,
  });

  return (
    <Menu
      withArrow
      radius="md"
      styles={{
        dropdown: {
          borderColor: "var(--mantine-color-red-outline)",
        },
        arrow: {
          borderColor: "var(--mantine-color-red-outline)",
        },
      }}
    >
      <Menu.Target>
        <Anchor component="button" c="red" {...otherProps}>
          Leave session
        </Anchor>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<AlertIcon />}
          onClick={() => {
            runMutation({
              variables: {
                input: {
                  participationId,
                },
              },
            });
          }}
        >
          Really leave?
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default JourneysSessionLeaveButton;
