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
export type CreateLocationAccessGrantPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'grant' | 'success' | CreateLocationAccessGrantPayloadKeySpecifier)[];
export type CreateLocationAccessGrantPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	grant?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateSenecaMoodLogPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'log' | 'success' | CreateSenecaMoodLogPayloadKeySpecifier)[];
export type CreateSenecaMoodLogPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	log?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrentlyPlayingKeySpecifier = ('progressMilliseconds' | 'timestamp' | 'track' | CurrentlyPlayingKeySpecifier)[];
export type CurrentlyPlayingFieldPolicy = {
	progressMilliseconds?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	track?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteLocationAccessGrantPayloadKeySpecifier = ('clientMutationId' | 'success' | DeleteLocationAccessGrantPayloadKeySpecifier)[];
export type DeleteLocationAccessGrantPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ICloudCredentialsKeySpecifier = ('cookies' | 'email' | 'id' | 'password' | 'session' | ICloudCredentialsKeySpecifier)[];
export type ICloudCredentialsFieldPolicy = {
	cookies?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	session?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImageKeySpecifier = ('id' | 'signedId' | 'url' | ImageKeySpecifier)[];
export type ImageFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	signedId?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImportJournalEntriesPayloadKeySpecifier = ('clientMutationId' | 'success' | ImportJournalEntriesPayloadKeySpecifier)[];
export type ImportJournalEntriesPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImportLocationLogsPayloadKeySpecifier = ('clientMutationId' | 'success' | ImportLocationLogsPayloadKeySpecifier)[];
export type ImportLocationLogsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InputFieldErrorKeySpecifier = ('field' | 'message' | InputFieldErrorKeySpecifier)[];
export type InputFieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InstagramCredentialsKeySpecifier = ('id' | 'password' | 'session' | 'username' | InstagramCredentialsKeySpecifier)[];
export type InstagramCredentialsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	session?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
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
export type LikePensieveMessagePayloadKeySpecifier = ('clientMutationId' | 'message' | 'success' | LikePensieveMessagePayloadKeySpecifier)[];
export type LikePensieveMessagePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type MutationKeySpecifier = ('activateScottkitSignal' | 'addJournalEntryComment' | 'createLocationAccessGrant' | 'createSenecaMoodLog' | 'deleteLocationAccessGrant' | 'importJournalEntries' | 'importLocationLogs' | 'likePensieveMessage' | 'removeGoogleCredentials' | 'removeICloudCredentials' | 'removeInstagramCredentials' | 'removeSpotifyCredentials' | 'requestUserEmailVerification' | 'requestUserPasswordReset' | 'sendPensieveMessage' | 'testMutation' | 'unlikePensieveMessage' | 'updateICloudCredentials' | 'updateInstagramCredentials' | 'updateUserEmail' | 'updateUserProfile' | 'verifyICloudSecurityCode' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	activateScottkitSignal?: FieldPolicy<any> | FieldReadFunction<any>,
	addJournalEntryComment?: FieldPolicy<any> | FieldReadFunction<any>,
	createLocationAccessGrant?: FieldPolicy<any> | FieldReadFunction<any>,
	createSenecaMoodLog?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteLocationAccessGrant?: FieldPolicy<any> | FieldReadFunction<any>,
	importJournalEntries?: FieldPolicy<any> | FieldReadFunction<any>,
	importLocationLogs?: FieldPolicy<any> | FieldReadFunction<any>,
	likePensieveMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	removeGoogleCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	removeICloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	removeInstagramCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	removeSpotifyCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	requestUserEmailVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	requestUserPasswordReset?: FieldPolicy<any> | FieldReadFunction<any>,
	sendPensieveMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	testMutation?: FieldPolicy<any> | FieldReadFunction<any>,
	unlikePensieveMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	updateICloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	updateInstagramCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type OAuthCredentialsKeySpecifier = ('id' | 'name' | 'refreshToken' | 'uid' | OAuthCredentialsKeySpecifier)[];
export type OAuthCredentialsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PensieveMessageKeySpecifier = ('from' | 'id' | 'isEdited' | 'likedByViewer' | 'likes' | 'text' | 'timestamp' | PensieveMessageKeySpecifier)[];
export type PensieveMessageFieldPolicy = {
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isEdited?: FieldPolicy<any> | FieldReadFunction<any>,
	likedByViewer?: FieldPolicy<any> | FieldReadFunction<any>,
	likes?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('activityStatus' | 'announcement' | 'bootedAt' | 'contactEmail' | 'currentlyPlaying' | 'explorations' | 'googleCredentials' | 'icloudCredentials' | 'imageBySignedId' | 'instagramCredentials' | 'journalEntry' | 'journalEntryComments' | 'location' | 'locationAccessGrants' | 'passwordStrength' | 'pensieveMessages' | 'resume' | 'spotifyCredentials' | 'testEcho' | 'timezone' | 'user' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	activityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	announcement?: FieldPolicy<any> | FieldReadFunction<any>,
	bootedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	contactEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	explorations?: FieldPolicy<any> | FieldReadFunction<any>,
	googleCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	imageBySignedId?: FieldPolicy<any> | FieldReadFunction<any>,
	instagramCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	journalEntry?: FieldPolicy<any> | FieldReadFunction<any>,
	journalEntryComments?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	locationAccessGrants?: FieldPolicy<any> | FieldReadFunction<any>,
	passwordStrength?: FieldPolicy<any> | FieldReadFunction<any>,
	pensieveMessages?: FieldPolicy<any> | FieldReadFunction<any>,
	resume?: FieldPolicy<any> | FieldReadFunction<any>,
	spotifyCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	testEcho?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	viewer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RemoveGoogleCredentialsPayloadKeySpecifier = ('clientMutationId' | 'success' | RemoveGoogleCredentialsPayloadKeySpecifier)[];
export type RemoveGoogleCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RemoveICloudCredentialsPayloadKeySpecifier = ('clientMutationId' | 'success' | RemoveICloudCredentialsPayloadKeySpecifier)[];
export type RemoveICloudCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RemoveInstagramCredentialsPayloadKeySpecifier = ('clientMutationId' | 'success' | RemoveInstagramCredentialsPayloadKeySpecifier)[];
export type RemoveInstagramCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RemoveSpotifyCredentialsPayloadKeySpecifier = ('clientMutationId' | 'success' | RemoveSpotifyCredentialsPayloadKeySpecifier)[];
export type RemoveSpotifyCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
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
export type SendPensieveMessagePayloadKeySpecifier = ('clientMutationId' | 'success' | 'user' | SendPensieveMessagePayloadKeySpecifier)[];
export type SendPensieveMessagePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SenecaMoodLogKeySpecifier = ('createdAt' | 'id' | 'valence' | SenecaMoodLogKeySpecifier)[];
export type SenecaMoodLogFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	valence?: FieldPolicy<any> | FieldReadFunction<any>
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
export type SubscriptionKeySpecifier = ('activityStatus' | 'currentlyPlaying' | 'location' | 'pensieveMessage' | 'testSubscription' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	activityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	pensieveMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	testSubscription?: FieldPolicy<any> | FieldReadFunction<any>
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
export type TimezoneKeySpecifier = ('abbreviation' | 'name' | 'offset' | 'offsetMinutes' | TimezoneKeySpecifier)[];
export type TimezoneFieldPolicy = {
	abbreviation?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	offset?: FieldPolicy<any> | FieldReadFunction<any>,
	offsetMinutes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnlikePensieveMessagePayloadKeySpecifier = ('clientMutationId' | 'message' | 'success' | UnlikePensieveMessagePayloadKeySpecifier)[];
export type UnlikePensieveMessagePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateICloudCredentialsPayloadKeySpecifier = ('clientMutationId' | 'credentials' | 'errors' | 'success' | UpdateICloudCredentialsPayloadKeySpecifier)[];
export type UpdateICloudCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	credentials?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateInstagramCredentialsPayloadKeySpecifier = ('clientMutationId' | 'credentials' | 'errors' | 'success' | UpdateInstagramCredentialsPayloadKeySpecifier)[];
export type UpdateInstagramCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	credentials?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type UserKeySpecifier = ('avatar' | 'email' | 'id' | 'isOwner' | 'name' | 'unverifiedEmail' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isOwner?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	unverifiedEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VerifyICloudSecurityCodePayloadKeySpecifier = ('clientMutationId' | 'credentials' | 'success' | VerifyICloudSecurityCodePayloadKeySpecifier)[];
export type VerifyICloudSecurityCodePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	credentials?: FieldPolicy<any> | FieldReadFunction<any>,
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
	CreateLocationAccessGrantPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateLocationAccessGrantPayloadKeySpecifier | (() => undefined | CreateLocationAccessGrantPayloadKeySpecifier),
		fields?: CreateLocationAccessGrantPayloadFieldPolicy,
	},
	CreateSenecaMoodLogPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateSenecaMoodLogPayloadKeySpecifier | (() => undefined | CreateSenecaMoodLogPayloadKeySpecifier),
		fields?: CreateSenecaMoodLogPayloadFieldPolicy,
	},
	CurrentlyPlaying?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrentlyPlayingKeySpecifier | (() => undefined | CurrentlyPlayingKeySpecifier),
		fields?: CurrentlyPlayingFieldPolicy,
	},
	DeleteLocationAccessGrantPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteLocationAccessGrantPayloadKeySpecifier | (() => undefined | DeleteLocationAccessGrantPayloadKeySpecifier),
		fields?: DeleteLocationAccessGrantPayloadFieldPolicy,
	},
	ICloudCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ICloudCredentialsKeySpecifier | (() => undefined | ICloudCredentialsKeySpecifier),
		fields?: ICloudCredentialsFieldPolicy,
	},
	Image?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageKeySpecifier | (() => undefined | ImageKeySpecifier),
		fields?: ImageFieldPolicy,
	},
	ImportJournalEntriesPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImportJournalEntriesPayloadKeySpecifier | (() => undefined | ImportJournalEntriesPayloadKeySpecifier),
		fields?: ImportJournalEntriesPayloadFieldPolicy,
	},
	ImportLocationLogsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImportLocationLogsPayloadKeySpecifier | (() => undefined | ImportLocationLogsPayloadKeySpecifier),
		fields?: ImportLocationLogsPayloadFieldPolicy,
	},
	InputFieldError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InputFieldErrorKeySpecifier | (() => undefined | InputFieldErrorKeySpecifier),
		fields?: InputFieldErrorFieldPolicy,
	},
	InstagramCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InstagramCredentialsKeySpecifier | (() => undefined | InstagramCredentialsKeySpecifier),
		fields?: InstagramCredentialsFieldPolicy,
	},
	JournalEntry?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JournalEntryKeySpecifier | (() => undefined | JournalEntryKeySpecifier),
		fields?: JournalEntryFieldPolicy,
	},
	LikePensieveMessagePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LikePensieveMessagePayloadKeySpecifier | (() => undefined | LikePensieveMessagePayloadKeySpecifier),
		fields?: LikePensieveMessagePayloadFieldPolicy,
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
	OAuthCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OAuthCredentialsKeySpecifier | (() => undefined | OAuthCredentialsKeySpecifier),
		fields?: OAuthCredentialsFieldPolicy,
	},
	PensieveMessage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PensieveMessageKeySpecifier | (() => undefined | PensieveMessageKeySpecifier),
		fields?: PensieveMessageFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RemoveGoogleCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RemoveGoogleCredentialsPayloadKeySpecifier | (() => undefined | RemoveGoogleCredentialsPayloadKeySpecifier),
		fields?: RemoveGoogleCredentialsPayloadFieldPolicy,
	},
	RemoveICloudCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RemoveICloudCredentialsPayloadKeySpecifier | (() => undefined | RemoveICloudCredentialsPayloadKeySpecifier),
		fields?: RemoveICloudCredentialsPayloadFieldPolicy,
	},
	RemoveInstagramCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RemoveInstagramCredentialsPayloadKeySpecifier | (() => undefined | RemoveInstagramCredentialsPayloadKeySpecifier),
		fields?: RemoveInstagramCredentialsPayloadFieldPolicy,
	},
	RemoveSpotifyCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RemoveSpotifyCredentialsPayloadKeySpecifier | (() => undefined | RemoveSpotifyCredentialsPayloadKeySpecifier),
		fields?: RemoveSpotifyCredentialsPayloadFieldPolicy,
	},
	RequestUserEmailVerificationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RequestUserEmailVerificationPayloadKeySpecifier | (() => undefined | RequestUserEmailVerificationPayloadKeySpecifier),
		fields?: RequestUserEmailVerificationPayloadFieldPolicy,
	},
	RequestUserPasswordResetPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RequestUserPasswordResetPayloadKeySpecifier | (() => undefined | RequestUserPasswordResetPayloadKeySpecifier),
		fields?: RequestUserPasswordResetPayloadFieldPolicy,
	},
	SendPensieveMessagePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SendPensieveMessagePayloadKeySpecifier | (() => undefined | SendPensieveMessagePayloadKeySpecifier),
		fields?: SendPensieveMessagePayloadFieldPolicy,
	},
	SenecaMoodLog?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SenecaMoodLogKeySpecifier | (() => undefined | SenecaMoodLogKeySpecifier),
		fields?: SenecaMoodLogFieldPolicy,
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
	TestModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestModelKeySpecifier | (() => undefined | TestModelKeySpecifier),
		fields?: TestModelFieldPolicy,
	},
	TestMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestMutationPayloadKeySpecifier | (() => undefined | TestMutationPayloadKeySpecifier),
		fields?: TestMutationPayloadFieldPolicy,
	},
	Timezone?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimezoneKeySpecifier | (() => undefined | TimezoneKeySpecifier),
		fields?: TimezoneFieldPolicy,
	},
	UnlikePensieveMessagePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnlikePensieveMessagePayloadKeySpecifier | (() => undefined | UnlikePensieveMessagePayloadKeySpecifier),
		fields?: UnlikePensieveMessagePayloadFieldPolicy,
	},
	UpdateICloudCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateICloudCredentialsPayloadKeySpecifier | (() => undefined | UpdateICloudCredentialsPayloadKeySpecifier),
		fields?: UpdateICloudCredentialsPayloadFieldPolicy,
	},
	UpdateInstagramCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateInstagramCredentialsPayloadKeySpecifier | (() => undefined | UpdateInstagramCredentialsPayloadKeySpecifier),
		fields?: UpdateInstagramCredentialsPayloadFieldPolicy,
	},
	UpdateUserEmailPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateUserEmailPayloadKeySpecifier | (() => undefined | UpdateUserEmailPayloadKeySpecifier),
		fields?: UpdateUserEmailPayloadFieldPolicy,
	},
	UpdateUserProfilePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateUserProfilePayloadKeySpecifier | (() => undefined | UpdateUserProfilePayloadKeySpecifier),
		fields?: UpdateUserProfilePayloadFieldPolicy,
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