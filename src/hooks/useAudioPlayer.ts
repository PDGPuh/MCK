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
    registerSeekHandler,
    registerSetSinkIdHandler,
  } = usePlayer();

  // Initialize Audio element and Web Audio API Equalizer chain
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        updateCurrentTime(audioRef.current.currentTime);
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
      audio.pause();
    };
  }, []);

  // Setup Web Audio API Nodes once user interacts
  const initWebAudio = () => {
    if (audioCtxRef.current || !audioRef.current) return;

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

  // Update src when currentTrack changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (audio.src !== window.location.origin + currentTrack.audioSrc) {
      audio.src = currentTrack.audioSrc;
      if (isPlaying) {
        initWebAudio();
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
        audio.play().catch((err) => {
          console.warn("Playback interrupted by policy:", err);
          setPlayingState(false);
        });
      }
    }
  }, [currentTrack]);

  // Sync play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      initWebAudio();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      audio.play().catch((err) => {
        console.warn("Play request failed:", err);
        setPlayingState(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Sync volume and mute
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  return { audioRef };
}
