/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Ethereum address */
  Address: { input: string; output: string; }
  /** A string that cannot be passed as an empty value */
  CountryCode: { input: string; output: string; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: string; output: string; }
  /** Ethereum name service value with `.eth` suffix */
  ENS: { input: string; output: string; }
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: { input: string; output: string; }
  /** A string that cannot be passed as an empty value */
  NonEmptyString: { input: string; output: string; }
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: { input: number; output: number; }
  /** Integers that will have a value greater than 0. */
  PositiveInt: { input: number; output: number; }
  /** Semantic version string */
  SemanticVersion: { input: string; output: string; }
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: number; output: number; }
  /** UUID v4 */
  UUID: { input: string; output: string; }
  /** Represents NULL values */
  Void: { input: null; output: null; }
};

/** Activity Feed entity */
export type ActivityFeed = {
  /** Paginated activity feed groups of activity feed. */
  groups: ActivityFeedGroups;
  /** Activity feed UUID */
  id: Scalars['ID']['output'];
};


/** Activity Feed entity */
export type ActivityFeedGroupsArgs = {
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
  id: Scalars['ID']['output'];
  /** Activity feed group info */
  information: ActivityFeedGroupInfo;
  /** Activity feed group timestamp of most recent activity occurrence */
  latestActivityOccurenceAt: Scalars['Timestamp']['output'];
  /** Activity feed group ranking score */
  rankingScore: Scalars['Int']['output'];
};

/** Activity feed group collected release entity */
export type ActivityFeedGroupCollectedRelease = {
  /** Amount paid in Wei for all purchases of a single release within activity feed group */
  amountPaidInWei: Scalars['String']['output'];
  /** Returns whether user has purchased the golden egg within the activity feed group */
  hasGoldenEgg: Scalars['Boolean']['output'];
  /** Most recent user that release was purchased from */
  mostRecentPurchasedFromUser: User;
  /** Release corresponding to activity feed group collected release entity */
  release: Release;
  /** Amount of nfts of a single release within activity feed group */
  totalOwnedEditions: Scalars['Int']['output'];
  /** Total number of unique users that release was purchased from */
  totalUsersPurchasedFrom: Scalars['Int']['output'];
};

/** Edge of Activity Feed Group Connection */
export type ActivityFeedGroupConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Activity Feed Group node */
  node: ActivityFeedGroup;
};

/** Activity feed group featured collector entity */
export type ActivityFeedGroupFeaturedCollector = {
  /** Amount paid in Wei for most recent purchase action in activity feed group by collector */
  amountPaidInWei: Scalars['String']['output'];
  /** Amount of NFTs bought in activity feed group by collector */
  nftsCount: Scalars['Int']['output'];
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

/** Paginated activity feed group connection */
export type ActivityFeedGroups = Connection & {
  /** Edges of current page */
  edges: Array<Maybe<ActivityFeedGroupConnectionEdge>>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Activity feed type */
export const ActivityFeedType = {
  Global: 'GLOBAL',
  NotableCollectors: 'NOTABLE_COLLECTORS',
  User: 'USER'
} as const;

export type ActivityFeedType = typeof ActivityFeedType[keyof typeof ActivityFeedType];
/** Affiliate Curator */
export type AffiliateCurator = {
  /** Total volume spent through referrals in wei */
  affiliateEarned: Scalars['String']['output'];
  /** Total referred mints quantity */
  mintsQuantity: Scalars['Int']['output'];
  /** Count of different sounds referred */
  soundsReferred: Scalars['Int']['output'];
  /** Total volume spent through referrals in wei */
  totalVolume: Scalars['String']['output'];
  /** User entity of affiliate curator */
  user?: Maybe<User>;
};

/** Collector release added to playlist action entity */
export type Airdrop = CollectorAction & Node & ReleaseAction & {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Starting token ID of NFT for bonding curve sale purchase */
  fromTokenId: Scalars['Int']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Number of sequential tokens purchased */
  quantity: Scalars['Int']['output'];
  /** Release corresponding to collector airdrop action entity */
  release: Release;
  /** Serial number of nft airdrop */
  serialNumber: Scalars['Int']['output'];
  /** Ending token ID of NFT for bonding curve sale purchase */
  toTokenId: Scalars['Int']['output'];
  /** User corresponding to collector action entity */
  user: User;
};

/** Pagination parameters for allCollectors */
export type AllCollectorsCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
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
  /** Genre names to filter on for collector's releases */
  genres?: InputMaybe<Array<Genres>>;
  /** Should it include artists as collectors */
  includeArtists?: Scalars['Boolean']['input'];
  /** Location ids to filter on for collector's releases */
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Should it only include collectors with a valid username (twitterHandle, ens or displayName) */
  onlyWithUsername?: Scalars['Boolean']['input'];
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
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
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
  /** Genre names to filter on for shelf songs */
  genres?: InputMaybe<Array<Genres>>;
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
  createdAt: Scalars['DateTime']['output'];
  /** Allowlist identifier */
  id: Scalars['ID']['output'];
  /** Total number of users in allowlist */
  totalUsers: Scalars['Int']['output'];
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
  createdAt: Scalars['DateTime']['output'];
  /** Gem Collection URL */
  gemCollectionUrl?: Maybe<Scalars['String']['output']>;
  /** Artist identifier */
  id: Scalars['ID']['output'];
  /** Name of artist */
  name: Scalars['String']['output'];
  /** Number of unique nft collectors of artist */
  numCollectors: Scalars['Int']['output'];
  /** Number of nfts minted of artist */
  numNfts: Scalars['Int']['output'];
  /** Number of artist releases */
  numReleases: Scalars['Int']['output'];
  /** Picked release of artist */
  pickedRelease?: Maybe<Release>;
  /** Paginated releases of artist. */
  releases: ReleaseConnection;
  /** Genres of artist releases, with the most common genres first */
  releasesGenres: Array<Scalars['String']['output']>;
  /** Season associated with artist */
  season?: Maybe<Scalars['String']['output']>;
  /** Sound handle to be used on URLs */
  soundHandle: Scalars['String']['output'];
  /** Spotify URL */
  spotifyUrl?: Maybe<Scalars['String']['output']>;
  /** Token symbol of contract */
  tokenSymbol?: Maybe<Scalars['String']['output']>;
  /** User entity of artist */
  user: User;
  /** User identifier of artist */
  userId: Scalars['String']['output'];
  /** Webapp URI of Artist */
  webappUri: Scalars['String']['output'];
};


/** Artist Entity */
export type ArtistCollectorsArgs = {
  pagination?: ArtistCollectorCursorConnectionArgs;
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

/** Artist action entity */
export type ArtistAction = {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Artist action id */
  id: Scalars['ID']['output'];
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
  cursor: Scalars['String']['output'];
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
/** User appliction to be an artist */
export type ArtistApplication = Node & {
  /** Creation date of entity */
  createdAt: Scalars['DateTime']['output'];
  /** Artist application entity identifier */
  id: Scalars['ID']['output'];
  /** Application info */
  info?: Maybe<ArtistApplicationInfo>;
  /** Most recent previously rejected application reason for user */
  mostRecentApplicationRejectionReason?: Maybe<Scalars['String']['output']>;
  /** Application status */
  status: ArtistApplicationStatus;
  /** User who created the application. */
  user: User;
};

/** Edge of artist application connection */
export type ArtistApplicationConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Artist application node */
  node: ArtistApplication;
};

/** Artist application info */
export type ArtistApplicationInfo = {
  /** Artist name */
  artistName: Scalars['String']['output'];
  /** Cover image */
  coverImage: MediaUploadStepInfo;
  /** Email */
  email: Scalars['String']['output'];
  /** Instagram handle */
  instagramHandle?: Maybe<Scalars['String']['output']>;
  /** Sound handle */
  soundHandle: Scalars['String']['output'];
  /** Spotify URL */
  spotifyUrl?: Maybe<Scalars['String']['output']>;
  /** Twitter handle */
  twitterHandle?: Maybe<Scalars['String']['output']>;
};

/** Artist application status */
export const ArtistApplicationStatus = {
  Accepted: 'ACCEPTED',
  Pending: 'PENDING',
  Rejected: 'REJECTED'
} as const;

export type ArtistApplicationStatus = typeof ArtistApplicationStatus[keyof typeof ArtistApplicationStatus];
/** ArtistCollector */
export type ArtistCollector = Node & {
  /** Artist entity */
  artist: Artist;
  /** First artist nft collected by user */
  firstNftCollected: Nft;
  /** Date of first nft collected */
  firstNftCollectedDate: Scalars['DateTime']['output'];
  /** Unique id of artist collector */
  id: Scalars['ID']['output'];
  /** Amount of artist nfts owned */
  nftsCount: Scalars['Int']['output'];
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
  cursor: Scalars['String']['output'];
  /** ArtistCollector node */
  node: ArtistCollector;
};

/** Pagination paramaters for artist collectors */
export type ArtistCollectorCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
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
  /** Flag to include or not include all collectors of release artist */
  allArtistCollectors: Scalars['Boolean']['output'];
  /** Flag to include or not include all collaborating artists of the release */
  allCollaboratingArtists: Scalars['Boolean']['output'];
  /**
   * Paginated artists of draftAllowlist
   * @deprecated Please use ArtistCollectorsAllowlist.filteredArtists
   */
  artists: ArtistConnection;
  /** Paginated artists of draftAllowlist taking into account user toggles */
  filteredArtists: ArtistConnection;
  /** Total number of artist collector users in draft allowlist */
  totalCollectors: Scalars['Int']['output'];
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
  cursor: Scalars['String']['output'];
  /** Artist node */
  node: Artist;
};

/** Artist contract earnings */
export type ArtistContractEarning = {
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String']['output'];
  /** Address of the artist contract */
  contractAddress: Scalars['String']['output'];
  /** Edition id for the release */
  editionId: Scalars['String']['output'];
  /** Total eth on the contract */
  totalBalance: Scalars['String']['output'];
};

/** Filter for paginated artists */
export type ArtistCursorFilterArgs = {
  /** Genre names to filter on for artist's releases */
  genres?: InputMaybe<Array<Genres>>;
  /** Specify whether artist already has at least one collector (minted release) */
  hasCollector?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specify whether artist already has at least one release */
  hasMintedRelease?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specify whether artist already has at least one release */
  hasRelease?: InputMaybe<Scalars['Boolean']['input']>;
  /** Location IDs from Google Places API to filter on for artist's releases */
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Specify season to be filtered */
  season?: InputMaybe<ArtistSeason>;
};

/** Simplified version of Artist entity */
export type ArtistInfo = Node & {
  /** Artist user avatar */
  avatar?: Maybe<Media>;
  /** Unique identifier of Artist */
  id: Scalars['ID']['output'];
  /** Name of artist */
  name?: Maybe<Scalars['String']['output']>;
  /** Artist public address */
  publicAddress?: Maybe<Scalars['String']['output']>;
};

/** Artist notification subscription entity that indicates a user has subscribed to updates from a specific artist */
export type ArtistNotificationSubscription = Node & {
  /** Subscription artist */
  artist: Artist;
  /** Artist identifier */
  artistId: Scalars['ID']['output'];
  /** Subscription creation timestamp */
  createdAt: Scalars['DateTime']['output'];
  /** Subscription unique identifier */
  id: Scalars['ID']['output'];
};

/** Edge of ArtistNotificationSubscription Connection */
export type ArtistNotificationSubscriptionConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** ArtistNotificationSubscription node */
  node: ArtistNotificationSubscription;
};

/** Artist Partnership call to action information */
export type ArtistPartnership = {
  /** Highlighted partnerships */
  highlights?: Maybe<Array<ArtistPartnershipHighlight>>;
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Dynamic call-to-action message */
  message: Scalars['String']['output'];
};

/** Artist Partnership Highlight */
export type ArtistPartnershipHighlight = {
  /** Readable label associated with image */
  imageLabel: Scalars['String']['output'];
  /** Image URL of highlighted artist */
  imageUrl: Scalars['String']['output'];
  /** Link URL, which can be either a relative pathname of webapp or an absolute path */
  linkUrl: Scalars['String']['output'];
};

/** Artist private community user member only to be accessed by the artist. */
export type ArtistPrivateCommunityMember = Node & {
  /** Artist community collector */
  artistCollector: ArtistCollector;
  /** Unique id of user */
  id: Scalars['ID']['output'];
  /** Verified email address of user if subscribed to artist */
  subscriptionEmail?: Maybe<Scalars['String']['output']>;
  /**
   * Artist community user
   * @deprecated Please use artistCollector
   */
  user: User;
};

/** Edge of Artist Private Community Member Connection */
export type ArtistPrivateCommunityMemberConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** ArtistPrivateCommunityMember node */
  node: ArtistPrivateCommunityMember;
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
  excludeReleaseIds?: Array<Scalars['UUID']['input']>;
  /** Filters on release with specified mint time status */
  mintTimeStatus?: Array<MintTimeStatus>;
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption;
  /** Filters on release author status */
  releaseAuthor?: ArtistReleasesAuthorFilterOption;
  /** Filters on release type */
  releaseType?: Array<ReleaseType>;
};

