export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Ethereum address */
  Address: any;
  /** A string that cannot be passed as an empty value */
  CountryCode: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** Ethereum name service value with `.eth` suffix */
  ENS: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** A valid Ethereum transaction hash string */
  TransactionHash: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** UUID v4 */
  UUID: any;
  /** Represents NULL values */
  Void: any;
};

/** AWS Presigned upload */
export type AwsPresignedPost = {
  __typename?: 'AWSPresignedPost';
  /** JSON Fields associated with upload */
  fields: Scalars['JSON'];
  /** Upload key of authenticated user */
  uploadKey: Scalars['String'];
  /** Target URL for upload process */
  url: Scalars['String'];
};

/** Multi-part upload aborted information. */
export type AbortMultipartUploadOutput = {
  __typename?: 'AbortMultipartUploadOutput';
  /** Aborted upload ID */
  uploadId: Scalars['String'];
  /** Aborted upload key */
  uploadKey: Scalars['String'];
};

/** Mark the provided multi-part upload as aborted */
export type AbortMultipartUploadRequest = {
  /** Upload ID to use for each upload part of the final object */
  uploadId: Scalars['String'];
  /** Upload key for the final upload object */
  uploadKey: Scalars['String'];
};

/** Activity Feed entity */
export type ActivityFeed = {
  __typename?: 'ActivityFeed';
  /** Paginated activity feed groups of activity feed. */
  activityFeedGroups: ActivityFeedGroupConnection;
  /** Activity feed UUID */
  id: Scalars['ID'];
};


/** Activity Feed entity */
export type ActivityFeedActivityFeedGroupsArgs = {
  filter?: ActivityFeedGroupFilterArgs;
  pagination?: CursorConnectionArgs;
};

/** Filter activity feed */
export type ActivityFeedFilterArgs = {
  /** Only get activity feed of certain type */
  activityFeedType?: ActivityFeedType;
};

/** Activity Feed Group entity */
export type ActivityFeedGroup = Node & {
  __typename?: 'ActivityFeedGroup';
  /** Activity feed group UUID */
  id: Scalars['ID'];
  /** Activity feed group info */
  information: ActivityFeedGroupInfo;
  /** Activity feed group timestamp of most recent activity occurrence */
  latestActivityOccurenceAt: Scalars['Timestamp'];
  /** Activity feed group ranking score */
  rankingScore: Scalars['Int'];
};

/** Activity feed group collected release entity */
export type ActivityFeedGroupCollectedRelease = {
  __typename?: 'ActivityFeedGroupCollectedRelease';
  /** Amount paid in Wei for all purchases of a single release within activity feed group */
  amountPaidInWei: Scalars['String'];
  /** Returns whether user has purchased the golden egg within the activity feed group */
  hasGoldenEgg: Scalars['Boolean'];
  /** Most recent user that release was purchased from */
  mostRecentPurchasedFromUser: User;
  /** Release corresponding to activity feed group collected release entity */
  release: Release;
  /** Release backers that are prioritized based on following status */
  releaseSocialProof: ActivityFeedReleaseSocialProof;
  /** Amount of nfts of a single release within activity feed group */
  totalOwnedEditions: Scalars['Int'];
  /** Total number of unique users that release was purchased from */
  totalUsersPurchasedFrom: Scalars['Int'];
};

/** Activity feed group component type */
export enum ActivityFeedGroupComponentType {
  ReleasesAddedToShelf = 'RELEASES_ADDED_TO_SHELF',
  ReleaseDropped = 'RELEASE_DROPPED',
  ShelfCreated = 'SHELF_CREATED',
  SongCollectedByMany = 'SONG_COLLECTED_BY_MANY',
  UserCollectedManySongs = 'USER_COLLECTED_MANY_SONGS',
  UserLikedPlaylist = 'USER_LIKED_PLAYLIST',
  UserLikedSongs = 'USER_LIKED_SONGS',
  UserPurchasedSecondaryManySongs = 'USER_PURCHASED_SECONDARY_MANY_SONGS'
}

/** Paginated activity feed group connection */
export type ActivityFeedGroupConnection = Connection & {
  __typename?: 'ActivityFeedGroupConnection';
  /** Edges of current page */
  edges: Array<ActivityFeedGroupConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Activity Feed Group Connection */
export type ActivityFeedGroupConnectionEdge = Edge & {
  __typename?: 'ActivityFeedGroupConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Activity Feed Group node */
  node: ActivityFeedGroup;
};

/** Activity feed group featured collector entity */
export type ActivityFeedGroupFeaturedCollector = {
  __typename?: 'ActivityFeedGroupFeaturedCollector';
  /** Amount paid in Wei for most recent purchase action in activity feed group by collector */
  amountPaidInWei: Scalars['String'];
  /** User corresponding to activity feed group featured collector entity */
  user: User;
};

/** Filter activity feed groups */
export type ActivityFeedGroupFilterArgs = {
  /** Only get activity feed groups of certain type */
  types?: Array<ActivityFeedGroupFilterOption>;
};

/** Activity feed group filter option */
export enum ActivityFeedGroupFilterOption {
  AddedToPlaylist = 'ADDED_TO_PLAYLIST',
  All = 'ALL',
  Collected = 'COLLECTED',
  Likes = 'LIKES',
  ReleaseDropped = 'RELEASE_DROPPED'
}

/** Union of activity feed group info */
export type ActivityFeedGroupInfo = ReleaseDroppedAggregate | ReleasesAddedToShelfAggregate | ShelfCreatedAggregate | SongCollectedByManyAggregate | UserCollectedManySongsAggregate | UserLikedPlaylistAggregate | UserLikedSongsAggregate;

/** Social proof of release in activity feed based on user authentication */
export type ActivityFeedReleaseSocialProof = {
  __typename?: 'ActivityFeedReleaseSocialProof';
  /** Release backers that are prioritized based on following status */
  socialProofCollectors: Array<User>;
};

/** Activity feed type */
export enum ActivityFeedType {
  Global = 'GLOBAL',
  User = 'USER'
}

/** Input for `addReleaseToShelf` mutation */
export type AddReleaseToShelfInput = {
  /** Specify index to insert the release within the shelf */
  index?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Release identifier to be added */
  releaseId: Scalars['UUID'];
  /** Identifier of owned target shelf to receive the new release */
  shelfId: Scalars['UUID'];
};

/** Input for addUsersToDraftAllowlist mutation */
export type AddUsersToDraftAllowlistInput = {
  /** Draft info input */
  addresses: Array<AllowedAddressInput>;
  /** Draft identifier */
  draftId: Scalars['UUID'];
  /** Draft allowlist sale type */
  mintType: MintingAccessConfigMintingType;
};

/** Output entity of AddUsersToDraftAllowlist mutation */
export type AddUsersToDraftAllowlistOutput = {
  __typename?: 'AddUsersToDraftAllowlistOutput';
  /** Allowlist entity */
  allowList: AllowList;
  /** Soft error messages of mutation */
  softErrorMessages?: Maybe<Array<Scalars['String']>>;
};

/** Input for setAffiliatePurchaseSource mutation */
export type AffiliateSourceInput = {
  /** Param value of referral source */
  referralSource: Scalars['String'];
  /** Transaction hash associated with affiliate purchase */
  txHash: Scalars['TransactionHash'];
};

/** Collector release added to playlist action entity */
export type Airdrop = CollectorAction & Node & ReleaseAction & {
  __typename?: 'Airdrop';
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Release corresponding to collector airdrop action entity */
  release: Release;
  /** Serial number of nft airdrop */
  serialNumber: Scalars['Int'];
  /** User corresponding to collector action entity */
  user: User;
};

/** Pagination parameters for allCollectors */
export type AllCollectorsCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: AllCollectorsCursorConnectionSort;
};

/** Customize sort of collectors */
export type AllCollectorsCursorConnectionSort = {
  /** Sort by date of user first being connected in platform */
  createdAt?: InputMaybe<SortOrder>;
};

/** Filter the allCollectors result */
export type AllCollectorsFilter = {
  /** Should it include artists as collectors */
  includeArtists?: Scalars['Boolean'];
  /** Should it only include collectors with a valid username (twitterHandle, ens or displayName) */
  onlyWithUsername?: Scalars['Boolean'];
};

/** Input for allCollectors query */
export type AllCollectorsInput = {
  /** Filter the collectors */
  filter?: AllCollectorsFilter;
  /** Pagination parameters of collectors */
  pagination?: AllCollectorsCursorConnectionArgs;
};

/** Pagination parameters for allShelves */
export type AllShelvesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: AllShelvesCursorConnectionSort;
};

/** Customize sort of shelves */
export type AllShelvesCursorConnectionSort = {
  /** Sort by date of playlist being created */
  createdAt?: InputMaybe<SortOrder>;
};

/** Filter the shelves of allShelves query */
export type AllShelvesFilter = {
  /** Filter the shelves based on the expected types */
  type?: Array<ShelfTypeFilter>;
};

/** Input for allShelves query */
export type AllShelvesInput = {
  /** Filter the shelves, by default it gives all the user created shelves */
  filter?: AllShelvesFilter;
  /** Pagination parameters, by default it gives the last 10 shelves created */
  pagination?: AllShelvesCursorConnectionArgs;
};

/** Withdrawable contract earnings, returns null for values if contract contain dust amounts that are not worth withdrawing */
export type AllWithdrawableEarnings = {
  __typename?: 'AllWithdrawableEarnings';
  /** Artist contract earnings */
  artistContracts: Array<ArtistContractEarning>;
  /** Edition contract earnings */
  editionContracts: Array<EditionContractEarning>;
  /** Split contract earnings */
  splitContracts: Array<SplitsContractEarning>;
};

/** Allocation input for credit split creation */
export type Allocation = {
  /** Owner address of allocation */
  ownerAddress: Scalars['Address'];
  /** Percent of allocation */
  percent: Scalars['Float'];
  /** Roles associated with credit allocation */
  roles: Array<Scalars['String']>;
};

/** Allowlist entity */
export type AllowList = Node & {
  __typename?: 'AllowList';
  /** Allowlist creation date */
  createdAt: Scalars['DateTime'];
  /** Allowlist identifier */
  id: Scalars['ID'];
  /** Total number of users in allowlist */
  totalUsers: Scalars['Int'];
  /** Paginate through all users of the allowlist */
  users: UserConnection;
};


/** Allowlist entity */
export type AllowListUsersArgs = {
  pagination?: UserCursorConnectionArgs;
};

/** Address added in allowlist */
export type AllowedAddress = {
  __typename?: 'AllowedAddress';
  /** Public address included in allowlist */
  address: Scalars['String'];
  /** Source of the address added in allowlist */
  source: AllowlistSourceType;
};

/** Address to be added in allowlist */
export type AllowedAddressInput = {
  /** Public address included in allowlist */
  address: Scalars['Address'];
  /** Source of the address added in allowlist */
  source: AllowlistSourceType;
};

/** Source of allowlist address */
export enum AllowlistSourceType {
  ArtistSoundHolder = 'ARTIST_SOUND_HOLDER',
  Manual = 'MANUAL',
  Unknown = 'UNKNOWN'
}

/** Allow list types */
export enum AllowlistType {
  ArtistCollectors = 'ARTIST_COLLECTORS',
  ManuallyAdded = 'MANUALLY_ADDED',
  ReleaseCollectors = 'RELEASE_COLLECTORS'
}

/** Returned when the user attempts to update a release that was already minted */
export type AlreadyMintedError = Error & {
  __typename?: 'AlreadyMintedError';
  /** Descriptive message of error */
  message: Scalars['String'];
};

/** Possible options of role update input */
export enum AlterRole {
  /** Administrator of platform */
  Admin = 'ADMIN',
  /** Member of artist relations team */
  ArtistRelations = 'ARTIST_RELATIONS'
}

/** Artist Entity */
export type Artist = Node & {
  __typename?: 'Artist';
  /** Banner image of artist page */
  bannerImage?: Maybe<Media>;
  /** Collectors of artist. */
  collectors: ArtistCollectorConnection;
  /** Creation date of artist entity */
  createdAt: Scalars['DateTime'];
  /** Gem Collection URL */
  gemCollectionUrl?: Maybe<Scalars['String']>;
  /** Artist identifier */
  id: Scalars['ID'];
  /**
   * Paginated minted releases of artist.
   * @deprecated Please use Artist.releases
   */
  mintedReleasesPaginated: ReleaseConnection;
  /** Name of artist */
  name?: Maybe<Scalars['String']>;
  /** Number of unique nft collectors of artist */
  numCollectors: Scalars['Int'];
  /**
   * How many minted releases for artist
   * @deprecated Please use Artist.numReleases
   */
  numMintedReleases: Scalars['Int'];
  /** Number of artist releases */
  numReleases: Scalars['Int'];
  /**
   * [DEPRECATED] Use Release.openseaUrl instead
   * @deprecated Use Release.openseaUrl instead
   */
  openseaCollectionUrl?: Maybe<Scalars['String']>;
  /** Paginated releases of artist. */
  releases: ReleaseConnection;
  /** Genres of artist releases, with the most common genres first */
  releasesGenres: Array<Scalars['String']>;
  /** Season associated with artist */
  season?: Maybe<Scalars['String']>;
  /** Sound handle to be used on URLs */
  soundHandle?: Maybe<Scalars['String']>;
  /** Spotify URL */
  spotifyUrl?: Maybe<Scalars['String']>;
  /**
   * Collectors of artist.
   * @deprecated Please use Artist.collectors
   */
  tokenCollectors: ArtistCollectorConnection;
  /** Token symbol of contract */
  tokenSymbol?: Maybe<Scalars['String']>;
  /** User entity of artist */
  user: User;
  /** User identifier of artist */
  userId: Scalars['String'];
  /** Webapp URI of Artist */
  webappUri: Scalars['String'];
};


/** Artist Entity */
export type ArtistCollectorsArgs = {
  pagination?: ArtistCollectorCursorConnectionArgs;
};


/** Artist Entity */
export type ArtistMintedReleasesPaginatedArgs = {
  filter?: ArtistMintedReleasesFilter;
  pagination?: CursorConnectionArgs;
};


/** Artist Entity */
export type ArtistNumMintedReleasesArgs = {
  filter?: ArtistMintedReleasesFilter;
};


/** Artist Entity */
export type ArtistNumReleasesArgs = {
  filter?: ArtistReleasesFilter;
};


/** Artist Entity */
export type ArtistReleasesArgs = {
  filter?: ArtistReleasesFilter;
  pagination?: CursorConnectionArgs;
};


/** Artist Entity */
export type ArtistTokenCollectorsArgs = {
  pagination?: ArtistCollectorCursorConnectionArgs;
};

/** Artist action entity */
export type ArtistAction = {
  /** Date of action */
  date: Scalars['DateTime'];
  /** Artist action id */
  id: Scalars['ID'];
  /** User corresponding to action entity */
  user: User;
};

