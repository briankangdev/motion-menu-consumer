import mixpanel from "mixpanel-browser";
import { env } from "$env/dynamic/public";
import { user } from "../../stores/user";

interface IConfig {
  [key: string]: any;
}

interface IProps {
  [key: string]: any;
}

interface IAnalytics {
  init: (config: IConfig) => void;
  setUserId: () => void;
  track: {
    buttonClick: (button_name: string, props: IProps) => void;
    pageStay: (page_name: string, seconds: number, rops: IProps) => void;
    submitForm: (page_name: string, form_name: string, props: IProps) => void;
    visitPage: (page_name: string, props: IProps) => void;
  };
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
  track: {
    buttonClick: (button_name, props = {}) =>
      mixpanel.track(`${button_name}-button.click`, props),
    pageStay: (page_name, seconds, props) =>
      mixpanel.track(`${page_name}.stay`, { ...props, seconds }),
    submitForm: (page_name, form_name, props) =>
      mixpanel.track(`${page_name}.${form_name}.submit`, props),
    visitPage: (page_name, props) =>
      mixpanel.track(`${page_name}.visit`, props),
  },
};

export default analytics;
