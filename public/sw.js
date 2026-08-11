// Service worker for PWA background audio execution context on iOS Safari
const CACHE_NAME = 'mck-hvl-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let network handle audio requests directly
  if (event.request.url.includes('/audio/')) {
    return;
  }
});
