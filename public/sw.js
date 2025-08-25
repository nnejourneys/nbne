// Service Worker for caching R2 resources
const CACHE_NAME = 'r2-assets-cache-v1';
const R2_DOMAIN = 'pub-3d943afeed9643318d31712e02ebf613.r2.dev';

// Install event - pre-cache critical resources
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch event - cache R2 resources
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only cache R2 resources and images
  if (url.hostname === R2_DOMAIN || 
      event.request.url.includes('_next/image') ||
      /\.(jpg|jpeg|png|gif|svg|webp|avif|ico|woff|woff2|ttf|eot|mp4|webm)$/i.test(url.pathname)) {
    
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached version
            return cachedResponse;
          }
          
          // Fetch and cache
          return fetch(event.request).then((response) => {
            // Only cache successful responses
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        });
      })
    );
  }
});