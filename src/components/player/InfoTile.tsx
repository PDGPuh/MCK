import React, { useState } from "react";
import { Music, Speaker, AlignLeft, ChevronRight } from "lucide-react";
import { Track } from "../../types/music";
import { LyricsModal } from "./LyricsModal";
import { OutputDeviceModal } from "./OutputDeviceModal";
import { usePlayer } from "../../store/playerContext";

interface InfoTileProps {
  type: "lyrics" | "upnext" | "output";
  nextTrack?: Track | null;
}

export const InfoTile: React.FC<InfoTileProps> = ({ type, nextTrack }) => {
  const [isLyricsOpen, setIsLyricsOpen] = useState(false);
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const { activeDeviceName } = usePlayer();

  if (type === "lyrics") {
    return (
      <>
        <div
          onClick={() => setIsLyricsOpen(true)}
          className="p-4 rounded-2xl bg-[#0d1013] border border-white/10 hover:border-white/20 transition-all flex flex-col gap-2 cursor-pointer group active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#b9c6d8] uppercase tracking-wider">
              <AlignLeft className="w-4 h-4" />
              <span>LYRICS PREVIEW</span>
            </div>
            <span className="text-[10px] font-bold text-[#b9c6d8] group-hover:underline flex items-center gap-0.5">
              FULL LYRICS <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-xs text-[#969aa0] leading-relaxed italic group-hover:text-[#f2f0ea] transition-colors">
            "Đêm dần trôi qua màn đêm mù tối..."
          </p>
        </div>

        <LyricsModal isOpen={isLyricsOpen} onClose={() => setIsLyricsOpen(false)} />
      </>
    );
  }

  if (type === "upnext") {
    return (
      <div className="p-4 rounded-2xl bg-[#0d1013] border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#12161a] border border-white/10">
            {nextTrack ? (
              <img src={nextTrack.cover} alt={nextTrack.title} className="w-full h-full object-cover" />
            ) : (
              <Music className="w-5 h-5 text-[#676d74] m-auto mt-2.5" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#b9c6d8] uppercase tracking-wider">UP NEXT</span>
            <span className="text-xs font-semibold text-[#f2f0ea] truncate max-w-[180px]">
              {nextTrack ? nextTrack.title : "No more tracks in queue"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => setIsOutputOpen(true)}
        className="p-4 rounded-2xl bg-[#0d1013] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between cursor-pointer active:scale-[0.99]"
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <Speaker className="w-4 h-4 text-[#b9c6d8] flex-shrink-0" />
          <span className="text-xs font-medium text-[#f2f0ea] truncate">
            {activeDeviceName || "System Audio Device"}
          </span>
        </div>
        <span className="text-[10px] uppercase font-bold text-[#969aa0] hover:text-[#b9c6d8] flex-shrink-0">
          SWITCH
        </span>
      </div>

      <OutputDeviceModal isOpen={isOutputOpen} onClose={() => setIsOutputOpen(false)} />
    </>
  );
};
