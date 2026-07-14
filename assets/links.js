/* ============================================================================
   OSANIX — CENTRAL OFFER-LINK TABLE   (the ONE file to edit when links change)
   ----------------------------------------------------------------------------
   Every masked /go/ redirector on the site reads its outbound URL from here.
   To swap a geo's offer link (e.g. when Osanix-specific links arrive from the
   network), change only the `base` value on that geo's line below — nothing
   else on the site needs touching.

   CURRENT VALUES = the account's APPROVED, LIVE Ozalyn offer links
   (verified redirecting to the get-ozalyn / try-ozalyn funnels per geo).
     uk  offer 59   $95  -> try-ozalyn.com/oz/hp/uk/
     de  offer 56   $72  -> get-ozalyn.com/de/
     da  offer 61   $80  -> try-ozalyn.com/oz/hp/da/
     nl  offer 255  $80  -> get-ozalyn.com  (NL & BE, Dutch/Flemish)
   `org` = the organic sub1 tag used when there is no paid click-id present.
   ============================================================================ */
window.OSANIX_LINKS = {
  uk: { base: "https://www.slmw4qtrk.com/ZZ2GX/3WX4DS/", org: "osanixuk" },
  de: { base: "https://www.slmw4qtrk.com/ZZ2GX/3QQG71/", org: "osanixde" },
  da: { base: "https://www.slmw4qtrk.com/ZZ2GX/41NTW2/", org: "osanixda" },
  nl: { base: "https://www.slmw4qtrk.com/ZZ2GX/FM48MS/", org: "osanixnl" }
};
