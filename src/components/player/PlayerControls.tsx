import React from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react";
import { usePlayer } from "../../store/playerContext";
import { cn } from "../../utils/cn";

export const PlayerControls: React.FC = () => {
  const { isPlaying, togglePlayPause, nextTrack, previousTrack, isShuffle, toggleShuffle, repeatMode, toggleRepeat } =
    usePlayer();

  return (
    <div className="flex items-center justify-between w-full px-6 py-4">
      {/* Shuffle Button */}
      <button
        onClick={toggleShuffle}
        aria-label="Toggle Shuffle"
        className={cn(
          "p-3 rounded-full transition-colors active:scale-95",
          isShuffle ? "text-[#b9c6d8] bg-white/5" : "text-[#676d74] hover:text-[#969aa0]"
        )}
      >
        <Shuffle className="w-5 h-5" />
      </button>

      {/* Previous Track */}
      <button
        onClick={previousTrack}
        aria-label="Previous Track"
        className="p-3 text-[#f2f0ea] hover:text-white transition-all active:scale-90"
      >
        <SkipBack className="w-7 h-7 fill-current" />
      </button>

      {/* Play / Pause Main Button */}
      <button
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="w-16 h-16 rounded-full bg-[#b9c6d8] text-[#050607] flex items-center justify-center shadow-[0_0_24px_rgba(185,198,216,0.5)] transition-transform active:scale-95 hover:scale-105"
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 fill-current" />
        ) : (
          <Play className="w-7 h-7 fill-current ml-1" />
        )}
      </button>

      {/* Next Track */}
      <button
        onClick={nextTrack}
        aria-label="Next Track"
        className="p-3 text-[#f2f0ea] hover:text-white transition-all active:scale-90"
      >
        <SkipForward className="w-7 h-7 fill-current" />
      </button>

      {/* Repeat Mode */}
      <button
        onClick={toggleRepeat}
        aria-label="Toggle Repeat"
        className={cn(
          "p-3 rounded-full relative transition-colors active:scale-95",
          repeatMode !== "off" ? "text-[#b9c6d8] bg-white/5" : "text-[#676d74] hover:text-[#969aa0]"
        )}
      >
        <Repeat className="w-5 h-5" />
        {repeatMode === "one" && (
          <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-[#b9c6d8] text-[#050607] rounded-full w-3.5 h-3.5 flex items-center justify-center">
            1
          </span>
        )}
      </button>
    </div>
  );
};
