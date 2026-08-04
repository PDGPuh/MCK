import React from "react";

export const VignetteOverlay: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-40 opacity-15 bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/texture_vignette_overlay.png')",
      }}
      aria-hidden="true"
    />
  );
};
