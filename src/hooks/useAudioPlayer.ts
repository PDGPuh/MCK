import { useEffect, useRef } from "react";
import { usePlayer } from "../store/playerContext";
import { EqBands } from "../types/music";

const FREQUENCIES = [60, 250, 1000, 4000, 12000] as const;

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const filtersRef = useRef<Map<number, BiquadFilterNode>>(new Map());

  const {
    currentTrack,
    isPlaying,
    volume,
    isMuted,
    repeatMode,
    eqBands,
    isEqEnabled,
    activeDeviceId,
    updateCurrentTime,
    updateDuration,
    setPlayingState,
    nextTrack,
    previousTrack,
    registerSeekHandler,
    registerSetSinkIdHandler,
  } = usePlayer();

  // Initialize DOM Audio element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.setAttribute("playsinline", "true");
    audio.setAttribute("webkit-playsinline", "true");
    audio.preload = "auto";

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const cur = audioRef.current.currentTime;
        updateCurrentTime(cur);

        // Sync MediaSession position state for iOS Lock Screen & Background playback
        if (
          "mediaSession" in navigator &&
          typeof navigator.mediaSession.setPositionState === "function" &&
          audioRef.current.duration &&
          !isNaN(audioRef.current.duration)
        ) {
          try {
            navigator.mediaSession.setPositionState({
              duration: audioRef.current.duration,
              playbackRate: audioRef.current.playbackRate || 1,
              position: Math.min(cur, audioRef.current.duration),
            });
          } catch (e) {
            // Ignore edge errors
          }
        }
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        updateDuration(audioRef.current.duration || 0);
      }
    };

    const handleEnded = () => {
      if (repeatMode === "one") {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      } else {
        nextTrack();
      }
    };

    const handleError = (e: Event) => {
      console.warn("Audio element error:", e);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Setup Web Audio API Nodes once user enables Equalizer
  const initWebAudio = () => {
    if (audioCtxRef.current || !audioRef.current || !isEqEnabled) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaElementSource(audioRef.current);
      sourceNodeRef.current = source;

      // Build 5 BiquadFilterNodes
      let prevNode: AudioNode = source;
      const filters = new Map<number, BiquadFilterNode>();

      FREQUENCIES.forEach((freq, idx) => {
        const filter = audioCtx.createBiquadFilter();
        if (idx === 0) {
          filter.type = "lowshelf";
        } else if (idx === FREQUENCIES.length - 1) {
          filter.type = "highshelf";
        } else {
          filter.type = "peaking";
          filter.Q.value = 1.0;
        }
        filter.frequency.value = freq;
        const gainVal = eqBands[freq as keyof EqBands] || 0;
        filter.gain.value = isEqEnabled ? gainVal : 0;

        prevNode.connect(filter);
        prevNode = filter;
        filters.set(freq, filter);
      });

      prevNode.connect(audioCtx.destination);
      filtersRef.current = filters;
    } catch (e) {
      console.warn("Web Audio API initialization note:", e);
    }
  };

  // Register seek handler
  useEffect(() => {
    registerSeekHandler((seconds: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = seconds;
      }
    });
  }, [registerSeekHandler]);

  // Register setSinkId handler for real hardware output device routing
  useEffect(() => {
    registerSetSinkIdHandler((deviceId: string) => {
      const audio = audioRef.current as (HTMLAudioElement & { setSinkId?: (id: string) => Promise<void> }) | null;
      if (audio && typeof audio.setSinkId === "function") {
        audio.setSinkId(deviceId).catch((err) => {
          console.warn("Native setSinkId note:", err);
        });
      }
    });
  }, [registerSetSinkIdHandler]);

  // Sync Equalizer Gains when eqBands or isEqEnabled change
  useEffect(() => {
    if (filtersRef.current.size === 0) return;
    FREQUENCIES.forEach((freq) => {
      const filter = filtersRef.current.get(freq);
      if (filter) {
        const gainVal = isEqEnabled ? eqBands[freq as keyof EqBands] || 0 : 0;
        filter.gain.setTargetAtTime(gainVal, audioCtxRef.current?.currentTime || 0, 0.05);
      }
    });
  }, [eqBands, isEqEnabled]);

  // Sync track src and play/pause state
  // CRITICAL: Do NOT route audio through AudioContext here.
  // iOS Safari suspends AudioContext when app goes to background,
  // which kills audio playback. Keep <audio> element on the native
  // HTML5 pipeline so iOS mediaserverd can continue playback.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    try {
      const expectedSrc = new URL(currentTrack.audioSrc, window.location.origin).href;
      if (audio.src !== expectedSrc) {
        audio.src = currentTrack.audioSrc;
        audio.load();
      }
    } catch (e) {
      if (audio.src !== currentTrack.audioSrc) {
        audio.src = currentTrack.audioSrc;
        audio.load();
      }
    }

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Play request failed:", err);
        setPlayingState(false);
      });
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  // Initialize EQ AudioContext ONLY when user explicitly enables EQ
  // This is separated from play/pause to avoid connecting audio element
  // to AudioContext by default (which breaks iOS background playback)
  useEffect(() => {
    if (isEqEnabled && !audioCtxRef.current && audioRef.current) {
      initWebAudio();
    }
    if (audioCtxRef.current) {
      if (isEqEnabled && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      } else if (!isEqEnabled && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend().catch(() => {});
      }
    }
  }, [isEqEnabled]);

  // iOS Safari recovery: when user returns to the app after backgrounding,
  // resume playback if it was supposed to be playing
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && audioRef.current && isPlaying) {
        // Re-trigger play on return to foreground in case iOS paused it
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {});
        }
        // Resume AudioContext if EQ is active
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume().catch(() => {});
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying]);

  // Media Session API for iOS Safari / Chrome Lock Screen & Background playback
  useEffect(() => {
    if (!currentTrack || typeof window === "undefined" || !("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: currentTrack.title,
      artist: currentTrack.artist,
      album: currentTrack.collection || "HVL Album",
      artwork: [
        { src: window.location.origin + currentTrack.cover, sizes: "512x512", type: "image/jpeg" },
      ],
    });

    try {
      navigator.mediaSession.setActionHandler("play", () => setPlayingState(true));
      navigator.mediaSession.setActionHandler("pause", () => setPlayingState(false));
      navigator.mediaSession.setActionHandler("previoustrack", () => previousTrack());
      navigator.mediaSession.setActionHandler("nexttrack", () => nextTrack());
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        if (details.seekTime !== undefined && audioRef.current) {
          audioRef.current.currentTime = details.seekTime;
          updateCurrentTime(details.seekTime);
        }
      });
    } catch (e) {
      console.warn("MediaSession action handler note:", e);
    }
  }, [currentTrack, setPlayingState, nextTrack, previousTrack, updateCurrentTime]);

  // Sync volume and mute
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  return { audioRef };
}
