import type { PageComponent, PagePropsWithData } from "~/helpers/inertia";
import { GeolocateControl } from "react-map-gl";

import type { Coordinates, LocationPageQuery } from "~/helpers/graphql";

import Map from "~/components/Map";

export type LocationPageProps = PagePropsWithData<LocationPageQuery>;

const TORONTO_COORDINATES: Coordinates = {
  latitude: 43.6532,
  longitude: -79.3832,
};

const LocationPage: PageComponent<LocationPageProps> = ({
  data: { location },
}) => {
  const { latitude, longitude } =
    location?.approximateCoordinates ?? TORONTO_COORDINATES;

  return (
    <Box pos="relative" style={{ flexGrow: 1 }}>
      <Map initialViewState={{ latitude, longitude, zoom: 11.5 }} scrollZoom>
        <GeolocateControl />
      </Map>
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
          Soon you&apos;ll be able to track Kai&apos;s location more precisely.
        </Alert>
      </Center>
    </Box>
  );
};

LocationPage.layout = buildLayout<LocationPageProps>(
  (page, { data: { viewer } }) => (
    <AppLayout
      title="Track"
      description="The ultimate Kai-stalking toolkit."
      padding={0}
      {...{ viewer }}
    >
      {page}
    </AppLayout>
  ),
);

export default LocationPage;