/** Filter the artists to be searched */
export type ArtistSearchFilter = {
  /** Genre names to filter on for artist's releases */
  genres?: InputMaybe<Array<Genres>>;
  /** Only include artists that either have or don't have collectors */
  hasCollectors?: InputMaybe<Scalars['Boolean']['input']>;
  /** Location IDs from Google Places API to filter on for artist's releases */
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Customize sort of releases */
export type ArtistSearchSort = {
  /** Sort by creation date */
  createdAt?: InputMaybe<SortOrder>;
  /** Sort by number of mints of each release */
  totalMinted?: InputMaybe<SortOrder>;
  /** Sort by total volume of all artist releases */
  totalVolume?: InputMaybe<SortOrder>;
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
/** Defines sort order of Artist fields, array index defines tiebreaking */
export type ArtistSortInput = {
  /** Field to be sorted */
  field: SearchArtistsSortEnum;
  /** Sort ascending or descending */
  order: SortOrder;
};

/** Connection entity of artist source selected allowlist */
export type ArtistSourceSelectedAllowlistConnection = Connection & {
  /** List of edges of pagination */
  edges: Array<ArtistSourceSelectedAllowlistEdge>;
  /** Pagination info helpers */
  pageInfo: PageInfo;
};

/** Edge of connection for artist source selected allowlist */
export type ArtistSourceSelectedAllowlistEdge = Edge & {
  /** Pagination cursor */
  cursor: Scalars['String']['output'];
  /** Pagination node */
  node: ArtistSourceSubAllowlist;
};

/** Allowlists of artists used as source of collectors */
export type ArtistSourceSubAllowlist = Node & ReleaseBaseSubAllowlist & {
  /** Node identifier */
  id: Scalars['ID']['output'];
  /** Artist used as source of collectors */
  sourceArtist?: Maybe<Artist>;
  /** Total number of addresses in sub allowlist */
  totalAddresses: Scalars['Int']['output'];
};

/** Auction listing for releases */
export type AuctionListingInterface = {
  /** Chain associated with contract */
  chain: ChainType;
  /** Contract address associated with auction */
  contractAddress: Scalars['String']['output'];
  /** Unique auction listing identifier */
  id: Scalars['ID']['output'];
};

/** Types of release sales */
export const AuctionType = {
  FixedQuantity: 'FIXED_QUANTITY',
  FixedQuantityWithGa: 'FIXED_QUANTITY_WITH_GA',
  OpenEdition: 'OPEN_EDITION',
  OpenEditionWithGa: 'OPEN_EDITION_WITH_GA',
  OpenEditionWithSam: 'OPEN_EDITION_WITH_SAM',
  RangeBound: 'RANGE_BOUND'
} as const;

export type AuctionType = typeof AuctionType[keyof typeof AuctionType];
/** Audio Media (including all encodings) */
export type AudioMedia = {
  /** Track audio, AAC 128k if available */
  audio128k?: Maybe<Media>;
  /** Track audio, AAC 192k if available */
  audio192k?: Maybe<Media>;
  /** Track audio, AAC 256k if available */
  audio256k?: Maybe<Media>;
  /** Track audio, HLS playlist if available */
  audioHls?: Maybe<Media>;
  /** Track audio, original non-transcoded version */
  audioOriginal: Media;
};

/** Bonding curve sale collector action entity */
export type BondingCurveSale = ArtistAction & CollectorAction & Node & ReleaseAction & {
  /** Amount paid in Wei for bonding curve sale */
  amountPaidInWei: Scalars['String']['output'];
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Starting token ID of NFT for bonding curve sale purchase */
  fromTokenId: Scalars['Int']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Number of sequential tokens purchased */
  quantity: Scalars['Int']['output'];
  /** Release corresponding to collector bonding curve sale action entity */
  release: Release;
  /** Starting serial number of nft bonding curve sale purchase */
  serialNumber: Scalars['Int']['output'];
  /** Ending token ID of NFT for bonding curve sale purchase */
  toTokenId: Scalars['Int']['output'];
  /** User corresponding to collector action entity */
  user: User;
};

/** Token sold to bonding curve collector action entity */
export type BondingCurveSold = ArtistAction & CollectorAction & Node & ReleaseAction & {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** First token ID in the unordered batch of sold tokens */
  firstTokenId: Scalars['Int']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Payment received in Wei */
  paymentInWei: Scalars['String']['output'];
  /** Number of tokens sold */
  quantity: Scalars['Int']['output'];
  /** Release corresponding to collector bonding curve sold action entity */
  release: Release;
  /** User corresponding to collector action entity */
  user: User;
};

/** Chain name supported on the platform */
export const ChainType = {
  Goerli: 'GOERLI',
  Mainnet: 'MAINNET',
  Optimism: 'OPTIMISM',
  OptimismGoerli: 'OPTIMISM_GOERLI'
} as const;

export type ChainType = typeof ChainType[keyof typeof ChainType];
/** Simplified version of Release entity filtered on the owner public address */
export type CollectedRelease = Node & {
  /** First backed nft of collected release */
  firstNftOwned?: Maybe<Nft>;
  /** Amount of ga nfts owned */
  gaNftsCount: Scalars['Int']['output'];
  /** Returns golden egg if user owns, otherwise null */
  goldenEgg?: Maybe<EggGame>;
  /** Unique identifier of release */
  id: Scalars['ID']['output'];
  /** Amount of nfts owned */
  nftsCount: Scalars['Int']['output'];
  /** List of owned nft serial numbers in ascending serial number order */
  ownedSerialNumbers: Array<Scalars['Int']['output']>;
  /** Release entity */
  release: Release;
  /** The priority of the NFTs the user owns */
  tierPriority: Scalars['Int']['output'];
  /** Amount of vip nfts owned */
  vipNftsCount: Scalars['Int']['output'];
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
  cursor: Scalars['String']['output'];
  /** Collected Release node */
  node: CollectedRelease;
};

/** Name of the collection market */
export const CollectionMarketType = {
  Airdrop: 'AIRDROP',
  BondingCurveSale: 'BONDING_CURVE_SALE',
  PrimarySale: 'PRIMARY_SALE',
  SecondarySale: 'SECONDARY_SALE'
} as const;

export type CollectionMarketType = typeof CollectionMarketType[keyof typeof CollectionMarketType];
/** Collector action entity */
export type CollectorAction = {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Collector action id */
  id: Scalars['ID']['output'];
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
  cursor: Scalars['String']['output'];
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
/** Filter the releases to be searched */
export type CollectorSearchFilter = {
  /** Genre names to filter on for collector's releases */
  genres?: InputMaybe<Array<Genres>>;
  /** Location ids to filter on for collector's releases */
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Customize sort of collectors */
export type CollectorSearchSort = {
  /** Sort by number of distinct artists the collector backed */
  artistsBacked?: InputMaybe<SortOrder>;
  /** Sort by creation date */
  createdAt?: InputMaybe<SortOrder>;
  /** Sort by number of nfts */
  nftsCount?: InputMaybe<SortOrder>;
  /** Sort by number of mints of each release */
  totalMinted?: InputMaybe<SortOrder>;
  /** Sort by total volume of all collector releases */
  totalVolume?: InputMaybe<SortOrder>;
};

/** Defines sort order of Collector fields, array index defines tiebreaking */
export type CollectorSortInput = {
  /** Field to be sorted */
  field: SearchCollectorsSortEnum;
  /** Sort ascending or descending */
  order: SortOrder;
};

/** Information of collector from release */
export type CollectorUpdateInfo = {
  /** Amount of ga release nfts owned */
  gaNftsCount: Scalars['Int']['output'];
  /** If collector owns golden egg, the serial number of the golden egg */
  goldenEggSerialNumber?: Maybe<Scalars['Int']['output']>;
  /** Unique identifier of collector from release */
  id: Scalars['ID']['output'];
  /** Lowest serial number collected on release */
  lowestNftSerialNumber: Scalars['Int']['output'];
  /** Most recent comment message, if any */
  mostRecentCommentMessage?: Maybe<Scalars['String']['output']>;
  /** Amount of NFTs collected of release */
  nftsCount: Scalars['Int']['output'];
  /** Amount of GA NFTs collected of release */
  nftsCountGa: Scalars['Int']['output'];
  /** Amount of VIP NFTs collected of release */
  nftsCountVip: Scalars['Int']['output'];
  /** If user is an artist, the artist unique identifier */
  userArtistId?: Maybe<Scalars['ID']['output']>;
  /** If user is an artist, the artist name */
  userArtistName?: Maybe<Scalars['String']['output']>;
  /** If user is an artist, the artist sound handle */
  userArtistSoundHandle?: Maybe<Scalars['String']['output']>;
  /** Avatar URL of collecotr */
  userAvatarUrl?: Maybe<Scalars['String']['output']>;
  /** Unique user identifier of collector */
  userId: Scalars['ID']['output'];
  /** Wallet public address of user */
  userPublicAddress: Scalars['String']['output'];
  /** Webapp URI of collector */
  userWebappUri: Scalars['String']['output'];
  /** Username of collector */
  username: Scalars['String']['output'];
  /** Amount of vip release nfts owned */
  vipNftsCount: Scalars['Int']['output'];
};

/** Comment entity */
export type Comment = {
  /** Comment unique identifier */
  id: Scalars['ID']['output'];
  /** Comment message content */
  message: Scalars['String']['output'];
  /** Comment chain signature */
  signature: Scalars['String']['output'];
  /** Last update date of comment */
  updatedAt: Scalars['DateTime']['output'];
};

/** Base connection for paginated results */
export type Connection = {
  /** Edges of current page */
  edges: Array<Maybe<Edge>>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Contract entity */
export type Contract = {
  /** Contract address */
  contractAddress: Scalars['String']['output'];
  /** Type of contract */
  contractType: ContractType;
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Contract entity unique identifier */
  id: Scalars['ID']['output'];
  /** Contract owner */
  owner: User;
  /** Public address of contract owner */
  ownerPublicAddress: Scalars['String']['output'];
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
};

/** Input for release by contract */
export type ContractReleaseInput = {
  /** Contract address */
  contractAddress: Scalars['Address']['input'];
  /** Optional edition identifier */
  editionId?: InputMaybe<Scalars['String']['input']>;
};

/** Contract type on chain */
export const ContractType = {
  Artist: 'ARTIST',
  Edition: 'EDITION',
  TieredEdition: 'TIERED_EDITION'
} as const;

export type ContractType = typeof ContractType[keyof typeof ContractType];
/** Credit allocation entity */
export type CreditAllocation = {
  /** Credit split associated with credit allocation */
  creditSplit: CreditSplit;
  /** Credit allocation entity identifier */
  id: Scalars['ID']['output'];
  /** Owner of credit allocation */
  owner: User;
  /** Percent of allocation */
  percent: Scalars['Float']['output'];
  /** Roles associated with credit allocation */
  roles: Array<Scalars['String']['output']>;
};

/** Credit allocation upload step info */
export type CreditAllocationUploadStepInfo = {
  /** Owner of allocation */
  owner: User;
  /** Owner public address of allocation */
  ownerAddress: Scalars['String']['output'];
  /** Percent of allocation */
  percent: Scalars['Float']['output'];
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
  id: Scalars['ID']['output'];
  /** Releases associated with credit split that are minted */
  mintedReleases: Array<Release>;
  /** Releases associated with credit split */
  releases: Array<Release>;
  /** Split contract address */
  splitAddress?: Maybe<Scalars['String']['output']>;
};

/** Currencies conversions */
export type Currencies = {
  ethToUsd: Scalars['Float']['output'];
};

/** Base cursor connection arguments */
export type CursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Sort the connection ascending or descending */
  sort?: SortOrder;
};

/** Draft entity */
export type Draft = Node & {
  /** Artist of draft */
  artist: Artist;
  /** Salt for contract address */
  contractAddressSalt: Scalars['String']['output'];
  /** Draft creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Post deployment edits */
  edit?: Maybe<DraftEdit>;
  /** Draft identifier */
  id: Scalars['ID']['output'];
  /** Draft info */
  info?: Maybe<DraftInfo>;
  /** Release associated with draft */
  release?: Maybe<Release>;
  /** Draft slug to be used for release entity */
  slug: Scalars['String']['output'];
  /** Type of Release */
  type: ReleaseType;
  /** Draft updated date */
  updatedAt: Scalars['DateTime']['output'];
};

/** DraftAllowlist entity */
export type DraftAllowList = Node & {
  /** DraftAllowlist creation date */
  createdAt: Scalars['DateTime']['output'];
  /** DraftAllowlist identifier */
  id: Scalars['ID']['output'];
  /** DraftAllowlist info */
  info: DraftAllowlistInfo;
  /**
   * Description for manually added allowlist
   * @deprecated Use ManuallyAddedCollectorsAllowlist.description instead
   */
  manuallyAddedAllowlistDescription?: Maybe<Scalars['String']['output']>;
  /** Total number of users in draft allowlist */
  totalUsers: Scalars['Int']['output'];
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
  /**
   * Free mint allowlist configurations
   * @deprecated Free mint category removed
   */
  freeMint?: Maybe<DraftAllowListInfo>;
  /** Presale mint allowlist configurations */
  presaleMint?: Maybe<DraftAllowListInfo>;
};

/** Input for draftAllowListFromRelease query */
export type DraftAllowlistFromReleaseInput = {
  /** Merkle tree root */
  merkleRoot: Scalars['String']['input'];
  /** Release identifier */
  releaseId: Scalars['UUID']['input'];
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
  /** End time of auction */
  endTime?: Maybe<Scalars['Int']['output']>;
  /** Max mints per wallet for auction */
  maxMintsPerWallet: Scalars['Int']['output'];
  /** Price per mint */
  price: Scalars['Float']['output'];
  /** Max supply for auction */
  quantity: Scalars['Int']['output'];
  /** Start time of auction */
  startTime: Scalars['Int']['output'];
};

/** Release info upload step info */
export type DraftAuctionConfigurationsInfo = {
  /** Type of auction */
  auctionType: AuctionType;
  /** Toggle to enable SAM for auction */
  enabledSAM?: Maybe<Scalars['Boolean']['output']>;
  /**
   * Free mint auction configurations
   * @deprecated Free mint category removed
   */
  freeMint?: Maybe<DraftAuctionConfigurationInfo>;
  /** Max mint supply of auction */
  maxMintable: Scalars['Int']['output'];
  /** Min mint supply of auction */
  minQuantity: Scalars['Int']['output'];
  /** Presale mint auction configurations */
  presaleMint?: Maybe<DraftAuctionConfigurationInfo>;
  /** Public mint auction configurations */
  publicMint: DraftPublicSaleAuctionConfigurationInfo;
  /** Breakdown of mint quantities */
  quantityBreakdown?: Maybe<Array<Scalars['Int']['output']>>;
};

/** Draft collectors of artists info */
export type DraftCollectorsOfArtistsInfo = {
  /** Toggle to include or not include all artist releases */
  allArtistCollectors: Scalars['Boolean']['output'];
  /** Toggle to include or not include all the collectors of all artists that given artist collaborated with */
  allCollaboratingArtists: Scalars['Boolean']['output'];
  /** Selected artist entities for allowlist artist collectors */
  selectedArtists: Array<ArtistInfo>;
};

/** Draft collectors of releases info */
export type DraftCollectorsOfReleasesInfo = {
  /** Toggle to include or not include all artist collaborations */
  allArtistCollaborations: Scalars['Boolean']['output'];
  /** Toggle to include or not include all artist releases */
  allArtistReleases: Scalars['Boolean']['output'];
  /** Selected release entities for allowlist release collectors */
  selectedReleases: Array<ReleaseInfo>;
};

/** Edge of Draft Connection */
export type DraftConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Draft node */
  node: Draft;
};

/** Draft post deployment edits */
export type DraftEdit = Node & {
  /** Draft creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Node identifier */
  id: Scalars['ID']['output'];
  /** Draft Edit info */
  info?: Maybe<DraftEditInfo>;
  /** Draft updated date */
  updatedAt: Scalars['DateTime']['output'];
};

/** Draft edit allowlist info */
export type DraftEditAllowListInfo = {
  /** Collectors of artists allowlist configuration */
  collectorsOfArtists?: Maybe<DraftEditCollectorsOfArtistsInfo>;
  /** Collectors of releases allowlist configuration */
  collectorsOfReleases?: Maybe<DraftEditCollectorsOfReleasesInfo>;
  /** Info for manually added draft allow list */
  manuallyAddedAllowlist?: Maybe<DraftEditManuallyAddedAllowlistInfo>;
  /** Merkle root of edited allowlist */
  merkleRoot?: Maybe<Scalars['String']['output']>;
  /** Unhashed leaves of allowlist merkle tree */
  unhashedLeaves?: Maybe<Array<Scalars['String']['output']>>;
};

/** Draft Edit allow lists info */
export type DraftEditAllowListsInfo = {
  /** Presale mint allowlist configurations */
  presaleMint?: Maybe<DraftEditAllowListInfo>;
};

/** Draft Edit for allowlist in collectors of artists section */
export type DraftEditCollectorsOfArtistsInfo = {
  /** Toggle to include or not include all artist releases */
  allArtistCollectors: Scalars['Boolean']['output'];
  /** Toggle to include or not include all the collectors of all artists that given artist collaborated with */
  allCollaboratingArtists: Scalars['Boolean']['output'];
  /** Selected artist entities for allowlist artist collectors */
  selectedArtists: Array<ArtistInfo>;
};

/** Draft edit for allowlist in collectors of releases section */
export type DraftEditCollectorsOfReleasesInfo = {
  /** Toggle to include or not include all artist collaborations */
  allArtistCollaborations: Scalars['Boolean']['output'];
  /** Toggle to include or not include all artist releases */
  allArtistReleases: Scalars['Boolean']['output'];
  /** Selected release entities for allowlist release collectors */
  selectedReleases: Array<ReleaseInfo>;
};

/** Draft Edit info */
export type DraftEditInfo = {
  /** Draft possibly edited allowlist info */
  allowlistInfo?: Maybe<DraftEditAllowListsInfo>;
  /** Draft arweave hash associated with changes if needed */
  arweaveHash?: Maybe<Scalars['String']['output']>;
  /** Draft GA arweave hash associated with changes if needed */
  gaArweaveHash?: Maybe<Scalars['String']['output']>;
  /** Draft possibly edited release info */
  releaseInfo?: Maybe<DraftEditReleaseInfo>;
  /** Draft possibly edited rewards info */
  rewardsInfo?: Maybe<RewardsEditStepInfo>;
  /** Draft possibly edited splits info */
  splitsInfo?: Maybe<SplitsUploadStepInfo>;
  /** Draft storefront arweave hash associated with changes if needed */
  storefrontArweaveHash?: Maybe<Scalars['String']['output']>;
};

/** Draft Edit of allowlist in manually added allowlist section */
export type DraftEditManuallyAddedAllowlistInfo = {
  /** Description for draft manually added allowlist */
  description?: Maybe<Scalars['String']['output']>;
  /** List of manually allowlisted addresses */
  list: Array<Scalars['String']['output']>;
};

/** Draft edit release info */
export type DraftEditReleaseInfo = {
  /** Release beats per minute */
  beatsPerMinute?: Maybe<Scalars['Int']['output']>;
  /** Behind the music text */
  behindTheMusic?: Maybe<Scalars['String']['output']>;
  /** Cover image */
  coverImage?: Maybe<MediaUploadStepInfo>;
  /** GA Cover image */
  gaCoverImage?: Maybe<MediaUploadStepInfo>;
  /** Static version of animated GA cover image of release if the cover is a GIF */
  gaStaticCoverImage?: Maybe<MediaUploadStepInfo>;
  /** Genre */
  genre?: Maybe<Scalars['String']['output']>;
  /** Release key */
  key?: Maybe<SongKeyType>;
  /** License for the release */
  license?: Maybe<LicenseType>;
  /** Location where the release was created */
  location?: Maybe<Scalars['CountryCode']['output']>;
  /** Release lyrics */
  lyrics?: Maybe<Scalars['String']['output']>;
  /** Static version of animated cover image of release if the cover is a GIF */
  staticCoverImage?: Maybe<MediaUploadStepInfo>;
  /** Title */
  title?: Maybe<Scalars['String']['output']>;
  /** Token symbol */
  tokenSymbol?: Maybe<Scalars['String']['output']>;
  /** Uploaded tracks */
  tracks?: Maybe<Array<TrackUploadStepInfo>>;
  /** Release type */
  type?: Maybe<Scalars['String']['output']>;
};

/** Draft info */
export type DraftInfo = {
  /** Draft allowlist info */
  allowListInfo?: Maybe<DraftAllowListsInfo>;
  /** Draft auction configurations info */
  auctionConfigurations?: Maybe<DraftAuctionConfigurationsInfo>;
  /** Number of draft upload steps already complete */
  numUploadStepsComplete: Scalars['Int']['output'];
  /** Draft release info */
  releaseInfo?: Maybe<DraftReleaseInfo>;
  /** Draft rewards info */
  rewardsInfo?: Maybe<RewardsUploadStepInfo>;
  /** Draft splits info */
  splitsInfo?: Maybe<SplitsUploadStepInfo>;
};

/** Draft manually added allowlist info */
export type DraftManuallyAddedAllowlistInfo = {
  /** Description for draft manually added allowlist */
  description?: Maybe<Scalars['String']['output']>;
};

/** Draft public sale auction configuration step info */
export type DraftPublicSaleAuctionConfigurationInfo = {
  /** End time of auction */
  endTime?: Maybe<Scalars['Int']['output']>;
  /** Number of days auction should run for */
  endTimeDays?: Maybe<Scalars['Int']['output']>;
  /** Max mints per wallet for auction */
  maxMintsPerWallet: Scalars['Int']['output'];
  /** Price per mint */
  price: Scalars['Float']['output'];
  /** Max supply for auction */
  quantity: Scalars['Int']['output'];
  /** Start time of auction */
  startTime: Scalars['Int']['output'];
};

/** Draft release info */
export type DraftReleaseInfo = {
  /** Release beats per minute */
  beatsPerMinute?: Maybe<Scalars['Int']['output']>;
  /** Behind the music text */
  behindTheMusic: Scalars['String']['output'];
  /** Cover image */
  coverImage: MediaUploadStepInfo;
  /** GA Cover image */
  gaCoverImage?: Maybe<MediaUploadStepInfo>;
  /** Static version of animated GA cover image of release if the cover is a GIF */
  gaStaticCoverImage?: Maybe<MediaUploadStepInfo>;
  /** Genre */
  genre: Scalars['String']['output'];
  /** Release key */
  key?: Maybe<SongKeyType>;
  /** License for the release */
  license?: Maybe<LicenseType>;
  /** Location where the release was created */
  location?: Maybe<Scalars['CountryCode']['output']>;
  /** Release lyrics */
  lyrics?: Maybe<Scalars['String']['output']>;
  /** Static version of animated cover image of release if the cover is a GIF */
  staticCoverImage?: Maybe<MediaUploadStepInfo>;
  /** Title */
  title: Scalars['String']['output'];
  /** Token symbol */
  tokenSymbol: Scalars['String']['output'];
  /** Uploaded tracks */
  tracks: Array<TrackUploadStepInfo>;
  /** Release type */
  type: Scalars['String']['output'];
};

/** Container of Node and the Cursor from the Node */
export type Edge = {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Node entity */
  node: Node;
};

/** Edition contract earnings */
export type EditionContractEarning = {
  /** Users split of eth on the contract */
  balanceForUser: Scalars['String']['output'];
  /** Address of the edition contract */
  contractAddress: Scalars['String']['output'];
  /** Total eth on the contract */
  totalBalance: Scalars['String']['output'];
};

/** Filter the edition owned tokenIds result */
export type EditionOwnedTokenIdsFilter = {
  /** Should it include golden egg */
  includeGoldenEgg?: Scalars['Boolean']['input'];
};

/** Input for editionOwnedTokenIds query */
export type EditionOwnedTokenIdsInput = {
  /** Edition contract address */
  editionContractAddress: Scalars['Address']['input'];
  /** Filter the tokenIds */
  filter?: EditionOwnedTokenIdsFilter;
  /** Limit the amount of token ids to be returned. By default there is no limit */
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
  /** Public address of owner */
  ownerPublicAddress: Scalars['Address']['input'];
  /** Customize sort behavior */
  sort?: NftCursorConnectionSort;
};

/** EggGame Entity */
export type EggGame = {
  /** Animated golden egg image optimized for client rendering */
  animatedGoldenEggImageOptimized?: Maybe<Media>;
  /** Block hash of egg game calculation */
  finalSerialBlockHash: Scalars['String']['output'];
  /** Special golden egg image */
  goldenEggImage?: Maybe<Media>;
  /** EggGame identifier */
  id: Scalars['ID']['output'];
  /** Nft of egg game winner */
  nft: Nft;
  /** Serial number of nft with egg game */
  winningSerialNum: Scalars['Int']['output'];
};

/** Base Error */
export type Error = {
  /** Descriptive message of error */
  message: Scalars['String']['output'];
};

/** Feature flag entity to describe flagged functionality */
export type FeatureFlag = {
  /** Creation date of feature flag */
  createdAt: Scalars['DateTime']['output'];
  /** Feature flag UUID */
  id: Scalars['ID']['output'];
  /** Name of feature flag */
  name: Scalars['String']['output'];
  /** Last update of feature flag value */
  updatedAt: Scalars['DateTime']['output'];
  /** Arbitrary string value, it could be need to be parsed stringified json */
  value: Scalars['String']['output'];
};

/** Genre entity */
export type Genre = {
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Genre associated UUID */
  id: Scalars['ID']['output'];
  /** Genre name */
  name: Scalars['String']['output'];
  /** Date of last update of genre */
  updatedAt: Scalars['DateTime']['output'];
};

/** List of genres available on the platform */
export const Genres = {
  Afrobeat: 'AFROBEAT',
  AlternativeRock: 'ALTERNATIVE_ROCK',
  Ambient: 'AMBIENT',
  Bounce: 'BOUNCE',
  Classical: 'CLASSICAL',
  Country: 'COUNTRY',
  Dancehall: 'DANCEHALL',
  DanceEdm: 'DANCE_EDM',
  DeepHouse: 'DEEP_HOUSE',
  Disco: 'DISCO',
  Downtempo: 'DOWNTEMPO',
  DrumBass: 'DRUM_BASS',
  Dubstep: 'DUBSTEP',
  Electronic: 'ELECTRONIC',
  Experimental: 'EXPERIMENTAL',
  FolkSingerSongwriter: 'FOLK_SINGER_SONGWRITER',
  HipHopRap: 'HIP_HOP_RAP',
  House: 'HOUSE',
  Indie: 'INDIE',
  JazzBlues: 'JAZZ_BLUES',
  Latin: 'LATIN',
  Lofi: 'LOFI',
  Metal: 'METAL',
  Piano: 'PIANO',
  Pop: 'POP',
  Reggae: 'REGGAE',
  Reggaeton: 'REGGAETON',
  Rock: 'ROCK',
  RBSoul: 'R_B_SOUL',
  Soundtrack: 'SOUNDTRACK',
  Techno: 'TECHNO',
  Trance: 'TRANCE',
  Trap: 'TRAP',
  Triphop: 'TRIPHOP',
  World: 'WORLD'
} as const;

export type Genres = typeof Genres[keyof typeof Genres];
/** Geographic location associated with Google Maps API */
export type GeoLocationPlaceGoogle = {
  /** Label associated with location */
  label: Scalars['String']['output'];
  /** Google Maps API Place identifier */
  placeId: Scalars['String']['output'];
};

/** User won the golden egg for a release */
export type GoldenEggWon = Node & UserNotification & {
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Release entity */
  release?: Maybe<Release>;
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Recipient user entity */
  user?: Maybe<User>;
};

/** Customize iframe html parameters */
export type IframeHtmlParameters = {
  /** Customize height */
  height: Scalars['String']['input'];
  /** Customize style */
  style: Scalars['String']['input'];
  /** Customize width */
  width: Scalars['String']['input'];
};

/** Client key management entity */
export type KeyClient = Node & {
  /** Date of creation */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier of client key */
  id: Scalars['ID']['output'];
  /** Key associated to client for authentication process */
  key: Scalars['String']['output'];
  /** Human-readable identifier of key client */
  name: Scalars['String']['output'];
  /** Status of Key Client */
  status: KeyClientStatus;
  /** Date of last update */
  updatedAt: Scalars['DateTime']['output'];
};

/** Edge of Key Client Connection */
export type KeyClientConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Key Client node */
  node: KeyClient;
};

/** Status of Key Client */
export const KeyClientStatus = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE'
} as const;

export type KeyClientStatus = typeof KeyClientStatus[keyof typeof KeyClientStatus];
/** License for the release */
export const LicenseType = {
  AllRightsReserved: 'ALL_RIGHTS_RESERVED',
  CreativeCommons: 'CREATIVE_COMMONS'
} as const;

export type LicenseType = typeof LicenseType[keyof typeof LicenseType];
/** Like action entity */
export type LikeAction = {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Like action id */
  id: Scalars['ID']['output'];
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
  cursor: Scalars['String']['output'];
  /** Like action node */
  node: LikeAction;
};

/** Input used for link query */
export type LinkInput = {
  /** Link slug */
  slug: Scalars['NonEmptyString']['input'];
};

/** Info associated with manually added draft allowlist */
export type ManuallyAddedCollectorsAllowlist = {
  /** Description for manually added allowlist */
  description?: Maybe<Scalars['String']['output']>;
  /** Total number of manually added users in draft allowlist */
  totalCollectors: Scalars['Int']['output'];
  /** Paginated manually added users of draftAllowlist */
  users: UserConnection;
};

/** Media entity */
export type Media = {
  /** AWS S3 Bucket */
  bucket: Scalars['String']['output'];
  /** Dominant color. Only applies for images */
  dominantColor?: Maybe<Scalars['String']['output']>;
  /** Media entity identifier */
  id: Scalars['ID']['output'];
  /** AWS S3 File key */
  key: Scalars['String']['output'];
  /** CDN Url */
  url: Scalars['String']['output'];
};

/** Type of media entity, either Images or Audio */
export const MediaType = {
  ArtistBannerImage: 'ARTIST_BANNER_IMAGE',
  ArtistCollectorsCsv: 'ARTIST_COLLECTORS_CSV',
  ArtistFreeSaleAllowlist: 'ARTIST_FREE_SALE_ALLOWLIST',
  ArtistPresaleAllowlist: 'ARTIST_PRESALE_ALLOWLIST',
  Audio: 'AUDIO',
  Audio_128K: 'AUDIO_128K',
  Audio_192K: 'AUDIO_192K',
  Audio_256K: 'AUDIO_256K',
  AudioHls: 'AUDIO_HLS',
  AvatarImage: 'AVATAR_IMAGE',
  DraftAllowlistedAddressesCsv: 'DRAFT_ALLOWLISTED_ADDRESSES_CSV',
  MerkleTreeCsv: 'MERKLE_TREE_CSV',
  ReleaseBannerImage: 'RELEASE_BANNER_IMAGE',
  ReleaseCoverImage: 'RELEASE_COVER_IMAGE',
  ReleaseGaCoverImage: 'RELEASE_GA_COVER_IMAGE',
  ReleaseGaWebAnimatedImage: 'RELEASE_GA_WEB_ANIMATED_IMAGE',
  ReleaseGaWebStaticAutogenImage: 'RELEASE_GA_WEB_STATIC_AUTOGEN_IMAGE',
  ReleaseGaWebStaticImage: 'RELEASE_GA_WEB_STATIC_IMAGE',
  ReleaseGoldenEggImage: 'RELEASE_GOLDEN_EGG_IMAGE',
  ReleaseHoldersCsv: 'RELEASE_HOLDERS_CSV',
  ReleaseWebAnimatedGoldenEggImage: 'RELEASE_WEB_ANIMATED_GOLDEN_EGG_IMAGE',
  ReleaseWebAnimatedImage: 'RELEASE_WEB_ANIMATED_IMAGE',
  ReleaseWebStaticAutogenImage: 'RELEASE_WEB_STATIC_AUTOGEN_IMAGE',
  ReleaseWebStaticImage: 'RELEASE_WEB_STATIC_IMAGE',
  ShelfCoverImage: 'SHELF_COVER_IMAGE',
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
  uploadKey: Scalars['String']['output'];
};

/** Merkle tree entity */
export type MerkleTree = {
  /** Upload step creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Upload step identifier */
  id: Scalars['ID']['output'];
  /** Number of leaves for merkle tree */
  leafCount: Scalars['Int']['output'];
  /** Merkle tree root */
  root: Scalars['String']['output'];
  /** List of unhashed leaves for merkle tree */
  unhashedLeaves: Array<Scalars['String']['output']>;
};

/** Merkle tree proof information */
export type MerkleTreeProof = {
  /** Merkle proof */
  proof: Array<Scalars['String']['output']>;
  /** Unhashed leaf in merkle tree */
  unhashedLeaf: Scalars['String']['output'];
};

/** Metadata Attribute */
export type MetadataAttribute = {
  /** Trait type */
  traitType?: Maybe<Scalars['String']['output']>;
  /** Value */
  value: Scalars['String']['output'];
};

/** Metadata details of song */
export type MetadataDetails = {
  /** Beats per minute */
  bpm?: Maybe<Scalars['Float']['output']>;
  /** Song key */
  key?: Maybe<Scalars['String']['output']>;
  /** License of song */
  license?: Maybe<Scalars['String']['output']>;
  /** Location associated with song */
  location?: Maybe<Scalars['String']['output']>;
  /** Lyrics of song */
  lyrics?: Maybe<Scalars['String']['output']>;
};

/** Mint current time status */
export const MintTimeStatus = {
  Past: 'PAST',
  Upcoming: 'UPCOMING'
} as const;

export type MintTimeStatus = typeof MintTimeStatus[keyof typeof MintTimeStatus];
/** Filter minted releases */
export type MintedReleasesCursorFilterArgs = {
  /** Specify up to 50 contracts to filter the releases */
  contracts?: InputMaybe<Array<ContractReleaseInput>>;
  /** Only get releases from specified genres */
  genre?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Only get releases from specified genres */
  genres?: InputMaybe<Array<Genres>>;
  /** Remove currently-featured releases from results */
  hideFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Location ids to filter on for releases */
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Only get releases less or equal to than specified mint time */
  mintTimeMaxDate?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Only get releases greater than or equal to specified mint time */
  mintTimeMinDate?: InputMaybe<Scalars['Timestamp']['input']>;
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

/** Mutations */
export type Mutation = {
  /** [PUBLIC] Generate auth challenge for given public address and give back new nonce */
  generateAuthChallenge: Scalars['Int']['output'];
  /** [PUBLIC] Report a track play session stop */
  reportPlayStopped?: Maybe<Scalars['Void']['output']>;
  /** [PUBLIC] Verify given auth challenge */
  verifyAuthChallenge: Scalars['String']['output'];
  /** [PUBLIC] Verify JWT from Dynamic */
  verifyDynamicJWT: Scalars['String']['output'];
  /** [PUBLIC] Verifies user notifications token */
  verifyNotificationEmail: MutationVerifyNotificationEmailResult;
};


/** Mutations */
export type MutationGenerateAuthChallengeArgs = {
  publicAddress: Scalars['String']['input'];
};


/** Mutations */
export type MutationReportPlayStoppedArgs = {
  input: ReportPlayStoppedInput;
};


/** Mutations */
export type MutationVerifyAuthChallengeArgs = {
  publicAddress: Scalars['String']['input'];
  signedMessage: Scalars['String']['input'];
};


/** Mutations */
export type MutationVerifyDynamicJwtArgs = {
  jwt: Scalars['JWT']['input'];
};


/** Mutations */
export type MutationVerifyNotificationEmailArgs = {
  token: Scalars['String']['input'];
};

/** Auto-generated result union type for the mutation or query with the same name */
export type MutationVerifyNotificationEmailResult = MutationVerifyNotificationEmailSuccess | NotificationEmailAlreadyClaimedError | NotificationEmailTokenExpiredOrInvalidError | NotificationEmailTokenInvalidForUserError;

/** Auto-generated success type for the mutation or query with the same name */
export type MutationVerifyNotificationEmailSuccess = {
  data: Scalars['Boolean']['output'];
};

/** User received a new follower */
export type NewFollower = Node & UserNotification & {
  /** Featured new followers */
  featuredFollowers: Array<User>;
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Number of new followers in this group */
  numNewFollowers: Scalars['Int']['output'];
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Recipient user entity */
  user?: Maybe<User>;
};

/** NFT Entity */
export type Nft = Node & {
  /** Audio of Nft */
  audioUrl?: Maybe<Scalars['String']['output']>;
  /** Release collector entity associated with NFT ownership */
  collectorRelease?: Maybe<ReleaseCollector>;
  /** Comment set for NFT */
  comment?: Maybe<Comment>;
  /** Contract address */
  contractAddress: Scalars['String']['output'];
  /** Cover image of NFT */
  coverImage: Media;
  /** Date of creation of NFT entity */
  createdAt: Scalars['DateTime']['output'];
  /** Blockchain created date of NFT */
  createdAtBlockTime?: Maybe<Scalars['DateTime']['output']>;
  /** Nft UUID */
  id: Scalars['ID']['output'];
  /** Was the NFT burned. Shortcut for owner.publicAddress === 0x000.... */
  isBurned: Scalars['Boolean']['output'];
  /** Is the NFT a golden egg */
  isGoldenEgg: Scalars['Boolean']['output'];
  /** OpenSea metadata attributes. */
  openSeaMetadataAttributes: Array<OpenSeaMetadataAttribute>;
  /** Owner of NFT */
  owner: User;
  /** Release associated with NFT */
  release: Release;
  /** Serial number */
  serialNumber: Scalars['Int']['output'];
  /** Song slot reserved by NFT */
  songSlot?: Maybe<Scalars['Int']['output']>;
  /** Tier number */
  tierNumber?: Maybe<Scalars['Int']['output']>;
  /** Title of Nft */
  title: Scalars['String']['output'];
  /** Unique chain token identifier */
  tokenId: Scalars['ID']['output'];
  /** Last update date of NFT */
  updatedAt: Scalars['DateTime']['output'];
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
  cursor: Scalars['String']['output'];
  /** NFT Entity */
  node: Nft;
};

/** Cursor connection parameters for NFTs */
export type NftCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
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
  contractAddress: Scalars['Address']['input'];
  /** Token unique identifier within edition */
  tokenId: Scalars['String']['input'];
};

/** Simplified version of Nft entity filtered to be with non-nullable comment */
export type NftWithComment = {
  /**
   * Amount paid in Wei
   * @deprecated Not updated, do not use
   */
  amountPaidInWei: Scalars['String']['output'];
  /** Avatar URL of Nft owner */
  avatarUrl?: Maybe<Scalars['String']['output']>;
  /** Comment of NFT */
  comment: Comment;
  /** Contract address */
  contractAddress: Scalars['String']['output'];
  /** Unique identifier of Nft */
  id: Scalars['ID']['output'];
  /** If the Nft owner is an artist, returns the name of the artist */
  ownerArtistName?: Maybe<Scalars['String']['output']>;
  /** Public wallet address of owner */
  ownerPublicAddress: Scalars['String']['output'];
  /** Total number of release nfts owned by user */
  ownerReleaseNftCount: Scalars['Int']['output'];
  /** Nft owner username */
  ownerUsername: Scalars['String']['output'];
  /** Webapp URI of Nft owner */
  ownerWebappUri: Scalars['String']['output'];
  /** Acumulative serial number */
  serialNumber: Scalars['Int']['output'];
  /** Song slot reserved by NFT */
  songSlot: Scalars['Int']['output'];
  /** Unique chain token identifier */
  tokenId: Scalars['String']['output'];
  /** Last update date of NFT */
  updatedAt: Scalars['Timestamp']['output'];
};

/** Base node */
export type Node = {
  /** Node identifier */
  id: Scalars['ID']['output'];
};

/** Info for not supported versions */
export type NotSupportedVersion = VersionStatusResponseInterface & {
  /** Not supported version message */
  message: Scalars['String']['output'];
  /** Recommended version */
  recommendedVersion: Scalars['String']['output'];
};

/** Returned when the user attempts to claim an email for notifications that is already claimed by another user */
export type NotificationEmailAlreadyClaimedError = Error & {
  /** Descriptive message of error */
  message: Scalars['String']['output'];
};

/** Returned when the user attempts to claim a token that has already been claimed or is expired */
export type NotificationEmailTokenExpiredOrInvalidError = Error & {
  /** Descriptive message of error */
  message: Scalars['String']['output'];
};

/** Returned when the user attempts to claim a token that is not valid for the user */
export type NotificationEmailTokenInvalidForUserError = Error & {
  /** Descriptive message of error */
  message: Scalars['String']['output'];
};

/** OpenSea Metadata Attribute */
export type OpenSeaMetadataAttribute = {
  /** Trait type */
  traitType?: Maybe<Scalars['String']['output']>;
  /** Value */
  value: Scalars['String']['output'];
};

/** Pagination helper information */
export type PageInfo = {
  /** Cursor shorthand of the last node from current page */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Does the current connection have a next page */
  hasNextPage: Scalars['Boolean']['output'];
  /** Does the current connection have a previous page */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** Cursor shorthand of the first node from current page */
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** Platform type */
export const PlatformType = {
  Android: 'ANDROID',
  Ios: 'IOS',
  Web: 'WEB'
} as const;

export type PlatformType = typeof PlatformType[keyof typeof PlatformType];
/** Playlist entity that contains tracks */
export type Playlist = {
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']['output'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist action entity */
export type PlaylistAction = {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Playlist action id */
  id: Scalars['ID']['output'];
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
  cursor: Scalars['String']['output'];
  /** Playlist action node */
  node: PlaylistAction;
};

/** Filter PlaylistAction details */
export type PlaylistActionFilterArgs = {
  /** If set, only show artist owned releases in paginated release results. Does not apply if the playlist is owned by the artist */
  releaseArtistId?: InputMaybe<Scalars['UUID']['input']>;
};

/** Cursor connection parameters */
export type PlaylistActionReleasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the number of nodes to be fetched, to be used with "after", with a maximum of 25 nodes */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the number of nodes to be fetched, to be used with "before", with a maximum of 25 nodes */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Sort the releases ascending or descending by release creation date */
  sort?: SortOrder;
};

/** Playlist affiliate buyer entity */
export type PlaylistAffiliateBuyer = Node & {
  /** Unique identifier of playlist affiliate buyer */
  id: Scalars['ID']['output'];
  /** Most recent affiliate purchase date by user from playlist referral. */
  mostRecentAffiliatePurchaseDate?: Maybe<Scalars['DateTime']['output']>;
  /** Number of nfts purchased by user from playlist referral. */
  numAffiliateNftsPurchased?: Maybe<Scalars['Int']['output']>;
  /** User buyer entity */
  user: User;
};

/** Paginated playlist affiliate buyers connection */
export type PlaylistAffiliateBuyerConnection = Connection & {
  /** Edges of current page */
  edges: Array<PlaylistAffiliateBuyerConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Playlist Affiliate Buyer Connection */
export type PlaylistAffiliateBuyerConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Playlist Affiliate Buyer node */
  node: PlaylistAffiliateBuyer;
};

/** Playlist of tracks of an artist */
export type PlaylistArtist = Playlist & {
  artistId: Scalars['ID']['output'];
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']['output'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist chart entity */
export type PlaylistChart = Node & {
  /** Chart ranks of release chart */
  chartRanks: PlaylistChartRankConnection;
  /** UUID of Playlist chart entity */
  id: Scalars['ID']['output'];
  /** Last full day of the chart period (inclusive) */
  lastDayOfChartInclusive: Scalars['DateTime']['output'];
  /** Playlist chart period end exclusive */
  periodEndExclusive: Scalars['DateTime']['output'];
  /** Playlist chart period start inclusive */
  periodStartInclusive: Scalars['DateTime']['output'];
};


/** Playlist chart entity */
export type PlaylistChartChartRanksArgs = {
  pagination?: PlaylistChartRankCursorConnectionArgs;
};

/** Playlist chart rank entity */
export type PlaylistChartRank = Node & {
  /** Current ranking of release */
  currentRank: Scalars['Int']['output'];
  /** UUID of Playlist chart entity */
  id: Scalars['ID']['output'];
  /** Chart rank release */
  playlist: Shelf;
  /** Last ranking of release */
  rankLast?: Maybe<Scalars['Int']['output']>;
  /** Peak ranking of release */
  rankPeak?: Maybe<Scalars['Int']['output']>;
  /** Trending indicator of release */
  trendingIndicator: TrendingIndicator;
  /** Trending streak of release */
  trendingStreak: Scalars['Int']['output'];
};

/** Paginated connection of Playlist Chart Ranks */
export type PlaylistChartRankConnection = Connection & {
  /** Edges of current page */
  edges: Array<PlaylistChartRankConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Playlist Chart Rank Connection */
export type PlaylistChartRankConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Playlist Chart Rank node */
  node: PlaylistChartRank;
};

/** Pagination paramaters for release chart ranks */
export type PlaylistChartRankCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Customize sort behavior */
  sort?: PlaylistChartRankCursorConnectionSort;
};

/** Customize sort of collectors */
export type PlaylistChartRankCursorConnectionSort = {
  /** Sort by playlist chart current rank */
  currentRank?: InputMaybe<SortOrder>;
};

/** Playlist created */
export type PlaylistCreated = ArtistAction & CollectorAction & Node & PlaylistAction & ReleaseAction & {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Artist action id */
  id: Scalars['ID']['output'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
  /** User corresponding to action entity */
  user: User;
};

/** Playlist of tracks of a holder' NFTs */
export type PlaylistHolder = Playlist & {
  /** Holder public address */
  holderPublicAddress: Scalars['String']['output'];
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']['output'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist used for Homepage and fallback for extra pages */
export type PlaylistHome = Playlist & {
  createdAt: Scalars['DateTime']['output'];
  /** Ephemeral Unique UUID. Since right now the playlists are not being persisted, it's a completely randomly created UUID created on memory */
  id: Scalars['ID']['output'];
  /** Track list */
  tracks: Array<PlaylistTrack>;
};

/** Playlist input */
export type PlaylistInput = {
  /** Association ID based on type of playlist */
  associationId?: InputMaybe<Scalars['String']['input']>;
  /** Type of playlist */
  type: PlaylistType;
};

/** Playlist liked action entity */
export type PlaylistLiked = ArtistAction & CollectorAction & Node & PlaylistAction & {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
  /** User corresponding to playlist liked action entity */
  user: User;
};

/** Simplified track entity to only contain identifiers to associated entities */
export type PlaylistTrack = {
  /** Artist ID */
  artistId: Scalars['ID']['output'];
  /** Track ID */
  id: Scalars['ID']['output'];
  /** Release ID */
  releaseId: Scalars['ID']['output'];
};

/** Currently supported playlists */
export const PlaylistType = {
  Artist: 'ARTIST',
  Holder: 'HOLDER',
  Home: 'HOME'
} as const;

export type PlaylistType = typeof PlaylistType[keyof typeof PlaylistType];
/** A subscribed artist release presale has dropped and user is eligible */
export type PresaleStarted = Node & UserNotification & {
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Dropped presale release entity */
  release?: Maybe<Release>;
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Recipient user entity */
  user?: Maybe<User>;
};

/** Primary sale collector action entity */
export type PrimarySale = ArtistAction & CollectorAction & Node & ReleaseAction & {
  /** Amount paid in Wei for primary sale */
  amountPaidInWei: Scalars['String']['output'];
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Starting token ID of NFT for bonding curve sale purchase */
  fromTokenId: Scalars['Int']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Number of sequential tokens purchased */
  quantity: Scalars['Int']['output'];
  /** Release corresponding to collector primary sale action entity */
  release: Release;
  /** Serial number of nft primary sale purchase */
  serialNumber: Scalars['Int']['output'];
  /** Ending token ID of NFT for bonding curve sale purchase */
  toTokenId: Scalars['Int']['output'];
  /** User corresponding to collector action entity */
  user: User;
};

/** A subscribed artist release has dropped */
export type PublicSaleStarted = Node & UserNotification & {
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Dropped release entity */
  release?: Maybe<Release>;
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Recipient user entity */
  user?: Maybe<User>;
};

/** Queries */
export type Query = {
  /** [PUBLIC] Activity Feed with filter parameters */
  activityFeed?: Maybe<ActivityFeed>;
  /** [PUBLIC] Paginate through all collectors of the system */
  allCollectors: UserConnection;
  /** Paginate through all shelves of the system */
  allShelves: ShelfConnection;
  /** [PUBLIC] Artist by UUID */
  artist?: Maybe<Artist>;
  /** [PUBLIC] Artist activity feed */
  artistActivityFeed: ArtistActionConnection;
  /** [PUBLIC] Artist by handle */
  artistByHandle?: Maybe<Artist>;
  /** [PUBLIC] Artist Partnership information */
  artistPartnership: ArtistPartnership;
  /** [PUBLIC] Get all artists of platform. */
  artists: ArtistConnection;
  /**
   * [PUBLIC] Get audio from track
   * @deprecated Use Track.audio instead
   */
  audioFromTrack: TrackAudio;
  /** [PUBLIC] Get authenticated user information, if any */
  authUser?: Maybe<User>;
  /** [PUBLIC] Collector activity feed */
  collectorActivityFeed: CollectorActionConnection;
  /** [PUBLIC] Get credit split by id */
  creditSplit?: Maybe<CreditSplit>;
  /** [PUBLIC] Get currencies conversions */
  currencies: Currencies;
  /** Get current release chart */
  currentPlaylistChart: PlaylistChart;
  /** Get current release chart */
  currentReleaseChart: ReleaseChart;
  /** [PUBLIC] Get DraftAllowList from release and mintType */
  draftAllowlistFromRelease?: Maybe<DraftAllowList>;
  /** Return list of tokenIds owned by user public address */
  editionOwnedTokenIds: Array<Scalars['String']['output']>;
  /** [PUBLIC] Get EggGame of specified release */
  eggGame?: Maybe<EggGame>;
  /** [PUBLIC] Get feature flag value by name */
  featureFlag?: Maybe<FeatureFlag>;
  /**
   * [PUBLIC] Get currently-featured releases
   * @deprecated Use highlightedReleases query instead
   */
  featuredReleases: Array<Release>;
  /** [PUBLIC] Get the top 5 highlighted releases */
  highlightedReleases: Array<Release>;
  /** [PUBLIC] Get playlist based on given type and associationId */
  legacyPlaylist?: Maybe<Playlist>;
  /** [PUBLIC] User like and unlike activity feed */
  likeActivityFeed: LikeActionConnection;
  /** [PUBLIC] Get a node based on specific slug */
  link?: Maybe<Node>;
  /**
   * [PUBLIC] Get merkle tree information
   * @deprecated Use merkleTreeFromRoot instead
   */
  merkleTree: MerkleTree;
  /** [PUBLIC] Allowlisted addresses from merkle tree csv url */
  merkleTreeCSVUrl?: Maybe<Scalars['String']['output']>;
  /** [PUBLIC] Get merkle tree information */
  merkleTreeFromRoot?: Maybe<MerkleTree>;
  /** [PUBLIC] Get merkle tree information */
  merkleTreeProof?: Maybe<MerkleTreeProof>;
  /** [PUBLIC] Get minted release by Artist sound handle and release title slug */
  mintedRelease?: Maybe<Release>;
  /** [PUBLIC] Request nft with contract fields */
  nft: Nft;
  /** [PUBLIC] Request nft from unique sound identifier */
  nftFromId?: Maybe<Nft>;
  /** [PUBLIC] Activity Feed of notable collectors */
  notableCollectorsActivityFeed?: Maybe<ActivityFeed>;
  /** [PUBLIC] Current UNIX date to test caching */
  now: Scalars['Int']['output'];
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
  /**
   * [PUBLIC] Release allow listed addresses csv url
   * @deprecated Use Query.merkleTreeCSVUrl instead
   */
  releaseAllowListedAddressesCSVUrl?: Maybe<Scalars['String']['output']>;
  /** [PUBLIC] Get allowlist for release */
  releaseAllowlist?: Maybe<ReleaseMerkleAllowlist>;
  /** Get release chart based on input */
  releaseChart: ReleaseChart;
  /** [PUBLIC] Get release chart based on date input */
  releaseChartByDate?: Maybe<ReleaseChart>;
  /** Get release chart based on identifier */
  releaseChartById?: Maybe<ReleaseChart>;
  /** [PUBLIC] Latest supported ranges for ReleaseCharts */
  releaseChartPeriods: ReleaseChartsPeriodRange;
  /** [PUBLIC] Get release chart rank based on input */
  releaseChartRank: ReleaseChartRank;
  /** [PUBLIC] Get release charts based on input */
  releaseCharts: ReleaseChartConnection;
  /** [PUBLIC] Get all users that collected the same release in one activity feed group. */
  releaseCollectedByManyUsers: UserConnection;
  /** [PUBLIC] Get specified release collector from unique identifier */
  releaseCollectorFromId?: Maybe<ReleaseCollector>;
  /** [PUBLIC] Get release by contract address */
  releaseFromContract?: Maybe<Release>;
  /** [PUBLIC] Get the release that's associated with the specific token parameters */
  releaseFromToken?: Maybe<Release>;
  /** [PUBLIC] List of genres that have at least 1 release */
  releaseGenres: Array<Genre>;
  /** [PUBLIC] Get all releases */
  releases: ReleaseConnection;
  /** [PUBLIC] Get all releases that collectors of a given release have also minted */
  releasesCollectorsAlsoMinted: Array<Release>;
  /** [PUBLIC] Search releases or artists based on text inputs */
  search: SearchResult;
  /** [PUBLIC] Get specified shelf by id */
  shelf: Shelf;
  /** [PUBLIC] Top affiliate curators list */
  topAffiliateCurators: Array<AffiliateCurator>;
  /**
   * [PUBLIC] Get trending artists information
   * @deprecated Please use Query.topArtistsV2
   */
  topArtists: Array<TrendingArtistInfo>;
  /** [PUBLIC] Get top artists */
  topArtistsV2: Array<TrendingArtistInfo>;
  /**
   * [PUBLIC] Get top collectors information
   * @deprecated Use Query.topCollectorsV2 instead
   */
  topCollectors: Array<TrendingCollectorInfo>;
  /** [PUBLIC] Get top collectors information based on currently owned NFTs */
  topCollectorsV2: Array<TrendingCollectorInfo>;
  /** [PUBLIC] Get trending playlists */
  topPlaylists: Array<TrendingPlaylistInfo>;
  /** [PUBLIC] Get trending releases */
  topReleases: Array<TrendingReleaseInfo>;
  /** [PUBLIC] Get total raised of the whole platform */
  totalRaisedPlatform: TotalRaisedPlatform;
  /** [PUBLIC] Total count of minted releases */
  totalReleasesCount: Scalars['Int']['output'];
  /** [PUBLIC] Get track by id */
  track?: Maybe<Track>;
  /**
   * [PUBLIC] Get trending artists information
   * @deprecated Please use Query.topArtists
   */
  trendingArtistInfo: Array<TrendingArtistInfo>;
  /**
   * [PUBLIC] Get trending collectors information
   * @deprecated Please use Query.topCollectors
   */
  trendingCollectors: Array<TrendingCollectorInfo>;
  /**
   * [PUBLIC] Get trending playlists
   * @deprecated Use Query.topPlaylists instead
   */
  trendingPlaylists: Array<TrendingPlaylistInfo>;
  /**
   * [PUBLIC] Get trending releases
   * @deprecated Please use Query.topReleases
   */
  trendingReleases: Array<TrendingReleaseInfo>;
  /** [PUBLIC] Get specified user by id */
  user?: Maybe<User>;
  /** [PUBLIC] Get specified user by public address or ens, if both args provided mismatch, returns null */
  userByAddress?: Maybe<User>;
  /** [PUBLIC] Get specified user by sound handle */
  userByArtistHandle?: Maybe<User>;
  /** [PUBLIC] User like and unlike activity feed */
  userLikeActivityFeed: CollectorActionConnection;
  /** [PUBLIC] List of top 3 followers of user by follower count */
  userTopFollowers: Array<User>;
  /** [PUBLIC] Get platform version status */
  versionStatus: VersionStatusResponse;
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
export type QueryAllShelvesArgs = {
  input?: AllShelvesInput;
};


/** Queries */
export type QueryArtistArgs = {
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryArtistActivityFeedArgs = {
  artistId: Scalars['UUID']['input'];
  filter?: ArtistActivityFeedFilterArgs;
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryArtistByHandleArgs = {
  soundHandle: Scalars['String']['input'];
};


/** Queries */
export type QueryArtistsArgs = {
  filter?: InputMaybe<ArtistCursorFilterArgs>;
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryAudioFromTrackArgs = {
  trackId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryCollectorActivityFeedArgs = {
  filter?: CollectorActivityFeedFilterArgs;
  pagination?: CursorConnectionArgs;
  userId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryCreditSplitArgs = {
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryDraftAllowlistFromReleaseArgs = {
  input: DraftAllowlistFromReleaseInput;
};


/** Queries */
export type QueryEditionOwnedTokenIdsArgs = {
  input: EditionOwnedTokenIdsInput;
};


/** Queries */
export type QueryEggGameArgs = {
  releaseId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryFeatureFlagArgs = {
  name: Scalars['String']['input'];
};


/** Queries */
export type QueryLegacyPlaylistArgs = {
  input: PlaylistInput;
};


/** Queries */
export type QueryLikeActivityFeedArgs = {
  pagination?: CursorConnectionArgs;
  userId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryLinkArgs = {
  input: LinkInput;
};


/** Queries */
export type QueryMerkleTreeArgs = {
  root: Scalars['String']['input'];
};


/** Queries */
export type QueryMerkleTreeCsvUrlArgs = {
  merkleRoot: Scalars['String']['input'];
};


/** Queries */
export type QueryMerkleTreeFromRootArgs = {
  root: Scalars['String']['input'];
};


/** Queries */
export type QueryMerkleTreeProofArgs = {
  root: Scalars['String']['input'];
  unhashedLeaf: Scalars['String']['input'];
};


/** Queries */
export type QueryMintedReleaseArgs = {
  releaseSlug: Scalars['String']['input'];
  soundHandle: Scalars['String']['input'];
};


/** Queries */
export type QueryNftArgs = {
  input: NftInput;
};


/** Queries */
export type QueryNftFromIdArgs = {
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryPlaylistActionArgs = {
  filter?: InputMaybe<PlaylistActionFilterArgs>;
  id: Scalars['UUID']['input'];
  playlistId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryPlaylistActivityFeedArgs = {
  pagination?: CursorConnectionArgs;
  playlistId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryPlaylistV2Args = {
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryPurchaseActivityFeedArgs = {
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryReleaseArgs = {
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryReleaseActivityFeedArgs = {
  filter?: ReleaseActivityFeedFilterArgs;
  pagination?: CursorConnectionArgs;
  releaseId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryReleaseAllowListedAddressesCsvUrlArgs = {
  merkleRoot: Scalars['String']['input'];
  releaseId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryReleaseAllowlistArgs = {
  input: ReleaseAllowlistInput;
};


/** Queries */
export type QueryReleaseChartArgs = {
  input: ReleaseChartInput;
};


/** Queries */
export type QueryReleaseChartByDateArgs = {
  input: ReleaseChartByLastDayInput;
};


/** Queries */
export type QueryReleaseChartByIdArgs = {
  chartId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryReleaseChartRankArgs = {
  input: ReleaseChartRankInput;
};


/** Queries */
export type QueryReleaseChartsArgs = {
  input: ReleaseChartsInput;
};


/** Queries */
export type QueryReleaseCollectedByManyUsersArgs = {
  activityFeedGroupId: Scalars['UUID']['input'];
  pagination?: CursorConnectionArgs;
};


/** Queries */
export type QueryReleaseCollectorFromIdArgs = {
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryReleaseFromContractArgs = {
  contractAddress: Scalars['Address']['input'];
  editionId?: InputMaybe<Scalars['String']['input']>;
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
export type QueryReleasesCollectorsAlsoMintedArgs = {
  releaseId: Scalars['UUID']['input'];
};


/** Queries */
export type QuerySearchArgs = {
  input: SearchInput;
};


/** Queries */
export type QueryShelfArgs = {
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryTopAffiliateCuratorsArgs = {
  input: TopAffiliateCuratorsInput;
};


/** Queries */
export type QueryTopArtistsArgs = {
  sort: TrendingArtistsSortEnum;
  timePeriod: TimePeriodAggEnum;
};


/** Queries */
export type QueryTopArtistsV2Args = {
  input: TopArtistsInput;
};


/** Queries */
export type QueryTopCollectorsArgs = {
  sort: TrendingCollectorsSortEnum;
  timePeriod: TimePeriodAggEnum;
};


/** Queries */
export type QueryTopCollectorsV2Args = {
  limit?: Scalars['PositiveInt']['input'];
  sort: TrendingCollectorsSortEnum;
  timePeriod: TopChartTimePeriodEnum;
};


/** Queries */
export type QueryTopPlaylistsArgs = {
  input: TopPlaylistsInput;
};


/** Queries */
export type QueryTopReleasesArgs = {
  sort: TrendingReleasesSortEnum;
  timePeriod: TimePeriodAggEnum;
};


/** Queries */
export type QueryTotalReleasesCountArgs = {
  filter?: InputMaybe<MintedReleasesCursorFilterArgs>;
};


/** Queries */
export type QueryTrackArgs = {
  id: Scalars['UUID']['input'];
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
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryUserByAddressArgs = {
  ens?: InputMaybe<Scalars['ENS']['input']>;
  publicAddress?: InputMaybe<Scalars['Address']['input']>;
};


/** Queries */
export type QueryUserByArtistHandleArgs = {
  soundHandle: Scalars['String']['input'];
};


/** Queries */
export type QueryUserLikeActivityFeedArgs = {
  pagination?: CursorConnectionArgs;
  userId: Scalars['UUID']['input'];
};


/** Queries */
export type QueryUserTopFollowersArgs = {
  id: Scalars['UUID']['input'];
};


/** Queries */
export type QueryVersionStatusArgs = {
  input: VersionStatusInput;
};

/** Referrals received notification */
export type ReferralReceivedNotification = Node & UserNotification & {
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Total received for grouped referrals in WEI */
  totalReceivedWei?: Maybe<Scalars['String']['output']>;
  /** Recipient user entity */
  user?: Maybe<User>;
};

/** Pagination parameters of referred users */
export type ReferredUsersCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 25 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 25 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Customize sort behavior */
  sort?: ReferredUsersCursorConnectionSort;
};

/** Customize the sort behavior of release affiliates total purchases */
export type ReferredUsersCursorConnectionSort = {
  /** Sort by purchase block number */
  blockNumber?: InputMaybe<SortOrder>;
};

/** Input for referred users within release affiliate total purchases */
export type ReferredUsersInput = {
  /** Pagination parameters */
  pagination?: ReferredUsersCursorConnectionArgs;
};

/** Release entity */
export type Release = Node & {
  /** Release activity feed */
  activityFeed: ReleaseActionConnection;
  /** Number of nfts airdropped */
  airdropCount: Scalars['Int']['output'];
  /** Animated cover image of the release if the cover is a GIF. Otherwise, null */
  animatedCoverImage?: Maybe<Media>;
  /** Animated golden egg image optimized for client rendering */
  animatedGoldenEggImageOptimized?: Maybe<Media>;
  /** Artist of release */
  artist: Artist;
  /** Type of auction contract */
  auctionContractType?: Maybe<ContractType>;
  /** Auction type defined on upload flow */
  auctionType?: Maybe<AuctionType>;
  /** Base metadata attributes (non golden egg). */
  baseMetadataAttributes: Array<MetadataAttribute>;
  /** Behind the music text */
  behindTheMusic: Scalars['String']['output'];
  /** Can collectors download audio */
  canCollectorsDownloadAudio: Scalars['Boolean']['output'];
  /** Chain ID on which release is minted on */
  chainId: Scalars['Int']['output'];
  /** Currently claimed song slots */
  claimedSongSlots: Array<Scalars['Int']['output']>;
  /** Collectors of release */
  collectors: ReleaseCollectorConnection;
  /** Amount of unique collectors of release */
  collectorsCount: Scalars['Int']['output'];
  /** Contract associated to Sound Edition */
  contract: Contract;
  /** Contract address */
  contractAddress: Scalars['String']['output'];
  /** Cover image of release */
  coverImage: Media;
  /** Release creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Credit split associated with release, if any */
  creditSplit?: Maybe<CreditSplit>;
  /** Users with credits of release */
  credits: Array<User>;
  /** Draft id associated to release */
  draftId?: Maybe<Scalars['String']['output']>;
  /** Edition ID */
  editionId?: Maybe<Scalars['String']['output']>;
  /** EggGame of Release */
  eggGame?: Maybe<EggGame>;
  /** Associated external url */
  externalUrl?: Maybe<Scalars['String']['output']>;
  /** Final quantity for a release. Will be defined as soon as a max quantity has been determined */
  finalQuantity?: Maybe<Scalars['Int']['output']>;
  /**
   * Last sale schedule end time as number of milliseconds since the ECMAScript epoch.
   * @deprecated Use supplyCutoffTimestamp, final schedule is ambiguous and not necessarily the main sale
   */
  finalSaleScheduleEndTimestamp?: Maybe<Scalars['Timestamp']['output']>;
  /** Address set as funds recipient on the contract */
  fundingAddress: Scalars['String']['output'];
  /** GA Cover image of release for tiered editions */
  gaCoverImage?: Maybe<Media>;
  /** Genre of Release */
  genre: Genre;
  /** Special golden egg image */
  goldenEggImage: Media;
  /**
   * Is the release a range bound edition
   * @deprecated Should not be used moving forward
   */
  hasRangeBoundSale: Scalars['Boolean']['output'];
  /** Release identifier */
  id: Scalars['ID']['output'];
  /**
   * Is release sold out relative to the final quantity
   * @deprecated Use 'isFirstPhaseCompleted' instead
   */
  isFinalSoldOut: Scalars['Boolean']['output'];
  /** Is release sold out relative to the final quantity on first phase */
  isFirstPhaseCompleted: Scalars['Boolean']['output'];
  /** Release last updated at timestamp */
  lastUpdatedAt?: Maybe<Scalars['DateTime']['output']>;
  /**
   * Associated laylo.com url.
   * @deprecated No longer supported and will always return NULL
   */
  layloUrl?: Maybe<Scalars['String']['output']>;
  /** Paginate through users who like this release. */
  likedBy: UserConnection;
  /** Auction listing associated with release */
  listing?: Maybe<AuctionListingInterface>;
  /** Associated market place url */
  marketPlaceUrl?: Maybe<Scalars['String']['output']>;
  /** Metadata details associated of song */
  metadataDetails?: Maybe<MetadataDetails>;
  /** Public sale start time in UNIX timestamp */
  mintStartTime: Scalars['Int']['output'];
  /** Public sale start timestamp */
  mintStartTimestamp: Scalars['Timestamp']['output'];
  /** NFTs of Release */
  nftsPaginated: NftConnection;
  /** Amount of sold NFTs */
  numSold: Scalars['Int']['output'];
  /** Associated opensea url */
  openseaUrl?: Maybe<Scalars['String']['output']>;
  /** Price in Wei */
  price: Scalars['String']['output'];
  /** Affiliate fee in basis points of the first non-merkle-drop schedule */
  publicAffiliateFeeBPS?: Maybe<Scalars['Int']['output']>;
  /** Affiliate fee in percent of the first non-merkle-drop schedule */
  publicAffiliateFeePercent?: Maybe<Scalars['String']['output']>;
  /** Public minting start time */
  publicMintStart: Scalars['DateTime']['output'];
  /** Quantity of available NFTs */
  quantity: Scalars['Int']['output'];
  /** Lower bound quantity for a releases main sale. */
  quantityLowerBound: Scalars['Int']['output'];
  /** Upper bound quantity for a releases main sale. */
  quantityUpperBound: Scalars['Int']['output'];
  /** Rewards of Release */
  rewards: Array<Reward>;
  /** Creator royalty basis points */
  royaltyBps: Scalars['Int']['output'];
  /** Sale details for release */
  saleDetails: SaleDetails;
  /** Minting periods */
  saleSchedules: Array<SaleSchedule>;
  /** Unique list of affiliate fees percent ordered by start time of sale schedule */
  salesAffiliateFeesPercent: Array<Scalars['String']['output']>;
  /** Sound Automated Market (SAM) address associated with the release */
  samAddress?: Maybe<Scalars['String']['output']>;
  /** Override for the SAM buy buffer in basis points (bps) for this release */
  samBuyBufferBpsOverride?: Maybe<Scalars['Int']['output']>;
  /** SAM configuration if enabled for edition */
  samConfig?: Maybe<SamConfig>;
  /** Override for the SAM sell buffer in basis points (bps) for this release */
  samSellBufferBpsOverride?: Maybe<Scalars['Int']['output']>;
  /** Edition schedule identifiers, used to optimize chain calls */
  scheduleIds?: Maybe<Array<ScheduleIdentifier>>;
  /** Season associated to release */
  season?: Maybe<Scalars['String']['output']>;
  /** Shelves where the release has been added to */
  shelves: ShelfConnection;
  /** Release collectors that are prioritized based on followers status */
  socialProofCollectors: Array<User>;
  /** Static version of animated cover image of release if the cover is a GIF. Otherwise, null */
  staticCoverImage?: Maybe<Media>;
  /** Time when supply is fixed for open/range based auctions. This is irrelevant for fixed supply auctions. */
  supplyCutoffTimestamp?: Maybe<Scalars['Timestamp']['output']>;
  /** Release title */
  title: Scalars['String']['output'];
  /** Slugified title */
  titleSlug: Scalars['String']['output'];
  /** Top 5 collectors, sorted by nft count descendingly followed by lowest serial number ascendingly */
  topCollectors: Array<TopReleaseCollector>;
  /** Top 100 Nfts with comment, earlier serial numbers get precedence for conflicting song slots */
  topNftsWithComment: Array<NftWithComment>;
  /** Total minted NFTs */
  totalMinted: Scalars['Int']['output'];
  /**
   * Total raised in Wei
   * @deprecated Use Release.saleDetails.primaryRaisedInWei instead.
   */
  totalRaised: Scalars['String']['output'];
  /**
   * Total amount raised from primary sales converted from eth to usd
   * @deprecated No longer being used
   */
  totalRaisedPrimaryUsd: Scalars['Float']['output'];
  /** Total amount raised from secondary sales converted from eth to usd */
  totalRaisedSecondaryUsd: Scalars['Float']['output'];
  /** Total supply of NFTs */
  totalSupply: Scalars['Int']['output'];
  /** Track of release */
  track: Track;
  /** Type of Release */
  type: ReleaseType;
  /** VIP Cover image of release for tiered editions */
  vipCoverImage?: Maybe<Media>;
  /** Web HTML iframe embed */
  webEmbed: Scalars['String']['output'];
  /** Webapp URI of Release */
  webappUri: Scalars['String']['output'];
};


/** Release entity */
export type ReleaseActivityFeedArgs = {
  input: ReleaseActivityFeedInput;
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
export type ReleaseSocialProofCollectorsArgs = {
  userId?: InputMaybe<Scalars['UUID']['input']>;
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
  date: Scalars['DateTime']['output'];
  /** Release action id */
  id: Scalars['ID']['output'];
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
  cursor: Scalars['String']['output'];
  /** Release action node */
  node: ReleaseAction;
};

/** Filter release activity types */
export type ReleaseActivityFeedFilterArgs = {
  /** Only get activity of given type */
  types?: Array<ReleaseActivityFeedTypeFilterOption>;
};

/** Release activity feed input parameters */
export type ReleaseActivityFeedInput = {
  /** Only get activities of given types */
  filter?: ReleaseActivityFeedFilterArgs;
  /** Pagination parameters */
  pagination?: CursorConnectionArgs;
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
  earningsETH: Scalars['String']['output'];
  /** Total of earnings in wei associated with affiliate purchases */
  earningsWei: Scalars['String']['output'];
  /** Unique identifier from release id and affiliate address */
  id: Scalars['ID']['output'];
  /** Quantity of purchases */
  purchasesQuantity: Scalars['Int']['output'];
  /** Referred users of release */
  referredCollectors: ReleaseReferredCollectorConnection;
  /** Release associated to affiliate purchases */
  release: Release;
};


/** Aggregate of all affiliate purchases of specific affiliate user and release */
export type ReleaseAffiliateTotalPurchasesReferredCollectorsArgs = {
  input?: ReferredUsersInput;
};

/** ReleaseAffiliateTotalPurchases edge */
export type ReleaseAffiliateTotalPurchasesEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
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
/** Input for releaseAllowlist query */
export type ReleaseAllowlistInput = {
  /** Merkle tree root */
  merkleRoot: Scalars['String']['input'];
  /** Release identifier */
  releaseId: Scalars['UUID']['input'];
};

/** Shared sub allowlist information */
export type ReleaseBaseSubAllowlist = {
  /** Node identifier */
  id: Scalars['ID']['output'];
  /** Total number of addresses in sub allowlist */
  totalAddresses: Scalars['Int']['output'];
};

/** Release chart entity */
export type ReleaseChart = Node & {
  /** Chart ranks of release chart */
  chartRanks: ReleaseChartRankConnection;
  /** UUID of Release chart entity */
  id: Scalars['ID']['output'];
  /** Last full day of the chart period (inclusive) */
  lastDayOfChartInclusive: Scalars['DateTime']['output'];
  /** Release chart period end exclusive */
  periodEndExclusive: Scalars['DateTime']['output'];
  /** Release chart period start inclusive */
  periodStartInclusive: Scalars['DateTime']['output'];
};


/** Release chart entity */
export type ReleaseChartChartRanksArgs = {
  pagination?: ReleaseChartRankCursorConnectionArgs;
};

/** Input for releaseChart query */
export type ReleaseChartByLastDayInput = {
  /** Locate chart using the last date of the period (inclusive) */
  lastDayOfChartInclusive: Scalars['DateTime']['input'];
};

/** Paginated connection of Release Charts */
export type ReleaseChartConnection = Connection & {
  /** Edges of current page */
  edges: Array<ReleaseChartConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Release Chart Connection */
export type ReleaseChartConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Release Chart node */
  node: ReleaseChart;
};

/** Pagination paramaters for release charts */
export type ReleaseChartCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Customize sort behavior */
  sort?: ReleaseChartCursorConnectionSort;
};

/** Customize sort of release charts */
export type ReleaseChartCursorConnectionSort = {
  /** Sort by release chart period end exclusive */
  periodEndExclusive?: InputMaybe<SortOrder>;
};

/** Input for releaseChart query */
export type ReleaseChartInput = {
  /** Filter on periodEnd date */
  periodEndExclusive: Scalars['DateTime']['input'];
};

/** Release chart rank entity */
export type ReleaseChartRank = Node & {
  /** Current ranking of release */
  currentRank: Scalars['Int']['output'];
  /** UUID of Release chart entity */
  id: Scalars['ID']['output'];
  /** Last ranking of release */
  rankLast?: Maybe<Scalars['Int']['output']>;
  /** Peak ranking of release */
  rankPeak?: Maybe<Scalars['Int']['output']>;
  /** Chart rank release */
  release: Release;
  /** Trending indicator of release */
  trendingIndicator: TrendingIndicator;
  /** Trending streak of release */
  trendingStreak: Scalars['Int']['output'];
};

/** Paginated connection of Release Chart Ranks */
export type ReleaseChartRankConnection = Connection & {
  /** Edges of current page */
  edges: Array<ReleaseChartRankConnectionEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of Release Chart Rank Connection */
export type ReleaseChartRankConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Release Chart Rank node */
  node: ReleaseChartRank;
};

/** Pagination paramaters for release chart ranks */
export type ReleaseChartRankCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Customize sort behavior */
  sort?: ReleaseChartRankCursorConnectionSort;
};

/** Customize sort of collectors */
export type ReleaseChartRankCursorConnectionSort = {
  /** Sort by release chart current rank */
  currentRank?: InputMaybe<SortOrder>;
};

/** Input for releaseChartRank query */
export type ReleaseChartRankInput = {
  /** Release Chart Rank entity id */
  id: Scalars['UUID']['input'];
};

/** Input for releaseChart query */
export type ReleaseChartsInput = {
  /** Cursor connection parameters */
  pagination?: ReleaseChartCursorConnectionArgs;
};

/** Latest supported ranges for ReleaseCharts */
export type ReleaseChartsPeriodRange = {
  /** Earliest date covered by ReleaseCharts (inclusive in UTC) */
  earliestPeriodStartInclusive: Scalars['DateTime']['output'];
  /** Latest date covered by ReleaseCharts (exclusive in UTC) */
  latestPeriodEndExclusive: Scalars['DateTime']['output'];
};

/** Release collector */
export type ReleaseCollector = Node & {
  /** First release nft collected by user */
  firstNftCollected: Nft;
  /** Date of first nft collected */
  firstNftCollectedDate: Scalars['DateTime']['output'];
  /** Amount of ga release nfts owned */
  gaNftsCount: Scalars['Int']['output'];
  /** Unique id of release collector */
  id: Scalars['ID']['output'];
  /** Lowest nft serial number collected */
  lowestNftSerialNumber: Scalars['Int']['output'];
  /** Lowest serial number release nft collected by user */
  lowestSerialNumberNftCollected: Nft;
  /** Most recent release nft collected by user with a comment */
  mostRecentCommentedNft?: Maybe<NftWithComment>;
  /** Most recent release nft collected by user with a comment */
  mostRecentNftWithComment?: Maybe<Nft>;
  /** Amount of release nfts owned */
  nftsCount: Scalars['Int']['output'];
  /** Returns golden egg of release if user owns, otherwise null */
  ownedGoldenEgg?: Maybe<EggGame>;
  /** Release entity */
  release: Release;
  /** Tier priority of the nft */
  tierPriority: Scalars['Int']['output'];
  /** Collector user */
  user: User;
  /** Amount of vip release nfts owned */
  vipNftsCount: Scalars['Int']['output'];
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
  cursor: Scalars['String']['output'];
  /** ReleaseCollector node */
  node: ReleaseCollector;
};

/** Pagination parameters for release collectors */
export type ReleaseCollectorCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Customize sort behavior */
  sort?: ReleaseCollectorCursorConnectionSort;
  /** The NFT tier you want to select for ReleaseCollectors, defaults All */
  tier?: InputMaybe<TierNft>;
};

/** Customize sort of collectors */
export type ReleaseCollectorCursorConnectionSort = {
  /** Sort by first nft collected date */
  firstNftCollectedDate?: InputMaybe<SortOrder>;
  /** Sort by amount ga nfts collected, with tie-breaker of earliest collector first */
  gaNftsCount?: InputMaybe<SortOrder>;
  /** Sort by lowest owned serial number */
  lowestOwnedSerialNumber?: InputMaybe<SortOrder>;
  /** Sort by amount nfts collected, with tie-breaker of earliest collector first */
  nftsCount?: InputMaybe<SortOrder>;
  /** Sort by vips first, then ga, tie-breaker of first nft collected date */
  priorityFirstNftDate?: InputMaybe<SortOrder>;
  /** Sort by vips first, then ga, tie-breaker most nfts collected */
  priorityTop?: InputMaybe<SortOrder>;
  /** Sort by amount vip nfts collected, with tie-breaker of earliest collector first */
  vipNftsCount?: InputMaybe<SortOrder>;
};

/** Release collector updates from subscription */
export type ReleaseCollectorUpdates = {
  /** Release collector information. null if user is no longer collector */
  collector?: Maybe<CollectorUpdateInfo>;
  /** Release unique identifier */
  releaseId: Scalars['ID']['output'];
  /** Wallet public address of user */
  userPublicAddress: Scalars['String']['output'];
};

/** Info associated with release draft allowlist */
export type ReleaseCollectorsAllowlist = {
  /** Flag to include or not include all artist collaborations */
  allArtistCollaborations: Scalars['Boolean']['output'];
  /** Flag to include or not include all artist releases */
  allArtistReleases: Scalars['Boolean']['output'];
  /** Paginated releases of draftAllowlist taking into account artist releases and collaborator flags */
  filteredReleases: ReleaseConnection;
  /** Total number of release collector users in draft allowlist */
  totalCollectors: Scalars['Int']['output'];
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
  cursor: Scalars['String']['output'];
  /** Release node */
  node: Release;
};

/** Union of release contract types */
export type ReleaseContractEarning = ArtistContractEarning | EditionContractEarning;

/** Release dropped action entity */
export type ReleaseDropped = ArtistAction & Node & ReleaseAction & {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Release entity dropped by artist */
  release: Release;
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
  id: Scalars['ID']['output'];
  /** Ownership percentage of the user in the release */
  ownershipPercent: Scalars['Float']['output'];
  /** release primary revenue */
  primaryRevenue: Scalars['String']['output'];
  /** Release entity */
  release: Release;
  /** Release secondary royalties */
  secondaryRoyalties: Scalars['String']['output'];
  /** Split contract earnings associated to release. */
  splitContract?: Maybe<SplitsContractEarning>;
  /** Split main balance attributable to release */
  splitMainBalanceFromRelease: Scalars['String']['output'];
  /** Total withdrawable amount for user */
  totalWithdrawableForUser: Scalars['String']['output'];
};

/** Edge of Release Earnings Connection */
export type ReleaseEarningsConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Release Earnings node */
  node: ReleaseEarnings;
};

/** Release featured status */
export const ReleaseFeaturedStatus = {
  All: 'ALL',
  Hot: 'HOT'
} as const;

export type ReleaseFeaturedStatus = typeof ReleaseFeaturedStatus[keyof typeof ReleaseFeaturedStatus];
/** Input for "releaseFromToken" query */
export type ReleaseFromTokenInput = {
  /** Contract address of release */
  contractAddress: Scalars['Address']['input'];
  /** Token chain identifier */
  tokenId: Scalars['String']['input'];
};

/** Simplified version of Release entity */
export type ReleaseInfo = Node & {
  /** Release artistId */
  artistId: Scalars['String']['output'];
  /** Artist name of release */
  artistName: Scalars['String']['output'];
  /** Artist user id */
  artistUserId: Scalars['String']['output'];
  /** Cover image of release */
  coverImage: Media;
  /** User ids of release credits */
  creditUserIds: Array<Scalars['String']['output']>;
  /** Unique identifier of Artist */
  id: Scalars['ID']['output'];
  /** Static version of animated cover image of release if the cover is a GIF. Otherwise, null */
  staticCoverImage?: Maybe<Media>;
  /** Release title */
  title: Scalars['String']['output'];
};

/** Release liked action entity */
export type ReleaseLiked = ArtistAction & CollectorAction & LikeAction & Node & ReleaseAction & {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Release corresponding to release liked action entity */
  release: Release;
  /** User corresponding to release liked action entity */
  user: User;
};

/** Allowlist containing all manually added addresses */
export type ReleaseManuallyAddedAddressesAllowlist = Node & ReleaseBaseSubAllowlist & {
  /** Description for manually added allowlist */
  description?: Maybe<Scalars['String']['output']>;
  /** Node identifier */
  id: Scalars['ID']['output'];
  /** Total number of addresses in sub allowlist */
  totalAddresses: Scalars['Int']['output'];
};

/** Release allowlist behind merkle tree */
export type ReleaseMerkleAllowlist = Node & {
  /** Creation date of allowlist */
  createdAt: Scalars['DateTime']['output'];
  /** Unique identifier of merkle allowlist of release */
  id: Scalars['ID']['output'];
  /** Static information associated with allowlist */
  info: ReleaseMerkleAllowlistInfo;
  /** Manually added addresses by artist */
  manuallyAddedAddresses?: Maybe<ReleaseManuallyAddedAddressesAllowlist>;
  /** Pagination of releases from collaborations */
  releaseCollaborationsSources?: Maybe<ReleaseSourceSubAllowlistConnection>;
  /** Pagination of manually selected artists */
  selectedArtistSources?: Maybe<ArtistSourceSelectedAllowlistConnection>;
  /** Pagination of manually selected releases */
  selectedReleaseSources?: Maybe<ReleaseSourceSubAllowlistConnection>;
  /** Total number of users in allowlist */
  totalUsers: Scalars['Int']['output'];
};


/** Release allowlist behind merkle tree */
export type ReleaseMerkleAllowlistReleaseCollaborationsSourcesArgs = {
  pagination?: CursorConnectionArgs;
};


/** Release allowlist behind merkle tree */
export type ReleaseMerkleAllowlistSelectedArtistSourcesArgs = {
  pagination?: CursorConnectionArgs;
};


/** Release allowlist behind merkle tree */
export type ReleaseMerkleAllowlistSelectedReleaseSourcesArgs = {
  pagination?: CursorConnectionArgs;
};

/** Release allowlist information */
export type ReleaseMerkleAllowlistInfo = {
  /** Flag to include or not include all artist collaborations */
  allArtistCollaborations: Scalars['Boolean']['output'];
  /** Flag to include or not include all collectors of release artist */
  allArtistCollectors: Scalars['Boolean']['output'];
  /** Manually added addresses */
  manuallyAddedAddresses?: Maybe<Array<Scalars['String']['output']>>;
  /** Manually selected artist identifiers */
  sourceSelectedArtistIds?: Maybe<Array<Scalars['String']['output']>>;
  /** Manually selected release identifiers */
  sourceSelectedReleaseIds?: Maybe<Array<Scalars['String']['output']>>;
};

/** A release was minted by users */
export type ReleaseMinted = Node & UserNotification & {
  /** Featured collectors */
  featuredCollectors: Array<User>;
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Number of total collectors in this group */
  numTotalCollectors: Scalars['Int']['output'];
  /** Number of total mints in this group */
  numTotalMints: Scalars['Int']['output'];
  /** Minted release entity */
  release?: Maybe<Release>;
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Recipient user entity */
  user?: Maybe<User>;
};

/** Release NFT Update */
export type ReleaseNftWithCommentUpdate = {
  /** Possible comment associated with NFT */
  commentMessage: Scalars['String']['output'];
  /** Contract address associated with nft */
  contractAddress: Scalars['String']['output'];
  /** Unique identifier of NFT */
  id: Scalars['ID']['output'];
  /** Was the NFT burned */
  isBurned: Scalars['Boolean']['output'];
  /** Is the NFT the golden egg */
  isGoldenEgg: Scalars['Boolean']['output'];
  /** If user is an artist, the artist unique identifier */
  ownerArtistId?: Maybe<Scalars['ID']['output']>;
  /** If user is an artist, the artist name */
  ownerArtistName?: Maybe<Scalars['String']['output']>;
  /** If user is an artist, the artist sound handle */
  ownerArtistSoundHandle?: Maybe<Scalars['String']['output']>;
  /** Possible avatar URL of NFT owner */
  ownerAvatarUrl?: Maybe<Scalars['String']['output']>;
  /** User wallet public address */
  ownerPublicAddress: Scalars['String']['output'];
  /** Serial number of the lowest owned nft of the collected release */
  ownerReleaseLowestNftSerialNumber: Scalars['Int']['output'];
  /** Amount of NFTs owned by collector on the same release */
  ownerReleaseNftCount: Scalars['Int']['output'];
  /** User unique identifier of owner */
  ownerUserId: Scalars['ID']['output'];
  /** Username of NFT owner */
  ownerUsername: Scalars['String']['output'];
  /** User webapp uri */
  ownerWebappUri: Scalars['String']['output'];
  /** Serial number of nft within release */
  serialNumber: Scalars['Int']['output'];
  /** Selected song slot associated with nft */
  songSlot: Scalars['Int']['output'];
  /** Unique token identifier of nft */
  tokenId: Scalars['String']['output'];
  /** Date of last ownership transfer */
  updatedAt: Scalars['DateTime']['output'];
};

/** Referred collector data within a release */
export type ReleaseReferredCollector = Node & {
  /** Total of earnings in eth associated with affiliate purchases */
  earningsETH: Scalars['String']['output'];
  /** Total of earnings in wei associated with affiliate purchases */
  earningsWei: Scalars['String']['output'];
  /** Unique identifier on referred collector within release and affiliate */
  id: Scalars['ID']['output'];
  /** Amount of editions sold by referred collector for release and affiliate */
  purchasesQuantity: Scalars['Int']['output'];
  /** User entity of referred collector */
  user: User;
};

/** Paginated connection of referred collectors */
export type ReleaseReferredCollectorConnection = Connection & {
  /** Edges of current page */
  edges: Array<ReleaseReferredCollectorEdge>;
  /** Pagination helpers information */
  pageInfo: PageInfo;
};

/** Edge of ReleaseReferredCollector */
export type ReleaseReferredCollectorEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** Release referred collector node */
  node: ReleaseReferredCollector;
};

/** Filter the releases to be searched */
export type ReleaseSearchFilter = {
  /** Filter releases that are made by specified artists. You can only specify up to 51 artists. */
  artistIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** Genre names to filter on for releases */
  genres?: InputMaybe<Array<Genres>>;
  /** Only include releases that either have or don't have collectors */
  hasCollectors?: InputMaybe<Scalars['Boolean']['input']>;
  /** Location ids to filter on for releases */
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Only get release with specified status */
  releaseStatus?: InputMaybe<Array<ReleaseStatus>>;
  /** Filters on release type */
  type?: InputMaybe<Array<ReleaseType>>;
};

/** Customize sort of releases */
export type ReleaseSearchSort = {
  /** Sort by time the release was minted */
  mintStartTime?: InputMaybe<SortOrder>;
  /** Sort by number of mints of each release */
  totalMinted?: InputMaybe<SortOrder>;
  /** Sort by total volume of each release */
  totalVolume?: InputMaybe<SortOrder>;
};

/** Pagination parameters of release shelves */
export type ReleaseShelvesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Customize sort behavior */
  sort?: ReleaseShelvesCursorConnectionSort;
};

/** Customize sort of release shelves */
export type ReleaseShelvesCursorConnectionSort = {
  /** Sort by date of release being added in the shelf */
  addedAtDate?: InputMaybe<SortOrder>;
  /** Sort by shelf score */
  score?: InputMaybe<SortOrder>;
};

/** Filter release shelves */
export type ReleaseShelvesFilter = {
  /** Filter shelves to be included by identifier. You can only specify up to 51 shelves. */
  shelfIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** Filter shelves types to be included */
  type?: InputMaybe<Array<ShelfType>>;
};

/** Defines sort order of Release fields, array index defines tiebreaking */
export type ReleaseSortInput = {
  /** Field to be sorted */
  field: SearchReleasesSortEnum;
  /** Sort ascending or descending */
  order: SortOrder;
};

/** Allowlists of releases used as source of collectors */
export type ReleaseSourceSubAllowlist = Node & ReleaseBaseSubAllowlist & {
  /** Node identifier */
  id: Scalars['ID']['output'];
  /** Release used as source of collectors */
  sourceRelease?: Maybe<Release>;
  /** Total number of addresses in sub allowlist */
  totalAddresses: Scalars['Int']['output'];
};

/** Connection entity of release source allowlist */
export type ReleaseSourceSubAllowlistConnection = Connection & {
  /** List of edges of pagination */
  edges: Array<ReleaseSourceSubAllowlistEdge>;
  /** Pagination info helpers */
  pageInfo: PageInfo;
};

/** Edge of connection for release source allowlist */
export type ReleaseSourceSubAllowlistEdge = Edge & {
  /** Pagination cursor */
  cursor: Scalars['String']['output'];
  /** Pagination node */
  node: ReleaseSourceSubAllowlist;
};

/** Release current status type */
export const ReleaseStatus = {
  AvailableToMint: 'AVAILABLE_TO_MINT',
  SoldOut: 'SOLD_OUT',
  Upcoming: 'UPCOMING'
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
  date: Scalars['DateTime']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Release corresponding to unliked release action entity */
  release: Release;
  /** User corresponding to unliked release action entity */
  user: User;
};

/** Release updates from subscription */
export type ReleaseUpdates = {
  /** Chain ID on which release is minted on */
  chainId: Scalars['Int']['output'];
  /** Final quantity for a release. Will be defined as soon as a max quantity has been determined */
  finalQuantity?: Maybe<Scalars['Int']['output']>;
  /** Release identifier */
  id: Scalars['ID']['output'];
  /** Is release sold out relative to the final quantity on first phase */
  isFirstPhaseCompleted: Scalars['Boolean']['output'];
  /** Public sale start timestamp */
  mintStartTimestamp: Scalars['Timestamp']['output'];
  /** Amount of sold NFTs */
  numSold: Scalars['Int']['output'];
  /** Number of nfts collected during primary sale */
  primaryCollected: Scalars['Int']['output'];
  /** Aggregate raised during primary sale */
  primaryRaisedInWei: Scalars['String']['output'];
  /** Override for the SAM buy buffer in basis points (bps) for this release */
  samBuyBufferBpsOverride?: Maybe<Scalars['Int']['output']>;
  /** Override for the SAM sell buffer in basis points (bps) for this release */
  samSellBufferBpsOverride?: Maybe<Scalars['Int']['output']>;
  /** Number of nfts collected during sound swap sale */
  soundSwapCollected: Scalars['Int']['output'];
  /** Aggregate raised during sound swap sale */
  soundSwapRaisedInWei: Scalars['String']['output'];
  /** Title of release */
  title: Scalars['String']['output'];
  /** Total minted NFTs */
  totalMinted: Scalars['Int']['output'];
  /** Total supply of NFTs */
  totalSupply: Scalars['Int']['output'];
  /** Aggregate raised during sound swap sale */
  totalVolume: Scalars['String']['output'];
};

/** Input for Release.webEmbed */
export type ReleaseWebEmbedInput = {
  /** Customize html parameters */
  html?: IframeHtmlParameters;
  /** Referral address */
  referralAddress?: InputMaybe<Scalars['Address']['input']>;
};

/** Customize webapp uri parameters of release */
export type ReleaseWebappUriInput = {
  /** Referral address */
  referralAddress?: InputMaybe<Scalars['Address']['input']>;
};

/** Releases added AND removed to a playlist in the same playlist action entity */
export type ReleasesAddedRemovedFromPlaylist = ArtistAction & CollectorAction & Node & PlaylistAction & ReleaseAction & {
  /** Releases added to playlist */
  addedReleases: ReleaseConnection;
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Total number of releases added to the playlist */
  numAddedReleases: Scalars['Int']['output'];
  /** Total number of releases removed from the playlist */
  numRemovedReleases: Scalars['Int']['output'];
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
  date: Scalars['DateTime']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Returns whether playlist was created with this action */
  isPlaylistCreated: Scalars['Boolean']['output'];
  /** Total number of releases added to the playlist */
  numAddedReleases: Scalars['Int']['output'];
  /** Shelf entity */
  playlist?: Maybe<Shelf>;
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

export const ReleasesCollectorSortEnum = {
  FirstNftCollectedDate: 'FIRST_NFT_COLLECTED_DATE',
  NftsCount: 'NFTS_COUNT'
} as const;

export type ReleasesCollectorSortEnum = typeof ReleasesCollectorSortEnum[keyof typeof ReleasesCollectorSortEnum];
/** Pagination parameters for releases connection */
export type ReleasesCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Start after the first "skip" entities based. It can't be specified alongside "after" or "before" */
  skip?: InputMaybe<Scalars['NonNegativeInt']['input']>;
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
  /** Filter by getting releases of the artists followed by the specified user identifier */
  artistFollowedByUser?: InputMaybe<Scalars['UUID']['input']>;
  /** Specify up to 50 contracts to filter the releases */
  contracts?: InputMaybe<Array<ContractReleaseInput>>;
  /** Filters on release featured status */
  featuredStatus?: InputMaybe<ReleaseFeaturedStatus>;
  /** Only get releases from specified genres */
  genre?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Only get releases from specified genres */
  genres?: InputMaybe<Array<Genres>>;
  /** Remove currently-featured releases from results */
  hideFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Location ids to filter on for releases */
  locationIds?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Only get releases less or equal to than specified mint time */
  mintTimeMaxDate?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Only get releases greater than or equal to specified mint time */
  mintTimeMinDate?: InputMaybe<Scalars['Timestamp']['input']>;
  /** Only get release with specified mint time status */
  mintTimeStatus?: InputMaybe<Array<MintTimeStatus>>;
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: InputMaybe<ReleaseAlbumRevealFilterOption>;
  /** Only get release with specified status */
  releaseStatus?: InputMaybe<Array<ReleaseStatus>>;
  /** Filters on release type */
  releaseType?: InputMaybe<Array<ReleaseType>>;
  /** Only get releases from specified seasons */
  season?: InputMaybe<Array<ArtistSeason>>;
};

/** Release removed from playlist entity */
export type ReleasesRemovedFromPlaylist = CollectorAction & Node & PlaylistAction & {
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** Total number of releases removed from the playlist */
  numRemovedReleases: Scalars['Int']['output'];
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
  finish: Scalars['Timestamp']['input'];
  /** Duration of play in seconds */
  listenDuration: Scalars['Int']['input'];
  /** Amount of pauses on the same session */
  pauseCount: Scalars['Int']['input'];
  /** Start of play session */
  start: Scalars['Timestamp']['input'];
  /** Track UUID */
  trackId: Scalars['UUID']['input'];
  /** Random UUID generated by client-side */
  uuid: Scalars['String']['input'];
};

/** Reward entity */
export type Reward = {
  /** Reward description */
  description: Scalars['String']['output'];
  /** Reward identifier */
  id: Scalars['ID']['output'];
  /**
   * Amount of backers of reward
   * @deprecated No longer used
   */
  numOfBackers: Scalars['Int']['output'];
  /**
   * Price of reward
   * @deprecated No longer used
   */
  price: Scalars['String']['output'];
  /** Reward title */
  title: Scalars['String']['output'];
};

/** Release info upload step info */
export type RewardUploadStepInfo = {
  /** Reward description */
  description: Scalars['String']['output'];
  /** Reward name */
  title: Scalars['String']['output'];
};

/** Release edit info upload step info */
export type RewardsEditStepInfo = {
  /** Can collectors download audio */
  canCollectorsDownloadAudio?: Maybe<Scalars['Boolean']['output']>;
  /** Toggle for curator rewards */
  curatorRewardsEnabled?: Maybe<Scalars['Boolean']['output']>;
  /** Special golden egg images */
  goldenEggImages?: Maybe<Array<MediaUploadStepInfo>>;
  /** Custom rewards */
  rewards?: Maybe<Array<RewardUploadStepInfo>>;
};

/** Release info upload step info */
export type RewardsUploadStepInfo = {
  /** Can collectors download audio */
  canCollectorsDownloadAudio: Scalars['Boolean']['output'];
  /** Toggle for curator rewards */
  curatorRewardsEnabled: Scalars['Boolean']['output'];
  /** Special golden egg images */
  goldenEggImages: Array<MediaUploadStepInfo>;
  /** Custom rewards */
  rewards: Array<RewardUploadStepInfo>;
};

/** Release sale details */
export type SaleDetails = {
  /** Number of nfts collected during primary sale */
  primaryCollected: Scalars['Int']['output'];
  /** Aggregate raised during primary sale */
  primaryRaisedInWei: Scalars['String']['output'];
  /** Number of nfts collected during sound swap sale */
  soundSwapCollected: Scalars['Int']['output'];
  /** Aggregate raised during sound swap sale */
  soundSwapRaisedInWei: Scalars['String']['output'];
  /** Aggregate raised during sound swap sale */
  totalVolume: Scalars['String']['output'];
};

/** Single sale schedule information of Release Presale Configuration */
export type SaleSchedule = {
  /** Affiliate fee in basis points within schedule sales */
  affiliateFeeBPS: Scalars['Int']['output'];
  /** Percentage of affiliate fee within schedule sales */
  affiliateFeePercent: Scalars['String']['output'];
  /** Total minted for specific sale schedule associated with artist contracts. To not be used for new editions */
  artistContractTotalMinted?: Maybe<Scalars['Int']['output']>;
  /** End Time of Sale Schedule */
  endTime: Scalars['DateTime']['output'];
  /** UUID of Sale Schedule entity */
  id: Scalars['ID']['output'];
  /** Is the current sale schedule presale */
  isPresale: Scalars['Boolean']['output'];
  /** Amount to be allowed to be sold for sale schedule */
  maxMintable: Scalars['Int']['output'];
  /** Merkle tree root hash derived from sale schedule allowlist */
  merkleTreeRoot?: Maybe<Scalars['String']['output']>;
  /** Mint id for the minter config */
  mintId?: Maybe<Scalars['Int']['output']>;
  /** Minter contract address for the schedule */
  minterAddress?: Maybe<Scalars['String']['output']>;
  /** Price for the specific sale schedule */
  price: Scalars['String']['output'];
  /** Start Time of Sale Schedule */
  startTime: Scalars['DateTime']['output'];
};

/** Sam configuration within edition */
export type SamConfig = {
  /** Fee BPS applied for share affiliate */
  affiliateFeeBPS: Scalars['Int']['output'];
  /** Fee in percent applied for share affiliate */
  affiliateFeePercent: Scalars['String']['output'];
  /** Artist fee BPS */
  artistFeeBPS: Scalars['Int']['output'];
  /** Artist fee in percent */
  artistFeePercent: Scalars['String']['output'];
  /** Base price */
  basePrice: Scalars['String']['output'];
  /** When is the SAM to be frozen and not allow purchases */
  buyFreezeTime: Scalars['Timestamp']['output'];
  /** Fee BPS applied for golden egg holders */
  goldenEggFeeBPS: Scalars['Int']['output'];
  /** Fee in percent applied for share affiliate */
  goldenEggFeePercent: Scalars['String']['output'];
  /** SAM edition configuration identifier */
  id: Scalars['ID']['output'];
  /** Inflection point */
  inflectionPoint: Scalars['Int']['output'];
  /** Inflection price */
  inflectionPrice: Scalars['String']['output'];
  /** Max supply of tokens that SAM can provide */
  maxSupply: Scalars['Int']['output'];
  /** Fee BPS applied for platform */
  platformFeeBPS: Scalars['Int']['output'];
  /** Flat fee applied for platform per transaction */
  platformPerTxFlatFee: Scalars['String']['output'];
  /** SAM Contract address */
  samAddress: Scalars['String']['output'];
};

/** Edition schedule identifiers, used to optimize chain calls */
export type ScheduleIdentifier = {
  /** Identifier of schedules by minter address */
  mintIds: Array<Scalars['Int']['output']>;
  /** Minter address of schedule */
  minterAddress: Scalars['String']['output'];
};

export const SearchArtistsSortEnum = {
  CreatedAt: 'CREATED_AT',
  TotalMinted: 'TOTAL_MINTED',
  TotalVolume: 'TOTAL_VOLUME'
} as const;

export type SearchArtistsSortEnum = typeof SearchArtistsSortEnum[keyof typeof SearchArtistsSortEnum];
export const SearchCollectorsSortEnum = {
  ArtistsBacked: 'ARTISTS_BACKED',
  CreatedAt: 'CREATED_AT',
  NftsCount: 'NFTS_COUNT',
  TotalMinted: 'TOTAL_MINTED',
  TotalVolume: 'TOTAL_VOLUME'
} as const;

export type SearchCollectorsSortEnum = typeof SearchCollectorsSortEnum[keyof typeof SearchCollectorsSortEnum];
/** Pagination arguments for search */
export type SearchConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 20 nodes. */
  first?: Scalars['PositiveInt']['input'];
};

/** Input for "search" query */
export type SearchInput = {
  /** How many entities to be fetched for fixed lists, maximum of 20 */
  limit?: Scalars['PositiveInt']['input'];
  /** Text search */
  text?: InputMaybe<Scalars['String']['input']>;
};

export const SearchReleasesSortEnum = {
  MintStartTime: 'MINT_START_TIME',
  TotalMinted: 'TOTAL_MINTED',
  TotalVolume: 'TOTAL_VOLUME'
} as const;

export type SearchReleasesSortEnum = typeof SearchReleasesSortEnum[keyof typeof SearchReleasesSortEnum];
/** Search result */
export type SearchResult = {
  /**
   * Artists that match the search input, including artists where any of their releases matches the given input
   * @deprecated Use `artistsPaginated` instead
   */
  artists: Array<Artist>;
  /** Paginated artists that match the search input, including artists where any of their releases matches the given input */
  artistsPaginated: ArtistConnection;
  /** Paginated collectors that match the search input within the ens, twitter handle, displayName and publicAddress */
  collectors: UserConnection;
  /** Unique identifier of search result */
  id: Scalars['ID']['output'];
  /**
   * Releases that match the search input, including releases where the artist name matches the given input
   * @deprecated Use `releasesPaginated` instead
   */
  releases: Array<Release>;
  /** Paginated releases that match the search input, including releases where the artist name matches the given input */
  releasesPaginated: ReleaseConnection;
  /** Paginated shelves that match the search input within the shelf name, releases titles and artists names */
  shelves: ShelfConnection;
};


/** Search result */
export type SearchResultArtistsArgs = {
  filter?: InputMaybe<ArtistSearchFilter>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
};


/** Search result */
export type SearchResultArtistsPaginatedArgs = {
  filter?: InputMaybe<ArtistSearchFilter>;
  pagination?: SearchConnectionArgs;
  sort?: InputMaybe<ArtistSearchSort>;
  sortFields?: Array<ArtistSortInput>;
};


/** Search result */
export type SearchResultCollectorsArgs = {
  filter?: InputMaybe<CollectorSearchFilter>;
  pagination?: SearchConnectionArgs;
  sort?: InputMaybe<CollectorSearchSort>;
  sortFields?: Array<CollectorSortInput>;
};


/** Search result */
export type SearchResultReleasesArgs = {
  filter?: InputMaybe<ReleaseSearchFilter>;
  limit?: InputMaybe<Scalars['PositiveInt']['input']>;
};


/** Search result */
export type SearchResultReleasesPaginatedArgs = {
  filter?: InputMaybe<ReleaseSearchFilter>;
  pagination?: SearchConnectionArgs;
  sort?: InputMaybe<ReleaseSearchSort>;
  sortFields?: Array<ReleaseSortInput>;
};


/** Search result */
export type SearchResultShelvesArgs = {
  filter?: InputMaybe<ShelfSearchFilter>;
  pagination?: SearchConnectionArgs;
  sort?: InputMaybe<ShelfSearchSort>;
  sortFields?: Array<ShelfSortInput>;
};

export const SearchShelvesSortEnum = {
  CreatedAt: 'CREATED_AT',
  NumLikes: 'NUM_LIKES',
  NumReferralPurchases: 'NUM_REFERRAL_PURCHASES'
} as const;

export type SearchShelvesSortEnum = typeof SearchShelvesSortEnum[keyof typeof SearchShelvesSortEnum];
/** Collector release added to playlist action entity */
export type SecondarySale = ArtistAction & CollectorAction & Node & ReleaseAction & {
  /** Amount paid in Wei for secondary sale */
  amountPaidInWei: Scalars['String']['output'];
  /** Date of action */
  date: Scalars['DateTime']['output'];
  /** Starting token ID of NFT for bonding curve sale purchase */
  fromTokenId: Scalars['Int']['output'];
  /** Action id */
  id: Scalars['ID']['output'];
  /** User that nft was purchased from for secondary sale action */
  purchasedFromUser: User;
  /** Number of sequential tokens purchased */
  quantity: Scalars['Int']['output'];
  /** Release corresponding to collector secondary sale action entity */
  release: Release;
  /** Serial number of nft secondary sale purchase */
  serialNumber: Scalars['Int']['output'];
  /** Ending token ID of NFT for bonding curve sale purchase */
  toTokenId: Scalars['Int']['output'];
  /** User corresponding to collector action entity */
  user: User;
};

/** Shelf entity */
export type Shelf = Node & {
  /** Paginate through affiliate buyers of this shelf. */
  affiliateBuyers: PlaylistAffiliateBuyerConnection;
  /** Cover image of Shelf */
  coverImage?: Maybe<Media>;
  /** Top 4 releases to be used as cover for shelf */
  coverReleases: Array<Release>;
  /** Shelf creation date */
  createdAt: Scalars['DateTime']['output'];
  /** Shelf deletion date */
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  /** Description of shelf */
  description?: Maybe<Scalars['String']['output']>;
  /** Return shelves from where it was possibly extended. If the source shelf is not currently available, it's returned as null */
  extendedFrom?: Maybe<Array<Maybe<Shelf>>>;
  /** Shelf identifier */
  id: Scalars['ID']['output'];
  /** Relative ordering of the shelves for each user */
  index: Scalars['Int']['output'];
  /** Paginate through users who like this shelf. */
  likedBy: UserConnection;
  /** Number of likes for the shelf. */
  likes: Scalars['Int']['output'];
  /** Link slug used to reference and request specific shelf */
  linkSlug: Scalars['String']['output'];
  /**
   * Number of mints driven by shelf referral.
   * @deprecated Please use Shelf.numReferralPurchases
   */
  mintsDriven: Scalars['Int']['output'];
  /** Shelf name */
  name: Scalars['String']['output'];
  /** Number of likes for the shelf. */
  numLikes: Scalars['Int']['output'];
  /** Number of mints driven by shelf referral. */
  numReferralPurchases: Scalars['Int']['output'];
  /** Number of users that collected from shelf referral. */
  numUsersReferred: Scalars['Int']['output'];
  /** Paginated releases of shelf ordered depending on shelfType */
  orderedReleases: ShelfReleaseConnection;
  /** Total play time of all releases in a shelf in seconds */
  playTimeInSeconds: Scalars['Int']['output'];
  /** Top 4 releases to be used as preview for shelf */
  previewReleases: Array<ShelfRelease>;
  /** Number of releases in a shelf */
  releaseCount: Scalars['Int']['output'];
  /** List of release identifiers in the shelf ordered depending on shelfType */
  releaseIds: Array<Scalars['String']['output']>;
  /** Playlist affiliate purchase users ordered by follower count */
  socialProofReferrals: Array<User>;
  /** List of track identifiers in the shelf ordered depending on shelfType */
  trackIds: Array<Scalars['String']['output']>;
  /** Type of shelf */
  type: ShelfType;
  /** Owner of shelf */
  user: User;
  /** Web HTML iframe embed */
  webEmbed: Scalars['String']['output'];
  /** Webapp URI of Shelf */
  webappUri: Scalars['String']['output'];
};


/** Shelf entity */
export type ShelfAffiliateBuyersArgs = {
  pagination?: CursorConnectionArgs;
};


/** Shelf entity */
export type ShelfLikedByArgs = {
  pagination?: CursorConnectionArgs;
};


/** Shelf entity */
export type ShelfOrderedReleasesArgs = {
  pagination?: ShelfOrderedReleaseCursorConnectionArgs;
};


/** Shelf entity */
export type ShelfReleaseIdsArgs = {
  sort?: ShelfReleasesSort;
};


/** Shelf entity */
export type ShelfSocialProofReferralsArgs = {
  userPublicAddress?: InputMaybe<Scalars['String']['input']>;
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
  cursor: Scalars['String']['output'];
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
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
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

/** Cursor connection parameters for shelf ordered releases */
export type ShelfOrderedReleaseCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
};

/** Shelf release entity */
export type ShelfRelease = Node & {
  /** Date of release being added in shelf */
  addedAt: Scalars['Timestamp']['output'];
  /** Shelf Release identifier */
  id: Scalars['ID']['output'];
  /** Index of release within shelf */
  index: Scalars['Int']['output'];
  /** First backed nft of possibly collected release */
  ownedFirstNft?: Maybe<Nft>;
  /** Returns golden egg if user owns, otherwise null */
  ownedGoldenEgg?: Maybe<EggGame>;
  /** List of possibly owned nft serial numbers in ascending serial number order. If user does not own the release, it returns null */
  ownedSerialNumbers?: Maybe<Array<Scalars['Int']['output']>>;
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
  cursor: Scalars['String']['output'];
  /** Shelf release entity */
  node: ShelfRelease;
};

/** Customize sort behavior of shelf releases */
export type ShelfReleasesSort = {
  /** Sort by release added to shelf date */
  addedToShelfDate?: InputMaybe<SortOrder>;
  /** Sort by release index of shelf */
  index?: SortOrder;
};

/** Filter the shelf to be searched */
export type ShelfSearchFilter = {
  /** Genre names to filter on for shelf songs */
  genres?: InputMaybe<Array<Genres>>;
};

/** Customize sorting of shelves */
export type ShelfSearchSort = {
  /** Sort by time playlist was created */
  createdAt?: InputMaybe<SortOrder>;
  /** Sort by number of likes */
  numLikes?: InputMaybe<SortOrder>;
  /** Sort by number of referral purchases (Mints Driven) */
  numReferralPurchases?: InputMaybe<SortOrder>;
};

/** Defines sort order of Shelf fields, array index defines tiebreaking */
export type ShelfSortInput = {
  /** Field to be sorted */
  field: SearchShelvesSortEnum;
  /** Sort ascending or descending */
  order: SortOrder;
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
  numCollectors: Scalars['Int']['output'];
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
  balanceForUser: Scalars['String']['output'];
  /** Address of the split wallet */
  contractAddress: Scalars['String']['output'];
  /** Distributor fee of the split */
  distributorFee: Scalars['Int']['output'];
  /** List of addresses that are on the split. Sorted for passing into distributeEth transaction */
  participantAddresses: Array<Scalars['String']['output']>;
  /** List of allocations for each participant. Matches ordering of participantAddresses */
  participantAllocations: Array<Scalars['Int']['output']>;
  /** Total eth on the contract */
  totalBalance: Scalars['String']['output'];
};

/** Splits upload step info */
export type SplitsUploadStepInfo = {
  /** Split contract address */
  splitContractAddress?: Maybe<Scalars['String']['output']>;
  /** Splits auction configurations */
  splits: Array<CreditAllocationUploadStepInfo>;
};

/** Subscribe with email notification */
export type SubscribeToEmailCta = Node & UserNotification & {
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Recipient user entity */
  user?: Maybe<User>;
};

/** Realtime Subscriptions */
export type Subscription = {
  /** Subscribe to new activity feed groups added to a particular activity feed */
  activityFeedNewGroup: SubscriptionNewActivityFeedGroup;
  count: Scalars['Int']['output'];
  /** Subscribe to updates of release collectors */
  releaseCollectorUpdates: ReleaseCollectorUpdates;
  /** Subscribe to NFTs comments updates of specified release */
  releaseNftCommentUpdate: Array<ReleaseNftWithCommentUpdate>;
  /** Subscribe to release updates */
  releaseUpdates: ReleaseUpdates;
};


/** Realtime Subscriptions */
export type SubscriptionActivityFeedNewGroupArgs = {
  activityFeedId: Scalars['UUID']['input'];
};


/** Realtime Subscriptions */
export type SubscriptionCountArgs = {
  n?: Scalars['Int']['input'];
};


/** Realtime Subscriptions */
export type SubscriptionReleaseCollectorUpdatesArgs = {
  releaseId: Scalars['UUID']['input'];
};


/** Realtime Subscriptions */
export type SubscriptionReleaseNftCommentUpdateArgs = {
  releaseId: Scalars['UUID']['input'];
};


/** Realtime Subscriptions */
export type SubscriptionReleaseUpdatesArgs = {
  id: Scalars['UUID']['input'];
};

/** Entity of new activity feed group created */
export type SubscriptionNewActivityFeedGroup = {
  /** New activity feed group id created */
  activityFeedGroupId: Scalars['String']['output'];
  /** Typename of activity feed group information */
  activityFeedGroupInformationTypename: Scalars['String']['output'];
};

/** Info for supported versions */
export type SupportedVersion = VersionStatusResponseInterface & {
  /** Recommended version */
  recommendedVersion: Scalars['String']['output'];
};

/** Tier associated with tiered edition listing */
export type Tier = {
  /** Chain associated with auction */
  chain: ChainType;
  /** Cutoff timestamp of auction tier */
  cutoffTime: Scalars['DateTime']['output'];
  /** Contract address associated with edition auction */
  editionAddress: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Is the minting of the tier frozen */
  isFrozen: Scalars['Boolean']['output'];
  /** Is the tier considered GA (General Admission) */
  isGA: Scalars['Boolean']['output'];
  /** Is golden egg enabled for tier */
  isGoldenEggEnabled: Scalars['Boolean']['output'];
  /** Minimum amount of editions to be sold within range of cutoff time */
  maxMintableLower: Scalars['Int']['output'];
  /** Maximum amount of editions to be sold within before cutoff time */
  maxMintableUpper: Scalars['Int']['output'];
  /** Is the tier minting considered finished */
  mintConcluded: Scalars['Boolean']['output'];
  /** All schedules within tier */
  schedules: Array<TierSchedule>;
  /** Unique tier number associated within edition contract */
  tierNumber: Scalars['Int']['output'];
  /** Total amount of minted editions within tier */
  totalMinted: Scalars['Int']['output'];
};

/** The Tier of the NFT owned by ReleaseCollector */
export const TierNft = {
  All: 'ALL',
  Ga: 'GA',
  Vip: 'VIP'
} as const;

export type TierNft = typeof TierNft[keyof typeof TierNft];
/** Schedule associated with Tier of auction Listing */
export type TierSchedule = {
  /** Affiliate fee in basis per point for schedule */
  affiliateFeeBPS: Scalars['Int']['output'];
  /** Chain associated with auction */
  chain: ChainType;
  /** Contract address associated with edition auction */
  editionAddress: Scalars['String']['output'];
  /** End timestamp for minting on schedule */
  endTime: Scalars['DateTime']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Is minting on schedule paused */
  isPaused: Scalars['Boolean']['output'];
  /** Fixed amount of maximum mintable editions within schedule */
  maxMintable: Scalars['Int']['output'];
  /** Limit of mints per account within schedule */
  maxMintablePerAccount: Scalars['Int']['output'];
  /** Price for minting on schedule */
  priceInWei: Scalars['String']['output'];
  /** Unique schedule number associated within edition contract and tier */
  scheduleNumber: Scalars['Int']['output'];
  /** Start timestamp for minting on schedule */
  startTime: Scalars['DateTime']['output'];
  /** Tier associated for schedule */
  tier: Tier;
  /** Unique tier number associated within edition contract */
  tierNumber: Scalars['Int']['output'];
  /** Total amount of minted editions within schedule */
  totalMinted: Scalars['Int']['output'];
};

/** Tiered Edition Auction Listing */
export type TieredEditionListing = AuctionListingInterface & {
  /** Chain associated with auction */
  chain: ChainType;
  /** Contract address associated with edition auction */
  contractAddress: Scalars['String']['output'];
  /** Unique identifier */
  id: Scalars['ID']['output'];
  /** Name associated on contract information */
  name: Scalars['String']['output'];
  /** Royalty basis per point */
  royaltyBPS: Scalars['Int']['output'];
  /** All schedules associated with tiered edition */
  schedules: Array<TierSchedule>;
  /** Tiers associated with tiered edition auction */
  tiers: Array<Tier>;
  /** Total amount of burned editions */
  totalBurned: Scalars['Int']['output'];
  /** Total amount of minted editions */
  totalMinted: Scalars['Int']['output'];
  /** Total amount of minted editions that are not burned */
  totalSupply: Scalars['Int']['output'];
};

/** Time period to aggregate trending table queries */
export const TimePeriodAggEnum = {
  AllTime: 'ALL_TIME',
  OneDay: 'ONE_DAY',
  OneMonth: 'ONE_MONTH',
  SevenDay: 'SEVEN_DAY'
} as const;

export type TimePeriodAggEnum = typeof TimePeriodAggEnum[keyof typeof TimePeriodAggEnum];
/** Input for top affiliate curators query */
export type TopAffiliateCuratorsInput = {
  /** Limit the amount to be returned, Up to 100 */
  limit?: Scalars['PositiveInt']['input'];
  /** Sort logic used */
  sort: TopCuratorsSortEnum;
  /** For what time period the data should come from */
  timePeriod: TopChartTimePeriodEnum;
};

/** Input for top artists query */
export type TopArtistsInput = {
  /** Limit the amount to be returned, Up to 100 */
  limit?: Scalars['PositiveInt']['input'];
  /** Sort logic used */
  sort: TrendingArtistsSortEnum;
  /** For what time period the data should come from */
  timePeriod: TopChartTimePeriodEnum;
};

/** Time period to aggregate top chart queries */
export const TopChartTimePeriodEnum = {
  AllTime: 'ALL_TIME',
  SevenDay: 'SEVEN_DAY',
  ThirtyDay: 'THIRTY_DAY'
} as const;

export type TopChartTimePeriodEnum = typeof TopChartTimePeriodEnum[keyof typeof TopChartTimePeriodEnum];
export const TopCuratorsSortEnum = {
  Mints: 'MINTS',
  SoundsReferred: 'SOUNDS_REFERRED',
  TotalAffiliateEarned: 'TOTAL_AFFILIATE_EARNED',
  TotalVolume: 'TOTAL_VOLUME'
} as const;

export type TopCuratorsSortEnum = typeof TopCuratorsSortEnum[keyof typeof TopCuratorsSortEnum];
/** Input for topPlaylists query */
export type TopPlaylistsInput = {
  /** Limit the amount to be returned, Up to 100 */
  limit?: Scalars['PositiveInt']['input'];
  /** Sort logic used */
  sort: TrendingPlaylistsSortEnum;
  /** For what time period the data should come from */
  timePeriod: TimePeriodAggEnum;
};

/** Top Release Collector */
export type TopReleaseCollector = {
  /** Date of first nft collected */
  firstNftCollectedDate: Scalars['DateTime']['output'];
  /** Lowest serial number of collected nfts */
  lowestNftSerialNumber: Scalars['Int']['output'];
  /** Amount of collected nfts */
  nftsCount: Scalars['Int']['output'];
  /** Position of collector on top list */
  position: Scalars['Int']['output'];
  /** User entity of collector */
  user: User;
};

/** Total raised on Ethereum and USD */
export type TotalRaisedPlatform = {
  /** Total Ethereum in wei raised on platform */
  ethInWei: Scalars['String']['output'];
  /** Total USD raised on platform */
  usd: Scalars['Float']['output'];
};

/** Track entity */
export type Track = {
  /** Audio of Track */
  audio: AudioMedia;
  /** Duration in seconds */
  duration: Scalars['Int']['output'];
  /** Track identifier */
  id: Scalars['ID']['output'];
  /** Normalized peaks of song */
  normalizedPeaks: Array<Scalars['Int']['output']>;
  /** Track's Release */
  release: Release;
  /** Release Identifier */
  releaseId: Scalars['ID']['output'];
  /**
   * Track audio post-reveal of release
   * @deprecated Use 'audio' instead
   */
  revealedAudio?: Maybe<Media>;
  /**
   * Track audio post-reveal for all encodings
   * @deprecated Use 'audio' instead
   */
  revealedAudioMedia?: Maybe<AudioMedia>;
  /**
   * Track original audio (non-transcoded) post-reveal of release
   * @deprecated Use 'audio' instead
   */
  revealedAudioOriginal?: Maybe<Media>;
  /** Track title */
  title: Scalars['String']['output'];
  /** Track number relative to other tracks (unused) */
  trackNumber: Scalars['Int']['output'];
};

/** Track audio */
export type TrackAudio = {
  /** Track audio, transcoded version if available */
  audio: Media;
  /** Track audio media, including encodings if available */
  audioMedia: AudioMedia;
  /** Track audio, original non-transcoded version */
  audioOriginal: Media;
  /** Track duration in seconds */
  duration: Scalars['Int']['output'];
  /** Track identifier */
  id: Scalars['ID']['output'];
  /** Release entity of track */
  release: Release;
  /** Release identifier */
  releaseId: Scalars['ID']['output'];
  /**
   * Reveal time in UNIX timestamp of track based on authenticated user (if authenticated)
   * @deprecated Audio is always revealed
   */
  revealTime: Scalars['Int']['output'];
};

/** Release info upload step info */
export type TrackUploadStepInfo = {
  /** Details of uploaded track cover image */
  coverImage?: Maybe<MediaUploadStepInfo>;
  /** Duration of track in seconds */
  duration: Scalars['Int']['output'];
  /** Details of uploaded track file */
  fileDetail: MediaUploadStepInfo;
  /** Normalized peaks of track */
  normalizedPeaks: Array<Scalars['Int']['output']>;
  /** Title */
  title: Scalars['String']['output'];
};

/** Trending Artist Info */
export type TrendingArtistInfo = {
  /** Artist entity */
  artist?: Maybe<Artist>;
  /** Artist identifier */
  artistId: Scalars['ID']['output'];
  /** Amount of NFTs sold */
  nftsSold: Scalars['Int']['output'];
  /** Primary sales of artist in Wei */
  primarySales: Scalars['String']['output'];
  /** Primary sales of artist in USD */
  primarySalesUsd: Scalars['Float']['output'];
  /** Secondary sales of artist in Wei */
  secondarySales: Scalars['String']['output'];
  /** Secondary sales of artist in USD */
  secondarySalesUsd: Scalars['Float']['output'];
  /** Sum of primary and secondary sales in Wei */
  totalSales: Scalars['String']['output'];
  /** Sum of primary and secondary sales in USD */
  totalSalesUsd: Scalars['Float']['output'];
  /** Amount of unique collectors */
  uniqueCollectors: Scalars['Int']['output'];
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
  creatorsSupported: Scalars['Int']['output'];
  /** Amount of NFTs bought */
  nftsBought: Scalars['Int']['output'];
  /** Total spent in Wei */
  totalSpent: Scalars['String']['output'];
  /** Total spent in USD */
  totalSpentUsd: Scalars['Float']['output'];
  /** Collector user entity */
  user?: Maybe<User>;
  /** User public address of the collector */
  userAddress: Scalars['String']['output'];
};

/** Type of sort paratemer used for trending collectors */
export const TrendingCollectorsSortEnum = {
  CreatorsSupported: 'CREATORS_SUPPORTED',
  NftsBought: 'NFTS_BOUGHT',
  TotalSpent: 'TOTAL_SPENT'
} as const;

export type TrendingCollectorsSortEnum = typeof TrendingCollectorsSortEnum[keyof typeof TrendingCollectorsSortEnum];
/** Trending indicator type */
export const TrendingIndicator = {
  Down: 'DOWN',
  New: 'NEW',
  Same: 'SAME',
  Up: 'UP'
} as const;

export type TrendingIndicator = typeof TrendingIndicator[keyof typeof TrendingIndicator];
/** Trending Playlist Info */
export type TrendingPlaylistInfo = {
  /** Amount of likes for playlist */
  numLikes: Scalars['Int']['output'];
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
  /** Amount of NFTs sold */
  nftsSold: Scalars['Int']['output'];
  /** Primary sales of release in Wei */
  primarySales: Scalars['String']['output'];
  /** Primary sales of release in USD */
  primarySalesUsd: Scalars['Float']['output'];
  /** release entity */
  release: Release;
  /** Secondary sales of release in Wei */
  secondarySales: Scalars['String']['output'];
  /** Secondary sales of release in USD */
  secondarySalesUsd: Scalars['Float']['output'];
  /** Sum of primary and secondary sales in Wei */
  totalSales: Scalars['String']['output'];
  /** Sum of primary and secondary sales in USD */
  totalSalesUsd: Scalars['Float']['output'];
  /** Amount of unique collectors */
  uniqueCollectors: Scalars['Int']['output'];
};

/** Type of sort paratemer used for trending releases */
export const TrendingReleasesSortEnum = {
  NftsSold: 'NFTS_SOLD',
  PrimarySales: 'PRIMARY_SALES',
  SecondarySales: 'SECONDARY_SALES',
  TotalSales: 'TOTAL_SALES',
  UniqueCollectors: 'UNIQUE_COLLECTORS'
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
  /** User avatar */
  avatar?: Maybe<Media>;
  /** Artists backed by user */
  backedArtists: ArtistCollectorConnection;
  /** Banner image for user profile */
  bannerImage?: Maybe<Media>;
  /** Paginated collected releases of user */
  collectedReleases: CollectedReleaseConnection;
  /** Total amount of collected release of user */
  collectedReleasesCount: Scalars['Int']['output'];
  /** List of all the identifiers of releases currently collected by the user. If no releases have been collected yet, it returns null instead of an empty list */
  collectedReleasesIds?: Maybe<Array<Scalars['String']['output']>>;
  /** Rank of user for number of bought nfts */
  collectorPosition?: Maybe<Scalars['Int']['output']>;
  /** User entity creation */
  createdAt: Scalars['DateTime']['output'];
  /** Credit allocations associated with user */
  creditAllocations: Array<CreditAllocation>;
  /** Delegate wallet public address */
  delegateWalletAddress?: Maybe<Scalars['String']['output']>;
  /** User custom description */
  description?: Maybe<Scalars['String']['output']>;
  /** Custom display name */
  displayName?: Maybe<Scalars['String']['output']>;
  /** Optional user email */
  email?: Maybe<Scalars['String']['output']>;
  /** User's ethereum name service domain */
  ens?: Maybe<Scalars['String']['output']>;
  /** List of releases in featured sounds */
  featuredReleases?: Maybe<Array<CollectedRelease>>;
  /**
   * List of releases in featured sounds
   * @deprecated Use User.featuredReleases instead
   */
  featuredSounds: Array<CollectedRelease>;
  /** How many followers a user has */
  followerCount: Scalars['Int']['output'];
  /** Paginated followers of user */
  followers: UserRelationConnection;
  /** Paginated following of user */
  following: UserRelationConnection;
  /** How many users a user is following */
  followingCount: Scalars['Int']['output'];
  /**
   * Does the user have the artist role to be able to have an artist profile
   * @deprecated No longer relevant with new artist verification
   */
  hasArtistRole: Scalars['Boolean']['output'];
  /** Returns whether user has at least one shelf with at least one release */
  hasShelfWithItems: Scalars['Boolean']['output'];
  /** User UUID */
  id: Scalars['ID']['output'];
  /** User instagram handle */
  instagramHandle?: Maybe<Scalars['String']['output']>;
  /** User ID of the user who invited this user */
  invitedByUser?: Maybe<User>;
  /**
   * User ID of the user who invited this user
   * @deprecated Use User.invitedByUser instead
   */
  invitedByUserId?: Maybe<Scalars['ID']['output']>;
  /** Is top notable collector */
  isTopNotableCollector: Scalars['Boolean']['output'];
  /** Last tracked referral withdrawable balance. Only available for own authenticated user */
  lastReferralWithdrawableBalance?: Maybe<Scalars['String']['output']>;
  /** An autogenerated playlist that contains all the releases the user liked */
  likedSounds?: Maybe<Shelf>;
  /** User provided location */
  location?: Maybe<GeoLocationPlaceGoogle>;
  /** How many nfts a user owns */
  nftsOwned: Scalars['Int']['output'];
  /** Paginated NFTs owned by user */
  nftsPaginated: NftConnection;
  /** Nonce for authentication purposes */
  nonce: Scalars['Int']['output'];
  /** Number of artists backed by user */
  numBackedArtists: Scalars['Int']['output'];
  /** Wallet public address */
  publicAddress: Scalars['String']['output'];
  /** Possible roles for user */
  roles: UserRoles;
  /** Paginated shelves of user */
  shelves: ShelfConnection;
  /** Shelves count of the user */
  shelvesCount: Scalars['Int']['output'];
  /** Should the user show the splits feature */
  showSplitsFeature: Scalars['Boolean']['output'];
  /** Rank of user by total spent. Rank is capped at 200. */
  topCollectorPosition?: Maybe<Scalars['Int']['output']>;
  /** Verifier twitter handle */
  twitterHandle?: Maybe<Scalars['String']['output']>;
  /** Returns user username */
  username: Scalars['String']['output'];
  /** Webapp URI of User. */
  webappUri: Scalars['String']['output'];
};


/** User entity */
export type UserBackedArtistsArgs = {
  pagination?: ArtistCollectorCursorConnectionArgs;
};


/** User entity */
export type UserCollectedReleasesArgs = {
  filter?: InputMaybe<UserCollectedReleasesFilter>;
  pagination?: CursorConnectionArgs;
  sort?: ReleasesCollectorSortEnum;
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
  numReleases: Scalars['Int']['output'];
  /** User that collected many songs in activity feed group */
  user: User;
};

/** Filter of User.collectedReleases paginated field */
export type UserCollectedReleasesFilter = {
  /** Filters on a list of specified genres */
  genres?: InputMaybe<Array<Genres>>;
  /** Filters on whether album releases have been revealed or not */
  releaseAlbumRevealStatus?: ReleaseAlbumRevealFilterOption;
  /** Filter on a list of specified release ids */
  releaseIds?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** Text search on release title or artist's name or handle */
  text?: InputMaybe<Scalars['NonEmptyString']['input']>;
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
  cursor: Scalars['String']['output'];
  /** User node */
  node: User;
};

/** Cursor connection parameters */
export type UserCursorConnectionArgs = {
  /** Start forwards pagination since "after" cursor */
  after?: InputMaybe<Scalars['String']['input']>;
  /** Start backwards pagination since "before" cursor */
  before?: InputMaybe<Scalars['String']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "after", with a maximum of 51 nodes. */
  first?: InputMaybe<Scalars['NonNegativeInt']['input']>;
  /** Limit the amount of nodes to be fetched, to be used with "before", with a maximum of 51 nodes. */
  last?: InputMaybe<Scalars['NonNegativeInt']['input']>;
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
  releases?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

/** Entity that represents user notifications */
export type UserNotification = {
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Recipient user entity */
  user?: Maybe<User>;
};

/** Edge of UserNotification connection */
export type UserNotificationConnectionEdge = Edge & {
  /** Cursor to be used for pagination */
  cursor: Scalars['String']['output'];
  /** UserNotification node */
  node: UserNotification;
};

/** User relation entity */
export type UserRelation = Node & {
  /** User relation creation date */
  createdAt: Scalars['DateTime']['output'];
  /** User relation identifier */
  id: Scalars['ID']['output'];
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
  cursor: Scalars['String']['output'];
  /** User Relation Entity */
  node: UserRelation;
};

/** Roles available for users */
export type UserRoles = {
  /** Administrator of platform */
  isAdmin: Scalars['Boolean']['output'];
  /** Member of artist relations team */
  isArtistRelations: Scalars['Boolean']['output'];
};

/** Filter the shelves of a user */
export type UserShelvesFilter = {
  /** Case-insensitive text search on shelves names */
  text?: InputMaybe<Scalars['NonEmptyString']['input']>;
  /** Filter by different types of shelves available for users. */
  type?: ShelfTypeFilter;
};

/** Input of VersionSupported query */
export type VersionStatusInput = {
  /** Platform type */
  platform: PlatformType;
  /** Semantic version */
  version: Scalars['SemanticVersion']['input'];
};

/** Union of version status response types */
export type VersionStatusResponse = NotSupportedVersion | SupportedVersion;

/** Version status response interface */
export type VersionStatusResponseInterface = {
  /** Recommended version */
  recommendedVersion: Scalars['String']['output'];
};

/** A release has reached viral mints status */
export type ViralMintsReached = Node & UserNotification & {
  /** UserNotification UUID */
  id: Scalars['ID']['output'];
  /** Viral mints release entity */
  release?: Maybe<Release>;
  /** Timestamp for notification */
  timestamp: Scalars['Timestamp']['output'];
  /** Recipient user entity */
  user?: Maybe<User>;
};

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = (
  { __typename: 'Query' }
  & { ' $fragmentRefs'?: { 'TestFragmentFragment': TestFragmentFragment } }
);

export type TestMutateMutationVariables = Exact<{
  publicAddress: Scalars['String']['input'];
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


export type ReleasesTestQuery = { releases: { edges: Array<{ cursor: string, node: { id: string, title: string, artist: { id: string, name: string } } }>, pageInfo: { hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type CountSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type CountSubscription = { count: number };
