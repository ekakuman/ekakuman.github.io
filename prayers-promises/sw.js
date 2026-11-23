var CACHE = "prayers-promises-v3";
var FILES = ["./", "index.html", "styles.css", "icon.svg", "icon-promises.svg", "icon-192.png", "icon-512.png", "manifest.webmanifest", "fonts/notoseriftelugu.woff2", "fonts/notosanstelugu.woff2", "data/categories.js", "data/forms.js", "data/daily.js", "data/family.js", "data/work.js", "data/health.js", "data/trials.js", "data/loss.js", "data/spiritual.js", "data/others.js", "data/milestones.js", "data/te/categories.js", "data/te/verses.js", "data/te/forms.js", "data/te/daily.js", "data/te/family.js", "data/te/work.js", "data/te/health.js", "data/te/trials.js", "data/te/loss.js", "data/te/spiritual.js", "data/te/others.js", "data/te/milestones.js", "data/pm/categories.js", "data/pm/foundation.js", "data/pm/daily.js", "data/pm/family.js", "data/pm/work.js", "data/pm/health.js", "data/pm/trials.js", "data/pm/loss.js", "data/pm/spiritual.js", "data/pm/others.js", "data/pm/milestones.js", "data/pm/verses.js", "app.js"];
self.addEventListener("install", function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); })); self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }));
  self.clients.claim();
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(function (r) {
    var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); return r;
  }).catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match("index.html"); }); }));
});
