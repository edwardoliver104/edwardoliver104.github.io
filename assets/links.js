/* Central redirect table.

   2026-07-23 — OZALYN OFFLINE (Jennie). Every Ozalyn destination is removed.
   ALL SIX GEOS NOW RUN OSANIX: uk #371, nl #335, se #334, de #372, da #373, fr #374
   (Jennie sent DE/DK/FR later the same day; all three hashes were checked back against
   the Everflow offer names and resolved live per geo to get-osanix.com).
   Ozem+ is kept as the second option everywhere.

   ⚠ TAG MEANING CHANGED 2026-07-23 for de/da/fr: `osanixde|da|fr` used to point at Ozem+
   and now points at OSANIX; Ozem+ moved to the `2` suffix. Reporting before that date
   reads the other way round. uk/nl/se were already Osanix on the plain tag.

   `pick` = the recommended destination and what a bare /go/ resolves to.
   Other destinations are reached with /go/?p=<key>; an unknown key falls back to pick.
   `org`  = organic sub1 tag. The pick keeps that geo's ORIGINAL tag so historical
   reporting still lines up; a second destination gets a `2` suffix so the two stay
   separable in one Everflow report.

   Never transcribe a hash by hand — read it back from the offer's tracking_url. */
window.OSANIX_LINKS = {
  uk: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/MD6Q28/", org: "osanixuk"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HLML44/", org: "osanixuk2" } },
  nl: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/KL6XJD/", org: "osanixnl"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JMS5JT/", org: "osanixnl2" } },
  se: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/KJS2RR/", org: "osanixse"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JLF8S8/", org: "osanixse2" } },
  de: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/MFKLQT/", org: "osanixde"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HQS89X/", org: "osanixde2" } },
  da: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/MGZHHG/", org: "osanixda"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HN2GSP/", org: "osanixda2" } },
  fr: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/MJCD83/", org: "osanixfr"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JHMHC2/", org: "osanixfr2" } }
};

/* ---------------------------------------------------------------------------
   REFERRER CONTROL — what the offer domain sees in its `Referer` header.

   Empty string = send NO referrer (current, and already enough to hide us).
   Set it to a redirector you own on a DIFFERENT domain and the offer will see
   THAT domain instead. A browser cannot fabricate a Referer — the header is
   always the URL of the document that started the navigation — so routing the
   click through a second origin is the only way to choose what it says.
   It must NOT be a domain connected to this site, or there is no point.

   The hop page is `tools/refhop.html` in this repo (gitignored — it is meant to
   be deployed elsewhere). Deploy it, then put its URL here, e.g.
     window.OSANIX_HOP = "https://neutral-domain.com/r.html";
   The hop takes ?u=<encoded offer url> and forwards with referrer-policy=origin,
   so the offer receives the hop's ORIGIN only, never its path or ours. */
window.OSANIX_HOP = "";
