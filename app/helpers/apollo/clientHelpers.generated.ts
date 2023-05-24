import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type ActivateScottkitSignalPayloadKeySpecifier = ('clientMutationId' | 'success' | ActivateScottkitSignalPayloadKeySpecifier)[];
export type ActivateScottkitSignalPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddJournalEntryCommentPayloadKeySpecifier = ('clientMutationId' | 'success' | AddJournalEntryCommentPayloadKeySpecifier)[];
export type AddJournalEntryCommentPayloadFieldPolicy = {
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
export type InputFieldErrorKeySpecifier = ('field' | 'message' | InputFieldErrorKeySpecifier)[];
export type InputFieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('activateScottkitSignal' | 'addJournalEntryComment' | 'removeICloudCredentials' | 'removeSpotifyCredentials' | 'sendUserEmailVerificationInstructions' | 'sendUserPasswordResetInstructions' | 'synchronizeObsidianNotes' | 'testMutation' | 'updateICloudCredentials' | 'updateUserEmail' | 'updateUserProfile' | 'verifyICloudSecurityCode' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	activateScottkitSignal?: FieldPolicy<any> | FieldReadFunction<any>,
	addJournalEntryComment?: FieldPolicy<any> | FieldReadFunction<any>,
	removeICloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	removeSpotifyCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	sendUserEmailVerificationInstructions?: FieldPolicy<any> | FieldReadFunction<any>,
	sendUserPasswordResetInstructions?: FieldPolicy<any> | FieldReadFunction<any>,
	synchronizeObsidianNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	testMutation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateICloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type NotionCommentListingKeySpecifier = ('items' | 'nextCursor' | NotionCommentListingKeySpecifier)[];
export type NotionCommentListingFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotionPageKeySpecifier = ('blocks' | 'createdAt' | 'id' | 'modifiedAt' | 'title' | 'url' | NotionPageKeySpecifier)[];
export type NotionPageFieldPolicy = {
	blocks?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	modifiedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotionPageListingKeySpecifier = ('items' | 'nextCursor' | NotionPageListingKeySpecifier)[];
export type NotionPageListingFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OAuthCredentialsKeySpecifier = ('accessToken' | 'id' | 'name' | 'refreshToken' | 'uid' | OAuthCredentialsKeySpecifier)[];
export type OAuthCredentialsFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObsidianEntryKeySpecifier = ('createdAt' | 'id' | 'name' | 'referencedBy' | 'title' | 'updatedAt' | ObsidianEntryKeySpecifier)[];
export type ObsidianEntryFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	referencedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObsidianNoteKeySpecifier = ('aliases' | 'blurb' | 'content' | 'createdAt' | 'id' | 'isPublished' | 'modifiedAt' | 'name' | 'plainBlurb' | 'referencedBy' | 'references' | 'tags' | 'title' | 'updatedAt' | 'url' | ObsidianNoteKeySpecifier)[];
export type ObsidianNoteFieldPolicy = {
	aliases?: FieldPolicy<any> | FieldReadFunction<any>,
	blurb?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isPublished?: FieldPolicy<any> | FieldReadFunction<any>,
	modifiedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	plainBlurb?: FieldPolicy<any> | FieldReadFunction<any>,
	referencedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	references?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObsidianNoteConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | 'totalCount' | ObsidianNoteConnectionKeySpecifier)[];
export type ObsidianNoteConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObsidianNoteEdgeKeySpecifier = ('cursor' | 'node' | ObsidianNoteEdgeKeySpecifier)[];
export type ObsidianNoteEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObsidianStubKeySpecifier = ('createdAt' | 'id' | 'name' | 'referencedBy' | 'title' | 'updatedAt' | ObsidianStubKeySpecifier)[];
export type ObsidianStubFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	referencedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('activityStatus' | 'contactEmail' | 'currentlyPlaying' | 'icloudCredentials' | 'journalEntries' | 'journalEntryComments' | 'obsidianNote' | 'obsidianNoteByName' | 'obsidianNotes' | 'passwordStrength' | 'resume' | 'spotifyCredentials' | 'testEcho' | 'timezone' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	activityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	contactEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	journalEntries?: FieldPolicy<any> | FieldReadFunction<any>,
	journalEntryComments?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNote?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNoteByName?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	passwordStrength?: FieldPolicy<any> | FieldReadFunction<any>,
	resume?: FieldPolicy<any> | FieldReadFunction<any>,
	spotifyCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	testEcho?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	viewer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RemoveICloudCredentialsPayloadKeySpecifier = ('clientMutationId' | 'success' | RemoveICloudCredentialsPayloadKeySpecifier)[];
export type RemoveICloudCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RemoveSpotifyCredentialsPayloadKeySpecifier = ('clientMutationId' | 'success' | RemoveSpotifyCredentialsPayloadKeySpecifier)[];
export type RemoveSpotifyCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SendUserEmailVerificationInstructionsPayloadKeySpecifier = ('clientMutationId' | 'success' | SendUserEmailVerificationInstructionsPayloadKeySpecifier)[];
export type SendUserEmailVerificationInstructionsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SendUserPasswordResetInstructionsPayloadKeySpecifier = ('clientMutationId' | 'success' | SendUserPasswordResetInstructionsPayloadKeySpecifier)[];
export type SendUserPasswordResetInstructionsPayloadFieldPolicy = {
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
export type SpotifyCurrentlyPlayingKeySpecifier = ('progressMilliseconds' | 'track' | SpotifyCurrentlyPlayingKeySpecifier)[];
export type SpotifyCurrentlyPlayingFieldPolicy = {
	progressMilliseconds?: FieldPolicy<any> | FieldReadFunction<any>,
	track?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpotifyLyricLineKeySpecifier = ('isExplicit' | 'startTimeMilliseconds' | 'words' | SpotifyLyricLineKeySpecifier)[];
export type SpotifyLyricLineFieldPolicy = {
	isExplicit?: FieldPolicy<any> | FieldReadFunction<any>,
	startTimeMilliseconds?: FieldPolicy<any> | FieldReadFunction<any>,
	words?: FieldPolicy<any> | FieldReadFunction<any>
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
export type SubscriptionKeySpecifier = ('activityStatus' | 'currentlyPlaying' | 'testSubscription' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	activityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	testSubscription?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SynchronizeObsidianNotesPayloadKeySpecifier = ('clientMutationId' | 'success' | SynchronizeObsidianNotesPayloadKeySpecifier)[];
export type SynchronizeObsidianNotesPayloadFieldPolicy = {
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
export type TimezoneKeySpecifier = ('abbreviation' | 'name' | 'offset' | 'offsetMinutes' | TimezoneKeySpecifier)[];
export type TimezoneFieldPolicy = {
	abbreviation?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	offset?: FieldPolicy<any> | FieldReadFunction<any>,
	offsetMinutes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateICloudCredentialsPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'icloudCredentials' | 'success' | UpdateICloudCredentialsPayloadKeySpecifier)[];
export type UpdateICloudCredentialsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type UserKeySpecifier = ('email' | 'id' | 'isOwner' | 'name' | 'unverifiedEmail' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isOwner?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	unverifiedEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VerifyICloudSecurityCodePayloadKeySpecifier = ('clientMutationId' | 'icloudCredentials' | 'success' | VerifyICloudSecurityCodePayloadKeySpecifier)[];
export type VerifyICloudSecurityCodePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
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
	ICloudCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ICloudCredentialsKeySpecifier | (() => undefined | ICloudCredentialsKeySpecifier),
		fields?: ICloudCredentialsFieldPolicy,
	},
	InputFieldError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InputFieldErrorKeySpecifier | (() => undefined | InputFieldErrorKeySpecifier),
		fields?: InputFieldErrorFieldPolicy,
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
	NotionCommentListing?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotionCommentListingKeySpecifier | (() => undefined | NotionCommentListingKeySpecifier),
		fields?: NotionCommentListingFieldPolicy,
	},
	NotionPage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotionPageKeySpecifier | (() => undefined | NotionPageKeySpecifier),
		fields?: NotionPageFieldPolicy,
	},
	NotionPageListing?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotionPageListingKeySpecifier | (() => undefined | NotionPageListingKeySpecifier),
		fields?: NotionPageListingFieldPolicy,
	},
	OAuthCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OAuthCredentialsKeySpecifier | (() => undefined | OAuthCredentialsKeySpecifier),
		fields?: OAuthCredentialsFieldPolicy,
	},
	ObsidianEntry?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ObsidianEntryKeySpecifier | (() => undefined | ObsidianEntryKeySpecifier),
		fields?: ObsidianEntryFieldPolicy,
	},
	ObsidianNote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ObsidianNoteKeySpecifier | (() => undefined | ObsidianNoteKeySpecifier),
		fields?: ObsidianNoteFieldPolicy,
	},
	ObsidianNoteConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ObsidianNoteConnectionKeySpecifier | (() => undefined | ObsidianNoteConnectionKeySpecifier),
		fields?: ObsidianNoteConnectionFieldPolicy,
	},
	ObsidianNoteEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ObsidianNoteEdgeKeySpecifier | (() => undefined | ObsidianNoteEdgeKeySpecifier),
		fields?: ObsidianNoteEdgeFieldPolicy,
	},
	ObsidianStub?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ObsidianStubKeySpecifier | (() => undefined | ObsidianStubKeySpecifier),
		fields?: ObsidianStubFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RemoveICloudCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RemoveICloudCredentialsPayloadKeySpecifier | (() => undefined | RemoveICloudCredentialsPayloadKeySpecifier),
		fields?: RemoveICloudCredentialsPayloadFieldPolicy,
	},
	RemoveSpotifyCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RemoveSpotifyCredentialsPayloadKeySpecifier | (() => undefined | RemoveSpotifyCredentialsPayloadKeySpecifier),
		fields?: RemoveSpotifyCredentialsPayloadFieldPolicy,
	},
	SendUserEmailVerificationInstructionsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SendUserEmailVerificationInstructionsPayloadKeySpecifier | (() => undefined | SendUserEmailVerificationInstructionsPayloadKeySpecifier),
		fields?: SendUserEmailVerificationInstructionsPayloadFieldPolicy,
	},
	SendUserPasswordResetInstructionsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SendUserPasswordResetInstructionsPayloadKeySpecifier | (() => undefined | SendUserPasswordResetInstructionsPayloadKeySpecifier),
		fields?: SendUserPasswordResetInstructionsPayloadFieldPolicy,
	},
	SpotifyAlbum?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotifyAlbumKeySpecifier | (() => undefined | SpotifyAlbumKeySpecifier),
		fields?: SpotifyAlbumFieldPolicy,
	},
	SpotifyArtist?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotifyArtistKeySpecifier | (() => undefined | SpotifyArtistKeySpecifier),
		fields?: SpotifyArtistFieldPolicy,
	},
	SpotifyCurrentlyPlaying?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotifyCurrentlyPlayingKeySpecifier | (() => undefined | SpotifyCurrentlyPlayingKeySpecifier),
		fields?: SpotifyCurrentlyPlayingFieldPolicy,
	},
	SpotifyLyricLine?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotifyLyricLineKeySpecifier | (() => undefined | SpotifyLyricLineKeySpecifier),
		fields?: SpotifyLyricLineFieldPolicy,
	},
	SpotifyTrack?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotifyTrackKeySpecifier | (() => undefined | SpotifyTrackKeySpecifier),
		fields?: SpotifyTrackFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	SynchronizeObsidianNotesPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SynchronizeObsidianNotesPayloadKeySpecifier | (() => undefined | SynchronizeObsidianNotesPayloadKeySpecifier),
		fields?: SynchronizeObsidianNotesPayloadFieldPolicy,
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
	UpdateICloudCredentialsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateICloudCredentialsPayloadKeySpecifier | (() => undefined | UpdateICloudCredentialsPayloadKeySpecifier),
		fields?: UpdateICloudCredentialsPayloadFieldPolicy,
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