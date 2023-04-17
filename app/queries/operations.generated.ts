import * as Types from 'app/queries/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ActivityStatusBadgeSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type ActivityStatusBadgeSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Types.Subscription, 'activityStatus'>
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

export type ErrorPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ErrorPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type HomePageEntriesQueryVariables = Types.Exact<{
  startCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type HomePageEntriesQuery = (
  { __typename?: 'Query' }
  & { entries: (
    { __typename?: 'NotionPageListing' }
    & Pick<Types.NotionPageListing, 'nextCursor'>
    & { items: Array<(
      { __typename?: 'NotionPage' }
      & Pick<Types.NotionPage, 'id' | 'createdAt' | 'title' | 'blocks'>
    )> }
  ) }
);

export type HomePageGraphQueryVariables = Types.Exact<{
  modifiedAfter: Types.Scalars['DateTime'];
  first: Types.Scalars['Int'];
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type HomePageGraphQuery = (
  { __typename?: 'Query' }
  & { obsidianNotes: (
    { __typename?: 'ObsidianNoteConnection' }
    & { edges: Array<(
      { __typename?: 'ObsidianNoteEdge' }
      & { node: (
        { __typename?: 'ObsidianNote' }
        & Pick<Types.ObsidianNote, 'id' | 'name' | 'title' | 'url' | 'modifiedAt' | 'tags'>
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
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
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

export type NotionCommentCreateMutationVariables = Types.Exact<{
  input: Types.NotionCommentCreateInput;
}>;


export type NotionCommentCreateMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'NotionCommentCreatePayload' }
    & Pick<Types.NotionCommentCreatePayload, 'success'>
  ) }
);

export type NotionEntryCommentsQueryVariables = Types.Exact<{
  pageId: Types.Scalars['String'];
  startCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type NotionEntryCommentsQuery = (
  { __typename?: 'Query' }
  & { comments: (
    { __typename?: 'NotionCommentListing' }
    & Pick<Types.NotionCommentListing, 'nextCursor'>
    & { items: Array<(
      { __typename?: 'NotionComment' }
      & Pick<Types.NotionComment, 'id' | 'createdAt' | 'richText'>
    )> }
  ) }
);

export type NotionEntryPageFragment = (
  { __typename?: 'NotionPage' }
  & Pick<Types.NotionPage, 'id' | 'createdAt' | 'title' | 'blocks'>
);

type ObsidianGraphEntryFragment_ObsidianNote_ = (
  { __typename?: 'ObsidianNote' }
  & Pick<Types.ObsidianNote, 'id' | 'name' | 'title' | 'url' | 'modifiedAt' | 'tags'>
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
  & Pick<Types.ObsidianStub, 'id' | 'name' | 'title'>
  & { type: 'ObsidianStub' }
  & { referencedBy: Array<(
    { __typename?: 'ObsidianNote' }
    & Pick<Types.ObsidianNote, 'id'>
  )> }
);

export type ObsidianGraphEntryFragment = ObsidianGraphEntryFragment_ObsidianNote_ | ObsidianGraphEntryFragment_ObsidianStub_;

export type ObsidianGraphNoteFragment = (
  { __typename?: 'ObsidianNote' }
  & Pick<Types.ObsidianNote, 'id' | 'url' | 'modifiedAt' | 'name' | 'tags'>
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
    & Pick<Types.ObsidianNote, 'id' | 'name' | 'title' | 'url' | 'modifiedAt' | 'tags'>
    & { type: 'ObsidianNote', blurb: Types.ObsidianNote['plainBlurb'] }
    & { references: Array<(
      { __typename?: 'ObsidianNote' }
      & Pick<Types.ObsidianNote, 'id' | 'name' | 'title' | 'url' | 'modifiedAt' | 'tags'>
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
      & Pick<Types.ObsidianStub, 'id' | 'name' | 'title'>
      & { type: 'ObsidianStub' }
      & { referencedBy: Array<(
        { __typename?: 'ObsidianNote' }
        & Pick<Types.ObsidianNote, 'id'>
      )> }
    )>, referencedBy: Array<(
      { __typename?: 'ObsidianNote' }
      & Pick<Types.ObsidianNote, 'id' | 'name' | 'title' | 'url' | 'modifiedAt' | 'tags'>
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
  & Pick<Types.ObsidianNote, 'name' | 'title' | 'tags' | 'content' | 'blurb'>
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
    & Pick<Types.ObsidianNote, 'id' | 'name' | 'title' | 'tags' | 'content' | 'blurb'>
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

export type ObsidianNoteSynchronizeMutationVariables = Types.Exact<{
  input: Types.ObsidianNoteSynchronizeInput;
}>;


export type ObsidianNoteSynchronizeMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ObsidianNoteSynchronizePayload' }
    & Pick<Types.ObsidianNoteSynchronizePayload, 'success'>
  ) }
);

export type PasswordWithStrengthCheckInputQueryVariables = Types.Exact<{
  password: Types.Scalars['String'];
}>;


export type PasswordWithStrengthCheckInputQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'passwordStrength'>
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
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
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

export type UserChangeEmailMutationVariables = Types.Exact<{
  input: Types.UserChangeEmailInput;
}>;


export type UserChangeEmailMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UserChangeEmailPayload' }
    & { user: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id' | 'unverifiedEmail'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UserChangePasswordPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserChangePasswordPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type UserLoginPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserLoginPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type UserRegisterPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserRegisterPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type UserSendEmailVerificationInstructionsMutationVariables = Types.Exact<{
  input: Types.UserSendEmailVerificationInstructionsInput;
}>;


export type UserSendEmailVerificationInstructionsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UserSendEmailVerificationInstructionsPayload' }
    & Pick<Types.UserSendEmailVerificationInstructionsPayload, 'success'>
  ) }
);

export type UserSendEmailVerificationInstructionsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserSendEmailVerificationInstructionsPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type UserSendPasswordResetInstructionsMutationVariables = Types.Exact<{
  input: Types.UserSendPasswordResetInstructionsInput;
}>;


export type UserSendPasswordResetInstructionsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UserSendPasswordResetInstructionsPayload' }
    & Pick<Types.UserSendPasswordResetInstructionsPayload, 'success'>
  ) }
);

export type UserSendPasswordResetInstructionsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserSendPasswordResetInstructionsPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type UserSettingsPageICloudCredentialsFragment = (
  { __typename?: 'ICloudCredentials' }
  & Pick<Types.ICloudCredentials, 'email' | 'password' | 'session' | 'cookies'>
);

export type UserSettingsPageOAuthCredentialsFragment = (
  { __typename?: 'OAuthCredentials' }
  & Pick<Types.OAuthCredentials, 'uid' | 'accessToken' | 'refreshToken'>
);

export type UserSettingsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserSettingsPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name' | 'email' | 'unverifiedEmail'>
  )>, icloudCredentials: Types.Maybe<(
    { __typename?: 'ICloudCredentials' }
    & Pick<Types.ICloudCredentials, 'id' | 'email' | 'password' | 'session' | 'cookies'>
  )>, spotifyCredentials: Types.Maybe<(
    { __typename?: 'OAuthCredentials' }
    & Pick<Types.OAuthCredentials, 'id' | 'uid' | 'accessToken' | 'refreshToken'>
  )>, linearCredentials: Types.Maybe<(
    { __typename?: 'OAuthCredentials' }
    & Pick<Types.OAuthCredentials, 'id' | 'uid' | 'accessToken' | 'refreshToken'>
  )> }
);

export type UserSettingsPageViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'name' | 'email' | 'unverifiedEmail'>
);

export type UserUpdateMutationVariables = Types.Exact<{
  input: Types.UserUpdateInput;
}>;


