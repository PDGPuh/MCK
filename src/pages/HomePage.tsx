import React from "react";
import { Play, Plus } from "lucide-react";
import { motion } from "motion/react";
import { MCK_TRACKS } from "../data/music";
import { TrackRow } from "../components/tracks/TrackRow";
import { usePlayer } from "../store/playerContext";

export const HomePage: React.FC = () => {
  const { playTrack } = usePlayer();

  const handlePlayHero = () => {
    playTrack(MCK_TRACKS[0], MCK_TRACKS);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 pb-28 px-5"
    >
      {/* Hero Banner Section */}
      <div className="relative w-full aspect-[4/3] rounded-[22px] overflow-hidden border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)] group">
        <img
          src="/assets/hero_home_hvl.jpg"
          alt="HVL Hero"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/40 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold tracking-widest text-[#b9c6d8] uppercase">
              FEATURED ALBUM
            </span>
            <h2 className="text-3xl font-extrabold text-[#f2f0ea] tracking-tight font-serif">
              HVL
            </h2>
            <p className="text-xs text-[#969aa0]">Dark soul essentials · 30 tracks</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayHero}
              aria-label="Play HVL Essentials"
              className="w-12 h-12 rounded-full bg-[#b9c6d8] text-[#050607] flex items-center justify-center shadow-[0_0_20px_rgba(185,198,216,0.6)] active:scale-95 transition-transform hover:scale-105"
            >
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </button>

            <button
              aria-label="Add to Library"
              className="w-10 h-10 rounded-full bg-[#12161a]/80 backdrop-blur-md border border-white/20 text-[#f2f0ea] flex items-center justify-center active:scale-95 transition-transform hover:bg-white/10"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* From HVL Track List Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#f2f0ea] tracking-wide">From HVL</h3>
          <button className="text-xs font-semibold text-[#b9c6d8] hover:underline">See all</button>
        </div>

        <div className="flex flex-col gap-1">
          {MCK_TRACKS.map((track, idx) => (
            <TrackRow key={track.id} track={track} index={idx} playlistContext={MCK_TRACKS} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
