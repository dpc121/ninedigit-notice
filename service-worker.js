// 🔄 CACHE VERSION (sirf yeh badalte rehna)
const CACHE_NAME = 'ninedigit-cache-v3';

const FILES = [
  './',
  './index.html',
  './manifest.json'
];

// 📦 INSTALL
self.addEventListener('install', event => {
  self.skipWaiting(); // 🔥 auto activate
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES);
    })
  );
});

// ♻ ACTIVATE (old cache delete)
self.addEventListener('activate', event => {
  self.clients.claim(); // 🔥 control immediately
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 🌐 FETCH
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
