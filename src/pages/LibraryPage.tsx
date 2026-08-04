import React from "react";
import { motion } from "motion/react";
import { ListMusic, Heart, Download, Clock } from "lucide-react";
import { FEATURED_PLAYLISTS, MCK_TRACKS } from "../data/music";
import { PlaylistCard } from "../components/playlists/PlaylistCard";
import { TrackRow } from "../components/tracks/TrackRow";
import { usePlayer } from "../store/playerContext";

export const LibraryPage: React.FC = () => {
  const { likedTrackIds, recentlyPlayedIds } = usePlayer();

  const likedTracks = MCK_TRACKS.filter((t) => likedTrackIds.includes(t.id));
  const recentTracks = MCK_TRACKS.filter((t) => recentlyPlayedIds.includes(t.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 pb-28 px-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <span className="text-[10px] font-bold text-[#b9c6d8] uppercase tracking-widest">LIBRARY</span>
          <h2 className="text-2xl font-bold text-[#f2f0ea]">Your Collection</h2>
        </div>
      </div>

      {/* Collection Hero Banner */}
      <div className="relative w-full aspect-[2/1] rounded-[22px] overflow-hidden border border-white/15 shadow-xl">
        <img
          src="/assets/library_collection_banner.jpg"
          alt="HVL Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-[#050607]/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-[#b9c6d8] uppercase">OFFICIAL ARCHIVE</span>
          <h3 className="text-xl font-bold text-[#f2f0ea] font-serif">HVL Collection</h3>
          <p className="text-xs text-[#969aa0]">Dark. Deep. Timeless soundscapes of MCK.</p>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center p-3 rounded-2xl bg-[#0d1013] border border-white/10">
          <ListMusic className="w-5 h-5 text-[#b9c6d8] mb-1" />
          <span className="text-base font-bold text-[#f2f0ea]">24</span>
          <span className="text-[10px] text-[#969aa0]">Playlists</span>
        </div>

        <div className="flex flex-col items-center p-3 rounded-2xl bg-[#0d1013] border border-white/10">
          <Heart className="w-5 h-5 text-[#b9c6d8] mb-1" />
          <span className="text-base font-bold text-[#f2f0ea]">{likedTrackIds.length || 312}</span>
          <span className="text-[10px] text-[#969aa0]">Liked Songs</span>
        </div>

        <div className="flex flex-col items-center p-3 rounded-2xl bg-[#0d1013] border border-white/10">
          <Download className="w-5 h-5 text-[#b9c6d8] mb-1" />
          <span className="text-base font-bold text-[#f2f0ea]">18</span>
          <span className="text-[10px] text-[#969aa0]">Offline</span>
        </div>
      </div>

      {/* Your Playlists */}
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold text-[#f2f0ea]">Your Playlists</h3>
        <div className="grid grid-cols-2 gap-3">
          {FEATURED_PLAYLISTS.slice(0, 4).map((pl) => (
            <PlaylistCard key={pl.id} playlist={pl} />
          ))}
        </div>
      </div>

      {/* Liked Tracks / Recently Played */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#b9c6d8]" />
          <h3 className="text-base font-bold text-[#f2f0ea]">Recently Played</h3>
        </div>

        <div className="flex flex-col gap-1">
          {(recentTracks.length > 0 ? recentTracks : MCK_TRACKS.slice(0, 5)).map((track) => (
            <TrackRow key={track.id} track={track} playlistContext={MCK_TRACKS} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
