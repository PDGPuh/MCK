import React from "react";
import { usePlayer } from "../../store/playerContext";

interface PlayerTimelineProps {
  onSeek?: (seconds: number) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export const PlayerTimeline: React.FC<PlayerTimelineProps> = () => {
  const { currentTime, duration, seek } = usePlayer();

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  return (
    <div className="w-full px-6 py-2">
      <div className="relative flex items-center group">
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          onInput={handleSeek}
          aria-label="Seek track position"
          className="w-full h-1.5 bg-[#12161a] rounded-lg appearance-none cursor-pointer accent-[#b9c6d8] focus:outline-none z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        />

        {/* Custom Visible Track Slider Background */}
        <div className="absolute left-0 right-0 h-1.5 bg-[#12161a] rounded-lg overflow-hidden pointer-events-none">
          <div
            className="h-full bg-[#b9c6d8] rounded-lg transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-xs font-medium text-[#969aa0] mt-2">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
