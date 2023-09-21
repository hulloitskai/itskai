import type { FC } from "react";

import { default as _Map, NavigationControl } from "react-map-gl";
import type { MapProps as _MapProps } from "react-map-gl";

export type MapProps = Omit<_MapProps, "mapboxAccessToken">;

const Map: FC<MapProps> = ({
  mapStyle = "mapbox://styles/mapbox/streets-v12",
  children,
  ...otherProps
}) => {
  const mapboxAccessToken = useMemo(() => getMeta("mapbox-access-token"), []);
  return (
    <_Map
      attributionControl={false}
      scrollZoom={false}
      {...{ mapboxAccessToken, mapStyle }}
      {...otherProps}
    >
      <NavigationControl />
      {children}
    </_Map>
  );
};

export default Map;
