/* Offline cache for the AMCA CMAC Study app shell.
   Firebase/Firestore network calls are never cached (data must stay live). */
const CACHE = "amca-study-v4";
const ASSETS = ["./", "./index.html", "./seed-questions.js", "./manifest.json",
  "./icon.svg", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = e.request.url;
  // Never intercept Firebase / Google APIs — let them hit the network directly.
  if (/firestore|googleapis|gstatic|firebaseio|identitytoolkit|google\.com/.test(url)) return;
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(()=>{});
      return res;
    }).catch(() => caches.match("./index.html")))
  );
});
