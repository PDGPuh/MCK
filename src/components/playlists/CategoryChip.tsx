import React from "react";
import { cn } from "../../utils/cn";

interface CategoryChipProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({ label, isSelected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-150 active:scale-95 border",
        isSelected
          ? "bg-[#b9c6d8] text-[#050607] border-[#b9c6d8] font-semibold shadow-[0_0_12px_rgba(185,198,216,0.3)]"
          : "bg-[#12161a] text-[#969aa0] hover:text-[#f2f0ea] border-white/10 hover:border-white/20"
      )}
    >
      {label}
    </button>
  );
};
