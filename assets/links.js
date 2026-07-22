/* Central redirect table. Each geo now carries BOTH products we can send to, so the
   page can offer a real choice instead of a single forced destination.

   `pick` = the one we recommend in that market (gets the tick, and is what a bare
   /go/ resolves to). The other is reached with /go/?p=<key>.
   `org`  = organic sub1 tag. The pick keeps that geo's ORIGINAL tag so historical
   reporting still lines up; the alternative gets a `2` suffix so the two are
   separable in a single Everflow report.

   To change a destination, edit only its `base`. Offer IDs were read back from the
   Everflow offer names on 2026-07-22 — never transcribe a hash by hand. */
window.OSANIX_LINKS = {
  uk: { pick: "ozalyn",
        ozalyn: { base: "https://www.slmw4qtrk.com/ZZ2GX/3WX4DS/", org: "osanixuk"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HLML44/", org: "osanixuk2" } },
  de: { pick: "ozplus",
        ozalyn: { base: "https://www.slmw4qtrk.com/ZZ2GX/3QQG71/", org: "osanixde2" },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HQS89X/", org: "osanixde"  } },
  da: { pick: "ozalyn",
        ozalyn: { base: "https://www.slmw4qtrk.com/ZZ2GX/41NTW2/", org: "osanixda"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/HN2GSP/", org: "osanixda2" } },
  nl: { pick: "ozalyn",
        ozalyn: { base: "https://www.slmw4qtrk.com/ZZ2GX/FM48MS/", org: "osanixnl"  },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JMS5JT/", org: "osanixnl2" } },
  se: { pick: "ozplus",
        ozalyn: { base: "https://www.slmw4qtrk.com/ZZ2GX/KG29BK/", org: "osanixse2" },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JLF8S8/", org: "osanixse"  } },
  fr: { pick: "ozplus",
        ozalyn: { base: "https://www.slmw4qtrk.com/ZZ2GX/3S5BXL/", org: "osanixfr2" },
        ozplus: { base: "https://www.slmw4qtrk.com/ZZ2GX/JHMHC2/", org: "osanixfr"  } }
};
