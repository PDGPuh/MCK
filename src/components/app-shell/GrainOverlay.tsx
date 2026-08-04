import React from "react";

export const GrainOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-repeat bg-[length:128px_128px]"
      style={{
        backgroundImage: "url('/assets/texture_grain_overlay.png')",
      }}
      aria-hidden="true"
    />
  );
};
