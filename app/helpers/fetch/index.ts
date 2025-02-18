import {
  type Method,
  type PathHelper,
  request,
  type RequestOptions,
  type ResponseError,
} from "@js-from-routes/client";
import { useIsFirstRender, useNetwork, useShallowEffect } from "@mantine/hooks";
import { omit } from "lodash-es";
import { useState } from "react";
import { toast } from "sonner";
import useSWR, { type Key, type SWRConfiguration, type SWRResponse } from "swr";
import useSWRMutation, {
  type SWRMutationConfiguration,
  type SWRMutationResponse,
} from "swr/mutation";

export { setupFetch } from "./setup";

export type FetchRouteOptions = Partial<
  Omit<RequestOptions, "method" | "fetch">
> & {
  descriptor: string;
  method?: Method;
  failSilently?: boolean;
};

export const fetchRoute = async <Data>(
  route: PathHelper | string,
  options: FetchRouteOptions,
): Promise<Data> => {
  const { descriptor, failSilently, ...routeOptions } = options;
  const handleError = (responseError: ResponseError) => {
    const { body } = responseError; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    if (body !== null && typeof body === "object" && "error" in body) {
      const { error } = body; // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      console.error(`Failed to ${descriptor}`, error);
      if (!failSilently) {
        toast.error(`Failed to ${descriptor}`, {
          description:
            typeof error === "string" ? error : "An unknown error occurred.",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      throw new Error(error);
    } else {
      console.error(`Failed to ${descriptor}`, responseError);
      if (!failSilently) {
        toast.error(`Failed to ${descriptor}`, {
          description: responseError.message,
        });
      }
      throw responseError;
    }
  };
  if (typeof route === "string") {
    const { method, ...requestOptions } = omit(routeOptions, "params");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request(method ?? "get", route, requestOptions).catch(handleError);
  }
  return route<Data>(routeOptions).catch(handleError);
};

export interface FetchRouteResponse<Data>
  extends Omit<SWRResponse<Data, Error>, "isLoading" | "isValidating"> {
  fetching: boolean;
  validating: boolean;
}

export type UseFetchRouteOptions<Data> = Omit<FetchRouteOptions, "params"> &
  SWRConfiguration<Data, Error> & {
    params?: FetchRouteOptions["params"] | null;
  };

export const useFetchRoute = <
  Data extends Record<string, any> & { error?: never },
>(
  route: PathHelper,
  options: UseFetchRouteOptions<Data>,
): FetchRouteResponse<Data> => {
  const {
    method,
    failSilently,
    descriptor,
    params,
    data, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    deserializeData,
    fetchOptions,
    serializeData,
    responseAs,
    headers,
    ...swrConfiguration
  } = options;

  // NOTE: Avoid 'isVisible is not a function', etc.
  if (!swrConfiguration.isVisible) {
    delete swrConfiguration.isVisible;
  }
  if (!swrConfiguration.isOnline) {
    delete swrConfiguration.isOnline;
  }

  const key = useRouteKey(route, params);
  const { online } = useNetwork();
  const { isLoading, isValidating, ...swr } = useSWR<Data, Error>(
    key,
    async (url: string): Promise<Data> =>
      fetchRoute(url, {
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
      }),
    { isOnline: () => online, ...swrConfiguration },
  );

  return { fetching: isLoading, validating: isValidating, ...swr };
};

export interface MutateRouteResponse<Data, ExtraArg>
  extends Omit<SWRMutationResponse<Data, Error, Key, ExtraArg>, "isMutating"> {
  mutating: boolean;
}

export type UseMutateRouteOptions<Data, ExtraArg> = Omit<
  FetchRouteOptions,
  "params"
> &
  SWRMutationConfiguration<Data, Error, Key, ExtraArg, Data> & {
    params?: FetchRouteOptions["params"] | null;
  };

export const useMutateRoute = <
  Data extends Record<string, any> & { error?: never },
  ExtraArg = any,
>(
  route: PathHelper,
  options: UseMutateRouteOptions<Data, ExtraArg>,
): MutateRouteResponse<Data, ExtraArg> => {
  const {
    method,
    failSilently,
    descriptor,
    params,
    data, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    deserializeData,
    fetchOptions,
    serializeData,
    responseAs,
    headers,
    ...swrConfiguration
  } = options;
  const key = useRouteKey(route, params);
  const { isMutating: mutating, ...swr } = useSWRMutation<
    Data,
    Error,
    Key,
    ExtraArg
  >(
    key,
    async (url: string, { arg }: { arg: ExtraArg }): Promise<Data> =>
      fetchRoute(url, {
        failSilently,
        descriptor,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: arg ?? data,
        deserializeData,
        fetchOptions,
        method: method ?? route.httpMethod,
        serializeData,
        responseAs,
        headers,
      }),
    swrConfiguration,
  );

  return { mutating, ...swr };
};

const computeRouteKey = (
  route: PathHelper,
  params: RequestOptions["params"] | null,
): string | null => (params === null ? null : route.path(params));

const useRouteKey = (
  route: PathHelper,
  params: RequestOptions["params"] | null,
): string | null => {
  const [key, setKey] = useState(() => computeRouteKey(route, params));
  const isFirstRender = useIsFirstRender();
  useShallowEffect(() => {
    if (!isFirstRender) {
      setKey(computeRouteKey(route, params));
    }
  }, [route, params]); // eslint-disable-line react-hooks/exhaustive-deps
  return key;
};
