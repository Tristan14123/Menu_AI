self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('menu-ai-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/Menu_AI/index.html',
        '/Menu_AI/manifest.json',
        // Ajoute ici les autres fichiers à mettre en cache
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
