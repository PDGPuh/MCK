import React from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePlayer } from "../../store/playerContext";

export const MiniPlayer: React.FC = () => {
  const navigate = useNavigate();
  const { currentTrack, isPlaying, togglePlayPause, nextTrack, currentTime, duration } = usePlayer();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        onClick={() => navigate(`/player/${currentTrack.id}`)}
        className="fixed bottom-[65px] left-0 right-0 z-20 max-w-[410px] mx-auto px-3"
      >
        <div className="relative overflow-hidden rounded-2xl bg-[#0d1013]/95 backdrop-blur-2xl border border-white/15 shadow-[0_12px_32px_rgba(0,0,0,0.6)] p-2.5 flex items-center justify-between cursor-pointer group active:scale-[0.99] transition-transform">
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-[#b9c6d8] transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Left Track Info */}
          <div className="flex items-center gap-3 min-w-0">
            <motion.div
              layoutId={`artwork-${currentTrack.id}`}
              className="w-10 h-10 rounded-lg overflow-hidden border border-white/15 flex-shrink-0 bg-[#12161a]"
            >
              <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
            </motion.div>

            <div className="flex flex-col min-w-0">
              <h4 className="text-xs font-semibold text-[#f2f0ea] truncate group-hover:text-white">
                {currentTrack.title}
              </h4>
              <p className="text-[11px] text-[#969aa0] truncate mt-0.5">{currentTrack.artist}</p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="p-2 text-[#f2f0ea] hover:text-white transition-colors active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>

            <button
              onClick={nextTrack}
              aria-label="Next track"
              className="p-2 text-[#969aa0] hover:text-[#f2f0ea] transition-colors active:scale-95"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
