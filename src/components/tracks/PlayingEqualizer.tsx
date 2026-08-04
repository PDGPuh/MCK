import React from "react";
import { motion } from "motion/react";

export const PlayingEqualizer: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = true }) => {
  return (
    <div className="flex items-end justify-center gap-0.5 w-4 h-4" aria-label="Now Playing Equalizer">
      <motion.span
        className="w-0.5 bg-[#b9c6d8] rounded-full"
        animate={isPlaying ? { height: ["30%", "100%", "40%", "80%", "30%"] } : { height: "30%" }}
        transition={isPlaying ? { repeat: Infinity, duration: 0.8, ease: "easeInOut" } : {}}
      />
      <motion.span
        className="w-0.5 bg-[#b9c6d8] rounded-full"
        animate={isPlaying ? { height: ["80%", "30%", "90%", "20%", "80%"] } : { height: "50%" }}
        transition={isPlaying ? { repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 } : {}}
      />
      <motion.span
        className="w-0.5 bg-[#b9c6d8] rounded-full"
        animate={isPlaying ? { height: ["40%", "90%", "20%", "100%", "40%"] } : { height: "30%" }}
        transition={isPlaying ? { repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.3 } : {}}
      />
    </div>
  );
};
