(function () {
  "use strict";
  var app = document.getElementById("app");

  // ---------- UI strings ----------
  var UI = {
    en: {
      brand: 'Prayers &amp; Promises', prayers: "Prayers", promises: "Promises",
      short: "Short", detailed: "Detailed", both: "Both", textsize: "Text size", theme: "Theme", light: "Light", dark: "Dark", auto: "Auto",
      foot1: "Scripture quotations from the King James Version and the Telugu Bible (BSI), both public domain.",
      foot2: "\"Pray without ceasing.\" 1 Thessalonians 5:17",
      heroH: "Prayers and promises for every occasion of life",
      heroP: function (a, b) { return a + " prayers and " + b + " promises from Scripture, each in a short and a detailed version, in English and Telugu. Pray, then stand on what God has said."; },
      search: "Search prayers and promises: healing, travel, fear, children...",
      today: "Promise for today", begin: "Begin here", featH: "Worship: the highest form of prayer",
      featP: "Before we ask for anything, we give God the glory due to His name.",
      seeAll: "See all", home: "Home", searchH: "Search", searchPr: "Search prayers...", searchPm: "Search promises...",
      prIntro: "Prayers grounded in Scripture for every season of life, beginning with worship. Choose Short for a quick prayer or Detailed for a longer time with the Lord.",
      pmIntro: "God's promises for every occasion, each with its key verse. Short gives one promise to hold on to; Detailed adds more verses and a meditation to stand on.",
      results: function (n) { return n + " result" + (n > 1 ? "s" : ""); },
      none: function (q) { return 'Nothing matches "' + q + '". Try a simpler word such as <i>peace</i>, <i>work</i> or <i>child</i>.'; },
      saved: "Saved", savedH: "Saved", savedSub: "Saved on this device only.",
      savedNone: "Nothing saved yet. Tap <b>&#9734; Save</b> on any prayer or promise to keep it here.",
      prayer: "Prayer", promise: "Promise", shortP: "Short", detailedP: "Detailed",
      more: "More promises to stand on", pray: "Pray about this &rarr;", standOn: "Promises to stand on",
      save: "Save", savedBtn: "Saved", copy: "Copy", share: "Share", print: "Print",
      prev: "Previous", next: "Next", copied: "Copied", copiedLink: "Copied with link", removed: "Removed from saved", savedToast: "Saved on this device",
      nPrayers: function (n) { return n + " prayers"; }, nPromises: function (n) { return n + " promises"; },
      siteTitle: "Prayers & Promises for Every Occasion"
    },
    te: {
      brand: 'ప్రార్థనలు &amp; వాగ్దానములు', prayers: "ప్రార్థనలు", promises: "వాగ్దానములు",
      short: "సంక్షిప్త", detailed: "వివరముగా", both: "రెండూ", textsize: "అక్షర పరిమాణము", theme: "రంగు", light: "లేత", dark: "ముదురు", auto: "స్వయంచాలక",
      foot1: "లేఖన వాక్యములు: తెలుగు బైబిలు (BSI) మరియు కింగ్ జేమ్స్ వర్షన్ (పబ్లిక్ డొమైన్).",
      foot2: "\"యెడతెగక ప్రార్థనచేయుడి.\" 1 థెస్సలొనీకయులకు 5:17",
      heroH: "జీవితములోని ప్రతి సందర్భమునకు ప్రార్థనలు మరియు వాగ్దానములు",
      heroP: function (a, b) { return "లేఖనములనుండి " + a + " ప్రార్థనలు మరియు " + b + " వాగ్దానములు, ప్రతిదానికి సంక్షిప్త మరియు వివరమైన రూపము, తెలుగు మరియు ఇంగ్లీషులో. ప్రార్థించండి, తరువాత దేవుడు సెలవిచ్చినదానిపై నిలువండి."; },
      search: "ప్రార్థనలు, వాగ్దానములు వెదకండి: స్వస్థత, ప్రయాణము, భయము, పిల్లలు...",
      today: "ఈ దినపు వాగ్దానము", begin: "ఇక్కడ ఆరంభించండి", featH: "ఆరాధన: ప్రార్థనలో అత్యున్నత రూపము",
      featP: "మనము ఏదైనా అడుగకముందు, దేవుని నామమునకు తగిన మహిమను ఆయనకు చెల్లించుదము.",
      seeAll: "అన్నీ చూడండి", home: "ముఖపుట", searchH: "వెదకండి", searchPr: "ప్రార్థనలు వెదకండి...", searchPm: "వాగ్దానములు వెదకండి...",
      prIntro: "జీవితములోని ప్రతి కాలమునకు లేఖనములపై ఆధారపడిన ప్రార్థనలు, ఆరాధనతో ఆరంభించి. త్వరిత ప్రార్థనకు సంక్షిప్త, ప్రభువుతో ఎక్కువ సమయమునకు వివరముగా ఎంచుకొనండి.",
      pmIntro: "ప్రతి సందర్భమునకు దేవుని వాగ్దానములు, ప్రతిదానికి ముఖ్య వచనము. సంక్షిప్తలో పట్టుకొనుటకు ఒక వాగ్దానము; వివరముగాలో మరిన్ని వచనములు మరియు ధ్యానము.",
      results: function (n) { return n + " ఫలితములు"; },
      none: function (q) { return '"' + q + '" కు సరిపోవునవి లేవు. <i>సమాధానము</i>, <i>పని</i>, <i>పిల్లలు</i> వంటి సులభమైన పదమును ప్రయత్నించండి.'; },
      saved: "భద్రపరచినవి", savedH: "భద్రపరచినవి", savedSub: "ఈ పరికరములో మాత్రమే భద్రపరచబడినవి.",
      savedNone: "ఇంకను ఏదియు భద్రపరచలేదు. ఏ ప్రార్థనలోనైనా వాగ్దానములోనైనా <b>&#9734; భద్రపరచు</b> నొక్కండి.",
      prayer: "ప్రార్థన", promise: "వాగ్దానము", shortP: "సంక్షిప్త", detailedP: "వివరముగా",
      more: "ఆధారపడవలసిన మరిన్ని వాగ్దానములు", pray: "దీనినిగూర్చి ప్రార్థించండి &rarr;", standOn: "నిలువవలసిన వాగ్దానములు",
      save: "భద్రపరచు", savedBtn: "భద్రపరచబడినది", copy: "కాపీ", share: "పంపు", print: "ముద్రించు",
      prev: "వెనుకటి", next: "తరువాతి", copied: "కాపీ అయినది", copiedLink: "లింకుతో కాపీ అయినది", removed: "భద్రపరచిన వాటినుండి తీసివేయబడినది", savedToast: "ఈ పరికరములో భద్రపరచబడినది",
      nPrayers: function (n) { return n + " ప్రార్థనలు"; }, nPromises: function (n) { return n + " వాగ్దానములు"; },
      siteTitle: "ప్రార్థనలు & వాగ్దానములు"
    }
  };

  // ---------- storage ----------
  function load(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function loadSetting(name, d) { return load("pp." + name, load("pr." + name, load("pm." + name, d))); }
  var state = {
    mode: loadSetting("mode", "short"), lang: loadSetting("lang", "en"),
    size: loadSetting("size", 0), theme: loadSetting("theme", "auto"),
    favs: { pr: load("pr.favs", []), pm: load("pm.favs", []) }, q: ""
  };
  if (["en", "te", "both"].indexOf(state.lang) < 0) state.lang = "en";
  if (["short", "detailed"].indexOf(state.mode) < 0) state.mode = "short";
  function uiLang() { return state.lang === "en" ? "en" : "te"; }
  function L() { return UI[uiLang()]; }

  // ---------- collections ----------
  var TE = window.TE || {}, TE_V = window.TE_VERSES || {}, TE_C = window.TE_CATS || {}, V = window.VERSES || {};
  function index(arr) { var m = {}; arr.forEach(function (x) { m[x.id] = x; }); return m; }

  var PR = {
    key: "pr", items: window.PRAYERS || [], cats: window.CATEGORIES || [],
    view: function (p, lang) {
      var t = TE[p.id], v = TE_V[p.id];
      if (lang === "te" && t) return { title: t.t, short: t.s, detailed: t.d, lang: "te", verses: [{ text: v ? v.verse : p.verse, ref: v ? v.ref : p.ref, src: v ? "BSI" : "KJV" }] };
      return { title: p.title, short: p.short, detailed: p.detailed, lang: "en", verses: [{ text: p.verse, ref: p.ref, src: "KJV" }] };
    },
    titleEn: function (p) { return p.title; },
    catName: function (c) { return uiLang() === "te" && TE_C[c.id] ? TE_C[c.id].name : c.name; },
    catBlurb: function (c) { return uiLang() === "te" && TE_C[c.id] ? TE_C[c.id].blurb : c.blurb; },
    catIntro: function (c) { return uiLang() === "te" && TE_C[c.id] ? TE_C[c.id].intro : (c.intro || c.blurb); },
    searchText: function (p) {
      var t = TE[p.id] || {}, tv = TE_V[p.id] || {}, c = PR.catById[p.cat] || {}, tc = TE_C[p.cat] || {};
      return { title: p.title + " " + (t.t || ""), meta: (p.tags || "") + " " + c.name + " " + (tc.name || "") + " " + p.ref + " " + (tv.ref || ""),
        body: p.short + " " + p.detailed + " " + p.verse + " " + (t.s || "") + " " + (t.d || "") + " " + (tv.verse || "") };
    }
  };
  var PM = {
    key: "pm", items: window.PROMISES || [], cats: window.PM_CATEGORIES || [],
    view: function (p, lang) {
      var c = p[lang] || p.en, l = p[lang] ? lang : "en";
      return { title: c.t, short: c.s, detailed: c.d, lang: l, verses: p.refs.map(function (r) {
        var v = V[r] || {};
        return l === "te" && v.te ? { text: v.te, ref: v.tref || r, src: "BSI" } : { text: v.en || "", ref: r, src: "KJV" };
      }) };
    },
    titleEn: function (p) { return p.en.t; },
    catName: function (c) { return uiLang() === "te" && c.te ? c.te.name : c.name; },
    catBlurb: function (c) { return uiLang() === "te" && c.te ? c.te.blurb : c.blurb; },
    catIntro: function (c) { return uiLang() === "te" && c.te ? c.te.intro : c.intro; },
    searchText: function (p) {
      var c = PM.catById[p.cat] || { te: {} };
      return { title: p.en.t + " " + (p.te ? p.te.t : ""),
        meta: (p.tags || "") + " " + c.name + " " + ((c.te || {}).name || "") + " " + p.refs.join(" ") + " " + p.refs.map(function (r) { return (V[r] || {}).tref || ""; }).join(" "),
        body: p.en.s + " " + p.en.d + " " + (p.te ? p.te.s + " " + p.te.d : "") + " " + p.refs.map(function (r) { var v = V[r] || {}; return (v.en || "") + " " + (v.te || ""); }).join(" ") };
    }
  };
  [PR, PM].forEach(function (col) { col.byId = index(col.items); col.catById = index(col.cats); });
  var COLS = { pr: PR, pm: PM };

  // promises that go with each prayer (same occasion or "pray about this" link)
  var promisesFor = {};
  PM.items.forEach(function (m) {
    [m.pray, m.id].forEach(function (pid) {
      if (!PR.byId[pid]) return;
      var a = promisesFor[pid] || (promisesFor[pid] = []);
      if (a.indexOf(m) < 0) a.push(m);
    });
  });

  // ---------- helpers ----------
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function inline(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>"); }
  function paras(t) { return t.trim().split(/\n\s*\n/).map(function (p) { return "<p>" + inline(p.trim()).replace(/\n/g, "<br>") + "</p>"; }).join(""); }
  function plain(t) { return t.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").trim(); }
  function inCat(col, id) { return col.items.filter(function (p) { return p.cat === id; }); }
  function isFav(col, id) { return state.favs[col.key].indexOf(id) >= 0; }
  function primary(col, p) { return col.view(p, uiLang()); }
  function href(col, p) { return "#/" + col.key + "/" + p.id; }
  function toast(msg) {
    var t = document.getElementById("toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }
  function hl(text, q) {
    var safe = esc(text); if (!q) return safe;
    var re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
    return safe.replace(re, "<mark>$1</mark>");
  }
  function todayPromise() {
    var d = new Date(), start = new Date(d.getFullYear(), 0, 0);
    var day = Math.floor((d - start) / 86400000) + d.getFullYear() * 7;
    return PM.items[day % PM.items.length];
  }

  // ---------- settings ----------
  function applySettings() {
    var root = document.documentElement, ui = L();
    root.setAttribute("data-theme", state.theme);
    root.setAttribute("lang", uiLang());
    root.style.setProperty("--fs", (1.08 + state.size * 0.1).toFixed(2) + "rem");
    document.querySelectorAll("[data-i18n]").forEach(function (el) { var k = el.getAttribute("data-i18n"); if (typeof ui[k] === "string") el.textContent = ui[k]; });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = ui[el.getAttribute("data-i18n-html")]; });
    document.querySelectorAll("[data-mode]").forEach(function (b) { var on = b.dataset.mode === state.mode; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    document.querySelectorAll("[data-lang]").forEach(function (b) { var on = b.dataset.lang === state.lang; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    document.querySelectorAll("button[data-theme]").forEach(function (b) { b.classList.toggle("on", b.dataset.theme === state.theme); });
  }
  function setMode(m) { state.mode = m; save("pp.mode", m); applySettings(); route(true); }
  function setLang(l) { state.lang = l; save("pp.lang", l); applySettings(); route(true); }
  // delegated so buttons rendered inside pages work too
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-mode],[data-lang]") : null;
    if (!b) return;
    if (b.dataset.mode) setMode(b.dataset.mode); else setLang(b.dataset.lang);
  });
  document.getElementById("settingsBtn").addEventListener("click", function () { var s = document.getElementById("settings"); s.hidden = !s.hidden; });
  document.querySelectorAll("[data-size]").forEach(function (b) {
    b.addEventListener("click", function () { state.size = Math.max(-2, Math.min(5, state.size + Number(b.dataset.size))); save("pp.size", state.size); applySettings(); });
  });
  document.querySelectorAll("button[data-theme]").forEach(function (b) {
    b.addEventListener("click", function () { state.theme = b.dataset.theme; save("pp.theme", state.theme); applySettings(); });
  });
  document.getElementById("favBtn").addEventListener("click", function () { location.hash = "#/saved"; });

  // ---------- list pieces ----------
  function itemHTML(col, p, q, showCat) {
    var ui = L(), v = primary(col, p), en = col.titleEn(p);
    var sub = state.lang === "both" && v.lang === "te" ? '<div class="alt">' + esc(en) + "</div>" : "";
    var txt = col === PM && state.mode === "short" ? v.verses[0].text : plain(state.mode === "short" ? v.short : v.detailed).split(/\n\s*\n/)[0];
    var kind = showCat ? '<div class="cat"><span class="kind ' + col.key + '">' + (col === PR ? ui.prayer : ui.promise) + "</span>" + (col.catById[p.cat] ? " " + esc(col.catName(col.catById[p.cat])) : "") + "</div>" : "";
    return '<li><a class="item" href="' + href(col, p) + '" lang="' + v.lang + '">' + kind +
      "<h3>" + hl(v.title, q) + (isFav(col, p.id) ? ' <span class="star" aria-label="saved">&#9733;</span>' : "") + "</h3>" + sub +
      '<div class="ref">' + esc(v.verses[0].ref) + "</div><p>" + esc(txt) + "</p></a></li>";
  }
  function gridHTML(col) {
    var h = '<div class="grid">';
    col.cats.forEach(function (c) {
      var n = inCat(col, c.id).length; if (!n) return;
      h += '<a class="card" href="#/' + col.key + "/c/" + c.id + '"><div class="ico" aria-hidden="true">' + c.icon + "</div><div><h3>" + esc(col.catName(c)) + "</h3><p>" + esc(col.catBlurb(c)) + " &middot; " + n + "</p></div></a>";
    });
    return h + "</div>";
  }
  function sectionHead(col, link) {
    var ui = L(), name = col === PR ? ui.prayers : ui.promises, n = col === PR ? ui.nPrayers(col.items.length) : ui.nPromises(col.items.length);
    return '<div class="sec-head"><h2><img src="' + (col === PR ? "icon.svg" : "icon-promises.svg") + '" alt="" width="22" height="22"> ' + name + ' <span>' + n + "</span></h2>" +
      (link ? '<a href="#/' + (col === PR ? "prayers" : "promises") + '">' + ui.seeAll + " &rarr;</a>" : "") + "</div>";
  }

  // ---------- views ----------
  function viewHome() {
    var ui = L(), t = todayPromise(), tv = primary(PM, t), w = PR.byId.worship;
    var h = '<section class="hero"><h1>' + ui.heroH + "</h1><p>" + ui.heroP(PR.items.length, PM.items.length) + "</p></section>" +
      searchBox(ui.search) + '<div id="browse"><div class="features">';
    if (w) h += '<a class="feature" href="#/pr/worship"><div class="k">' + ui.begin + "</div><h2>" + ui.featH + "</h2><p>" + ui.featP + "</p></a>";
    if (t) h += '<a class="feature" href="#/pm/' + t.id + '" lang="' + tv.lang + '"><div class="k">' + ui.today + "</div><h2>" + esc(tv.title) + '</h2><div class="fv">' + esc(tv.verses[0].text) + '</div><div class="fr">' + esc(tv.verses[0].ref) + "</div></a>";
    h += "</div>" + sectionHead(PR, true) + gridHTML(PR) + sectionHead(PM, true) + gridHTML(PM) + "</div>";
    app.innerHTML = h;
    wireSearch(null, false);
  }

  function searchBox(ph) {
    return '<div class="search"><input id="q" type="search" placeholder="' + esc(ph) + '" autocomplete="off" value="' + esc(state.q) + '" aria-label="Search"></div><div id="results"></div>';
  }
  function wireSearch(only, focus) {
    var input = document.getElementById("q");
    input.addEventListener("input", function () { state.q = input.value; renderResults(only); });
    if (focus) setTimeout(function () { input.focus(); }, 30);
    renderResults(only);
  }
  function viewSearch() {
    var ui = L();
    app.innerHTML = '<nav class="crumbs"><a href="#/">' + ui.home + "</a> &rsaquo; " + ui.searchH + '</nav><h1 class="page-h">' + ui.searchH + "</h1>" + searchBox(ui.search) + '<div id="browse"></div>';
    wireSearch(null, true);
  }
  function renderResults(only) {
    var ui = L(), q = state.q.trim().toLowerCase();
    var res = document.getElementById("results"), browse = document.getElementById("browse");
    if (!q) { res.innerHTML = ""; if (browse) browse.hidden = false; return; }
    if (browse) browse.hidden = true;
    var words = q.split(/\s+/), scored = [];
    (only ? [only] : [PR, PM]).forEach(function (col) {
      col.items.forEach(function (p) {
        var st = col.searchText(p), title = st.title.toLowerCase(), meta = st.meta.toLowerCase(), body = st.body.toLowerCase(), s = 0;
        for (var i = 0; i < words.length; i++) {
          var w = words[i], hit = 0;
          if (title.indexOf(w) >= 0) hit += 10;
          if (meta.indexOf(w) >= 0) hit += 5;
          if (body.indexOf(w) >= 0) hit += 1;
          if (!hit) return; s += hit;
        }
        scored.push({ col: col, p: p, s: s });
      });
    });
    scored.sort(function (a, b) { return b.s - a.s; });
    res.innerHTML = scored.length
      ? '<div class="section-title">' + ui.results(scored.length) + '</div><ul class="list">' + scored.map(function (x) { return itemHTML(x.col, x.p, state.q.trim(), true); }).join("") + "</ul>"
      : '<p class="empty">' + ui.none(esc(state.q)) + "</p>";
  }

  function viewSection(col) {
    var ui = L();
    app.innerHTML = '<nav class="crumbs"><a href="#/">' + ui.home + "</a> &rsaquo; " + (col === PR ? ui.prayers : ui.promises) + "</nav>" +
      sectionHead(col, false) + '<p class="page-sub">' + (col === PR ? ui.prIntro : ui.pmIntro) + "</p>" +
      searchBox(col === PR ? ui.searchPr : ui.searchPm) + '<div id="browse">' + gridHTML(col) + "</div>";
    wireSearch(col, false);
  }

  function viewCat(col, id) {
    var c = col.catById[id], ui = L(); if (!c) return viewSection(col);
    app.innerHTML = '<nav class="crumbs"><a href="#/">' + ui.home + '</a> &rsaquo; <a href="#/' + (col === PR ? "prayers" : "promises") + '">' + (col === PR ? ui.prayers : ui.promises) + "</a> &rsaquo; " + esc(col.catName(c)) + "</nav>" +
      '<h1 class="page-h">' + c.icon + " " + esc(col.catName(c)) + '</h1><p class="page-sub">' + esc(col.catIntro(c)) + "</p>" +
      '<ul class="list">' + inCat(col, id).map(function (p) { return itemHTML(col, p, "", false); }).join("") + "</ul>";
  }

  function viewSaved() {
    var ui = L(), h = '<nav class="crumbs"><a href="#/">' + ui.home + "</a> &rsaquo; " + ui.saved + '</nav><h1 class="page-h">&#9733; ' + ui.savedH + "</h1>", any = false;
    [PR, PM].forEach(function (col) {
      var list = state.favs[col.key].map(function (id) { return col.byId[id]; }).filter(Boolean);
      if (!list.length) return; any = true;
      h += sectionHead(col, false) + '<ul class="list">' + list.map(function (p) { return itemHTML(col, p, "", true); }).join("") + "</ul>";
    });
    app.innerHTML = h + (any ? '<p class="page-sub" style="margin-top:1rem">' + ui.savedSub + "</p>" : '<p class="empty">' + ui.savedNone + "</p>");
  }

  function vq(v, cls) { return '<blockquote class="verse' + (cls ? " " + cls : "") + '">' + esc(v.text) + "<cite>" + esc(v.ref) + " (" + v.src + ")</cite></blockquote>"; }
  function block(col, v, showHead) {
    var h = '<section class="lang-block" lang="' + v.lang + '">' + (showHead ? '<div class="lang-tag">' + (v.lang === "te" ? "తెలుగు" : "English") + "</div>" : "");
    h += vq(v.verses[0], "key");
    if (state.mode === "short") return h + '<div class="text">' + paras(v.short) + "</div></section>";
    if (v.verses.length > 1) h += '<div class="more-h">' + UI[v.lang].more + '</div><div class="vlist">' + v.verses.slice(1).map(function (x) { return vq(x); }).join("") + "</div>";
    return h + '<div class="text">' + paras(v.detailed) + "</div></section>";
  }

  function viewItem(col, id) {
    var p = col.byId[id]; if (!p) return viewSection(col);
    var ui = L(), c = col.catById[p.cat], list = inCat(col, p.cat), i = list.indexOf(p);
    var prev = list[i - 1], next = list[i + 1];
    var en = col.view(p, "en"), te = col.view(p, "te"), main = primary(col, p);
    var bilingual = state.lang === "both" && te.lang === "te";
    var body = bilingual ? block(col, te, true) + '<hr class="sep">' + block(col, en, true) : block(col, main, false);
    var secName = col === PR ? ui.prayers : ui.promises;
    document.title = main.title + " | " + ui.siteTitle;

    var related = "";
    if (col === PM && PR.byId[p.pray]) {
      related = '<a class="btn pray" href="#/pr/' + p.pray + '">' + ui.pray + "</a>";
    }
    var standOn = "";
    if (col === PR && promisesFor[p.id]) {
      standOn = '<div class="related"><div class="more-h">' + ui.standOn + '</div><div class="chips">' +
        promisesFor[p.id].map(function (m) { return '<a class="chip" href="#/pm/' + m.id + '" lang="' + primary(PM, m).lang + '">' + esc(primary(PM, m).title) + "</a>"; }).join("") + "</div></div>";
    }

    app.innerHTML = '<nav class="crumbs"><a href="#/">' + ui.home + '</a> &rsaquo; <a href="#/' + (col === PR ? "prayers" : "promises") + '">' + secName + '</a> &rsaquo; <a href="#/' + col.key + "/c/" + c.id + '">' + esc(col.catName(c)) + "</a></nav>" +
      '<article class="prayer"><div class="prayer-head"><div><div class="badge"><span class="kind ' + col.key + '">' + (col === PR ? ui.prayer : ui.promise) + "</span> " + (state.mode === "short" ? ui.shortP : ui.detailedP) + "</div>" +
      '<h1 class="page-h" lang="' + main.lang + '">' + esc(main.title) + "</h1>" + (bilingual ? '<div class="alt">' + esc(col.titleEn(p)) + "</div>" : "") + "</div></div>" +
      body + standOn +
      '<div class="actions">' + related + '<button class="btn' + (isFav(col, p.id) ? " on" : "") + '" id="aFav">' + (isFav(col, p.id) ? "&#9733; " + ui.savedBtn : "&#9734; " + ui.save) + "</button>" +
      '<button class="btn" id="aCopy">' + ui.copy + '</button><button class="btn" id="aShare">' + ui.share + '</button><button class="btn" id="aPrint">' + ui.print + "</button></div></article>" +
      '<div class="pager">' + (prev ? '<a href="' + href(col, prev) + '"><span>&larr; ' + ui.prev + "</span><b>" + esc(primary(col, prev).title) + "</b></a>" : "<span></span>") +
      (next ? '<a class="next" href="' + href(col, next) + '"><span>' + ui.next + " &rarr;</span><b>" + esc(primary(col, next).title) + "</b></a>" : "<span></span>") + "</div>";

    function textOf(v) {
      var vs = state.mode === "short" ? v.verses.slice(0, 1) : v.verses;
      return v.title + "\n\n" + vs.map(function (x) { return "\"" + x.text + "\" (" + x.ref + ")"; }).join("\n\n") + "\n\n" + plain(state.mode === "short" ? v.short : v.detailed);
    }
    var shareText = bilingual ? textOf(te) + "\n\n---\n\n" + textOf(en) : textOf(main);
    document.getElementById("aFav").addEventListener("click", function () {
      var f = state.favs[col.key];
      if (isFav(col, p.id)) { state.favs[col.key] = f.filter(function (x) { return x !== p.id; }); toast(ui.removed); }
      else { f.push(p.id); toast(ui.savedToast); }
      save(col.key + ".favs", state.favs[col.key]); viewItem(col, id);
    });
    document.getElementById("aCopy").addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(shareText).then(function () { toast(ui.copied); }, function () { fallbackCopy(shareText, ui.copied); });
      else fallbackCopy(shareText, ui.copied);
    });
    document.getElementById("aShare").addEventListener("click", function () {
      if (navigator.share) navigator.share({ title: main.title, text: shareText, url: location.href }).catch(function () {});
      else fallbackCopy(shareText + "\n\n" + location.href, ui.copiedLink);
    });
    document.getElementById("aPrint").addEventListener("click", function () { window.print(); });
  }

  function fallbackCopy(t, msg) {
    var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast(msg); } catch (e) {}
    document.body.removeChild(ta);
  }

  // ---------- router ----------
  function route(keepScroll) {
    var parts = location.hash.replace(/^#\/?/, "").split("/"), y = window.scrollY, sec = "";
    document.title = L().siteTitle;
    var col = COLS[parts[0]];
    if (col) {
      sec = col.key;
      if (parts[1] === "c") viewCat(col, parts[2]);
      else if (parts[1]) viewItem(col, parts[1]);
      else viewSection(col);
    }
    else if (parts[0] === "prayers") { sec = "pr"; viewSection(PR); }
    else if (parts[0] === "promises") { sec = "pm"; viewSection(PM); }
    else if (parts[0] === "saved") viewSaved();
    else if (parts[0] === "search") { sec = "search"; viewSearch(); }
    // links from the old Prayers site (#/p/id, #/c/id)
    else if (parts[0] === "p") { location.replace("#/" + (PR.byId[parts[1]] ? "pr" : "pm") + "/" + parts[1]); return; }
    else if (parts[0] === "c") { location.replace("#/" + (PR.catById[parts[1]] ? "pr" : "pm") + "/c/" + parts[1]); return; }
    else viewHome();
    document.querySelectorAll("[data-sec]").forEach(function (a) { a.classList.toggle("on", a.dataset.sec === sec); });
    document.getElementById("searchBtn").classList.toggle("on", sec === "search");
    window.scrollTo(0, keepScroll === true ? y : 0);
  }
  window.addEventListener("hashchange", function () { route(false); });
  applySettings();
  route(false);

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }
})();
