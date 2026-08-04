import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, HardDrive, Trash2, Check } from "lucide-react";
import { usePlayer } from "../../store/playerContext";

interface StorageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorageModal: React.FC<StorageModalProps> = ({ isOpen, onClose }) => {
  const [cleared, setCleared] = useState(false);
  const { likedTrackIds, recentlyPlayedIds } = usePlayer();

  const handleClearCache = () => {
    try {
      localStorage.removeItem("hvl_player_settings");
      setCleared(true);
      setTimeout(() => setCleared(false), 2500);
    } catch (e) {
      console.warn("Clear cache failed", e);
    }
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

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-[#b9c6d8]" />
                <h3 className="text-lg font-bold text-[#f2f0ea]">Privacy & Storage</h3>
              </div>
              <button onClick={onClose} className="p-1.5 text-[#969aa0] hover:text-[#f2f0ea]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-[#050607] border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HardDrive className="w-5 h-5 text-[#b9c6d8]" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#f2f0ea]">Local Audio Cache</span>
                    <span className="text-[11px] text-[#969aa0]">30 FLAC Lossless tracks preloaded</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#b9c6d8]">~1.8 GB</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#050607] border border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#f2f0ea]">Saved Data</span>
                  <span className="text-[11px] text-[#969aa0]">{likedTrackIds.length} Liked Songs · {recentlyPlayedIds.length} History Items</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#b9c6d8]">Active</span>
              </div>
            </div>

            <button
              onClick={handleClearCache}
              className="w-full py-3 rounded-xl bg-[#12161a] hover:bg-white/10 text-xs font-bold text-red-400 hover:text-red-300 transition-colors border border-red-500/20 flex items-center justify-center gap-2"
            >
              {cleared ? <Check className="w-4 h-4 text-emerald-400" /> : <Trash2 className="w-4 h-4" />}
              <span>{cleared ? "Cache & Settings Reset!" : "Clear Local Storage Cache"}</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
