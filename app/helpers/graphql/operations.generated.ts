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

export type AdminPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AdminPageQuery = (
  { __typename?: 'Query' }
  & { googleConnection: (
    { __typename?: 'OAuthConnection' }
    & { credentials: Types.Maybe<(
      { __typename?: 'OAuthCredentials' }
      & Pick<Types.OAuthCredentials, 'refreshToken' | 'uid'>
    )> }
  ), icloudConnection: (
    { __typename?: 'ICloudConnection' }
    & Pick<Types.ICloudConnection, 'status'>
    & { credentials: Types.Maybe<(
      { __typename?: 'ICloudCredentials' }
      & Pick<Types.ICloudCredentials, 'cookies' | 'email' | 'id' | 'password' | 'session'>
    )> }
  ), spotifyConnection: (
    { __typename?: 'OAuthConnection' }
    & { credentials: Types.Maybe<(
      { __typename?: 'OAuthCredentials' }
      & Pick<Types.OAuthCredentials, 'refreshToken' | 'uid'>
    )> }
  ), viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
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
    & Pick<Types.Image, 'id' | 'src'>
  )> }
);

export type ContactEmailQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ContactEmailQuery = (
  { __typename?: 'Query' }
  & { email: Types.Query['contactEmail'] }
);

export type CreateICloudConnectionMutationVariables = Types.Exact<{
  input: Types.CreateICloudConnectionInput;
}>;


export type CreateICloudConnectionMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'CreateICloudConnectionPayload' }
    & Pick<Types.CreateICloudConnectionPayload, 'requires2fa'>
  ) }
);

export type CreateLocationAccessGrantMutationVariables = Types.Exact<{
  input: Types.CreateLocationAccessGrantInput;
}>;


export type CreateLocationAccessGrantMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'CreateLocationAccessGrantPayload' }
    & { errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>>, grant: Types.Maybe<(
      { __typename?: 'LocationAccessGrant' }
      & Pick<Types.LocationAccessGrant, 'id' | 'locateUrl'>
    )> }
  ) }
);

export type CreateTimelinePhotoWithTimestampMutationVariables = Types.Exact<{
  input: Types.CreateTimelinePhotoWithTimestampInput;
}>;


export type CreateTimelinePhotoWithTimestampMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'CreateTimelinePhotoWithTimestampPayload' }
    & Pick<Types.CreateTimelinePhotoWithTimestampPayload, 'success'>
    & { errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CurrentlyPlayingIslandQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentlyPlayingIslandQuery = (
  { __typename?: 'Query' }
  & { currentlyPlaying: Types.Maybe<(
    { __typename?: 'CurrentlyPlaying' }
    & { track: (
      { __typename?: 'SpotifyTrack' }
      & Pick<Types.SpotifyTrack, 'id' | 'durationMilliseconds' | 'name' | 'url'>
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
    & Pick<Types.CurrentlyPlaying, 'progressMilliseconds' | 'timestamp'>
    & { track: (
      { __typename?: 'SpotifyTrack' }
      & Pick<Types.SpotifyTrack, 'id'>
    ) }
  )> }
);

export type CurrentlyPlayingIslandTrackFragment = (
  { __typename?: 'SpotifyTrack' }
  & Pick<Types.SpotifyTrack, 'durationMilliseconds' | 'id' | 'name' | 'url'>
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
      { __typename?: 'SpotifyTrack' }
      & Pick<Types.SpotifyTrack, 'id'>
      & { lyrics: Types.Maybe<Array<(
        { __typename?: 'LyricLine' }
        & Pick<Types.LyricLine, 'isExplicit' | 'startTimeMilliseconds' | 'words'>
      )>> }
    ) }
  )> }
);

export type DeleteGoogleConnectionMutationVariables = Types.Exact<{
  input: Types.DeleteGoogleConnectionInput;
}>;


export type DeleteGoogleConnectionMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'DeleteGoogleConnectionPayload' }
    & Pick<Types.DeleteGoogleConnectionPayload, 'success'>
  ) }
);

export type DeleteICloudConnectionMutationVariables = Types.Exact<{
  input: Types.DeleteICloudConnectionInput;
}>;


export type DeleteICloudConnectionMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'DeleteICloudConnectionPayload' }
    & Pick<Types.DeleteICloudConnectionPayload, 'success'>
  ) }
);

export type DeleteLocationAccessGrantMutationVariables = Types.Exact<{
  input: Types.DeleteLocationAccessGrantInput;
}>;


export type DeleteLocationAccessGrantMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'DeleteLocationAccessGrantPayload' }
    & Pick<Types.DeleteLocationAccessGrantPayload, 'success'>
  ) }
);

export type DeleteSpotifyConnectionMutationVariables = Types.Exact<{
  input: Types.DeleteSpotifyConnectionInput;
}>;


export type DeleteSpotifyConnectionMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'DeleteSpotifyConnectionPayload' }
    & Pick<Types.DeleteSpotifyConnectionPayload, 'success'>
  ) }
);

export type ErrorPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ErrorPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type FileFieldFileCardQueryVariables = Types.Exact<{
  signedId: Types.Scalars['String']['input'];
}>;


export type FileFieldFileCardQuery = (
  { __typename?: 'Query' }
  & { file: Types.Maybe<(
    { __typename?: 'Image' }
    & Pick<Types.Image, 'byteSize' | 'filename' | 'id'>
  )> }
);

export type HomePageJournalEntryEntryFragment = (
  { __typename?: 'JournalEntry' }
  & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'content' | 'startedAt' | 'title' | 'url'>
);

export type HomePageJournalEntryQueryVariables = Types.Exact<{
  entryId: Types.Scalars['ID']['input'];
}>;


export type HomePageJournalEntryQuery = (
  { __typename?: 'Query' }
  & { entry: Types.Maybe<(
    { __typename?: 'JournalEntry' }
    & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'content' | 'startedAt' | 'title' | 'url'>
  )> }
);

export type HomePageQueryVariables = Types.Exact<{
  journalEntryId: Types.Scalars['ID']['input'];
  showJournalEntry: Types.Scalars['Boolean']['input'];
}>;


export type HomePageQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'announcement' | 'explorations'>
  & { journalEntry?: Types.Maybe<(
    { __typename?: 'JournalEntry' }
    & Pick<Types.JournalEntry, 'id' | 'nextEntryId' | 'content' | 'startedAt' | 'title' | 'url'>
  )>, location: Types.Maybe<(
    { __typename?: 'LocationLog' }
    & Pick<Types.LocationLog, 'id' | 'approximateAddress' | 'googleMapsAreaUrl' | 'timestamp'>
  )>, viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type ICloudConnectionFormConnectionFragment = (
  { __typename?: 'ICloudConnection' }
  & Pick<Types.ICloudConnection, 'status'>
  & { credentials: Types.Maybe<(
    { __typename?: 'ICloudCredentials' }
    & Pick<Types.ICloudCredentials, 'cookies' | 'email' | 'id' | 'password' | 'session'>
  )> }
);

export type ImportTimelineActivitiesMutationVariables = Types.Exact<{
  input: Types.ImportTimelineActivitiesInput;
}>;


export type ImportTimelineActivitiesMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ImportTimelineActivitiesPayload' }
    & Pick<Types.ImportTimelineActivitiesPayload, 'importCount'>
  ) }
);

export type ImportTimelinePhotosMutationVariables = Types.Exact<{
  input: Types.ImportTimelinePhotosInput;
}>;


export type ImportTimelinePhotosMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'ImportTimelinePhotosPayload' }
    & Pick<Types.ImportTimelinePhotosPayload, 'importCount'>
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

