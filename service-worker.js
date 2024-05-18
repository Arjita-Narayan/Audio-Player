const CACHE_NAME = "music-player-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/media/468-thumbnail.png",
  "/media/audio.mp3",
  "/fontawesome-free-6.5.2-web/css/all.min.css",
  "/fontawesome-free-6.5.2-web/webfonts/fa-solid-900.woff2",
  "/fontawesome-free-6.5.2-web/webfonts/fa-solid-900.woff",
  "/fontawesome-free-6.5.2-web/webfonts/fa-solid-900.ttf",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request).catch(function (error) {
        console.error("Fetching failed:", error);
        return new Response("Network error occurred", {
          status: 408,
          statusText: "Network error",
        });
      });
    })
  );
});
