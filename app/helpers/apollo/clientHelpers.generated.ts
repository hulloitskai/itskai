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
export type ImageKeySpecifier = ('id' | 'signedId' | 'url' | ImageKeySpecifier)[];
export type ImageFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	signedId?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImportCookiesPayloadKeySpecifier = ('clientMutationId' | 'success' | ImportCookiesPayloadKeySpecifier)[];
export type ImportCookiesPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImportJournalEntriesPayloadKeySpecifier = ('clientMutationId' | 'success' | ImportJournalEntriesPayloadKeySpecifier)[];
export type ImportJournalEntriesPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImportObsidianNotesPayloadKeySpecifier = ('clientMutationId' | 'success' | ImportObsidianNotesPayloadKeySpecifier)[];
export type ImportObsidianNotesPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type MutationKeySpecifier = ('activateScottkitSignal' | 'addJournalEntryComment' | 'importCookies' | 'importJournalEntries' | 'importObsidianNotes' | 'removeICloudCredentials' | 'removeSpotifyCredentials' | 'requestUserEmailVerification' | 'requestUserPasswordReset' | 'testMutation' | 'updateICloudCredentials' | 'updateUserEmail' | 'updateUserProfile' | 'verifyICloudSecurityCode' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	activateScottkitSignal?: FieldPolicy<any> | FieldReadFunction<any>,
	addJournalEntryComment?: FieldPolicy<any> | FieldReadFunction<any>,
	importCookies?: FieldPolicy<any> | FieldReadFunction<any>,
	importJournalEntries?: FieldPolicy<any> | FieldReadFunction<any>,
	importObsidianNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	removeICloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	removeSpotifyCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	requestUserEmailVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	requestUserPasswordReset?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type QueryKeySpecifier = ('activityStatus' | 'contactEmail' | 'currentlyPlaying' | 'homepageJournalEntry' | 'icloudCredentials' | 'imageBySignedId' | 'journalEntryComments' | 'obsidianNote' | 'obsidianNoteByName' | 'obsidianNotes' | 'passwordStrength' | 'resume' | 'spotifyCredentials' | 'testEcho' | 'timezone' | 'user' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	activityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	contactEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	homepageJournalEntry?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	imageBySignedId?: FieldPolicy<any> | FieldReadFunction<any>,
	journalEntryComments?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNote?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNoteByName?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	passwordStrength?: FieldPolicy<any> | FieldReadFunction<any>,
	resume?: FieldPolicy<any> | FieldReadFunction<any>,
	spotifyCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	testEcho?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type UserKeySpecifier = ('avatar' | 'email' | 'id' | 'isOwner' | 'name' | 'unverifiedEmail' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	avatar?: FieldPolicy<any> | FieldReadFunction<any>,
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
	Image?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageKeySpecifier | (() => undefined | ImageKeySpecifier),
		fields?: ImageFieldPolicy,
	},
	ImportCookiesPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImportCookiesPayloadKeySpecifier | (() => undefined | ImportCookiesPayloadKeySpecifier),
		fields?: ImportCookiesPayloadFieldPolicy,
	},
	ImportJournalEntriesPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImportJournalEntriesPayloadKeySpecifier | (() => undefined | ImportJournalEntriesPayloadKeySpecifier),
		fields?: ImportJournalEntriesPayloadFieldPolicy,
	},
	ImportObsidianNotesPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImportObsidianNotesPayloadKeySpecifier | (() => undefined | ImportObsidianNotesPayloadKeySpecifier),
		fields?: ImportObsidianNotesPayloadFieldPolicy,
	},
	InputFieldError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InputFieldErrorKeySpecifier | (() => undefined | InputFieldErrorKeySpecifier),
		fields?: InputFieldErrorFieldPolicy,
	},
	JournalEntry?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JournalEntryKeySpecifier | (() => undefined | JournalEntryKeySpecifier),
		fields?: JournalEntryFieldPolicy,
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