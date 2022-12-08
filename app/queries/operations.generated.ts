import * as Types from 'app/queries/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AccountEditPageICloudCredentialsFragment = (
  { __typename?: 'ICloudCredentials' }
  & Pick<Types.ICloudCredentials, 'email' | 'password' | 'session' | 'cookies'>
);

export type AccountEditPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountEditPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name' | 'email' | 'unconfirmedEmail'>
  )>, icloudCredentials: Types.Maybe<(
    { __typename?: 'ICloudCredentials' }
    & Pick<Types.ICloudCredentials, 'id' | 'email' | 'password' | 'session' | 'cookies'>
  )>, spotifyCredentials: Types.Maybe<(
    { __typename?: 'OAuthCredentials' }
    & Pick<Types.OAuthCredentials, 'id' | 'uid' | 'refreshToken'>
  )> }
);

export type AccountEditPageSpotifyCredentialsFragment = (
  { __typename?: 'OAuthCredentials' }
  & Pick<Types.OAuthCredentials, 'uid' | 'refreshToken'>
);

export type AccountEditPageViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'name' | 'email' | 'unconfirmedEmail'>
);

export type AccountSignInPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountSignInPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type AccountSignUpPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AccountSignUpPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type AccountUpdateMutationVariables = Types.Exact<{
  input: Types.AccountUpdateInput;
}>;


export type AccountUpdateMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'AccountUpdatePayload' }
    & { user: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'ValidationError' }
      & Pick<Types.ValidationError, 'field' | 'message'>
    )>> }
  ) }
);

export type AppViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'isOwner' | 'name'>
);

export type ContactEmailQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ContactEmailQuery = (
  { __typename?: 'Query' }
  & { email: Types.Query['contactEmail'] }
);

export type CurrentlyPlayingIslandSpotifyTrackFragment = (
  { __typename?: 'SpotifyTrack' }
  & Pick<Types.SpotifyTrack, 'id' | 'url' | 'name'>
  & { album: (
    { __typename?: 'SpotifyAlbum' }
    & Pick<Types.SpotifyAlbum, 'id' | 'imageUrl'>
  ), artists: Array<(
    { __typename?: 'SpotifyArtist' }
    & Pick<Types.SpotifyArtist, 'id' | 'name'>
  )> }
);

export type CurrentlyPlayingIslandSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentlyPlayingIslandSubscription = (
  { __typename?: 'Subscription' }
  & { currentlyPlaying: Types.Maybe<(
    { __typename?: 'SpotifyTrack' }
    & Pick<Types.SpotifyTrack, 'id' | 'url' | 'name'>
    & { album: (
      { __typename?: 'SpotifyAlbum' }
      & Pick<Types.SpotifyAlbum, 'id' | 'imageUrl'>
    ), artists: Array<(
      { __typename?: 'SpotifyArtist' }
      & Pick<Types.SpotifyArtist, 'id' | 'name'>
    )> }
  )> }
);

export type CurrentlyPlayingSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentlyPlayingSubscription = (
  { __typename?: 'Subscription' }
  & { currentlyPlaying: Types.Maybe<(
    { __typename?: 'SpotifyTrack' }
    & Pick<Types.SpotifyTrack, 'name'>
  )> }
);

export type ErrorPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ErrorPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type HomePageGraphQueryVariables = Types.Exact<{
  modifiedAfter: Types.Scalars['DateTime'];
  first: Types.Scalars['Int'];
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type HomePageGraphQuery = (
  { __typename?: 'Query' }
  & { notesConnection: (
    { __typename?: 'ObsidianNoteConnection' }
    & { edges: Array<(
      { __typename?: 'ObsidianNoteEdge' }
      & { node: (
        { __typename?: 'ObsidianNote' }
        & Pick<Types.ObsidianNote, 'id' | 'name' | 'displayName' | 'url' | 'modifiedAt' | 'slug' | 'tags'>
        & { type: 'ObsidianNote', blurb: Types.ObsidianNote['plainBlurb'] }
        & { referencedBy: Array<(
          { __typename?: 'ObsidianNote' }
          & Pick<Types.ObsidianNote, 'id'>
        )>, references: Array<(
          { __typename?: 'ObsidianNote' }
          & Pick<Types.ObsidianNote, 'id'>
        ) | (
          { __typename?: 'ObsidianStub' }
          & Pick<Types.ObsidianStub, 'id'>
        )> }
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'endCursor' | 'hasNextPage'>
    ) }
  ) }
);

export type HomePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type ICloudCredentialsUpdateMutationVariables = Types.Exact<{
  input: Types.ICloudCredentialsUpdateInput;
}>;


export type ICloudCredentialsUpdateMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ICloudCredentialsUpdatePayload' }
    & { icloudCredentials: Types.Maybe<(
      { __typename?: 'ICloudCredentials' }
      & Pick<Types.ICloudCredentials, 'id'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'ValidationError' }
      & Pick<Types.ValidationError, 'field' | 'message'>
    )>> }
  ) }
);

