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

export type AppViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'isOwner' | 'name'>
);

export type AvatarFieldQueryVariables = Types.Exact<{
  signedId: Types.Scalars['String'];
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
    { __typename?: 'SpotifyCurrentlyPlaying' }
    & { track: (
      { __typename?: 'SpotifyTrack' }
      & Pick<Types.SpotifyTrack, 'id' | 'url' | 'name' | 'durationMilliseconds'>
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
    { __typename?: 'SpotifyCurrentlyPlaying' }
    & Pick<Types.SpotifyCurrentlyPlaying, 'progressMilliseconds'>
    & { track: (
      { __typename?: 'SpotifyTrack' }
      & Pick<Types.SpotifyTrack, 'id'>
    ) }
  )> }
);

export type CurrentlyPlayingIslandTrackFragment = (
  { __typename?: 'SpotifyTrack' }
  & Pick<Types.SpotifyTrack, 'id' | 'url' | 'name' | 'durationMilliseconds'>
  & { album: (
    { __typename?: 'SpotifyAlbum' }
    & Pick<Types.SpotifyAlbum, 'id' | 'imageUrl'>
  ), artists: Array<(
    { __typename?: 'SpotifyArtist' }
    & Pick<Types.SpotifyArtist, 'id' | 'name'>
  )> }
);

export type CurrentlyPlayingLyricsTooltipLyricLineFragment = (
  { __typename?: 'SpotifyLyricLine' }
  & Pick<Types.SpotifyLyricLine, 'isExplicit' | 'startTimeMilliseconds' | 'words'>
);

export type CurrentlyPlayingLyricsTooltipQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentlyPlayingLyricsTooltipQuery = (
  { __typename?: 'Query' }
  & { currentlyPlaying: Types.Maybe<(
    { __typename?: 'SpotifyCurrentlyPlaying' }
    & { track: (
      { __typename?: 'SpotifyTrack' }
      & Pick<Types.SpotifyTrack, 'id'>
      & { lyrics: Types.Maybe<Array<(
        { __typename?: 'SpotifyLyricLine' }
        & Pick<Types.SpotifyLyricLine, 'isExplicit' | 'startTimeMilliseconds' | 'words'>
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

export type HomePageJournalEntryEntryFragment = (
  { __typename?: 'JournalEntry' }
  & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'url' | 'startedAt' | 'title' | 'content'>
);

export type HomePageJournalEntryQueryVariables = Types.Exact<{
  entryId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type HomePageJournalEntryQuery = (
  { __typename?: 'Query' }
  & { entry: Types.Maybe<(
    { __typename?: 'JournalEntry' }
    & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'url' | 'startedAt' | 'title' | 'content'>
  )> }
);

export type HomePageQueryVariables = Types.Exact<{
  entryId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )>, entry: Types.Maybe<(
    { __typename?: 'JournalEntry' }
    & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'url' | 'startedAt' | 'title' | 'content'>
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

export type ImportObsidianNotesMutationVariables = Types.Exact<{
  input: Types.ImportObsidianNotesInput;
}>;


export type ImportObsidianNotesMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ImportObsidianNotesPayload' }
    & Pick<Types.ImportObsidianNotesPayload, 'success'>
  ) }
);

export type JournalEntryCommentsQueryVariables = Types.Exact<{
  entryId: Types.Scalars['ID'];
}>;


export type JournalEntryCommentsQuery = (
  { __typename?: 'Query' }
  & { comments: Array<(
    { __typename?: 'NotionComment' }
    & Pick<Types.NotionComment, 'id' | 'createdAt' | 'richText'>
  )> }
);

export type JournalEntryEntryFragment = (
  { __typename?: 'JournalEntry' }
  & Pick<Types.JournalEntry, 'id' | 'url' | 'startedAt' | 'title' | 'content'>
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

export type PasswordWithStrengthCheckInputQueryVariables = Types.Exact<{
  password: Types.Scalars['String'];
}>;


export type PasswordWithStrengthCheckInputQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'passwordStrength'>
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

export type SendUserPasswordResetInstructionsMutationVariables = Types.Exact<{
  input: Types.SendUserPasswordResetInstructionsInput;
}>;


export type SendUserPasswordResetInstructionsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'SendUserPasswordResetInstructionsPayload' }
    & Pick<Types.SendUserPasswordResetInstructionsPayload, 'success'>
  ) }
);

export type SendUserEmailVerificationInstructionsMutationVariables = Types.Exact<{
  input: Types.SendUserEmailVerificationInstructionsInput;
}>;


export type SendUserEmailVerificationInstructionsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'SendUserEmailVerificationInstructionsPayload' }
    & Pick<Types.SendUserEmailVerificationInstructionsPayload, 'success'>
  ) }
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