export type JourneysHomePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type JourneysHomePageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type JourneysHomePageSessionsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  before?: Types.InputMaybe<Types.Scalars['String']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type JourneysHomePageSessionsQuery = (
  { __typename?: 'Query' }
  & { sessions: (
    { __typename?: 'JourneysSessionConnection' }
    & { edges: Array<(
      { __typename?: 'JourneysSessionEdge' }
      & { node: (
        { __typename?: 'JourneysSession' }
        & Pick<Types.JourneysSession, 'id' | 'startedAt' | 'url'>
        & { participations: Array<(
          { __typename?: 'JourneysSessionParticipation' }
          & Pick<Types.JourneysSessionParticipation, 'goal' | 'id' | 'participantName'>
        )> }
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor'>
    ) }
  ) }
);

export type JourneysSessionPageQueryVariables = Types.Exact<{
  sessionId: Types.Scalars['ID']['input'];
}>;


export type JourneysSessionPageQuery = (
  { __typename?: 'Query' }
  & { session: Types.Maybe<(
    { __typename?: 'JourneysSession' }
    & Pick<Types.JourneysSession, 'id' | 'startedAt'>
    & { participations: Array<(
      { __typename?: 'JourneysSessionParticipation' }
      & Pick<Types.JourneysSessionParticipation, 'goal' | 'id' | 'participantName'>
    )>, viewerParticipation: Types.Maybe<(
      { __typename?: 'JourneysSessionParticipation' }
      & Pick<Types.JourneysSessionParticipation, 'goal' | 'id' | 'participantName'>
    )> }
  )>, viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type JourneysSessionPageSubscriptionVariables = Types.Exact<{
  sessionId: Types.Scalars['ID']['input'];
}>;


export type JourneysSessionPageSubscription = (
  { __typename?: 'Subscription' }
  & { participation: Types.Maybe<(
    { __typename?: 'JourneysSessionParticipation' }
    & Pick<Types.JourneysSessionParticipation, 'id'>
  )> }
);

export type JourneysSessionParticipationFormQueryVariables = Types.Exact<{
  participationId: Types.Scalars['ID']['input'];
}>;


export type JourneysSessionParticipationFormQuery = (
  { __typename?: 'Query' }
  & { participation: Types.Maybe<(
    { __typename?: 'JourneysSessionParticipation' }
    & Pick<Types.JourneysSessionParticipation, 'goal' | 'id' | 'participantName'>
  )> }
);

export type LeaveJourneysSessionMutationVariables = Types.Exact<{
  input: Types.LeaveJourneysSessionInput;
}>;


export type LeaveJourneysSessionMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'LeaveJourneysSessionPayload' }
    & Pick<Types.LeaveJourneysSessionPayload, 'success'>
  ) }
);

export type LikePensieveMessageMutationVariables = Types.Exact<{
  input: Types.LikePensieveMessageInput;
}>;


export type LikePensieveMessageMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'LikePensieveMessagePayload' }
    & Pick<Types.LikePensieveMessagePayload, 'success'>
  ) }
);

export type LocatePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type LocatePageQuery = (
  { __typename?: 'Query' }
  & { location: Types.Maybe<(
    { __typename?: 'LocationLog' }
    & Pick<Types.LocationLog, 'id'>
    & { approximateCoordinates: (
      { __typename?: 'Coordinates' }
      & Pick<Types.Coordinates, 'latitude' | 'longitude'>
    ) }
  )>, viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type LocatePageSubscriptionVariables = Types.Exact<{
  password: Types.Scalars['String']['input'];
}>;


export type LocatePageSubscription = (
  { __typename?: 'Subscription' }
  & { location: Types.Maybe<(
    { __typename?: 'LocationLog' }
    & Pick<Types.LocationLog, 'id' | 'timestamp'>
    & { details: (
      { __typename?: 'LocationDetails' }
      & Pick<Types.LocationDetails, 'address' | 'expiresAt'>
      & { coordinates: (
        { __typename?: 'Coordinates' }
        & Pick<Types.Coordinates, 'latitude' | 'longitude'>
      ), trail: Array<(
        { __typename?: 'LocationTrailMarker' }
        & Pick<Types.LocationTrailMarker, 'id' | 'timestamp'>
        & { coordinates: (
          { __typename?: 'Coordinates' }
          & Pick<Types.Coordinates, 'latitude' | 'longitude'>
        ) }
      )> }
    ) }
  )> }
);

export type LocatePageTrailMarkerFragment = (
  { __typename?: 'LocationTrailMarker' }
  & Pick<Types.LocationTrailMarker, 'timestamp'>
  & { coordinates: (
    { __typename?: 'Coordinates' }
    & Pick<Types.Coordinates, 'latitude' | 'longitude'>
  ) }
);

export type LocationAccessGrantCardGrantFragment = (
  { __typename?: 'LocationAccessGrant' }
  & Pick<Types.LocationAccessGrant, 'createdAt' | 'expiresAt' | 'id' | 'locateUrl' | 'password' | 'recipient'>
);

export type LocationAccessGrantsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type LocationAccessGrantsQuery = (
  { __typename?: 'Query' }
  & { locationAccessGrants: Array<(
    { __typename?: 'LocationAccessGrant' }
    & Pick<Types.LocationAccessGrant, 'id' | 'createdAt' | 'expiresAt' | 'locateUrl' | 'password' | 'recipient'>
  )> }
);

export type LocationAlertLocationFragment = (
  { __typename?: 'LocationLog' }
  & Pick<Types.LocationLog, 'approximateAddress' | 'googleMapsAreaUrl' | 'timestamp'>
);

export type LocationAlertSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type LocationAlertSubscription = (
  { __typename?: 'Subscription' }
  & { location: Types.Maybe<(
    { __typename?: 'LocationLog' }
    & Pick<Types.LocationLog, 'id' | 'approximateAddress' | 'googleMapsAreaUrl' | 'timestamp'>
  )> }
);

export type OAuthConnectionFormConnectionFragment = (
  { __typename?: 'OAuthConnection' }
  & { credentials: Types.Maybe<(
    { __typename?: 'OAuthCredentials' }
    & Pick<Types.OAuthCredentials, 'refreshToken' | 'uid'>
  )> }
);

export type PasswordWithStrengthCheckInputQueryVariables = Types.Exact<{
  password: Types.Scalars['String']['input'];
}>;


export type PasswordWithStrengthCheckInputQuery = (
  { __typename?: 'Query' }
  & Pick<Types.Query, 'passwordStrength'>
);

export type PensieveMessageFragment = (
  { __typename?: 'PensieveMessage' }
  & Pick<Types.PensieveMessage, 'from' | 'id' | 'timestamp' | 'isEdited' | 'likes' | 'text' | 'likedByViewer'>
);

export type PensieveMessageLikeMessageFragment = (
  { __typename?: 'PensieveMessage' }
  & Pick<Types.PensieveMessage, 'id' | 'likedByViewer' | 'likes'>
);

export type PensieveMessageMessageFragment = (
  { __typename?: 'PensieveMessage' }
  & Pick<Types.PensieveMessage, 'from' | 'id' | 'isEdited' | 'likes' | 'text' | 'timestamp' | 'likedByViewer'>
);

export type PensievePageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PensievePageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type PensieveQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PensieveQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'PensieveMessage' }
    & Pick<Types.PensieveMessage, 'id' | 'from' | 'timestamp' | 'isEdited' | 'likes' | 'text' | 'likedByViewer'>
  )> }
);

