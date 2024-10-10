import { type PathHelper } from "@js-from-routes/client";
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";

import { fetchRoute, type FetchRouteOptions } from ".";

export interface FetchSWRResult<Data>
  extends Omit<SWRResponse<Data, Error>, "isLoading" | "isValidating"> {
  fetching: boolean;
  validating: boolean;
}

export type FetchSWROptions = FetchRouteOptions & SWRConfiguration;

export interface FetchSWRParams {
  query?: Record<string, any>;
  [key: string]: any;
}

export const useFetchSWR = <
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
  const { isPaused } = swrConfiguration;
  const computeKey = useCallback(
    (route: PathHelper, params: FetchSWROptions["params"]): string | null =>
      isPaused?.() ? null : route.path(params),
    [isPaused],
  );
  const [key, setKey] = useState(() => computeKey(route, params));
  const firstRender = useRef(true);
  useShallowEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setKey(computeKey(route, params));
    }
  }, [computeKey, route, params]);
  const { isLoading, isValidating, ...swr } = useSWR<Data, Error>(
    key,
    async (route: string): Promise<Data> =>
      fetchRoute(route, {
        failSilently,
        descriptor,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data,
        deserializeData,
        fetchOptions,
        method,
        serializeData,
        responseAs,
        headers,
      }),
    swrConfiguration,
  );
  return { fetching: isLoading, validating: isValidating, ...swr };
};
