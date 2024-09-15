import { type MapProps as _MapProps, type MapRef } from "react-map-gl";
import { default as _Map, NavigationControl } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export interface MapProps extends Omit<_MapProps, "mapboxAccessToken"> {
  navigationControl?: boolean;
}

const Map = forwardRef<MapRef, MapProps>(
  (
    {
      children,
      mapStyle = "mapbox://styles/mapbox/cj3kbeqzo00022smj7akz3o1e",
      navigationControl = true,
      ...otherProps
    },
    ref,
  ) => {
    const mapboxAccessToken = useMemo(() => getMeta("mapbox-access-token"), []);
    return (
      <_Map
        {...{ ref, mapboxAccessToken, mapStyle }}
        attributionControl={false}
        scrollZoom={false}
        {...otherProps}
      >
        {navigationControl && <NavigationControl />}
        {children}
      </_Map>
    );
  },
);

export default Map;
