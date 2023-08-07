import * as Types from './types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ActivateScottkitSignalMutationVariables = Types.Exact<{
  input: Types.ActivateScottkitSignalInput;
}>;


export type ActivateScottkitSignalMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ActivateScottkitSignalPayload' }
    & Pick<Types.ActivateScottkitSignalPayload, 'success'>
  ) }
);

export type ActivityStatusBadgeSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type ActivityStatusBadgeSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Types.Subscription, 'activityStatus'>
);

export type AddJournalEntryCommentMutationVariables = Types.Exact<{
  input: Types.AddJournalEntryCommentInput;
}>;


export type AddJournalEntryCommentMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'AddJournalEntryCommentPayload' }
    & Pick<Types.AddJournalEntryCommentPayload, 'success'>
  ) }
);

export type AppMenuQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AppMenuQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'bootedAt'>
);

export type AppViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'isOwner' | 'name'>
);

export type AvatarFieldQueryVariables = Types.Exact<{
  signedId: Types.Scalars['String']['input'];
}>;


export type AvatarFieldQuery = (
  { __typename?: 'Query' }
  & { image: Types.Maybe<(
    { __typename?: 'Image' }
    & Pick<Types.Image, 'id' | 'url'>
  )> }
);

export type ContactEmailQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ContactEmailQuery = (
  { __typename?: 'Query' }
  & { email: Types.Query['contactEmail'] }
);

export type CurrentlyPlayingIslandQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentlyPlayingIslandQuery = (
  { __typename?: 'Query' }
  & { currentlyPlaying: Types.Maybe<(
    { __typename?: 'CurrentlyPlaying' }
    & { track: (
      { __typename?: 'Track' }
      & Pick<Types.Track, 'id' | 'durationMilliseconds' | 'name' | 'url'>
      & { album: (
        { __typename?: 'SpotifyAlbum' }
        & Pick<Types.SpotifyAlbum, 'id' | 'imageUrl'>
      ), artists: Array<(
        { __typename?: 'SpotifyArtist' }
        & Pick<Types.SpotifyArtist, 'id' | 'name'>
      )> }
    ) }
  )> }
);

export type CurrentlyPlayingIslandSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentlyPlayingIslandSubscription = (
  { __typename?: 'Subscription' }
  & { currentlyPlaying: Types.Maybe<(
    { __typename?: 'CurrentlyPlaying' }
    & Pick<Types.CurrentlyPlaying, 'progressMilliseconds'>
    & { track: (
      { __typename?: 'Track' }
      & Pick<Types.Track, 'id'>
    ) }
  )> }
);

export type CurrentlyPlayingIslandTrackFragment = (
  { __typename?: 'Track' }
  & Pick<Types.Track, 'durationMilliseconds' | 'id' | 'name' | 'url'>
  & { album: (
    { __typename?: 'SpotifyAlbum' }
    & Pick<Types.SpotifyAlbum, 'id' | 'imageUrl'>
  ), artists: Array<(
    { __typename?: 'SpotifyArtist' }
    & Pick<Types.SpotifyArtist, 'id' | 'name'>
  )> }
);

export type CurrentlyPlayingLyricsTooltipLyricLineFragment = (
  { __typename?: 'LyricLine' }
  & Pick<Types.LyricLine, 'isExplicit' | 'startTimeMilliseconds' | 'words'>
);

export type CurrentlyPlayingLyricsTooltipQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentlyPlayingLyricsTooltipQuery = (
  { __typename?: 'Query' }
  & { currentlyPlaying: Types.Maybe<(
    { __typename?: 'CurrentlyPlaying' }
    & { track: (
      { __typename?: 'Track' }
      & Pick<Types.Track, 'id'>
      & { lyrics: Types.Maybe<Array<(
        { __typename?: 'LyricLine' }
        & Pick<Types.LyricLine, 'isExplicit' | 'startTimeMilliseconds' | 'words'>
      )>> }
    ) }
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

export type HomePageJournalEntryEntryFragment = (
  { __typename?: 'JournalEntry' }
  & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'content' | 'startedAt' | 'title' | 'url'>
);

export type HomePageJournalEntryQueryVariables = Types.Exact<{
  entryId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type HomePageJournalEntryQuery = (
  { __typename?: 'Query' }
  & { entry: Types.Maybe<(
    { __typename?: 'JournalEntry' }
    & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'content' | 'startedAt' | 'title' | 'url'>
  )> }
);

export type HomePageQueryVariables = Types.Exact<{
  entryId?: Types.InputMaybe<Types.Scalars['ID']['input']>;
}>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'announcement'>
  & { entry: Types.Maybe<(
    { __typename?: 'JournalEntry' }
    & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'content' | 'startedAt' | 'title' | 'url'>
  )>, location: Types.Maybe<(
    { __typename?: 'LocationLog' }
    & Pick<Types.LocationLog, 'approximateAddress' | 'googleMapsAreaUrl' | 'id' | 'timestamp'>
  )>, viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type ImportJournalEntriesMutationVariables = Types.Exact<{
  input: Types.ImportJournalEntriesInput;
}>;


export type ImportJournalEntriesMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ImportJournalEntriesPayload' }
    & Pick<Types.ImportJournalEntriesPayload, 'success'>
  ) }
);

export type ImportLocationLogsMutationVariables = Types.Exact<{
  input: Types.ImportLocationLogsInput;
}>;


export type ImportLocationLogsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ImportLocationLogsPayload' }
    & Pick<Types.ImportLocationLogsPayload, 'success'>
  ) }
);

export type JournalEntryCommentsQueryVariables = Types.Exact<{
  entryId: Types.Scalars['ID']['input'];
}>;


export type JournalEntryCommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'NotionComment' }
    & Pick<Types.NotionComment, 'createdAt' | 'id' | 'richText'>
  )> }
);

export type JournalEntryEntryFragment = (
  { __typename?: 'JournalEntry' }
  & Pick<Types.JournalEntry, 'content' | 'id' | 'startedAt' | 'title' | 'url'>
);

export type PasswordWithStrengthCheckInputQueryVariables = Types.Exact<{
  password: Types.Scalars['String']['input'];
}>;


export type PasswordWithStrengthCheckInputQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'passwordStrength'>
);

export type RemoveGoogleCredentialsMutationVariables = Types.Exact<{
  input: Types.RemoveGoogleCredentialsInput;
}>;


export type RemoveGoogleCredentialsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'RemoveGoogleCredentialsPayload' }
    & Pick<Types.RemoveGoogleCredentialsPayload, 'success'>
  ) }
);

export type RemoveICloudCredentialsMutationVariables = Types.Exact<{
  input: Types.RemoveICloudCredentialsInput;
}>;


export type RemoveICloudCredentialsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'RemoveICloudCredentialsPayload' }
    & Pick<Types.RemoveICloudCredentialsPayload, 'success'>
  ) }
);

export type RemoveInstagramCredentialsMutationVariables = Types.Exact<{
  input: Types.RemoveInstagramCredentialsInput;
}>;


export type RemoveInstagramCredentialsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'RemoveInstagramCredentialsPayload' }
    & Pick<Types.RemoveInstagramCredentialsPayload, 'success'>
  ) }
);

export type RemoveSpotifyCredentialsMutationVariables = Types.Exact<{
  input: Types.RemoveSpotifyCredentialsInput;
}>;


export type RemoveSpotifyCredentialsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'RemoveSpotifyCredentialsPayload' }
    & Pick<Types.RemoveSpotifyCredentialsPayload, 'success'>
  ) }
);

export type RequestUserEmailVerificationMutationVariables = Types.Exact<{
  input: Types.RequestUserEmailVerificationInput;
}>;


export type RequestUserEmailVerificationMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'RequestUserEmailVerificationPayload' }
    & Pick<Types.RequestUserEmailVerificationPayload, 'success'>
  ) }
);

export type RequestUserPasswordResetMutationVariables = Types.Exact<{
  input: Types.RequestUserPasswordResetInput;
}>;


export type RequestUserPasswordResetMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'RequestUserPasswordResetPayload' }
    & Pick<Types.RequestUserPasswordResetPayload, 'success'>
  ) }
);

export type ResumePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ResumePageQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'resume'>
);

export type ScottkitPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ScottkitPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type TestEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
  hasUser: Types.Scalars['Boolean']['input'];
}>;


