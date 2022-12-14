import mixpanel from "mixpanel-browser";
import { env } from "$env/dynamic/public";

interface IConfig {
  [key: string]: any;
}

interface IProps {
  [key: string]: any;
}

interface IAnalytics {
  init: (config: IConfig) => void;
  getUserId: () => string;
  track: {
    button: (props: IProps) => void;
    timeOnPage: (props: IProps) => void;
  };
}

const analytics: IAnalytics = {
  init: (config) => {
    mixpanel.init(env.PUBLIC_PROJECT_TOKEN!, config);
  },
  getUserId: () => {
    return mixpanel.get_distinct_id();
  },
  track: {
    button: (props) => mixpanel.track("button_click", props),
    timeOnPage: (props) => mixpanel.track("time_on_page", props),
  },
};

export default analytics;
