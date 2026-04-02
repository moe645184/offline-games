const CACHE = 'gamehub-v4';

// 新增遊戲時，把新遊戲的路徑加到這裡
const FILES = [
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './games/bubble/index.html',
  './games/bubble/manifest.json',
  './games/bubble/icon-192.png',
  './games/bubble/icon-512.png',
  './games/memory/index.html',
  './games/memory/manifest.json',
  './games/memory/icon-192.png',
  './games/memory/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
