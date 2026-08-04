import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, X, Sparkles, Disc, Radio } from "lucide-react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NOTIFICATIONS = [
  {
    id: 1,
    title: "MCK — HVL Full Album Released",
    desc: "30 official FLAC audio tracks are now available in your HVL Player archive.",
    time: "2 hours ago",
    icon: Disc,
  },
  {
    id: 2,
    title: "High-Res FLAC Lossless Audio Active",
    desc: "24-bit / 96kHz Lossless audio engine initialized with Web Audio API 5-Band Equalizer.",
    time: "5 hours ago",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "New Featured Playlist: HVL Selection",
    desc: "Curated dark soul & underground hip-hop selections are ready in Search.",
    time: "1 day ago",
    icon: Radio,
  },
];

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
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
                <Bell className="w-5 h-5 text-[#b9c6d8]" />
                <h3 className="text-lg font-bold text-[#f2f0ea]">Notifications & News</h3>
              </div>
              <button onClick={onClose} className="p-1.5 text-[#969aa0] hover:text-[#f2f0ea] rounded-full hover:bg-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {NOTIFICATIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#050607] border border-white/10 flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#12161a] text-[#b9c6d8] flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <h4 className="text-sm font-bold text-[#f2f0ea]">{item.title}</h4>
                      <p className="text-xs text-[#969aa0] leading-relaxed">{item.desc}</p>
                      <span className="text-[10px] text-[#676d74] mt-1">{item.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
