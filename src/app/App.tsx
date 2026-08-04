import React, { useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { PlayerProvider } from "../store/playerContext";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { Header } from "../components/app-shell/Header";
import { BottomNav } from "../components/app-shell/BottomNav";
import { MiniPlayer } from "../components/player/MiniPlayer";
import { MoreBottomSheet } from "../components/player/MoreBottomSheet";
import { GrainOverlay } from "../components/app-shell/GrainOverlay";
import { VignetteOverlay } from "../components/app-shell/VignetteOverlay";
import { AppRouter } from "./router";

const AppContent: React.FC = () => {
  useAudioPlayer(); // Activate HTML5 audio element lifecycle
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isPlayerScreen = location.pathname.startsWith("/player/");

  return (
    <div className="relative min-h-dvh max-w-[430px] mx-auto bg-[#050607] text-[#f2f0ea] shadow-[0_0_80px_rgba(0,0,0,0.9)] overflow-hidden border-x border-white/5">
      {/* Texture Overlays */}
      <GrainOverlay />
      <VignetteOverlay />

      {/* Header (Hidden on Full Player Screen) */}
      {!isPlayerScreen && <Header />}

      {/* Main Routed Page Content */}
      <main className="relative z-10">
        <AppRouter />
      </main>

      {/* Persistent Mini Player & Navigation (Hidden on Full Player Screen) */}
      {!isPlayerScreen && (
        <>
          <MiniPlayer />
          <BottomNav onOpenMore={() => setIsMoreOpen(true)} />
        </>
      )}

      {/* More Options Modal Bottom Sheet */}
      <MoreBottomSheet isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </PlayerProvider>
  );
};

export default App;
