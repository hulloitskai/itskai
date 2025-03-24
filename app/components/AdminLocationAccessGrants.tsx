import { type LocationAccessGrant } from "~/types";

import AdminLocationAccessGrantCard from "./AdminLocationAccessGrantCard";
import LocationAccessGrantCreateForm from "./AdminLocationAccessGrantCreateForm";

export interface AdminLocationAccessGrantsProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children"> {
  newGrantId?: string;
}

const AdminLocationAccessGrants: FC<AdminLocationAccessGrantsProps> = ({
  newGrantId,
  ...otherProps
}) => {
  // == Load grants
  const { data } = useRouteSWR<{ grants: LocationAccessGrant[] }>(
    routes.adminLocationAccessGrants.index,
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
              autoCopy={newGrantId === grant.id}
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
            title: "create grant",
            children: (
              <LocationAccessGrantCreateForm
                onGrantCreated={() => {
                  closeAllModals();
                }}
              />
            ),
          });
        }}
      >
        new grant
      </Button>
    </Stack>
  );
};

export default AdminLocationAccessGrants;
