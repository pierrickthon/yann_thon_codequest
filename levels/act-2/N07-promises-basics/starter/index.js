/**
 * N07 - Promises Basics
 * 20 défis: création/chaînage/erreurs
 */

// Simples
function resolveAfter(value, ms) {
  // TODO: résout value après ms
}

function rejectAfter(error, ms) {
  // TODO: rejette error après ms
}

function thenUpper(promise) {
  // TODO: then pour uppercaser une string
}

function catchDefault(promise, fallback) {
  // TODO: renvoyer fallback en cas d'erreur
}

function finallyTag(promise, tag) {
  // TODO: ajouter un tag dans finally et retourner résultat original
}

// Faciles
function chainAdd(promise, n) {
  // TODO: ajouter n au résultat numérique
}

function chainDouble(promise) {
  // TODO: doubler le résultat numérique
}

function toSettled(promise) {
  // TODO: retourner { status:'fulfilled', value } ou { status:'rejected', reason }
}

function allSafe(promises) {
  // TODO: all avec transformation en settled
}

function raceSafe(promises) {
  // TODO: race retournant { index, value|reason, status }
}

// Moyens
function sequence(promises) {
  // TODO: exécuter en séquence et accumuler résultats
}

function mapSeries(values, fn) {
  // TODO: appliquer fn en série
}

function mapParallel(values, fn) {
  // TODO: appliquer fn en parallèle
}

function retryPromise(factory, times) {
  // TODO: réessayer factory() qui retourne une Promise
}

function delay(ms) {
  // TODO: Promise timer
}

// Complexes
function defer() {
  // TODO: { promise, resolve, reject }
}

function timeout(promise, ms) {
  // TODO: rejeter si dépasse ms
}

function mirror(promise) {
  // TODO: transformer en promise toujours résolue avec { status, value|reason }
}

function pool(values, worker, concurrency = 2) {
  // TODO: exécuter worker avec un pool de taille concurrency
}

function fold(promises, reducer, initial) {
  // TODO: réduction de promesses
}

module.exports = {
  resolveAfter,
  rejectAfter,
  thenUpper,
  catchDefault,
  finallyTag,
  chainAdd,
  chainDouble,
  toSettled,
  allSafe,
  raceSafe,
  sequence,
  mapSeries,
  mapParallel,
  retryPromise,
  delay,
  defer,
  timeout,
  mirror,
  pool,
  fold
};


