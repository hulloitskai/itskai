import { type PathHelper } from "@js-from-routes/client";
import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";

import { fetchRoute, type FetchRouteOptions } from ".";

export interface FetchSWRResult<Data>
  extends Omit<SWRResponse<Data, Error>, "isLoading" | "isValidating"> {
  fetching: boolean;
  validating: boolean;
}

export type FetchSWROptions = FetchRouteOptions & SWRConfiguration;

export type FetchSWRParams = {
  query?: Record<string, any>;
  [key: string]: any;
};

export const useFetchSWR = <
  Data extends Record<string, any> & { error?: never },
>(
  route: PathHelper,
  {
    method,
    skip,
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
  }: FetchRouteOptions,
): FetchSWRResult<Data> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const key = useMemo(() => (skip ? null : route.path(params)), [skip]);
  const { isLoading, isValidating, ...swr } = useSWR<Data, Error>(
    key,
    async (route: string): Promise<Data> =>
      fetchRoute(route, {
        failSilently,
        descriptor,
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
