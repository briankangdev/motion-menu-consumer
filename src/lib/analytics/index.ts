import mixpanel from "mixpanel-browser";
import { env } from "$env/dynamic/public";
import { user } from "../../stores/user";

const EVENT_PREFIX = "consumer";

interface IConfig {
  [key: string]: any;
}

interface IProps {
  [key: string]: any;
}

interface IAnalytics {
  init: (config: IConfig) => void;
  setUserId: () => void;
  track: (event_name: string, props?: IProps) => void;
}

const analytics: IAnalytics = {
  init: (config) => {
    mixpanel.init(env.PUBLIC_PROJECT_TOKEN, config);
  },
  setUserId: () => {
    user.update((prev) => ({
      ...prev,
      distinct_id: mixpanel.get_distinct_id(),
    }));
  },
  track: (event_name: string, props: IProps) => {
    mixpanel.track(`${EVENT_PREFIX}.${event_name}`, props);
  },
};

export default analytics;
