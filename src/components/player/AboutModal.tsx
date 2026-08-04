import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Info, Disc, Code, Heart } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
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
            className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto bg-[#0d1013] border-t border-white/15 rounded-t-[28px] p-6 pb-10 shadow-[0_-12px_50px_rgba(0,0,0,0.9)] text-center"
          >
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-5" />

            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/20 mx-auto mb-4 bg-[#050607] shadow-xl">
              <img src="/assets/avatar_mck_placeholder.jpg" alt="MCK" className="w-full h-full object-cover" />
            </div>

            <h3 className="text-xl font-bold text-[#f2f0ea] font-serif">RPT MCK — HVL Player</h3>
            <p className="text-xs text-[#b9c6d8] mt-1 font-semibold uppercase tracking-widest">
              DARK SOUL ERA ARCHIVE
            </p>

            <div className="my-6 p-4 rounded-2xl bg-[#050607] border border-white/10 flex flex-col gap-2 text-xs text-[#969aa0] leading-relaxed">
              <p>Official interactive music player prototype built with React 18, TypeScript, Tailwind CSS v4 & Web Audio API Equalizer.</p>
              <p className="text-[#f2f0ea] font-semibold">Features 30 Lossless FLAC audio tracks from the HVL album.</p>
            </div>

            <div className="flex items-center justify-around py-2 border-y border-white/10 text-xs text-[#969aa0] mb-6">
              <div><strong className="text-[#f2f0ea]">30</strong> Tracks</div>
              <div><strong className="text-[#f2f0ea]">24-bit</strong> Audio</div>
              <div><strong className="text-[#f2f0ea]">v1.0.0</strong> Version</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-[#b9c6d8] text-[#050607] text-xs font-bold active:scale-95 transition-transform"
            >
              Close Info
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
