import type { ComponentPropsWithoutRef, FC } from "react";
import type { LocationAccessGrant } from "~/types";
import type { BoxProps } from "@mantine/core";

import type { LocationAccessGrantCreateFormProps } from "./LocationAccessGrantCreateForm";
import LocationAccessGrantCreateForm from "./LocationAccessGrantCreateForm";

import type { LocationAccessGrantCardProps } from "./LocationAccessGrantCard";
import LocationAccessGrantCard from "./LocationAccessGrantCard";

import classes from "./LocationAccessGrants.module.css";

export interface LocationAccessGrantsProps
  extends BoxProps,
    Omit<ComponentPropsWithoutRef<"div">, "style" | "children">,
    Pick<LocationAccessGrantCreateFormProps, "onCreated">,
    Pick<LocationAccessGrantCardProps, "onDeleted"> {}

const LocationAccessGrants: FC<LocationAccessGrantsProps> = ({
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
            <LocationAccessGrantCard
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

export default LocationAccessGrants;
