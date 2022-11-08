import { useApolloClient, useQuery } from "@apollo/client";
import type {
  DocumentNode,
  OperationVariables,
  QueryHookOptions,
  QueryResult,
  TypedDocumentNode,
} from "@apollo/client";

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
