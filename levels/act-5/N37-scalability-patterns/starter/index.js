/**
 * N37 - Scalability Patterns
 */

// Simples
function partition(keys, shards) { /* TODO */ }
function loadShedding(threshold) { /* TODO */ }
function rateLimiter(perSec) { /* TODO */ }
function ttlCache(ttl) { /* TODO */ }
function idGenerator(prefix) { /* TODO */ }

// Faciles
function roundRobin(targets) { /* TODO */ }
function consistentHashing(nodes) { /* TODO */ }
function bulkhead(pools) { /* TODO */ }
function backpressure(buffer) { /* TODO */ }
function fanout(handlers) { /* TODO */ }

// Moyens
function autoscaler(policy) { /* TODO */ }
function partitionRouter(strategy) { /* TODO */ }
function shadowTraffic(percentage) { /* TODO */ }
function hedgeRequests(delays) { /* TODO */ }
function prefetcher() { /* TODO */ }

// Complexes
function globalRateLimiters(regions) { /* TODO */ }
function geoRouting(regions) { /* TODO */ }
function multiTenantIsolation(tenants) { /* TODO */ }
function distributedLock() { /* TODO */ }
function sagaOrchestrator() { /* TODO */ }

module.exports = {
  partition,
  loadShedding,
  rateLimiter,
  ttlCache,
  idGenerator,
  roundRobin,
  consistentHashing,
  bulkhead,
  backpressure,
  fanout,
  autoscaler,
  partitionRouter,
  shadowTraffic,
  hedgeRequests,
  prefetcher,
  globalRateLimiters,
  geoRouting,
  multiTenantIsolation,
  distributedLock,
  sagaOrchestrator
};


