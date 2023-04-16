import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type ICloudCredentialsKeySpecifier = ('cookies' | 'email' | 'id' | 'password' | 'session' | ICloudCredentialsKeySpecifier)[];
export type ICloudCredentialsFieldPolicy = {
	cookies?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	session?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ICloudCredentialsUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'icloudCredentials' | 'success' | ICloudCredentialsUpdatePayloadKeySpecifier)[];
export type ICloudCredentialsUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ICloudCredentialsVerifySecurityCodePayloadKeySpecifier = ('clientMutationId' | 'icloudCredentials' | 'success' | ICloudCredentialsVerifySecurityCodePayloadKeySpecifier)[];
export type ICloudCredentialsVerifySecurityCodePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InputFieldErrorKeySpecifier = ('field' | 'message' | InputFieldErrorKeySpecifier)[];
export type InputFieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('icloudCredentialsUpdate' | 'icloudCredentialsVerifySecurityCode' | 'obsidianNoteSynchronize' | 'testMutation' | 'userChangeEmail' | 'userSendEmailVerificationInstructions' | 'userSendPasswordResetInstructions' | 'userUpdate' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	icloudCredentialsUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentialsVerifySecurityCode?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNoteSynchronize?: FieldPolicy<any> | FieldReadFunction<any>,
	testMutation?: FieldPolicy<any> | FieldReadFunction<any>,
	userChangeEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	userSendEmailVerificationInstructions?: FieldPolicy<any> | FieldReadFunction<any>,
	userSendPasswordResetInstructions?: FieldPolicy<any> | FieldReadFunction<any>,
	userUpdate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotionPageKeySpecifier = ('blocks' | 'createdAt' | 'id' | 'modifiedAt' | 'title' | NotionPageKeySpecifier)[];
export type NotionPageFieldPolicy = {
	blocks?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	modifiedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotionPageListingKeySpecifier = ('nextCursor' | 'pages' | NotionPageListingKeySpecifier)[];
export type NotionPageListingFieldPolicy = {
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>
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
export type ObsidianNoteSynchronizePayloadKeySpecifier = ('clientMutationId' | 'success' | ObsidianNoteSynchronizePayloadKeySpecifier)[];
export type ObsidianNoteSynchronizePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
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
export type QueryKeySpecifier = ('activityStatus' | 'contactEmail' | 'currentlyPlaying' | 'icloudCredentials' | 'linearCredentials' | 'obsidianNote' | 'obsidianNoteByName' | 'obsidianNotes' | 'passwordStrength' | 'resume' | 'spotifyCredentials' | 'testEcho' | 'timezone' | 'viewer' | 'writings' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	activityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	contactEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	linearCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNote?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNoteByName?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	passwordStrength?: FieldPolicy<any> | FieldReadFunction<any>,
	resume?: FieldPolicy<any> | FieldReadFunction<any>,
	spotifyCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	testEcho?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	viewer?: FieldPolicy<any> | FieldReadFunction<any>,
	writings?: FieldPolicy<any> | FieldReadFunction<any>
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
export type SpotifyTrackKeySpecifier = ('album' | 'artists' | 'id' | 'name' | 'url' | SpotifyTrackKeySpecifier)[];
export type SpotifyTrackFieldPolicy = {
	album?: FieldPolicy<any> | FieldReadFunction<any>,
	artists?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type UserKeySpecifier = ('email' | 'id' | 'isOwner' | 'name' | 'unverifiedEmail' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isOwner?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	unverifiedEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserChangeEmailPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'success' | 'user' | UserChangeEmailPayloadKeySpecifier)[];
export type UserChangeEmailPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserSendEmailVerificationInstructionsPayloadKeySpecifier = ('clientMutationId' | 'success' | UserSendEmailVerificationInstructionsPayloadKeySpecifier)[];
export type UserSendEmailVerificationInstructionsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserSendPasswordResetInstructionsPayloadKeySpecifier = ('clientMutationId' | 'success' | UserSendPasswordResetInstructionsPayloadKeySpecifier)[];
export type UserSendPasswordResetInstructionsPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'success' | 'user' | UserUpdatePayloadKeySpecifier)[];
export type UserUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	ICloudCredentials?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ICloudCredentialsKeySpecifier | (() => undefined | ICloudCredentialsKeySpecifier),
		fields?: ICloudCredentialsFieldPolicy,
	},
	ICloudCredentialsUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ICloudCredentialsUpdatePayloadKeySpecifier | (() => undefined | ICloudCredentialsUpdatePayloadKeySpecifier),
		fields?: ICloudCredentialsUpdatePayloadFieldPolicy,
	},
	ICloudCredentialsVerifySecurityCodePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ICloudCredentialsVerifySecurityCodePayloadKeySpecifier | (() => undefined | ICloudCredentialsVerifySecurityCodePayloadKeySpecifier),
		fields?: ICloudCredentialsVerifySecurityCodePayloadFieldPolicy,
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
	ObsidianNoteSynchronizePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ObsidianNoteSynchronizePayloadKeySpecifier | (() => undefined | ObsidianNoteSynchronizePayloadKeySpecifier),
		fields?: ObsidianNoteSynchronizePayloadFieldPolicy,
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
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserChangeEmailPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserChangeEmailPayloadKeySpecifier | (() => undefined | UserChangeEmailPayloadKeySpecifier),
		fields?: UserChangeEmailPayloadFieldPolicy,
	},
	UserSendEmailVerificationInstructionsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserSendEmailVerificationInstructionsPayloadKeySpecifier | (() => undefined | UserSendEmailVerificationInstructionsPayloadKeySpecifier),
		fields?: UserSendEmailVerificationInstructionsPayloadFieldPolicy,
	},
	UserSendPasswordResetInstructionsPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserSendPasswordResetInstructionsPayloadKeySpecifier | (() => undefined | UserSendPasswordResetInstructionsPayloadKeySpecifier),
		fields?: UserSendPasswordResetInstructionsPayloadFieldPolicy,
	},
	UserUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserUpdatePayloadKeySpecifier | (() => undefined | UserUpdatePayloadKeySpecifier),
		fields?: UserUpdatePayloadFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;