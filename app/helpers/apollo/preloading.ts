import { NetworkStatus, useApolloClient, useQuery } from "@apollo/client/index";
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
  initialData: TData;
};

export const usePreloadedQuery = <
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: PreloadedQueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables> & { coalescedData: TData } => {
  const { initialData, ...queryOptions } = options;
  const { variables } = queryOptions;
  const client = useApolloClient();
  if (!import.meta.env.SSR) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      client.writeQuery({
        query: query,
        variables,
        data: initialData,
      });
    }, [client, query, initialData]);
  }
  const { loading, ...otherValues } = useQuery(query, queryOptions);
  const { data, previousData, networkStatus } = otherValues;
  return {
    coalescedData: data ?? previousData ?? initialData,
    loading: networkStatus == NetworkStatus.loading ? false : loading,
    ...otherValues,
  };
};
