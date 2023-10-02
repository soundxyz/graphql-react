/* eslint-disable */
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
  Address: string;
  /** A string that cannot be passed as an empty value */
  CountryCode: string;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: string;
  /** Ethereum name service value with `.eth` suffix */
  ENS: string;
  /** A string that cannot be passed as an empty value */
  NonEmptyString: string;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: number;
  /** Integers that will have a value greater than 0. */
  PositiveInt: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: number;
  /** UUID v4 */
  UUID: string;
  /** Represents NULL values */
  Void: null;
};

/** Activity Feed entity */
export type ActivityFeed = {
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

/** Paginated activity feed group connection */
export type ActivityFeedGroupConnection = Connection & {
  /** Edges of current page */
  edges: Array<ActivityFeedGroupConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Activity Feed Group Connection */
export type ActivityFeedGroupConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Activity Feed Group node */
  node: ActivityFeedGroup;
};

/** Activity feed group featured collector entity */
export type ActivityFeedGroupFeaturedCollector = {
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
export const ActivityFeedGroupFilterOption = {
  AddedToPlaylist: 'ADDED_TO_PLAYLIST',
  All: 'ALL',
  Collected: 'COLLECTED',
  Likes: 'LIKES',
  ReleaseDropped: 'RELEASE_DROPPED'
} as const;

export type ActivityFeedGroupFilterOption = typeof ActivityFeedGroupFilterOption[keyof typeof ActivityFeedGroupFilterOption];
/** Union of activity feed group info */
export type ActivityFeedGroupInfo = ReleaseDroppedAggregate | ReleasesAddedToShelfAggregate | ShelfCreatedAggregate | SongCollectedByManyAggregate | UserCollectedManySongsAggregate | UserLikedPlaylistAggregate | UserLikedSongsAggregate;

/** Social proof of release in activity feed based on user authentication */
export type ActivityFeedReleaseSocialProof = {
  /** Release backers that are prioritized based on following status */
  socialProofCollectors: Array<User>;
};

/** Activity feed type */
export const ActivityFeedType = {
  Global: 'GLOBAL',
  User: 'USER'
} as const;

export type ActivityFeedType = typeof ActivityFeedType[keyof typeof ActivityFeedType];
/** Collector release added to playlist action entity */
export type Airdrop = CollectorAction & Node & ReleaseAction & {
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

/** Allowlist entity */
export type AllowList = Node & {
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

/** Artist Entity */
export type Artist = Node & {
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
  /** Edges of current page */
  edges: Array<ArtistActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of artist action connection */
export type ArtistActionConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** artist action node */
  node: ArtistAction;
};

/** Artist activity feed action type filter option */
export const ArtistActivityFeedActivityTypeFilterOption = {
  All: 'ALL',
  Collections: 'COLLECTIONS',
  Likes: 'LIKES',
  Playlists: 'PLAYLISTS',
  Releases: 'RELEASES'
} as const;

export type ArtistActivityFeedActivityTypeFilterOption = typeof ArtistActivityFeedActivityTypeFilterOption[keyof typeof ArtistActivityFeedActivityTypeFilterOption];
/** Filter artist activity types */
export type ArtistActivityFeedFilterArgs = {
  /** Only get activity of given action type */
  activityTypes?: Array<ArtistActivityFeedActivityTypeFilterOption>;
  /** Only get activity by the given group */
  types?: Array<ArtistActivityFeedTypeFilterOption>;
};

/** Artist activity feed type filter option */
export const ArtistActivityFeedTypeFilterOption = {
  All: 'ALL',
  Artist: 'ARTIST',
  Collector: 'COLLECTOR',
  Release: 'RELEASE'
} as const;

export type ArtistActivityFeedTypeFilterOption = typeof ArtistActivityFeedTypeFilterOption[keyof typeof ArtistActivityFeedTypeFilterOption];
/** ArtistCollector */
export type ArtistCollector = Node & {
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
  /** Edges of current page */
  edges: Array<ArtistCollectorConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Artist Collector Connection */
export type ArtistCollectorConnectionEdge = Edge & {
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
  /** Edges of current page */
  edges: Array<ArtistConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Artist Connection */
export type ArtistConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Artist node */
  node: Artist;
};

/** Artist contract earnings */
export type ArtistContractEarning = {
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

/** Simplified version of Artist entity */
export type ArtistInfo = Node & {
  /** Artist user avatar */
  avatar?: Maybe<Media>;
  /** Unique identifier of Artist */
  id: Scalars['ID'];
  /** Name of artist */
  name?: Maybe<Scalars['String']>;
  /** Artist public address */
  publicAddress?: Maybe<Scalars['String']>;
};

/** Artist minted releases author filter option */
export const ArtistMintedReleasesAuthorFilterOption = {
  All: 'ALL',
  OnlyAppearsOn: 'ONLY_APPEARS_ON',
  OnlyAuthoredReleases: 'ONLY_AUTHORED_RELEASES'
} as const;

export type ArtistMintedReleasesAuthorFilterOption = typeof ArtistMintedReleasesAuthorFilterOption[keyof typeof ArtistMintedReleasesAuthorFilterOption];
/** Artist minted releases credit split filter option */
export const ArtistMintedReleasesCreditSplitFilterOption = {
  All: 'ALL',
  OnlyCreditSplits: 'ONLY_CREDIT_SPLITS',
  OnlyNoCreditSplits: 'ONLY_NO_CREDIT_SPLITS'
} as const;

export type ArtistMintedReleasesCreditSplitFilterOption = typeof ArtistMintedReleasesCreditSplitFilterOption[keyof typeof ArtistMintedReleasesCreditSplitFilterOption];
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

/** Artist releases author filter option */
export const ArtistReleasesAuthorFilterOption = {
  All: 'ALL',
  OnlyAppearsOn: 'ONLY_APPEARS_ON',
  OnlyAuthoredReleases: 'ONLY_AUTHORED_RELEASES'
} as const;

export type ArtistReleasesAuthorFilterOption = typeof ArtistReleasesAuthorFilterOption[keyof typeof ArtistReleasesAuthorFilterOption];
/** Artist releases credit split filter option */
export const ArtistReleasesCreditSplitFilterOption = {
  All: 'ALL',
  OnlyCreditSplits: 'ONLY_CREDIT_SPLITS',
  OnlyNoCreditSplits: 'ONLY_NO_CREDIT_SPLITS'
} as const;

export type ArtistReleasesCreditSplitFilterOption = typeof ArtistReleasesCreditSplitFilterOption[keyof typeof ArtistReleasesCreditSplitFilterOption];
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
export const ArtistSeason = {
  Genesis: 'GENESIS',
  SeasonFour: 'SEASON_FOUR',
  SeasonOne: 'SEASON_ONE',
  SeasonThree: 'SEASON_THREE',
  SeasonTwo: 'SEASON_TWO'
} as const;

export type ArtistSeason = typeof ArtistSeason[keyof typeof ArtistSeason];
/** Types of release sales */
export const AuctionType = {
  FixedQuantity: 'FIXED_QUANTITY',
  OpenEdition: 'OPEN_EDITION',
  RangeBound: 'RANGE_BOUND'
} as const;

export type AuctionType = typeof AuctionType[keyof typeof AuctionType];
/** Simplified version of Release entity filtered on the owner public address */
export type CollectedRelease = Node & {
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
  /** Edges of current page */
  edges: Array<CollectedReleaseConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Collected Release Connection */
export type CollectedReleaseConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Collected Release node */
  node: CollectedRelease;
};

/** Name of the collection market */
export const CollectionMarketType = {
  Airdrop: 'AIRDROP',
  PrimarySale: 'PRIMARY_SALE',
  SecondarySale: 'SECONDARY_SALE'
} as const;

export type CollectionMarketType = typeof CollectionMarketType[keyof typeof CollectionMarketType];
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
  /** Edges of current page */
  edges: Array<CollectorActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of collector action connection */
export type CollectorActionConnectionEdge = Edge & {
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
export const CollectorActivityFeedTypeFilterOption = {
  All: 'ALL',
  Collections: 'COLLECTIONS',
  Likes: 'LIKES',
  Playlists: 'PLAYLISTS'
} as const;

export type CollectorActivityFeedTypeFilterOption = typeof CollectorActivityFeedTypeFilterOption[keyof typeof CollectorActivityFeedTypeFilterOption];
/** Comment entity */
export type Comment = {
  /** Comment unique identifier */
  id: Scalars['ID'];
  /** Comment message content */
  message: Scalars['String'];
  /** Comment chain signature */
  signature: Scalars['String'];
  /** Last update date of comment */
  updatedAt: Scalars['DateTime'];
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

/** Input for release by contract */
export type ContractReleaseInput = {
  /** Contract address */
  contractAddress: Scalars['Address'];
  /** Optional edition identifier */
  editionId?: InputMaybe<Scalars['String']>;
};

/** Contract type, currently the playform only supports "ARTIST" */
export const ContractType = {
  Artist: 'ARTIST',
  Edition: 'EDITION'
} as const;

export type ContractType = typeof ContractType[keyof typeof ContractType];
/** Credit allocation entity */
export type CreditAllocation = {
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
export const CreditRoleType = {
  Artist: 'ARTIST',
  Curator: 'CURATOR',
  Other: 'OTHER',
  Producer: 'PRODUCER',
  Remixer: 'REMIXER',
  Songwriter: 'SONGWRITER',
  VisualArtist: 'VISUAL_ARTIST'
} as const;

export type CreditRoleType = typeof CreditRoleType[keyof typeof CreditRoleType];
/** Credit split entity */
export type CreditSplit = {
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

/** Draft entity */
export type Draft = Node & {
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
  /** Collectors of artists allowlist configuration */
  collectorsOfArtists?: Maybe<DraftCollectorsOfArtistsInfo>;
  /** Collectors of releases allowlist configuration */
  collectorsOfReleases?: Maybe<DraftCollectorsOfReleasesInfo>;
  /** Info for manually added draft allow list */
  manuallyAddedAllowlist?: Maybe<DraftManuallyAddedAllowlistInfo>;
};

/** Draft allow lists info */
export type DraftAllowListsInfo = {
  /** Free mint allowlist configurations */
  freeMint?: Maybe<DraftAllowListInfo>;
  /** Presale mint allowlist configurations */
  presaleMint?: Maybe<DraftAllowListInfo>;
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

/** Different draft allow list types */
export const DraftAllowlistType = {
  ArtistCollectors: 'ARTIST_COLLECTORS',
  ManuallyAddedCollectors: 'MANUALLY_ADDED_COLLECTORS',
  ReleaseCollectors: 'RELEASE_COLLECTORS'
} as const;

export type DraftAllowlistType = typeof DraftAllowlistType[keyof typeof DraftAllowlistType];
/** Draft auction configuration step info */
export type DraftAuctionConfigurationInfo = {
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
  /** Toggle to include or not include all the collectors of all artists that given artist collaborated with */
  allCollaboratingArtists: Scalars['Boolean'];
  /** Selected artist entities for allowlist artist collectors */
  selectedArtists: Array<ArtistInfo>;
};

/** Draft collectors of releases info */
export type DraftCollectorsOfReleasesInfo = {
  /** Toggle to include or not include all artist collaborations */
  allArtistCollaborations: Scalars['Boolean'];
  /** Toggle to include or not include all artist releases */
  allArtistReleases: Scalars['Boolean'];
  /** Selected release entities for allowlist release collectors */
  selectedReleases: Array<ReleaseInfo>;
};

/** Edge of Draft Connection */
export type DraftConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Draft node */
  node: Draft;
};

/** Draft info */
export type DraftInfo = {
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

/** Draft manually added allowlist info */
export type DraftManuallyAddedAllowlistInfo = {
  /** Description for draft manually added allowlist */
  description?: Maybe<Scalars['String']>;
};

/** Draft public sale auction configuration step info */
export type DraftPublicSaleAuctionConfigurationInfo = {
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

/** Container of Node and the Cursor from the Node */
export type Edge = {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Node entity */
  node: Node;
};

/** Edition contract earnings */
export type EditionContractEarning = {
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String'];
  /** Address of the edition contract */
  contractAddress: Scalars['String'];
  /** Total eth on the contract */
  totalBalance: Scalars['String'];
};

/** EggGame Entity */
export type EggGame = {
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

/** Event type */
export const EventType = {
  Airdrop: 'AIRDROP',
  EditionPurchased: 'EDITION_PURCHASED',
  OrdersMatched: 'ORDERS_MATCHED',
  Transfer: 'TRANSFER',
  Unknown: 'UNKNOWN'
} as const;

export type EventType = typeof EventType[keyof typeof EventType];
/** Event entity */
export type EventV2 = Node & {
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

/** Feature flag entity to describe flagged functionality */
export type FeatureFlag = {
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

/** Genre entity */
export type Genre = {
  /** Date of creation */
  createdAt: Scalars['DateTime'];
  /** Genre associated UUID */
  id: Scalars['ID'];
  /** Genre name */
  name: Scalars['String'];
  /** Date of last update of genre */
  updatedAt: Scalars['DateTime'];
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

/** Client key management entity */
export type KeyClient = Node & {
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

/** Edge of Key Client Connection */
export type KeyClientConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Key Client node */
  node: KeyClient;
};

/** Status of Key Client */
export const KeyClientStatus = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE'
} as const;

export type KeyClientStatus = typeof KeyClientStatus[keyof typeof KeyClientStatus];
/** Paginated latest sales events */
export type LatestSalesConnection = Connection & {
  /** Edges of current page */
  edges: Array<LatestSalesConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of LatestSales Connection */
export type LatestSalesConnectionEdge = Edge & {
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

/** License for the release */
export const LicenseType = {
  AllRightsReserved: 'ALL_RIGHTS_RESERVED',
  CreativeCommons: 'CREATIVE_COMMONS'
} as const;

export type LicenseType = typeof LicenseType[keyof typeof LicenseType];
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
  /** Edges of current page */
  edges: Array<LikeActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of like action connection */
export type LikeActionConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Like action node */
  node: LikeAction;
};

/** Input used for link query */
export type LinkInput = {
  /** Link slug */
  slug: Scalars['NonEmptyString'];
};

/** Info associated with manually added draft allowlist */
export type ManuallyAddedCollectorsAllowlist = {
  /** Total number of manually added users in draft allowlist */
  totalCollectors: Scalars['Int'];
};

/** Media entity */
export type Media = {
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
export const MediaType = {
  ArtistBannerImage: 'ARTIST_BANNER_IMAGE',
  ArtistFreeSaleAllowlist: 'ARTIST_FREE_SALE_ALLOWLIST',
  ArtistPresaleAllowlist: 'ARTIST_PRESALE_ALLOWLIST',
  Audio: 'AUDIO',
  AudioTranscoded: 'AUDIO_TRANSCODED',
  AvatarImage: 'AVATAR_IMAGE',
  DraftAllowlistedAddressesCsv: 'DRAFT_ALLOWLISTED_ADDRESSES_CSV',
  ReleaseBannerImage: 'RELEASE_BANNER_IMAGE',
  ReleaseCoverImage: 'RELEASE_COVER_IMAGE',
  ReleaseGoldenEggImage: 'RELEASE_GOLDEN_EGG_IMAGE',
  ReleaseHoldersCsv: 'RELEASE_HOLDERS_CSV',
  ReleaseWebAnimatedGoldenEggImage: 'RELEASE_WEB_ANIMATED_GOLDEN_EGG_IMAGE',
  ReleaseWebAnimatedImage: 'RELEASE_WEB_ANIMATED_IMAGE',
  ReleaseWebStaticAutogenImage: 'RELEASE_WEB_STATIC_AUTOGEN_IMAGE',
  ReleaseWebStaticImage: 'RELEASE_WEB_STATIC_IMAGE',
  TmpArtistBannerAutogenImage: 'TMP_ARTIST_BANNER_AUTOGEN_IMAGE',
  TmpAvatarAutogenImage: 'TMP_AVATAR_AUTOGEN_IMAGE',
  TmpUserBannerAutogenImage: 'TMP_USER_BANNER_AUTOGEN_IMAGE',
  UserBannerImage: 'USER_BANNER_IMAGE'
} as const;

export type MediaType = typeof MediaType[keyof typeof MediaType];
/** Release info upload step info */
export type MediaUploadStepInfo = {
  /** Media type to be uploaded */
  mediaType: MediaType;
  /** Upload key received from Query.signedUploadParams */
  uploadKey: Scalars['String'];
};

/** Merkle tree entity */
export type MerkleTree = {
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
  /** Merkle proof */
  proof: Array<Scalars['String']>;
  /** Unhashed leaf in merkle tree */
  unhashedLeaf: Scalars['String'];
};

/** Metadata Attribute */
export type MetadataAttribute = {
  /** Trait type */
  traitType?: Maybe<Scalars['String']>;
  /** Value */
  value: Scalars['String'];
};

/** Mint current time status */
export const MintTimeStatus = {
  Past: 'PAST',
  Upcoming: 'UPCOMING'
} as const;

export type MintTimeStatus = typeof MintTimeStatus[keyof typeof MintTimeStatus];
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
export const MintingAccessConfigMintingType = {
  Free: 'FREE',
  Presale: 'PRESALE'
} as const;

export type MintingAccessConfigMintingType = typeof MintingAccessConfigMintingType[keyof typeof MintingAccessConfigMintingType];
/** Mutations */
export type Mutation = {
  /** [PUBLIC] Generate auth challenge for given public address and give back new nonce */
  generateAuthChallenge: Scalars['Int'];
  /** [PUBLIC] Report a track play session stop */
  reportPlayStopped?: Maybe<Scalars['Void']>;
  /** [PUBLIC] Verify given auth challenge */
  verifyAuthChallenge: Scalars['String'];
};


/** Mutations */
export type MutationGenerateAuthChallengeArgs = {
  publicAddress: Scalars['String'];
};


/** Mutations */
export type MutationReportPlayStoppedArgs = {
  input: ReportPlayStoppedInput;
};


/** Mutations */
export type MutationVerifyAuthChallengeArgs = {
  publicAddress: Scalars['String'];
  signedMessage: Scalars['String'];
};

/** NFT Entity */
export type Nft = Node & {
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
  /** Edges of current page */
  edges: Array<NftConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** NFT Node edge */
export type NftConnectionEdge = Edge & {
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

/** OpenSea Metadata Attribute */
export type OpenSeaMetadataAttribute = {
  /** Trait type */
  traitType?: Maybe<Scalars['String']>;
  /** Value */
  value: Scalars['String'];
};

/** Pagination helper information */
export type PageInfo = {
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
  /** Edges of current page */
  edges: Array<PlaylistActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of playlist action connection */
export type PlaylistActionConnectionEdge = Edge & {
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
  artistId: Scalars['ID'];
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist created */
export type PlaylistCreated = ArtistAction & CollectorAction & Node & PlaylistAction & ReleaseAction & {
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
  /** Holder public address */
  holderPublicAddress: Scalars['String'];
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist used for Homepage and fallback for extra pages */
export type PlaylistHome = Playlist & {
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
  /** Artist ID */
  artistId: Scalars['ID'];
  /** Track ID */
  id: Scalars['ID'];
  /** Release ID */
  releaseId: Scalars['ID'];
};

/** Currently supported playlists */
export const PlaylistType = {
  Artist: 'ARTIST',
  Holder: 'HOLDER',
  Home: 'HOME'
} as const;

export type PlaylistType = typeof PlaylistType[keyof typeof PlaylistType];
/** Primary sale collector action entity */
export type PrimarySale = ArtistAction & CollectorAction & Node & ReleaseAction & {
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
  /** [PUBLIC] Artist by UUID */
  artist?: Maybe<Artist>;
  /** [PUBLIC] Artist activity feed */
  artistActivityFeed: ArtistActionConnection;
  /** [PUBLIC] Artist by handle */
  artistByHandle?: Maybe<Artist>;
  /** [PUBLIC] Get all artists of platform. */
  artists: ArtistConnection;
  /** [PUBLIC] Get audio from track */
  audioFromTrack: TrackAudio;
  /** [PUBLIC] Get authenticated user information, if any */
  authUser?: Maybe<User>;
  /** [PUBLIC] Collector activity feed */
  collectorActivityFeed: CollectorActionConnection;
  /** [PUBLIC] Get credit split by id */
  creditSplit?: Maybe<CreditSplit>;
  /** [PUBLIC] Get currencies conversions */
  currencies: Currencies;
  /** [PUBLIC] Get DraftAllowList from release and mintType */
  draftAllowlistFromRelease?: Maybe<DraftAllowList>;
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
  /** [PUBLIC] Get all users that collected the same release in one activity feed group. */
  releaseCollectedByManyUsers: UserConnection;
  /**
   * [PUBLIC] Get release by contract address
   * @deprecated Please use Query.releaseFromContract
   */
  releaseContract: Release;
  /** [PUBLIC] Get release by contract address */
  releaseFromContract?: Maybe<Release>;
  /** [PUBLIC] Get the release that's associated with the specific token parameters */
  releaseFromToken?: Maybe<Release>;
  /** [PUBLIC] List of genres that have at least 1 past minted release, sorted by popularity */
  releaseGenres: Array<Genre>;
  /** [PUBLIC] Get all releases */
  releases: ReleaseConnection;
  /** Search releases or artists based on text inputs */
  search: SearchResult;
  /** [PUBLIC] Get specified shelf by id */
  shelf: Shelf;
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
  /** [PUBLIC] Get specified user by public address or ens, if both args provided mismatch, returns null */
  userByAddress?: Maybe<User>;
  /** [PUBLIC] Get specified user by sound handle */
  userByArtistHandle?: Maybe<User>;
  /** [PUBLIC] User like and unlike activity feed */
  userLikeActivityFeed: CollectorActionConnection;
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
export type QueryArtistsArgs = {
  filter?: InputMaybe<ArtistCursorFilterArgs>;
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryAudioFromTrackArgs = {
  trackId: Scalars['UUID'];
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
export type QueryReleaseFromContractArgs = {
  contractAddress: Scalars['Address'];
  editionId?: InputMaybe<Scalars['String']>;
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
export type QueryShelfArgs = {
  id: Scalars['UUID'];
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

/** Release entity */
export type Release = Node & {
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
  /** Edges of current page */
  edges: Array<ReleaseActionConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of collector action connection */
export type ReleaseActionConnectionEdge = Edge & {
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
export const ReleaseActivityFeedTypeFilterOption = {
  All: 'ALL',
  Collections: 'COLLECTIONS',
  Likes: 'LIKES',
  Playlists: 'PLAYLISTS',
  Releases: 'RELEASES'
} as const;

export type ReleaseActivityFeedTypeFilterOption = typeof ReleaseActivityFeedTypeFilterOption[keyof typeof ReleaseActivityFeedTypeFilterOption];
/** Aggregate of all affiliate purchases of specific affiliate user and release */
export type ReleaseAffiliateTotalPurchases = Node & {
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

/** ReleaseAffiliateTotalPurchases edge */
export type ReleaseAffiliateTotalPurchasesEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** ReleaseAffiliateTotalPurchases Entity */
  node: ReleaseAffiliateTotalPurchases;
};

/** Release album reveal filter option */
export const ReleaseAlbumRevealFilterOption = {
  All: 'ALL',
  OnlyNotRevealedAlbums: 'ONLY_NOT_REVEALED_ALBUMS',
  OnlyRevealedAlbums: 'ONLY_REVEALED_ALBUMS'
} as const;

export type ReleaseAlbumRevealFilterOption = typeof ReleaseAlbumRevealFilterOption[keyof typeof ReleaseAlbumRevealFilterOption];
/** Release collector */
export type ReleaseCollector = Node & {
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
  /** Edges of current page */
  edges: Array<ReleaseCollectorConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Release Collector Connection */
export type ReleaseCollectorConnectionEdge = Edge & {
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
  /** Edges of current page */
  edges: Array<ReleaseConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Release Connection */
export type ReleaseConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Release node */
  node: Release;
};

/** Union of release contract types */
export type ReleaseContractEarning = ArtistContractEarning | EditionContractEarning;

/** Release dropped action entity */
export type ReleaseDropped = ArtistAction & Node & ReleaseAction & {
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
  /** Release dropped action in activity feed group */
  release: Release;
};

/** Release earnings of a user */
export type ReleaseEarnings = Node & {
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

/** Edge of Release Earnings Connection */
export type ReleaseEarningsConnectionEdge = Edge & {
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

/** Release liked action entity */
export type ReleaseLiked = ArtistAction & CollectorAction & LikeAction & Node & ReleaseAction & {
  /** Date of action */
  date: Scalars['DateTime'];
  /** Action id */
  id: Scalars['ID'];
  /** Release corresponding to release liked action entity */
  release: Release;
  /** User corresponding to release liked action entity */
  user: User;
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
export const ReleaseStatus = {
  AvailableToMint: 'AVAILABLE_TO_MINT',
  SoldOut: 'SOLD_OUT'
} as const;

export type ReleaseStatus = typeof ReleaseStatus[keyof typeof ReleaseStatus];
/** Release type, currently the platform only supports "SINGLE" */
export const ReleaseType = {
  Album: 'ALBUM',
  AlbumTrack: 'ALBUM_TRACK',
  Single: 'SINGLE'
} as const;

export type ReleaseType = typeof ReleaseType[keyof typeof ReleaseType];
/** Release unliked action entity */
export type ReleaseUnliked = ArtistAction & CollectorAction & LikeAction & Node & {
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

/** Release info upload step info */
export type RewardUploadStepInfo = {
  /** Reward description */
  description: Scalars['String'];
  /** Reward name */
  title: Scalars['String'];
};

/** Release info upload step info */
export type RewardsUploadStepInfo = {
  /** Special golden egg images */
  goldenEggImages: Array<MediaUploadStepInfo>;
  /** Custom rewards */
  rewards: Array<RewardUploadStepInfo>;
};

/** Single sale schedule information of Release Presale Configuration */
export type SaleSchedule = {
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

/** Collector release added to playlist action entity */
export type SecondarySale = ArtistAction & CollectorAction & Node & ReleaseAction & {
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

/** Shelf entity */
export type Shelf = Node & {
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
  /** Edges of current page */
  edges: Array<ShelfConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Shelf Node edge */
export type ShelfConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** Shelf Entity */
  node: Shelf;
};

/** Shelf created aggregate */
export type ShelfCreatedAggregate = {
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
  /** Edges of current page */
  edges: Array<ShelfReleaseConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Shelf release node edge */
export type ShelfReleaseConnectionEdge = Edge & {
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
export const ShelfType = {
  Default: 'DEFAULT',
  UserLikedSounds: 'USER_LIKED_SOUNDS'
} as const;

export type ShelfType = typeof ShelfType[keyof typeof ShelfType];
/** Filter based the type of shelf */
export const ShelfTypeFilter = {
  All: 'ALL',
  Liked: 'LIKED',
  UserCreated: 'USER_CREATED'
} as const;

export type ShelfTypeFilter = typeof ShelfTypeFilter[keyof typeof ShelfTypeFilter];
/** Input for Shelf.webEmbed */
export type ShelfWebEmbedInput = {
  /** Customize html parameters */
  html?: IframeHtmlParameters;
};

/** Song collected by many aggregate */
export type SongCollectedByManyAggregate = {
  /** Release corresponding to most recent purchase action in activity feed group */
  collectedRelease: ActivityFeedGroupCollectedRelease;
  /** Featured collectors that purchased same release in an activity feed group */
  featuredCollectors: Array<ActivityFeedGroupFeaturedCollector>;
  /** Number of collectors that purchased same release in an activity feed group */
  numCollectors: Scalars['Int'];
};

/** Key the release was written in */
export const SongKeyType = {
  AFlatMajor: 'A_FLAT_MAJOR',
  AMajor: 'A_MAJOR',
  AMinor: 'A_MINOR',
  BFlatMajor: 'B_FLAT_MAJOR',
  BFlatMinor: 'B_FLAT_MINOR',
  BMajor: 'B_MAJOR',
  BMinor: 'B_MINOR',
  CMajor: 'C_MAJOR',
  CMinor: 'C_MINOR',
  CSharpMinor: 'C_SHARP_MINOR',
  DFlatMajor: 'D_FLAT_MAJOR',
  DMajor: 'D_MAJOR',
  DMinor: 'D_MINOR',
  EFlatMajor: 'E_FLAT_MAJOR',
  EFlatMinor: 'E_FLAT_MINOR',
  EMajor: 'E_MAJOR',
  EMinor: 'E_MINOR',
  FMajor: 'F_MAJOR',
  FMinor: 'F_MINOR',
  FSharpMajor: 'F_SHARP_MAJOR',
  FSharpMinor: 'F_SHARP_MINOR',
  GMajor: 'G_MAJOR',
  GMinor: 'G_MINOR',
  GSharpMinor: 'G_SHARP_MINOR'
} as const;

export type SongKeyType = typeof SongKeyType[keyof typeof SongKeyType];
/** Ascending or Descending sort */
export const SortOrder = {
  Asc: 'ASC',
  Desc: 'DESC'
} as const;

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];
/** Splits contract earnings */
export type SplitsContractEarning = {
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
  /** Split contract address */
  splitContractAddress?: Maybe<Scalars['String']>;
  /** Splits auction configurations */
  splits: Array<CreditAllocationUploadStepInfo>;
};

/** Realtime Subscriptions */
export type Subscription = {
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
  /** New activity feed group id created */
  activityFeedGroupId: Scalars['String'];
  /** Typename of activity feed group information */
  activityFeedGroupInformationTypename: Scalars['String'];
};

/** Entity of updated activity feed group */
export type SubscriptionUpdatedActivityFeedGroup = {
  /** Updated activity feed group id */
  activityFeedGroupId: Scalars['String'];
  /** Typename of activity feed group information */
  activityFeedGroupInformationTypename: Scalars['String'];
};

/** Time period to aggregate trending table queries */
export const TimePeriodAggEnum = {
  AllTime: 'ALL_TIME',
  OneDay: 'ONE_DAY',
  OneMonth: 'ONE_MONTH',
  SevenDay: 'SEVEN_DAY'
} as const;

export type TimePeriodAggEnum = typeof TimePeriodAggEnum[keyof typeof TimePeriodAggEnum];
/** Total raised on Ethereum and USD */
export type TotalRaised = {
  eth: Scalars['Float'];
  usd: Scalars['Float'];
};

/** Track entity */
export type Track = {
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

/** Release info upload step info */
export type TrackUploadStepInfo = {
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

/** Trending Artist Info */
export type TrendingArtistInfo = {
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
export const TrendingArtistsSortEnum = {
  NftsSold: 'NFTS_SOLD',
  PrimarySales: 'PRIMARY_SALES',
  SecondarySales: 'SECONDARY_SALES',
  TotalSales: 'TOTAL_SALES',
  UniqueCollectors: 'UNIQUE_COLLECTORS'
} as const;

export type TrendingArtistsSortEnum = typeof TrendingArtistsSortEnum[keyof typeof TrendingArtistsSortEnum];
/** Trending Collector information */
export type TrendingCollectorInfo = {
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
export const TrendingCollectorsSortEnum = {
  CreatorsSupported: 'CREATORS_SUPPORTED',
  NftsBought: 'NFTS_BOUGHT',
  TotalSpent: 'TOTAL_SPENT'
} as const;

export type TrendingCollectorsSortEnum = typeof TrendingCollectorsSortEnum[keyof typeof TrendingCollectorsSortEnum];
/** Trending Playlist Info */
export type TrendingPlaylistInfo = {
  /** Amount of likes for playlist */
  numLikes: Scalars['Int'];
  /** Playlist entity */
  playlist: Shelf;
};

/** Type of sort paratemer used for trending playlists */
export const TrendingPlaylistsSortEnum = {
  Likes: 'LIKES'
} as const;

export type TrendingPlaylistsSortEnum = typeof TrendingPlaylistsSortEnum[keyof typeof TrendingPlaylistsSortEnum];
/** Trending Release Info */
export type TrendingReleaseInfo = {
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
export const TrendingReleasesSortEnum = {
  PrimarySales: 'PRIMARY_SALES',
  SecondarySales: 'SECONDARY_SALES',
  TotalSales: 'TOTAL_SALES'
} as const;

export type TrendingReleasesSortEnum = typeof TrendingReleasesSortEnum[keyof typeof TrendingReleasesSortEnum];
/** User relation type */
export const TypeOfRelation = {
  Following: 'FOLLOWING'
} as const;

export type TypeOfRelation = typeof TypeOfRelation[keyof typeof TypeOfRelation];
/** User entity */
export type User = Node & {
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
  /** Returns whether user has at least one shelf with at least one release */
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
  /** Edges of current page */
  edges: Array<UserConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of User Connection */
export type UserConnectionEdge = Edge & {
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
  /** Shelf that the user liked. Can be NULL if the shelf is no longer liked by the user or deleted by the owner */
  shelf?: Maybe<Shelf>;
  /** User that liked the shelf */
  user: User;
};

/** User liked releases aggregate */
export type UserLikedSongsAggregate = {
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
  /** Edges of current page */
  edges: Array<UserRelationConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** User Relation Node edge */
export type UserRelationConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String'];
  /** User Relation Entity */
  node: UserRelation;
};

/** Roles available for users */
export type UserRoles = {
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

/** Exchanged amount pretty equivalent */
export type ValueExchangedPrettyType = {
  /** Formatted Ethereum value */
  eth: Scalars['String'];
};

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = (
  { __typename: 'Query' }
  & { ' $fragmentRefs'?: { 'TestFragmentFragment': TestFragmentFragment } }
);

export type TestMutateMutationVariables = Exact<{
  publicAddress: Scalars['String'];
}>;


export type TestMutateMutation = { generateAuthChallenge: number };

export type TestFragmentFragment = { now: number } & { ' $fragmentName'?: 'TestFragmentFragment' };

export type TestTwoQueryVariables = Exact<{ [key: string]: never; }>;


export type TestTwoQuery = (
  { __typename: 'Query' }
  & { ' $fragmentRefs'?: { 'TestFragmentFragment': TestFragmentFragment } }
);

export type ReleasesTestQueryVariables = Exact<{
  filter: ReleasesCursorFilterArgs;
  pagination: ReleasesCursorConnectionArgs;
}>;


export type ReleasesTestQuery = { releases: { edges: Array<{ cursor: string, node: { id: string, title: string, artist: { id: string, name?: string | null } } }>, pageInfo: { hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } } };
