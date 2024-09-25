import { type LocationAccessGrant } from "~/types";

import { type AdminLocationAccessGrantCardProps } from "./AdminLocationAccessGrantCard";
import AdminLocationAccessGrantCard from "./AdminLocationAccessGrantCard";
import { type LocationAccessGrantCreateFormProps } from "./AdminLocationAccessGrantCreateForm";
import LocationAccessGrantCreateForm from "./AdminLocationAccessGrantCreateForm";

import classes from "./AdminLocationAccessGrants.module.css";

export interface AdminLocationAccessGrantsProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children">,
    Pick<LocationAccessGrantCreateFormProps, "onCreated">,
    Pick<AdminLocationAccessGrantCardProps, "onDeleted"> {
  newGrantId?: string;
}

const AdminLocationAccessGrants: FC<AdminLocationAccessGrantsProps> = ({
  newGrantId,
  onCreated,
  onDeleted,
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
              onDeleted={() => {
                mutate();
                onDeleted?.();
              }}
            />
          ))
        ) : (
          <EmptyCard itemLabel="grants" className={classes.emptyCard} />
        )
      ) : (
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
                onCreated={grant => {
                  mutate();
                  closeAllModals();
                  onCreated?.(grant);
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
