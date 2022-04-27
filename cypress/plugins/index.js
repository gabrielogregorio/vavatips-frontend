/// <reference types="cypress" />
const browserify = require('@cypress/browserify-preprocessor');

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

const http = require('http');
const next = require('next');
const { startServer, stopServer } = require('../../mockApi/api');

module.exports = async (on, config) => {
  const app = next({ dev: true });
  const handleNextRequest = app.getRequestHandler();
  await app.prepare();

  const customServer = new http.Server(async (req, res) => handleNextRequest(req, res));

  await new Promise((resolve, reject) => {
    customServer.listen(3000, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });

  on('task', {
    stopServer() {
      stopServer();
      return null;
    },

    startServer() {
      startServer();

      return null;
    },
  });

  // typescript
  on(
    'file:preprocessor',
    browserify({
      typescript: require.resolve('typescript'),
    }),
  );
  return config;
};