export type ICloudCredentialsVerifySecurityCodeMutationVariables = Types.Exact<{
  input: Types.ICloudCredentialsVerifySecurityCodeInput;
}>;


export type ICloudCredentialsVerifySecurityCodeMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ICloudCredentialsVerifySecurityCodePayload' }
    & { icloudCredentials: (
      { __typename?: 'ICloudCredentials' }
      & Pick<Types.ICloudCredentials, 'id'>
    ) }
  ) }
);

export type JenPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type JenPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

type ObsidianGraphEntryFragment_ObsidianNote_ = (
  { __typename?: 'ObsidianNote' }
  & Pick<Types.ObsidianNote, 'id' | 'name' | 'displayName' | 'url' | 'modifiedAt' | 'slug' | 'tags'>
  & { type: 'ObsidianNote', blurb: Types.ObsidianNote['plainBlurb'] }
  & { referencedBy: Array<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id'>
  )>, references: Array<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id'>
  ) | (
    { __typename?: 'ObsidianStub' }
    & Pick<Types.ObsidianStub, 'id'>
  )> }
);

type ObsidianGraphEntryFragment_ObsidianStub_ = (
  { __typename?: 'ObsidianStub' }
  & Pick<Types.ObsidianStub, 'id' | 'name' | 'displayName'>
  & { type: 'ObsidianStub' }
  & { referencedBy: Array<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id'>
  )> }
);

export type ObsidianGraphEntryFragment = ObsidianGraphEntryFragment_ObsidianNote_ | ObsidianGraphEntryFragment_ObsidianStub_;

export type ObsidianGraphNoteFragment = (
  { __typename?: 'ObsidianNote' }
  & Pick<Types.ObsidianNote, 'id' | 'url' | 'modifiedAt' | 'slug' | 'name' | 'tags'>
  & { blurb: Types.ObsidianNote['plainBlurb'] }
  & { referencedBy: Array<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id'>
  )>, references: Array<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id'>
  ) | (
    { __typename?: 'ObsidianStub' }
    & Pick<Types.ObsidianStub, 'id'>
  )> }
);

export type ObsidianNoteContentNoteReferenceFragment = (
  { __typename?: 'ObsidianNote' }
  & Pick<Types.ObsidianNote, 'url'>
);

type ObsidianNoteContentReferenceFragment_ObsidianNote_ = (
  { __typename?: 'ObsidianNote' }
  & Pick<Types.ObsidianNote, 'name' | 'url'>
  & { type: 'ObsidianNote' }
);

type ObsidianNoteContentReferenceFragment_ObsidianStub_ = (
  { __typename?: 'ObsidianStub' }
  & Pick<Types.ObsidianStub, 'name'>
  & { type: 'ObsidianStub' }
);

export type ObsidianNoteContentReferenceFragment = ObsidianNoteContentReferenceFragment_ObsidianNote_ | ObsidianNoteContentReferenceFragment_ObsidianStub_;

export type ObsidianNotePageGraphQueryVariables = Types.Exact<{
  noteId: Types.Scalars['ID'];
}>;


