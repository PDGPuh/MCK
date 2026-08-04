import React, { useState } from "react";
import { Play, Heart, MoreVertical } from "lucide-react";
import { Track } from "../../types/music";
import { usePlayer } from "../../store/playerContext";
import { ExplicitBadge } from "./ExplicitBadge";
import { PlayingEqualizer } from "./PlayingEqualizer";
import { TrackContextMenu } from "./TrackContextMenu";
import { cn } from "../../utils/cn";

interface TrackRowProps {
  track: Track;
  index?: number;
  playlistContext?: Track[];
}

export const TrackRow: React.FC<TrackRowProps> = ({ track, playlistContext }) => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause, likedTrackIds, toggleLikeTrack } = usePlayer();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isCurrent = currentTrack?.id === track.id;
  const isLiked = likedTrackIds.includes(track.id);

  const handleRowClick = () => {
    if (isCurrent) {
      togglePlayPause();
    } else {
      playTrack(track, playlistContext);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikeTrack(track.id);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(true);
  };

  return (
    <>
      <div
        onClick={handleRowClick}
        className={cn(
          "group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.985]",
          isCurrent
            ? "bg-[#12161a] border border-[#b9c6d8]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            : "hover:bg-white/5 border border-transparent"
        )}
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 bg-[#0d1013]">
            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />

            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity",
                isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              )}
            >
              {isCurrent ? (
                isPlaying ? (
                  <PlayingEqualizer isPlaying={true} />
                ) : (
                  <Play className="w-5 h-5 text-[#f2f0ea] fill-current" />
                )
              ) : (
                <Play className="w-5 h-5 text-[#f2f0ea] fill-current" />
              )}
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h4
                className={cn(
                  "text-sm font-semibold truncate",
                  isCurrent ? "text-[#b9c6d8]" : "text-[#f2f0ea] group-hover:text-white"
                )}
              >
                {track.title}
              </h4>
              {track.explicit && <ExplicitBadge />}
            </div>
            <p className="text-xs text-[#969aa0] truncate mt-0.5">
              {track.artist} · {track.collection}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleLikeClick}
            aria-label={isLiked ? "Unlike" : "Like"}
            className="p-2 text-[#676d74] hover:text-[#f2f0ea] transition-colors"
          >
            <Heart
              className={cn("w-4 h-4 transition-transform active:scale-125", isLiked && "text-[#b9c6d8] fill-current")}
            />
          </button>

          <button
            onClick={handleMoreClick}
            aria-label="More options"
            className="p-2 text-[#676d74] hover:text-[#969aa0] transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Context Menu Modal */}
      <TrackContextMenu track={track} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
