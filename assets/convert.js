/* convert.js — ADDITIVE conversion elements for osanix.shop
   The site already has, on every page: a native #sticky-cta and the exit popup
   (popup.js: mouse-out, 20s timer, 60% scroll, re-fire on close, back-button).
   This file adds only the one CTA that was missing — inline recommendation blocks
   placed mid-content, so there is a call to action at the point a reader finishes a
   section rather than only in the hero and the sticky bar.

   It touches no titles, H1s, meta or prices — no ranking signal changes.
*/
(function () {
  "use strict";

  var geo = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
  if (geo.indexOf("nl") === 0) geo = "nl";
  else if (geo.indexOf("de") === 0) geo = "de";
  else if (geo.indexOf("da") === 0) geo = "da";
  else if (geo.indexOf("sv") === 0) geo = "se";   // Swedish lang tag "sv" -> /se/
  else if (geo.indexOf("fr") === 0) geo = "fr";
  else geo = "uk";

  var GO = { uk: "/go/", de: "/de/go/", da: "/da/go/", nl: "/nl/go/",
             se: "/se/go/", fr: "/fr/go/" }[geo];
  if (!GO) return;

  var T = {
    uk: { kick: "What we recommend",
          body: "We looked at the formula, the price and what the seller actually discloses. For the money, this is the option we rate highest right now.",
          cta: "See the current offer", g: "30-day money-back · official store" },
    nl: { kick: "Onze aanbeveling",
          body: "We keken naar de samenstelling, de prijs en wat de verkoper daadwerkelijk vermeldt. Voor dit geld is dit de optie die wij op dit moment het hoogst beoordelen.",
          cta: "Bekijk het actuele aanbod", g: "30 dagen geld-terug · officiële webshop" },
    de: { kick: "Unsere Empfehlung",
          body: "Wir haben Zusammensetzung, Preis und die Angaben des Anbieters geprüft. Für dieses Geld ist das die Option, die wir derzeit am höchsten bewerten.",
          cta: "Aktuelles Angebot ansehen", g: "30 Tage Geld-zurück · offizieller Shop" },
    da: { kick: "Vores anbefaling",
          body: "Vi har set på sammensætningen, prisen og hvad sælgeren rent faktisk oplyser. For pengene er dette den mulighed, vi vurderer højest lige nu.",
          cta: "Se det aktuelle tilbud", g: "30 dages pengene-tilbage · officiel butik" },
    se: { kick: "Vår rekommendation",
          body: "Vi har tittat på sammansättningen, priset och vad säljaren faktiskt uppger. För pengarna är detta det alternativ vi bedömer högst just nu.",
          cta: "Se det aktuella erbjudandet", g: "30 dagars pengarna-tillbaka · officiell butik" },
    fr: { kick: "Notre recommandation",
          body: "Nous avons examiné la composition, le prix et ce que le vendeur indique réellement. Pour ce budget, c'est l'option que nous jugeons la meilleure en ce moment.",
          cta: "Voir l'offre du moment", g: "satisfait ou remboursé 30 jours · boutique officielle" }
  }[geo];


  /* The reader's real choice is between the two products we can actually send them
     to — Ozalyn and Oz+ — so the card shows both, each clickable, with a tick on the
     one we rate highest in that market. `pick` and both destinations come from
     links.js; the offer hashes there were read back from the Everflow offer names. */
  /* Which products each geo can actually reach, and which we recommend.
     Mirrors links.js ON PURPOSE — links.js is loaded only by /go/, so affiliate URLs
     never reach a content page's DOM. This map carries no URLs, so masking stays intact.
     KEEP IN SYNC WITH links.js.
     2026-07-23: Ozalyn is gone (offline). Osanix now covers ALL SIX geos
     (uk #371, nl #335, se #334, de #372, da #373, fr #374), so every geo shows the
     full two-product chooser again with Osanix as the pick. */
  var OPTS = { uk:["osanix","ozplus"], nl:["osanix","ozplus"], se:["osanix","ozplus"],
               de:["osanix","ozplus"], da:["osanix","ozplus"], fr:["osanix","ozplus"] }[geo]
             || ["osanix","ozplus"];
  var PICK = OPTS[0];

  var PROD = {
    osanix: { name: "Osanix", img: "/assets/img/rec-osanix.webp",
              note: { uk:"Green tea, cayenne, ginger and L-carnitine, in a capsule.",
                      nl:"Groene thee, cayenne, gember en L-carnitine, in een capsule.",
                      de:"Grüntee, Cayenne, Ingwer und L-Carnitin, als Kapsel.",
                      da:"Grøn te, cayenne, ingefær og L-carnitin, som kapsel.",
                      se:"Grönt te, cayenne, ingefära och L-karnitin, som kapsel.",
                      fr:"Thé vert, cayenne, gingembre et L-carnitine, en gélule." }[geo] },
    ozplus: { name: "Oz+", img: "/assets/img/rec-ozplus.webp",
              note: { uk:"Seven-component duo capsule, 312 mg daily dose.",
                      nl:"Duo-capsule met zeven componenten, 312 mg dagdosis.",
                      de:"Duo-Kapsel mit sieben Komponenten, 312 mg Tagesdosis.",
                      da:"Duo-kapsel med syv komponenter, 312 mg daglig dosis.",
                      se:"Duokapsel med sju komponenter, 312 mg dagsdos.",
                      fr:"Gélule duo à sept composants, dose quotidienne de 312 mg." }[geo] }
  };

  var L = {
    uk:{ pick:"Our pick", alt:"Also good", head:"Which one should you pick?", one:"What we recommend" },
    nl:{ pick:"Onze keuze", alt:"Ook goed", head:"Welke moet u kiezen?", one:"Onze aanbeveling" },
    de:{ pick:"Unsere Wahl", alt:"Auch gut", head:"Welches sollten Sie wählen?", one:"Unsere Empfehlung" },
    da:{ pick:"Vores valg", alt:"Også god", head:"Hvilken skal du vælge?", one:"Vores anbefaling" },
    se:{ pick:"Vårt val", alt:"Också bra", head:"Vilken ska du välja?", one:"Vår rekommendation" },
    fr:{ pick:"Notre choix", alt:"Bon aussi", head:"Lequel choisir\u00a0?", one:"Notre recommandation" }
  }[geo];

  var KEY = "osx_cta";
  function converted() {
    try { return sessionStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }
  function mark() { try { sessionStorage.setItem(KEY, "1"); } catch (e) {} }

  function block() {
    function card(key) {
      var p = PROD[key], isPick = (key === PICK);
      return '<a class="osx-p' + (isPick ? ' osx-win' : '') + '" referrerpolicy="no-referrer" href="' + GO + '?p=' + key + '">' +
               '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" decoding="async">' +
               '<span class="lab">' + (isPick ? '<span class="tick" aria-hidden="true">\u2713</span> ' + L.pick : L.alt) + '</span>' +
               '<b>' + p.name + '</b>' +
               '<span class="osx-note">' + p.note + '</span>' +
             '</a>';
    }
    var one = OPTS.length === 1;
    var d = document.createElement("div");
    d.className = "osx-rec";
    d.innerHTML =
      '<p class="osx-kick"></p>' +
      '<p class="osx-head">' + (one ? L.one : L.head) + '</p>' +
      '<div class="osx-two' + (one ? ' osx-solo' : '') + '">' +
        OPTS.map(card).join("") +
      '</div>' +
      '<p class="osx-recb"></p>' +
      '<a class="osx-go" referrerpolicy="no-referrer" href="' + GO + '"></a>' +
      '<p class="osx-g"></p>';
    d.querySelector(".osx-kick").textContent = T.kick;
    d.querySelector(".osx-recb").textContent = T.body;
    var a = d.querySelector(".osx-go");
    a.textContent = T.cta;
    a.addEventListener("click", mark);
    d.querySelector(".osx-g").textContent = T.g;
    return d;
  }

  function init() {
    var main = document.querySelector("main") || document.body;
    var heads = main.querySelectorAll("h2");
    if (heads.length >= 2) {
      // after the 2nd section
      var h2 = heads[1];
      var sec2 = h2.closest("section") || h2.parentNode;
      if (sec2 && sec2.parentNode && !sec2.parentNode.querySelector(".osx-rec"))
        sec2.parentNode.insertBefore(block(), sec2.nextSibling);
      // and again near the end on long pages
      if (heads.length >= 6) {
        var hl = heads[heads.length - 2];
        var secL = hl.closest("section") || hl.parentNode;
        if (secL && secL.parentNode) secL.parentNode.insertBefore(block(), secL.nextSibling);
      }
    }
    // the exit popup is also a decision point — show the product they will land on
    var pi = document.querySelector("#exitpop img");
    if (pi) { pi.src = PROD[PICK].img; pi.removeAttribute("width"); pi.removeAttribute("height");
              pi.alt = PROD[PICK].name; pi.style.height = "150px"; pi.style.width = "auto";
              pi.style.objectFit = "contain"; }

    // stop the exit popup / sticky nagging someone who already went to the offer
    Array.prototype.forEach.call(
      document.querySelectorAll('a[href*="/go/"]'),
      function (a) { a.addEventListener("click", mark); }
    );
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* ---- design system v2: scroll reveal --------------------------------------
   The `js` class is what arms the CSS; without it .reveal stays fully visible,
   so a JS failure can never hide content from a reader or from Googlebot.
   Anything at or above the fold reveals immediately, and anything the reader
   has already scrolled past is revealed too — a jump-scroll or an #anchor
   landing must never leave a blank section behind. */
(function () {
  "use strict";
  var d = document, root = d.documentElement;
  root.className += (root.className ? " " : "") + "js";

  function arm() {
    var els = [].slice.call(d.querySelectorAll(".reveal"));
    if (!els.length) return;
    function showAll() { els.forEach(function (el) { el.classList.add("in"); }); }
    if (!("IntersectionObserver" in window)) { showAll(); return; }

    // reveal anything already in view or already scrolled past
    function sweep() {
      var vh = window.innerHeight || d.documentElement.clientHeight;
      els.forEach(function (el) {
        if (el.classList.contains("in")) return;
        var t = el.getBoundingClientRect().top;
        if (t < vh - 30) el.classList.add("in");
      });
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -30px 0px", threshold: 0 });
    els.forEach(function (el) { io.observe(el); });

    sweep();
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { sweep(); ticking = false; });
    }, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });
    // last-resort safety net: nothing stays hidden past 4s
    setTimeout(showAll, 4000);
  }
  if (d.readyState === "loading") d.addEventListener("DOMContentLoaded", arm);
  else arm();
})();
