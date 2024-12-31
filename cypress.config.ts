import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1366,
  viewPortHeight: 768,

  env: {
    apiHost: "http://127.0.0.1:3333",
  },

  defaultCommandTimeout: 45000,
  pageLoadTimeout: 45000,
  screenshotOnRunFailure: false,
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
