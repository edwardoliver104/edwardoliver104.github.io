/* Central redirect table.

   2026-07-23 — OZALYN GOES OFFLINE (Jennie). Every Ozalyn destination is removed.
   Switched back to OSANIX wherever an Osanix offer exists. It only exists in three
   geos — UK #362, NL&BE #335, SE #334 — verified against the Everflow offer names,
   so DE / DK / FR have no Osanix option and run Ozem+ alone. DK moved off Ozalyn.

   `pick` = the recommended destination and what a bare /go/ resolves to.
   Other destinations are reached with /go/?p=<key>; an unknown key falls back to pick.
   `org`  = organic sub1 tag. The pick keeps that geo's ORIGINAL tag so historical
   reporting still lines up; a second destination gets a `2` suffix so the two stay
   separable in one Everflow report.

   Never transcribe a hash by hand — read it back from the offer's tracking_url. */
window.OSANIX_LINKS = {
  uk: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/LXNRDR/", org: "osanixuk"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HLML44/", org: "osanixuk2" } },
  nl: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/KL6XJD/", org: "osanixnl"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JMS5JT/", org: "osanixnl2" } },
  se: { pick: "osanix",
        osanix: { base: "https://www.slmw4qtrk.com/ZZ2GX/KJS2RR/", org: "osanixse"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JLF8S8/", org: "osanixse2" } },
  de: { pick: "ozplus",
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HQS89X/", org: "osanixde"  } },
  da: { pick: "ozplus",
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HN2GSP/", org: "osanixda"  } },
  fr: { pick: "ozplus",
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JHMHC2/", org: "osanixfr"  } }
};