export type TestEmailQuery = (
  { __typename?: 'Query' }
  & { user?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
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
  & { payload: (
    { __typename?: 'TestMutationPayload' }
    & { errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>>, model: Types.Maybe<(
      { __typename?: 'TestModel' }
      & Pick<Types.TestModel, 'birthday' | 'id' | 'name'>
    )> }
  ) }
);

export type TestPageQueryVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;


export type TestPageQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'testEcho'>
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type UpdateICloudCredentialsMutationVariables = Types.Exact<{
  input: Types.UpdateICloudCredentialsInput;
}>;


export type UpdateICloudCredentialsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UpdateICloudCredentialsPayload' }
    & { credentials: Types.Maybe<(
      { __typename?: 'ICloudCredentials' }
      & Pick<Types.ICloudCredentials, 'id'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UpdateInstagramCredentialsMutationVariables = Types.Exact<{
  input: Types.UpdateInstagramCredentialsInput;
}>;


export type UpdateInstagramCredentialsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UpdateInstagramCredentialsPayload' }
    & { credentials: Types.Maybe<(
      { __typename?: 'InstagramCredentials' }
      & Pick<Types.InstagramCredentials, 'id'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UpdateUserEmailMutationVariables = Types.Exact<{
  input: Types.UpdateUserEmailInput;
}>;


export type UpdateUserEmailMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UpdateUserEmailPayload' }
    & { errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>>, user: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id' | 'unverifiedEmail'>
    )> }
  ) }
);

export type UpdateUserProfileMutationVariables = Types.Exact<{
  input: Types.UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UpdateUserProfilePayload' }
    & { errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>>, user: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id'>
    )> }
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

export type UserEmailChangedEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type UserEmailChangedEmailQuery = (
  { __typename?: 'Query' }
  & { user: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'email' | 'id' | 'name'>
  )> }
);

