var cacheName = 'weatherPWA-v4';
var filesToCache = [
    '/First-PWA/index.html',
    '/First-PWA/scripts/app.js',
    '/First-PWA/scripts/localforage.js',
    '/First-PWA/images/clear.png',
    '/First-PWA/images/cloudy-scattered-showers.png',
    '/First-PWA/images/cloudy.png',
    '/First-PWA/images/fog.png',
    '/First-PWA/images/ic_add_white_24px.svg',
    '/First-PWA/images/ic_refresh_white_24px.svg',
    '/First-PWA/images/partly-cloudy.png',
    '/First-PWA/images/rain.png',
    '/First-PWA/images/scattered-showers.png',
    '/First-PWA/images/sleet.png',
    '/First-PWA/images/snow.png',
    '/First-PWA/images/thunderstorm.png',
    '/First-PWA/images/wind.png'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    )
});
self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

