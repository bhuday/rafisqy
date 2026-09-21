export interface AnimeGenre {
  mal_id: number;
  name: string;
}

export interface AnimeImages {
  jpg: {
    image_url: string;
    small_image_url?: string;
    large_image_url: string;
  };
  webp?: {
    image_url: string;
    small_image_url?: string;
    large_image_url: string;
  };
}

export interface AnimeTrailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
}

export interface AnimeEpisode {
  id: string;
  number: number;
  title: string;
  thumbnail: string;
  duration: string;
  intro?: {
    start: number;
    end: number;
  };
  outro?: {
    start: number;
    end: number;
  };
  sources: {
    name: string;
    url: string;
    quality: string;
    type: 'video' | 'youtube' | 'embed';
    isDub?: boolean;
  }[];
}

export interface AnimeCharacter {
  id: number;
  name: string;
  role: string;
  image: string;
  voiceActor?: {
    name: string;
    language: string;
    image: string;
  };
}

export interface Anime {
  id: number;
  mal_id?: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  synopsis: string;
  bannerImage?: string;
  coverImage: string;
  score: number;
  scoredBy?: number;
  rank?: number;
  popularity?: number;
  episodesCount: number;
  status: 'Currently Airing' | 'Finished Airing' | 'Not yet aired' | string;
  format: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special' | string;
  season?: string;
  year?: number;
  studio?: string;
  rating?: string;
  genres: string[];
  trailer?: AnimeTrailer;
  episodes?: AnimeEpisode[];
  characters?: AnimeCharacter[];
}

export interface WatchHistoryItem {
  animeId: number;
  animeTitle: string;
  animeImage: string;
  episodeNumber: number;
  episodeTitle: string;
  timestamp: number; // in seconds
  duration: number; // in seconds
  updatedAt: number; // timestamp ms
  progressPercent: number;
}

export type WatchlistStatus = 'watching' | 'plan_to_watch' | 'completed' | 'favorite';

export interface WatchlistItem {
  animeId: number;
  anime: Anime;
  status: WatchlistStatus;
  addedAt: number;
}

export interface UserSettings {
  autoSkipIntro: boolean;
  autoNextEpisode: boolean;
  defaultAudio: 'sub' | 'dub';
  defaultQuality: '1080p' | '720p' | '480p' | 'auto';
}
