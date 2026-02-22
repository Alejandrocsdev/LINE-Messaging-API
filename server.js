require('dotenv').config({ quiet: true });

// Process-level crash handlers (FAIL FAST)
require('./process').crashHandlers();

const express = require('express');
const port = Number(process.env.PORT) || 3000;

const connectNgrok = require('./config/ngrok');

const { silence, notFound, errorHandler } = require('./middlewares');

const serverError = require('./errors/serverError');

const routes = require('./routes');

const start = async () => {
  // 1. Establish public tunnel
  await connectNgrok(port);

  // 2. Create app only after infra is ready
  const app = express();

  // Middlewares
  app.use(express.json());

  // Routes
  app.use(silence);
  app.get('/', (req, res) => res.json({ status: 'ok' }));
  app.use('/api', routes);

  // Request error handling
  app.use(notFound);
  app.use(errorHandler);

  // 4. Start server
  const server = app.listen(port, () => {
    console.info('[Server] listening on port', port);
  });

  // Server error handling
  server.on('error', serverError);

  // Graceful shutdown (CLEAN EXIT)
  require('./process').shutdownHandlers(server);
};

// BOOTSTRAP
start().catch((error) => {
  console.error('[Server] startup aborted\n');
  console.error(error);
  process.exit(1);
});
