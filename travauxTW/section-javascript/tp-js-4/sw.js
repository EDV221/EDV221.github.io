const cacheName = 'tpJsSw';

let cors_url = 'https://cors-anywhere.herokuapp.com/';
let urlEDT = 'https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/9EYlGR3a.shu';


let cacheResources = [
    '/travauxTW/section-javascript/tp-js-4/',
    '/travauxTW/section-javascript/tp-js-4/app.js',
    cors_url + urlEDT
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(cacheResources);
        })
    );
});

this.addEventListener("fetch", (event) => {
    console.log('fetched');
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
