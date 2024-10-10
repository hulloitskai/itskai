import { type LocationAccessGrant } from "~/types";

import { type AdminLocationAccessGrantCardProps } from "./AdminLocationAccessGrantCard";
import AdminLocationAccessGrantCard from "./AdminLocationAccessGrantCard";
import { type LocationAccessGrantCreateFormProps } from "./AdminLocationAccessGrantCreateForm";
import LocationAccessGrantCreateForm from "./AdminLocationAccessGrantCreateForm";

export interface AdminLocationAccessGrantsProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children">,
    Pick<LocationAccessGrantCreateFormProps, "onGrantCreated">,
    Pick<AdminLocationAccessGrantCardProps, "onGrantDeleted"> {
  newGrantId?: string;
}

const AdminLocationAccessGrants: FC<AdminLocationAccessGrantsProps> = ({
  newGrantId,
  onGrantCreated,
  onGrantDeleted,
  ...otherProps
}) => {
  // == Load grants
  const { data, mutate } = useFetchSWR<{ grants: LocationAccessGrant[] }>(
    routes.admin.locationAccessGrants,
    {
      descriptor: "load location access grants",
    },
  );
  const { grants } = data ?? {};

  return (
    <Stack id="location-access-grants" gap="xs" {...otherProps}>
      {grants ? (
        !isEmpty(grants) ? (
          grants.map(grant => (
            <AdminLocationAccessGrantCard
              key={grant.id}
              {...{ grant }}
              autocopy={newGrantId === grant.id}
              onGrantDeleted={() => {
                void mutate();
                onGrantDeleted?.();
              }}
            />
          ))
        ) : (
          <EmptyCard itemLabel="grants" />
        )
      ) : (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [...new Array(3)].map((value, index) => (
          <Skeleton key={index} h={40} radius="default" />
        ))
      )}
      <Button
        leftSection={<AddIcon />}
        onClick={() => {
          openModal({
            title: "Create grant",
            children: (
              <LocationAccessGrantCreateForm
                onGrantCreated={grant => {
                  void mutate();
                  closeAllModals();
                  onGrantCreated?.(grant);
                }}
              />
            ),
          });
        }}
      >
        New grant
      </Button>
    </Stack>
  );
};

export default AdminLocationAccessGrants;
