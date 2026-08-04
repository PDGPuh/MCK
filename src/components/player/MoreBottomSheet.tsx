import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, Share2, X, Sliders, Moon, Shield, Check } from "lucide-react";
import { EqualizerModal } from "./EqualizerModal";
import { AboutModal } from "./AboutModal";
import { StorageModal } from "./StorageModal";
import { usePlayer } from "../../store/playerContext";

interface MoreBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MoreBottomSheet: React.FC<MoreBottomSheetProps> = ({ isOpen, onClose }) => {
  const [isEqOpen, setIsEqOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isStorageOpen, setIsStorageOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const { eqPreset, isEqEnabled } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: "RPT MCK — HVL Player",
        text: "Check out the RPT MCK HVL Dark Soul Music App with 30 Lossless FLAC tracks!",
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto bg-[#0d1013] border-t border-white/15 rounded-t-[28px] p-6 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]"
            >
              {/* Drag Handle */}
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />

              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#f2f0ea] tracking-wide">Options & Settings</h3>
                <button
                  onClick={onClose}
                  className="p-2 text-[#969aa0] hover:text-[#f2f0ea] transition-colors rounded-full hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    onClose();
                    setIsEqOpen(true);
                  }}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#12161a] hover:bg-white/10 text-[#f2f0ea] transition-colors text-sm font-medium active:scale-[0.98] border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    <Sliders className="w-5 h-5 text-[#b9c6d8]" />
                    <div className="flex flex-col items-start">
                      <span>Audio Equalizer & Quality</span>
                      <span className="text-[11px] text-[#969aa0]">
                        {isEqEnabled ? `Active · ${eqPreset}` : "Disabled"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#b9c6d8] bg-[#b9c6d8]/15 px-2 py-0.5 rounded">
                    FLAC
                  </span>
                </button>

                <button
                  onClick={handleShareApp}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#12161a] hover:bg-white/10 text-[#f2f0ea] transition-colors text-sm font-medium active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <Share2 className="w-5 h-5 text-[#b9c6d8]" />
                    <span>Share App with Friends</span>
                  </div>
                  {copiedShare && (
                    <span className="text-xs font-bold text-[#b9c6d8] flex items-center gap-1">
                      <Check className="w-4 h-4" /> Link Copied!
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setIsStorageOpen(true);
                  }}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-[#12161a] hover:bg-white/10 text-[#f2f0ea] transition-colors text-sm font-medium active:scale-[0.98]"
                >
                  <Shield className="w-5 h-5 text-[#b9c6d8]" />
                  <span>Privacy & Storage Settings</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setIsAboutOpen(true);
                  }}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-[#12161a] hover:bg-white/10 text-[#f2f0ea] transition-colors text-sm font-medium active:scale-[0.98]"
                >
                  <Info className="w-5 h-5 text-[#b9c6d8]" />
                  <span>About RPT MCK — HVL Player</span>
                </button>
              </div>

              <p className="text-center text-xs text-[#676d74] mt-6">
                HVL Player v1.0.0 · RPT MCK Official Archive
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <EqualizerModal isOpen={isEqOpen} onClose={() => setIsEqOpen(false)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <StorageModal isOpen={isStorageOpen} onClose={() => setIsStorageOpen(false)} />
    </>
  );
};
