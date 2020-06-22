const CACHE_NAME = "planets-v1";

let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/planets.html",
  "/pages/moons.html",
  "/pages/facts.html",
  "/css/materialize.min.css",
  "/css/main.css",
  "/js/materialize.min.js",
  "/js/main.js",
  "/assets/images/carousel-background.jpg",
  "/assets/images/earth.png",
  "/assets/images/earth-info.jpg",
  "/assets/images/earth-moon-info.jpg",
  "/assets/images/header-background.jpg",
  "/assets/images/jupiter.png",
  "/assets/images/jupiter-info.jpg",
  "/assets/images/jupiter-moon-info.jpg",
  "/assets/images/mars.png",
  "/assets/images/mars-info.jpg",
  "/assets/images/mars-moon-info.jpg",
  "/assets/images/mercury.png",
  "/assets/images/mercury-info.jpg",
  "/assets/images/moons-background.jpg",
  "/assets/images/neptune.png",
  "/assets/images/neptunus-info.jpg",
  "/assets/images/neptunus-moon-info.jpg",
  "/assets/images/planets-background.jpg",
  "/assets/images/saturn.png",
  "/assets/images/saturnus-info.jpg",
  "/assets/images/saturnus-moon-info.jpg",
  "/assets/images/uranus.png",
  "/assets/images/uranus-info.jpg",
  "/assets/images/uranus-moon-info.jpg",
  "/assets/images/venus.png",
  "/assets/images/venus-info.png",
  "/assets/images/pluto-moon-info.jpg",
  "/assets/icons/icon-72x72.png",
  "/assets/icons/icon-96x96.png",
  "/assets/icons/icon-128x128.png",
  "/assets/icons/icon-144x144.png",
  "/assets/icons/icon-152x152.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-384x384.png",
  "/assets/icons/icon-512x512.png",
  "/manifest.json"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("serviceworker: gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "serviceworker: memuat aset dari server: ",
          event.request.url
        );

        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cachesNames) {
      return Promise.all(
        cachesNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("serviceworker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
