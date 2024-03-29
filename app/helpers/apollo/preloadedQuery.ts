import { useEffect } from "react";

import { NetworkStatus, useApolloClient, useQuery } from "@apollo/client";
import type {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
} from "@apollo/client";

type PreloadedQueryHookOptions<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
> = QueryHookOptions<TData, TVariables> & {
  readonly initialData: TData;
};

export const usePreloadedQuery = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: PreloadedQueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> & { coalescedData: TData } => {
  const { initialData, ...queryOptions } = options;
  const client = useApolloClient();
  useEffect(() => {
    const { variables } = queryOptions;
    client.writeQuery({
      query,
      variables,
      data: initialData,
    });
  }, [client, query, queryOptions, initialData]);
  const { loading, ...otherValues } = useQuery(query, {
    initialFetchPolicy: "cache-only",
    ...queryOptions,
  });
  const { data, previousData, networkStatus } = otherValues;
  return {
    coalescedData: data ?? previousData ?? initialData,
    loading: networkStatus == NetworkStatus.loading ? false : loading,
    ...otherValues,
  };
};
