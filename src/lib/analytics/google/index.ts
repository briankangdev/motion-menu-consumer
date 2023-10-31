import { gtag } from "ga-gtag";

const GOOGLE_ADS_ID = "AW-11393930502";

const LANDING_CONTACT_EVENT = "u-SxCJzp8fEYEIaqhrkq";

const LAINDING_SIGNUP_EVENT = "cK1CCJ_p8fEYEIaqhrkq";

function track(event_id) {
  gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${event_id}`,
  });
}

export function trackLandingContact() {
  track(LANDING_CONTACT_EVENT);
}

export function trackLandingSignup() {
  track(LAINDING_SIGNUP_EVENT);
}
