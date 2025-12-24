const CACHE="ninedigit-final-v2";

self.addEventListener("install",e=>{
  self.skipWaiting();
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k!==CACHE && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch",e=>{
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});
