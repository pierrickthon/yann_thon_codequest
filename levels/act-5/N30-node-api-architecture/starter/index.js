/**
 * N30 - Node API Architecture
 */

// Simples
function createApp() { /* TODO: register routes, middlewares (pure shape) */ }
function route(method, path, handler) { /* TODO */ }
function parseBody(raw) { /* TODO */ }
function sendJson(data, status = 200) { /* TODO */ }
function notFound() { /* TODO */ }

// Faciles
function middlewareStack(...mws) { /* TODO */ }
function router() { /* TODO */ }
function errorHandler(mapper) { /* TODO */ }
function validate(schema) { /* TODO */ }
function cors(options) { /* TODO */ }

// Moyens
function httpClient() { /* TODO: mock client */ }
function cache(ttl) { /* TODO */ }
function rateLimit(max, windowMs) { /* TODO */ }
function auth(strategy) { /* TODO */ }
function serviceLayer(services) { /* TODO */ }

// Complexes
function openApi(doc) { /* TODO */ }
function gateway(routes) { /* TODO */ }
function workerPool(size) { /* TODO */ }
function jobQueue() { /* TODO */ }
function metrics() { /* TODO */ }

module.exports = {
  createApp,
  route,
  parseBody,
  sendJson,
  notFound,
  middlewareStack,
  router,
  errorHandler,
  validate,
  cors,
  httpClient,
  cache,
  rateLimit,
  auth,
  serviceLayer,
  openApi,
  gateway,
  workerPool,
  jobQueue,
  metrics
};


