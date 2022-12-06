import mixpanel from "mixpanel-browser";
import { env } from "$env/dynamic/public";

const analytics = {
  init: (config) => {
    mixpanel.init(env.PUBLIC_PROJECT_TOKEN, config);
  },
  getUserId: () => {
    mixpanel.get_distinct_id();
  },
  track: {
    button: (props) => mixpanel.track("button_click", props),
    timeOnPage: (props) => mixpanel.track("time_on_page", props),
  },
};

export default analytics;
