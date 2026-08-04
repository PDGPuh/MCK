# MCK / HVL Dark-Soul Music App (HVL Player) Design Specification

**Date:** 2026-08-04  
**Status:** Approved  
**Author:** Antigravity AI  

---

## 1. Project Goal & Overview

Build a mobile-first, dark luxury, cinematic music app prototype named **HVL Player** inspired by MCK's HVL era.
The frontend prototype features 100% real audio playback using 30 local FLAC tracks from MCK's album, fully interactive screens matching reference mockups, responsive mobile-first shell (max-width 430px on desktop), local persistence, smooth motion transitions, and Tailwind CSS v4 styling.

---

## 2. Technology Stack & Dependencies

- **Framework:** React 18 + TypeScript (Vite)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first `@theme` design tokens)
- **Routing:** React Router DOM v6
- **Animation:** Motion for React (`motion/react`)
- **Icons:** Lucide React (`lucide-react`)
- **Utility:** `clsx`, `tailwind-merge`
- **State Management:** React Context API (`PlayerContext`) + `useReducer`
- **Audio Engine:** Native HTML5 `<audio>` API wrapped in custom hook (`useAudioPlayer`)
- **Persistence:** Browser `localStorage`

---

## 3. Directory & File Architecture

Project Location: `C:\Users\giaph\.gemini\antigravity-ide\scratch\mck-hvl-player`

```text
scratch/mck-hvl-player/
├── public/
│   ├── assets/                 # Copy of images from 02_MEDIA
│   └── audio/                  # 30 FLAC audio files from MCK HVL album
├── src/
│   ├── app/
│   │   ├── App.tsx             # Root mobile container shell (max 430px, glass, overlays)
│   │   └── router.tsx          # React Router setup
│   ├── components/
│   │   ├── app-shell/
│   │   │   ├── Header.tsx      # MCK Wordmark, MoodChip, Avatar, NotificationButton
│   │   │   ├── BottomNav.tsx   # Glass surface, 4 tab items (Home, Search, Library, More)
│   │   │   ├── GrainOverlay.tsx
│   │   │   └── VignetteOverlay.tsx
│   │   ├── player/
│   │   │   ├── MiniPlayer.tsx  # Persistent playback bar above nav
│   │   │   ├── PlayerArtwork.tsx
│   │   │   ├── PlayerControls.tsx
│   │   │   ├── PlayerTimeline.tsx
│   │   │   ├── InfoTile.tsx    # Lyrics, Up next, Output device cards
│   │   │   └── MoreBottomSheet.tsx
│   │   ├── tracks/
│   │   │   ├── TrackRow.tsx    # Reusable row component with playing equalizer & heart
│   │   │   ├── PlayingEqualizer.tsx
│   │   │   └── ExplicitBadge.tsx
│   │   ├── playlists/
│   │   │   ├── PlaylistCard.tsx
│   │   │   ├── CategoryChip.tsx
│   │   │   └── FeaturedBanner.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       └── Toast.tsx
│   ├── data/
│   │   └── music.ts            # 30 MCK tracks metadata + 6 Playlists + Top Artists
│   ├── hooks/
│   │   ├── useAudioPlayer.ts   # Audio engine logic
│   │   └── useLocalStorage.ts  # Safe persistence hook
│   ├── store/
│   │   └── playerContext.tsx   # Global player state provider & reducer
│   ├── styles/
│   │   └── index.css           # Tailwind v4 directives & @theme tokens
│   ├── types/
│   │   └── music.ts            # Track, Playlist, Artist interfaces
│   └── utils/
│       └── cn.ts               # Class merging utility
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 4. Design Tokens & Visual Specs

```css
@import "tailwindcss";

@theme {
  --color-bg: #050607;
  --color-bg-elevated: #090b0d;
  --color-surface: #0d1013;
  --color-surface-soft: #12161a;
  --color-text-primary: #f2f0ea;
  --color-text-secondary: #969aa0;
  --color-text-muted: #676d74;
  --color-border-soft: rgba(255, 255, 255, 0.13);
  --color-border-active: rgba(190, 202, 218, 0.55);
  --color-accent-silver: #b9c6d8;
  --color-accent-blue-gray: #6f7d91;
  --color-notification: #c8b79f;
}
```

- Border radius scale: Hero `22px`, Cards `16px`, Track rows `14px`, Pills `999px`.
- Overlays: Grain overlay (opacity 0.08, pointer-events-none), Vignette overlay (opacity 0.12, pointer-events-none).
- Motion: Standard cubic bezier `[0.22, 1, 0.36, 1]`, entrance transitions `180-240ms`, stagger `30ms`.

---

## 5. Screen Specifications

1. **Home (`/`)**:
   - Header with MCK wordmark, HVL mood chip, Avatar, Notification dot.
   - Hero banner featuring `hero_home_hvl.jpg` with dark gradient overlay, play & add actions.
   - "From HVL" track list rendering all 30 MCK FLAC tracks with animated playing equalizer when active.

2. **Now Playing (`/player/:id`)**:
   - Header bar with collapse button, NOW PLAYING title, overflow menu.
   - Large album artwork (22px radius, shadow, silver border) with shared element layoutId animation.
   - Track info, explicit badge, heart toggle button.
   - Drag-to-seek interactive range timeline slider with accurate formatted time (`M:SS`).
   - Play/Pause, Skip Next/Prev, Shuffle, Repeat controls.
   - Secondary info cards: Lyrics, Up Next track, Output audio device.

3. **Search (`/search`)**:
   - Search input field with clear button and real-time filtering across titles and artists.
   - Category chips (Rap, Dark Soul, Chill, Love, Live, Sad, Vietnamese).
   - Featured playlist banner (`hero_search_hvl_selection.jpg`).
   - Trending playlists grid & top artists list.

4. **Library (`/library`)**:
   - Collection hero banner (`library_collection_banner.jpg`).
   - Stats tiles (24 Playlists, 312 Liked Songs, 18 Downloads).
   - Playlist collection & recently played track history.

5. **Mini Player & Bottom Nav**:
   - Fixed glass navigation bar with active spring indicator.
   - Mini Player hovering right above nav when a track is active, tapping opens `/player/:id`.

6. **More Bottom Sheet**:
   - Accessible modal sheet sliding up when tapping "More" tab, dismissible by drag handle, backdrop click, or Escape key.

---

## 6. Acceptance Criteria

- App builds cleanly with Vite without any TypeScript or Tailwind v4 errors.
- 30 MCK FLAC tracks play seamlessly with real audio, seekable timeline, volume, and queue auto-advance.
- Responsive mobile container (max-w 430px) styled to match reference mockups.
- LocalStorage persists liked tracks, recent history, and player state.