export type ObsidianNotePageGraphQuery = (
  { __typename?: 'Query' }
  & { note: Types.Maybe<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id' | 'name' | 'displayName' | 'url' | 'modifiedAt' | 'slug' | 'tags'>
    & { type: 'ObsidianNote', blurb: Types.ObsidianNote['plainBlurb'] }
    & { references: Array<(
      { __typename?: 'ObsidianNote' }
      & Pick<Types.ObsidianNote, 'id' | 'name' | 'displayName' | 'url' | 'modifiedAt' | 'slug' | 'tags'>
      & { type: 'ObsidianNote', blurb: Types.ObsidianNote['plainBlurb'] }
      & { referencedBy: Array<(
        { __typename?: 'ObsidianNote' }
        & Pick<Types.ObsidianNote, 'id'>
      )>, references: Array<(
        { __typename?: 'ObsidianNote' }
        & Pick<Types.ObsidianNote, 'id'>
      ) | (
        { __typename?: 'ObsidianStub' }
        & Pick<Types.ObsidianStub, 'id'>
      )> }
    ) | (
      { __typename?: 'ObsidianStub' }
      & Pick<Types.ObsidianStub, 'id' | 'name' | 'displayName'>
      & { type: 'ObsidianStub' }
      & { referencedBy: Array<(
        { __typename?: 'ObsidianNote' }
        & Pick<Types.ObsidianNote, 'id'>
      )> }
    )>, referencedBy: Array<(
      { __typename?: 'ObsidianNote' }
      & Pick<Types.ObsidianNote, 'id' | 'name' | 'displayName' | 'url' | 'modifiedAt' | 'slug' | 'tags'>
      & { type: 'ObsidianNote', blurb: Types.ObsidianNote['plainBlurb'] }
      & { referencedBy: Array<(
        { __typename?: 'ObsidianNote' }
        & Pick<Types.ObsidianNote, 'id'>
      )>, references: Array<(
        { __typename?: 'ObsidianNote' }
        & Pick<Types.ObsidianNote, 'id'>
      ) | (
        { __typename?: 'ObsidianStub' }
        & Pick<Types.ObsidianStub, 'id'>
      )> }
    )> }
  )> }
);

export type ObsidianNotePageNoteFragment = (
  { __typename?: 'ObsidianNote' }
  & Pick<Types.ObsidianNote, 'name' | 'tags' | 'content' | 'blurb'>
  & { references: Array<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id' | 'name' | 'url'>
    & { type: 'ObsidianNote' }
  ) | (
    { __typename?: 'ObsidianStub' }
    & Pick<Types.ObsidianStub, 'id' | 'name'>
    & { type: 'ObsidianStub' }
  )> }
);

export type ObsidianNotePageQueryVariables = Types.Exact<{
  noteId: Types.Scalars['ID'];
}>;


export type ObsidianNotePageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )>, note: Types.Maybe<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id' | 'name' | 'tags' | 'content' | 'blurb'>
    & { references: Array<(
      { __typename?: 'ObsidianNote' }
      & Pick<Types.ObsidianNote, 'id' | 'name' | 'url'>
      & { type: 'ObsidianNote' }
    ) | (
      { __typename?: 'ObsidianStub' }
      & Pick<Types.ObsidianStub, 'id' | 'name'>
      & { type: 'ObsidianStub' }
    )> }
  )> }
);

export type ResumePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ResumePageQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'resume'>
);

export type TestFeedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type TestFeedSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Types.Subscription, 'testSubscription'>
);

export type TestMutationVariables = Types.Exact<{
  input: Types.TestMutationInput;
}>;


export type TestMutation = (
  { __typename?: 'Mutation' }
  & { testMutation: (
    { __typename?: 'TestMutationPayload' }
    & { model: Types.Maybe<(
      { __typename?: 'TestModel' }
      & Pick<Types.TestModel, 'id' | 'name' | 'birthday'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'ValidationError' }
      & Pick<Types.ValidationError, 'field' | 'message'>
    )>> }
  ) }
);

