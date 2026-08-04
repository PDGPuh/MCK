import React from "react";
import { Playlist } from "../../types/music";
import { Play } from "lucide-react";

interface PlaylistCardProps {
  playlist: Playlist;
  onClick?: () => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col p-3 rounded-2xl bg-[#0d1013] border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer active:scale-95 shadow-lg"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#12161a] mb-3">
        <img
          src={playlist.cover}
          alt={playlist.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#b9c6d8] text-[#050607] flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      <h4 className="text-sm font-semibold text-[#f2f0ea] truncate group-hover:text-white">
        {playlist.title}
      </h4>
      <p className="text-xs text-[#969aa0] truncate mt-1">
        {playlist.trackCount ? `${playlist.trackCount} tracks` : playlist.followers ? `${playlist.followers} followers` : "Playlist"}
      </p>
    </div>
  );
};