export type PensieveSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type PensieveSubscription = (
  { __typename?: 'Subscription' }
  & { message: Types.Maybe<(
    { __typename?: 'PensieveMessage' }
    & Pick<Types.PensieveMessage, 'id' | 'from' | 'timestamp' | 'isEdited' | 'likes' | 'text' | 'likedByViewer'>
  )> }
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

export type ResumePageQueryVariables = Types.Exact<{
  variant?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


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

export type SendPensieveMessageMutationVariables = Types.Exact<{
  input: Types.SendPensieveMessageInput;
}>;


export type SendPensieveMessageMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'SendPensieveMessagePayload' }
    & Pick<Types.SendPensieveMessagePayload, 'success'>
  ) }
);

export type SyncJournalEntriesMutationVariables = Types.Exact<{
  input: Types.SyncJournalEntriesInput;
}>;


export type SyncJournalEntriesMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'SyncJournalEntriesPayload' }
    & Pick<Types.SyncJournalEntriesPayload, 'success'>
  ) }
);

export type SyncLocationLogsMutationVariables = Types.Exact<{
  input: Types.SyncLocationLogsInput;
}>;


export type SyncLocationLogsMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'SyncLocationLogsPayload' }
    & Pick<Types.SyncLocationLogsPayload, 'success'>
  ) }
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

export type TestMutationMutationVariables = Types.Exact<{
  input: Types.TestMutationInput;
}>;


export type TestMutationMutation = (
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

export type TimelineAdminPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TimelineAdminPageQuery = (
  { __typename?: 'Query' }
  & { viewer: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'isOwner' | 'name'>
  )> }
);

export type TimelinePageActivitiesQueryVariables = Types.Exact<{
  after: Types.Scalars['DateTime']['input'];
  before: Types.Scalars['DateTime']['input'];
}>;


export type TimelinePageActivitiesQuery = (
  { __typename?: 'Query' }
  & { activities: Array<(
    { __typename?: 'TimelineActivity' }
    & Pick<Types.TimelineActivity, 'endedAt' | 'id' | 'location' | 'movementSpeedMetersPerSecond' | 'name' | 'startedAt' | 'timezoneName' | 'type'>
    & { photos: Array<(
      { __typename?: 'TimelinePhoto' }
      & Pick<Types.TimelinePhoto, 'id' | 'takenAt'>
      & { image: (
        { __typename?: 'Image' }
        & Pick<Types.Image, 'id' | 'src'>
      ) }
    )> }
  )> }
);

