import { type PathHelper } from "@js-from-routes/client";
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";

import { fetchRoute, type FetchRouteOptions } from ".";

export interface FetchSWRResult<Data>
  extends Omit<SWRResponse<Data, Error>, "isLoading" | "isValidating"> {
  fetching: boolean;
  validating: boolean;
}

export type FetchSWROptions = Omit<FetchRouteOptions, "params"> &
  SWRConfiguration & {
    params?: FetchRouteOptions["params"] | null;
  };

export interface FetchSWRParams {
  query?: Record<string, any>;
  [key: string]: any;
}

export const useFetchRoute = <
  Data extends Record<string, any> & { error?: never },
>(
  route: PathHelper,
  {
    method,
    failSilently,
    descriptor,
    params,
    data,
    deserializeData,
    fetchOptions,
    serializeData,
    responseAs,
    headers,
    ...swrConfiguration
  }: FetchSWROptions,
): FetchSWRResult<Data> => {
  const computeKey = useCallback(
    (route: PathHelper, params: FetchSWROptions["params"]): string | null =>
      params === null ? null : route.path(params),
    [],
  );
  const [key, setKey] = useState(() => computeKey(route, params));
  const firstRenderRef = useRef(true);
  useShallowEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      setKey(computeKey(route, params));
    }
  }, [computeKey, route, params]);
  const { isLoading, isValidating, ...swr } = useSWR<Data, Error>(
    key,
    async (url: string): Promise<Data> => {
      return fetchRoute(url, {
        failSilently,
        descriptor,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
        deserializeData,
        fetchOptions,
        method: method ?? route.httpMethod,
        serializeData,
        responseAs,
        headers,
      });
    },
    swrConfiguration,
  );
  return { fetching: isLoading, validating: isValidating, ...swr };
};
