import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Heart, ListPlus, Share2, Check, Music } from "lucide-react";
import { Track } from "../../types/music";
import { usePlayer } from "../../store/playerContext";

interface TrackContextMenuProps {
  track: Track | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TrackContextMenu: React.FC<TrackContextMenuProps> = ({ track, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { playTrack, likedTrackIds, toggleLikeTrack } = usePlayer();

  if (!track) return null;
  const isLiked = likedTrackIds.includes(track.id);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/player/${track.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto bg-[#0d1013] border-t border-white/15 rounded-t-[28px] p-6 pb-10 shadow-[0_-12px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />

            {/* Track Info Card Header */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#12161a] border border-white/10 mb-5">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#050607]">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <h4 className="text-sm font-bold text-[#f2f0ea] truncate">{track.title}</h4>
                <p className="text-xs text-[#969aa0] truncate mt-0.5">{track.artist} · {track.collection}</p>
              </div>
              <button onClick={onClose} className="p-1.5 text-[#969aa0] hover:text-[#f2f0ea]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Actions List */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  playTrack(track);
                  onClose();
                }}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-[#050607] hover:bg-white/10 text-[#f2f0ea] transition-colors text-sm font-medium border border-white/10"
              >
                <Play className="w-5 h-5 text-[#b9c6d8] fill-current" />
                <span>Play Now</span>
              </button>

              <button
                onClick={() => {
                  toggleLikeTrack(track.id);
                }}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-[#050607] hover:bg-white/10 text-[#f2f0ea] transition-colors text-sm font-medium border border-white/10"
              >
                <Heart className={`w-5 h-5 ${isLiked ? "text-[#b9c6d8] fill-current" : "text-[#969aa0]"}`} />
                <span>{isLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                }}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-[#050607] hover:bg-white/10 text-[#f2f0ea] transition-colors text-sm font-medium border border-white/10"
              >
                <ListPlus className="w-5 h-5 text-[#b9c6d8]" />
                <span>Add to Playlist Queue</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#050607] hover:bg-white/10 text-[#f2f0ea] transition-colors text-sm font-medium border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <Share2 className="w-5 h-5 text-[#b9c6d8]" />
                  <span>Copy Track Share Link</span>
                </div>
                {copied && <span className="text-xs font-bold text-[#b9c6d8] flex items-center gap-1"><Check className="w-4 h-4" /> Copied!</span>}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
