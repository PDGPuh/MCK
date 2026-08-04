import React, { createContext, useContext, useReducer, useEffect, useRef, ReactNode } from "react";
import { Track, PlayerState, RepeatMode, EqBands, EqPresetName } from "../types/music";
import { MCK_TRACKS } from "../data/music";

export const EQ_PRESETS: Record<EqPresetName, EqBands> = {
  Flat: { 60: 0, 250: 0, 1000: 0, 4000: 0, 12000: 0 },
  "Bass Boost": { 60: 7, 250: 5, 1000: 1, 4000: 0, 12000: 0 },
  "Hip-Hop (MCK)": { 60: 6, 250: 4, 1000: 1, 4000: 3, 12000: 5 },
  "Vocal Boost": { 60: -2, 250: 0, 1000: 4, 4000: 5, 12000: 2 },
  "Treble Boost": { 60: -1, 250: 0, 1000: 2, 4000: 5, 12000: 7 },
};

interface PlayerContextType extends PlayerState {
  playTrack: (track: Track, newQueue?: Track[]) => void;
  togglePlayPause: () => void;
  pause: () => void;
  resume: () => void;
  seek: (timeSeconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleLikeTrack: (trackId: string) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  updateCurrentTime: (time: number) => void;
  updateDuration: (duration: number) => void;
  setPlayingState: (isPlaying: boolean) => void;
  registerSeekHandler: (handler: (time: number) => void) => void;
  setEqBand: (freq: number, gain: number) => void;
  applyEqPreset: (preset: EqPresetName) => void;
  toggleEq: () => void;
  activeDeviceId: string;
  activeDeviceName: string;
  setAudioOutputDevice: (deviceId: string, deviceName: string) => void;
  registerSetSinkIdHandler: (handler: (deviceId: string) => void) => void;
}

type Action =
  | { type: "PLAY_TRACK"; payload: { track: Track; queue?: Track[] } }
  | { type: "TOGGLE_PLAY_PAUSE" }
  | { type: "SET_PLAYING"; payload: boolean }
  | { type: "UPDATE_TIME"; payload: number }
  | { type: "UPDATE_DURATION"; payload: number }
  | { type: "SET_VOLUME"; payload: number }
  | { type: "TOGGLE_MUTE" }
  | { type: "NEXT_TRACK" }
  | { type: "PREVIOUS_TRACK" }
  | { type: "TOGGLE_LIKE"; payload: string }
  | { type: "TOGGLE_REPEAT" }
  | { type: "TOGGLE_SHUFFLE" }
  | { type: "SET_EQ_BAND"; payload: { freq: number; gain: number } }
  | { type: "APPLY_EQ_PRESET"; payload: EqPresetName }
  | { type: "TOGGLE_EQ" }
  | { type: "SET_OUTPUT_DEVICE"; payload: { deviceId: string; deviceName: string } }
  | { type: "LOAD_SAVED_STATE"; payload: Partial<PlayerState> };

interface ExtendedPlayerState extends PlayerState {
  activeDeviceId: string;
  activeDeviceName: string;
}

const initialState: ExtendedPlayerState = {
  currentTrack: MCK_TRACKS[0],
  queue: MCK_TRACKS,
  isPlaying: false,
  currentTime: 0,
  duration: MCK_TRACKS[0].durationSeconds,
  volume: 0.8,
  isMuted: false,
  repeatMode: "off",
  isShuffle: false,
  likedTrackIds: ["track-01", "track-06"],
  recentlyPlayedIds: ["track-01", "track-02", "track-03"],
  eqBands: EQ_PRESETS["Hip-Hop (MCK)"],
  eqPreset: "Hip-Hop (MCK)",
  isEqEnabled: true,
  activeDeviceId: "default",
  activeDeviceName: "System Default Speakers",
};

function playerReducer(state: ExtendedPlayerState, action: Action): ExtendedPlayerState {
  switch (action.type) {
    case "PLAY_TRACK": {
      const { track, queue } = action.payload;
      const newQueue = queue && queue.length > 0 ? queue : state.queue;
      const recent = [track.id, ...state.recentlyPlayedIds.filter((id) => id !== track.id)].slice(0, 20);
      return {
        ...state,
        currentTrack: track,
        queue: newQueue,
        isPlaying: true,
        currentTime: 0,
        duration: track.durationSeconds || state.duration,
        recentlyPlayedIds: recent,
      };
    }
    case "TOGGLE_PLAY_PAUSE":
      return { ...state, isPlaying: !state.isPlaying };
    case "SET_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "UPDATE_TIME":
      return { ...state, currentTime: action.payload };
    case "UPDATE_DURATION":
      return { ...state, duration: action.payload };
    case "SET_VOLUME":
      return { ...state, volume: action.payload, isMuted: action.payload === 0 };
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "NEXT_TRACK": {
      if (!state.currentTrack || state.queue.length === 0) return state;
      const currentIndex = state.queue.findIndex((t) => t.id === state.currentTrack?.id);
      let nextIndex = 0;
      if (state.isShuffle) {
        nextIndex = Math.floor(Math.random() * state.queue.length);
      } else {
        nextIndex = (currentIndex + 1) % state.queue.length;
      }
      const nextTrack = state.queue[nextIndex] || state.queue[0];
      return {
        ...state,
        currentTrack: nextTrack,
        isPlaying: true,
        currentTime: 0,
        duration: nextTrack.durationSeconds,
      };
    }
    case "PREVIOUS_TRACK": {
      if (!state.currentTrack || state.queue.length === 0) return state;
      const currentIndex = state.queue.findIndex((t) => t.id === state.currentTrack?.id);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : state.queue.length - 1;
      const prevTrack = state.queue[prevIndex];
      return {
        ...state,
        currentTrack: prevTrack,
        isPlaying: true,
        currentTime: 0,
        duration: prevTrack.durationSeconds,
      };
    }
    case "TOGGLE_LIKE": {
      const id = action.payload;
      const isLiked = state.likedTrackIds.includes(id);
      const newLiked = isLiked
        ? state.likedTrackIds.filter((tId) => tId !== id)
        : [...state.likedTrackIds, id];
      return { ...state, likedTrackIds: newLiked };
    }
    case "TOGGLE_REPEAT": {
      const modes: RepeatMode[] = ["off", "all", "one"];
      const nextMode = modes[(modes.indexOf(state.repeatMode) + 1) % modes.length];
      return { ...state, repeatMode: nextMode };
    }
    case "TOGGLE_SHUFFLE":
      return { ...state, isShuffle: !state.isShuffle };
    case "SET_EQ_BAND": {
      const { freq, gain } = action.payload;
      const newBands = { ...state.eqBands, [freq]: gain };
      return { ...state, eqBands: newBands };
    }
    case "APPLY_EQ_PRESET": {
      const presetName = action.payload;
      const bands = EQ_PRESETS[presetName] || EQ_PRESETS.Flat;
      return { ...state, eqPreset: presetName, eqBands: bands };
    }
    case "TOGGLE_EQ":
      return { ...state, isEqEnabled: !state.isEqEnabled };
    case "SET_OUTPUT_DEVICE":
      return {
        ...state,
        activeDeviceId: action.payload.deviceId,
        activeDeviceName: action.payload.deviceName,
      };
    case "LOAD_SAVED_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const seekHandlerRef = useRef<((time: number) => void) | null>(null);
  const setSinkIdHandlerRef = useRef<((deviceId: string) => void) | null>(null);

  const registerSeekHandler = (handler: (time: number) => void) => {
    seekHandlerRef.current = handler;
  };

  const registerSetSinkIdHandler = (handler: (deviceId: string) => void) => {
    setSinkIdHandlerRef.current = handler;
  };

  const seek = (timeSeconds: number) => {
    dispatch({ type: "UPDATE_TIME", payload: timeSeconds });
    if (seekHandlerRef.current) {
      seekHandlerRef.current(timeSeconds);
    }
  };

  const setAudioOutputDevice = (deviceId: string, deviceName: string) => {
    dispatch({ type: "SET_OUTPUT_DEVICE", payload: { deviceId, deviceName } });
    if (setSinkIdHandlerRef.current) {
      setSinkIdHandlerRef.current(deviceId);
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hvl_player_settings");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "LOAD_SAVED_STATE", payload: parsed });
      }
    } catch (e) {
      console.warn("Failed to parse localStorage settings", e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        "hvl_player_settings",
        JSON.stringify({
          likedTrackIds: state.likedTrackIds,
          recentlyPlayedIds: state.recentlyPlayedIds,
          volume: state.volume,
          repeatMode: state.repeatMode,
          isShuffle: state.isShuffle,
          eqBands: state.eqBands,
          eqPreset: state.eqPreset,
          isEqEnabled: state.isEqEnabled,
          activeDeviceId: state.activeDeviceId,
          activeDeviceName: state.activeDeviceName,
        })
      );
    } catch (e) {
      console.warn("Failed to save player settings to localStorage", e);
    }
  }, [state.likedTrackIds, state.recentlyPlayedIds, state.volume, state.repeatMode, state.isShuffle, state.eqBands, state.eqPreset, state.isEqEnabled, state.activeDeviceId, state.activeDeviceName]);

