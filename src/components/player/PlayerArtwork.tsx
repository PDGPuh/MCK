import React from "react";
import { motion } from "motion/react";

interface PlayerArtworkProps {
  coverUrl: string;
  title: string;
  trackId: string;
}

export const PlayerArtwork: React.FC<PlayerArtworkProps> = ({ coverUrl, title, trackId }) => {
  return (
    <div className="flex justify-center w-full px-6 py-4">
      <motion.div
        layoutId={`artwork-${trackId}`}
        className="relative w-full max-w-[320px] aspect-square rounded-[22px] overflow-hidden border border-white/15 bg-[#0d1013] shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[22px]" />
      </motion.div>
    </div>
  );
};