export type UpdateICloudCredentialsMutationVariables = Types.Exact<{
  input: Types.UpdateICloudCredentialsInput;
}>;


export type UpdateICloudCredentialsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UpdateICloudCredentialsPayload' }
    & { icloudCredentials: Types.Maybe<(
      { __typename?: 'ICloudCredentials' }
      & Pick<Types.ICloudCredentials, 'id'>
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
    & { user: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id' | 'unverifiedEmail'>
    )>, errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UpdateUserProfileMutationVariables = Types.Exact<{
  input: Types.UpdateUserProfileInput;
}>;


export type UpdateUserProfileMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UpdateUserProfilePayload' }
    & { user: Types.Maybe<(
      { __typename?: 'User' }
      & Pick<Types.User, 'id'>
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

export type UserEmailChangedEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
}>;


export type UserEmailChangedEmailQuery = (
  { __typename?: 'Query' }
  & { user: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name' | 'email'>
  )> }
);

export type UserEmailVerificationEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
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
  userId: Types.Scalars['ID'];
}>;


export type UserPasswordChangedEmailQuery = (
  { __typename?: 'Query' }
  & { user: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);

export type UserPasswordResetEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
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

export type UserSendEmailVerificationInstructionsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserSendEmailVerificationInstructionsPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
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
    & { avatar: Types.Maybe<(
      { __typename?: 'Image' }
      & Pick<Types.Image, 'id' | 'signedId'>
    )> }
  )>, icloudCredentials: Types.Maybe<(
    { __typename?: 'ICloudCredentials' }
    & Pick<Types.ICloudCredentials, 'id' | 'email' | 'password' | 'session' | 'cookies'>
  )>, spotifyCredentials: Types.Maybe<(
    { __typename?: 'OAuthCredentials' }
    & Pick<Types.OAuthCredentials, 'id' | 'uid' | 'accessToken' | 'refreshToken'>
  )> }
);

export type UserSettingsPageViewerFragment = (
  { __typename?: 'User' }
  & Pick<Types.User, 'name' | 'email' | 'unverifiedEmail'>
  & { avatar: Types.Maybe<(
    { __typename?: 'Image' }
    & Pick<Types.Image, 'id' | 'signedId'>
  )> }
);

export type UserWelcomeEmailQueryVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
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
export const CurrentlyPlayingIslandTrackFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingIslandTrackFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotifyTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationMilliseconds"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandTrackFragment, unknown>;
export const CurrentlyPlayingLyricsTooltipLyricLineFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipLyricLineFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotifyLyricLine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isExplicit"}},{"kind":"Field","name":{"kind":"Name","value":"startTimeMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"words"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingLyricsTooltipLyricLineFragment, unknown>;
export const JournalEntryEntryFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]} as unknown as DocumentNode<JournalEntryEntryFragment, unknown>;
export const HomePageJournalEntryEntryFragment = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nextEntryId"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryEntryFragment"}}]}},...JournalEntryEntryFragment.definitions]} as unknown as DocumentNode<HomePageJournalEntryEntryFragment, unknown>;
export const ObsidianGraphNoteFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianGraphNoteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"modifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","alias":{"kind":"Name","value":"blurb"},"name":{"kind":"Name","value":"plainBlurb"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ObsidianGraphNoteFragment, unknown>;
export const ObsidianGraphEntryFragment = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"type"},"name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphNoteFragment"}}]}},...ObsidianGraphNoteFragment.definitions]} as unknown as DocumentNode<ObsidianGraphEntryFragment, unknown>;
export const ObsidianNoteContentNoteReferenceFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNoteContentNoteReferenceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<ObsidianNoteContentNoteReferenceFragment, unknown>;
export const ObsidianNoteContentReferenceFragment = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNoteContentReferenceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","alias":{"kind":"Name","value":"type"},"name":{"kind":"Name","value":"__typename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNoteContentNoteReferenceFragment"}}]}},...ObsidianNoteContentNoteReferenceFragment.definitions]} as unknown as DocumentNode<ObsidianNoteContentReferenceFragment, unknown>;
export const ObsidianNotePageNoteFragment = {"kind":"Document", "definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ObsidianNotePageNoteFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ObsidianNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"blurb"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNoteContentReferenceFragment"}}]}}]}},...ObsidianNoteContentReferenceFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageNoteFragment, unknown>;
export const UserSettingsPageICloudCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageICloudCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}},{"kind":"Field","name":{"kind":"Name","value":"cookies"}}]}}]} as unknown as DocumentNode<UserSettingsPageICloudCredentialsFragment, unknown>;
export const UserSettingsPageOAuthCredentialsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthCredentials"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]} as unknown as DocumentNode<UserSettingsPageOAuthCredentialsFragment, unknown>;
export const UserSettingsPageViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signedId"}}]}}]}}]} as unknown as DocumentNode<UserSettingsPageViewerFragment, unknown>;
export const ActivateScottkitSignalMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateScottkitSignalMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateScottkitSignalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"activateScottkitSignal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ActivateScottkitSignalMutation, ActivateScottkitSignalMutationVariables>;
export const ActivityStatusBadgeSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ActivityStatusBadgeSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityStatus"}}]}}]} as unknown as DocumentNode<ActivityStatusBadgeSubscription, ActivityStatusBadgeSubscriptionVariables>;
export const AddJournalEntryCommentMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddJournalEntryCommentMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddJournalEntryCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"addJournalEntryComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddJournalEntryCommentMutation, AddJournalEntryCommentMutationVariables>;
export const AvatarFieldQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AvatarFieldQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"image"},"name":{"kind":"Name","value":"imageBySignedId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<AvatarFieldQuery, AvatarFieldQueryVariables>;
export const ContactEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContactEmailQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"email"},"name":{"kind":"Name","value":"contactEmail"}}]}}]} as unknown as DocumentNode<ContactEmailQuery, ContactEmailQueryVariables>;
export const CurrentlyPlayingIslandQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentlyPlayingIslandQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentlyPlayingIslandTrackFragment"}}]}}]}}]}},...CurrentlyPlayingIslandTrackFragment.definitions]} as unknown as DocumentNode<CurrentlyPlayingIslandQuery, CurrentlyPlayingIslandQueryVariables>;
export const CurrentlyPlayingIslandSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CurrentlyPlayingIslandSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"progressMilliseconds"}}]}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandSubscription, CurrentlyPlayingIslandSubscriptionVariables>;
export const CurrentlyPlayingLyricsTooltipQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipLyricLineFragment"}}]}}]}}]}}]}},...CurrentlyPlayingLyricsTooltipLyricLineFragment.definitions]} as unknown as DocumentNode<CurrentlyPlayingLyricsTooltipQuery, CurrentlyPlayingLyricsTooltipQueryVariables>;
export const ErrorPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ErrorPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<ErrorPageQuery, ErrorPageQueryVariables>;
export const HomePageGraphQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageGraphQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"modifiedAfter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"obsidianNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"modifiedAfter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"modifiedAfter"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},...ObsidianGraphEntryFragment.definitions]} as unknown as DocumentNode<HomePageGraphQuery, HomePageGraphQueryVariables>;
export const HomePageJournalEntryQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageJournalEntryQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"entry"},"name":{"kind":"Name","value":"homepageJournalEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"}}]}}]}},...HomePageJournalEntryEntryFragment.definitions]} as unknown as DocumentNode<HomePageJournalEntryQuery, HomePageJournalEntryQueryVariables>;
export const HomePageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"entry"},"name":{"kind":"Name","value":"homepageJournalEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"}}]}}]}},...AppViewerFragment.definitions,...HomePageJournalEntryEntryFragment.definitions]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const ImportJournalEntriesMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportJournalEntriesMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportJournalEntriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"importJournalEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ImportJournalEntriesMutation, ImportJournalEntriesMutationVariables>;
export const ImportObsidianNotesMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportObsidianNotesMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportObsidianNotesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"importObsidianNotes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ImportObsidianNotesMutation, ImportObsidianNotesMutationVariables>;
export const JournalEntryCommentsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JournalEntryCommentsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"comments"},"name":{"kind":"Name","value":"journalEntryComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"entryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"richText"}}]}}]}}]} as unknown as DocumentNode<JournalEntryCommentsQuery, JournalEntryCommentsQueryVariables>;
export const ObsidianNotePageGraphQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObsidianNotePageGraphQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"note"},"name":{"kind":"Name","value":"obsidianNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"referencedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianGraphEntryFragment"}}]}}]}}]}},...ObsidianGraphEntryFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageGraphQuery, ObsidianNotePageGraphQueryVariables>;
export const ObsidianNotePageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ObsidianNotePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"note"},"name":{"kind":"Name","value":"obsidianNote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ObsidianNotePageNoteFragment"}}]}}]}},...AppViewerFragment.definitions,...ObsidianNotePageNoteFragment.definitions]} as unknown as DocumentNode<ObsidianNotePageQuery, ObsidianNotePageQueryVariables>;
export const PasswordWithStrengthCheckInputQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PasswordWithStrengthCheckInputQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordStrength"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<PasswordWithStrengthCheckInputQuery, PasswordWithStrengthCheckInputQueryVariables>;
export const RemoveICloudCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveICloudCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveICloudCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"removeICloudCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveICloudCredentialsMutation, RemoveICloudCredentialsMutationVariables>;
export const RemoveSpotifyCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSpotifyCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveSpotifyCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"removeSpotifyCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RemoveSpotifyCredentialsMutation, RemoveSpotifyCredentialsMutationVariables>;
export const ResumePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResumePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resume"}}]}}]} as unknown as DocumentNode<ResumePageQuery, ResumePageQueryVariables>;
export const ScottkitPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScottkitPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<ScottkitPageQuery, ScottkitPageQueryVariables>;
export const SendUserPasswordResetInstructionsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendUserPasswordResetInstructionsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendUserPasswordResetInstructionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"sendUserPasswordResetInstructions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendUserPasswordResetInstructionsMutation, SendUserPasswordResetInstructionsMutationVariables>;
export const SendUserEmailVerificationInstructionsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendUserEmailVerificationInstructionsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendUserEmailVerificationInstructionsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"sendUserEmailVerificationInstructions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendUserEmailVerificationInstructionsMutation, SendUserEmailVerificationInstructionsMutationVariables>;
export const TestFeedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TestFeedSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscription"}}]}}]} as unknown as DocumentNode<TestFeedSubscription, TestFeedSubscriptionVariables>;
export const TestMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"testMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<TestMutation, TestMutationVariables>;
export const TestPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testEcho"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<TestPageQuery, TestPageQueryVariables>;
export const UpdateICloudCredentialsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateICloudCredentialsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateICloudCredentialsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateICloudCredentials"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateICloudCredentialsMutation, UpdateICloudCredentialsMutationVariables>;
export const UpdateUserEmailMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserEmailMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateUserEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserEmailMutation, UpdateUserEmailMutationVariables>;
export const UpdateUserProfileMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfileMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateUserProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const UserChangePasswordPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserChangePasswordPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserChangePasswordPageQuery, UserChangePasswordPageQueryVariables>;
export const UserEmailChangedEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserEmailChangedEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UserEmailChangedEmailQuery, UserEmailChangedEmailQueryVariables>;
export const UserEmailVerificationEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserEmailVerificationEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserEmailVerificationEmailQuery, UserEmailVerificationEmailQueryVariables>;
export const UserLoginPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserLoginPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserLoginPageQuery, UserLoginPageQueryVariables>;
export const UserPasswordChangedEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPasswordChangedEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserPasswordChangedEmailQuery, UserPasswordChangedEmailQueryVariables>;
export const UserPasswordResetEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserPasswordResetEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserPasswordResetEmailQuery, UserPasswordResetEmailQueryVariables>;
export const UserRegisterPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserRegisterPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserRegisterPageQuery, UserRegisterPageQueryVariables>;
export const UserSendEmailVerificationInstructionsPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSendEmailVerificationInstructionsPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserSendEmailVerificationInstructionsPageQuery, UserSendEmailVerificationInstructionsPageQueryVariables>;
export const UserSendPasswordResetInstructionsPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSendPasswordResetInstructionsPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}}]}}]}},...AppViewerFragment.definitions]} as unknown as DocumentNode<UserSendPasswordResetInstructionsPageQuery, UserSendPasswordResetInstructionsPageQueryVariables>;
export const UserSettingsPageQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSettingsPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"icloudCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageICloudCredentialsFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotifyCredentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageOAuthCredentialsFragment"}}]}}]}},...AppViewerFragment.definitions,...UserSettingsPageViewerFragment.definitions,...UserSettingsPageICloudCredentialsFragment.definitions,...UserSettingsPageOAuthCredentialsFragment.definitions]} as unknown as DocumentNode<UserSettingsPageQuery, UserSettingsPageQueryVariables>;
export const UserWelcomeEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserWelcomeEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserWelcomeEmailQuery, UserWelcomeEmailQueryVariables>;
export const VerifyICloudSecurityCodeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyICloudSecurityCodeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyICloudSecurityCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"verifyICloudSecurityCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<VerifyICloudSecurityCodeMutation, VerifyICloudSecurityCodeMutationVariables>;