export type TestPageQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type TestPageQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'testEcho'>
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type WorkPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WorkPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export const AccountEditPageICloudCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountEditPageICloudCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"cookies"}}]}}]} as unknown as DocumentNode<AccountEditPageICloudCredentialsFragment, unknown>;
export const AccountEditPageSpotifyCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountEditPageSpotifyCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]} as unknown as DocumentNode<AccountEditPageSpotifyCredentialsFragment, unknown>;
export const AccountEditPageViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AccountEditPageViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"unconfirmedEmail"}}]}}]} as unknown as DocumentNode<AccountEditPageViewerFragment, unknown>;
export const AppViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<AppViewerFragment, unknown>;
export const CurrentlyPlayingIslandSpotifyTrackFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingIslandSpotifyTrackFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotifyTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandSpotifyTrackFragment, unknown>;
export const ObsidianGraphNoteFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianGraphNoteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","alias":{"kind":"Name","value":"blurb"},"name":{"kind":"Name","value":"plainBlurb"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ObsidianGraphNoteFragment, unknown>;
export const ObsidianGraphEntryFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"type"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphNoteFragment"}}]}},...ObsidianGraphNoteFragment.definitions]} as unknown as DocumentNode<ObsidianGraphEntryFragment, unknown>;
export const ObsidianNoteContentNoteReferenceFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNoteContentNoteReferenceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<ObsidianNoteContentNoteReferenceFragment, unknown>;
export const ObsidianNoteContentReferenceFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNoteContentReferenceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"type"},"name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNoteContentNoteReferenceFragment"}}]}},...ObsidianNoteContentNoteReferenceFragment.definitions]} as unknown as DocumentNode<ObsidianNoteContentReferenceFragment, unknown>;
export const ObsidianNotePageNoteFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNotePageNoteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"blurb"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNoteContentReferenceFragment"}}]}}]}},...ObsidianNoteContentReferenceFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageNoteFragment, unknown>;
export const AccountEditPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountEditPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountEditPageViewerFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountEditPageICloudCredentialsFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotifyCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AccountEditPageSpotifyCredentialsFragment"}}]}}]}},...AppViewerFragment.definitions,...AccountEditPageViewerFragment.definitions,...AccountEditPageICloudCredentialsFragment.definitions,...AccountEditPageSpotifyCredentialsFragment.definitions]} as unknown as DocumentNode<AccountEditPageQuery, AccountEditPageQueryVariables>;
export const AccountSignInPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountSignInPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<AccountSignInPageQuery, AccountSignInPageQueryVariables>;
export const AccountSignUpPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountSignUpPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<AccountSignUpPageQuery, AccountSignUpPageQueryVariables>;
export const AccountUpdateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountUpdateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"accountUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<AccountUpdateMutation, AccountUpdateMutationVariables>;
export const ContactEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContactEmailQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"email"},"name":{"kind":"Name","value":"contactEmail"}}]}}]} as unknown as DocumentNode<ContactEmailQuery, ContactEmailQueryVariables>;
export const CurrentlyPlayingIslandSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CurrentlyPlayingIslandSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentlyPlayingIslandSpotifyTrackFragment"}}]}}]}},...CurrentlyPlayingIslandSpotifyTrackFragment.definitions]} as unknown as DocumentNode<CurrentlyPlayingIslandSubscription, CurrentlyPlayingIslandSubscriptionVariables>;
export const CurrentlyPlayingSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CurrentlyPlayingSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CurrentlyPlayingSubscription, CurrentlyPlayingSubscriptionVariables>;
export const ErrorPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ErrorPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<ErrorPageQuery, ErrorPageQueryVariables>;
export const HomePageGraphQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageGraphQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modifiedAfter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"notesConnection"},"name":{"kind":"Name","value":"obsidianNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"modifiedAfter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modifiedAfter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},...ObsidianGraphEntryFragment.definitions]} as unknown as DocumentNode<HomePageGraphQuery, HomePageGraphQueryVariables>;
export const HomePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const ICloudCredentialsUpdateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ICloudCredentialsUpdateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentialsUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"icloudCredentialsUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ICloudCredentialsUpdateMutation, ICloudCredentialsUpdateMutationVariables>;
export const ICloudCredentialsVerifySecurityCodeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ICloudCredentialsVerifySecurityCodeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentialsVerifySecurityCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"icloudCredentialsVerifySecurityCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ICloudCredentialsVerifySecurityCodeMutation, ICloudCredentialsVerifySecurityCodeMutationVariables>;
export const JenPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JenPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<JenPageQuery, JenPageQueryVariables>;
export const ObsidianNotePageGraphQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObsidianNotePageGraphQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"note"},"name":{"kind":"Name","value":"obsidianNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}}]}}]}},...ObsidianGraphEntryFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageGraphQuery, ObsidianNotePageGraphQueryVariables>;
export const ObsidianNotePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObsidianNotePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"note"},"name":{"kind":"Name","value":"obsidianNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNotePageNoteFragment"}}]}}]}},...AppViewerFragment.definitions,...ObsidianNotePageNoteFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageQuery, ObsidianNotePageQueryVariables>;
export const ResumePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResumePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resume"}}]}}]} as unknown as DocumentNode<ResumePageQuery, ResumePageQueryVariables>;
export const TestFeedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TestFeedSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscription"}}]}}]} as unknown as DocumentNode<TestFeedSubscription, TestFeedSubscriptionVariables>;
export const TestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<TestMutation, TestMutationVariables>;
export const TestPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testEcho"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<TestPageQuery, TestPageQueryVariables>;
export const WorkPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<WorkPageQuery, WorkPageQueryVariables>;