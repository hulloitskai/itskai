import type { ComponentPropsWithoutRef, FC } from "react";
import type { LocationAccessGrant } from "~/types";
import type { BoxProps } from "@mantine/core";

import type { LocationAccessGrantCreateFormProps } from "./AdminLocationAccessGrantCreateForm";
import LocationAccessGrantCreateForm from "./AdminLocationAccessGrantCreateForm";

import type { AdminLocationAccessGrantCardProps } from "./AdminLocationAccessGrantCard";
import AdminLocationAccessGrantCard from "./AdminLocationAccessGrantCard";

import classes from "./AdminLocationAccessGrants.module.css";

export interface AdminLocationAccessGrantsProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children">,
    Pick<LocationAccessGrantCreateFormProps, "onCreated">,
    Pick<AdminLocationAccessGrantCardProps, "onDeleted"> {}

const AdminLocationAccessGrants: FC<AdminLocationAccessGrantsProps> = ({
  onCreated,
  onDeleted,
  ...otherProps
}) => {
  // == Grants
  const { data, mutate } = useFetch<{ grants: LocationAccessGrant[] }>(
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
              onDeleted={() => {
                mutate();
                onDeleted?.();
              }}
              {...{ grant }}
            />
          ))
        ) : (
          <EmptyCard itemLabel="grants" className={classes.emptyCard} />
        )
      ) : (
        [...new Array(3)].map((value, index) => (
          <Skeleton key={index} h={40} radius="md" />
        ))
      )}
      <Button
        leftSection={<AddIcon />}
        onClick={() => {
          openModal({
            title: "Create Grant",
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
