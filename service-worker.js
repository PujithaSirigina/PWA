const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/manifest.json',
    '/images/Product-1.jpg',
    '/images/Product-2.jpg',
    '/images/Product-3.jpg',
    '/images/background.jpg'
];

// Install Service Worker and Cache Files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Caching Files');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Cached Files for Offline Support
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
self.addEventListener('push', event => {
    const options = {
        body: 'New products available!',
        icon: '/images/icon.png'
    };
    event.waitUntil(
        self.registration.showNotification('PWA Shop', options)
    );
});
