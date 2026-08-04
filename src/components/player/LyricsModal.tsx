import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Disc, Play } from "lucide-react";
import { usePlayer } from "../../store/playerContext";
import { TRACK_LYRICS, DEFAULT_LYRICS } from "../../data/lyrics";

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export const LyricsModal: React.FC<LyricsModalProps> = ({ isOpen, onClose }) => {
  const { currentTrack, currentTime, seek } = usePlayer();
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  const lyrics = currentTrack && TRACK_LYRICS[currentTrack.id] ? TRACK_LYRICS[currentTrack.id] : DEFAULT_LYRICS;

  // Find active line index based on current playback time
  let activeIndex = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      activeIndex = i;
    }
  }

  // Smoothly scroll active line to center
  useEffect(() => {
    if (activeLineRef.current && isOpen) {
      activeLineRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeIndex, isOpen]);

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 max-w-[430px] mx-auto bg-[#050607] flex flex-col p-6 overflow-hidden"
        >
          {/* Background Blurred Album Cover */}
          <div
            className="absolute inset-0 opacity-25 bg-cover bg-center blur-3xl pointer-events-none scale-125 transition-all duration-700"
            style={{ backgroundImage: `url(${currentTrack.cover})` }}
          />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/20 bg-[#0d1013] shadow-lg">
                <img src={currentTrack.cover} alt={currentTrack.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-[#b9c6d8] uppercase tracking-widest">REAL-TIME KARAOKE</span>
                <h4 className="text-sm font-bold text-[#f2f0ea] truncate max-w-[200px]">{currentTrack.title}</h4>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#969aa0] hover:text-[#f2f0ea] transition-colors rounded-full hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Synced Lyrics Body */}
          <div className="relative z-10 flex-1 overflow-y-auto no-scrollbar py-16 flex flex-col gap-8 text-center">
            {lyrics.map((line, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={idx}
                  ref={isActive ? activeLineRef : null}
                  onClick={() => seek(line.time)}
                  className={`group relative cursor-pointer transition-all duration-300 py-1 px-4 rounded-xl ${
                    isActive
                      ? "bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(185,198,216,0.25)]"
                      : "hover:bg-white/5"
                  }`}
                >
                  <p
                    className={`text-lg font-extrabold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-[#b9c6d8] scale-105 drop-shadow-[0_0_12px_rgba(185,198,216,0.8)]"
                        : "text-[#676d74] group-hover:text-[#969aa0]"
                    }`}
                  >
                    {line.text}
                  </p>

                  <div className="flex items-center justify-center gap-1 mt-1 text-[10px] font-mono text-[#969aa0] opacity-60 group-hover:opacity-100 transition-opacity">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{formatTime(line.time)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Hint */}
          <div className="relative z-10 pt-4 border-t border-white/10 text-center text-xs text-[#969aa0] flex items-center justify-center gap-2">
            <Disc className="w-4 h-4 text-[#b9c6d8] animate-spin" style={{ animationDuration: "6s" }} />
            <span>Tap any line to seek music to that exact timestamp</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
