import { HOME_PAGE } from "../lib/analytics/types";
import analytics from "../lib/analytics";

export function trackUserStay(title_value: string): void {
  const on_mount_time = new Date(); // Get the time when user enters the page

  window.onbeforeunload = function () {
    const exit_time = new Date(); // Get the time when user leaves the page
    const user_stay = (exit_time.getTime() - on_mount_time.getTime()) / 1000;

    analytics.track.pageStay(HOME_PAGE, user_stay, {
      page: HOME_PAGE,
      title_value,
    });
  };
}

export function handleButtonClick(
  button_name: string,
  title_value: string
): void {
  analytics.track.buttonClick(HOME_PAGE, button_name, { title_value });
}
