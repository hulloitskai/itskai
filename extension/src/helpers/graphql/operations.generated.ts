import * as Types from './types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SyncCookiesMutationVariables = Types.Exact<{
  input: Types.SyncCookiesInput;
}>;


export type SyncCookiesMutation = (
  { __typename?: 'Mutation' }
  & { syncCookies: (
    { __typename?: 'SyncCookiesPayload' }
    & Pick<Types.SyncCookiesPayload, 'success'>
  ) }
);


export const SyncCookiesMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncCookiesMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SyncCookiesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"syncCookies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SyncCookiesMutation, SyncCookiesMutationVariables>;