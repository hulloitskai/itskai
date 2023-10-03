import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { GeolocateControl, Marker } from "react-map-gl";

import {
  LocationPageSubscriptionDocument,
  type LocationPageQuery,
} from "~/helpers/graphql";
import type {
  LocationPageSubscriptionVariables,
  Maybe,
} from "~/helpers/graphql";
import type { Coordinates } from "~/helpers/graphql";

import AppLayout from "~/components/AppLayout";
import Map from "~/components/Map";

export type LocationPageProps = PagePropsWithData<LocationPageQuery> & {
  readonly password: Maybe<string>;
};

const TORONTO_COORDINATES: Readonly<Coordinates> = {
  latitude: 43.6532,
  longitude: -79.3832,
};

const LocationPage: PageComponent<LocationPageProps> = ({
  password,
  data: { location: initialLocation },
}) => {
  const mapCenter =
    initialLocation?.approximateCoordinates ?? TORONTO_COORDINATES;

  // == Subscription
  const subscriptionVariables = useMemo<
    LocationPageSubscriptionVariables | undefined
  >(() => (password ? { password } : undefined), [password]);
  const { data } = useSubscription(LocationPageSubscriptionDocument, {
    variables: subscriptionVariables,
    skip: !subscriptionVariables,
    onError: error => {
      console.error("Error during location update", formatJSON({ error }));
    },
  });
  const { location } = data ?? {};

  return (
    <Flex
      pos="relative"
      style={{ flexGrow: 1, alignItems: "stretch", flexDirection: "column" }}
    >
      <Map
        initialViewState={{ ...mapCenter, zoom: 11.5 }}
        scrollZoom
        style={{ flexGrow: 1 }}
      >
        <GeolocateControl />
        {location && <Marker {...location.coordinates}></Marker>}
      </Map>
      {!location && (
        <Center
          pos="absolute"
          style={({ spacing }) => ({
            left: spacing.md,
            right: spacing.md,
            bottom: spacing.lg,
            pointerEvents: "none",
          })}
        >
          <Alert
            title="Kai's somewhere around here..."
            radius="md"
            bg="dark"
            styles={{
              title: {
                marginBottom: 0,
              },
            }}
          >
            Soon you&apos;ll be able to track Kai&apos;s location more
            precisely.
          </Alert>
        </Center>
      )}
    </Flex>
  );
};

LocationPage.layout = buildLayout<LocationPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Track"
      description="The ultimate Kai-stalking toolkit."
      noIndex
      padding={0}
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default LocationPage;
