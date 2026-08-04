# MCK / HVL Dark-Soul Music App (HVL Player) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality, mobile-first React prototype for the MCK / HVL Dark-Soul Music App featuring 30 real FLAC audio tracks, pixel-matched UI to reference mockups, responsive mobile shell (max-w 430px), local persistence, and smooth Motion animations.

**Architecture:** React 18 + TypeScript + Vite with Tailwind CSS v4 (`@tailwindcss/vite`). Central HTML5 audio player engine managed by React Context + custom hooks with localStorage persistence. Responsive mobile-first container with fixed glass navigation, persistent mini player, and animated sheet modals.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, Motion for React (`motion/react`), React Router DOM v6, Lucide React (`lucide-react`), HTML5 Audio API.

---

### Task 1: Scaffold Project & Asset Setup

**Files:**
- Create: `C:\Users\giaph\.gemini\antigravity-ide\scratch\mck-hvl-player\package.json`
- Create: `C:\Users\giaph\.gemini\antigravity-ide\scratch\mck-hvl-player\vite.config.ts`
- Create: `C:\Users\giaph\.gemini\antigravity-ide\scratch\mck-hvl-player\tsconfig.json`
- Create: `C:\Users\giaph\.gemini\antigravity-ide\scratch\mck-hvl-player\index.html`
- Assets: Copy all files from `02_MEDIA` to `public/assets/` and 30 FLAC audio files to `public/audio/`

- [ ] **Step 1: Create project directory and copy starter files**
  Create `C:\Users\giaph\.gemini\antigravity-ide\scratch\mck-hvl-player` structure and copy starter files from `06_REACT_STARTER`.

- [ ] **Step 2: Copy image assets and audio files**
  Copy all images from `C:\Users\giaph\Downloads\MCK_HVL_Figma_Complete_Pack_v2\MCK_HVL_Figma_Complete_Pack_v2\02_MEDIA` into `public/assets/`.
  Copy all 30 `.flac` audio files from `C:\Users\giaph\Downloads\HVL-20260804T102814Z-1-001\HVL` into `public/audio/`.

- [ ] **Step 3: Install dependencies**
  Run `npm install` inside `scratch/mck-hvl-player`.

---

### Task 2: Setup Styles & Data Types

**Files:**
- Create: `src/styles/index.css`
- Create: `src/types/music.ts`
- Create: `src/utils/cn.ts`

- [ ] **Step 1: Configure Tailwind CSS v4 & theme tokens**
  Write `@import "tailwindcss";` and `@theme` definitions in `src/styles/index.css`.

- [ ] **Step 2: Create TypeScript interfaces**
  Define `Track`, `Playlist`, `Artist`, `PlayerState`, `RepeatMode` in `src/types/music.ts`.

- [ ] **Step 3: Create classnames helper**
  Implement `cn()` utility using `clsx` and `tailwind-merge` in `src/utils/cn.ts`.

---

### Task 3: Map 30 MCK Album Tracks & Mock Data

**Files:**
- Create: `src/data/music.ts`

