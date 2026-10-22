const CACHE_NAME = 'retail-system-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // APIへの通信はキャッシュせず常に最新を取得
  if (event.request.url.includes('generativelanguage.googleapis.com')) return;
  
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});