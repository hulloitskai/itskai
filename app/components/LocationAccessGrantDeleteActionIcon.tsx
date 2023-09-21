import type { FC } from "react";
import { ActionIcon, type ActionIconProps } from "@mantine/core";

import { DeleteLocationAccessGrantMutationDocument } from "~/helpers/graphql";

export type LocationAccessGrantDeleteActionIconProps = Omit<
  ActionIconProps,
  "onClick" | "children"
> & {
  readonly grantId: string;
  readonly onDelete: () => void;
};

const LocationAccessGrantDeleteActionIcon: FC<
  LocationAccessGrantDeleteActionIconProps
> = ({ grantId, onDelete, ...otherProps }) => {
  // == Mutation
  const onError = useApolloAlertCallback("Failed to delete journal entries");
  const [runMutation, { loading }] = useMutation(
    DeleteLocationAccessGrantMutationDocument,
    {
      onCompleted: () => {
        showNotice({
          message: "Journal entries deleteed successfully.",
        });
        onDelete();
      },
      onError,
    },
  );

  // == Markup
  return (
    <Menu withinPortal withArrow>
      <Menu.Target>
        <ActionIcon color="red" {...otherProps}>
          <DeleteIcon />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          color="red"
          icon={<AlertIcon />}
          onClick={() => {
            runMutation({
              variables: {
                input: {
                  grantId,
                },
              },
            });
          }}
          {...{ loading }}
        >
          Confirm delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LocationAccessGrantDeleteActionIcon;
