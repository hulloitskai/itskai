import type { RequestOptions, PathHelper } from "@js-from-routes/client";
import type { Method } from "@inertiajs/core";
import useSWR, { SWRResponse } from "swr";

export interface FetchResult<Data>
  extends Omit<SWRResponse<Data, Error>, "isLoading" | "isValidating"> {
  fetching: boolean;
  validating: boolean;
}

export type FetchParams = {
  query?: Record<string, any>;
  [key: string]: any;
};

export type FetchOptions = Partial<Omit<RequestOptions, "method">> & {
  method?: Method;
  skip?: boolean;
  descriptor: string;
};

export const useFetch = <Data extends Record<string, any> & { error?: never }>(
  route: PathHelper,
  options: FetchOptions,
): FetchResult<Data> => {
  const key = useMemo(
    () => (options.skip ? null : route.path(options.params)),
    [options.skip, options.params, route],
  );
  const { isLoading, isValidating, ...swr } = useSWR<Data, Error>(
    key,
    async (): Promise<Data> => fetch(route, options),
  );
  return { fetching: isLoading, validating: isValidating, ...swr };
};

export const fetch = async <Data>(
  route: PathHelper,
  options: FetchOptions,
): Promise<Data> => {
  return route<Data>(options).catch(error => {
    console.error(`Failed to ${options.descriptor}`, { error });
    showNotice({
      title: `Failed to ${options.descriptor}`,
      message:
        typeof error === "string" ? error : "An unexpected error occurred.",
    });
    throw error;
  });
};
