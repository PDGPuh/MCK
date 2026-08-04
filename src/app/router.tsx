import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { LibraryPage } from "../pages/LibraryPage";
import { NowPlayingPage } from "../pages/NowPlayingPage";

export const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/player/:id" element={<NowPlayingPage />} />
      </Routes>
    </AnimatePresence>
  );
};
