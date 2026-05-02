// sw.js
const CACHE_NAME = 'hwi-archive-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './js/statCalculator.js',
  './Theaters/scon_1.js',
  './Theaters/yeonkang.js',
  './Theaters/yes24stage_3.js'
];

// 1. 서비스 워커 설치 및 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 2. 네트워크 요청 가로채기 (캐시에 있으면 캐시 반환, 없으면 인터넷 요청)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// 3. 오래된 캐시 지우기 (업데이트 시)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
