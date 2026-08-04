import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, MoreVertical, Heart } from "lucide-react";
import { motion } from "motion/react";
import { usePlayer } from "../store/playerContext";
import { PlayerArtwork } from "../components/player/PlayerArtwork";
import { PlayerTimeline } from "../components/player/PlayerTimeline";
import { PlayerControls } from "../components/player/PlayerControls";
import { InfoTile } from "../components/player/InfoTile";
import { ExplicitBadge } from "../components/tracks/ExplicitBadge";

export const NowPlayingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentTrack, queue, likedTrackIds, toggleLikeTrack, seek } = usePlayer();

  if (!currentTrack) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[#969aa0]">
        <p>No track currently playing</p>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 rounded-full bg-[#b9c6d8] text-[#050607] font-semibold text-xs">
          Go to Home
        </button>
      </div>
    );
  }

  const isLiked = likedTrackIds.includes(currentTrack.id);

  // Find next track in queue
  const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);
  const nextTrack = currentIndex >= 0 && currentIndex < queue.length - 1 ? queue[currentIndex + 1] : queue[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col min-h-dvh pb-12 px-2 bg-[#050607]"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          aria-label="Collapse Player"
          className="p-2 text-[#969aa0] hover:text-[#f2f0ea] transition-colors rounded-full hover:bg-white/5 active:scale-95"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-[#b9c6d8] uppercase tracking-widest">
            NOW PLAYING
          </span>
          <span className="text-xs font-serif text-[#969aa0] tracking-wider uppercase">HVL</span>
        </div>

        <button
          aria-label="More options"
          className="p-2 text-[#969aa0] hover:text-[#f2f0ea] transition-colors rounded-full hover:bg-white/5 active:scale-95"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      {/* Large Artwork */}
      <PlayerArtwork coverUrl={currentTrack.cover} title={currentTrack.title} trackId={currentTrack.id} />

      {/* Track Info Header */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex flex-col min-w-0 pr-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#f2f0ea] truncate">{currentTrack.title}</h2>
            {currentTrack.explicit && <ExplicitBadge />}
          </div>
          <p className="text-sm font-medium text-[#969aa0] truncate mt-1">
            {currentTrack.artist} · {currentTrack.collection}
          </p>
        </div>

        <button
          onClick={() => toggleLikeTrack(currentTrack.id)}
          aria-label={isLiked ? "Unlike" : "Like"}
          className="p-3 text-[#676d74] hover:text-[#f2f0ea] transition-colors active:scale-125 flex-shrink-0"
        >
          <Heart className={`w-6 h-6 ${isLiked ? "text-[#b9c6d8] fill-current" : ""}`} />
        </button>
      </div>

      {/* Timeline Slider */}
      <PlayerTimeline onSeek={seek} />

      {/* Playback Controls */}
      <PlayerControls />

      {/* Secondary Cards */}
      <div className="flex flex-col gap-3 px-4 mt-4">
        <InfoTile type="lyrics" />
        <InfoTile type="upnext" nextTrack={nextTrack} />
        <InfoTile type="output" />
      </div>
    </motion.div>
  );
};
