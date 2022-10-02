import {
  ApolloClient,
  ApolloError,
  DocumentNode,
  InMemoryCache,
  NormalizedCacheObject,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  ServerError,
  TypedDocumentNode,
  useApolloClient,
  useQuery,
} from "@apollo/client";

import { createApolloLink } from "./apollo/link.client";

// import type { StrictTypedTypePolicies as TypePolicies } from "~/graphql/apollo/helpers.generated";
// const typePolicies: TypePolicies = {};

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    // ssrForceFetchDelay: typeof window !== "undefined" ? 100 : undefined,
    link: createApolloLink(),
    cache: new InMemoryCache({}),
    defaultOptions: {
      watchQuery: {
        // The first time a browser-side `watchQuery` is run, attempt to load
        // data from the cache, before making a network request.
        fetchPolicy: "cache-first",
      },
    },
  });
};

export const formatApolloError = (error: ApolloError): string => {
  const { graphQLErrors, networkError, message } = error;
  const graphQLError = first(graphQLErrors);
  if (graphQLError) {
    return formatError(graphQLError);
  }
  if (networkError) {
    if ((networkError as ServerError | undefined)?.statusCode === 500) {
      return "An internal server error occurred.";
    }
  }
  return message;
};

type PreloadedQueryHookOptions<
  TData = any,
  TVariables = OperationVariables,
> = QueryHookOptions<TData, TVariables> & {
  initialData: TData;
  initialVariables?: TVariables;
};

export const usePreloadedQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: PreloadedQueryHookOptions<TData, TVariables>,
): Omit<QueryResult<TData, TVariables>, "data"> & { data: TData } => {
  const { initialData, initialVariables, ...otherOptions } = options;
  const client = useApolloClient();
  if (typeof window !== "undefined") {
    useEffect(() => {
      client.writeQuery({
        query: query,
        data: initialData,
        variables: initialVariables,
      });
    }, [client, query, initialData]);
  }
  const { data, ...otherValues } = useQuery(query, otherOptions);
  return { data: data || initialData, ...otherValues };
};
