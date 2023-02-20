export interface PodcastsState {
  podcasts: Podcast[];
  podcastsLoading: boolean;
  podcastsLoaded: boolean;
  podcastsFailed: boolean;

  episodes: Episode[];
  episodesLoading: boolean;
  episodesLoaded: boolean;
  episodesFailed: boolean;
}

export interface Podcast {
  id: string;
  artist: string;
  title: string;
  image: Image[];
}

export interface Image {
  height: number;
  uri: string;
}

export interface Episode {
  trackId: string;
  title: string;
  duration: string;
  date: string;
  description: string;
  link: string;
}

// podcasts output

export interface PodcastsOutput {
  feed: FeedOutput;
}

export interface FeedOutput {
  author: AuthorOutput;
  entry: EntryOutput[];
  updated: IconOutput;
  rights: IconOutput;
  title: IconOutput;
  icon: IconOutput;
  link: LinkOutput[];
  id: IconOutput;
}

export interface AuthorOutput {
  name: IconOutput;
  uri: IconOutput;
}

export interface IconOutput {
  label: string;
}

export interface EntryOutput {
  'im:name': IconOutput;
  'im:price': IMPriceOutput;
  'im:image': IMImageOutput[];
  summary: IconOutput;
  'im:artist': IMArtistOutput;
  title: IconOutput;
  link: LinkOutput;
  id: IDOutput;
  'im:contentType': IMContentTypeOutput;
  category: CategoryOutput;
  'im:releaseDate': IMReleaseDateOutput;
  rights?: IconOutput;
}

export interface IMReleaseDateOutput {
  label: Date;
  attributes: IconOutput;
}

export interface LinkOutput {
  attributes: LinkAttributesOutput;
}

export interface LinkAttributesOutput {
  rel: Rel;
  type?: Type;
  href: string;
}

export interface CategoryOutput {
  attributes: CategoryAttributesOutput;
}

export interface CategoryAttributesOutput {
  'im:id': string;
  term: PurpleLabelOutput;
  scheme: string;
  label: PurpleLabelOutput;
}

export enum PurpleLabelOutput {
  Music = 'Music',
  MusicCommentary = 'Music Commentary',
  MusicHistory = 'Music History',
  MusicInterviews = 'Music Interviews',
}

export interface IDOutput {
  label: string;
  attributes?: IDAttributesOutput;
}

export interface IDAttributesOutput {
  'im:id': string;
}

export interface IMArtistOutput {
  label: string;
  attributes?: IMArtistAttributesOutput;
}

export interface IMArtistAttributesOutput {
  href: string;
}

export interface IMContentTypeOutput {
  attributes: IMContentTypeAttributesOutput;
}

export interface IMContentTypeAttributesOutput {
  term: FluffyLabel;
  label: FluffyLabel;
}

export interface IMImageOutput {
  label: string;
  attributes: IMImageAttributesOutput;
}

export interface IMImageAttributesOutput {
  height: string;
}

export interface IMPriceOutput {
  label: IMPriceLabel;
  attributes: IMPriceAttributesOutput;
}

export interface IMPriceAttributesOutput {
  amount: string;
  currency: Currency;
}

// episodes output

export interface AlloriginsOutput {
  contents: string;
  status: AlloriginsStatusOutput;
}

export interface AlloriginsStatusOutput {
  content_length: number;
  content_type: string;
  status: number;
}

export interface EpisodesOutput {
  resultCount: number;
  results: EpisodeOutput[];
}

export interface EpisodeOutput {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: Date;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export interface EpisodeFeedXMLOutput {
  declaration: {
    attributes: {
      encoding: string;
      version: string;
    };
  };
  elements: ElementXMLOutput<
    'rss',
    ElementXMLOutput<'channel', ElementInsideXMLOutput>
  >[];
}

export interface ElementXMLOutput<N, E> {
  type: 'element';
  name: N;
  elements: E[];
}

export interface ElementInsideXMLOutput {
  type: 'element';
  name: ElementXMLEnum;
  elements: ElementInsideItemXMLOutput<ElementXMLEnum>[];
}

export interface ElementInsideItemXMLOutput<T extends ElementXMLEnum> {
  type: 'element';
  name: T;
  elements: {
    type: 'cdata' | 'text';
    text?: string;
    cdata?: string;
  }[];
}

// enums

export enum ElementXMLEnum {
  Guid = 'guid',
  AtomLink = 'atom:link',
  Generator = 'generator',
  Title = 'title',
  Description = 'description',
  Copyright = 'copyright',
  Language = 'language',
  PubDate = 'pubDate',
  LasBuildDate = 'lastBuildDate',
  Image = 'image',
  Link = 'link',
  ItunesType = 'itunes:type',
  ItunesSummary = 'itunes:summary',
  ItunesAuthor = 'itunes:author',
  ItunesExplicit = 'itunes:explicit',
  ItunesImage = 'itunes:image',
  ItunesNewFeedUtl = 'itunes:new-feed-url',
  ItunesOwner = 'itunes:owner',
  ItunesCategory = 'itunes:category',
  ItunesDuration = 'itunes:duration',
  Item = 'item',
}

export enum Rel {
  Alternate = 'alternate',
  Self = 'self',
}

export enum Type {
  TextHTML = 'text/html',
}

export enum Currency {
  Usd = 'USD',
}

export enum IMPriceLabel {
  Get = 'Get',
}

export enum FluffyLabel {
  Podcast = 'Podcast',
}