export type TimelinePageActivityFragment = (
  { __typename?: 'TimelineActivity' }
  & Pick<Types.TimelineActivity, 'endedAt' | 'id' | 'location' | 'movementSpeedMetersPerSecond' | 'name' | 'startedAt' | 'timezoneName' | 'type'>
  & { photos: Array<(
    { __typename?: 'TimelinePhoto' }
    & Pick<Types.TimelinePhoto, 'id' | 'takenAt'>
    & { image: (
      { __typename?: 'Image' }
      & Pick<Types.Image, 'id' | 'src'>
    ) }
  )> }
);

export type TimelinePhotoFragment = (
  { __typename?: 'TimelinePhoto' }
  & Pick<Types.TimelinePhoto, 'id' | 'takenAt'>
  & { image: (
    { __typename?: 'Image' }
    & Pick<Types.Image, 'id' | 'src'>
  ) }
);

export type UnlikePensieveMessageMutationVariables = Types.Exact<{
  input: Types.UnlikePensieveMessageInput;
}>;


export type UnlikePensieveMessageMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UnlikePensieveMessagePayload' }
    & Pick<Types.UnlikePensieveMessagePayload, 'success'>
  ) }
);

export type UpdateJourneysSessionParticipationMutationVariables = Types.Exact<{
  input: Types.UpdateJourneysSessionParticipationInput;
}>;