  const playTrack = (track: Track, queue?: Track[]) => dispatch({ type: "PLAY_TRACK", payload: { track, queue } });
  const togglePlayPause = () => dispatch({ type: "TOGGLE_PLAY_PAUSE" });
  const pause = () => dispatch({ type: "SET_PLAYING", payload: false });
  const resume = () => dispatch({ type: "SET_PLAYING", payload: true });
  const updateCurrentTime = (time: number) => dispatch({ type: "UPDATE_TIME", payload: time });
  const updateDuration = (duration: number) => dispatch({ type: "UPDATE_DURATION", payload: duration });
  const setPlayingState = (isPlaying: boolean) => dispatch({ type: "SET_PLAYING", payload: isPlaying });
  const setVolume = (vol: number) => dispatch({ type: "SET_VOLUME", payload: vol });
  const toggleMute = () => dispatch({ type: "TOGGLE_MUTE" });
  const nextTrack = () => dispatch({ type: "NEXT_TRACK" });
  const previousTrack = () => dispatch({ type: "PREVIOUS_TRACK" });
  const toggleLikeTrack = (id: string) => dispatch({ type: "TOGGLE_LIKE", payload: id });
  const toggleRepeat = () => dispatch({ type: "TOGGLE_REPEAT" });
  const toggleShuffle = () => dispatch({ type: "TOGGLE_SHUFFLE" });
  const setEqBand = (freq: number, gain: number) => dispatch({ type: "SET_EQ_BAND", payload: { freq, gain } });
  const applyEqPreset = (preset: EqPresetName) => dispatch({ type: "APPLY_EQ_PRESET", payload: preset });
  const toggleEq = () => dispatch({ type: "TOGGLE_EQ" });

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playTrack,
        togglePlayPause,
        pause,
        resume,
        seek,
        setVolume,
        toggleMute,
        nextTrack,
        previousTrack,
        toggleLikeTrack,
        toggleRepeat,
        toggleShuffle,
        updateCurrentTime,
        updateDuration,
        setPlayingState,
        registerSeekHandler,
        setEqBand,
        applyEqPreset,
        toggleEq,
        setAudioOutputDevice,
        registerSetSinkIdHandler,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
};
