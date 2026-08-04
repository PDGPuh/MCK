import React, { useState } from "react";
import { Bell } from "lucide-react";
import { NotificationsModal } from "./NotificationsModal";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackdrop?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showBackdrop = true }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <>
      <header
        className={`sticky top-0 z-30 flex items-center justify-between px-5 py-4 transition-colors ${
          showBackdrop ? "bg-[#050607]/80 backdrop-blur-xl border-b border-white/10" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-widest text-[#f2f0ea] font-serif uppercase">
            MCK
          </h1>
          <span className="px-2.5 py-0.5 text-[11px] font-medium tracking-wider uppercase bg-[#12161a] text-[#b9c6d8] border border-white/10 rounded-full">
            HVL MOOD
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNotifOpen(true)}
            aria-label="Notifications"
            className="relative p-2 text-[#969aa0] hover:text-[#f2f0ea] transition-colors rounded-full hover:bg-white/5 active:scale-95"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c8b79f] rounded-full ring-2 ring-[#050607]" />
          </button>

          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-md">
            <img
              src="/assets/avatar_mck_placeholder.jpg"
              alt="MCK Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Notifications Drawer */}
      <NotificationsModal isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
