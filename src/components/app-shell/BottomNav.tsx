import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Library, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  onOpenMore: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenMore }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/search", label: "Search", icon: Search },
    { path: "/library", label: "Library", icon: Library },
    { path: "more", label: "More", icon: MoreHorizontal, action: onOpenMore },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-[430px] mx-auto bg-[#0d1013]/90 backdrop-blur-xl border-t border-white/10 px-4 py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.path !== "more" && location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else if (item.path) {
                  navigate(item.path);
                }
              }}
              className={`relative flex flex-col items-center gap-1 py-1 px-4 text-xs font-medium transition-colors ${
                isActive ? "text-[#f2f0ea]" : "text-[#676d74] hover:text-[#969aa0]"
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? "-translate-y-0.5" : ""}`} />
              <span>{item.label}</span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#b9c6d8] rounded-full shadow-[0_0_8px_rgba(185,198,216,0.8)]"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
