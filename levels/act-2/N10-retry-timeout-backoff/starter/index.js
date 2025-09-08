/**
 * N10 - Retry / Timeout / Backoff
 */

// Simples
async function withTimeout(promise, ms) {
  // TODO: rejeter après ms si non résolu
}

async function retry(fn, times = 3) {
  // TODO: réessayer fn() jusqu'à times
}

function expoDelays(base = 100, times = 3) {
  // TODO: [100,200,400,...]
}

function jitter(ms, range = 0.1) {
  // TODO: ms ± range
}

// Faciles
async function retryBackoff(fn, times = 3, base = 50) {
  // TODO: backoff exponentiel entre tentatives
}

async function retryIf(fn, predicate, times = 3) {
  // TODO: ne réessayer que si predicate(error) === true
}

async function withDeadline(task, deadlineTs) {
  // TODO: rejeter si Date.now() dépasse deadline avant la fin
}

async function allWithTimeout(promises, ms) {
  // TODO: timeout global
}

async function raceWithFallback(primary, fallback, ms) {
  // TODO: fallback si primary dépasse ms
}

// Moyens
function policy({ retries = 3, base = 50, maxDelay = 2000, factor = 2, jitterRatio = 0.1 } = {}) {
  // TODO: fabriquer une politique de retry/backoff configurable
}

async function retryWithPolicy(fn, p) {
  // TODO: utiliser la politique p pour réessayer
}

async function timeoutPerTry(fn, ms, tries) {
  // TODO: timeout pour chaque tentative
}

async function retryParallel(fn, count = 2) {
  // TODO: lancer N tentatives en parallèle, prendre la première qui réussit
}

async function fallbackChain(tasks) {
  // TODO: tenter chaque tâche jusqu'à succès
}

// Complexes
async function hedgedRequests(makeTask, minDelay, count) {
  // TODO: lancer count requêtes décalées, garder la première réussie
}

async function bulkhead(tasks, concurrent, queue) {
  // TODO: combiner retry + limite concurrence + file
}

async function breakerRetry(fn, breaker) {
  // TODO: ne pas appeler fn si breaker ouvert
}

async function stopwatch(task) {
  // TODO: retourner { result, ms }
}

async function retryMetrics(fn, retries) {
  // TODO: retourner { attempts, successes, failures }
}

module.exports = {
  withTimeout,
  retry,
  expoDelays,
  jitter,
  retryBackoff,
  retryIf,
  withDeadline,
  allWithTimeout,
  raceWithFallback,
  policy,
  retryWithPolicy,
  timeoutPerTry,
  retryParallel,
  fallbackChain,
  hedgedRequests,
  bulkhead,
  breakerRetry,
  stopwatch,
  retryMetrics
};