export type UserEmailVerificationEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type UserEmailVerificationEmailQuery = (
  { __typename?: 'Query' }
  & { user: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
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

export type UserPasswordChangedEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type UserPasswordChangedEmailQuery = (
  { __typename?: 'Query' }
  & { user: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type UserPasswordResetEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type UserPasswordResetEmailQuery = (
  { __typename?: 'Query' }
  & { user: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
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

export type UserRequestEmailVerificationPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserRequestEmailVerificationPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type UserRequestPasswordResetPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserRequestPasswordResetPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type UserSettingsPageICloudCredentialsFragment = (
  { __typename?: 'ICloudCredentials' }
  & Pick<Types.ICloudCredentials, 'cookies' | 'email' | 'password' | 'session'>
);

export type UserSettingsPageInstagramCredentialsFragment = (
  { __typename?: 'InstagramCredentials' }
  & Pick<Types.InstagramCredentials, 'password' | 'session' | 'username'>
);

export type UserSettingsPageOAuthCredentialsFragment = (
  { __typename?: 'OAuthCredentials' }
  & Pick<Types.OAuthCredentials, 'refreshToken' | 'uid'>
);

export type UserSettingsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserSettingsPageQuery = (
  { __typename?: 'Query' }
  & { googleCredentials: Types.Maybe<(
    { __typename?: 'OAuthCredentials' }
    & Pick<Types.OAuthCredentials, 'id' | 'refreshToken' | 'uid'>
  )>, icloudCredentials: Types.Maybe<(
    { __typename?: 'ICloudCredentials' }
    & Pick<Types.ICloudCredentials, 'id' | 'cookies' | 'email' | 'password' | 'session'>
  )>, instagramCredentials: Types.Maybe<(
    { __typename?: 'InstagramCredentials' }
    & Pick<Types.InstagramCredentials, 'id' | 'password' | 'session' | 'username'>
  )>, spotifyCredentials: Types.Maybe<(
    { __typename?: 'OAuthCredentials' }
    & Pick<Types.OAuthCredentials, 'id' | 'refreshToken' | 'uid'>
  )>, viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name' | 'email' | 'unverifiedEmail'>
    & { avatar: Types.Maybe<(
      { __typename?: 'Image' }
      & Pick<Types.Image, 'id' | 'signedId'>
    )> }
  )> }
);

export type UserSettingsPageViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'email' | 'name' | 'unverifiedEmail'>
  & { avatar: Types.Maybe<(
    { __typename?: 'Image' }
    & Pick<Types.Image, 'id' | 'signedId'>
  )> }
);

export type UserWelcomeEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input'];
}>;


export type UserWelcomeEmailQuery = (
  { __typename?: 'Query' }
  & { user: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type VerifyICloudSecurityCodeMutationVariables = Types.Exact<{
  input: Types.VerifyICloudSecurityCodeInput;
}>;


export type VerifyICloudSecurityCodeMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'VerifyICloudSecurityCodePayload' }
    & Pick<Types.VerifyICloudSecurityCodePayload, 'success'>
  ) }
);

export const AppViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<AppViewerFragment, unknown>;
export const CurrentlyPlayingIslandTrackFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingIslandTrackFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandTrackFragment, unknown>;
export const CurrentlyPlayingLyricsTooltipLyricLineFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipLyricLineFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LyricLine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isExplicit"}},{"kind":"Field","name":{"kind":"Name","value":"startTimeMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"words"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingLyricsTooltipLyricLineFragment, unknown>;
export const JournalEntryEntryFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<JournalEntryEntryFragment, unknown>;
export const HomePageJournalEntryEntryFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"nextEntryId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<HomePageJournalEntryEntryFragment, unknown>;
export const UserSettingsPageICloudCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageICloudCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cookies"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}}]}}]} as unknown as DocumentNode<UserSettingsPageICloudCredentialsFragment, unknown>;
export const UserSettingsPageInstagramCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageInstagramCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InstagramCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]} as unknown as DocumentNode<UserSettingsPageInstagramCredentialsFragment, unknown>;
export const UserSettingsPageOAuthCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]} as unknown as DocumentNode<UserSettingsPageOAuthCredentialsFragment, unknown>;
export const UserSettingsPageViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signedId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}}]}}]} as unknown as DocumentNode<UserSettingsPageViewerFragment, unknown>;
export const ActivateScottkitSignalMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateScottkitSignalMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateScottkitSignalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"activateScottkitSignal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ActivateScottkitSignalMutation, ActivateScottkitSignalMutationVariables>;
export const ActivityStatusBadgeSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ActivityStatusBadgeSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityStatus"}}]}}]} as unknown as DocumentNode<ActivityStatusBadgeSubscription, ActivityStatusBadgeSubscriptionVariables>;
export const AddJournalEntryCommentMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddJournalEntryCommentMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddJournalEntryCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"addJournalEntryComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddJournalEntryCommentMutation, AddJournalEntryCommentMutationVariables>;
export const AppMenuQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppMenuQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bootedAt"}}]}}]} as unknown as DocumentNode<AppMenuQuery, AppMenuQueryVariables>;
export const AvatarFieldQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AvatarFieldQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"image"},"name":{"kind":"Name","value":"imageBySignedId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<AvatarFieldQuery, AvatarFieldQueryVariables>;
export const ContactEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContactEmailQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"email"},"name":{"kind":"Name","value":"contactEmail"}}]}}]} as unknown as DocumentNode<ContactEmailQuery, ContactEmailQueryVariables>;
export const CurrentlyPlayingIslandQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentlyPlayingIslandQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentlyPlayingIslandTrackFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingIslandTrackFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandQuery, CurrentlyPlayingIslandQueryVariables>;
export const CurrentlyPlayingIslandSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CurrentlyPlayingIslandSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progressMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandSubscription, CurrentlyPlayingIslandSubscriptionVariables>;
export const CurrentlyPlayingLyricsTooltipQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipLyricLineFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipLyricLineFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LyricLine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isExplicit"}},{"kind":"Field","name":{"kind":"Name","value":"startTimeMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"words"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingLyricsTooltipQuery, CurrentlyPlayingLyricsTooltipQueryVariables>;
export const ErrorPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ErrorPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ErrorPageQuery, ErrorPageQueryVariables>;
export const HomePageJournalEntryQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageJournalEntryQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"entry"},"name":{"kind":"Name","value":"homepageJournalEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"nextEntryId"}}]}}]} as unknown as DocumentNode<HomePageJournalEntryQuery, HomePageJournalEntryQueryVariables>;
export const HomePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"announcement"}},{"kind":"Field","alias":{"kind":"Name","value":"entry"},"name":{"kind":"Name","value":"homepageJournalEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approximateAddress"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsAreaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"nextEntryId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const ImportJournalEntriesMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportJournalEntriesMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportJournalEntriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"importJournalEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ImportJournalEntriesMutation, ImportJournalEntriesMutationVariables>;
export const ImportLocationLogsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportLocationLogsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportLocationLogsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"importLocationLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ImportLocationLogsMutation, ImportLocationLogsMutationVariables>;
export const JournalEntryCommentsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JournalEntryCommentsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"comments"},"name":{"kind":"Name","value":"journalEntryComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"entryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"richText"}}]}}]}}]} as unknown as DocumentNode<JournalEntryCommentsQuery, JournalEntryCommentsQueryVariables>;
export const PasswordWithStrengthCheckInputQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PasswordWithStrengthCheckInputQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordStrength"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<PasswordWithStrengthCheckInputQuery, PasswordWithStrengthCheckInputQueryVariables>;
export const RemoveGoogleCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveGoogleCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveGoogleCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"removeGoogleCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveGoogleCredentialsMutation, RemoveGoogleCredentialsMutationVariables>;
export const RemoveICloudCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveICloudCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveICloudCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"removeICloudCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveICloudCredentialsMutation, RemoveICloudCredentialsMutationVariables>;
export const RemoveInstagramCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveInstagramCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveInstagramCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"removeInstagramCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveInstagramCredentialsMutation, RemoveInstagramCredentialsMutationVariables>;
export const RemoveSpotifyCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSpotifyCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveSpotifyCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"removeSpotifyCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveSpotifyCredentialsMutation, RemoveSpotifyCredentialsMutationVariables>;
export const RequestUserEmailVerificationMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestUserEmailVerificationMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestUserEmailVerificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"requestUserEmailVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RequestUserEmailVerificationMutation, RequestUserEmailVerificationMutationVariables>;
export const RequestUserPasswordResetMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestUserPasswordResetMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestUserPasswordResetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"requestUserPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RequestUserPasswordResetMutation, RequestUserPasswordResetMutationVariables>;
export const ResumePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResumePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resume"}}]}}]} as unknown as DocumentNode<ResumePageQuery, ResumePageQueryVariables>;
export const ScottkitPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScottkitPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ScottkitPageQuery, ScottkitPageQueryVariables>;
export const TestEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasUser"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TestEmailQuery, TestEmailQueryVariables>;
export const TestFeedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TestFeedSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscription"}}]}}]} as unknown as DocumentNode<TestFeedSubscription, TestFeedSubscriptionVariables>;
export const TestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"testMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<TestMutation, TestMutationVariables>;
export const TestPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testEcho"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TestPageQuery, TestPageQueryVariables>;
export const UpdateICloudCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateICloudCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateICloudCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateICloudCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateICloudCredentialsMutation, UpdateICloudCredentialsMutationVariables>;
export const UpdateInstagramCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInstagramCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateInstagramCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateInstagramCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInstagramCredentialsMutation, UpdateInstagramCredentialsMutationVariables>;
export const UpdateUserEmailMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserEmailMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateUserEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserEmailMutation, UpdateUserEmailMutationVariables>;
export const UpdateUserProfileMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfileMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UserChangePasswordPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserChangePasswordPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UserChangePasswordPageQuery, UserChangePasswordPageQueryVariables>;
export const UserEmailChangedEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserEmailChangedEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserEmailChangedEmailQuery, UserEmailChangedEmailQueryVariables>;
export const UserEmailVerificationEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserEmailVerificationEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserEmailVerificationEmailQuery, UserEmailVerificationEmailQueryVariables>;
export const UserLoginPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserLoginPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UserLoginPageQuery, UserLoginPageQueryVariables>;
export const UserPasswordChangedEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPasswordChangedEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserPasswordChangedEmailQuery, UserPasswordChangedEmailQueryVariables>;
export const UserPasswordResetEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPasswordResetEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserPasswordResetEmailQuery, UserPasswordResetEmailQueryVariables>;
export const UserRegisterPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRegisterPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UserRegisterPageQuery, UserRegisterPageQueryVariables>;
export const UserRequestEmailVerificationPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRequestEmailVerificationPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UserRequestEmailVerificationPageQuery, UserRequestEmailVerificationPageQueryVariables>;
export const UserRequestPasswordResetPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRequestPasswordResetPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<UserRequestPasswordResetPageQuery, UserRequestPasswordResetPageQueryVariables>;
export const UserSettingsPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSettingsPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageICloudCredentialsFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageInstagramCredentialsFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotifyCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageICloudCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cookies"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageInstagramCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InstagramCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signedId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}}]}}]} as unknown as DocumentNode<UserSettingsPageQuery, UserSettingsPageQueryVariables>;
export const UserWelcomeEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserWelcomeEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserWelcomeEmailQuery, UserWelcomeEmailQueryVariables>;
export const VerifyICloudSecurityCodeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyICloudSecurityCodeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyICloudSecurityCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"verifyICloudSecurityCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<VerifyICloudSecurityCodeMutation, VerifyICloudSecurityCodeMutationVariables>;