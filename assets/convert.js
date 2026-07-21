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
  else geo = "uk";

  var GO = { uk: "/go/", de: "/de/go/", da: "/da/go/", nl: "/nl/go/" }[geo];
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
          cta: "Se det aktuelle tilbud", g: "30 dages pengene-tilbage · officiel butik" }
  }[geo];

  var KEY = "osx_cta";
  function converted() {
    try { return sessionStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }
  function mark() { try { sessionStorage.setItem(KEY, "1"); } catch (e) {} }

  function block() {
    var d = document.createElement("div");
    d.className = "osx-rec";
    d.innerHTML =
      '<p class="osx-kick"></p>' +
      '<p class="osx-recb"></p>' +
      '<a class="osx-go" href="' + GO + '"></a>' +
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
    // stop the exit popup / sticky nagging someone who already went to the offer
    Array.prototype.forEach.call(
      document.querySelectorAll('a[href*="/go/"]'),
      function (a) { a.addEventListener("click", mark); }
    );
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
