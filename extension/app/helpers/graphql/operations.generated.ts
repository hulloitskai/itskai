import * as Types from './types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ImportCookiesMutationVariables = Types.Exact<{
  input: Types.ImportCookiesInput;
}>;


export type ImportCookiesMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ImportCookiesPayload' }
    & Pick<Types.ImportCookiesPayload, 'success'>
  ) }
);


export const ImportCookiesMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportCookiesMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportCookiesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"importCookies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ImportCookiesMutation, ImportCookiesMutationVariables>;