import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'user' | AccountUpdatePayloadKeySpecifier)[];
export type AccountUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ICloudCredentialsKeySpecifier = ('cookies' | 'email' | 'id' | 'password' | 'session' | 'shortId' | ICloudCredentialsKeySpecifier)[];
export type ICloudCredentialsFieldPolicy = {
	cookies?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	password?: FieldPolicy<any> | FieldReadFunction<any>,
	session?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ICloudCredentialsUpdatePayloadKeySpecifier = ('clientMutationId' | 'errors' | 'icloudCredentials' | ICloudCredentialsUpdatePayloadKeySpecifier)[];
export type ICloudCredentialsUpdatePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ICloudCredentialsVerifySecurityCodePayloadKeySpecifier = ('clientMutationId' | 'icloudCredentials' | ICloudCredentialsVerifySecurityCodePayloadKeySpecifier)[];
export type ICloudCredentialsVerifySecurityCodePayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IdentifiableKeySpecifier = ('id' | 'shortId' | IdentifiableKeySpecifier)[];
export type IdentifiableFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('accountUpdate' | 'icloudCredentialsUpdate' | 'icloudCredentialsVerifySecurityCode' | 'testMutation' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	accountUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentialsUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentialsVerifySecurityCode?: FieldPolicy<any> | FieldReadFunction<any>,
	testMutation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OAuthCredentialsKeySpecifier = ('id' | 'name' | 'refreshToken' | 'shortId' | 'uid' | OAuthCredentialsKeySpecifier)[];
export type OAuthCredentialsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObsidianEntryKeySpecifier = ('createdAt' | 'id' | 'name' | 'referencedBy' | 'shortId' | 'updatedAt' | ObsidianEntryKeySpecifier)[];
export type ObsidianEntryFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	referencedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ObsidianNoteKeySpecifier = ('aliases' | 'blurb' | 'content' | 'createdAt' | 'id' | 'modifiedAt' | 'name' | 'referencedBy' | 'references' | 'shortId' | 'tags' | 'updatedAt' | ObsidianNoteKeySpecifier)[];
export type ObsidianNoteFieldPolicy = {
	aliases?: FieldPolicy<any> | FieldReadFunction<any>,
	blurb?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	modifiedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	referencedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	references?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
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
export type ObsidianStubKeySpecifier = ('createdAt' | 'id' | 'name' | 'referencedBy' | 'shortId' | 'updatedAt' | ObsidianStubKeySpecifier)[];
export type ObsidianStubFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	referencedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('authenticatedViewer' | 'contactEmail' | 'icloudCredentials' | 'obsidianNote' | 'obsidianNoteByName' | 'obsidianNotes' | 'resume' | 'spotifyCredentials' | 'testEcho' | 'timezone' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	authenticatedViewer?: FieldPolicy<any> | FieldReadFunction<any>,
	contactEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	icloudCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNote?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNoteByName?: FieldPolicy<any> | FieldReadFunction<any>,
	obsidianNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	resume?: FieldPolicy<any> | FieldReadFunction<any>,
	spotifyCredentials?: FieldPolicy<any> | FieldReadFunction<any>,
	testEcho?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	viewer?: FieldPolicy<any> | FieldReadFunction<any>
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
export type SubscriptionKeySpecifier = ('currentlyPlaying' | 'testSubscription' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	currentlyPlaying?: FieldPolicy<any> | FieldReadFunction<any>,
	testSubscription?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestModelKeySpecifier = ('birthday' | 'id' | 'name' | TestModelKeySpecifier)[];
export type TestModelFieldPolicy = {
	birthday?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestMutationPayloadKeySpecifier = ('clientMutationId' | 'errors' | 'model' | TestMutationPayloadKeySpecifier)[];
export type TestMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	model?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimezoneKeySpecifier = ('abbreviation' | 'name' | 'offset' | 'offsetMinutes' | TimezoneKeySpecifier)[];
export type TimezoneFieldPolicy = {
	abbreviation?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	offset?: FieldPolicy<any> | FieldReadFunction<any>,
	offsetMinutes?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('email' | 'id' | 'isOwner' | 'name' | 'shortId' | 'unconfirmedEmail' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isOwner?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	shortId?: FieldPolicy<any> | FieldReadFunction<any>,
	unconfirmedEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValidationErrorKeySpecifier = ('field' | 'message' | ValidationErrorKeySpecifier)[];
export type ValidationErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AccountUpdatePayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountUpdatePayloadKeySpecifier | (() => undefined | AccountUpdatePayloadKeySpecifier),
		fields?: AccountUpdatePayloadFieldPolicy,
	},
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
	Identifiable?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentifiableKeySpecifier | (() => undefined | IdentifiableKeySpecifier),
		fields?: IdentifiableFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
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
	ValidationError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValidationErrorKeySpecifier | (() => undefined | ValidationErrorKeySpecifier),
		fields?: ValidationErrorFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;