export type UserUpdateMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UserUpdatePayload' }
    & { user: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type WorkPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WorkPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export const AppViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<AppViewerFragment, unknown>;
export const CurrentlyPlayingIslandSpotifyTrackFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingIslandSpotifyTrackFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotifyTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandSpotifyTrackFragment, unknown>;
export const NotionEntryPageFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NotionEntryPageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotionPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"blocks"}}]}}]} as unknown as DocumentNode<NotionEntryPageFragment, unknown>;
export const ObsidianGraphNoteFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianGraphNoteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","alias":{"kind":"Name","value":"blurb"},"name":{"kind":"Name","value":"plainBlurb"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ObsidianGraphNoteFragment, unknown>;
export const ObsidianGraphEntryFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"type"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphNoteFragment"}}]}},...ObsidianGraphNoteFragment.definitions]} as unknown as DocumentNode<ObsidianGraphEntryFragment, unknown>;
export const ObsidianNoteContentNoteReferenceFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNoteContentNoteReferenceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<ObsidianNoteContentNoteReferenceFragment, unknown>;
export const ObsidianNoteContentReferenceFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNoteContentReferenceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"type"},"name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNoteContentNoteReferenceFragment"}}]}},...ObsidianNoteContentNoteReferenceFragment.definitions]} as unknown as DocumentNode<ObsidianNoteContentReferenceFragment, unknown>;
export const ObsidianNotePageNoteFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNotePageNoteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"blurb"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNoteContentReferenceFragment"}}]}}]}},...ObsidianNoteContentReferenceFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageNoteFragment, unknown>;
export const UserSettingsPageICloudCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageICloudCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"cookies"}}]}}]} as unknown as DocumentNode<UserSettingsPageICloudCredentialsFragment, unknown>;
export const UserSettingsPageOAuthCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]} as unknown as DocumentNode<UserSettingsPageOAuthCredentialsFragment, unknown>;
export const UserSettingsPageViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}}]}}]} as unknown as DocumentNode<UserSettingsPageViewerFragment, unknown>;
export const ActivityStatusBadgeSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ActivityStatusBadgeSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityStatus"}}]}}]} as unknown as DocumentNode<ActivityStatusBadgeSubscription, ActivityStatusBadgeSubscriptionVariables>;
export const ContactEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContactEmailQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"email"},"name":{"kind":"Name","value":"contactEmail"}}]}}]} as unknown as DocumentNode<ContactEmailQuery, ContactEmailQueryVariables>;
export const CurrentlyPlayingIslandSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CurrentlyPlayingIslandSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentlyPlayingIslandSpotifyTrackFragment"}}]}}]}},...CurrentlyPlayingIslandSpotifyTrackFragment.definitions]} as unknown as DocumentNode<CurrentlyPlayingIslandSubscription, CurrentlyPlayingIslandSubscriptionVariables>;
export const ErrorPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ErrorPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<ErrorPageQuery, ErrorPageQueryVariables>;
export const HomePageEntriesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageEntriesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"entries"},"name":{"kind":"Name","value":"notionEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startCursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startCursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"NotionEntryPageFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}},...NotionEntryPageFragment.definitions]} as unknown as DocumentNode<HomePageEntriesQuery, HomePageEntriesQueryVariables>;
export const HomePageGraphQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageGraphQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modifiedAfter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obsidianNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"modifiedAfter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modifiedAfter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},...ObsidianGraphEntryFragment.definitions]} as unknown as DocumentNode<HomePageGraphQuery, HomePageGraphQueryVariables>;
export const HomePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const ICloudCredentialsUpdateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ICloudCredentialsUpdateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentialsUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"icloudCredentialsUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<ICloudCredentialsUpdateMutation, ICloudCredentialsUpdateMutationVariables>;
export const ICloudCredentialsVerifySecurityCodeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ICloudCredentialsVerifySecurityCodeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentialsVerifySecurityCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"icloudCredentialsVerifySecurityCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ICloudCredentialsVerifySecurityCodeMutation, ICloudCredentialsVerifySecurityCodeMutationVariables>;
export const NotionCommentCreateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NotionCommentCreateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NotionCommentCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"notionCommentCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<NotionCommentCreateMutation, NotionCommentCreateMutationVariables>;
export const NotionEntryCommentsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NotionEntryCommentsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startCursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"comments"},"name":{"kind":"Name","value":"notionComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"blockId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageId"}}},{"kind":"Argument","name":{"kind":"Name","value":"startCursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startCursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"richText"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}}]} as unknown as DocumentNode<NotionEntryCommentsQuery, NotionEntryCommentsQueryVariables>;
export const ObsidianNotePageGraphQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObsidianNotePageGraphQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"note"},"name":{"kind":"Name","value":"obsidianNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}}]}}]}},...ObsidianGraphEntryFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageGraphQuery, ObsidianNotePageGraphQueryVariables>;
export const ObsidianNotePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObsidianNotePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"note"},"name":{"kind":"Name","value":"obsidianNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNotePageNoteFragment"}}]}}]}},...AppViewerFragment.definitions,...ObsidianNotePageNoteFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageQuery, ObsidianNotePageQueryVariables>;
export const ObsidianNoteSynchronizeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ObsidianNoteSynchronizeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNoteSynchronizeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"obsidianNoteSynchronize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ObsidianNoteSynchronizeMutation, ObsidianNoteSynchronizeMutationVariables>;
export const PasswordWithStrengthCheckInputQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PasswordWithStrengthCheckInputQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordStrength"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<PasswordWithStrengthCheckInputQuery, PasswordWithStrengthCheckInputQueryVariables>;
export const ResumePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResumePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resume"}}]}}]} as unknown as DocumentNode<ResumePageQuery, ResumePageQueryVariables>;
export const TestFeedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TestFeedSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscription"}}]}}]} as unknown as DocumentNode<TestFeedSubscription, TestFeedSubscriptionVariables>;
export const TestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<TestMutation, TestMutationVariables>;
export const TestPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testEcho"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<TestPageQuery, TestPageQueryVariables>;
export const UserChangeEmailMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserChangeEmailMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserChangeEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"userChangeEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UserChangeEmailMutation, UserChangeEmailMutationVariables>;
export const UserChangePasswordPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserChangePasswordPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserChangePasswordPageQuery, UserChangePasswordPageQueryVariables>;
export const UserLoginPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserLoginPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserLoginPageQuery, UserLoginPageQueryVariables>;
export const UserRegisterPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRegisterPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserRegisterPageQuery, UserRegisterPageQueryVariables>;
export const UserSendEmailVerificationInstructionsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserSendEmailVerificationInstructionsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSendEmailVerificationInstructionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"userSendEmailVerificationInstructions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UserSendEmailVerificationInstructionsMutation, UserSendEmailVerificationInstructionsMutationVariables>;
export const UserSendEmailVerificationInstructionsPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSendEmailVerificationInstructionsPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserSendEmailVerificationInstructionsPageQuery, UserSendEmailVerificationInstructionsPageQueryVariables>;
export const UserSendPasswordResetInstructionsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserSendPasswordResetInstructionsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSendPasswordResetInstructionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"userSendPasswordResetInstructions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UserSendPasswordResetInstructionsMutation, UserSendPasswordResetInstructionsMutationVariables>;
export const UserSendPasswordResetInstructionsPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSendPasswordResetInstructionsPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserSendPasswordResetInstructionsPageQuery, UserSendPasswordResetInstructionsPageQueryVariables>;
export const UserSettingsPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSettingsPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageICloudCredentialsFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotifyCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"linearCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"}}]}}]}},...AppViewerFragment.definitions,...UserSettingsPageViewerFragment.definitions,...UserSettingsPageICloudCredentialsFragment.definitions,...UserSettingsPageOAuthCredentialsFragment.definitions]} as unknown as DocumentNode<UserSettingsPageQuery, UserSettingsPageQueryVariables>;
export const UserUpdateMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UserUpdateMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"userUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UserUpdateMutation, UserUpdateMutationVariables>;
export const WorkPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<WorkPageQuery, WorkPageQueryVariables>;