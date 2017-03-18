var app='[ServiceWorker] ';
var cacheName = 'v28';

var cacheFiles = [
    './0.app-9a2116bf391542a784d5.js',
    './1.app-9a2116bf391542a784d5.js',
    './2.app-9a2116bf391542a784d5.js',
    './3.app-9a2116bf391542a784d5.js',
    './4.app-9a2116bf391542a784d5.js',
    './9fc4031c3e96973f418ed77f0ff3b0f3.svg',
    './34fdc4136a7e7e129a6e1897b4c50ee1.ttf',
    './89889688147bd7575d6327160d64e760.svg',
    './ad579ff1278c3d4388d15fc27b40b67e.eot',
    './app-9a2116bf391542a784d5.js',
    './c068d37f3b072da2ecefcf5369f219ad.woff',
    './style-9a2116bf391542a784d5.css',
    './vendor-9a2116bf391542a784d5.js'
];

self.addEventListener('install', function(e){
    console.log(app+'Installed');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log(app+'Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log(app+'Activated');
    e.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName) {
                if(thisCacheName != cacheName){
                    console.log(app+'Removing cache files from ',thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e){
    console.log(app+'Fetching', e.request.url);

    e.respondWith(
        caches.match(e.request).then(function(response){
            if(response){
                console.log(app+'Found in cache ',e.request.url);
                return response;
            }
            return fetch(e.request);
        })
    );
});
