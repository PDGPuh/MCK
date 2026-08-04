import React, { useState } from "react";
import { Search, X, SlidersHorizontal, Play } from "lucide-react";
import { motion } from "motion/react";
import { MCK_TRACKS, FEATURED_PLAYLISTS, TOP_ARTISTS } from "../data/music";
import { CategoryChip } from "../components/playlists/CategoryChip";
import { PlaylistCard } from "../components/playlists/PlaylistCard";
import { TrackRow } from "../components/tracks/TrackRow";
import { usePlayer } from "../store/playerContext";

const CATEGORIES = ["Rap", "Dark Soul", "Chill", "Love", "Live", "Sad", "Vietnamese"];

export const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Dark Soul");
  const { playTrack } = usePlayer();

  const filteredTracks = MCK_TRACKS.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 pb-28 px-5"
    >
      {/* Search Bar Input */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-[#969aa0]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search music, artists, playlists..."
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#0d1013] border border-white/15 text-[#f2f0ea] placeholder-[#676d74] text-sm focus:outline-none focus:border-[#b9c6d8] transition-colors"
        />
        {searchTerm ? (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 p-1 text-[#969aa0] hover:text-[#f2f0ea]"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button className="absolute right-3 p-1 text-[#969aa0] hover:text-[#f2f0ea]">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Chips Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            isSelected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>

      {/* Search Results if user is typing */}
      {searchTerm ? (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-[#b9c6d8] uppercase tracking-wider">
            SEARCH RESULTS ({filteredTracks.length})
          </h3>

          {filteredTracks.length > 0 ? (
            <div className="flex flex-col gap-1">
              {filteredTracks.map((track) => (
                <TrackRow key={track.id} track={track} playlistContext={filteredTracks} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-[#676d74]">
              <Search className="w-10 h-10 mb-3 opacity-40" />
              <p className="text-sm font-medium">No results found for "{searchTerm}"</p>
              <p className="text-xs mt-1">Try searching for song titles like "Chìm Sâu" or "Elegie"</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Featured Selection Banner */}
          <div className="relative w-full aspect-[21/9] rounded-[20px] overflow-hidden border border-white/15 shadow-lg group">
            <img
              src="/assets/hero_search_hvl_selection.jpg"
              alt="HVL Selection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050607]/90 via-[#050607]/50 to-transparent" />
            <div className="absolute inset-0 p-4 flex flex-col justify-center gap-1">
              <span className="text-[10px] font-bold text-[#b9c6d8] uppercase tracking-widest">
                FEATURED SELECTION
              </span>
              <h3 className="text-lg font-bold text-[#f2f0ea] font-serif">HVL SELECTION</h3>
              <p className="text-xs text-[#969aa0] line-clamp-1">The finest cuts from the dark soul era.</p>
              <button
                onClick={() => playTrack(MCK_TRACKS[0], MCK_TRACKS)}
                className="mt-2 w-fit px-3 py-1.5 rounded-full bg-[#b9c6d8] text-[#050607] text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Now</span>
              </button>
            </div>
          </div>

          {/* Trending Playlists */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-[#f2f0ea]">Trending Playlists</h3>
            <div className="grid grid-cols-2 gap-3">
              {FEATURED_PLAYLISTS.slice(0, 4).map((pl) => (
                <PlaylistCard key={pl.id} playlist={pl} />
              ))}
            </div>
          </div>

          {/* Top Artists */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-[#f2f0ea]">Top Artists</h3>
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
              {TOP_ARTISTS.map((art) => (
                <div key={art.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/15 bg-[#12161a] group-hover:border-[#b9c6d8] transition-colors">
                    <img src={art.avatar} alt={art.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-medium text-[#f2f0ea] group-hover:text-[#b9c6d8]">
                    {art.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};
