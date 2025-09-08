/**
 * N08 - Async/Await Control
 * 20 défis: 5 simples, 5 faciles, 5 moyens, 5 complexes
 */

// Simples
async function sleep(ms) {
  // TODO: Retourner une Promise résolue après ms
}

async function resolveValue(value) {
  // TODO: Retourner value via Promise
}

async function sequence2(fn1, fn2) {
  // TODO: exécuter fn1(), puis fn2(), retourner [r1, r2]
}

async function parallel2(fn1, fn2) {
  // TODO: exécuter en parallèle via Promise.all
}

async function mapAsync(values, mapper) {
  // TODO: appliquer mapper async et attendre tous
}

// Faciles
async function withTimeout(promise, ms) {
  // TODO: rejeter si délai dépassé
}

async function raceFirst(promises) {
  // TODO: retourner le premier résultat (Promise.race)
}

async function allSettledValues(promises) {
  // TODO: retourner { fulfilled:[...], rejected:[errors...] }
}

async function retryAsync(fn, retries = 3) {
  // TODO: réessayer fn() jusqu'à retries fois
}

async function reduceAsync(values, reducer, initialValue) {
  // TODO: réduire séquentiellement avec reducer async
}

// Moyens
async function sequenceTasks(tasks) {
  // TODO: exécuter une liste de tâches async séquentiellement, retourner résultats
}

async function parallelLimit(values, mapper, limit = 2) {
  // TODO: exécuter mapper avec limitation simple (file d'attente)
}

async function pipeline(value, ...steps) {
  // TODO: appliquer steps async en chaîne
}

async function retryWithDelay(fn, retries = 3, delayMs = 100) {
  // TODO: réessayer avec délai entre tentatives
}

async function batch(values, size) {
  // TODO: découper values en lots de taille size
}

// Complexes
async function backoff(fn, retries = 3, baseMs = 50) {
  // TODO: exponentiel backoff: 50,100,200...
}

async function settleMap(values, fn) {
  // TODO: exécuter fn pour chaque valeur et retourner { ok:[{i,val}], ko:[{i,error}] }
}

async function timeoutStep(step, ms) {
  // TODO: wrapper une step async avec timeout
}

async function cancelableSleep(ms, signal) {
  // TODO: rejeter si signal.aborted avant/pendant
}

async function waterfall(tasks) {
  // TODO: transmettre le résultat de chaque tâche à la suivante
}

module.exports = {
  sleep,
  resolveValue,
  sequence2,
  parallel2,
  mapAsync,
  withTimeout,
  raceFirst,
  allSettledValues,
  retryAsync,
  reduceAsync,
  sequenceTasks,
  parallelLimit,
  pipeline,
  retryWithDelay,
  batch,
  backoff,
  settleMap,
  timeoutStep,
  cancelableSleep,
  waterfall
};


