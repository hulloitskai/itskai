import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import { LocationAccessGrantsQueryDocument } from "~/helpers/graphql";

import LocationAccessGrantCreateForm from "./LocationAccessGrantCreateForm";
import LocationAccessGrantCard from "./LocationAccessGrantCard";

export type LocationAccessGrantsProps = Omit<BoxProps, "children">;

const LocationAccessGrants: FC<LocationAccessGrantsProps> = ({
  ...otherProps
}) => {
  // == Query
  const onError = useApolloAlertCallback(
    "Failed to load location access grants",
  );
  const { data, previousData, refetch } = useQuery(
    LocationAccessGrantsQueryDocument,
    {
      onError,
    },
  );
  const { locationAccessGrants } = data ?? previousData ?? {};

  return (
    <Stack gap="xs" {...otherProps}>
      {locationAccessGrants ? (
        !isEmpty(locationAccessGrants) ? (
          locationAccessGrants.map(grant => (
            <LocationAccessGrantCard
              key={grant.id}
              onDeleteGrant={() => {
                refetch();
              }}
              {...{ grant }}
            />
          ))
        ) : (
          <EmptyCard itemLabel="grants" bg="var(--mantine-color-dark-filled)" />
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
                  refetch();
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