export type UpdateJourneysSessionParticipationMutation = (
  { __typename?: 'Mutation' }
  & { payload: (
    { __typename?: 'UpdateJourneysSessionParticipationPayload' }
    & { errors: Types.Maybe<Array<(
      { __typename?: 'InputFieldError' }
      & Pick<Types.InputFieldError, 'field' | 'message'>
    )>>, participation: Types.Maybe<(
      { __typename?: 'JourneysSessionParticipation' }
      & Pick<Types.JourneysSessionParticipation, 'id'>
    )> }
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
export const CurrentlyPlayingIslandTrackFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingIslandTrackFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotifyTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandTrackFragment, unknown>;
export const CurrentlyPlayingLyricsTooltipLyricLineFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipLyricLineFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LyricLine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isExplicit"}},{"kind":"Field","name":{"kind":"Name","value":"startTimeMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"words"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingLyricsTooltipLyricLineFragment, unknown>;
export const JournalEntryEntryFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<JournalEntryEntryFragment, unknown>;
export const HomePageJournalEntryEntryFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"nextEntryId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<HomePageJournalEntryEntryFragment, unknown>;
export const ICloudConnectionFormConnectionFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ICloudConnectionFormConnectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cookies"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<ICloudConnectionFormConnectionFragment, unknown>;
export const LocatePageTrailMarkerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocatePageTrailMarkerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationTrailMarker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<LocatePageTrailMarkerFragment, unknown>;
export const LocationAccessGrantCardGrantFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationAccessGrantCardGrantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationAccessGrant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locateUrl"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}}]}}]} as unknown as DocumentNode<LocationAccessGrantCardGrantFragment, unknown>;
export const LocationAlertLocationFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationAlertLocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approximateAddress"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsAreaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<LocationAlertLocationFragment, unknown>;
export const OAuthConnectionFormConnectionFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OAuthConnectionFormConnectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<OAuthConnectionFormConnectionFragment, unknown>;
export const PensieveMessageLikeMessageFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likedByViewer"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}}]} as unknown as DocumentNode<PensieveMessageLikeMessageFragment, unknown>;
export const PensieveMessageMessageFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likedByViewer"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}}]} as unknown as DocumentNode<PensieveMessageMessageFragment, unknown>;
export const PensieveMessageFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageMessageFragment"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likedByViewer"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<PensieveMessageFragment, unknown>;
export const TimelinePhotoFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TimelinePhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TimelinePhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"EnumValue","value":"MD"}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"takenAt"}}]}}]} as unknown as DocumentNode<TimelinePhotoFragment, unknown>;
export const TimelinePageActivityFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TimelinePageActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TimelineActivity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"movementSpeedMetersPerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TimelinePhotoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"timezoneName"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TimelinePhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TimelinePhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"EnumValue","value":"MD"}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"takenAt"}}]}}]} as unknown as DocumentNode<TimelinePageActivityFragment, unknown>;
export const UserSettingsPageViewerFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signedId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}}]}}]} as unknown as DocumentNode<UserSettingsPageViewerFragment, unknown>;
export const ActivateScottkitSignalMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateScottkitSignalMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateScottkitSignalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"activateScottkitSignal"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ActivateScottkitSignalMutation, ActivateScottkitSignalMutationVariables>;
export const ActivityStatusBadgeSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ActivityStatusBadgeSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activityStatus"}}]}}]} as unknown as DocumentNode<ActivityStatusBadgeSubscription, ActivityStatusBadgeSubscriptionVariables>;
export const AddJournalEntryCommentMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddJournalEntryCommentMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddJournalEntryCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"addJournalEntryComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddJournalEntryCommentMutation, AddJournalEntryCommentMutationVariables>;
export const AdminPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OAuthConnectionFormConnectionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"icloudConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ICloudConnectionFormConnectionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"spotifyConnection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OAuthConnectionFormConnectionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OAuthConnectionFormConnectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OAuthConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ICloudConnectionFormConnectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ICloudConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cookies"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"session"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<AdminPageQuery, AdminPageQueryVariables>;
export const AppMenuQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppMenuQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bootedAt"}}]}}]} as unknown as DocumentNode<AppMenuQuery, AppMenuQueryVariables>;
export const AvatarFieldQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AvatarFieldQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"image"},"name":{"kind":"Name","value":"imageBySignedId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"src"}}]}}]}}]} as unknown as DocumentNode<AvatarFieldQuery, AvatarFieldQueryVariables>;
export const ContactEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ContactEmailQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"email"},"name":{"kind":"Name","value":"contactEmail"}}]}}]} as unknown as DocumentNode<ContactEmailQuery, ContactEmailQueryVariables>;
export const CreateICloudConnectionMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateICloudConnectionMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateICloudConnectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createICloudConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requires2fa"}}]}}]}}]} as unknown as DocumentNode<CreateICloudConnectionMutation, CreateICloudConnectionMutationVariables>;
export const CreateLocationAccessGrantMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLocationAccessGrantMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLocationAccessGrantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createLocationAccessGrant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"grant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locateUrl"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLocationAccessGrantMutation, CreateLocationAccessGrantMutationVariables>;
export const CreateTimelinePhotoWithTimestampMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTimelinePhotoWithTimestampMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTimelinePhotoWithTimestampInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createTimelinePhotoWithTimestamp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<CreateTimelinePhotoWithTimestampMutation, CreateTimelinePhotoWithTimestampMutationVariables>;
export const CurrentlyPlayingIslandQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentlyPlayingIslandQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentlyPlayingIslandTrackFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingIslandTrackFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SpotifyTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"album"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandQuery, CurrentlyPlayingIslandQueryVariables>;
export const CurrentlyPlayingIslandSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"CurrentlyPlayingIslandSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progressMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CurrentlyPlayingIslandSubscription, CurrentlyPlayingIslandSubscriptionVariables>;
export const CurrentlyPlayingLyricsTooltipQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentlyPlaying"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipLyricLineFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CurrentlyPlayingLyricsTooltipLyricLineFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LyricLine"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isExplicit"}},{"kind":"Field","name":{"kind":"Name","value":"startTimeMilliseconds"}},{"kind":"Field","name":{"kind":"Name","value":"words"}}]}}]} as unknown as DocumentNode<CurrentlyPlayingLyricsTooltipQuery, CurrentlyPlayingLyricsTooltipQueryVariables>;
export const DeleteGoogleConnectionMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGoogleConnectionMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteGoogleConnectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteGoogleConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteGoogleConnectionMutation, DeleteGoogleConnectionMutationVariables>;
export const DeleteICloudConnectionMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteICloudConnectionMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteICloudConnectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteICloudConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteICloudConnectionMutation, DeleteICloudConnectionMutationVariables>;
export const DeleteLocationAccessGrantMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteLocationAccessGrantMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteLocationAccessGrantInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteLocationAccessGrant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteLocationAccessGrantMutation, DeleteLocationAccessGrantMutationVariables>;
export const DeleteSpotifyConnectionMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSpotifyConnectionMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSpotifyConnectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteSpotifyConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteSpotifyConnectionMutation, DeleteSpotifyConnectionMutationVariables>;
export const ErrorPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ErrorPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ErrorPageQuery, ErrorPageQueryVariables>;
export const FileFieldFileCardQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FileFieldFileCardQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"file"},"name":{"kind":"Name","value":"uploadBySignedId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"byteSize"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<FileFieldFileCardQuery, FileFieldFileCardQueryVariables>;
export const HomePageJournalEntryQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageJournalEntryQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"entry"},"name":{"kind":"Name","value":"journalEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"nextEntryId"}}]}}]} as unknown as DocumentNode<HomePageJournalEntryQuery, HomePageJournalEntryQueryVariables>;
export const HomePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"journalEntryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"showJournalEntry"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"announcement"}},{"kind":"Field","name":{"kind":"Name","value":"explorations"}},{"kind":"Field","name":{"kind":"Name","value":"journalEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"journalEntryId"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"showJournalEntry"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationAlertLocationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageJournalEntryEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JournalEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"JournalEntryEntryFragment"}},{"kind":"Field","name":{"kind":"Name","value":"nextEntryId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationAlertLocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approximateAddress"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsAreaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const ImportTimelineActivitiesMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportTimelineActivitiesMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportTimelineActivitiesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"importTimelineActivities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importCount"}}]}}]}}]} as unknown as DocumentNode<ImportTimelineActivitiesMutation, ImportTimelineActivitiesMutationVariables>;
export const ImportTimelinePhotosMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ImportTimelinePhotosMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ImportTimelinePhotosInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"importTimelinePhotos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importCount"}}]}}]}}]} as unknown as DocumentNode<ImportTimelinePhotosMutation, ImportTimelinePhotosMutationVariables>;
export const JournalEntryCommentsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JournalEntryCommentsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"comments"},"name":{"kind":"Name","value":"journalEntryComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"entryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"richText"}}]}}]}}]} as unknown as DocumentNode<JournalEntryCommentsQuery, JournalEntryCommentsQueryVariables>;
export const JourneysHomePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JourneysHomePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<JourneysHomePageQuery, JourneysHomePageQueryVariables>;
export const JourneysHomePageSessionsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JourneysHomePageSessionsQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sessions"},"name":{"kind":"Name","value":"journeysSessions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goal"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participantName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}}]}}]}}]} as unknown as DocumentNode<JourneysHomePageSessionsQuery, JourneysHomePageSessionsQueryVariables>;
export const JourneysSessionPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JourneysSessionPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"session"},"name":{"kind":"Name","value":"journeysSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goal"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participantName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewerParticipation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goal"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participantName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<JourneysSessionPageQuery, JourneysSessionPageQueryVariables>;
export const JourneysSessionPageSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"JourneysSessionPageSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"participation"},"name":{"kind":"Name","value":"journeysSessionParticipation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sessionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sessionId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<JourneysSessionPageSubscription, JourneysSessionPageSubscriptionVariables>;
export const JourneysSessionParticipationFormQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JourneysSessionParticipationFormQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"participation"},"name":{"kind":"Name","value":"journeysSessionParticipation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goal"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participantName"}}]}}]}}]} as unknown as DocumentNode<JourneysSessionParticipationFormQuery, JourneysSessionParticipationFormQueryVariables>;
export const LeaveJourneysSessionMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LeaveJourneysSessionMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LeaveJourneysSessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"leaveJourneysSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LeaveJourneysSessionMutation, LeaveJourneysSessionMutationVariables>;
export const LikePensieveMessageMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePensieveMessageMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikePensieveMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"likePensieveMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<LikePensieveMessageMutation, LikePensieveMessageMutationVariables>;
export const LocatePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LocatePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approximateCoordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<LocatePageQuery, LocatePageQueryVariables>;
export const LocatePageSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"LocatePageSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"details"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"trail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocatePageTrailMarkerFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocatePageTrailMarkerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationTrailMarker"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coordinates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<LocatePageSubscription, LocatePageSubscriptionVariables>;
export const LocationAccessGrantsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LocationAccessGrantsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locationAccessGrants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationAccessGrantCardGrantFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationAccessGrantCardGrantFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationAccessGrant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locateUrl"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"recipient"}}]}}]} as unknown as DocumentNode<LocationAccessGrantsQuery, LocationAccessGrantsQueryVariables>;
export const LocationAlertSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"LocationAlertSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LocationAlertLocationFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LocationAlertLocationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LocationLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approximateAddress"}},{"kind":"Field","name":{"kind":"Name","value":"googleMapsAreaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<LocationAlertSubscription, LocationAlertSubscriptionVariables>;
export const PasswordWithStrengthCheckInputQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PasswordWithStrengthCheckInputQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordStrength"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<PasswordWithStrengthCheckInputQuery, PasswordWithStrengthCheckInputQueryVariables>;
export const PensievePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PensievePageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PensievePageQuery, PensievePageQueryVariables>;
export const PensieveQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PensieveQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"messages"},"name":{"kind":"Name","value":"pensieveMessages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likedByViewer"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageMessageFragment"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<PensieveQuery, PensieveQueryVariables>;
export const PensieveSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"PensieveSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"message"},"name":{"kind":"Name","value":"pensieveMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"NullValue"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likedByViewer"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isEdited"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageLikeMessageFragment"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PensieveMessageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PensieveMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PensieveMessageMessageFragment"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<PensieveSubscription, PensieveSubscriptionVariables>;
export const RequestUserEmailVerificationMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestUserEmailVerificationMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestUserEmailVerificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"requestUserEmailVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RequestUserEmailVerificationMutation, RequestUserEmailVerificationMutationVariables>;
export const RequestUserPasswordResetMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestUserPasswordResetMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestUserPasswordResetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"requestUserPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<RequestUserPasswordResetMutation, RequestUserPasswordResetMutationVariables>;
export const ResumePageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResumePageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variant"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resume"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"variant"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variant"}}}]}]}}]} as unknown as DocumentNode<ResumePageQuery, ResumePageQueryVariables>;
export const ScottkitPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScottkitPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ScottkitPageQuery, ScottkitPageQueryVariables>;
export const SendPensieveMessageMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPensieveMessageMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendPensieveMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"sendPensieveMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SendPensieveMessageMutation, SendPensieveMessageMutationVariables>;
export const SyncJournalEntriesMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncJournalEntriesMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SyncJournalEntriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"syncJournalEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SyncJournalEntriesMutation, SyncJournalEntriesMutationVariables>;
export const SyncLocationLogsMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SyncLocationLogsMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SyncLocationLogsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"syncLocationLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<SyncLocationLogsMutation, SyncLocationLogsMutationVariables>;
export const TestEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"hasUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"hasUser"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<TestEmailQuery, TestEmailQueryVariables>;
export const TestFeedSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TestFeedSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testSubscription"}}]}}]} as unknown as DocumentNode<TestFeedSubscription, TestFeedSubscriptionVariables>;
export const TestMutationMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TestMutationMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TestMutationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"testMutation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"model"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<TestMutationMutation, TestMutationMutationVariables>;
export const TestPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestPageQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testEcho"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]},{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TestPageQuery, TestPageQueryVariables>;
export const TimelineAdminPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TimelineAdminPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<TimelineAdminPageQuery, TimelineAdminPageQueryVariables>;
export const TimelinePageActivitiesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TimelinePageActivitiesQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"activities"},"name":{"kind":"Name","value":"timelineActivities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TimelinePageActivityFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TimelinePhotoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TimelinePhoto"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"EnumValue","value":"MD"}}]}]}},{"kind":"Field","name":{"kind":"Name","value":"takenAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TimelinePageActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TimelineActivity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"movementSpeedMetersPerSecond"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"TimelinePhotoFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"timezoneName"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<TimelinePageActivitiesQuery, TimelinePageActivitiesQueryVariables>;
export const UnlikePensieveMessageMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlikePensieveMessageMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnlikePensieveMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"unlikePensieveMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UnlikePensieveMessageMutation, UnlikePensieveMessageMutationVariables>;
export const UpdateJourneysSessionParticipationMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateJourneysSessionParticipationMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJourneysSessionParticipationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateJourneysSessionParticipation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"field"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}},{"kind":"Field","name":{"kind":"Name","value":"participation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateJourneysSessionParticipationMutation, UpdateJourneysSessionParticipationMutationVariables>;
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
export const UserSettingsPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserSettingsPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AppViewerFragment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AppViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isOwner"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsPageViewerFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatar"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signedId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}}]}}]} as unknown as DocumentNode<UserSettingsPageQuery, UserSettingsPageQueryVariables>;
export const UserWelcomeEmailQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserWelcomeEmailQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserWelcomeEmailQuery, UserWelcomeEmailQueryVariables>;
export const VerifyICloudSecurityCodeMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyICloudSecurityCodeMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyICloudSecurityCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"verifyICloudSecurityCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<VerifyICloudSecurityCodeMutation, VerifyICloudSecurityCodeMutationVariables>;