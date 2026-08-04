export interface Track {
  id: string;
  title: string;
  artist: string;
  collection: string;
  cover: string;
  audioSrc: string;
  durationSeconds: number;
  explicit?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  cover: string;
  description?: string;
  trackCount?: number;
  followers?: string;
}

export interface Artist {
  id: string;
  name: string;
  avatar?: string;
  verified?: boolean;
}

export type RepeatMode = 'off' | 'all' | 'one';

export interface EqBands {
  60: number;
  250: number;
  1000: number;
  4000: number;
  12000: number;
}

export type EqPresetName = 'Flat' | 'Bass Boost' | 'Hip-Hop (MCK)' | 'Vocal Boost' | 'Treble Boost';

export interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeatMode: RepeatMode;
  isShuffle: boolean;
  likedTrackIds: string[];
  recentlyPlayedIds: string[];
  eqBands: EqBands;
  eqPreset: EqPresetName;
  isEqEnabled: boolean;
}
