/* Prayers of Scripture tab: list, filters, prayer page, patterns. Plugs into app.js through window.PP. */
(function () {
  "use strict";
  var D = window.SP || { sections: [], items: [] }, SECS = D.sections, ITEMS = D.items;
  var secById = {}, byId = {};
  SECS.forEach(function (s) { secById[s.id] = s; });
  ITEMS.forEach(function (p, i) { p.i = i; byId[p.id] = p; });

  var KINDS = ["intercession", "petition", "confession", "praise", "thanksgiving", "lament", "guidance", "blessing", "dedication"];
  var UI = {
    en: {
      tab: "In Scripture", title: "Prayers of Scripture", label: "Bible prayer",
      intro: function (n) { return n + " prayers recorded in the Bible, Genesis to Revelation: who prayed, why, and their words. Short gives the key line; Detailed gives the whole passage."; },
      search: "Search: Moses, forgive, Psalm 51, healing...", allBooks: "All books", allKinds: "All kinds",
      kinds: { intercession: "Intercession", petition: "Petition", confession: "Confession", praise: "Praise", thanksgiving: "Thanksgiving", lament: "Lament", guidance: "Guidance", blessing: "Blessing", dedication: "Dedication" },
      narrated: "Narrated: Scripture says this prayer was made but does not record its words.",
      narratedShort: "Narrated: words not recorded", whole: "The whole passage", tapDetailed: "Tap Detailed to read the whole passage",
      patterns: "Patterns, principles and practices", patternsLink: "Patterns, principles and practices &rarr;",
      none: "No prayers match. Try a simpler word such as <i>mercy</i>, <i>David</i> or <i>forgive</i>.",
      homeH: "Every prayer in the Bible", homeP: function (n) { return n + " prayers from Genesis to Revelation, with the full passage in KJV and Telugu."; },
      count: function (n) { return n + " prayer" + (n === 1 ? "" : "s"); }
    },
    te: {
      tab: "లేఖనములలో", title: "లేఖనములలోని ప్రార్థనలు", label: "బైబిలు ప్రార్థన",
      intro: function (n) { return "ఆదికాండము నుండి ప్రకటన వరకు బైబిలులో వ్రాయబడిన " + n + " ప్రార్థనలు: ఎవరు ప్రార్థించిరి, ఎందుకు, వారి మాటలు. సంక్షిప్తలో ముఖ్య వచనము; వివరముగాలో పూర్తి భాగము."; },
      search: "వెదకండి: మోషే, క్షమించు, కీర్తన 51, Moses...", allBooks: "అన్ని గ్రంథములు", allKinds: "అన్ని రకములు",
      kinds: { intercession: "విజ్ఞాపన", petition: "మనవి", confession: "ఒప్పుకోలు", praise: "స్తుతి", thanksgiving: "కృతజ్ఞత", lament: "విలాపము", guidance: "నడిపింపు", blessing: "ఆశీర్వాదము", dedication: "సమర్పణ" },
      narrated: "ఈ ప్రార్థన చేయబడినదని లేఖనము చెప్పుచున్నది గాని దాని మాటలు వ్రాయబడలేదు.",
      narratedShort: "మాటలు వ్రాయబడలేదు", whole: "పూర్తి భాగము", tapDetailed: "పూర్తి భాగము చదువుటకు వివరముగా నొక్కండి",
      patterns: "నమూనాలు, సూత్రములు, ఆచరణలు", patternsLink: "నమూనాలు, సూత్రములు, ఆచరణలు &rarr;",
      none: "సరిపోవు ప్రార్థనలు లేవు. <i>కృప</i>, <i>దావీదు</i>, <i>క్షమించు</i> వంటి సులభమైన పదమును ప్రయత్నించండి.",
      homeH: "బైబిలులోని ప్రతి ప్రార్థన", homeP: function (n) { return "ఆదికాండము నుండి ప్రకటన వరకు " + n + " ప్రార్థనలు, KJV మరియు తెలుగులో పూర్తి భాగముతో."; },
      count: function (n) { return n + " ప్రార్థనలు"; }
    }
  };
  var f = { sec: "all", kind: "all", q: "" };
  function favs() { try { return JSON.parse(localStorage.getItem("sp.favs") || "[]"); } catch (e) { return []; } }
  function setFavs(a) { try { localStorage.setItem("sp.favs", JSON.stringify(a)); } catch (e) {} }

  function P() { return window.PP; }
  function lang() { return P().uiLang(); }
  function U() { return UI[lang()]; }
  function esc(s) { return P().esc(s); }
  function secName(s) { return lang() === "te" ? s.te.name : s.name; }

  // key verse (the verse holding the key line) in each language
  function keyVerse(p) {
    var kv = p.kv || [0, 0], b = p.p[kv[0]], v = b.v[kv[1]];
    var te = v[2], lab = v[3] || String(v[0]);
    if (!te) { for (var j = kv[1] - 1; j >= 0; j--) { if (b.v[j][2]) { te = b.v[j][2]; lab = b.v[j][3]; break; } } }
    var ch = b.tr.replace(/:.*$/, ":");
    return { en: v[1], enRef: b.r.replace(/:.*$/, ":") + v[0], te: te, teRef: ch + lab };
  }
  function searchText(p) {
    if (p._s) return p._s;
    var s = secById[p.sec];
    p._s = [p.ref, p.who, p.occ, p.kind, UI.te.kinds[p.kind], p.key || "", s.name, s.te.name,
      p.p.map(function (b) { return b.r + " " + b.tr + " " + b.v.map(function (v) { return v[1] + " " + v[2]; }).join(" "); }).join(" ")].join(" ").toLowerCase();
    return p._s;
  }
  function match(q) {
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return ITEMS.filter(function (p) {
      if (f.sec !== "all" && p.sec !== f.sec) return false;
      if (f.kind !== "all" && p.kind !== f.kind) return false;
      var t = searchText(p);
      for (var i = 0; i < words.length; i++) if (t.indexOf(words[i]) < 0) return false;
      return true;
    });
  }

  function itemHTML(p, showSec) {
    var ui = U(), te = lang() === "te", k = keyVerse(p), star = favs().indexOf(p.id) >= 0 ? ' <span class="star" aria-label="saved">&#9733;</span>' : "";
    var line = p.key ? (te ? k.te : "“" + p.key + "”") : ui.narratedShort;
    var ref = te ? p.p[0].tr : p.ref;
    return '<li><a class="item" href="#/sp/' + p.id + '"><div class="cat"><span class="kind sp">' + ui.kinds[p.kind] + "</span>" + (showSec ? " " + esc(secName(secById[p.sec])) : "") + "</div>" +
      "<h3>" + esc(p.occ) + star + '</h3><div class="ref">' + esc(ref) + " &middot; " + esc(p.who) + '</div><p lang="' + (te && p.key ? "te" : "en") + '">' + esc(line) + "</p></a></li>";
  }

  // ---------- list ----------
  function viewList() {
    var ui = U(), pp = P();
    var chip = function (attr, val, on, label) { return '<button type="button" class="chip' + (on ? " on" : "") + '" data-sp-' + attr + '="' + val + '">' + esc(label) + "</button>"; };
    var h = '<nav class="crumbs"><a href="#/">' + pp.L().home + "</a> &rsaquo; " + ui.title + "</nav>" +
      '<div class="sec-head"><h2><img src="icon-scripture.svg" alt="" width="22" height="22"> ' + ui.title + " <span>" + ui.count(ITEMS.length) + "</span></h2></div>" +
      '<p class="page-sub">' + ui.intro(ITEMS.length) + "</p>" +
      '<div class="search"><input id="spq" type="search" placeholder="' + esc(ui.search) + '" autocomplete="off" value="' + esc(f.q) + '" aria-label="Search"></div>' +
      '<div class="chips sp-filter" role="group" aria-label="Books">' + chip("sec", "all", f.sec === "all", ui.allBooks) + SECS.map(function (s) { return chip("sec", s.id, f.sec === s.id, secName(s)); }).join("") + "</div>" +
      '<div class="chips sp-filter" role="group" aria-label="Kinds">' + chip("kind", "all", f.kind === "all", ui.allKinds) + KINDS.map(function (k) { return chip("kind", k, f.kind === k, ui.kinds[k]); }).join("") + "</div>" +
      '<div id="spres"></div><a class="companion" href="#/scripture/patterns"><img src="icon-scripture.svg" alt="" width="34" height="34"><div><b>' + ui.patterns + "</b><span>" + (lang() === "te" ? "అన్ని ప్రార్థనలలో కనిపించు నమూనాలు" : "What runs through all of them") + "</span></div></a>";
    pp.app.innerHTML = h;
    var input = document.getElementById("spq");
    input.addEventListener("input", function () { f.q = input.value; renderList(); });
    pp.app.querySelectorAll("[data-sp-sec]").forEach(function (b) { b.addEventListener("click", function () { f.sec = b.getAttribute("data-sp-sec"); viewList(); }); });
    pp.app.querySelectorAll("[data-sp-kind]").forEach(function (b) { b.addEventListener("click", function () { f.kind = b.getAttribute("data-sp-kind"); viewList(); }); });
    renderList();
  }
  function renderList() {
    var ui = U(), L = match(f.q), filtering = f.q || f.kind !== "all", h = "";
    if (filtering) h += '<div class="section-title">' + ui.count(L.length) + "</div>";
    if (!L.length) { document.getElementById("spres").innerHTML = '<p class="empty">' + ui.none + "</p>"; return; }
    SECS.forEach(function (s) {
      var g = L.filter(function (p) { return p.sec === s.id; }); if (!g.length) return;
      var t = lang() === "te" ? s.te : s;
      h += '<h2 class="sp-sec">' + esc(t.name) + ' <span>' + esc(t.sub) + " &middot; " + g.length + "</span></h2>" +
        (filtering ? "" : '<p class="page-sub sp-intro">' + esc(t.intro) + "</p>") + '<ul class="list">' + g.map(function (p) { return itemHTML(p, false); }).join("") + "</ul>";
    });
    document.getElementById("spres").innerHTML = h;
  }

  // ---------- one prayer ----------
  function passageHTML(p, l) {
    return p.p.map(function (b) {
      var vs = b.v.filter(function (v) { return l === "en" || v[2]; });
      return '<div class="passage" lang="' + l + '"><div class="more-h">' + esc(l === "te" ? b.tr : b.r) + " (" + (l === "te" ? "BSI" : "KJV") + ')</div><div class="text">' +
        vs.map(function (v) { return "<p><sup>" + esc(l === "te" ? v[3] : String(v[0])) + "</sup> " + esc(l === "te" ? v[2] : v[1]) + "</p>"; }).join("") + "</div></div>";
    }).join("");
  }
  function langBlock(p, l, showHead) {
    var ui = UI[l], k = keyVerse(p), mode = P().state.mode;
    var h = '<section class="lang-block" lang="' + l + '">' + (showHead ? '<div class="lang-tag">' + (l === "te" ? "తెలుగు" : "English") + "</div>" : "");
    if (p.key) {
      h += l === "te" ? '<blockquote class="verse key">' + esc(k.te) + "<cite>" + esc(k.teRef) + " (BSI)</cite></blockquote>"
                      : '<blockquote class="verse key">' + esc(p.key) + "<cite>" + esc(p.ref) + " (KJV)</cite></blockquote>";
    } else h += '<p class="note">' + ui.narrated + "</p>";
    if (mode === "detailed" || !p.key) h += passageHTML(p, l);
    else h += '<p class="note"><a href="#" data-sp-detailed="1">' + ui.tapDetailed + "</a> (" + esc(l === "te" ? p.p.map(function (b) { return b.tr; }).join("; ") : p.p.map(function (b) { return b.r; }).join("; ")) + ").</p>";
    return h + "</section>";
  }
  function plainText(p, l) {
    var k = keyVerse(p), out = p.occ + " | " + p.who + " | " + (l === "te" ? p.p[0].tr : p.ref) + "\n\n";
    if (p.key) out += "“" + (l === "te" ? k.te : p.key) + "”\n\n";
    if (P().state.mode === "detailed" || !p.key) out += p.p.map(function (b) { return (l === "te" ? b.tr : b.r) + "\n" + b.v.filter(function (v) { return l === "en" || v[2]; }).map(function (v) { return (l === "te" ? v[3] : v[0]) + " " + (l === "te" ? v[2] : v[1]); }).join(" "); }).join("\n\n") + "\n\n";
    return out + (l === "te" ? "BSI" : "KJV");
  }
  function viewItem(id) {
    var p = byId[id], pp = P(); if (!p) return viewList();
    var ui = U(), L = pp.L(), s = secById[p.sec], st = pp.state, isFav = favs().indexOf(p.id) >= 0;
    var both = st.lang === "both", main = lang();
    var body = both ? langBlock(p, "te", true) + '<hr class="sep">' + langBlock(p, "en", true) : langBlock(p, main, false);
    var prev = ITEMS[p.i - 1], next = ITEMS[p.i + 1];
    document.title = p.occ + " (" + p.ref + ") | " + L.siteTitle;
    pp.app.innerHTML = '<nav class="crumbs"><a href="#/">' + L.home + '</a> &rsaquo; <a href="#/scripture">' + ui.title + "</a> &rsaquo; " + esc(secName(s)) + "</nav>" +
      '<article class="prayer"><div class="prayer-head"><div><div class="badge"><span class="kind sp">' + ui.kinds[p.kind] + "</span> " + (st.mode === "short" ? L.shortP : L.detailedP) + "</div>" +
      '<h1 class="page-h" lang="en">' + esc(p.occ) + '</h1><div class="sp-meta"><b>' + esc(p.who) + "</b> &middot; " + esc(main === "te" ? p.p[0].tr : p.ref) + "</div></div></div>" + body +
      '<div class="actions"><button class="btn' + (isFav ? " on" : "") + '" id="aFav">' + (isFav ? "&#9733; " + L.savedBtn : "&#9734; " + L.save) + "</button>" +
      '<button class="btn" id="aCopy">' + L.copy + '</button><button class="btn" id="aShare">' + L.share + '</button><button class="btn" id="aPrint">' + L.print + "</button></div></article>" +
      '<div class="pager">' + (prev ? '<a href="#/sp/' + prev.id + '"><span>&larr; ' + L.prev + "</span><b>" + esc(prev.ref) + " &middot; " + esc(prev.who) + "</b></a>" : "<span></span>") +
      (next ? '<a class="next" href="#/sp/' + next.id + '"><span>' + L.next + " &rarr;</span><b>" + esc(next.ref) + " &middot; " + esc(next.who) + "</b></a>" : "<span></span>") + "</div>";
    var text = both ? plainText(p, "te") + "\n\n---\n\n" + plainText(p, "en") : plainText(p, main);
    pp.app.querySelectorAll("[data-sp-detailed]").forEach(function (a) { a.addEventListener("click", function (e) { e.preventDefault(); pp.setMode("detailed"); }); });
    document.getElementById("aFav").addEventListener("click", function () {
      var a = favs(), i = a.indexOf(p.id);
      if (i >= 0) { a.splice(i, 1); pp.toast(L.removed); } else { a.push(p.id); pp.toast(L.savedToast); }
      setFavs(a); viewItem(id);
    });
    document.getElementById("aCopy").addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { pp.toast(L.copied); }, function () { pp.fallbackCopy(text, L.copied); });
      else pp.fallbackCopy(text, L.copied);
    });
    document.getElementById("aShare").addEventListener("click", function () {
      if (navigator.share) navigator.share({ title: p.occ, text: text, url: location.href }).catch(function () {});
      else pp.fallbackCopy(text + "\n\n" + location.href, L.copiedLink);
    });
    document.getElementById("aPrint").addEventListener("click", function () { window.print(); });
  }

  // ---------- patterns ----------
  function viewPatterns() {
    var pp = P(), ui = U(), L = pp.L(), counts = {};
    ITEMS.forEach(function (p) { counts[p.kind] = (counts[p.kind] || 0) + 1; });
    var rows = [["Appeal to God's name and glory", "Moses (Ex 32:12), Joshua (Josh 7:9), Hezekiah (2 Kgs 19:19), Jeremiah (Jer 14:7), Daniel (Dan 9:19), Jesus (Jn 12:28)"],
      ["Pleading God's covenant promises", "Jacob (Gen 32:12), Moses (Ex 32:13), David (2 Sam 7:25), Solomon (1 Kgs 8:25), Nehemiah (Neh 1:8–9)"],
      ["Confession on behalf of the people", "Moses, Ezra 9, Nehemiah 1 and 9, Daniel 9: each says “we have sinned”"],
      ["Standing in the gap", "Abraham for Sodom, Moses for Israel, Samuel, Amos, Jesus (Jn 17; Lk 23:34), Stephen"],
      ["Honest lament", "Moses (Num 11), Elijah, Job, Jeremiah, Habakkuk, the psalmists, Jesus on the cross"],
      ["Seeking guidance before acting", "David (“Shall I go up?”), the apostles (Acts 1:24), Antioch (Acts 13:2)"],
      ["Prayer before turning points", "Jesus at his baptism, choosing the Twelve, the transfiguration, Gethsemane"],
      ["From petition to worship", "Hannah's request becomes her song; the canon ends in Revelation's hymns"],
      ["Spiritual over material requests", "Solomon asks for wisdom; Paul prays for knowledge, love and strength"]];
    pp.app.innerHTML = '<nav class="crumbs"><a href="#/">' + L.home + '</a> &rsaquo; <a href="#/scripture">' + ui.title + "</a> &rsaquo; " + ui.patterns + "</nav>" +
      '<article class="prayer sp-study" lang="en"><h1 class="page-h">Patterns, principles and practices</h1>' + (lang() === "te" ? '<p class="note">ఈ పుట ప్రస్తుతము ఇంగ్లీషులో మాత్రమే ఉన్నది.</p>' : "") +
      '<div class="text"><p>Across the canon, the prayers God answers stand on his name, his promises and his purposes, not on the worthiness of the one praying.</p></div>' +
      '<div class="more-h">Patterns</div><ul class="list">' + rows.map(function (r) { return '<li class="item"><h3>' + esc(r[0]) + "</h3><p style=\"-webkit-line-clamp:unset\">" + esc(r[1]) + "</p></li>"; }).join("") + "</ul>" +
      '<div class="more-h" style="margin-top:1.25rem">Principles</div><div class="text"><ol>' +
      "<li>God has planned to work through prayer: the intercessor is part of how he carries out his purposes (Ezek 22:30; Jas 5:16).</li>" +
      "<li>Prayer is aligned with God's will, not set against it: “not as I will, but as thou wilt” (Mt 26:39; 1 Jn 5:14).</li>" +
      "<li>Humility and repentance open the way: “If my people… shall humble themselves, and pray” (2 Chr 7:14).</li>" +
      "<li>Access comes through a mediator: Moses and Aaron point to Christ, who “ever liveth to make intercession” (Heb 7:25).</li>" +
      "<li>God welcomes honesty: complaint brought to him is still faith.</li>" +
      "<li>Unanswered or delayed prayer is not unheard: Moses (Deut 3:26), Paul's thorn (2 Cor 12:9), the martyrs' “How long” (Rev 6:10).</li></ol></div>" +
      '<div class="more-h">Practices</div><div class="text"><ul>' +
      "<li>Pray Scripture back to God: his name, his promises, his stated purposes.</li>" +
      "<li>Keep set times, like Daniel's three times a day (Dan 6:10), and pray short prayers in the moment, like Nehemiah (Neh 2:4).</li>" +
      "<li>Confess as “we,” not only “I,” for family, church and nation.</li>" +
      "<li>Keep a list of people to pray for by name, as Paul did.</li>" +
      "<li>Use the Lord's Prayer as an outline: worship, kingdom, provision, forgiveness, protection.</li>" +
      "<li>Pray before major decisions, with fasting where fitting (Acts 13:2–3; Ezra 8:21).</li>" +
      "<li>Finish petitions with thanksgiving and praise (Phil 4:6).</li></ul></div>" +
      '<div class="more-h">Kinds of prayer in this collection</div><div class="chips">' + KINDS.map(function (k) { return '<a class="chip" href="#/scripture" data-sp-k="' + k + '">' + UI.en.kinds[k] + " &middot; " + (counts[k] || 0) + "</a>"; }).join("") + "</div></article>";
    pp.app.querySelectorAll("[data-sp-k]").forEach(function (a) { a.addEventListener("click", function () { f.kind = a.getAttribute("data-sp-k"); f.sec = "all"; f.q = ""; }); });
  }

  // ---------- hooks used by app.js ----------
  window.SPV = {
    count: ITEMS.length,
    tab: function () { return U().tab; },
    route: function (parts) {
      if (parts[0] === "sp" && parts[1]) return viewItem(parts[1]);
      if (parts[1] === "patterns") return viewPatterns();
      return viewList();
    },
    searchHits: function (q) {
      var save = { sec: f.sec, kind: f.kind }; f.sec = "all"; f.kind = "all";
      var r = match(q); f.sec = save.sec; f.kind = save.kind; return r.map(function (p) { return itemHTML(p, true); });
    },
    savedHTML: function () {
      var list = favs().map(function (id) { return byId[id]; }).filter(Boolean);
      if (!list.length) return "";
      return '<div class="sec-head"><h2><img src="icon-scripture.svg" alt="" width="22" height="22"> ' + U().title + " <span>" + U().count(list.length) + '</span></h2></div><ul class="list">' + list.map(function (p) { return itemHTML(p, true); }).join("") + "</ul>";
    },
    homeHTML: function () {
      var ui = U();
      return '<div class="sec-head"><h2><img src="icon-scripture.svg" alt="" width="22" height="22"> ' + ui.title + " <span>" + ui.count(ITEMS.length) + '</span></h2><a href="#/scripture">' + P().L().seeAll + " &rarr;</a></div>" +
        '<a class="feature sp-feature" href="#/scripture"><div class="k">' + ui.title + "</div><h2>" + ui.homeH + "</h2><p>" + ui.homeP(ITEMS.length) + "</p></a>";
    }
  };
})();
