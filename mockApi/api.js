const express = require('express');
const cors = require('cors');
const posts = require('../cypress/fixtures/e2e/request.json');

const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: 'http://127.0.0.1:3000',
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use('/images', express.static('mockApi/public'));

app.get('/maps', async (_req, res) => res.json({ maps: ['Ascent', 'Bind'] }));
app.get('/agents/Ascent', async (_req, res) => res.json({ agents: ['Viper', 'Cypher'] }));
app.get('/agents/Bind', async (_req, res) => res.json({ agents: ['Sage', 'Sova'] }));
app.get('/posts/Ascent/Cypher', async (_req, res) => res.json(posts));
app.get('/posts/Ascent/Bind', async (_req, res) => res.json(posts));
app.get('/posts/Bind/Sage', async (_req, res) => res.json(posts));
app.get('/posts/Bind/Sova', async (_req, res) => res.json(posts));

let server = null;

module.exports = {
  stopServer: function stopServer() {
    server?.close();
  },
  startServer: function startServer() {
    server = app.listen(4444);
  },
};
