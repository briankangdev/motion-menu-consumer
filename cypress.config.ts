import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    video: false,
    screenshotOnRunFailure: false,
    viewportWidth: 1200,
    viewportHeight: 660,
    env: {
      PUBLIC_MOTION_MENU_API_ENDPOINT:
        "https://motion-menu-api-staging.herokuapp.com",
    },
    supportFile: false,
  },
});