- [ ] **Step 1: Map all 30 FLAC audio files into Track objects**
  Map 30 tracks (*Elegie, IDK, Wtf Bby I'm Lit, Anh Không Muốn Nó Dễ Dàng, Baby, Yêu Anh Giết Anh, Mắt Môi Tay Chân, Đao Của Anh Vừa, Là Gì Của Nhau, Night In Prague, Một Cái Ôm, Liệm, Nếu Như Ta Chẳng Còn, Ai Mới Là Kẻ Xấu Xa, Slippery, Intenpol, Tây Thi, Hút và Hút, Dưa Chua, Xa Xôi, Che Phủ, Oanh M = Thuoc, Ghet Xog Lai Thik, Nhìn Kẻ Thù Của Tao, Envy, Cảm Ơn, Không Cần Lo Cho Tao, Huh, Nguyễn Văn Mười, Thịt Lợn*) with explicit tags, audio paths (`/audio/01 - RPT MCK - Elegie.flac`, etc.), cover image paths, and durations.

- [ ] **Step 2: Define playlists and top artists**
  Add 6 Playlists (*HVL Essentials, Dark Soul, MCK Best Of, Blue Tequila, Dark Soul Nights, Midnight Drive*) and top artists.

---

### Task 4: Player Context & Local Storage Engine

**Files:**
- Create: `src/hooks/useLocalStorage.ts`
- Create: `src/store/playerContext.tsx`
- Create: `src/hooks/useAudioPlayer.ts`

- [ ] **Step 1: Create safe localStorage hook**
  Implement `useLocalStorage` with fallback defaults.

- [ ] **Step 2: Create PlayerContext & Reducer**
  Implement global player state management (current track, play/pause, volume, seek, toggle liked track, queue, next/prev, shuffle, repeat).

- [ ] **Step 3: Connect HTML5 Audio API via hook**
  Implement `useAudioPlayer` to sync HTML5 `<audio>` element with `PlayerContext` state (timeupdate, ended auto-advance, play, pause, seek).

---

### Task 5: App Shell & UI Overlays

**Files:**
- Create: `src/components/app-shell/GrainOverlay.tsx`
- Create: `src/components/app-shell/VignetteOverlay.tsx`
- Create: `src/components/app-shell/Header.tsx`
- Create: `src/components/app-shell/BottomNav.tsx`
- Create: `src/app/App.tsx`

- [ ] **Step 1: Build Grain and Vignette overlays**
  Create fixed overlays with pointer-events-none and soft opacity.

- [ ] **Step 2: Build Top Header**
  Create header with `MCK` wordmark, `HVL mood` chip, avatar, notification dot.

- [ ] **Step 3: Build Glass Bottom Navigation**
  Create glass nav bar with 4 tabs (Home, Search, Library, More) and Motion `layoutId` active indicator.

- [ ] **Step 4: Build App Shell Layout**
  Assemble responsive mobile shell container (max width 430px centered, dark luxury background).

---

### Task 6: Track & Playlist Components

**Files:**
- Create: `src/components/tracks/ExplicitBadge.tsx`
- Create: `src/components/tracks/PlayingEqualizer.tsx`
- Create: `src/components/tracks/TrackRow.tsx`
- Create: `src/components/playlists/CategoryChip.tsx`
- Create: `src/components/playlists/PlaylistCard.tsx`

- [ ] **Step 1: Build Explicit Badge and Equalizer animation**
  Create `E` badge and animated 3-bar silver equalizer.

- [ ] **Step 2: Build TrackRow component**
  Create reusable track item row with cover thumbnail, title, artist, explicit badge, play/pause trigger, heart toggle, and active state.

- [ ] **Step 3: Build PlaylistCard and CategoryChip**
  Create category filter chips and playlist cards.

---

### Task 7: Player Components & More Bottom Sheet

**Files:**
- Create: `src/components/player/MiniPlayer.tsx`
- Create: `src/components/player/PlayerArtwork.tsx`
- Create: `src/components/player/PlayerControls.tsx`
- Create: `src/components/player/PlayerTimeline.tsx`
- Create: `src/components/player/InfoTile.tsx`
- Create: `src/components/player/MoreBottomSheet.tsx`

- [ ] **Step 1: Build MiniPlayer component**
  Create floating mini player bar above nav with cover, title, progress indicator, play/pause toggle, and click to expand.

- [ ] **Step 2: Build Player Artwork & Controls**
  Create large artwork container, play/pause, skip, shuffle, repeat controls.

- [ ] **Step 3: Build Player Timeline Slider**
  Create interactive range slider for drag-to-seek playback timeline.

- [ ] **Step 4: Build More Bottom Sheet modal**
  Create accessible modal sheet with drag handle and backdrop blur.

---

### Task 8: Page Implementations & Routing

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/SearchPage.tsx`
- Create: `src/pages/LibraryPage.tsx`
- Create: `src/pages/NowPlayingPage.tsx`
- Create: `src/app/router.tsx`

- [ ] **Step 1: Build Home Page**
  Implement Hero section and "From HVL" 30-track listing.

- [ ] **Step 2: Build Search Page**
  Implement real-time search filtering across tracks/artists, category chips, featured banner.

- [ ] **Step 3: Build Library Page**
  Implement collection banner, stats tiles, playlists, recently played list.

- [ ] **Step 4: Build Now Playing Page**
  Implement full screen player with large artwork, timeline, controls, lyrics/up next tiles.

- [ ] **Step 5: Setup Router & Page Transitions**
  Connect routes with `AnimatePresence` smooth motion transitions.

---

### Task 9: Build, Verify & Run Project

- [ ] **Step 1: Run build verification**
  Execute `npm run build` and ensure 0 TypeScript or Vite build errors.

- [ ] **Step 2: Start dev server & verify audio playback**
  Run `npm run dev` and test full audio playback functionality.