/** Paginated artist action connection */
export type ArtistActionConnection = Connection & {
  __typename?: 'ArtistActionConnection';
  /** Edges of current page */
  edges: Array<ArtistActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of artist action connection */
export type ArtistActionConnectionEdge = Edge & {
  __typename?: 'ArtistActionConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** artist action node */
  node: ArtistAction;
};

/** Artist activity feed action type filter option */
export enum ArtistActivityFeedActivityTypeFilterOption {
  All = 'ALL',
  Collections = 'COLLECTIONS',
  Likes = 'LIKES',
  Playlists = 'PLAYLISTS',
  Releases = 'RELEASES'
}

/** Filter artist activity types */
export type ArtistActivityFeedFilterArgs = {
  /** Only get activity of given action type */
  activityTypes?: Array<ArtistActivityFeedActivityTypeFilterOption>;
  /** Only get activity by the given group */
  types?: Array<ArtistActivityFeedTypeFilterOption>;
};

/** Artist activity feed type filter option */
export enum ArtistActivityFeedTypeFilterOption {
  All = 'ALL',
  Artist = 'ARTIST',
  Collector = 'COLLECTOR',
  Release = 'RELEASE'
}

/** Data for Artist minting auction process */
export type ArtistAuctionOverrides = {
  __typename?: 'ArtistAuctionOverrides';
  /** Artist user wallet public address associated to auction options */
  artistAddress: Scalars['String'];
  /** Date of creation of options */
  createdAt: Scalars['DateTime'];
  /** Identifier of options entity */
  id: Scalars['ID'];
};

/** ArtistCollector */
export type ArtistCollector = Node & {
  __typename?: 'ArtistCollector';
  /** Artist entity */
  artist: Artist;
  /**
   * Amount of artist nfts owned
   * @deprecated Use 'nftsCount' instead
   */
  artistNftsOwned: Scalars['Int'];
  /** First artist nft collected by user */
  firstNftCollected: Nft;
  /** Date of first nft collected */
  firstNftCollectedDate: Scalars['DateTime'];
  /** Unique id of artist collector */
  id: Scalars['ID'];
  /** Amount of artist nfts owned */
  nftsCount: Scalars['Int'];
  /** Collector user */
  user: User;
};

/** Paginated connection of Artist Collectors */
export type ArtistCollectorConnection = Connection & {
  __typename?: 'ArtistCollectorConnection';
  /** Edges of current page */
  edges: Array<ArtistCollectorConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Artist Collector Connection */
export type ArtistCollectorConnectionEdge = Edge & {
  __typename?: 'ArtistCollectorConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** ArtistCollector node */
  node: ArtistCollector;
};

/** Pagination paramaters for artist collectors */
export type ArtistCollectorCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: ArtistCollectorCursorConnectionSort;
};

/** Customize sort of collectors */
export type ArtistCollectorCursorConnectionSort = {
  /** Sort by first nft collected date */
  firstNftCollectedDate?: InputMaybe<SortOrder>;
  /** Sort by amount nfts collected, with tie-breaker of earliest collector first */
  nftsCount?: InputMaybe<SortOrder>;
};

/** Info associated with artist draft allowlist */
export type ArtistCollectorsAllowlist = {
  __typename?: 'ArtistCollectorsAllowlist';
  /** Flag to include or not include all collaborating artists of the release */
  allCollaboratingArtists: Scalars['Boolean'];
  /** Paginated artists of draftAllowlist */
  artists: ArtistConnection;
  /** Paginated artists of draftAllowlist taking into account collaborating artists flag */
  filteredArtists: ArtistConnection;
  /** Total number of artist collector users in draft allowlist */
  totalCollectors: Scalars['Int'];
};

/** Paginated connection of Artists */
export type ArtistConnection = Connection & {
  __typename?: 'ArtistConnection';
  /** Edges of current page */
  edges: Array<ArtistConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Artist Connection */
export type ArtistConnectionEdge = Edge & {
  __typename?: 'ArtistConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Artist node */
  node: Artist;
};

/** Artist contract earnings */
export type ArtistContractEarning = {
  __typename?: 'ArtistContractEarning';
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String'];
  /** Address of the artist contract */
  contractAddress: Scalars['String'];
  /** Edition id for the release */
  editionId: Scalars['String'];
  /** Total eth on the contract */
  totalBalance: Scalars['String'];
};

/** Filter for paginated artists */
export type ArtistCursorFilterArgs = {
  /** Specify whether artist already has at least one minted release */
  hasMintedRelease?: InputMaybe<Scalars['Boolean']>;
  /** Specify season to be filtered */
  season?: InputMaybe<ArtistSeason>;
};

/** Default reference artist minting release options for administration */
export type ArtistDefaultOptions = {
  __typename?: 'ArtistDefaultOptions';
  /** Auction options union based on type */
  auction: Array<Auction>;
};

/** Input for artistDrafts query */
export type ArtistDraftsInput = {
  /** Cursor connection parameters */
  pagination?: DraftCursorConnectionArgs;
};

/** Simplified version of Artist entity */
export type ArtistInfo = Node & {
  __typename?: 'ArtistInfo';
  /** Artist user avatar */
  avatar?: Maybe<Media>;
  /** Unique identifier of Artist */
  id: Scalars['ID'];
  /** Name of artist */
  name?: Maybe<Scalars['String']>;
  /** Artist public address */
  publicAddress?: Maybe<Scalars['String']>;
};

/** Artist meta configuration input */
export type ArtistMetaInput = {
  /** Gem Collection URL */
  gemCollectionUrl?: InputMaybe<Scalars['URL']>;
};

/** Artist minted releases author filter option */
export enum ArtistMintedReleasesAuthorFilterOption {
  All = 'ALL',
  OnlyAppearsOn = 'ONLY_APPEARS_ON',
  OnlyAuthoredReleases = 'ONLY_AUTHORED_RELEASES'
}

/** Artist minted releases credit split filter option */
export enum ArtistMintedReleasesCreditSplitFilterOption {
  All = 'ALL',
  OnlyCreditSplits = 'ONLY_CREDIT_SPLITS',
  OnlyNoCreditSplits = 'ONLY_NO_CREDIT_SPLITS'
}

/** Filter for artist minted releases. Default is only for artist sounds. */
export type ArtistMintedReleasesFilter = {
  /** Filters on release credit split status */
  creditSplit?: ArtistMintedReleasesCreditSplitFilterOption;
  /** Excludes specific releaseIds */
  excludeReleaseIds?: Array<Scalars['UUID']>;
  /** Filters on release with specified mint time status */
  mintTimeStatus?: Array<MintTimeStatus>;
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption;
  /** Filters on release author status */
  releaseAuthor?: ArtistMintedReleasesAuthorFilterOption;
  /** Filters on release type */
  releaseType?: Array<ReleaseType>;
};

/** Artist minting release options */
export type ArtistReleaseOptions = {
  __typename?: 'ArtistReleaseOptions';
  /** Auction options union based on type */
  auction: Array<Auction>;
  /** Artist has no time restriction for minting */
  hasNoTimeRestriction: Scalars['Boolean'];
  /** Does the artist have access to splits functionality */
  hasSplitsAccess: Scalars['Boolean'];
};

/** Artist releases author filter option */
export enum ArtistReleasesAuthorFilterOption {
  All = 'ALL',
  OnlyAppearsOn = 'ONLY_APPEARS_ON',
  OnlyAuthoredReleases = 'ONLY_AUTHORED_RELEASES'
}

/** Artist releases credit split filter option */
export enum ArtistReleasesCreditSplitFilterOption {
  All = 'ALL',
  OnlyCreditSplits = 'ONLY_CREDIT_SPLITS',
  OnlyNoCreditSplits = 'ONLY_NO_CREDIT_SPLITS'
}

/** Filter for artist releases. Default is only for artist sounds. */
export type ArtistReleasesFilter = {
  /** Filters on release credit split status */
  creditSplit?: ArtistReleasesCreditSplitFilterOption;
  /** Excludes specific releaseIds */
  excludeReleaseIds?: Array<Scalars['UUID']>;
  /** Filters on release with specified mint time status */
  mintTimeStatus?: Array<MintTimeStatus>;
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption;
  /** Filters on release author status */
  releaseAuthor?: ArtistReleasesAuthorFilterOption;
  /** Filters on release type */
  releaseType?: Array<ReleaseType>;
};

/** Types of seasons for artists */
export enum ArtistSeason {
  Genesis = 'GENESIS',
  SeasonFour = 'SEASON_FOUR',
  SeasonOne = 'SEASON_ONE',
  SeasonThree = 'SEASON_THREE',
  SeasonTwo = 'SEASON_TWO'
}

/** Union of auction sale types */
export type Auction = FixedAuction | OpenEditionAuction | RangeBoundAuction;

/** Draft auction configuration input values */
export type AuctionConfigurationInput = {
  /** Auction end time in days */
  endTimeDays?: InputMaybe<Scalars['Int']>;
  /** Max mints per wallet for auction */
  maxMintsPerWallet: Scalars['PositiveInt'];
  /** Price per mint */
  price: Scalars['NonNegativeFloat'];
  /** Max supply for auction */
  quantity: Scalars['PositiveInt'];
  /** Auction start time */
  startTime: Scalars['Timestamp'];
};

/** Draft auction configurations input values */
export type AuctionConfigurationsInput = {
  /** Type of auction */
  auctionType: AuctionType;
  /** Free mint auction configurations */
  freeMint?: InputMaybe<AuctionConfigurationInput>;
  /** Max mint supply of auction */
  maxMintable: Scalars['PositiveInt'];
  /** Min mint supply of auction */
  minQuantity: Scalars['PositiveInt'];
  /** Presale mint auction configurations */
  presaleMint?: InputMaybe<AuctionConfigurationInput>;
  /** Public mint auction configurations */
  publicMint: AuctionConfigurationInput;
  /** Breakdown of mint quantities */
  quantityBreakdown?: InputMaybe<Array<Scalars['PositiveInt']>>;
};

/** Customize auction options based on type of sale */
export type AuctionInputRef = {
  /** fixed sales */
  fixed?: InputMaybe<FixedAuctionInput>;
  /** open editions */
  openEdition?: InputMaybe<OpenEditionAuctionInput>;
  /** Range bound sales */
  rangeBound?: InputMaybe<RangeBoundAuctionInput>;
};

/** Special meta options relation to auction */
export type AuctionMetaInput = {
  /** Allow split functionality */
  hasSplitsAccess: Scalars['Boolean'];
};

/** Types of release sales */
export enum AuctionType {
  FixedQuantity = 'FIXED_QUANTITY',
  OpenEdition = 'OPEN_EDITION',
  RangeBound = 'RANGE_BOUND'
}

/** Returned when the user attempts to access a resource they are not authorized for */
export type AuthorizationError = Error & IError & {
  __typename?: 'AuthorizationError';
  /** Descriptive message of error */
  message: Scalars['String'];
};

/** Returned when an error or unexpected response is received from AWS */
export type AwsRequestError = Error & {
  __typename?: 'AwsRequestError';
  /** Human-readable description of the error */
  message: Scalars['String'];
  /** AWS Request ID for debugging */
  requestId: Scalars['String'];
};

/** Base error to be divided into specific issues */
export type BaseError = Error & {
  __typename?: 'BaseError';
  code?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

/** Input for selectSongSlotUsingChainData mutation */
export type ChainDataSongSlotSelection = {
  /** Amount paid in Wei */
  amountPaidInWei: Scalars['String'];
  /** Block number of NFT */
  blockNumber: Scalars['Int'];
  /** Contract address of release */
  contractAddress: Scalars['Address'];
  /** Chosen song slot */
  songSlot: Scalars['Int'];
  /** Chain token identifier */
  tokenId: Scalars['String'];
};

/** Input of "changeRoleForUser" mutation */
export type ChangeRoleInput = {
  /** Wallet public address of user */
  publicAddress: Scalars['Address'];
  /** Role to be set for specified user */
  role: AlterRole;
  /** Set if specified role is going to be enabled or disabled */
  value: Scalars['Boolean'];
};

/** Simplified version of Release entity filtered on the owner public address */
export type CollectedRelease = Node & {
  __typename?: 'CollectedRelease';
  /** First backed nft of collected release */
  firstNftOwned?: Maybe<Nft>;
  /** Returns golden egg if user owns, otherwise null */
  goldenEgg?: Maybe<EggGame>;
  /** Unique identifier of release */
  id: Scalars['ID'];
  /** List of owned nft serial numbers in ascending serial number order */
  ownedSerialNumbers: Array<Scalars['Int']>;
  /** Release entity */
  release: Release;
};

/** Paginated collected releases connection */
export type CollectedReleaseConnection = Connection & {
  __typename?: 'CollectedReleaseConnection';
  /** Edges of current page */
  edges: Array<CollectedReleaseConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Collected Release Connection */
export type CollectedReleaseConnectionEdge = Edge & {
  __typename?: 'CollectedReleaseConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Collected Release node */
  node: CollectedRelease;
};

/** Name of the collection market */
export enum CollectionMarketType {
  Airdrop = 'AIRDROP',
  PrimarySale = 'PRIMARY_SALE',
  SecondarySale = 'SECONDARY_SALE'
}

/** Collector action entity */
export type CollectorAction = {
  /** Date of action */
  date: Scalars['DateTime'];
  /** Collector action id */
  id: Scalars['ID'];
  /** User corresponding to collector action entity */
  user: User;
};

/** Paginated collector action connection */
export type CollectorActionConnection = Connection & {
  __typename?: 'CollectorActionConnection';
  /** Edges of current page */
  edges: Array<CollectorActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of collector action connection */
export type CollectorActionConnectionEdge = Edge & {
  __typename?: 'CollectorActionConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Collector action node */
  node: CollectorAction;
};

/** Filter collector feed activity types */
export type CollectorActivityFeedFilterArgs = {
  /** Only get activity of given type */
  types?: Array<CollectorActivityFeedTypeFilterOption>;
};

/** Collector activity feed type filter option */
export enum CollectorActivityFeedTypeFilterOption {
  All = 'ALL',
  Collections = 'COLLECTIONS',
  Likes = 'LIKES',
  Playlists = 'PLAYLISTS'
}

/** Comment entity */
export type Comment = {
  __typename?: 'Comment';
  /** Comment unique identifier */
  id: Scalars['ID'];
  /** Comment message content */
  message: Scalars['String'];
  /** Comment chain signature */
  signature: Scalars['String'];
  /** Last update date of comment */
  updatedAt: Scalars['DateTime'];
};

/** Multi-part upload completion information. */
export type CompleteMultipartUploadOutput = {
  __typename?: 'CompleteMultipartUploadOutput';
  /** Completed upload ID */
  uploadId: Scalars['String'];
  /** Completed upload key */
  uploadKey: Scalars['String'];
};

/** Mark the provided multi-part upload as complete */
export type CompleteMultipartUploadRequest = {
  /** Ordered list of uploaded multi-part parts to associate with the final object */
  parts: Array<CompletedMultipartUploadPart>;
  /** Upload ID to use for each upload part of the final object */
  uploadId: Scalars['String'];
  /** Upload key for the final upload object */
  uploadKey: Scalars['String'];
};

/** Multi-part part information */
export type CompletedMultipartUploadPart = {
  /** Opaque identifier of the part data */
  etag: Scalars['String'];
  /** Individual part number identifier */
  partNumber: Scalars['Int'];
};

/** Base connection for paginated results */
export type Connection = {
  /** Edges of current page */
  edges: Array<Edge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Contract entity */
export type Contract = {
  __typename?: 'Contract';
  /** Contract address */
  contractAddress: Scalars['String'];
  /** Type of contract */
  contractType: ContractType;
  /** Date of creation */
  createdAt: Scalars['DateTime'];
  /** Contract entity unique identifier */
  id: Scalars['ID'];
  /** Contract owner */
  owner: User;
  /** Public address of contract owner */
  ownerPublicAddress: Scalars['String'];
  /** Date of last update */
  updatedAt: Scalars['DateTime'];
};

/** Contract methods of transactions */
export enum ContractMethod {
  AffiliateWithdraw = 'AFFILIATE__WITHDRAW',
  ArtistBuyEdition = 'ARTIST__BUY_EDITION',
  ArtistWithdrawFunds = 'ARTIST__WITHDRAW_FUNDS',
  DraftSoundCreatorCreateSoundAndMints = 'DRAFT_SOUND_CREATOR__CREATE_SOUND_AND_MINTS',
  DraftSplitMainCreateSplit = 'DRAFT_SPLIT_MAIN__CREATE_SPLIT',
  MulticallWithdraw = 'MULTICALL__WITHDRAW',
  SoundCreatorCreateSoundAndMints = 'SOUND_CREATOR__CREATE_SOUND_AND_MINTS',
  SoundEditionWithdrawEth = 'SOUND_EDITION__WITHDRAW_ETH',
  SplitMainCreateSplit = 'SPLIT_MAIN__CREATE_SPLIT',
  SplitMainDistributeEth = 'SPLIT_MAIN__DISTRIBUTE_ETH',
  SplitMainWithdraw = 'SPLIT_MAIN__WITHDRAW'
}

/** Input for release by contract */
export type ContractReleaseInput = {
  /** Contract address */
  contractAddress: Scalars['Address'];
  /** Optional edition identifier */
  editionId?: InputMaybe<Scalars['String']>;
};

/** Contract type, currently the playform only supports "ARTIST" */
export enum ContractType {
  Artist = 'ARTIST',
  Edition = 'EDITION'
}

/** Input for createDraft mutation */
export type CreateDraftInput = {
  /** Draft release type */
  releaseType: ReleaseType;
  /** Draft Title */
  title: Scalars['String'];
};

/** Input for createKeyClient mutation */
export type CreateKeyClient = {
  /** Human-readable name of Key Client to be created */
  name: Scalars['NonEmptyString'];
  /** Set the initial status of the specified Key Client */
  status?: KeyClientStatus;
};

/** Input for createRelease mutation */
export type CreateReleaseInput = {
  /** Behind the music text */
  behindTheMusic: Scalars['String'];
  /** Cover image */
  coverImage: UploadedMedia;
  /** Release description */
  description?: InputMaybe<Scalars['String']>;
  /** Release genre */
  genre: Scalars['String'];
  /** Special golden egg image */
  goldenEggImage?: InputMaybe<UploadedMedia>;
  /** Custom rewards */
  rewards?: InputMaybe<Array<RewardInput>>;
  /** Static cover image to use in place of animated cover image */
  staticCoverImage?: InputMaybe<UploadedMedia>;
  /** Title of release */
  title: Scalars['String'];
  /** Uploaded tracks */
  tracks: Array<TrackUpload>;
  /** Release type */
  type: ReleaseType;
};

/** Credit allocation entity */
export type CreditAllocation = {
  __typename?: 'CreditAllocation';
  /** Credit split associated with credit allocation */
  creditSplit: CreditSplit;
  /** Credit allocation entity identifier */
  id: Scalars['ID'];
  /** Owner of credit allocation */
  owner: User;
  /** Percent of allocation */
  percent: Scalars['Float'];
  /** Roles associated with credit allocation */
  roles: Array<Scalars['String']>;
};

/** Credit allocation upload step info */
export type CreditAllocationUploadStepInfo = {
  __typename?: 'CreditAllocationUploadStepInfo';
  /** Owner of allocation */
  owner: User;
  /** Owner public address of allocation */
  ownerAddress: Scalars['String'];
  /** Percent of allocation */
  percent: Scalars['Float'];
  /** Roles associated with credit allocation */
  roles: Array<CreditRoleType>;
};

/** Credit role type */
export enum CreditRoleType {
  Artist = 'ARTIST',
  Curator = 'CURATOR',
  Other = 'OTHER',
  Producer = 'PRODUCER',
  Remixer = 'REMIXER',
  Songwriter = 'SONGWRITER',
  VisualArtist = 'VISUAL_ARTIST'
}

/** Credit split entity */
export type CreditSplit = {
  __typename?: 'CreditSplit';
  /** Credit allocation of credit split */
  creditAllocations: Array<CreditAllocation>;
  /** Credit split identifier */
  id: Scalars['ID'];
  /** Releases associated with credit split that are minted */
  mintedReleases: Array<Release>;
  /** Releases associated with credit split */
  releases: Array<Release>;
  /** Split contract address */
  splitAddress?: Maybe<Scalars['String']>;
};

/** Currencies conversions */
export type Currencies = {
  __typename?: 'Currencies';
  ethToUsd: Scalars['Float'];
};

/** Base cursor connection arguments */
export type CursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Sort the connection ascending or descending */
  sort?: SortOrder;
};

/** Input for deleteAllUsersFromDraftAllowlist mutation */
export type DeleteAllUsersFromDraftAllowlistInput = {
  /** Draft identifier */
  draftId: Scalars['UUID'];
  /** Draft allowlist mint type */
  mintType: MintingAccessConfigMintingType;
};

/** Input fields to delete shelf */
export type DeleteShelfInput = {
  /** Shelf id to delete */
  shelfId: Scalars['UUID'];
};

/** Input for deleteUsersFromDraftAllowlist mutation */
export type DeleteUsersFromDraftAllowlistInput = {
  /** Public addresses to be deleted */
  addresses: Array<Scalars['Address']>;
  /** Draft identifier */
  draftId: Scalars['UUID'];
  /** Draft allowlist mint type */
  mintType: MintingAccessConfigMintingType;
};

/** Input for deployDraft mutation */
export type DeployDraftInput = {
  /** Flag to create or not create underlying release entity when deploying draft */
  createReleaseEntity?: Scalars['Boolean'];
  /** Draft identifier */
  draftId: Scalars['UUID'];
};

/** Output entity of deployDraft mutation */
export type DeployDraftOutput = {
  __typename?: 'DeployDraftOutput';
  /** Draft entity */
  draft: Draft;
  /** Draft release entity */
  release?: Maybe<Release>;
};

/** Draft entity */
export type Draft = Node & {
  __typename?: 'Draft';
  /** Artist of draft */
  artist: Artist;
  /** Salt for contract address */
  contractAddressSalt: Scalars['String'];
  /** Draft creation date */
  createdAt: Scalars['DateTime'];
  /** Draft identifier */
  id: Scalars['ID'];
  /** Draft info */
  info?: Maybe<DraftInfo>;
  /** Release associated with draft */
  release?: Maybe<Release>;
  /** Type of Release */
  type: ReleaseType;
};

/** DraftAllowlist entity */
export type DraftAllowList = Node & {
  __typename?: 'DraftAllowList';
  /** DraftAllowlist creation date */
  createdAt: Scalars['DateTime'];
  /** DraftAllowlist identifier */
  id: Scalars['ID'];
  /** DraftAllowlist info */
  info: DraftAllowlistInfo;
  /** Description for manually added allowlist */
  manuallyAddedAllowlistDescription?: Maybe<Scalars['String']>;
  /** Total number of users in draft allowlist */
  totalUsers: Scalars['Int'];
};


/** DraftAllowlist entity */
export type DraftAllowListInfoArgs = {
  allowListType: DraftAllowlistType;
  pagination?: CursorConnectionArgs;
};

/** Draft allowlist info */
export type DraftAllowListInfo = {
  __typename?: 'DraftAllowListInfo';
  /** Collectors of artists allowlist configuration */
  collectorsOfArtists?: Maybe<DraftCollectorsOfArtistsInfo>;
  /** Collectors of releases allowlist configuration */
  collectorsOfReleases?: Maybe<DraftCollectorsOfReleasesInfo>;
  /** Info for manually added draft allow list */
  manuallyAddedAllowlist?: Maybe<DraftManuallyAddedAllowlistInfo>;
};

/** Draft allow list inputs */
export type DraftAllowListInput = {
  /** Draft collectors of artists */
  collectorsOfArtists?: InputMaybe<DraftCollectorsOfArtistsInput>;
  /** Draft collectors of releases */
  collectorsOfReleases?: InputMaybe<DraftCollectorsOfReleasesInput>;
  /** Draft manually added allowlist releases */
  manuallyAddedAllowlist?: InputMaybe<DraftManuallyAddedAllowlistInput>;
};

/** Draft allow lists info */
export type DraftAllowListsInfo = {
  __typename?: 'DraftAllowListsInfo';
  /** Free mint allowlist configurations */
  freeMint?: Maybe<DraftAllowListInfo>;
  /** Presale mint allowlist configurations */
  presaleMint?: Maybe<DraftAllowListInfo>;
};

/** Draft allowlists configurations */
export type DraftAllowListsInput = {
  /** Free mint draft allowlist configuration */
  freeMint?: InputMaybe<DraftAllowListInput>;
  /** Presale mint draft allowlist configuration */
  presaleMint?: InputMaybe<DraftAllowListInput>;
};

/** Input for draftAllowListFromDraft query */
export type DraftAllowlistFromDraftInput = {
  /** Draft identifier */
  draftId: Scalars['UUID'];
  /** Draft allowlist mint type */
  mintType: MintingAccessConfigMintingType;
};

/** Input for draftAllowListFromRelease query */
export type DraftAllowlistFromReleaseInput = {
  /** Draft allowlist mint type */
  mintType: MintingAccessConfigMintingType;
  /** Release identifier */
  releaseId: Scalars['UUID'];
};

/** Union of draft allowlist infos */
export type DraftAllowlistInfo = ArtistCollectorsAllowlist | ManuallyAddedCollectorsAllowlist | ReleaseCollectorsAllowlist;

/** Input for draftAllowlistInput query */
export type DraftAllowlistInput = {
  /** Allowlist type */
  allowlistType: AllowlistType;
  /** Draft identifier */
  draftId: Scalars['String'];
  /** Draft allowlist mint type */
  mintType: MintingAccessConfigMintingType;
};

/** Draft allow list sale types */
export enum DraftAllowlistSaleType {
  FreeSale = 'FREE_SALE',
  Presale = 'PRESALE'
}

/** Different draft allow list types */
export enum DraftAllowlistType {
  ArtistCollectors = 'ARTIST_COLLECTORS',
  ManuallyAddedCollectors = 'MANUALLY_ADDED_COLLECTORS',
  ReleaseCollectors = 'RELEASE_COLLECTORS'
}

/** Draft auction configuration step info */
export type DraftAuctionConfigurationInfo = {
  __typename?: 'DraftAuctionConfigurationInfo';
  /** Max mints per wallet for auction */
  maxMintsPerWallet?: Maybe<Scalars['Int']>;
  /** Price per mint */
  price: Scalars['Float'];
  /** Max supply for auction */
  quantity: Scalars['Int'];
  /** Start time of auction */
  startTime: Scalars['Int'];
};

/** Release info upload step info */
export type DraftAuctionConfigurationsInfo = {
  __typename?: 'DraftAuctionConfigurationsInfo';
  /** Type of auction */
  auctionType: AuctionType;
  /** Free mint auction configurations */
  freeMint?: Maybe<DraftAuctionConfigurationInfo>;
  /** Max mint supply of auction */
  maxMintable: Scalars['Int'];
  /** Min mint supply of auction */
  minQuantity: Scalars['Int'];
  /** Presale mint auction configurations */
  presaleMint?: Maybe<DraftAuctionConfigurationInfo>;
  /** Public mint auction configurations */
  publicMint: DraftPublicSaleAuctionConfigurationInfo;
  /** Breakdown of mint quantities */
  quantityBreakdown?: Maybe<Array<Scalars['Int']>>;
};

/** Draft collectors of releases info */
export type DraftCollectorsOfArtistsInfo = {
  __typename?: 'DraftCollectorsOfArtistsInfo';
  /** Toggle to include or not include all the collectors of all artists that given artist collaborated with */
  allCollaboratingArtists: Scalars['Boolean'];
  /** Selected artist entities for allowlist artist collectors */
  selectedArtists: Array<ArtistInfo>;
};

/** Draft collectors of artists inputs */
export type DraftCollectorsOfArtistsInput = {
  /** Toggle to include or not include all the collectors of all artists that given artist collaborated with */
  allCollaboratingArtists?: InputMaybe<Scalars['Boolean']>;
  /** Select artist identifiers */
  selectedArtistIds?: InputMaybe<Array<Scalars['UUID']>>;
};

/** Draft collectors of releases info */
export type DraftCollectorsOfReleasesInfo = {
  __typename?: 'DraftCollectorsOfReleasesInfo';
  /** Toggle to include or not include all artist collaborations */
  allArtistCollaborations: Scalars['Boolean'];
  /** Toggle to include or not include all artist releases */
  allArtistReleases: Scalars['Boolean'];
  /** Selected release entities for allowlist release collectors */
  selectedReleases: Array<ReleaseInfo>;
};

/** Draft collectors of releases inputs */
export type DraftCollectorsOfReleasesInput = {
  /** Toggle to include or not include all artist collaborations */
  allArtistCollaborations?: InputMaybe<Scalars['Boolean']>;
  /** Toggle to include or not include all artist releases */
  allArtistReleases?: InputMaybe<Scalars['Boolean']>;
  /** Select release identifiers */
  selectedReleaseIds?: InputMaybe<Array<Scalars['UUID']>>;
};

/** Paginated releases connection */
export type DraftConnection = Connection & {
  __typename?: 'DraftConnection';
  /** Edges of current page */
  edges: Array<DraftConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Draft Connection */
export type DraftConnectionEdge = Edge & {
  __typename?: 'DraftConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Draft node */
  node: Draft;
};

/** Cursor connection parameters */
export type DraftCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Sort the users ascending or descending relative to the user creation date */
  sort?: DraftCursorConnectionSort;
};

/** Customize the sort behavior of drafts pagination */
export type DraftCursorConnectionSort = {
  /** Sort by date of draft creation */
  createdAt?: InputMaybe<SortOrder>;
};

/** Draft info */
export type DraftInfo = {
  __typename?: 'DraftInfo';
  /** Draft allowlist info */
  allowListInfo?: Maybe<DraftAllowListsInfo>;
  /** Draft release info */
  auctionConfigurations?: Maybe<DraftAuctionConfigurationsInfo>;
  /** Number of draft upload steps already complete */
  numUploadStepsComplete: Scalars['Int'];
  /** Draft release info */
  releaseInfo?: Maybe<DraftReleaseInfo>;
  /** Draft release info */
  rewardsInfo?: Maybe<RewardsUploadStepInfo>;
  /** Draft release info */
  splitsInfo?: Maybe<SplitsUploadStepInfo>;
};

/** Different upload steps for a release */
export type DraftInfoInput = {
  /** Allowlists inputs */
  allowListsInfo?: InputMaybe<DraftAllowListsInput>;
  /** Auction configuration inputs */
  auctionConfigurations?: InputMaybe<AuctionConfigurationsInput>;
  /** Release info upload step inputs */
  releaseInfo?: InputMaybe<ReleaseInfoUploadStepInput>;
  /** Rewards upload step inputs */
  rewardsInfo?: InputMaybe<RewardsUploadStepInput>;
  /** Credit allocations of credit split */
  splitsInfo?: InputMaybe<SplitsUploadStepInput>;
};

/** Draft manually added allowlist info */
export type DraftManuallyAddedAllowlistInfo = {
  __typename?: 'DraftManuallyAddedAllowlistInfo';
  /** Description for draft manually added allowlist */
  description?: Maybe<Scalars['String']>;
};

/** Draft manually added allowlist inputs */
export type DraftManuallyAddedAllowlistInput = {
  /** Draft manually added allowlist description */
  description?: InputMaybe<Scalars['String']>;
};

/** Input for draftMetadataUpload mutation */
export type DraftMetadataUploadInput = {
  /** Draft identifier */
  draftId: Scalars['UUID'];
};

/** Draft public sale auction configuration step info */
export type DraftPublicSaleAuctionConfigurationInfo = {
  __typename?: 'DraftPublicSaleAuctionConfigurationInfo';
  /** Number of days auction should run for */
  endTimeDays?: Maybe<Scalars['Int']>;
  /** Draft release info */
  listeningPartyStart?: Maybe<Scalars['Timestamp']>;
  /** Max mints per wallet for auction */
  maxMintsPerWallet?: Maybe<Scalars['Int']>;
  /** Price per mint */
  price: Scalars['Float'];
  /** Max supply for auction */
  quantity: Scalars['Int'];
  /** Start time of auction */
  startTime: Scalars['Int'];
};

/** Draft release info */
export type DraftReleaseInfo = {
  __typename?: 'DraftReleaseInfo';
  /** Release beats per minute */
  beatsPerMinute?: Maybe<Scalars['Int']>;
  /** Behind the music text */
  behindTheMusic: Scalars['String'];
  /** Cover image */
  coverImage: MediaUploadStepInfo;
  /** Genre */
  genre: Scalars['String'];
  /** Release key */
  key?: Maybe<SongKeyType>;
  /** License for the release */
  license?: Maybe<LicenseType>;
  /** Location where the release was created */
  location?: Maybe<Scalars['CountryCode']>;
  /** Release lyrics */
  lyrics?: Maybe<Scalars['String']>;
  /** Static version of animated cover image of release if the cover is a GIF */
  staticCoverImage?: Maybe<MediaUploadStepInfo>;
  /** Title */
  title: Scalars['String'];
  /** Token symbol */
  tokenSymbol: Scalars['String'];
  /** Uploaded tracks */
  tracks: Array<TrackUploadStepInfo>;
  /** Release type */
  type: Scalars['String'];
};

/** Given paramater already exists and can't be duplicated */
export type DuplicatedError = Error & {
  __typename?: 'DuplicatedError';
  /** Descriptive message of error */
  message: Scalars['String'];
};

/** Earnings aggregates */
export type Earnings = {
  __typename?: 'Earnings';
  /** Total eth earned by the user */
  cummulativeEarned: Scalars['String'];
  /** Portion of split main balance unrelated to sound releases */
  externalSplitMainBalance: Scalars['String'];
  /** Total eth available for the user to withdraw from sound releases */
  releasesAvailableToWithdraw: Scalars['String'];
  /** Portion of split main balance related to sound releases */
  releasesSplitMainBalance: Scalars['String'];
  /** Total eth available for the user to withdraw, includes sound releases and external split main balance */
  totalAvailableToWithdraw: Scalars['String'];
  /** Total eth on the split main contract */
  totalSplitMainBalance: Scalars['String'];
};

/** Container of Node and the Cursor from the Node */
export type Edge = {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Node entity */
  node: Node;
};

/** Edition contract earnings */
export type EditionContractEarning = {
  __typename?: 'EditionContractEarning';
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String'];
  /** Address of the edition contract */
  contractAddress: Scalars['String'];
  /** Total eth on the contract */
  totalBalance: Scalars['String'];
};

/** EggGame Entity */
export type EggGame = {
  __typename?: 'EggGame';
  /** Animated golden egg image optimized for client rendering */
  animatedGoldenEggImageOptimized?: Maybe<Media>;
  /** Block hash of egg game calculation */
  finalSerialBlockHash: Scalars['String'];
  /** Special golden egg image */
  goldenEggImage?: Maybe<Media>;
  /** EggGame identifier */
  id: Scalars['ID'];
  /** Nft of egg game winner */
  nft: Nft;
  /** Serial number of nft with egg game */
  winningSerialNum: Scalars['Int'];
};

/** Base Error */
export type Error = {
  /** Descriptive message of error */
  message: Scalars['String'];
};

/** Event type */
export enum EventType {
  Airdrop = 'AIRDROP',
  EditionPurchased = 'EDITION_PURCHASED',
  OrdersMatched = 'ORDERS_MATCHED',
  Transfer = 'TRANSFER',
  Unknown = 'UNKNOWN'
}

/** Event entity */
export type EventV2 = Node & {
  __typename?: 'EventV2';
  /** Timestamp on blockchain of event */
  blockTimestamp: Scalars['DateTime'];
  /** Contract address */
  contractAddress: Scalars['String'];
  /** Date of creation of event entity */
  createdAt: Scalars['DateTime'];
  /** Edition identifier */
  editionId?: Maybe<Scalars['String']>;
  /** Event type */
  eventType: EventType;
  /** Source public address */
  fromAddress?: Maybe<Scalars['String']>;
  /** User associated to source public address */
  fromAddressUser?: Maybe<User>;
  /** Event identifier */
  id: Scalars['ID'];
  /** Release associated with event */
  release?: Maybe<Release>;
  /** Target public address */
  toAddress?: Maybe<Scalars['String']>;
  /** User associated to target public address */
  toAddressUser?: Maybe<User>;
  /** Token ID of associated NFT */
  tokenId: Scalars['String'];
  /** Value exchanged in Wei */
  valueExchanged: Scalars['String'];
  /** Formatted version of value exchanged */
  valueExchangedPretty: ValueExchangedPrettyType;
};

/** Input for extendShelf mutation */
export type ExtendShelfInput = {
  /** Shelf identifier of source */
  sourceShelfId: Scalars['UUID'];
  /** Shelf identifier of target shelf to receive the releases */
  targetShelfId: Scalars['UUID'];
};

/** Feature flag entity to describe flagged functionality */
export type FeatureFlag = {
  __typename?: 'FeatureFlag';
  /** Creation date of feature flag */
  createdAt: Scalars['DateTime'];
  /** Feature flag UUID */
  id: Scalars['ID'];
  /** Name of feature flag */
  name: Scalars['String'];
  /** Last update of feature flag value */
  updatedAt: Scalars['DateTime'];
  /** Arbitrary string value, it could be need to be parsed stringified json */
  value: Scalars['String'];
};

/** Type of feature to be set */
export enum FeatureType {
  Artist = 'ARTIST',
  Release = 'RELEASE',
  Splits = 'SPLITS',
  User = 'USER'
}

/** Filter Key Clients pagination */
export type FilterKeyClients = {
  status?: InputMaybe<Array<KeyClientStatus>>;
};

/** Auction options associated with fixed sales */
export type FixedAuction = {
  __typename?: 'FixedAuction';
  /** List of different max mints per wallet quantity options for free sale */
  freeSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different max mints per wallet quantity options for presale */
  presaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different eth prices options for presale */
  presalePriceOptions?: Maybe<Array<Scalars['Float']>>;
  /** List of different eth prices options for public sale */
  priceOptions: Array<Scalars['Float']>;
  /** List of different max mints per wallet quantity options for public sale */
  publicSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different quantity options for public sale */
  quantityOptions: Array<Scalars['Int']>;
};

/** Input options to customize fixed auctions */
export type FixedAuctionInput = {
  /** List of different max mints per wallet quantity options for free sale */
  freeSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different max mints per wallet quantity options for presale */
  presaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different eth prices options for presales */
  presalePriceOptions: Array<Scalars['Float']>;
  /** List of different eth prices options for public sale */
  priceOptions: Array<Scalars['Float']>;
  /** List of different max mints per wallet quantity options for public sale */
  publicSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different quantity options for public sale */
  quantityOptions: Array<Scalars['Int']>;
};

/** Input fields to follow user */
export type FollowUserInput = {
  /** User id to follow */
  user: Scalars['UUID'];
};

/** Genre entity */
export type Genre = {
  __typename?: 'Genre';
  /** Date of creation */
  createdAt: Scalars['DateTime'];
  /** Genre associated UUID */
  id: Scalars['ID'];
  /** Genre name */
  name: Scalars['String'];
  /** Date of last update of genre */
  updatedAt: Scalars['DateTime'];
};

/** [USE `Error` INSTEAD] The base error type that every other error object extends from */
export type IError = {
  message: Scalars['String'];
};

/** Customize iframe html parameters */
export type IframeHtmlParameters = {
  /** Customize height */
  height: Scalars['String'];
  /** Customize style */
  style: Scalars['String'];
  /** Customize width */
  width: Scalars['String'];
};

/** Input field to check if auth user is following */
export type IsFollowingInput = {
  /** User id to check if auth user is following */
  user: Scalars['UUID'];
};

/** Input for `isLiked` query */
export type IsLikedInput = {
  /** Identifier to be checked */
  id: Scalars['UUID'];
};

/** Client key management entity */
export type KeyClient = Node & {
  __typename?: 'KeyClient';
  /** Date of creation */
  createdAt: Scalars['DateTime'];
  /** Unique identifier of client key */
  id: Scalars['ID'];
  /** Key associated to client for authentication process */
  key: Scalars['String'];
  /** Human-readable identifier of key client */
  name: Scalars['String'];
  /** Status of Key Client */
  status: KeyClientStatus;
  /** Date of last update */
  updatedAt: Scalars['DateTime'];
};

/** Paginated connection of Key Clients */
export type KeyClientConnection = Connection & {
  __typename?: 'KeyClientConnection';
  /** Edges of current page */
  edges: Array<KeyClientConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Key Client Connection */
export type KeyClientConnectionEdge = Edge & {
  __typename?: 'KeyClientConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Key Client node */
  node: KeyClient;
};

/** Cursor connection parameters */
export type KeyClientCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Sort the key clients ascending or descending relative to the entity creation date */
  sort?: SortOrder;
};

/** Status of Key Client */
export enum KeyClientStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

/** Paginated latest sales events */
export type LatestSalesConnection = Connection & {
  __typename?: 'LatestSalesConnection';
  /** Edges of current page */
  edges: Array<LatestSalesConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of LatestSales Connection */
export type LatestSalesConnectionEdge = Edge & {
  __typename?: 'LatestSalesConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Event node */
  node: EventV2;
};

/** Pagination parameters for Latest Sales connection */
export type LatestSalesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sorting latest sales */
  sort?: LatestSalesCursorConnectionSort;
};

/** Customize sorting latest sales */
export type LatestSalesCursorConnectionSort = {
  /** Sort by blockchain timestamp */
  blockTimestamp?: InputMaybe<SortOrder>;
  /** Sort by date of creation of event entity */
  createdAt?: InputMaybe<SortOrder>;
};

/** Filter for paginated latest sales */
export type LatestSalesCursorFilterArgs = {
  /** Specify event types to be filtered */
  eventTypes?: InputMaybe<Array<EventType>>;
};

/** Given string doesn't have the minimum expected length */
export type LengthError = Error & {
  __typename?: 'LengthError';
  /** Descriptive message of error */
  message: Scalars['String'];
  /** Minimum string length required */
  minLength: Scalars['Int'];
};

/** License for the release */
export enum LicenseType {
  AllRightsReserved = 'ALL_RIGHTS_RESERVED',
  CreativeCommons = 'CREATIVE_COMMONS'
}

/** Like action entity */
export type LikeAction = {
  /** Date of action */
  date: Scalars['DateTime'];
  /** Like action id */
  id: Scalars['ID'];
  /** User corresponding to like action entity */
  user: User;
};

/** Paginated like action connection */
export type LikeActionConnection = Connection & {
  __typename?: 'LikeActionConnection';
  /** Edges of current page */
  edges: Array<LikeActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of like action connection */
export type LikeActionConnectionEdge = Edge & {
  __typename?: 'LikeActionConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Like action node */
  node: LikeAction;
};

/** Input for `likeRelease` mutation */
export type LikeReleaseInput = {
  /** Release identifier to be liked */
  releaseId: Scalars['UUID'];
};

/** Input for `likeShelf` mutation */
export type LikeShelfInput = {
  /** Shelf identifier to be liked */
  shelfId: Scalars['UUID'];
};

/** Input used for link query */
export type LinkInput = {
  /** Link slug */
  slug: Scalars['NonEmptyString'];
};

/** Info associated with manually added draft allowlist */
export type ManuallyAddedCollectorsAllowlist = {
  __typename?: 'ManuallyAddedCollectorsAllowlist';
  /** Total number of manually added users in draft allowlist */
  totalCollectors: Scalars['Int'];
};

/** Returned when the input is above the maximum tolerated value */
export type MaxValueError = Error & IError & {
  __typename?: 'MaxValueError';
  actual: Scalars['Int'];
  max: Scalars['Int'];
  /** Descriptive message of error */
  message: Scalars['String'];
};

/** Media entity */
export type Media = {
  __typename?: 'Media';
  /** AWS S3 Bucket */
  bucket: Scalars['String'];
  /** Media entity identifier */
  id: Scalars['ID'];
  /** AWS S3 File key */
  key: Scalars['String'];
  /** CDN Url */
  url: Scalars['String'];
};

/** Type of media entity, either Images or Audio */
export enum MediaType {
  ArtistBannerImage = 'ARTIST_BANNER_IMAGE',
  ArtistFreeSaleAllowlist = 'ARTIST_FREE_SALE_ALLOWLIST',
  ArtistPresaleAllowlist = 'ARTIST_PRESALE_ALLOWLIST',
  Audio = 'AUDIO',
  AudioTranscoded = 'AUDIO_TRANSCODED',
  AvatarImage = 'AVATAR_IMAGE',
  DraftAllowlistedAddressesCsv = 'DRAFT_ALLOWLISTED_ADDRESSES_CSV',
  ReleaseBannerImage = 'RELEASE_BANNER_IMAGE',
  ReleaseCoverImage = 'RELEASE_COVER_IMAGE',
  ReleaseGoldenEggImage = 'RELEASE_GOLDEN_EGG_IMAGE',
  ReleaseHoldersCsv = 'RELEASE_HOLDERS_CSV',
  ReleaseWebAnimatedGoldenEggImage = 'RELEASE_WEB_ANIMATED_GOLDEN_EGG_IMAGE',
  ReleaseWebAnimatedImage = 'RELEASE_WEB_ANIMATED_IMAGE',
  ReleaseWebStaticAutogenImage = 'RELEASE_WEB_STATIC_AUTOGEN_IMAGE',
  ReleaseWebStaticImage = 'RELEASE_WEB_STATIC_IMAGE',
  TmpArtistBannerAutogenImage = 'TMP_ARTIST_BANNER_AUTOGEN_IMAGE',
  TmpAvatarAutogenImage = 'TMP_AVATAR_AUTOGEN_IMAGE',
  TmpUserBannerAutogenImage = 'TMP_USER_BANNER_AUTOGEN_IMAGE',
  UserBannerImage = 'USER_BANNER_IMAGE'
}

/** Release info upload step info */
export type MediaUploadStepInfo = {
  __typename?: 'MediaUploadStepInfo';
  /** Media type to be uploaded */
  mediaType: MediaType;
  /** Upload key received from Query.signedUploadParams */
  uploadKey: Scalars['String'];
};

/** Merkle tree entity */
export type MerkleTree = {
  __typename?: 'MerkleTree';
  /** Upload step creation date */
  createdAt: Scalars['DateTime'];
  /** Upload step identifier */
  id: Scalars['ID'];
  /** Number of leaves for merkle tree */
  leafCount: Scalars['Int'];
  /** Merkle tree root */
  root: Scalars['String'];
  /** List of unhashed leaves for merkle tree */
  unhashedLeaves: Array<Scalars['String']>;
};

/** Merkle tree proof information */
export type MerkleTreeProof = {
  __typename?: 'MerkleTreeProof';
  /** Merkle proof */
  proof: Array<Scalars['String']>;
  /** Unhashed leaf in merkle tree */
  unhashedLeaf: Scalars['String'];
};

/** Metadata Attribute */
export type MetadataAttribute = {
  __typename?: 'MetadataAttribute';
  /** Trait type */
  traitType?: Maybe<Scalars['String']>;
  /** Value */
  value: Scalars['String'];
};

/** Returned when the input is below the minimum tolerated value */
export type MinValueError = Error & IError & {
  __typename?: 'MinValueError';
  actual: Scalars['Int'];
  /** Descriptive message of error */
  message: Scalars['String'];
  min: Scalars['Int'];
};

/** Mint current time status */
export enum MintTimeStatus {
  Past = 'PAST',
  Upcoming = 'UPCOMING'
}

/** Pagination parameters for Minted Releases connection */
export type MintedReleasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior of minted releases pagination */
  sort?: MintedReleasesCursorConnectionSort;
};

/** Customize sort behavior of minted releases pagination */
export type MintedReleasesCursorConnectionSort = {
  /** Sort by createdAt of release */
  createdAt?: InputMaybe<SortOrder>;
  /** Sort by mintStartTime of release */
  mintStartTime?: InputMaybe<SortOrder>;
};

/** Filter minted releases */
export type MintedReleasesCursorFilterArgs = {
  /** Specify up to 50 contracts to filter the releases */
  contracts?: InputMaybe<Array<ContractReleaseInput>>;
  /** Only get releases from specified genres */
  genre?: InputMaybe<Array<Scalars['String']>>;
  /** Remove currently-featured releases from results */
  hideFeatured?: InputMaybe<Scalars['Boolean']>;
  /** Only get releases less or equal to than specified mint time */
  mintTimeMaxDate?: InputMaybe<Scalars['Timestamp']>;
  /** Only get releases greater than or equal to specified mint time */
  mintTimeMinDate?: InputMaybe<Scalars['Timestamp']>;
  /** Only get release with specified mint time status */
  mintTimeStatus?: InputMaybe<Array<MintTimeStatus>>;
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: InputMaybe<ReleaseAlbumRevealFilterOption>;
  /** Only get release with specified status */
  releaseStatus?: InputMaybe<Array<ReleaseStatus>>;
  /** Filters on release type */
  releaseType?: Array<ReleaseType>;
  /** Only get releases from specified seasons */
  season?: InputMaybe<Array<ArtistSeason>>;
};

/** Different minting types for mintingAccessConfig query */
export enum MintingAccessConfigMintingType {
  Free = 'FREE',
  Presale = 'PRESALE'
}

/** Multi-part upload initiation information. */
export type MultipartUploadOutput = {
  __typename?: 'MultipartUploadOutput';
  /** Signed multi-part URLs for each part number */
  signedUrls: Array<SignedMultipartUrl>;
  /** Upload ID to use for each upload part of the final object */
  uploadId: Scalars['String'];
  /** Upload key for the final upload object */
  uploadKey: Scalars['String'];
};

/** Input for signedUploadParams mutation */
export type MultipartUploadRequest = {
  /** File name of media to be uploaded */
  fileName: Scalars['String'];
  /** Media type to be uploaded */
  mediaType: MediaType;
  /** Number of parts to use for multi-part upload */
  totalPartsCount: Scalars['Int'];
};

/** Mutations */
export type Mutation = {
  __typename?: 'Mutation';
  /** [ARTIST] Abort a multi-part upload request */
  abortMultipartUpload: MutationAbortMultipartUploadResult;
  /** [AUTHENTICATED] Add specified release into the bottom of owned shelf */
  addReleaseToShelf: MutationAddReleaseToShelfResult;
  /** [ARTIST] Add users to given draft with allowlist type */
  addUsersToDraftAllowlist: MutationAddUsersToDraftAllowlistResult;
  /**
   * [ADMIN] Upload metadata to Arweave
   * @deprecated Please use Mutation.albumRevealMetadataFromDraft
   */
  albumRevealMetadata: Scalars['NonEmptyString'];
  /** [ADMIN] Upload metadata to Arweave from release draft info */
  albumRevealMetadataFromDraft: Scalars['NonEmptyString'];
  /** [ADMIN | ARTIST_RELATIONS] Configure auction meta options of specific artist */
  artistAuctionMeta: ArtistAuctionOverrides;
  /** [ADMIN | ARTIST_RELATIONS] Configure specific artist minting options */
  artistMintingOption: ArtistAuctionOverrides;
  /** [ADMIN] Change the role of a specified user */
  changeRoleForUser: UserRoles;
  /** [ARTIST] Upsert release edition based on transaction */
  clientConfirmedDraftUpsert?: Maybe<Release>;
  /** [ARTIST] Upsert release edition based on transaction */
  clientCreateNewEditionUpsert: Release;
  /** [AUTHENTICATED] Upsert created draft split address from the client-side. An alternative to wait until the transaction is completed and automatically acknowledged on background processes */
  clientDraftSplitUpsert?: Maybe<Draft>;
  /** [AUTHENTICATED] Upsert bought NFT entity from the client-side. An alternative to wait until the transaction is completed and automatically acknowledged on background processes */
  clientNftUpsert?: Maybe<Nft>;
  /** [AUTHENTICATED] Upsert created split address from the client-side. An alternative to wait until the transaction is completed and automatically acknowledged on background processes */
  clientSplitUpsert?: Maybe<CreditSplit>;
  /** [ARTIST] Complete a multi-part upload request */
  completeMultipartUpload: MutationCompleteMultipartUploadResult;
  /** [AUTHENTICATED] Create artist entity for authenticated user, User has to be allowed to create artist profile beforehand */
  createArtist: User;
  /** [ARTIST] Create credit split for specified release */
  createCreditSplit: CreditSplit;
  /** [ARTIST] Create draft release */
  createDraft: MutationCreateDraftResult;
  /** [ADMIN] Create Key Client */
  createKeyClient: KeyClient;
  /** [ARTIST] Initiate a multi-part upload request */
  createMultipartUpload: MutationCreateMultipartUploadResult;
  /** [ARTIST] Create release for new sound edition contracts */
  createSoundEditionRelease: MutationCreateSoundEditionReleaseResult;
  /** [ARTIST] Delete all users from given draft and allowlist type */
  deleteAllUsersFromDraftAllowlist: MutationDeleteAllUsersFromDraftAllowlistResult;
  /** [ARTIST] Delete unminted draft */
  deleteDraft: MutationDeleteDraftResult;
  /** [AUTHENTICATED] Delete shelf for user */
  deleteShelf?: Maybe<Scalars['Void']>;
  /** [ARTIST] Delete users from given draft and allowlist type */
  deleteUsersFromDraftAllowlist: MutationDeleteUsersFromDraftAllowlistResult;
  /** [ADMIN | ARTIST] Deploy draft after contract deployment. */
  deployDraft: MutationDeployDraftResult;
  /** [ADMIN | ARTIST] Upload draft metadata to Arweave */
  draftMetadataUpload: MutationDraftMetadataUploadResult;
  /** [ADMIN] Update the sales schedules of the specified edition */
  editionUpdateSchedules: Release;
  /** [AUTHENTICATED] Extend all the existing releases of a shelf into another shelf */
  extendShelf: MutationExtendShelfResult;
  /** [AUTHENTICATED] Follow user of input userId */
  followUser: UserRelation;
  /** [ADMIN] Manually sync pending transactions */
  forceSyncPendingTransactions?: Maybe<Scalars['Void']>;
  /** [PUBLIC] Generate auth challenge for given public address and give back new nonce */
  generateAuthChallenge: Scalars['Int'];
  /** [AUTHENTICATED] Like a release. */
  likeRelease: MutationLikeReleaseResult;
  /** [AUTHENTICATED] Like a shelf. */
  likeShelf: MutationLikeShelfResult;
  /** [ADMIN | ARTIST] Prepare draft before minting, creating merkle trees based on the allowlists specified on the draft info. */
  prepareMintDraft: MutationPrepareMintDraftResult;
  /**
   * [ARTIST | ADMIN] [DEPRECATED] Prepare release before minting, creating merkle trees based on the allowlists specified on the upload steps.
   * @deprecated Use prepareMintRelease instead, it uses user domain errors
   */
  prepareReleaseForMint?: Maybe<Scalars['Void']>;
  /** [AUTHENTICATED] Recover a deleted shelf */
  recoverShelf: MutationRecoverShelfResult;
  /** [AUTHENTICATED] Manually register transaction of nft buy */
  registerBuyEditionTx: Transaction;
  /** [ARTIST] Manually register transaction of SoundEdition contract creation & mint schedule registrations on minter contracts. */
  registerCreateSoundAndMintsTx: Transaction;
  /** [ARTIST] Manually register split transaction */
  registerCreateSplitTx: Transaction;
  /** [ARTIST] Manually register draft split transaction */
  registerDraftCreateSplitTx: Transaction;
  /** [ARTIST] Manually register transaction of draft deploy */
  registerDraftDeployTx: Transaction;
  /** [AUTHENTICATED] Register transaction replacement */
  registerReplacementTx: Transaction;
  /** [AUTHENTICATED] Remove specified release from the owned shelf */
  removeReleaseFromShelf: MutationRemoveReleaseFromShelfResult;
  /** [ADMIN | ARTIST_RELATIONS] Remove associated twitter handle of given user */
  removeTwitterHandle: MutationRemoveTwitterHandleResult;
  /** [PUBLIC] Report a track play session stop */
  reportPlayStopped?: Maybe<Scalars['Void']>;
  /** [AUTHENTICATED] Reset twitter handle of authenticated user */
  resetTwitter: User;
  /** [ADMIN] Configure season-based meta-auction options */
  seasonAuctionMeta: SeasonAuctionDefaults;
  /** [ADMIN] Change season-based auction options */
  seasonMintingOption: SeasonAuctionDefaults;
  /** [AUTHENTICATED] Select song slot using chain data instead of NFT identifier */
  selectSongSlotUsingChainData: Nft;
  /** [AUTHENTICATED] Select song slot for owned NFT */
  selectSongSlotUsingNftId: MutationSelectSongSlotUsingNftIdResult;
  /** [AUTHENTICATED] Set the source of an affiliate purchase. Returns the count of current affiliate purchases updated */
  setAffiliatePurchaseSource: MutationSetAffiliatePurchaseSourceResult;
  /** [ARTIST_RELATIONS | ADMIN] Set artist metadata */
  setArtistMeta: Artist;
  /** [ARTIST] Set special configurations into artist entity */
  setArtistName: Artist;
  /** [ADMIN] Manually set the last processed block number, used primarily by sound.xyz watcher */
  setBlockNumber: Scalars['String'];
  /** [AUTHENTICATED] Set comment for specified Nft */
  setComment: Nft;
  /** [AUTHENTICATED] Delegate address of user to be used. Set to NULL to remove the delegate address from the account. */
  setDelegateAddress: User;
  /** [AUTHENTICATED] Update authenticated user display name */
  setDisplayName: User;
  /** [ADMIN] Set specified feature flag as defined */
  setFeatureFlag: FeatureFlag;
  /** [AUTHENTICATED] Update releases to be returned in featured sounds */
  setFeaturedSounds: User;
  /** [ADMIN] Set the whitelisted artists to have no time restrictions for minting */
  setNoTimeRestrictionArtistList: Array<Scalars['String']>;
  /** [ADMIN | ARTIST_RELATIONS] Set details of release */
  setReleaseDetails: Release;
  /** [ADMIN | ARTIST_RELATIONS] Set special metadata of release */
  setReleaseMeta: Release;
  /** [ADMIN] Set season for specified artist */
  setSeasonForArtist: Artist;
  /** [AUTHENTICATED] Set input list of releaseIds to input shelfId */
  setShelfReleases: MutationSetShelfReleasesResult;
  /** [ADMIN] Block or unblock user from uploading content into the system */
  setUploadBlockStatus?: Maybe<Scalars['Void']>;
  /** [ADMIN | ARTIST_RELATIONS] Set artist role to specified public address */
  setUserArtistRole: User;
  /** [ADMIN] Set the media of the specified user */
  setUserMedia: User;
  /** [ARTIST] Check if draft splitInfo matches already deployed credit split for specified draft */
  shouldDeployNewSplit: MutationShouldDeployNewSplitResult;
  /** [AUTHENTICATED] Unfollow user of input userId */
  unfollowUser: UserRelation;
  /** [AUTHENTICATED] Unlike a release. */
  unlikeRelease: MutationUnlikeReleaseResult;
  /** [AUTHENTICATED] Unlike a shelf. */
  unlikeShelf: MutationUnlikeShelfResult;
  /** [ARTIST] Update authenticated artist Spotify URL */
  updateArtistSpotifyUrl: Artist;
  /** [AUTHENTICATED] Update authenticated user description */
  updateDescription: User;
  /** [ARTIST] Update draft info of given draftId */
  updateDraftInfo: MutationUpdateDraftInfoResult;
  /** [AUTHENTICATED] Update authenticated user email */
  updateEmail: User;
  /** [ADMIN] Update existing Key Client */
  updateKeyClient: KeyClient;
  /** [AUTHENTICATED] Update the last tracked referral withdrawable balance of the authenticated user */
  updateReferralWithdrawableBalance: User;
  /** [AUTHENTICATED] Update authenticated user Instagram handle */
  updateUserInstagramHandle: User;
  /** [AUTHENTICATED] Upload media content for authenticated user's profile */
  uploadUserMedia: User;
  /** [ARTIST] Upsert artist banner image */
  upsertArtistBannerImage: Artist;
  /** [AUTHENTICATED] Upsert shelf for user. If id is passed in as input, mutation will update shelf. Otherwise, mutation will create new shelf */
  upsertShelf: Shelf;
  /** [PUBLIC] Verify given auth challenge */
  verifyAuthChallenge: Scalars['String'];
  /** [AUTHENTICATED] Verify twitter handle */
  verifyTwitter: MutationVerifyTwitterResult;
};


/** Mutations */
export type MutationAbortMultipartUploadArgs = {
  input: AbortMultipartUploadRequest;
};


/** Mutations */
export type MutationAddReleaseToShelfArgs = {
  input: AddReleaseToShelfInput;
};


/** Mutations */
export type MutationAddUsersToDraftAllowlistArgs = {
  input: AddUsersToDraftAllowlistInput;
};


/** Mutations */
export type MutationAlbumRevealMetadataArgs = {
  releaseId: Scalars['UUID'];
};


/** Mutations */
export type MutationAlbumRevealMetadataFromDraftArgs = {
  releaseId: Scalars['UUID'];
};


/** Mutations */
export type MutationArtistAuctionMetaArgs = {
  artistAddress: Scalars['Address'];
  metaType?: InputMaybe<AuctionMetaInput>;
};


/** Mutations */
export type MutationArtistMintingOptionArgs = {
  artistAddress: Scalars['Address'];
  auctionType: AuctionInputRef;
};


/** Mutations */
export type MutationChangeRoleForUserArgs = {
  input: ChangeRoleInput;
};


/** Mutations */
export type MutationClientConfirmedDraftUpsertArgs = {
  hash: Scalars['String'];
};


/** Mutations */
export type MutationClientCreateNewEditionUpsertArgs = {
  hash: Scalars['String'];
};


/** Mutations */
export type MutationClientDraftSplitUpsertArgs = {
  txHash: Scalars['String'];
};


/** Mutations */
export type MutationClientNftUpsertArgs = {
  txHash: Scalars['String'];
};


/** Mutations */
export type MutationClientSplitUpsertArgs = {
  txHash: Scalars['String'];
};


/** Mutations */
export type MutationCompleteMultipartUploadArgs = {
  input: CompleteMultipartUploadRequest;
};


/** Mutations */
export type MutationCreateArtistArgs = {
  soundHandle: Scalars['String'];
};


/** Mutations */
export type MutationCreateCreditSplitArgs = {
  creditAllocations: Array<Allocation>;
  creditSplitId?: InputMaybe<Scalars['UUID']>;
  releaseId: Scalars['UUID'];
};


/** Mutations */
export type MutationCreateDraftArgs = {
  input: CreateDraftInput;
};


/** Mutations */
export type MutationCreateKeyClientArgs = {
  input: CreateKeyClient;
};


/** Mutations */
export type MutationCreateMultipartUploadArgs = {
  input: MultipartUploadRequest;
};


/** Mutations */
export type MutationCreateSoundEditionReleaseArgs = {
  input: CreateReleaseInput;
};


/** Mutations */
export type MutationDeleteAllUsersFromDraftAllowlistArgs = {
  input: DeleteAllUsersFromDraftAllowlistInput;
};


/** Mutations */
export type MutationDeleteDraftArgs = {
  id: Scalars['UUID'];
};


/** Mutations */
export type MutationDeleteShelfArgs = {
  input: DeleteShelfInput;
};


/** Mutations */
export type MutationDeleteUsersFromDraftAllowlistArgs = {
  input: DeleteUsersFromDraftAllowlistInput;
};


/** Mutations */
export type MutationDeployDraftArgs = {
  input: DeployDraftInput;
};


/** Mutations */
export type MutationDraftMetadataUploadArgs = {
  input: DraftMetadataUploadInput;
};


/** Mutations */
export type MutationEditionUpdateSchedulesArgs = {
  editionAddress?: InputMaybe<Scalars['String']>;
  releaseId?: InputMaybe<Scalars['String']>;
};


/** Mutations */
export type MutationExtendShelfArgs = {
  input: ExtendShelfInput;
};


/** Mutations */
export type MutationFollowUserArgs = {
  input: FollowUserInput;
};


/** Mutations */
export type MutationGenerateAuthChallengeArgs = {
  publicAddress: Scalars['String'];
};


/** Mutations */
export type MutationLikeReleaseArgs = {
  input: LikeReleaseInput;
};


/** Mutations */
export type MutationLikeShelfArgs = {
  input: LikeShelfInput;
};


/** Mutations */
export type MutationPrepareMintDraftArgs = {
  input: PrepareMintDraftInput;
};


/** Mutations */
export type MutationPrepareReleaseForMintArgs = {
  id: Scalars['UUID'];
};


/** Mutations */
export type MutationRecoverShelfArgs = {
  deletedShelfId: Scalars['UUID'];
};


/** Mutations */
export type MutationRegisterBuyEditionTxArgs = {
  hash: Scalars['String'];
  releaseId: Scalars['UUID'];
};


/** Mutations */
export type MutationRegisterCreateSoundAndMintsTxArgs = {
  hash: Scalars['String'];
  releaseId: Scalars['UUID'];
};


/** Mutations */
export type MutationRegisterCreateSplitTxArgs = {
  creditSplitId: Scalars['UUID'];
  hash: Scalars['String'];
};


/** Mutations */
export type MutationRegisterDraftCreateSplitTxArgs = {
  draftId: Scalars['UUID'];
  hash: Scalars['String'];
};


/** Mutations */
export type MutationRegisterDraftDeployTxArgs = {
  draftId: Scalars['UUID'];
  hash: Scalars['String'];
};


/** Mutations */
export type MutationRegisterReplacementTxArgs = {
  originalHash: Scalars['String'];
  replacementHash: Scalars['String'];
};


/** Mutations */
export type MutationRemoveReleaseFromShelfArgs = {
  input: RemoveReleaseFromShelfInput;
};


/** Mutations */
export type MutationRemoveTwitterHandleArgs = {
  twitterHandle: Scalars['String'];
};


/** Mutations */
export type MutationReportPlayStoppedArgs = {
  input: ReportPlayStoppedInput;
};


/** Mutations */
export type MutationSeasonAuctionMetaArgs = {
  metaType?: InputMaybe<AuctionMetaInput>;
  seasonName: Scalars['String'];
};


/** Mutations */
export type MutationSeasonMintingOptionArgs = {
  auctionType: AuctionInputRef;
  seasonName: Scalars['String'];
};


/** Mutations */
export type MutationSelectSongSlotUsingChainDataArgs = {
  input: ChainDataSongSlotSelection;
};


/** Mutations */
export type MutationSelectSongSlotUsingNftIdArgs = {
  nftId: Scalars['UUID'];
  songSlot: Scalars['Int'];
};


/** Mutations */
export type MutationSetAffiliatePurchaseSourceArgs = {
  input: AffiliateSourceInput;
};


/** Mutations */
export type MutationSetArtistMetaArgs = {
  input: SetArtistMetaInput;
};


/** Mutations */
export type MutationSetArtistNameArgs = {
  name: Scalars['String'];
};


/** Mutations */
export type MutationSetBlockNumberArgs = {
  blockNumber: Scalars['String'];
};


/** Mutations */
export type MutationSetCommentArgs = {
  message: Scalars['String'];
  nftId: Scalars['UUID'];
  signature: Scalars['String'];
};


/** Mutations */
export type MutationSetDelegateAddressArgs = {
  delegateAddress?: InputMaybe<Scalars['Address']>;
};


/** Mutations */
export type MutationSetDisplayNameArgs = {
  displayName: Scalars['String'];
};


/** Mutations */
export type MutationSetFeatureFlagArgs = {
  name: Scalars['String'];
  type?: InputMaybe<FeatureType>;
  value: Scalars['String'];
};


/** Mutations */
export type MutationSetFeaturedSoundsArgs = {
  releaseIds: Array<Scalars['UUID']>;
};


/** Mutations */
export type MutationSetNoTimeRestrictionArtistListArgs = {
  newArtists: Array<Scalars['String']>;
  shouldAppend: Scalars['Boolean'];
};


/** Mutations */
export type MutationSetReleaseDetailsArgs = {
  input: SetReleaseDetailsInput;
};


/** Mutations */
export type MutationSetReleaseMetaArgs = {
  input: SetReleaseMetaInput;
};


/** Mutations */
export type MutationSetSeasonForArtistArgs = {
  artistId: Scalars['UUID'];
  season: Scalars['String'];
};


/** Mutations */
export type MutationSetShelfReleasesArgs = {
  input: SetReleasesForShelfInput;
};


/** Mutations */
export type MutationSetUploadBlockStatusArgs = {
  input: UploadBlockStatusInput;
};


/** Mutations */
export type MutationSetUserArtistRoleArgs = {
  hasArtistRole: Scalars['Boolean'];
  publicAddress: Scalars['Address'];
};


/** Mutations */
export type MutationSetUserMediaArgs = {
  content: UploadedMedia;
  userPublicAddress: Scalars['Address'];
};


/** Mutations */
export type MutationShouldDeployNewSplitArgs = {
  draftId: Scalars['UUID'];
};


/** Mutations */
export type MutationUnfollowUserArgs = {
  input: UnfollowUserInput;
};


/** Mutations */
export type MutationUnlikeReleaseArgs = {
  input: UnlikeReleaseInput;
};


/** Mutations */
export type MutationUnlikeShelfArgs = {
  input: UnlikeShelfInput;
};


/** Mutations */
export type MutationUpdateArtistSpotifyUrlArgs = {
  spotifyUrl?: InputMaybe<Scalars['String']>;
};


/** Mutations */
export type MutationUpdateDescriptionArgs = {
  description: Scalars['String'];
};


/** Mutations */
export type MutationUpdateDraftInfoArgs = {
  input: UpdateDraftInfoInput;
};


/** Mutations */
export type MutationUpdateEmailArgs = {
  email?: InputMaybe<Scalars['EmailAddress']>;
};


/** Mutations */
export type MutationUpdateKeyClientArgs = {
  input: UpdateKeyClient;
};


/** Mutations */
export type MutationUpdateUserInstagramHandleArgs = {
  instagramHandle?: InputMaybe<Scalars['String']>;
};


/** Mutations */
export type MutationUploadUserMediaArgs = {
  content: UploadedMedia;
};


/** Mutations */
export type MutationUpsertArtistBannerImageArgs = {
  bannerImage: UploadedMedia;
};


/** Mutations */
export type MutationUpsertShelfArgs = {
  input: UpsertShelfInput;
};


/** Mutations */
export type MutationVerifyAuthChallengeArgs = {
  publicAddress: Scalars['String'];
  signedMessage: Scalars['String'];
};


/** Mutations */
export type MutationVerifyTwitterArgs = {
  tweetId: Scalars['String'];
  twitterHandle: Scalars['String'];
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationAbortMultipartUploadResult = AwsRequestError | MutationAbortMultipartUploadSuccess;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationAbortMultipartUploadSuccess = {
  __typename?: 'MutationAbortMultipartUploadSuccess';
  data: AbortMultipartUploadOutput;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationAddReleaseToShelfResult = DuplicatedError | MutationAddReleaseToShelfSuccess | NotAllowedError | NotFoundError | UnexpectedValueError | UniqueConstraintError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationAddReleaseToShelfSuccess = {
  __typename?: 'MutationAddReleaseToShelfSuccess';
  data: Shelf;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationAddUsersToDraftAllowlistResult = AlreadyMintedError | MutationAddUsersToDraftAllowlistSuccess;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationAddUsersToDraftAllowlistSuccess = {
  __typename?: 'MutationAddUsersToDraftAllowlistSuccess';
  data: AddUsersToDraftAllowlistOutput;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationCompleteMultipartUploadResult = AwsRequestError | MutationCompleteMultipartUploadSuccess;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationCompleteMultipartUploadSuccess = {
  __typename?: 'MutationCompleteMultipartUploadSuccess';
  data: CompleteMultipartUploadOutput;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationCreateDraftResult = DuplicatedError | MutationCreateDraftSuccess;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationCreateDraftSuccess = {
  __typename?: 'MutationCreateDraftSuccess';
  data: Draft;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationCreateMultipartUploadResult = AwsRequestError | MutationCreateMultipartUploadSuccess;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationCreateMultipartUploadSuccess = {
  __typename?: 'MutationCreateMultipartUploadSuccess';
  data: MultipartUploadOutput;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationCreateSoundEditionReleaseResult = MutationCreateSoundEditionReleaseSuccess | NotFoundError | UniqueConstraintError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationCreateSoundEditionReleaseSuccess = {
  __typename?: 'MutationCreateSoundEditionReleaseSuccess';
  data: Release;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationDeleteAllUsersFromDraftAllowlistResult = AlreadyMintedError | MutationDeleteAllUsersFromDraftAllowlistSuccess | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationDeleteAllUsersFromDraftAllowlistSuccess = {
  __typename?: 'MutationDeleteAllUsersFromDraftAllowlistSuccess';
  data: AllowList;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationDeleteDraftResult = AlreadyMintedError | MutationDeleteDraftSuccess;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationDeleteDraftSuccess = {
  __typename?: 'MutationDeleteDraftSuccess';
  data: Draft;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationDeleteUsersFromDraftAllowlistResult = AlreadyMintedError | MutationDeleteUsersFromDraftAllowlistSuccess | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationDeleteUsersFromDraftAllowlistSuccess = {
  __typename?: 'MutationDeleteUsersFromDraftAllowlistSuccess';
  data: AllowList;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationDeployDraftResult = AlreadyMintedError | MutationDeployDraftSuccess | NotAllowedError | NotFoundError | UnexpectedValueError | UniqueConstraintError | ValidationError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationDeployDraftSuccess = {
  __typename?: 'MutationDeployDraftSuccess';
  data: DeployDraftOutput;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationDraftMetadataUploadResult = MutationDraftMetadataUploadSuccess | NotAllowedError | NotFoundError | ValidationError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationDraftMetadataUploadSuccess = {
  __typename?: 'MutationDraftMetadataUploadSuccess';
  data: ReleaseArweaveOutputs;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationExtendShelfResult = MutationExtendShelfSuccess | UnexpectedValueError | UniqueConstraintError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationExtendShelfSuccess = {
  __typename?: 'MutationExtendShelfSuccess';
  data: Shelf;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationLikeReleaseResult = MutationLikeReleaseSuccess | NotAllowedError | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationLikeReleaseSuccess = {
  __typename?: 'MutationLikeReleaseSuccess';
  data: Release;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationLikeShelfResult = MutationLikeShelfSuccess | NotAllowedError | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationLikeShelfSuccess = {
  __typename?: 'MutationLikeShelfSuccess';
  data: Shelf;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationPrepareMintDraftResult = AlreadyMintedError | MutationPrepareMintDraftSuccess | NotAllowedError | NotFoundError | ValidationError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationPrepareMintDraftSuccess = {
  __typename?: 'MutationPrepareMintDraftSuccess';
  data: PrepareMintDraftOutput;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationRecoverShelfResult = MutationRecoverShelfSuccess | NotAllowedError | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationRecoverShelfSuccess = {
  __typename?: 'MutationRecoverShelfSuccess';
  data: Shelf;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationRemoveReleaseFromShelfResult = MutationRemoveReleaseFromShelfSuccess | NotAllowedError | NotFoundError | UnexpectedValueError | UniqueConstraintError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationRemoveReleaseFromShelfSuccess = {
  __typename?: 'MutationRemoveReleaseFromShelfSuccess';
  data: Shelf;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationRemoveTwitterHandleResult = MutationRemoveTwitterHandleSuccess | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationRemoveTwitterHandleSuccess = {
  __typename?: 'MutationRemoveTwitterHandleSuccess';
  data: User;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationSelectSongSlotUsingNftIdResult = AuthorizationError | MaxValueError | MinValueError | MutationSelectSongSlotUsingNftIdSuccess | UnexpectedValueError | UniqueConstraintError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationSelectSongSlotUsingNftIdSuccess = {
  __typename?: 'MutationSelectSongSlotUsingNftIdSuccess';
  data: Nft;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationSetAffiliatePurchaseSourceResult = MutationSetAffiliatePurchaseSourceSuccess | ValidationError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationSetAffiliatePurchaseSourceSuccess = {
  __typename?: 'MutationSetAffiliatePurchaseSourceSuccess';
  data: Scalars['Int'];
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationSetShelfReleasesResult = MutationSetShelfReleasesSuccess | NotAllowedError | UnexpectedValueError | UniqueConstraintError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationSetShelfReleasesSuccess = {
  __typename?: 'MutationSetShelfReleasesSuccess';
  data: Shelf;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationShouldDeployNewSplitResult = MutationShouldDeployNewSplitSuccess | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationShouldDeployNewSplitSuccess = {
  __typename?: 'MutationShouldDeployNewSplitSuccess';
  data: Scalars['Boolean'];
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationUnlikeReleaseResult = MutationUnlikeReleaseSuccess | NotAllowedError | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationUnlikeReleaseSuccess = {
  __typename?: 'MutationUnlikeReleaseSuccess';
  data: Release;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationUnlikeShelfResult = MutationUnlikeShelfSuccess | NotAllowedError | NotFoundError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationUnlikeShelfSuccess = {
  __typename?: 'MutationUnlikeShelfSuccess';
  data: Shelf;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationUpdateDraftInfoResult = AlreadyMintedError | DuplicatedError | MutationUpdateDraftInfoSuccess | ValidationError | ZodValidationError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationUpdateDraftInfoSuccess = {
  __typename?: 'MutationUpdateDraftInfoSuccess';
  data: Draft;
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationVerifyTwitterResult = MutationVerifyTwitterSuccess | NotFoundError | TwitterApiError | UniqueConstraintError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationVerifyTwitterSuccess = {
  __typename?: 'MutationVerifyTwitterSuccess';
  data: User;
};

/** NFT Entity */
export type Nft = Node & {
  __typename?: 'Nft';
  /** Amount paid in Wei for NFT */
  amountPaidInWei: Scalars['String'];
  /** Comment set for NFT */
  comment?: Maybe<Comment>;
  /** Contract address */
  contractAddress: Scalars['String'];
  /** Date of creation of NFT entity */
  createdAt: Scalars['DateTime'];
  /** Block number of the nft mint */
  createdAtBlockNum: Scalars['Int'];
  /** Blockchain created date of NFT */
  createdAtBlockTime?: Maybe<Scalars['DateTime']>;
  /** Nft UUID */
  id: Scalars['ID'];
  /** Is the NFT a golden egg */
  isGoldenEgg: Scalars['Boolean'];
  /** OpenSea metadata attributes. */
  openSeaMetadataAttributes: Array<OpenSeaMetadataAttribute>;
  /** Owner of NFT */
  owner: User;
  /** Release associated with NFT */
  release: Release;
  /** Acumulative serial number */
  serialNumber: Scalars['Int'];
  /** Song slot reserved by NFT */
  songSlot?: Maybe<Scalars['Int']>;
  /** Unique chain token identifier */
  tokenId: Scalars['ID'];
  /** Last update date of NFT */
  updatedAt: Scalars['DateTime'];
  /** Block number of the last transfer state */
  updatedAtBlockNum: Scalars['Int'];
  /**
   * Blockchain date of the last transfer state
   * @deprecated Please use Nft.updatedAt
   */
  updatedAtBlockTime: Scalars['DateTime'];
};

/** Paginated NFTs connection */
export type NftConnection = Connection & {
  __typename?: 'NftConnection';
  /** Edges of current page */
  edges: Array<NftConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** NFT Node edge */
export type NftConnectionEdge = Edge & {
  __typename?: 'NftConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** NFT Entity */
  node: Nft;
};

/** Cursor connection parameters for NFTs */
export type NftCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: NftCursorConnectionSort;
};

/** Customize the sort behavior of Nfts pagination */
export type NftCursorConnectionSort = {
  /** Sort by date of primary sale */
  primarySaleDate?: InputMaybe<SortOrder>;
  /** Sort by date of last secondary sale with default value of primary sale date */
  secondarySaleDate?: InputMaybe<SortOrder>;
  /** Sort by serial number */
  serialNumber?: InputMaybe<SortOrder>;
};

/** Input for "nft" Query */
export type NftInput = {
  /** Contract address of edition */
  contractAddress: Scalars['Address'];
  /** Token unique identifier within edition */
  tokenId: Scalars['String'];
};

/** Simplified version of Nft entity filtered to be with non-nullable comment */
export type NftWithComment = {
  __typename?: 'NftWithComment';
  /** Amount paid in Wei for NFT */
  amountPaidInWei: Scalars['String'];
  /** Avatar URL of Nft owner */
  avatarUrl?: Maybe<Scalars['String']>;
  /** Comment of NFT */
  comment: Comment;
  /** Contract address */
  contractAddress: Scalars['String'];
  /** Unique identifier of Nft */
  id: Scalars['ID'];
  /** If the Nft owner is an artist, returns the name of the artist */
  ownerArtistName?: Maybe<Scalars['String']>;
  /**
   * Display name of owner
   * @deprecated Please use NftWithComment.ownerUsername
   */
  ownerDisplayName?: Maybe<Scalars['String']>;
  /** Public wallet address of owner */
  ownerPublicAddress: Scalars['String'];
  /**
   * Twitter handle of owner
   * @deprecated Please use NftWithComment.ownerUsername
   */
  ownerTwitterHandle?: Maybe<Scalars['String']>;
  /** Nft owner username */
  ownerUsername: Scalars['String'];
  /** Webapp URI of Nft owner */
  ownerWebappUri: Scalars['String'];
  /**
   * Timestamp of purchased date
   * @deprecated Please use NftWithComment.updatedAt
   */
  purchasedAt: Scalars['Timestamp'];
  /** Acumulative serial number */
  serialNumber: Scalars['Int'];
  /** Song slot reserved by NFT */
  songSlot: Scalars['Int'];
  /** Unique chain token identifier */
  tokenId: Scalars['String'];
  /** Last update date of NFT */
  updatedAt: Scalars['Timestamp'];
};

/** Base node */
export type Node = {
  /** Node identifier */
  id: Scalars['ID'];
};

/** Operation is not allowed. */
export type NotAllowedError = Error & {
  __typename?: 'NotAllowedError';
  /** Descriptive message of error */
  message: Scalars['String'];
};

/** Returned when a resource is not found */
export type NotFoundError = Error & IError & {
  __typename?: 'NotFoundError';
  /** Descriptive message of error */
  message: Scalars['String'];
};

/** Auction options associated with open edition sales */
export type OpenEditionAuction = {
  __typename?: 'OpenEditionAuction';
  /** List of different max mints per wallet quantity options for free sale */
  freeSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different options of minimum quantity for public sale */
  minOptions: Array<Scalars['Int']>;
  /** List of different duration in days for public sale */
  mintingPeriodDays: Array<Scalars['Int']>;
  /** List of different max mints per wallet quantity options for presale */
  presaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different eth prices options for presale */
  presalePriceOptions?: Maybe<Array<Scalars['Float']>>;
  /** List of different eth prices options for public sale */
  priceOptions: Array<Scalars['Float']>;
  /** List of different max mints per wallet quantity options for public sale */
  publicSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
};

/** Input options to customize open edition auctions */
export type OpenEditionAuctionInput = {
  /** List of different max mints per wallet quantity options for free sale */
  freeSaleMaxMintsPerWalletOptions?: InputMaybe<Array<Scalars['Int']>>;
  /** List of different options of minimum quantity for public sale */
  minOptions: Array<Scalars['Int']>;
  /** List of different duration in days for public sale */
  mintingPeriodDays: Array<Scalars['Int']>;
  /** List of different max mints per wallet quantity options for presale */
  presaleMaxMintsPerWalletOptions?: InputMaybe<Array<Scalars['Int']>>;
  /** List of different eth prices options for presales */
  presalePriceOptions: Array<Scalars['Float']>;
  /** List of different eth prices options for public sale */
  priceOptions: Array<Scalars['Float']>;
  /** List of different max mints per wallet quantity options for public sale */
  publicSaleMaxMintsPerWalletOptions?: InputMaybe<Array<Scalars['Int']>>;
};

/** OpenSea Metadata Attribute */
export type OpenSeaMetadataAttribute = {
  __typename?: 'OpenSeaMetadataAttribute';
  /** Trait type */
  traitType?: Maybe<Scalars['String']>;
  /** Value */
  value: Scalars['String'];
};

/** Pagination helper information */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** Cursor shorthand of the last node from current page */
  endCursor?: Maybe<Scalars['String']>;
  /** Does the current connection have a next page */
  hasNextPage: Scalars['Boolean'];
  /** Does the current connection have a previous page */
  hasPreviousPage: Scalars['Boolean'];
  /** Cursor shorthand of the first node from current page */
  startCursor?: Maybe<Scalars['String']>;
};

/** Playlist entity that contains tracks */
export type Playlist = {
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist action entity */
export type PlaylistAction = {
  /** Date of action */
  date: Scalars['DateTime'];
  /** Playlist action id */
  id: Scalars['ID'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
  /** User corresponding to action entity */
  user: User;
};

/** Paginated playlist action connection */
export type PlaylistActionConnection = Connection & {
  __typename?: 'PlaylistActionConnection';
  /** Edges of current page */
  edges: Array<PlaylistActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of playlist action connection */
export type PlaylistActionConnectionEdge = Edge & {
  __typename?: 'PlaylistActionConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Playlist action node */
  node: PlaylistAction;
};

/** Filter PlaylistAction details */
export type PlaylistActionFilterArgs = {
  /** If set, only show artist owned releases in paginated release results. Does not apply if the playlist is owned by the artist */
  releaseArtistId?: InputMaybe<Scalars['UUID']>;
};

/** Cursor connection parameters */
export type PlaylistActionReleasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the number of nodes to be fetched, to be used with "after", with a maximum of 25 nodes */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the number of nodes to be fetched, to be used with "before", with a maximum of 25 nodes */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Sort the releases ascending or descending by release creation date */
  sort?: SortOrder;
};

/** Playlist of tracks of an artist */
export type PlaylistArtist = Playlist & {
  __typename?: 'PlaylistArtist';
  artistId: Scalars['ID'];
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist created */
export type PlaylistCreated = ArtistAction & CollectorAction & Node & PlaylistAction & ReleaseAction & {
  __typename?: 'PlaylistCreated';
  /** Date of action */
  date: Scalars['DateTime'];
  /** Artist action id */
  id: Scalars['ID'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
  /** User corresponding to action entity */
  user: User;
};

/** Playlist of tracks of a holder' NFTs */
export type PlaylistHolder = Playlist & {
  __typename?: 'PlaylistHolder';
  /** Holder public address */
  holderPublicAddress: Scalars['String'];
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist used for Homepage and fallback for extra pages */
export type PlaylistHome = Playlist & {
  __typename?: 'PlaylistHome';
  createdAt: Scalars['DateTime'];
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist input */
export type PlaylistInput = {
  /** Association ID based on type of playlist */
  associationId?: InputMaybe<Scalars['String']>;
  /** Type of playlist */
  type: PlaylistType;
};

/** Playlist liked action entity */
export type PlaylistLiked = ArtistAction & CollectorAction & Node & PlaylistAction & {
  __typename?: 'PlaylistLiked';
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
  /** User corresponding to playlist liked action entity */
  user: User;
};

/** Simplified track entity to only contain identifiers to associated entities */
export type PlaylistTrack = {
  __typename?: 'PlaylistTrack';
  /** Artist ID */
  artistId: Scalars['ID'];
  /** Track ID */
  id: Scalars['ID'];
  /** Release ID */
  releaseId: Scalars['ID'];
};

/** Currently supported playlists */
export enum PlaylistType {
  Artist = 'ARTIST',
  Holder = 'HOLDER',
  Home = 'HOME'
}

/** Input for prepareMintDraft mutation */
export type PrepareMintDraftInput = {
  /** Draft identifier */
  draftId: Scalars['UUID'];
};

/** Output entity of prepareMintDraft mutation */
export type PrepareMintDraftOutput = {
  __typename?: 'PrepareMintDraftOutput';
  /** Draft entity */
  draft: Draft;
  /** Free mint merkle tree root */
  freeMintMerkleTreeRoot?: Maybe<Scalars['String']>;
  /** Presale merkle tree root */
  presaleMintMerkleTreeRoot?: Maybe<Scalars['String']>;
};

/** Primary sale collector action entity */
export type PrimarySale = ArtistAction & CollectorAction & Node & ReleaseAction & {
  __typename?: 'PrimarySale';
  /** Amount paid in Wei for primary sale */
  amountPaidInWei: Scalars['String'];
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Release corresponding to collector primary sale action entity */
  release: Release;
  /** Serial number of nft primary sale purchase */
  serialNumber: Scalars['Int'];
  /** User corresponding to collector action entity */
  user: User;
};

/** Queries */
export type Query = {
  __typename?: 'Query';
  /** [PUBLIC] Activity Feed with filter parameters */
  activityFeed?: Maybe<ActivityFeed>;
  /** Paginate through all collectors of the system */
  allCollectors: UserConnection;
  /**
   * [PUBLIC] Get all minted releases
   * @deprecated Please use Query.releases
   */
  allMintedReleasesPaginated: ReleaseConnection;
  /** Paginate through all shelves of the system */
  allShelves: ShelfConnection;
  /** [AUTHENTICATED] Withdrawable earnings for all releases, ignores dust amounts that are not worth withdrawing */
  allWithdrawableEarnings: AllWithdrawableEarnings;
  /** [PUBLIC] Artist by UUID */
  artist?: Maybe<Artist>;
  /** [PUBLIC] Artist activity feed */
  artistActivityFeed: ArtistActionConnection;
  /** [PUBLIC] Artist by handle */
  artistByHandle?: Maybe<Artist>;
  /** [ARTIST] Get all the existing sound holders addresses of authenticated artist. */
  artistCurrentCollectorsList: Array<Scalars['String']>;
  /** [ADMIN | ARTIST_RELATIONS] Default reference artist minting release options of specified artist */
  artistDefaultMintingOptions: ArtistDefaultOptions;
  /** [ARTIST] Get artist release drafts */
  artistDrafts: DraftConnection;
  /** [ARTIST | ADMIN | ARTIST_RELATIONS] Get artist minting options of authenticated artist. Given artist id has to match authenticated artist */
  artistMintingOptions: ArtistReleaseOptions;
  /** [PUBLIC] Get all artists of platform. */
  artists: ArtistConnection;
  /** [PUBLIC] Get audio from track */
  audioFromTrack: TrackAudio;
  /** [PUBLIC] Get authenticated user information, if any */
  authUser?: Maybe<User>;
  /** [ARTIST] Get specified release regardless of mint status. If specified release is not created by authenticated artist, it fails. */
  authenticatedRelease: Release;
  /** [PUBLIC] Collector activity feed */
  collectorActivityFeed: CollectorActionConnection;
  /** [PUBLIC] Get credit split by id */
  creditSplit?: Maybe<CreditSplit>;
  /** [AUTHENTICATED] Total eth in wei earned by the authenticated user on affiliate fees */
  cummulativeAffiliateEarned: Scalars['String'];
  /** [PUBLIC] Get currencies conversions */
  currencies: Currencies;
  /** [ARTIST] Get draft of given draft id */
  draft: Draft;
  /** [ARTIST] Get allowlist of given draftId, sale type, and allowlist type */
  draftAllowList?: Maybe<AllowList>;
  /** [ARTIST] Get DraftAllowList from draft and mintType */
  draftAllowlistFromDraft?: Maybe<DraftAllowList>;
  /** [PUBLIC] Get DraftAllowList from release and mintType */
  draftAllowlistFromRelease?: Maybe<DraftAllowList>;
  /** [AUTHENTICATED] Get the earnings for the authenticated user */
  earnings: Earnings;
  /** [PUBLIC] Get EggGame of specified release */
  eggGame?: Maybe<EggGame>;
  /** [PUBLIC] Get feature flag value by name */
  featureFlag?: Maybe<FeatureFlag>;
  /** [PUBLIC] Get currently-featured releases */
  featuredReleases: Array<Release>;
  /**
   * [PUBLIC] Global Activity Feed
   * @deprecated Please use activityFeed query with activityFeedType.GLOBAL filter
   */
  globalActivityFeed?: Maybe<ActivityFeed>;
  /** [AUTHENTICATED] Returns whether auth user is following input userId */
  isFollowing: Scalars['Boolean'];
  /** [AUTHENTICATED] Returns whether an entity is liked by the user or not. */
  isLiked: Scalars['Boolean'];
  /** [ADMIN] Get all the existing Key Clients */
  keyClients: KeyClientConnection;
  /** [PUBLIC] Get the latest events */
  latestEventsPaginated: LatestSalesConnection;
  /** [PUBLIC] Get playlist based on given type and associationId */
  legacyPlaylist?: Maybe<Playlist>;
  /** [PUBLIC] User like and unlike activity feed */
  likeActivityFeed: LikeActionConnection;
  /** [PUBLIC] Get a node based on specific slug */
  link?: Maybe<Node>;
  /** [PUBLIC] Get merkle tree information */
  merkleTree: MerkleTree;
  /** [PUBLIC] Get merkle tree information */
  merkleTreeProof?: Maybe<MerkleTreeProof>;
  /** [PUBLIC] Get minted release by Artist sound handle and release title slug */
  mintedRelease?: Maybe<Release>;
  /** [ARTIST] Get artists by ids for multiselect */
  multiSelectArtists: Array<ArtistInfo>;
  /** [ARTIST] Get releases by releaseIds for multiselect */
  multiSelectReleases: Array<ReleaseInfo>;
  /** [PUBLIC] Request nft with contract fields */
  nft: Nft;
  /** [PUBLIC] Current UNIX date to test caching */
  now: Scalars['Int'];
  /** [PUBLIC] Test query to get the date of calculation of resolver based using response cache */
  nowCached: Scalars['Timestamp'];
  /**
   * [PUBLIC] Get playlist based on given type and associationId
   * @deprecated Use legacyPlaylist instead
   */
  playlist?: Maybe<Playlist>;
  /** PlaylistAction by UUID */
  playlistAction?: Maybe<PlaylistAction>;
  /** [PUBLIC] Activity Feed with filter parameters */
  playlistActivityFeed: PlaylistActionConnection;
  /** [PUBLIC] Get specified shelf by id */
  playlistV2?: Maybe<Shelf>;
  /** [PUBLIC] Purchase activity Feed with filter parameters */
  purchaseActivityFeed: CollectorActionConnection;
  /** [PUBLIC] Get release by id */
  release?: Maybe<Release>;
  /** [PUBLIC] Release activity feed */
  releaseActivityFeed: ReleaseActionConnection;
  /** [PUBLIC] Release allow listed addresses csv url */
  releaseAllowListedAddressesCSVUrl?: Maybe<Scalars['String']>;
  /** [ARTIST] CDN url CSV of users that own a release nft or null if no release backers */
  releaseBackersCSVUrl?: Maybe<Scalars['String']>;
  /** [PUBLIC] Get all users that collected the same release in one activity feed group. */
  releaseCollectedByManyUsers: UserConnection;
  /**
   * [PUBLIC] Get release by contract address
   * @deprecated Please use Query.releaseFromContract
   */
  releaseContract: Release;
  /** [AUTHENTICATED] Paginated earnings by release */
  releaseEarnings: ReleaseEarningsConnection;
  /** [PUBLIC] Get release by contract address */
  releaseFromContract?: Maybe<Release>;
  /** [ARTIST] Get release of given draft id if it exists */
  releaseFromDraft?: Maybe<Release>;
  /** [PUBLIC] Get the release that's associated with the specific token parameters */
  releaseFromToken?: Maybe<Release>;
  /** [PUBLIC] List of genres that have at least 1 past minted release, sorted by popularity */
  releaseGenres: Array<Genre>;
  /** [PUBLIC] Get all releases */
  releases: ReleaseConnection;
  /** Search releases or artists based on text inputs */
  search: SearchResult;
  /** [ADMIN | ARTIST_RELATIONS] Get default reference season-based auction options */
  seasonDefaultMintingOptions: SeasonDefaultOptions;
  /** [PUBLIC] Get specified shelf by id */
  shelf: Shelf;
  /** [ARTIST] Should the authenticated artist skip applying the listening party offset */
  shouldArtistSkipListeningPartyOffset: Scalars['Boolean'];
  /** [AUTHENTICATED] Request media upload */
  signedUploadParams: AwsPresignedPost;
  /** [ADMIN | ARTIST_RELATIONS] Get basic stats */
  stats: Stats;
  /** [AUTHENTICATED] Total affiliate purchases of authenticated user */
  totalAffiliatePurchases: ReleaseAffiliateTotalPurchasesConnection;
  /** [PUBLIC] Get total raised of the whole platform */
  totalRaised: TotalRaised;
  /** [PUBLIC] Total count of minted releases */
  totalReleasesCount: Scalars['Int'];
  /** [PUBLIC] Get track by id */
  track?: Maybe<Track>;
  /** [PUBLIC] Get trending artists information */
  trendingArtistInfo: Array<TrendingArtistInfo>;
  /** [PUBLIC] Get trending collectors information */
  trendingCollectors: Array<TrendingCollectorInfo>;
  /** [PUBLIC] Get trending playlists */
  trendingPlaylists: Array<TrendingPlaylistInfo>;
  /** [PUBLIC] Get trending releases */
  trendingReleases: Array<TrendingReleaseInfo>;
  /** [PUBLIC] Get specified user by id */
  user?: Maybe<User>;
  /**
   * [AUTHENTICATED] Personalized activity feed of user
   * @deprecated Please use activityFeed query with activityFeedType.USER filter
   */
  userActivityFeed?: Maybe<ActivityFeed>;
  /** [PUBLIC] Get specified user by public address or ens, if both args provided mismatch, returns null */
  userByAddress?: Maybe<User>;
  /** [PUBLIC] Get specified user by sound handle */
  userByArtistHandle?: Maybe<User>;
  /** [PUBLIC] User like and unlike activity feed */
  userLikeActivityFeed: CollectorActionConnection;
  /** [AUTHENTICATED] Check status of relationship of authenticated user with specified users */
  userRelationStatuses: Array<UserRelationStatus>;
  /** [AUTHENTICATED] Get withdraw affiliate earnings information of authenticated user */
  withdrawableAffiliateEarnings: WithdrawAffiliateEarnings;
  /** [AUTHENTICATED] Withdrawable earnings for a given release, returns null for values if contract contain dust amounts that are not worth withdrawing */
  withdrawableEarningsForRelease: WithdrawableEarnings;
};


/** Queries */
export type QueryActivityFeedArgs = {
  filter?: ActivityFeedFilterArgs;
};


/** Queries */
export type QueryAllCollectorsArgs = {
  input?: AllCollectorsInput;
};


/** Queries */
export type QueryAllMintedReleasesPaginatedArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>;
  pagination?: MintedReleasesCursorConnectionArgs;
};


/** Queries */
export type QueryAllShelvesArgs = {
  input?: AllShelvesInput;
};


/** Queries */
export type QueryArtistArgs = {
  id: Scalars['UUID'];
};


/** Queries */
export type QueryArtistActivityFeedArgs = {
  artistId: Scalars['UUID'];
  filter?: ArtistActivityFeedFilterArgs;
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryArtistByHandleArgs = {
  soundHandle: Scalars['String'];
};


/** Queries */
export type QueryArtistDefaultMintingOptionsArgs = {
  artistAddress: Scalars['Address'];
};


/** Queries */
export type QueryArtistDraftsArgs = {
  input: ArtistDraftsInput;
};


/** Queries */
export type QueryArtistMintingOptionsArgs = {
  artistId: Scalars['UUID'];
};


/** Queries */
export type QueryArtistsArgs = {
  filter?: InputMaybe<ArtistCursorFilterArgs>;
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryAudioFromTrackArgs = {
  trackId: Scalars['UUID'];
};


/** Queries */
export type QueryAuthenticatedReleaseArgs = {
  releaseId: Scalars['UUID'];
};


/** Queries */
export type QueryCollectorActivityFeedArgs = {
  filter?: CollectorActivityFeedFilterArgs;
  pagination?: CursorConnectionArgs;
  userId: Scalars['UUID'];
};


/** Queries */
export type QueryCreditSplitArgs = {
  id: Scalars['UUID'];
};


/** Queries */
export type QueryDraftArgs = {
  draftId: Scalars['UUID'];
};


/** Queries */
export type QueryDraftAllowListArgs = {
  input: DraftAllowlistInput;
};


/** Queries */
export type QueryDraftAllowlistFromDraftArgs = {
  input: DraftAllowlistFromDraftInput;
};


/** Queries */
export type QueryDraftAllowlistFromReleaseArgs = {
  input: DraftAllowlistFromReleaseInput;
};


/** Queries */
export type QueryEggGameArgs = {
  releaseId: Scalars['UUID'];
};


/** Queries */
export type QueryFeatureFlagArgs = {
  name: Scalars['String'];
};


/** Queries */
export type QueryIsFollowingArgs = {
  input: IsFollowingInput;
};


/** Queries */
export type QueryIsLikedArgs = {
  input: IsLikedInput;
};


/** Queries */
export type QueryKeyClientsArgs = {
  filter?: InputMaybe<FilterKeyClients>;
  pagination?: KeyClientCursorConnectionArgs;
};


/** Queries */
export type QueryLatestEventsPaginatedArgs = {
  filter?: InputMaybe<LatestSalesCursorFilterArgs>;
  pagination?: LatestSalesCursorConnectionArgs;
};


/** Queries */
export type QueryLegacyPlaylistArgs = {
  input: PlaylistInput;
};


/** Queries */
export type QueryLikeActivityFeedArgs = {
  pagination?: CursorConnectionArgs;
  userId: Scalars['UUID'];
};


/** Queries */
export type QueryLinkArgs = {
  input: LinkInput;
};


/** Queries */
export type QueryMerkleTreeArgs = {
  root: Scalars['String'];
};


/** Queries */
export type QueryMerkleTreeProofArgs = {
  root: Scalars['String'];
  unhashedLeaf: Scalars['String'];
};


/** Queries */
export type QueryMintedReleaseArgs = {
  releaseSlug: Scalars['String'];
  soundHandle: Scalars['String'];
};


/** Queries */
export type QueryMultiSelectArtistsArgs = {
  ids: Array<Scalars['UUID']>;
};


/** Queries */
export type QueryMultiSelectReleasesArgs = {
  ids: Array<Scalars['UUID']>;
};


/** Queries */
export type QueryNftArgs = {
  input: NftInput;
};


/** Queries */
export type QueryNowCachedArgs = {
  ttlSeconds?: Scalars['Int'];
};


/** Queries */
export type QueryPlaylistArgs = {
  input: PlaylistInput;
};


/** Queries */
export type QueryPlaylistActionArgs = {
  filter?: InputMaybe<PlaylistActionFilterArgs>;
  id: Scalars['UUID'];
  playlistId: Scalars['UUID'];
};


/** Queries */
export type QueryPlaylistActivityFeedArgs = {
  pagination?: CursorConnectionArgs;
  playlistId: Scalars['UUID'];
};


/** Queries */
export type QueryPlaylistV2Args = {
  id: Scalars['UUID'];
};


/** Queries */
export type QueryPurchaseActivityFeedArgs = {
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryReleaseArgs = {
  id: Scalars['UUID'];
};


/** Queries */
export type QueryReleaseActivityFeedArgs = {
  filter?: ReleaseActivityFeedFilterArgs;
  pagination?: CursorConnectionArgs;
  releaseId: Scalars['UUID'];
};


/** Queries */
export type QueryReleaseAllowListedAddressesCsvUrlArgs = {
  mintType: MintingAccessConfigMintingType;
  releaseId: Scalars['UUID'];
};


/** Queries */
export type QueryReleaseBackersCsvUrlArgs = {
  releaseId: Scalars['String'];
};


/** Queries */
export type QueryReleaseCollectedByManyUsersArgs = {
  activityFeedGroupId: Scalars['UUID'];
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryReleaseContractArgs = {
  contractAddress: Scalars['Address'];
  editionId?: InputMaybe<Scalars['String']>;
};


/** Queries */
export type QueryReleaseEarningsArgs = {
  filter?: ArtistMintedReleasesFilter;
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryReleaseFromContractArgs = {
  contractAddress: Scalars['Address'];
  editionId?: InputMaybe<Scalars['String']>;
};


/** Queries */
export type QueryReleaseFromDraftArgs = {
  draftId: Scalars['UUID'];
};


/** Queries */
export type QueryReleaseFromTokenArgs = {
  input: ReleaseFromTokenInput;
};


/** Queries */
export type QueryReleasesArgs = {
  filter?: InputMaybe<ReleasesCursorFilterArgs>;
  pagination?: ReleasesCursorConnectionArgs;
};


/** Queries */
export type QuerySearchArgs = {
  input: SearchInput;
};


/** Queries */
export type QuerySeasonDefaultMintingOptionsArgs = {
  seasonName: Scalars['String'];
};


/** Queries */
export type QueryShelfArgs = {
  id: Scalars['UUID'];
};


/** Queries */
export type QuerySignedUploadParamsArgs = {
  uploadRequest: UploadRequest;
};


/** Queries */
export type QueryTotalAffiliatePurchasesArgs = {
  input?: TotalAffiliatePurchasesInput;
};


/** Queries */
export type QueryTotalReleasesCountArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>;
};


/** Queries */
export type QueryTrackArgs = {
  id: Scalars['UUID'];
};


/** Queries */
export type QueryTrendingArtistInfoArgs = {
  sort: TrendingArtistsSortEnum;
  timePeriod: TimePeriodAggEnum;
};


/** Queries */
export type QueryTrendingCollectorsArgs = {
  sort: TrendingCollectorsSortEnum;
  timePeriod: TimePeriodAggEnum;
};


/** Queries */
export type QueryTrendingPlaylistsArgs = {
  sort: TrendingPlaylistsSortEnum;
  timePeriod: TimePeriodAggEnum;
};


/** Queries */
export type QueryTrendingReleasesArgs = {
  sort: TrendingReleasesSortEnum;
  timePeriod: TimePeriodAggEnum;
};


/** Queries */
export type QueryUserArgs = {
  id: Scalars['UUID'];
};


/** Queries */
export type QueryUserActivityFeedArgs = {
  userId: Scalars['UUID'];
};


/** Queries */
export type QueryUserByAddressArgs = {
  ens?: InputMaybe<Scalars['ENS']>;
  publicAddress?: InputMaybe<Scalars['Address']>;
};


/** Queries */
export type QueryUserByArtistHandleArgs = {
  soundHandle: Scalars['String'];
};


/** Queries */
export type QueryUserLikeActivityFeedArgs = {
  pagination?: CursorConnectionArgs;
  userId: Scalars['UUID'];
};


/** Queries */
export type QueryUserRelationStatusesArgs = {
  users: Array<Scalars['UUID']>;
};


/** Queries */
export type QueryWithdrawableEarningsForReleaseArgs = {
  releaseId: Scalars['UUID'];
};

/** Auction options associated with range bound sales */
export type RangeBoundAuction = {
  __typename?: 'RangeBoundAuction';
  /** List of different max mints per wallet quantity options for free sale */
  freeSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different options of maximum quantity for public sale */
  maxOptions: Array<Scalars['Int']>;
  /** List of different options of minimum quantity for public sale */
  minOptions: Array<Scalars['Int']>;
  /** Minting period duration in minutes */
  mintingPeriodMins: Scalars['Int'];
  /** List of different max mints per wallet quantity options for presale */
  presaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different eth prices options for presale */
  presalePriceOptions?: Maybe<Array<Scalars['Float']>>;
  /** List of different eth prices options for public sale */
  priceOptions: Array<Scalars['Float']>;
  /** List of different max mints per wallet quantity options for public sale */
  publicSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
};

/** Input options to customize range bound auctions */
export type RangeBoundAuctionInput = {
  /** List of different max mints per wallet quantity options for free sale */
  freeSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different options of maximum quantity for public sale */
  maxOptions: Array<Scalars['Int']>;
  /** List of different options of minimum quantity for public sale */
  minOptions: Array<Scalars['Int']>;
  /** Minting period duration in minutes for public sale */
  mintingPeriodMins: Scalars['Int'];
  /** List of different max mints per wallet quantity options for presale */
  presaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
  /** List of different eth prices options for presales */
  presalePriceOptions: Array<Scalars['Float']>;
  /** List of different eth prices options for public sale */
  priceOptions: Array<Scalars['Float']>;
  /** List of different max mints per wallet quantity options for public sale */
  publicSaleMaxMintsPerWalletOptions: Array<Scalars['Int']>;
};

/** Release entity */
export type Release = Node & {
  __typename?: 'Release';
  /** Number of nfts airdropped */
  airdropCount: Scalars['Int'];
  /** Animated cover image of the release if the cover is a GIF. Otherwise, null */
  animatedCoverImage?: Maybe<Media>;
  /** Animated golden egg image optimized for client rendering */
  animatedGoldenEggImageOptimized?: Maybe<Media>;
  /** Artist of release */
  artist: Artist;
  /**
   * CDN url CSV of users that own a release nft or null if no release backers
   * @deprecated Please use Query.releaseBackersCSVUrl
   */
  backerCSVUrl?: Maybe<Scalars['String']>;
  /** Base metadata attributes (non golden egg). */
  baseMetadataAttributes: Array<MetadataAttribute>;
  /** Behind the music text */
  behindTheMusic: Scalars['String'];
  /** Currently claimed song slots */
  claimedSongSlots: Array<Scalars['Int']>;
  /** Collectors of release */
  collectors: ReleaseCollectorConnection;
  /** Contract associated to Sound Edition */
  contract: Contract;
  /** Contract address */
  contractAddress: Scalars['String'];
  /** Cover image of release */
  coverImage: Media;
  /** Release creation date */
  createdAt: Scalars['DateTime'];
  /** Credit split associated with release, if any */
  creditSplit?: Maybe<CreditSplit>;
  /** Users with credits of release */
  credits: Array<User>;
  /**
   * The current maximum quantity for a sale.
   * @deprecated Please use finalQuantity
   */
  currentMaxQuantity: Scalars['Int'];
  /** Edition ID */
  editionId?: Maybe<Scalars['String']>;
  /** EggGame of Release */
  eggGame?: Maybe<EggGame>;
  /** Associated external url */
  externalUrl?: Maybe<Scalars['String']>;
  /** Final quantity for a release. Will be defined as soon as a max quantity has been determined */
  finalQuantity?: Maybe<Scalars['Int']>;
  /** Last sale schedule end time as ISO Date String */
  finalSaleScheduleEndTime?: Maybe<Scalars['DateTime']>;
  /** Last sale schedule end time as number of milliseconds since the ECMAScript epoch. */
  finalSaleScheduleEndTimestamp?: Maybe<Scalars['Timestamp']>;
  /** Address set as funds recipient on the contract */
  fundingAddress: Scalars['String'];
  /** Genre of Release */
  genre: Genre;
  /** Special golden egg image */
  goldenEggImage: Media;
  /** Is the release a range bound edition */
  hasRangeBoundSale: Scalars['Boolean'];
  /** Release identifier */
  id: Scalars['ID'];
  /** Is release sold out relative to the final quantity */
  isFinalSoldOut: Scalars['Boolean'];
  /** Associated laylo.com url */
  layloUrl?: Maybe<Scalars['String']>;
  /** Paginate through users who like this release. */
  likedBy: UserConnection;
  /** Associated market place url */
  marketPlaceUrl?: Maybe<Scalars['String']>;
  /** Public sale start time in UNIX timestamp */
  mintStartTime: Scalars['Int'];
  /** Public sale start timestamp */
  mintStartTimestamp: Scalars['Timestamp'];
  /** NFTs of Release */
  nftsPaginated: NftConnection;
  /** Unique number of users that own a release nft */
  numBackers: Scalars['Int'];
  /** Amount of sold NFTs */
  numSold: Scalars['Int'];
  /** Associated opensea url */
  openseaUrl?: Maybe<Scalars['String']>;
  /**
   * Max Quantity for a releases presale.
   * @deprecated There may be multiple presale phases, use Release.saleSchedules instead
   */
  presaleUpperBound?: Maybe<Scalars['Int']>;
  /** Price in Wei */
  price: Scalars['String'];
  /** Public listening party start time as number of milliseconds since the ECMAScript epoch. */
  publicListeningParty: Scalars['Timestamp'];
  /** Public minting start time */
  publicMintStart: Scalars['DateTime'];
  /** Quantity of available NFTs */
  quantity: Scalars['Int'];
  /** Lower bound quantity for a releases main sale. */
  quantityLowerBound: Scalars['Int'];
  /** Upper bound quantity for a releases main sale. */
  quantityUpperBound: Scalars['Int'];
  /** Rewards of Release */
  rewards: Array<Reward>;
  /** Creator royalty basis points */
  royaltyBps: Scalars['Int'];
  /** Minting periods */
  saleSchedules: Array<SaleSchedule>;
  /** Unique list of affiliate fees percent ordered by start time of sale schedule */
  salesAffiliateFeesPercent: Array<Scalars['String']>;
  /** Edition schedule identifiers, used to optimize chain calls */
  scheduleIds?: Maybe<Array<ScheduleIdentifier>>;
  /** Season associated to release */
  season?: Maybe<Scalars['String']>;
  /** Shelves where the release has been added to */
  shelves: ShelfConnection;
  /** Static version of animated cover image of release if the cover is a GIF. Otherwise, null */
  staticCoverImage?: Maybe<Media>;
  /** Release title */
  title: Scalars['String'];
  /** Slugified title */
  titleSlug: Scalars['String'];
  /** Top 100 Nfts with comment, earlier serial numbers get precedence for conflicting song slots */
  topNftsWithComment: Array<NftWithComment>;
  /** Total raised in Wei */
  totalRaised: Scalars['String'];
  /** Total amount raised from primary sales converted from eth to usd */
  totalRaisedPrimaryUsd: Scalars['Float'];
  /** Total amount raised from primary sales converted from eth to usd */
  totalRaisedSecondaryUsd: Scalars['Float'];
  /** Track of release */
  track: Track;
  /** Type of Release */
  type: ReleaseType;
  /**
   * Total number of upload steps
   * @deprecated No longer concept of upload steps with new draft model
   */
  uploadSteps: Scalars['Int'];
  /**
   * Total number of upload steps with new draft model
   * @deprecated No longer concept of upload steps with new draft model
   */
  uploadStepsComplete: Scalars['Int'];
  /** Web HTML iframe embed */
  webEmbed: Scalars['String'];
  /** Webapp URI of Release */
  webappUri: Scalars['String'];
};


/** Release entity */
export type ReleaseCollectorsArgs = {
  pagination?: ReleaseCollectorCursorConnectionArgs;
};


/** Release entity */
export type ReleaseLikedByArgs = {
  pagination?: CursorConnectionArgs;
};


/** Release entity */
export type ReleaseNftsPaginatedArgs = {
  pagination?: NftCursorConnectionArgs;
};


/** Release entity */
export type ReleaseShelvesArgs = {
  filter?: InputMaybe<ReleaseShelvesFilter>;
  pagination?: ReleaseShelvesCursorConnectionArgs;
};


/** Release entity */
export type ReleaseWebEmbedArgs = {
  input?: ReleaseWebEmbedInput;
};


/** Release entity */
export type ReleaseWebappUriArgs = {
  input?: InputMaybe<ReleaseWebappUriInput>;
};

/** Release action entity */
export type ReleaseAction = {
  /** Date of action */
  date: Scalars['DateTime'];
  /** Release action id */
  id: Scalars['ID'];
  /** User corresponding to action entity */
  user: User;
};

/** Paginated collector action connection */
export type ReleaseActionConnection = Connection & {
  __typename?: 'ReleaseActionConnection';
  /** Edges of current page */
  edges: Array<ReleaseActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of collector action connection */
export type ReleaseActionConnectionEdge = Edge & {
  __typename?: 'ReleaseActionConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Release action node */
  node: ReleaseAction;
};

/** Filter release activity types */
export type ReleaseActivityFeedFilterArgs = {
  /** Only get activity of given type */
  types?: Array<ReleaseActivityFeedTypeFilterOption>;
};

/** Release activity feed type filter option */
export enum ReleaseActivityFeedTypeFilterOption {
  All = 'ALL',
  Collections = 'COLLECTIONS',
  Likes = 'LIKES',
  Playlists = 'PLAYLISTS',
  Releases = 'RELEASES'
}

/** Aggregate of all affiliate purchases of specific affiliate user and release */
export type ReleaseAffiliateTotalPurchases = Node & {
  __typename?: 'ReleaseAffiliateTotalPurchases';
  /** Affiliate that referred the purchase */
  affiliate: User;
  /** Total of earnings in eth associated with affiliate purchases */
  earningsETH: Scalars['String'];
  /** Total of earnings in wei associated with affiliate purchases */
  earningsWei: Scalars['String'];
  /** Unique identifier from release id and affiliate address */
  id: Scalars['ID'];
  /** Quantity of purchases */
  purchasesQuantity: Scalars['Int'];
  /** Release associated to affiliate purchases */
  release: Release;
};

/** Paginated release affiliates total purchases connection */
export type ReleaseAffiliateTotalPurchasesConnection = Connection & {
  __typename?: 'ReleaseAffiliateTotalPurchasesConnection';
  /** Edges of current page */
  edges: Array<ReleaseAffiliateTotalPurchasesEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Pagination parameters for total release affiliate purchases */
export type ReleaseAffiliateTotalPurchasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 25 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 25 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: ReleaseAffiliateTotalPurchasesCursorConnectionSort;
};

/** Customize the sort behavior of release affiliates total purchases */
export type ReleaseAffiliateTotalPurchasesCursorConnectionSort = {
  /** Sort by block number */
  blockNumber?: InputMaybe<SortOrder>;
};

/** ReleaseAffiliateTotalPurchases edge */
export type ReleaseAffiliateTotalPurchasesEdge = Edge & {
  __typename?: 'ReleaseAffiliateTotalPurchasesEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** ReleaseAffiliateTotalPurchases Entity */
  node: ReleaseAffiliateTotalPurchases;
};

/** Release album reveal filter option */
export enum ReleaseAlbumRevealFilterOption {
  All = 'ALL',
  OnlyNotRevealedAlbums = 'ONLY_NOT_REVEALED_ALBUMS',
  OnlyRevealedAlbums = 'ONLY_REVEALED_ALBUMS'
}

/** Minting access configuration information. */
export type ReleaseArweaveOutputs = {
  __typename?: 'ReleaseArweaveOutputs';
  /** Base arweave hash of release */
  arweaveHash: Scalars['String'];
  /** Storefront arweave hash of release */
  storefrontArweaveHash: Scalars['String'];
};

/** Release collector */
export type ReleaseCollector = Node & {
  __typename?: 'ReleaseCollector';
  /** First release nft collected by user */
  firstNftCollected: Nft;
  /** Date of first nft collected */
  firstNftCollectedDate: Scalars['DateTime'];
  /** Unique id of release collector */
  id: Scalars['ID'];
  /** Lowest nft serial number collected */
  lowestNftSerialNumber: Scalars['Int'];
  /** Lowest serial number release nft collected by user */
  lowestSerialNumberNftCollected: Nft;
  /** Amount of release nfts owned */
  nftsCount: Scalars['Int'];
  /** Release entity */
  release: Release;
  /** Collector user */
  user: User;
};

/** Paginated connection of Release Collectors */
export type ReleaseCollectorConnection = Connection & {
  __typename?: 'ReleaseCollectorConnection';
  /** Edges of current page */
  edges: Array<ReleaseCollectorConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Release Collector Connection */
export type ReleaseCollectorConnectionEdge = Edge & {
  __typename?: 'ReleaseCollectorConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** ReleaseCollector node */
  node: ReleaseCollector;
};

/** Pagination paramaters for artist collectors */
export type ReleaseCollectorCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: ReleaseCollectorCursorConnectionSort;
};

/** Customize sort of collectors */
export type ReleaseCollectorCursorConnectionSort = {
  /** Sort by first nft collected date */
  firstNftCollectedDate?: InputMaybe<SortOrder>;
  /** Sort by lowest owned serial number */
  lowestOwnedSerialNumber?: InputMaybe<SortOrder>;
  /** Sort by amount nfts collected, with tie-breaker of earliest collector first */
  nftsCount?: InputMaybe<SortOrder>;
};

/** Info associated with release draft allowlist */
export type ReleaseCollectorsAllowlist = {
  __typename?: 'ReleaseCollectorsAllowlist';
  /** Flag to include or not include all artist collaborations */
  allArtistCollaborations: Scalars['Boolean'];
  /** Flag to include or not include all artist releases */
  allArtistReleases: Scalars['Boolean'];
  /** Paginated releases of draftAllowlist taking into account artist releases and collaborator flags */
  filteredReleases: ReleaseConnection;
  /**
   * Paginated releases of draftAllowlist
   * @deprecated Please use ReleaseCollectorsAllowlist.filteredReleases
   */
  releases: ReleaseConnection;
  /** Total number of release collector users in draft allowlist */
  totalCollectors: Scalars['Int'];
};

/** Paginated releases connection */
export type ReleaseConnection = Connection & {
  __typename?: 'ReleaseConnection';
  /** Edges of current page */
  edges: Array<ReleaseConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Release Connection */
export type ReleaseConnectionEdge = Edge & {
  __typename?: 'ReleaseConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Release node */
  node: Release;
};

/** Union of release contract types */
export type ReleaseContractEarning = ArtistContractEarning | EditionContractEarning;

/** Input values for release admin update */
export type ReleaseDetailsInput = {
  /** Artist story of release */
  behindTheMusic?: InputMaybe<Scalars['String']>;
  /** Description of release */
  description?: InputMaybe<Scalars['String']>;
  /** Description of golden egg */
  eggDescription?: InputMaybe<Scalars['String']>;
  /** Season of release */
  season?: InputMaybe<Scalars['String']>;
  /** Title of release */
  title?: InputMaybe<Scalars['String']>;
  /** Title slug of release */
  titleSlug?: InputMaybe<Scalars['String']>;
  /** E.g. Single, Album */
  type?: InputMaybe<Scalars['String']>;
};

/** Release dropped action entity */
export type ReleaseDropped = ArtistAction & Node & ReleaseAction & {
  __typename?: 'ReleaseDropped';
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** New releases added to playlist in action */
  releasesAdded: Release;
  /** User corresponding to action entity */
  user: User;
};

/** Release dropped aggregate */
export type ReleaseDroppedAggregate = {
  __typename?: 'ReleaseDroppedAggregate';
  /** Release dropped action in activity feed group */
  release: Release;
};

/** Release earnings of a user */
export type ReleaseEarnings = Node & {
  __typename?: 'ReleaseEarnings';
  /** Earnings on a contract. */
  earning: ReleaseContractEarning;
  /** Id of the associated release */
  id: Scalars['ID'];
  /** Ownership percentage of the user in the release */
  ownershipPercent: Scalars['Float'];
  /** release primary revenue */
  primaryRevenue: Scalars['String'];
  /** Release entity */
  release: Release;
  /** Release secondary royalties */
  secondaryRoyalties: Scalars['String'];
  /** Split contract earnings associated to release. */
  splitContract?: Maybe<SplitsContractEarning>;
  /** Split main balance attributable to release */
  splitMainBalanceFromRelease: Scalars['String'];
  /** Total withdrawable amount for user */
  totalWithdrawableForUser: Scalars['String'];
};

/** Paginated connection of Release Earnings */
export type ReleaseEarningsConnection = Connection & {
  __typename?: 'ReleaseEarningsConnection';
  /** Edges of current page */
  edges: Array<ReleaseEarningsConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Release Earnings Connection */
export type ReleaseEarningsConnectionEdge = Edge & {
  __typename?: 'ReleaseEarningsConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Release Earnings node */
  node: ReleaseEarnings;
};

/** Input for "releaseFromToken" query */
export type ReleaseFromTokenInput = {
  /** Contract address of release */
  contractAddress: Scalars['Address'];
  /** Token chain identifier */
  tokenId: Scalars['String'];
};

/** Simplified version of Release entity */
export type ReleaseInfo = Node & {
  __typename?: 'ReleaseInfo';
  /** Release artistId */
  artistId: Scalars['String'];
  /** Artist name of release */
  artistName: Scalars['String'];
  /** Artist user id */
  artistUserId: Scalars['String'];
  /** Cover image of release */
  coverImage: Media;
  /** User ids of release credits */
  creditUserIds: Array<Scalars['String']>;
  /** Unique identifier of Artist */
  id: Scalars['ID'];
  /** Static version of animated cover image of release if the cover is a GIF. Otherwise, null */
  staticCoverImage?: Maybe<Media>;
  /** Release title */
  title: Scalars['String'];
};

/** Release info upload step input values */
export type ReleaseInfoUploadStepInput = {
  /** Release beats per minute */
  beatsPerMinute?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Behind the music text */
  behindTheMusic: Scalars['String'];
  /** Cover image */
  coverImage: UploadedMedia;
  /** Release genre */
  genre: Scalars['String'];
  /** Release key */
  key?: InputMaybe<SongKeyType>;
  /** License for the release */
  license?: InputMaybe<LicenseType>;
  /** Location where the release was created */
  location?: InputMaybe<Scalars['CountryCode']>;
  /** Release lyrics */
  lyrics?: InputMaybe<Scalars['String']>;
  /** Static cover image to use in place of animated cover image */
  staticCoverImage?: InputMaybe<UploadedMedia>;
  /** Title */
  title: Scalars['String'];
  /** Token symbol */
  tokenSymbol: Scalars['String'];
  /** Uploaded tracks */
  tracks: Array<TrackUpload>;
  /** Release type */
  type: ReleaseType;
};

/** Release liked action entity */
export type ReleaseLiked = ArtistAction & CollectorAction & LikeAction & Node & ReleaseAction & {
  __typename?: 'ReleaseLiked';
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Release corresponding to release liked action entity */
  release: Release;
  /** User corresponding to release liked action entity */
  user: User;
};

/** Meta input values for release */
export type ReleaseMetaInput = {
  /** Associated external url */
  externalUrl?: InputMaybe<Scalars['URL']>;
  /** Associated laylo.com url */
  layloUrl?: InputMaybe<Scalars['URL']>;
  /** Associated opensea url */
  openseaUrl?: InputMaybe<Scalars['URL']>;
};

/** Filter the releases to be searched */
export type ReleaseSearchFilter = {
  /** Filters on release type */
  type?: InputMaybe<Array<ReleaseType>>;
};

/** Pagination parameters of release shelves */
export type ReleaseShelvesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: ReleaseShelvesCursorConnectionSort;
};

/** Customize sort of release shelves */
export type ReleaseShelvesCursorConnectionSort = {
  /** Sort by date of release being added in the shelf */
  addedAtDate?: InputMaybe<SortOrder>;
};

/** Filter release shelves */
export type ReleaseShelvesFilter = {
  /** Filter shelves to be included by identifier. You can only specify up to 51 shelves. */
  shelfIds?: InputMaybe<Array<Scalars['UUID']>>;
};

/** Release current status type */
export enum ReleaseStatus {
  AvailableToMint = 'AVAILABLE_TO_MINT',
  SoldOut = 'SOLD_OUT'
}

/** Release type, currently the platform only supports "SINGLE" */
export enum ReleaseType {
  Album = 'ALBUM',
  AlbumTrack = 'ALBUM_TRACK',
  Single = 'SINGLE'
}

/** Release unliked action entity */
export type ReleaseUnliked = ArtistAction & CollectorAction & LikeAction & Node & {
  __typename?: 'ReleaseUnliked';
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Release corresponding to unliked release action entity */
  release: Release;
  /** User corresponding to unliked release action entity */
  user: User;
};

/** Input for Release.webEmbed */
export type ReleaseWebEmbedInput = {
  /** Customize html parameters */
  html?: IframeHtmlParameters;
  /** Referral address */
  referralAddress?: InputMaybe<Scalars['Address']>;
};

/** Customize webapp uri parameters of release */
export type ReleaseWebappUriInput = {
  /** Referral address */
  referralAddress?: InputMaybe<Scalars['Address']>;
};

/** Releases added AND removed to a playlist in the same playlist action entity */
export type ReleasesAddedRemovedFromPlaylist = ArtistAction & CollectorAction & Node & PlaylistAction & ReleaseAction & {
  __typename?: 'ReleasesAddedRemovedFromPlaylist';
  /** Releases added to playlist */
  addedReleases: ReleaseConnection;
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Total number of releases added to the playlist */
  numAddedReleases: Scalars['Int'];
  /** Total number of releases removed from the playlist */
  numRemovedReleases: Scalars['Int'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
  /** Releases removed from playlist */
  removedReleases: ReleaseConnection;
  /** User corresponding to action entity */
  user: User;
};


/** Releases added AND removed to a playlist in the same playlist action entity */
export type ReleasesAddedRemovedFromPlaylistAddedReleasesArgs = {
  pagination?: PlaylistActionReleasesCursorConnectionArgs;
};


/** Releases added AND removed to a playlist in the same playlist action entity */
export type ReleasesAddedRemovedFromPlaylistRemovedReleasesArgs = {
  pagination?: PlaylistActionReleasesCursorConnectionArgs;
};

/** Releases added to playlist action entity */
export type ReleasesAddedToPlaylist = ArtistAction & CollectorAction & Node & PlaylistAction & ReleaseAction & {
  __typename?: 'ReleasesAddedToPlaylist';
  /** New releases added to playlist */
  addedReleases: ReleaseConnection;
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Returns whether playlist was created with this action */
  isPlaylistCreated: Scalars['Boolean'];
  /** Total number of releases added to the playlist */
  numAddedReleases: Scalars['Int'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
  /**
   * New releases added to playlist in action. Limited to 10 results
   * @deprecated Use allAddedReleases
   */
  releasesAdded: Array<Release>;
  /** User corresponding to action entity */
  user: User;
};


/** Releases added to playlist action entity */
export type ReleasesAddedToPlaylistAddedReleasesArgs = {
  pagination?: PlaylistActionReleasesCursorConnectionArgs;
};

/** Releases added to shelf aggregate */
export type ReleasesAddedToShelfAggregate = {
  __typename?: 'ReleasesAddedToShelfAggregate';
  /** New releases added to shelf in an activity feed group */
  releasesAdded: Array<ShelfRelease>;
  /** Shelf that releases are added to in activity feed group */
  shelf?: Maybe<Shelf>;
};

/** Pagination parameters for releases connection */
export type ReleasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Start after the first "skip" entities based. It can't be specified alongside "after" or "before" */
  skip?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior of releases pagination */
  sort?: ReleasesCursorConnectionSort;
};

/** Customize sort behavior of releases pagination */
export type ReleasesCursorConnectionSort = {
  /** Sort by createdAt of release */
  createdAt?: InputMaybe<SortOrder>;
  /** Sort by mintStartTime of release */
  mintStartTime?: InputMaybe<SortOrder>;
};

/** Filter releases */
export type ReleasesCursorFilterArgs = {
  /** Specify up to 50 contracts to filter the releases */
  contracts?: InputMaybe<Array<ContractReleaseInput>>;
  /** Only get releases from specified genres */
  genre?: InputMaybe<Array<Scalars['String']>>;
  /** Remove currently-featured releases from results */
  hideFeatured?: InputMaybe<Scalars['Boolean']>;
  /** Only get releases less or equal to than specified mint time */
  mintTimeMaxDate?: InputMaybe<Scalars['Timestamp']>;
  /** Only get releases greater than or equal to specified mint time */
  mintTimeMinDate?: InputMaybe<Scalars['Timestamp']>;
  /** Only get release with specified mint time status */
  mintTimeStatus?: InputMaybe<Array<MintTimeStatus>>;
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: InputMaybe<ReleaseAlbumRevealFilterOption>;
  /** Only get release with specified status */
  releaseStatus?: InputMaybe<Array<ReleaseStatus>>;
  /** Filters on release type */
  releaseType?: Array<ReleaseType>;
  /** Only get releases from specified seasons */
  season?: InputMaybe<Array<ArtistSeason>>;
};

/** Release removed from playlist entity */
export type ReleasesRemovedFromPlaylist = CollectorAction & Node & PlaylistAction & {
  __typename?: 'ReleasesRemovedFromPlaylist';
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Total number of releases removed from the playlist */
  numRemovedReleases: Scalars['Int'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
  /** First release removed from playlist */
  releaseRemoved: Release;
  /** Releases removed from playlist */
  removedReleases: ReleaseConnection;
  /** User corresponding to action entity */
  user: User;
};


/** Release removed from playlist entity */
export type ReleasesRemovedFromPlaylistRemovedReleasesArgs = {
  pagination?: PlaylistActionReleasesCursorConnectionArgs;
};

/** Input for `addReleaseToShelf` mutation */
export type RemoveReleaseFromShelfInput = {
  /** Release identifier to be removed */
  releaseId: Scalars['UUID'];
  /** Identifier of owned target shelf */
  shelfId: Scalars['UUID'];
};

/** Input for reportPlayStopped mutation */
export type ReportPlayStoppedInput = {
  /** End of play session */
  finish: Scalars['Timestamp'];
  /** Duration of play in seconds */
  listenDuration: Scalars['Int'];
  /** Amount of pauses on the same session */
  pauseCount: Scalars['Int'];
  /** Start of play session */
  start: Scalars['Timestamp'];
  /** Track UUID */
  trackId: Scalars['UUID'];
  /** Random UUID generated by client-side */
  uuid: Scalars['String'];
};

/** Reward entity */
export type Reward = {
  __typename?: 'Reward';
  /** Reward description */
  description: Scalars['String'];
  /** Reward identifier */
  id: Scalars['ID'];
  /** Amount of backers of reward */
  numOfBackers: Scalars['Int'];
  /** Price of reward */
  price: Scalars['String'];
  /** Reward title */
  title: Scalars['String'];
};

/** Custom rewards input */
export type RewardInput = {
  /** Reward description */
  description: Scalars['String'];
  /** Reward name */
  title: Scalars['String'];
};

/** Release info upload step info */
export type RewardUploadStepInfo = {
  __typename?: 'RewardUploadStepInfo';
  /** Reward description */
  description: Scalars['String'];
  /** Reward name */
  title: Scalars['String'];
};

/** Release info upload step info */
export type RewardsUploadStepInfo = {
  __typename?: 'RewardsUploadStepInfo';
  /** Special golden egg images */
  goldenEggImages: Array<MediaUploadStepInfo>;
  /** Custom rewards */
  rewards: Array<RewardUploadStepInfo>;
};

/** Release rewards upload step input values */
export type RewardsUploadStepInput = {
  /** Special golden egg images */
  goldenEggImages: Array<UploadedMedia>;
  /** Custom rewards */
  rewards?: InputMaybe<Array<RewardInput>>;
};

/** Single sale schedule information of Release Presale Configuration */
export type SaleSchedule = {
  __typename?: 'SaleSchedule';
  /** Affiliate fee in basis points within schedule sales */
  affiliateFeeBPS: Scalars['Int'];
  /** Percentage of affiliate fee within schedule sales */
  affiliateFeePercent: Scalars['String'];
  /** Total minted for specific sale schedule associated with artist contracts. To not be used for new editions */
  artistContractTotalMinted?: Maybe<Scalars['Int']>;
  /** End Time of Sale Schedule */
  endTime: Scalars['DateTime'];
  /** UUID of Sale Schedule entity */
  id: Scalars['ID'];
  /** Is the current sale schedule presale */
  isPresale: Scalars['Boolean'];
  /** Amount to be allowed to be sold for sale schedule */
  maxMintable: Scalars['Int'];
  /** Merkle tree root hash derived from sale schedule allowlist */
  merkleTreeRoot?: Maybe<Scalars['String']>;
  /** Price for the specific sale schedule */
  price: Scalars['String'];
  /** Start Time of Sale Schedule */
  startTime: Scalars['DateTime'];
};

/** Edition schedule identifiers, used to optimize chain calls */
export type ScheduleIdentifier = {
  __typename?: 'ScheduleIdentifier';
  /** Identifier of schedules by minter address */
  mintIds: Array<Scalars['Int']>;
  /** Minter address of schedule */
  minterAddress: Scalars['String'];
};

/** Pagination arguments for search */
export type SearchConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 20 nodes. */
  first?: Scalars['PositiveInt'];
};

/** Input for "search" query */
export type SearchInput = {
  /** How many entities to be fetched for fixed lists, maximum of 20 */
  limit?: Scalars['PositiveInt'];
  /** Text search */
  text: Scalars['String'];
};

/** Search result */
export type SearchResult = {
  __typename?: 'SearchResult';
  /** Artists that match the search input, including artists where any of their releases matches the given input */
  artists: Array<Artist>;
  /** Paginated artists that match the search input, including artists where any of their releases matches the given input */
  artistsPaginated: ArtistConnection;
  /** Paginated collectors that match the search input within the ens, twitter handle, displayName and publicAddress */
  collectors: UserConnection;
  /** Unique identifier of search result */
  id: Scalars['ID'];
  /** Releases that match the search input, including releases where the artist name matches the given input */
  releases: Array<Release>;
  /** Paginated releases that match the search input, including releases where the artist name matches the given input */
  releasesPaginated: ReleaseConnection;
  /** Paginated shelves that match the search input within the shelf name, releases titles and artists names */
  shelves: ShelfConnection;
};


/** Search result */
export type SearchResultArtistsArgs = {
  limit?: InputMaybe<Scalars['PositiveInt']>;
};


/** Search result */
export type SearchResultArtistsPaginatedArgs = {
  pagination?: SearchConnectionArgs;
};


/** Search result */
export type SearchResultCollectorsArgs = {
  pagination?: SearchConnectionArgs;
};


/** Search result */
export type SearchResultReleasesArgs = {
  filter?: InputMaybe<ReleaseSearchFilter>;
  limit?: InputMaybe<Scalars['PositiveInt']>;
};


/** Search result */
export type SearchResultReleasesPaginatedArgs = {
  filter?: InputMaybe<ReleaseSearchFilter>;
  pagination?: SearchConnectionArgs;
};


/** Search result */
export type SearchResultShelvesArgs = {
  pagination?: SearchConnectionArgs;
};

/** Season auction defaults for sales */
export type SeasonAuctionDefaults = {
  __typename?: 'SeasonAuctionDefaults';
  /** Creation date of entity */
  createdAt: Scalars['DateTime'];
  /** Season auction defaults entity identifier */
  id: Scalars['ID'];
  /** Default season */
  season: Scalars['String'];
};

/** Default reference season-based auction options for administration */
export type SeasonDefaultOptions = {
  __typename?: 'SeasonDefaultOptions';
  /** Auction options union based on type */
  auction: Array<Auction>;
};

/** Collector release added to playlist action entity */
export type SecondarySale = ArtistAction & CollectorAction & Node & ReleaseAction & {
  __typename?: 'SecondarySale';
  /** Amount paid in Wei for secondary sale */
  amountPaidInWei: Scalars['String'];
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** User that nft was purchased from for secondary sale action */
  purchasedFromUser: User;
  /** Release corresponding to collector secondary sale action entity */
  release: Release;
  /** Serial number of nft secondary sale purchase */
  serialNumber: Scalars['Int'];
  /** User corresponding to collector action entity */
  user: User;
};

/** Input for setArtistMeta mutation */
export type SetArtistMetaInput = {
  /** Artist identifier */
  artistId: Scalars['String'];
  /** Artist meta configuration data */
  metaType?: InputMaybe<ArtistMetaInput>;
};

/** Input for setReleaseDetails mutation */
export type SetReleaseDetailsInput = {
  /** Release details input values */
  releaseDetails: ReleaseDetailsInput;
  /** Release identifier */
  releaseId: Scalars['String'];
};

/** Input for setReleaseMeta mutation */
export type SetReleaseMetaInput = {
  /** Meta input values */
  metaType?: InputMaybe<ReleaseMetaInput>;
  /** Release identifier */
  releaseId: Scalars['String'];
};

/** Input fields to set releases to shelf */
export type SetReleasesForShelfInput = {
  /** List of releaseIds to set to shelf */
  releaseIds: Array<Scalars['UUID']>;
  /** Shelf id to set releases to */
  shelfId: Scalars['UUID'];
};

/** Shelf entity */
export type Shelf = Node & {
  __typename?: 'Shelf';
  /** Top 4 releases to be used as cover for shelf */
  coverReleases: Array<Release>;
  /** Shelf creation date */
  createdAt: Scalars['DateTime'];
  /** Shelf deletion date */
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** Description of shelf */
  description?: Maybe<Scalars['String']>;
  /** Return shelves from where it was possibly extended. If the source shelf is not currently available, it's returned as null */
  extendedFrom?: Maybe<Array<Maybe<Shelf>>>;
  /** Shelf identifier */
  id: Scalars['ID'];
  /** Relative ordering of the shelves for each user */
  index: Scalars['Int'];
  /** Paginate through users who like this shelf. */
  likedBy: UserConnection;
  /** Number of likes for the shelf. */
  likes: Scalars['Int'];
  /** Link slug used to reference and request specific shelf */
  linkSlug: Scalars['String'];
  /** Shelf name */
  name: Scalars['String'];
  /** Total play time of all releases in a shelf in seconds */
  playTimeInSeconds: Scalars['Int'];
  /** Top 4 releases to be used as preview for shelf */
  previewReleases: Array<ShelfRelease>;
  /** Number of releases in a shelf */
  releaseCount: Scalars['Int'];
  /** List of release identifiers in the shelf, ordered ascendingly by index within shelf */
  releaseIds: Array<Scalars['String']>;
  /** Paginated releases of shelf */
  releases: ShelfReleaseConnection;
  /** List of track identifiers in the shelf, ordered ascendingly by index within shelf */
  trackIds: Array<Scalars['String']>;
  /** Type of shelf */
  type: ShelfType;
  /** Owner of shelf */
  user: User;
  /** Web HTML iframe embed */
  webEmbed: Scalars['String'];
  /** Webapp URI of Shelf */
  webappUri: Scalars['String'];
};


/** Shelf entity */
export type ShelfLikedByArgs = {
  pagination?: CursorConnectionArgs;
};


/** Shelf entity */
export type ShelfReleaseIdsArgs = {
  sort?: ShelfReleasesSort;
};


/** Shelf entity */
export type ShelfReleasesArgs = {
  pagination?: ShelfReleaseCursorConnectionArgs;
};


/** Shelf entity */
export type ShelfTrackIdsArgs = {
  sort?: ShelfReleasesSort;
};


/** Shelf entity */
export type ShelfWebEmbedArgs = {
  input?: ShelfWebEmbedInput;
};

/** Paginated shelves connection */
export type ShelfConnection = Connection & {
  __typename?: 'ShelfConnection';
  /** Edges of current page */
  edges: Array<ShelfConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Shelf Node edge */
export type ShelfConnectionEdge = Edge & {
  __typename?: 'ShelfConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Shelf Entity */
  node: Shelf;
};

/** Shelf created aggregate */
export type ShelfCreatedAggregate = {
  __typename?: 'ShelfCreatedAggregate';
  /** Shelf creation action in activity feed group */
  shelf?: Maybe<Shelf>;
};

/** Cursor connection parameters for shelves */
export type ShelfCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: ShelfCursorConnectionSort;
};

/** Customize the sort behavior of shelves pagination */
export type ShelfCursorConnectionSort = {
  /** Sort by created at date */
  createdAt?: InputMaybe<SortOrder>;
  /** Sort by shelf index value */
  index?: InputMaybe<SortOrder>;
};

/** Shelf release entity */
export type ShelfRelease = Node & {
  __typename?: 'ShelfRelease';
  /** Date of release being added in shelf */
  addedAt: Scalars['Timestamp'];
  /** Shelf Release identifier */
  id: Scalars['ID'];
  /** Index of release within shelf */
  index: Scalars['Int'];
  /** First backed nft of possibly collected release */
  ownedFirstNft?: Maybe<Nft>;
  /** Returns golden egg if user owns, otherwise null */
  ownedGoldenEgg?: Maybe<EggGame>;
  /** List of possibly owned nft serial numbers in ascending serial number order. If user does not own the release, it returns null */
  ownedSerialNumbers?: Maybe<Array<Scalars['Int']>>;
  /** Release of the shelf */
  release: Release;
};

/** Paginated shelf release connection */
export type ShelfReleaseConnection = Connection & {
  __typename?: 'ShelfReleaseConnection';
  /** Edges of current page */
  edges: Array<ShelfReleaseConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Shelf release node edge */
export type ShelfReleaseConnectionEdge = Edge & {
  __typename?: 'ShelfReleaseConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Shelf release entity */
  node: ShelfRelease;
};

/** Cursor connection parameters for shelf releases */
export type ShelfReleaseCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Customize sort behavior */
  sort?: ShelfReleaseCursorConnectionSort;
};

/** Customize the sort behavior of releases within shelf pagination */
export type ShelfReleaseCursorConnectionSort = {
  /** Sort by date when the release was added into shelf */
  addedAtDate?: InputMaybe<SortOrder>;
  /** Sort by release index value */
  index?: InputMaybe<SortOrder>;
};

/** Customize sort behavior of shelf releases */
export type ShelfReleasesSort = {
  /** Sort by release added to shelf date */
  addedToShelfDate?: InputMaybe<SortOrder>;
  /** Sort by release index of shelf */
  index?: SortOrder;
};

/** Shelf type */
export enum ShelfType {
  Default = 'DEFAULT',
  UserLikedSounds = 'USER_LIKED_SOUNDS'
}

/** Filter based the type of shelf */
export enum ShelfTypeFilter {
  All = 'ALL',
  Liked = 'LIKED',
  UserCreated = 'USER_CREATED'
}

/** Input for Shelf.webEmbed */
export type ShelfWebEmbedInput = {
  /** Customize html parameters */
  html?: IframeHtmlParameters;
};

/** AWS Presigned multi-part upload url for a given part number */
export type SignedMultipartUrl = {
  __typename?: 'SignedMultipartUrl';
  /** Upload part number */
  partNumber: Scalars['Int'];
  /** Target URL for upload process */
  url: Scalars['String'];
};

/** Song collected by many aggregate */
export type SongCollectedByManyAggregate = {
  __typename?: 'SongCollectedByManyAggregate';
  /** Release corresponding to most recent purchase action in activity feed group */
  collectedRelease: ActivityFeedGroupCollectedRelease;
  /** Featured collectors that purchased same release in an activity feed group */
  featuredCollectors: Array<ActivityFeedGroupFeaturedCollector>;
  /** Number of collectors that purchased same release in an activity feed group */
  numCollectors: Scalars['Int'];
};

/** Key the release was written in */
export enum SongKeyType {
  AFlatMajor = 'A_FLAT_MAJOR',
  AMajor = 'A_MAJOR',
  AMinor = 'A_MINOR',
  BFlatMajor = 'B_FLAT_MAJOR',
  BFlatMinor = 'B_FLAT_MINOR',
  BMajor = 'B_MAJOR',
  BMinor = 'B_MINOR',
  CMajor = 'C_MAJOR',
  CMinor = 'C_MINOR',
  CSharpMinor = 'C_SHARP_MINOR',
  DFlatMajor = 'D_FLAT_MAJOR',
  DMajor = 'D_MAJOR',
  DMinor = 'D_MINOR',
  EFlatMajor = 'E_FLAT_MAJOR',
  EFlatMinor = 'E_FLAT_MINOR',
  EMajor = 'E_MAJOR',
  EMinor = 'E_MINOR',
  FMajor = 'F_MAJOR',
  FMinor = 'F_MINOR',
  FSharpMajor = 'F_SHARP_MAJOR',
  FSharpMinor = 'F_SHARP_MINOR',
  GMajor = 'G_MAJOR',
  GMinor = 'G_MINOR',
  GSharpMinor = 'G_SHARP_MINOR'
}

/** Ascending or Descending sort */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Splits contract earnings */
export type SplitsContractEarning = {
  __typename?: 'SplitsContractEarning';
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String'];
  /** Address of the split wallet */
  contractAddress: Scalars['String'];
  /** List of addresses that are on the split. Sorted for passing into distributeEth transaction */
  participantAddresses: Array<Scalars['String']>;
  /** List of allocations for each participant. Matches ordering of participantAddresses */
  participantAllocations: Array<Scalars['Int']>;
  /** Total eth on the contract */
  totalBalance: Scalars['String'];
};

/** Splits upload step info */
export type SplitsUploadStepInfo = {
  __typename?: 'SplitsUploadStepInfo';
  /** Split contract address */
  splitContractAddress?: Maybe<Scalars['String']>;
  /** Splits auction configurations */
  splits: Array<CreditAllocationUploadStepInfo>;
};

/** Splits upload step input values */
export type SplitsUploadStepInput = {
  /** Credit allocations of credit split */
  splits: Array<Allocation>;
};

/** Basic stats information */
export type Stats = {
  __typename?: 'Stats';
  /** Total artists in the platform */
  totalArtists: Scalars['Float'];
  /** Total unique collectors in the platform */
  totalUniqueCollectors: Scalars['Float'];
  /** Total users in the platform */
  totalUsers: Scalars['Float'];
};

/** Realtime Subscriptions */
export type Subscription = {
  __typename?: 'Subscription';
  /** [PUBLIC] Subscribe to updates of activity feed groups of a particular activity feed */
  activityFeedGroup: SubscriptionActivityFeedGroup;
  count: Scalars['Int'];
  /** [PUBLIC] Subscribe to release updates */
  release: Release;
  /** [PUBLIC] Subscribe to updates of release collectors */
  releaseCollectors: ReleaseCollector;
  /** [PUBLIC] Subscribe to updates of release nfts */
  releaseNfts: Nft;
  /** [PUBLIC] Subscribe to updates of release nfts comments */
  releaseNftsComments: NftWithComment;
  /** [PUBLIC] Subscribe to the latest token sales updates */
  tokenSales: EventV2;
};


/** Realtime Subscriptions */
export type SubscriptionActivityFeedGroupArgs = {
  activityFeedId: Scalars['UUID'];
};


/** Realtime Subscriptions */
export type SubscriptionCountArgs = {
  n?: Scalars['Int'];
};


/** Realtime Subscriptions */
export type SubscriptionReleaseArgs = {
  id: Scalars['UUID'];
};


/** Realtime Subscriptions */
export type SubscriptionReleaseCollectorsArgs = {
  releaseId: Scalars['UUID'];
};


/** Realtime Subscriptions */
export type SubscriptionReleaseNftsArgs = {
  releaseId: Scalars['UUID'];
};


/** Realtime Subscriptions */
export type SubscriptionReleaseNftsCommentsArgs = {
  releaseId: Scalars['UUID'];
};

/** Union of subscription activity feed group types */
export type SubscriptionActivityFeedGroup = SubscriptionNewActivityFeedGroup | SubscriptionUpdatedActivityFeedGroup;

/** Entity of new activity feed group created */
export type SubscriptionNewActivityFeedGroup = {
  __typename?: 'SubscriptionNewActivityFeedGroup';
  /** New activity feed group id created */
  activityFeedGroupId: Scalars['String'];
  /** Typename of activity feed group information */
  activityFeedGroupInformationTypename: Scalars['String'];
};

/** Entity of updated activity feed group */
export type SubscriptionUpdatedActivityFeedGroup = {
  __typename?: 'SubscriptionUpdatedActivityFeedGroup';
  /** Updated activity feed group id */
  activityFeedGroupId: Scalars['String'];
  /** Typename of activity feed group information */
  activityFeedGroupInformationTypename: Scalars['String'];
};

/** Time period to aggregate trending table queries */
export enum TimePeriodAggEnum {
  AllTime = 'ALL_TIME',
  OneDay = 'ONE_DAY',
  OneMonth = 'ONE_MONTH',
  SevenDay = 'SEVEN_DAY'
}

/** Input for totalAffiliatePurchases query */
export type TotalAffiliatePurchasesInput = {
  /** Pagination parameters */
  pagination?: ReleaseAffiliateTotalPurchasesCursorConnectionArgs;
};

/** Total raised on Ethereum and USD */
export type TotalRaised = {
  __typename?: 'TotalRaised';
  eth: Scalars['Float'];
  usd: Scalars['Float'];
};

/** Track entity */
export type Track = {
  __typename?: 'Track';
  /** Duration in seconds */
  duration: Scalars['Int'];
  /** Track identifier */
  id: Scalars['ID'];
  /** Normalized peaks of song */
  normalizedPeaks: Array<Scalars['Int']>;
  /** Track's Release */
  release: Release;
  /** Release Identifier */
  releaseId: Scalars['ID'];
  /** Track audio post-reveal of release */
  revealedAudio?: Maybe<Media>;
  /** Track original audio (non-transcoded) post-reveal of release */
  revealedAudioOriginal?: Maybe<Media>;
  /** Track title */
  title: Scalars['String'];
  /** Track number relative to other tracks (unused) */
  trackNumber: Scalars['Int'];
};

/** Track audio */
export type TrackAudio = {
  __typename?: 'TrackAudio';
  /** Track audio, transcoded version if available */
  audio?: Maybe<Media>;
  /** Track audio, original non-transcoded version */
  audioOriginal?: Maybe<Media>;
  /** Track duration in seconds */
  duration: Scalars['Int'];
  /** Track identifier */
  id: Scalars['ID'];
  /** Release entity of track */
  release: Release;
  /** Release identifier */
  releaseId: Scalars['ID'];
  /** Reveal time in UNIX timestamp of track based on authenticated user (if authenticated) */
  revealTime: Scalars['Int'];
};

/** Uploaded track information */
export type TrackUpload = {
  /** Cover image */
  coverImage?: InputMaybe<UploadedMedia>;
  /** Duration of track in seconds */
  duration: Scalars['Int'];
  /** Details of uploaded track file */
  fileDetail: UploadedMedia;
  /** Normalized peaks of track */
  normalizedPeaks: Array<Scalars['Int']>;
  /** Title of track */
  title: Scalars['String'];
};

/** Release info upload step info */
export type TrackUploadStepInfo = {
  __typename?: 'TrackUploadStepInfo';
  /** Details of uploaded track cover image */
  coverImage?: Maybe<MediaUploadStepInfo>;
  /** Duration of track in seconds */
  duration: Scalars['Int'];
  /** Details of uploaded track file */
  fileDetail: MediaUploadStepInfo;
  /** Normalized peaks of track */
  normalizedPeaks: Array<Scalars['Int']>;
  /** Title */
  title: Scalars['String'];
};

/** Transaction entity */
export type Transaction = {
  __typename?: 'Transaction';
  /** Chain identifier used for transaction */
  chainId: Scalars['Int'];
  /** Contract method of transaction */
  contractMethod: ContractMethod;
  /** Transaction hash on chain */
  hash: Scalars['String'];
  /** Transaction identifier */
  id: Scalars['ID'];
  /** Release identifier */
  releaseId?: Maybe<Scalars['String']>;
  /** Transaction status, "pending", "failed" or "confirmed") */
  status: Scalars['String'];
};

/** Trending Artist Info */
export type TrendingArtistInfo = {
  __typename?: 'TrendingArtistInfo';
  /** Artist entity */
  artist?: Maybe<Artist>;
  /** Artist identifier */
  artistId: Scalars['ID'];
  /** Amount of NFTs sold */
  nftsSold: Scalars['Int'];
  /** Primary sales of artist in Wei */
  primarySales: Scalars['String'];
  /** Primary sales of artist in USD */
  primarySalesUsd: Scalars['Float'];
  /** Secondary sales of artist in Wei */
  secondarySales: Scalars['String'];
  /** Secondary sales of artist in USD */
  secondarySalesUsd: Scalars['Float'];
  /** Sum of primary and secondary sales in Wei */
  totalSales: Scalars['String'];
  /** Sum of primary and secondary sales in USD */
  totalSalesUsd: Scalars['Float'];
  /** Amount of unique collectors */
  uniqueCollectors: Scalars['Int'];
};

/** Type of sort parameter used for trending artists */
export enum TrendingArtistsSortEnum {
  NftsSold = 'NFTS_SOLD',
  PrimarySales = 'PRIMARY_SALES',
  SecondarySales = 'SECONDARY_SALES',
  TotalSales = 'TOTAL_SALES',
  UniqueCollectors = 'UNIQUE_COLLECTORS'
}

/** Trending Collector information */
export type TrendingCollectorInfo = {
  __typename?: 'TrendingCollectorInfo';
  /** Amount of unique creators supported */
  creatorsSupported: Scalars['Int'];
  /** Amount of NFTs bought */
  nftsBought: Scalars['Int'];
  /** Total spent in Wei */
  totalSpent: Scalars['String'];
  /** Total spent in USD */
  totalSpentUsd: Scalars['Float'];
  /** Collector user entity */
  user?: Maybe<User>;
  /** User public address of the collector */
  userAddress: Scalars['String'];
};

/** Type of sort paratemer used for trending collectors */
export enum TrendingCollectorsSortEnum {
  CreatorsSupported = 'CREATORS_SUPPORTED',
  NftsBought = 'NFTS_BOUGHT',
  TotalSpent = 'TOTAL_SPENT'
}

/** Trending Playlist Info */
export type TrendingPlaylistInfo = {
  __typename?: 'TrendingPlaylistInfo';
  /** Amount of likes for playlist */
  numLikes: Scalars['Int'];
  /** Playlist entity */
  playlist: Shelf;
};

/** Type of sort paratemer used for trending playlists */
export enum TrendingPlaylistsSortEnum {
  Likes = 'LIKES'
}

/** Trending Release Info */
export type TrendingReleaseInfo = {
  __typename?: 'TrendingReleaseInfo';
  /** Primary sales of release in Wei */
  primarySales: Scalars['String'];
  /** Primary sales of release in USD */
  primarySalesUsd: Scalars['Float'];
  /** release entity */
  release: Release;
  /** Secondary sales of release in Wei */
  secondarySales: Scalars['String'];
  /** Secondary sales of release in USD */
  secondarySalesUsd: Scalars['Float'];
  /** Sum of primary and secondary sales in Wei */
  totalSales: Scalars['String'];
  /** Sum of primary and secondary sales in USD */
  totalSalesUsd: Scalars['Float'];
};

/** Type of sort paratemer used for trending releases */
export enum TrendingReleasesSortEnum {
  PrimarySales = 'PRIMARY_SALES',
  SecondarySales = 'SECONDARY_SALES',
  TotalSales = 'TOTAL_SALES'
}

/** Returned when the Twitter API returns an error */
export type TwitterApiError = Error & IError & {
  __typename?: 'TwitterAPIError';
  code: Scalars['Int'];
  message: Scalars['String'];
};

/** User relation type */
export enum TypeOfRelation {
  Following = 'FOLLOWING'
}

/** Returned when a value on an entity is not within the expected range for the operation to succeed */
export type UnexpectedValueError = Error & IError & {
  __typename?: 'UnexpectedValueError';
  /** Descriptive message of error */
  message: Scalars['String'];
};

/** Input fields to unfollow user */
export type UnfollowUserInput = {
  /** User id to unfollow */
  user: Scalars['UUID'];
};

/** Returned when a unique constraint is violated */
export type UniqueConstraintError = Error & IError & {
  __typename?: 'UniqueConstraintError';
  fields: Array<Scalars['String']>;
  /** Descriptive message of error */
  message: Scalars['String'];
  meta: Scalars['JSON'];
};

/** Input for `unlikeRelease` mutation */
export type UnlikeReleaseInput = {
  /** Release identifier to be un-liked */
  releaseId: Scalars['UUID'];
};

/** Input for `unlikeShelf` mutation */
export type UnlikeShelfInput = {
  /** Shelf identifier to be un-liked */
  shelfId: Scalars['UUID'];
};

/** Input for updateDraftInfo mutation */
export type UpdateDraftInfoInput = {
  /** Draft identifier */
  draftId: Scalars['String'];
  /** Draft info input */
  info: DraftInfoInput;
  /** Step number */
  stepNumber: Scalars['PositiveInt'];
};

/** Input for updateKeyClient */
export type UpdateKeyClient = {
  /** Identifier of existing Key Client */
  id: Scalars['UUID'];
  /** Change the name of the specified Key Client */
  name?: InputMaybe<Scalars['NonEmptyString']>;
  /** Change the status of the specified Key Client */
  status?: InputMaybe<KeyClientStatus>;
};

/** Input for setUploadBlockStatus mutation */
export type UploadBlockStatusInput = {
  /** Is the user going to be blocked or unblocked */
  isBlocked: Scalars['Boolean'];
  /** Public address of user */
  publicAddress: Scalars['Address'];
  /** Optional reason of the block */
  reason?: InputMaybe<Scalars['String']>;
};

/** Input for signedUploadParams mutation */
export type UploadRequest = {
  /** File name of media to be uploaded */
  fileName: Scalars['String'];
  /** Media type to be uploaded */
  mediaType: MediaType;
};

/** Media to be uploaded */
export type UploadedMedia = {
  /** Media type to be uploaded */
  mediaType: MediaType;
  /** Upload key received from Query.signedUploadParams */
  uploadKey: Scalars['String'];
};

/** Input fields to upsert shelf */
export type UpsertShelfInput = {
  /** Upsert shelf description */
  description?: InputMaybe<Scalars['String']>;
  /** Shelf id to update */
  id?: InputMaybe<Scalars['UUID']>;
  /** Upsert shelf name */
  name?: InputMaybe<Scalars['String']>;
  /** Upsert shelf type */
  type?: InputMaybe<ShelfType>;
};

/** User entity */
export type User = Node & {
  __typename?: 'User';
  /** Optional artist entity for users with artist profile */
  artist?: Maybe<Artist>;
  /**
   * From how many unique artists the users holds nfts
   * @deprecated Please use User.numBackedArtists
   */
  artistsBacked: Scalars['Float'];
  /** User avatar */
  avatar?: Maybe<Media>;
  /** Artists backed by user */
  backedArtists: ArtistCollectorConnection;
  /** Banner image for user profile */
  bannerImage?: Maybe<Media>;
  /** Paginated collected releases of user */
  collectedReleases: CollectedReleaseConnection;
  /** Total amount of collected release of user */
  collectedReleasesCount: Scalars['Int'];
  /** List of all the identifiers of releases currently collected by the user. If no releases have been collected yet, it returns null instead of an empty list */
  collectedReleasesIds?: Maybe<Array<Scalars['String']>>;
  /** Rank of user for number of bought nfts */
  collectorPosition?: Maybe<Scalars['Int']>;
  /** User entity creation */
  createdAt: Scalars['DateTime'];
  /** Credit allocations associated with user */
  creditAllocations: Array<CreditAllocation>;
  /** Delegate wallet public address */
  delegateWalletAddress?: Maybe<Scalars['String']>;
  /** User custom description */
  description?: Maybe<Scalars['String']>;
  /** Custom display name */
  displayName?: Maybe<Scalars['String']>;
  /** Optional user email */
  email?: Maybe<Scalars['String']>;
  /** User's ethereum name service domain */
  ens?: Maybe<Scalars['String']>;
  /** List of releases in featured sounds */
  featuredSounds: Array<CollectedRelease>;
  /** How many followers a user has */
  followerCount: Scalars['Int'];
  /** Paginated followers of user */
  followers: UserRelationConnection;
  /** Paginated following of user */
  following: UserRelationConnection;
  /** How many users a user is following */
  followingCount: Scalars['Int'];
  /** Does the user have the artist role to be able to have an artist profile */
  hasArtistRole: Scalars['Boolean'];
  /** Returns whether user has at least one shelf with at least one release  */
  hasShelfWithItems: Scalars['Boolean'];
  /** User UUID */
  id: Scalars['ID'];
  /** User instagram handle */
  instagramHandle?: Maybe<Scalars['String']>;
  /** Last tracked referral withdrawable balance. Only available for own authenticated user */
  lastReferralWithdrawableBalance?: Maybe<Scalars['String']>;
  /** An autogenerated playlist that contains all the releases the user liked */
  likedSounds?: Maybe<Shelf>;
  /** How many nfts a user owns */
  nftsOwned: Scalars['Int'];
  /** Paginated NFTs owned by user */
  nftsPaginated: NftConnection;
  /** Nonce for authentication purposes */
  nonce: Scalars['Int'];
  /** Number of artists backed by user */
  numBackedArtists: Scalars['Int'];
  /** Wallet public address */
  publicAddress: Scalars['String'];
  /** Possible roles for user */
  roles: UserRoles;
  /** Paginated shelves of user */
  shelves: ShelfConnection;
  /** Shelves count of the user */
  shelvesCount: Scalars['Int'];
  /** Should the user show the splits feature */
  showSplitsFeature: Scalars['Boolean'];
  /** Verifier twitter handle */
  twitterHandle?: Maybe<Scalars['String']>;
  /** Returns user username */
  username: Scalars['String'];
  /** Webapp URI of User. */
  webappUri: Scalars['String'];
};


/** User entity */
export type UserBackedArtistsArgs = {
  pagination?: ArtistCollectorCursorConnectionArgs;
};


/** User entity */
export type UserCollectedReleasesArgs = {
  filter?: InputMaybe<UserCollectedReleasesFilter>;
  pagination?: CursorConnectionArgs;
};


/** User entity */
export type UserFollowersArgs = {
  pagination?: CursorConnectionArgs;
};


/** User entity */
export type UserFollowingArgs = {
  pagination?: CursorConnectionArgs;
};


/** User entity */
export type UserNftsPaginatedArgs = {
  filter?: InputMaybe<UserNftsConnectionFilters>;
  pagination?: NftCursorConnectionArgs;
};


/** User entity */
export type UserShelvesArgs = {
  filter?: UserShelvesFilter;
  pagination?: ShelfCursorConnectionArgs;
};


/** User entity */
export type UserShelvesCountArgs = {
  filter?: UserShelvesFilter;
};

/** User collected many songs aggregate */
export type UserCollectedManySongsAggregate = {
  __typename?: 'UserCollectedManySongsAggregate';
  /** Releases corresponding to user collected many songs activity feed group */
  collectedReleases: Array<ActivityFeedGroupCollectedRelease>;
  /** Set of the distinct market classifications grouped in the aggregate */
  collectionTypes: Array<CollectionMarketType>;
  /** Number of releases that a user purchased in an activity feed group */
  numReleases: Scalars['Int'];
  /** User that collected many songs in activity feed group */
  user: User;
};

/** Filter of User.collectedReleases paginated field */
export type UserCollectedReleasesFilter = {
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption;
  /** Text search on release title or artist's name or handle */
  text?: InputMaybe<Scalars['NonEmptyString']>;
  /** Filters on release type */
  type?: InputMaybe<Array<ReleaseType>>;
};

/** Paginated connection of Users */
export type UserConnection = Connection & {
  __typename?: 'UserConnection';
  /** Edges of current page */
  edges: Array<UserConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of User Connection */
export type UserConnectionEdge = Edge & {
  __typename?: 'UserConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** User node */
  node: User;
};

/** Cursor connection parameters */
export type UserCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']>;
  /** Sort the users ascending or descending relative to the user creation date */
  sort?: SortOrder;
};

/** User liked shelf aggregate */
export type UserLikedPlaylistAggregate = {
  __typename?: 'UserLikedPlaylistAggregate';
  /** Shelf that the user liked. Can be NULL if the shelf is no longer liked by the user or deleted by the owner */
  shelf?: Maybe<Shelf>;
  /** User that liked the shelf */
  user: User;
};

/** User liked releases aggregate */
export type UserLikedSongsAggregate = {
  __typename?: 'UserLikedSongsAggregate';
  /** Releases liked in an activity feed group */
  releasesLiked: Array<ShelfRelease>;
  /** Shelf that releases are added to in activity feed group */
  shelf?: Maybe<Shelf>;
  /** User that liked the releases */
  user: User;
};

/** Filter the NFTs of User */
export type UserNftsConnectionFilters = {
  /** Only include Nfts from specified releases */
  releases?: InputMaybe<Array<Scalars['UUID']>>;
};

/** User relation entity */
export type UserRelation = Node & {
  __typename?: 'UserRelation';
  /** User relation creation date */
  createdAt: Scalars['DateTime'];
  /** User relation identifier */
  id: Scalars['ID'];
  /** Type of user relation */
  relation: TypeOfRelation;
  /** UserA of relation */
  userA: User;
  /** UserB of relation */
  userB: User;
};

/** Paginated user relation connection */
export type UserRelationConnection = Connection & {
  __typename?: 'UserRelationConnection';
  /** Edges of current page */
  edges: Array<UserRelationConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** User Relation Node edge */
export type UserRelationConnectionEdge = Edge & {
  __typename?: 'UserRelationConnectionEdge';
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** User Relation Entity */
  node: UserRelation;
};

/** User Relation Status */
export type UserRelationStatus = {
  __typename?: 'UserRelationStatus';
  /** Is the authenticated user following the target user */
  isFollowing: Scalars['Boolean'];
  /** ID of target user */
  userId: Scalars['String'];
};

/** Roles available for users */
export type UserRoles = {
  __typename?: 'UserRoles';
  /** Administrator of platform */
  isAdmin: Scalars['Boolean'];
  /** Member of artist relations team */
  isArtistRelations: Scalars['Boolean'];
};

/** Filter the shelves of a user */
export type UserShelvesFilter = {
  /** Case-insensitive text search on shelves names */
  text?: InputMaybe<Scalars['NonEmptyString']>;
  /** Filter by different types of shelves available for users. */
  type?: ShelfTypeFilter;
};

/** Arbitrary validation error */
export type ValidationError = Error & {
  __typename?: 'ValidationError';
  message: Scalars['String'];
};

/** Exchanged amount pretty equivalent */
export type ValueExchangedPrettyType = {
  __typename?: 'ValueExchangedPrettyType';
  /** Formatted Ethereum value */
  eth: Scalars['String'];
};

/** Withdraw affiliate earnings information */
export type WithdrawAffiliateEarnings = {
  __typename?: 'WithdrawAffiliateEarnings';
  /** Total withdrawable amount of eth in wei */
  amount: Scalars['String'];
  /** Unique user identifier of affiliate earnings */
  id: Scalars['ID'];
  /** All the minter addresses of to-be withdrawn editions for affiliate fees of authenticated user. Returns null if no withdrawable minter addresses are available */
  minterAddresses?: Maybe<Array<Scalars['String']>>;
};

/** Withdrawable contract earnings, returns null for values if contract contain dust amounts that are not worth withdrawing */
export type WithdrawableEarnings = {
  __typename?: 'WithdrawableEarnings';
  /** Release contract earnings */
  releaseContract?: Maybe<ReleaseContractEarning>;
  /** Split contract earnings */
  splitContract?: Maybe<SplitsContractEarning>;
};

/** Validation error on meta schema */
export type ZodValidationError = Error & {
  __typename?: 'ZodValidationError';
  /** Specific errors found on validation */
  errors: Array<BaseError>;
  message: Scalars['String'];
};

export type TestFragmentFragment = { __typename?: 'Query', now: number };

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename: 'Query', now: number };
