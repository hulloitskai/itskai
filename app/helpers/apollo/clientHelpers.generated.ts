import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type ActivateScottkitSignalPayloadKeySpecifier = ('clientMutationId' | 'success' | ActivateScottkitSignalPayloadKeySpecifier)[];
export type ActivateScottkitSignalPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddJournalEntryCommentPayloadKeySpecifier = ('clientMutationId' | 'comment' | 'success' | AddJournalEntryCommentPayloadKeySpecifier)[];
export type AddJournalEntryCommentPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	comment?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CoordinatesKeySpecifier = ('latitude' | 'longitude' | CoordinatesKeySpecifier)[];
export type CoordinatesFieldPolicy = {
	latitude?: FieldPolicy<any> | FieldReadFunction<any>,
	longitude?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateDishwatcherDevicePayloadKeySpecifier = ('clientMutationId' | 'device' | 'errors' | 'success' | CreateDishwatcherDevicePayloadKeySpecifier)[];
export type CreateDishwatcherDevicePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	device?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateICloudConnectionPayloadKeySpecifier = ('clientMutationId' | 'requires2fa' | 'success' | CreateICloudConnectionPayloadKeySpecifier)[];
export type CreateICloudConnectionPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	requires2fa?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateLocationAccessGrantPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'grant' | 'success' | CreateLocationAccessGrantPayloadKeySpecifier)[];
export type CreateLocationAccessGrantPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	grant?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreatePensieveRecordingPayloadKeySpecifier = ('clientMutationId' | 'recording' | 'success' | CreatePensieveRecordingPayloadKeySpecifier)[];
export type CreatePensieveRecordingPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	recording?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateTimelinePhotoWithTimestampPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'photo' | 'success' | CreateTimelinePhotoWithTimestampPayloadKeySpecifier)[];
export type CreateTimelinePhotoWithTimestampPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	photo?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrentlyPlayingKeySpecifier = ('progressMilliseconds' | 'timestamp' | 'track' | CurrentlyPlayingKeySpecifier)[];
export type CurrentlyPlayingFieldPolicy = {
	progressMilliseconds?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	track?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteGoogleConnectionPayloadKeySpecifier = ('clientMutationId' | 'success' | DeleteGoogleConnectionPayloadKeySpecifier)[];
export type DeleteGoogleConnectionPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteICloudConnectionPayloadKeySpecifier = ('clientMutationId' | 'success' | DeleteICloudConnectionPayloadKeySpecifier)[];
export type DeleteICloudConnectionPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteLocationAccessGrantPayloadKeySpecifier = ('clientMutationId' | 'success' | DeleteLocationAccessGrantPayloadKeySpecifier)[];
export type DeleteLocationAccessGrantPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteSpotifyConnectionPayloadKeySpecifier = ('clientMutationId' | 'success' | DeleteSpotifyConnectionPayloadKeySpecifier)[];
export type DeleteSpotifyConnectionPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DishwatcherDeviceKeySpecifier = ('createdAt' | 'id' | 'name' | 'secretKey' | DishwatcherDeviceKeySpecifier)[];
export type DishwatcherDeviceFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	secretKey?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FileKeySpecifier = ('byteSize' | 'contentType' | 'filename' | 'id' | 'signedId' | 'url' | FileKeySpecifier)[];
export type FileFieldPolicy = {
	byteSize?: FieldPolicy<any> | FieldReadFunction<any>,
	contentType?: FieldPolicy<any> | FieldReadFunction<any>,
	filename?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	signedId?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ICloudConnectionKeySpecifier = ('credentials' | 'status' | ICloudConnectionKeySpecifier)[];
export type ICloudConnectionFieldPolicy = {
	credentials?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ICloudCredentialsKeySpecifier = ('cookies' | 'email' | 'id' | 'password' | 'session' | ICloudCredentialsKeySpecifier)[];
export type ICloudCredentialsFieldPolicy = {
	cookies?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	session?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImageKeySpecifier = ('byteSize' | 'contentType' | 'filename' | 'id' | 'signedId' | 'src' | 'url' | ImageKeySpecifier)[];
export type ImageFieldPolicy = {
	byteSize?: FieldPolicy<any> | FieldReadFunction<any>,
	contentType?: FieldPolicy<any> | FieldReadFunction<any>,
	filename?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	signedId?: FieldPolicy<any> | FieldReadFunction<any>,
	src?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImportTimelineActivitiesPayloadKeySpecifier = ('clientMutationId' | 'importCount' | 'success' | ImportTimelineActivitiesPayloadKeySpecifier)[];
export type ImportTimelineActivitiesPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	importCount?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImportTimelinePhotosPayloadKeySpecifier = ('clientMutationId' | 'importCount' | 'success' | ImportTimelinePhotosPayloadKeySpecifier)[];
export type ImportTimelinePhotosPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	importCount?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InputFieldErrorKeySpecifier = ('field' | 'message' | InputFieldErrorKeySpecifier)[];
export type InputFieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JournalEntryKeySpecifier = ('content' | 'id' | 'modifiedAt' | 'nextEntryId' | 'startedAt' | 'title' | 'url' | JournalEntryKeySpecifier)[];
export type JournalEntryFieldPolicy = {
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	modifiedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	nextEntryId?: FieldPolicy<any> | FieldReadFunction<any>,
	startedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JourneysSessionKeySpecifier = ('id' | 'participations' | 'startedAt' | 'url' | 'viewerParticipation' | JourneysSessionKeySpecifier)[];
export type JourneysSessionFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	participations?: FieldPolicy<any> | FieldReadFunction<any>,
	startedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	viewerParticipation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JourneysSessionConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | JourneysSessionConnectionKeySpecifier)[];
export type JourneysSessionConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JourneysSessionEdgeKeySpecifier = ('cursor' | 'node' | JourneysSessionEdgeKeySpecifier)[];
export type JourneysSessionEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JourneysSessionParticipationKeySpecifier = ('goal' | 'id' | 'participantIsViewer' | 'participantName' | 'session' | JourneysSessionParticipationKeySpecifier)[];
export type JourneysSessionParticipationFieldPolicy = {
	goal?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	participantIsViewer?: FieldPolicy<any> | FieldReadFunction<any>,
	participantName?: FieldPolicy<any> | FieldReadFunction<any>,
	session?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LeaveJourneysSessionPayloadKeySpecifier = ('clientMutationId' | 'session' | 'success' | LeaveJourneysSessionPayloadKeySpecifier)[];
export type LeaveJourneysSessionPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	session?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LocationAccessGrantKeySpecifier = ('createdAt' | 'expiresAt' | 'id' | 'locateUrl' | 'password' | 'recipient' | LocationAccessGrantKeySpecifier)[];
export type LocationAccessGrantFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	expiresAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	locateUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LocationDetailsKeySpecifier = ('address' | 'coordinates' | 'expiresAt' | 'trail' | LocationDetailsKeySpecifier)[];
export type LocationDetailsFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	coordinates?: FieldPolicy<any> | FieldReadFunction<any>,
	expiresAt?: FieldPolicy<any> | FieldReadFunction<any>,
	trail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LocationLogKeySpecifier = ('approximateAddress' | 'approximateCoordinates' | 'details' | 'googleMapsAreaUrl' | 'id' | 'timestamp' | LocationLogKeySpecifier)[];
export type LocationLogFieldPolicy = {
	approximateAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	approximateCoordinates?: FieldPolicy<any> | FieldReadFunction<any>,
	details?: FieldPolicy<any> | FieldReadFunction<any>,
	googleMapsAreaUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LocationTrailMarkerKeySpecifier = ('coordinates' | 'id' | 'timestamp' | LocationTrailMarkerKeySpecifier)[];
export type LocationTrailMarkerFieldPolicy = {
	coordinates?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LyricLineKeySpecifier = ('isExplicit' | 'startTimeMilliseconds' | 'words' | LyricLineKeySpecifier)[];
export type LyricLineFieldPolicy = {
	isExplicit?: FieldPolicy<any> | FieldReadFunction<any>,
	startTimeMilliseconds?: FieldPolicy<any> | FieldReadFunction<any>,
	words?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('activateScottkitSignal' | 'addJournalEntryComment' | 'createDishwatchDevice' | 'createICloudConnection' | 'createLocationAccessGrant' | 'createPensieveRecording' | 'createTimelinePhotoWithTimestamp' | 'deleteGoogleConnection' | 'deleteICloudConnection' | 'deleteLocationAccessGrant' | 'deleteSpotifyConnection' | 'importTimelineActivities' | 'importTimelinePhotos' | 'leaveJourneysSession' | 'requestUserEmailVerification' | 'requestUserPasswordReset' | 'syncJournalEntries' | 'syncLocationLogs' | 'testMutation' | 'updateDishwatchDevice' | 'updateJourneysSessionParticipation' | 'updateUserEmail' | 'updateUserProfile' | 'verifyICloudSecurityCode' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	activateScottkitSignal?: FieldPolicy<any> | FieldReadFunction<any>,
	addJournalEntryComment?: FieldPolicy<any> | FieldReadFunction<any>,
	createDishwatchDevice?: FieldPolicy<any> | FieldReadFunction<any>,
	createICloudConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	createLocationAccessGrant?: FieldPolicy<any> | FieldReadFunction<any>,
	createPensieveRecording?: FieldPolicy<any> | FieldReadFunction<any>,
	createTimelinePhotoWithTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteGoogleConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteICloudConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteLocationAccessGrant?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteSpotifyConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	importTimelineActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	importTimelinePhotos?: FieldPolicy<any> | FieldReadFunction<any>,
	leaveJourneysSession?: FieldPolicy<any> | FieldReadFunction<any>,
	requestUserEmailVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	requestUserPasswordReset?: FieldPolicy<any> | FieldReadFunction<any>,
	syncJournalEntries?: FieldPolicy<any> | FieldReadFunction<any>,
	syncLocationLogs?: FieldPolicy<any> | FieldReadFunction<any>,
	testMutation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateDishwatchDevice?: FieldPolicy<any> | FieldReadFunction<any>,
	updateJourneysSessionParticipation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyICloudSecurityCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotionCommentKeySpecifier = ('createdAt' | 'id' | 'modifiedAt' | 'richText' | NotionCommentKeySpecifier)[];
export type NotionCommentFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	modifiedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	richText?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OAuthConnectionKeySpecifier = ('credentials' | 'status' | OAuthConnectionKeySpecifier)[];
export type OAuthConnectionFieldPolicy = {
	credentials?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OAuthCredentialsKeySpecifier = ('id' | 'name' | 'refreshToken' | 'uid' | OAuthCredentialsKeySpecifier)[];
export type OAuthCredentialsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PensieveRecordingKeySpecifier = ('audio' | 'createdAt' | 'id' | 'transcription' | PensieveRecordingKeySpecifier)[];
export type PensieveRecordingFieldPolicy = {
	audio?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	transcription?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('activityStatus' | 'announcement' | 'bootedAt' | 'contactEmail' | 'currentlyPlaying' | 'explorations' | 'googleConnection' | 'icloudConnection' | 'imageBySignedId' | 'journalEntry' | 'journalEntryComments' | 'journeysSession' | 'journeysSessionParticipation' | 'journeysSessions' | 'location' | 'locationAccessGrants' | 'passwordStrength' | 'resume' | 'spotifyConnection' | 'testEcho' | 'timelineActivities' | 'timezone' | 'uploadBySignedId' | 'user' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	activityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	announcement?: FieldPolicy<any> | FieldReadFunction<any>,
	bootedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	contactEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	explorations?: FieldPolicy<any> | FieldReadFunction<any>,
	googleConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	imageBySignedId?: FieldPolicy<any> | FieldReadFunction<any>,
	journalEntry?: FieldPolicy<any> | FieldReadFunction<any>,
	journalEntryComments?: FieldPolicy<any> | FieldReadFunction<any>,
	journeysSession?: FieldPolicy<any> | FieldReadFunction<any>,
	journeysSessionParticipation?: FieldPolicy<any> | FieldReadFunction<any>,
	journeysSessions?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	locationAccessGrants?: FieldPolicy<any> | FieldReadFunction<any>,
	passwordStrength?: FieldPolicy<any> | FieldReadFunction<any>,
	resume?: FieldPolicy<any> | FieldReadFunction<any>,
	spotifyConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	testEcho?: FieldPolicy<any> | FieldReadFunction<any>,
	timelineActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	uploadBySignedId?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	viewer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RequestUserEmailVerificationPayloadKeySpecifier = ('clientMutationId' | 'success' | RequestUserEmailVerificationPayloadKeySpecifier)[];
export type RequestUserEmailVerificationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RequestUserPasswordResetPayloadKeySpecifier = ('clientMutationId' | 'success' | RequestUserPasswordResetPayloadKeySpecifier)[];
export type RequestUserPasswordResetPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpotifyAlbumKeySpecifier = ('id' | 'imageUrl' | 'name' | 'url' | SpotifyAlbumKeySpecifier)[];
export type SpotifyAlbumFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	imageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpotifyArtistKeySpecifier = ('id' | 'name' | 'url' | SpotifyArtistKeySpecifier)[];
export type SpotifyArtistFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpotifyTrackKeySpecifier = ('album' | 'artists' | 'durationMilliseconds' | 'id' | 'lyrics' | 'name' | 'url' | SpotifyTrackKeySpecifier)[];
export type SpotifyTrackFieldPolicy = {
	album?: FieldPolicy<any> | FieldReadFunction<any>,
	artists?: FieldPolicy<any> | FieldReadFunction<any>,
	durationMilliseconds?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lyrics?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('activityStatus' | 'currentlyPlaying' | 'journeysSessionParticipation' | 'location' | 'pensieveRecording' | 'testSubscription' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	activityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	journeysSessionParticipation?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	pensieveRecording?: FieldPolicy<any> | FieldReadFunction<any>,
	testSubscription?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SyncJournalEntriesPayloadKeySpecifier = ('clientMutationId' | 'success' | SyncJournalEntriesPayloadKeySpecifier)[];
export type SyncJournalEntriesPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SyncLocationLogsPayloadKeySpecifier = ('clientMutationId' | 'success' | SyncLocationLogsPayloadKeySpecifier)[];
export type SyncLocationLogsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestModelKeySpecifier = ('birthday' | 'id' | 'name' | TestModelKeySpecifier)[];
export type TestModelFieldPolicy = {
	birthday?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestMutationPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'model' | 'success' | TestMutationPayloadKeySpecifier)[];
export type TestMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	model?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelineActivityKeySpecifier = ('address' | 'distanceMeters' | 'endedAt' | 'id' | 'location' | 'movementSpeedMetersPerSecond' | 'name' | 'photos' | 'startedAt' | 'timezone' | 'timezoneName' | 'type' | TimelineActivityKeySpecifier)[];
export type TimelineActivityFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	distanceMeters?: FieldPolicy<any> | FieldReadFunction<any>,
	endedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	movementSpeedMetersPerSecond?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	photos?: FieldPolicy<any> | FieldReadFunction<any>,
	startedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	timezoneName?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimelinePhotoKeySpecifier = ('coordinates' | 'id' | 'image' | 'takenAt' | TimelinePhotoKeySpecifier)[];
export type TimelinePhotoFieldPolicy = {
	coordinates?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	takenAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimezoneKeySpecifier = ('abbreviation' | 'name' | 'offset' | 'offsetMinutes' | TimezoneKeySpecifier)[];
export type TimezoneFieldPolicy = {
	abbreviation?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	offset?: FieldPolicy<any> | FieldReadFunction<any>,
	offsetMinutes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateDishwatchDevicePayloadKeySpecifier = ('clientMutationId' | 'device' | 'errors' | 'success' | UpdateDishwatchDevicePayloadKeySpecifier)[];
export type UpdateDishwatchDevicePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	device?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateJourneysSessionParticipationPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'participation' | 'success' | UpdateJourneysSessionParticipationPayloadKeySpecifier)[];
export type UpdateJourneysSessionParticipationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	participation?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateUserEmailPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'success' | 'user' | UpdateUserEmailPayloadKeySpecifier)[];
export type UpdateUserEmailPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateUserProfilePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'success' | 'user' | UpdateUserProfilePayloadKeySpecifier)[];
export type UpdateUserProfilePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UploadKeySpecifier = ('byteSize' | 'contentType' | 'filename' | 'signedId' | 'url' | UploadKeySpecifier)[];
export type UploadFieldPolicy = {
	byteSize?: FieldPolicy<any> | FieldReadFunction<any>,
	contentType?: FieldPolicy<any> | FieldReadFunction<any>,
	filename?: FieldPolicy<any> | FieldReadFunction<any>,
	signedId?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('avatar' | 'email' | 'id' | 'isOwner' | 'name' | 'pensieveRecordings' | 'unverifiedEmail' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isOwner?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	pensieveRecordings?: FieldPolicy<any> | FieldReadFunction<any>,
	unverifiedEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VerifyICloudSecurityCodePayloadKeySpecifier = ('clientMutationId' | 'success' | VerifyICloudSecurityCodePayloadKeySpecifier)[];
export type VerifyICloudSecurityCodePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	ActivateScottkitSignalPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ActivateScottkitSignalPayloadKeySpecifier | (() => undefined | ActivateScottkitSignalPayloadKeySpecifier),
		fields?: ActivateScottkitSignalPayloadFieldPolicy,
	},
	AddJournalEntryCommentPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddJournalEntryCommentPayloadKeySpecifier | (() => undefined | AddJournalEntryCommentPayloadKeySpecifier),
		fields?: AddJournalEntryCommentPayloadFieldPolicy,
	},
	Coordinates?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CoordinatesKeySpecifier | (() => undefined | CoordinatesKeySpecifier),
		fields?: CoordinatesFieldPolicy,
	},
	CreateDishwatcherDevicePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateDishwatcherDevicePayloadKeySpecifier | (() => undefined | CreateDishwatcherDevicePayloadKeySpecifier),
		fields?: CreateDishwatcherDevicePayloadFieldPolicy,
	},
	CreateICloudConnectionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateICloudConnectionPayloadKeySpecifier | (() => undefined | CreateICloudConnectionPayloadKeySpecifier),
		fields?: CreateICloudConnectionPayloadFieldPolicy,
	},
	CreateLocationAccessGrantPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateLocationAccessGrantPayloadKeySpecifier | (() => undefined | CreateLocationAccessGrantPayloadKeySpecifier),
		fields?: CreateLocationAccessGrantPayloadFieldPolicy,
	},
	CreatePensieveRecordingPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreatePensieveRecordingPayloadKeySpecifier | (() => undefined | CreatePensieveRecordingPayloadKeySpecifier),
		fields?: CreatePensieveRecordingPayloadFieldPolicy,
	},
	CreateTimelinePhotoWithTimestampPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateTimelinePhotoWithTimestampPayloadKeySpecifier | (() => undefined | CreateTimelinePhotoWithTimestampPayloadKeySpecifier),
		fields?: CreateTimelinePhotoWithTimestampPayloadFieldPolicy,
	},
	CurrentlyPlaying?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrentlyPlayingKeySpecifier | (() => undefined | CurrentlyPlayingKeySpecifier),
		fields?: CurrentlyPlayingFieldPolicy,
	},
	DeleteGoogleConnectionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteGoogleConnectionPayloadKeySpecifier | (() => undefined | DeleteGoogleConnectionPayloadKeySpecifier),
		fields?: DeleteGoogleConnectionPayloadFieldPolicy,
	},
	DeleteICloudConnectionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteICloudConnectionPayloadKeySpecifier | (() => undefined | DeleteICloudConnectionPayloadKeySpecifier),
		fields?: DeleteICloudConnectionPayloadFieldPolicy,
	},
	DeleteLocationAccessGrantPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteLocationAccessGrantPayloadKeySpecifier | (() => undefined | DeleteLocationAccessGrantPayloadKeySpecifier),
		fields?: DeleteLocationAccessGrantPayloadFieldPolicy,
	},
	DeleteSpotifyConnectionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteSpotifyConnectionPayloadKeySpecifier | (() => undefined | DeleteSpotifyConnectionPayloadKeySpecifier),
		fields?: DeleteSpotifyConnectionPayloadFieldPolicy,
	},
	DishwatcherDevice?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DishwatcherDeviceKeySpecifier | (() => undefined | DishwatcherDeviceKeySpecifier),
		fields?: DishwatcherDeviceFieldPolicy,
	},
	File?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FileKeySpecifier | (() => undefined | FileKeySpecifier),
		fields?: FileFieldPolicy,
	},
	ICloudConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ICloudConnectionKeySpecifier | (() => undefined | ICloudConnectionKeySpecifier),
		fields?: ICloudConnectionFieldPolicy,
	},
	ICloudCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ICloudCredentialsKeySpecifier | (() => undefined | ICloudCredentialsKeySpecifier),
		fields?: ICloudCredentialsFieldPolicy,
	},
	Image?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageKeySpecifier | (() => undefined | ImageKeySpecifier),
		fields?: ImageFieldPolicy,
	},
	ImportTimelineActivitiesPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImportTimelineActivitiesPayloadKeySpecifier | (() => undefined | ImportTimelineActivitiesPayloadKeySpecifier),
		fields?: ImportTimelineActivitiesPayloadFieldPolicy,
	},
	ImportTimelinePhotosPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImportTimelinePhotosPayloadKeySpecifier | (() => undefined | ImportTimelinePhotosPayloadKeySpecifier),
		fields?: ImportTimelinePhotosPayloadFieldPolicy,
	},
	InputFieldError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InputFieldErrorKeySpecifier | (() => undefined | InputFieldErrorKeySpecifier),
		fields?: InputFieldErrorFieldPolicy,
	},
	JournalEntry?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JournalEntryKeySpecifier | (() => undefined | JournalEntryKeySpecifier),
		fields?: JournalEntryFieldPolicy,
	},
	JourneysSession?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JourneysSessionKeySpecifier | (() => undefined | JourneysSessionKeySpecifier),
		fields?: JourneysSessionFieldPolicy,
	},
	JourneysSessionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JourneysSessionConnectionKeySpecifier | (() => undefined | JourneysSessionConnectionKeySpecifier),
		fields?: JourneysSessionConnectionFieldPolicy,
	},
	JourneysSessionEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JourneysSessionEdgeKeySpecifier | (() => undefined | JourneysSessionEdgeKeySpecifier),
		fields?: JourneysSessionEdgeFieldPolicy,
	},
	JourneysSessionParticipation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JourneysSessionParticipationKeySpecifier | (() => undefined | JourneysSessionParticipationKeySpecifier),
		fields?: JourneysSessionParticipationFieldPolicy,
	},
	LeaveJourneysSessionPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LeaveJourneysSessionPayloadKeySpecifier | (() => undefined | LeaveJourneysSessionPayloadKeySpecifier),
		fields?: LeaveJourneysSessionPayloadFieldPolicy,
	},
	LocationAccessGrant?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LocationAccessGrantKeySpecifier | (() => undefined | LocationAccessGrantKeySpecifier),
		fields?: LocationAccessGrantFieldPolicy,
	},
	LocationDetails?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LocationDetailsKeySpecifier | (() => undefined | LocationDetailsKeySpecifier),
		fields?: LocationDetailsFieldPolicy,
	},
	LocationLog?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LocationLogKeySpecifier | (() => undefined | LocationLogKeySpecifier),
		fields?: LocationLogFieldPolicy,
	},
	LocationTrailMarker?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LocationTrailMarkerKeySpecifier | (() => undefined | LocationTrailMarkerKeySpecifier),
		fields?: LocationTrailMarkerFieldPolicy,
	},
	LyricLine?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LyricLineKeySpecifier | (() => undefined | LyricLineKeySpecifier),
		fields?: LyricLineFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	NotionComment?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotionCommentKeySpecifier | (() => undefined | NotionCommentKeySpecifier),
		fields?: NotionCommentFieldPolicy,
	},
	OAuthConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OAuthConnectionKeySpecifier | (() => undefined | OAuthConnectionKeySpecifier),
		fields?: OAuthConnectionFieldPolicy,
	},
	OAuthCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OAuthCredentialsKeySpecifier | (() => undefined | OAuthCredentialsKeySpecifier),
		fields?: OAuthCredentialsFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	PensieveRecording?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PensieveRecordingKeySpecifier | (() => undefined | PensieveRecordingKeySpecifier),
		fields?: PensieveRecordingFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RequestUserEmailVerificationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RequestUserEmailVerificationPayloadKeySpecifier | (() => undefined | RequestUserEmailVerificationPayloadKeySpecifier),
		fields?: RequestUserEmailVerificationPayloadFieldPolicy,
	},
	RequestUserPasswordResetPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RequestUserPasswordResetPayloadKeySpecifier | (() => undefined | RequestUserPasswordResetPayloadKeySpecifier),
		fields?: RequestUserPasswordResetPayloadFieldPolicy,
	},
	SpotifyAlbum?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotifyAlbumKeySpecifier | (() => undefined | SpotifyAlbumKeySpecifier),
		fields?: SpotifyAlbumFieldPolicy,
	},
	SpotifyArtist?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotifyArtistKeySpecifier | (() => undefined | SpotifyArtistKeySpecifier),
		fields?: SpotifyArtistFieldPolicy,
	},
	SpotifyTrack?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotifyTrackKeySpecifier | (() => undefined | SpotifyTrackKeySpecifier),
		fields?: SpotifyTrackFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	SyncJournalEntriesPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SyncJournalEntriesPayloadKeySpecifier | (() => undefined | SyncJournalEntriesPayloadKeySpecifier),
		fields?: SyncJournalEntriesPayloadFieldPolicy,
	},
	SyncLocationLogsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SyncLocationLogsPayloadKeySpecifier | (() => undefined | SyncLocationLogsPayloadKeySpecifier),
		fields?: SyncLocationLogsPayloadFieldPolicy,
	},
	TestModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestModelKeySpecifier | (() => undefined | TestModelKeySpecifier),
		fields?: TestModelFieldPolicy,
	},
	TestMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestMutationPayloadKeySpecifier | (() => undefined | TestMutationPayloadKeySpecifier),
		fields?: TestMutationPayloadFieldPolicy,
	},
	TimelineActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelineActivityKeySpecifier | (() => undefined | TimelineActivityKeySpecifier),
		fields?: TimelineActivityFieldPolicy,
	},
	TimelinePhoto?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimelinePhotoKeySpecifier | (() => undefined | TimelinePhotoKeySpecifier),
		fields?: TimelinePhotoFieldPolicy,
	},
	Timezone?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimezoneKeySpecifier | (() => undefined | TimezoneKeySpecifier),
		fields?: TimezoneFieldPolicy,
	},
	UpdateDishwatchDevicePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateDishwatchDevicePayloadKeySpecifier | (() => undefined | UpdateDishwatchDevicePayloadKeySpecifier),
		fields?: UpdateDishwatchDevicePayloadFieldPolicy,
	},
	UpdateJourneysSessionParticipationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateJourneysSessionParticipationPayloadKeySpecifier | (() => undefined | UpdateJourneysSessionParticipationPayloadKeySpecifier),
		fields?: UpdateJourneysSessionParticipationPayloadFieldPolicy,
	},
	UpdateUserEmailPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateUserEmailPayloadKeySpecifier | (() => undefined | UpdateUserEmailPayloadKeySpecifier),
		fields?: UpdateUserEmailPayloadFieldPolicy,
	},
	UpdateUserProfilePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateUserProfilePayloadKeySpecifier | (() => undefined | UpdateUserProfilePayloadKeySpecifier),
		fields?: UpdateUserProfilePayloadFieldPolicy,
	},
	Upload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UploadKeySpecifier | (() => undefined | UploadKeySpecifier),
		fields?: UploadFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	VerifyICloudSecurityCodePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VerifyICloudSecurityCodePayloadKeySpecifier | (() => undefined | VerifyICloudSecurityCodePayloadKeySpecifier),
		fields?: VerifyICloudSecurityCodePayloadFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;