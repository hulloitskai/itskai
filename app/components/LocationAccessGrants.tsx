import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import { LocationAccessGrantsQueryDocument } from "~/helpers/graphql";

import LocationAccessGrantCreateForm from "./LocationAccessGrantCreateForm";
import LocationAccessGrantCard from "./LocationAccessGrantCard";

import classes from "./LocationAccessGrants.module.css";

export type LocationAccessGrantsProps = BoxProps;

const LocationAccessGrants: FC<LocationAccessGrantsProps> = ({
  ...otherProps
}) => {
  // == Load grants
  const onLoadGrantsError = useApolloAlertCallback(
    "Failed to load location access grants",
  );
  const {
    data: grantsData,
    previousData: previousGrantsData,
    refetch: refetchGrants,
  } = useQuery(LocationAccessGrantsQueryDocument, {
    onError: onLoadGrantsError,
  });
  const { locationAccessGrants } = grantsData ?? previousGrantsData ?? {};

  return (
    <Stack id="location-access-grants" gap="xs" {...otherProps}>
      {locationAccessGrants ? (
        !isEmpty(locationAccessGrants) ? (
          locationAccessGrants.map(grant => (
            <LocationAccessGrantCard
              key={grant.id}
              onDeleteGrant={() => {
                refetchGrants();
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
                onCreate={() => {
                  refetchGrants();
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
