/* ============================================================================
   OSANIX — CENTRAL OFFER-LINK TABLE   (the ONE file to edit when links change)
   ----------------------------------------------------------------------------
   Every masked /go/ redirector on the site reads its outbound URL from here.
   To swap a geo's offer link (e.g. when Osanix-specific links arrive from the
   network), change only the `base` value on that geo's line below — nothing
   else on the site needs touching.

   CURRENT VALUES = the account's APPROVED, LIVE Ozalyn offer links
   (verified redirecting to the get-ozalyn / try-ozalyn funnels per geo).
   Low-CTC ("np" / normal-price) chosen for UK+DK — customer pays less, ~$10-15 less to us:
     uk  offer 58   $80  -> try-ozalyn.com/oz/np/uk/  (was #59 hp $95)
     de  offer 56   $72  -> get-ozalyn.com/de/        (already low-price D2C)
     da  offer 60   $70  -> try-ozalyn.com/oz/np/da/  (was #61 hp $80)
     nl  offer 255  $80  -> get-ozalyn.com  (NL & BE; only hp approved — ask Jennie for np)
   `org` = the organic sub1 tag used when there is no paid click-id present.
   ============================================================================ */
window.OSANIX_LINKS = {
  uk: { base: "https://www.slmw4qtrk.com/ZZ2GX/3TJ7N7/", org: "osanixuk" },
  de: { base: "https://www.slmw4qtrk.com/ZZ2GX/3QQG71/", org: "osanixde" },
  da: { base: "https://www.slmw4qtrk.com/ZZ2GX/3ZB15F/", org: "osanixda" },
  nl: { base: "https://www.slmw4qtrk.com/ZZ2GX/FM48MS/", org: "osanixnl" }
};
