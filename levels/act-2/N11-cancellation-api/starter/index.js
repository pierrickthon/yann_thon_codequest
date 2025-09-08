/**
 * N11 - Cancellation API
 */

// Simples
function createToken() {
  // TODO: { aborted:false, reason:null, abort:(r)=>{aborted=true;reason=r} }
}

function isAborted(token) {
  // TODO: retourner boolean
}

async function cancelableDelay(ms, token) {
  // TODO: rejeter si token.aborted
}

function linkTokens(...tokens) {
  // TODO: retourner un token qui s'aborte si l'un s'aborte
}

function withSignal(fn, token) {
  // TODO: wrapper fn pour qu'il lise token
}

// Faciles
function createController() {
  // TODO: { token, abort }
}

async function withTimeoutToken(task, ms) {
  // TODO: abort automatique après ms
}

async function raceWithAbort(tasks, token) {
  // TODO: course annulation incluse
}

function onAbort(token, callback) {
  // TODO: enregistrer callback appelé à l'annulation
}

function composeAbortReason(reasons) {
  // TODO: combiner plusieurs raisons textuelles
}

// Moyens
async function cancellableMap(values, mapper, token) {
  // TODO: mapper qui s'arrête si token.aborted
}

async function cancellablePipeline(value, token, ...steps) {
  // TODO: pipeline annulable
}

function timeoutController(ms) {
  // TODO: retourne un controller auto-abort après ms
}

async function retryUntilAbort(fn, token) {
  // TODO: réessayer jusqu'à abort
}

function combineControllers(...controllers) {
  // TODO: lier contrôleurs
}

// Complexes
async function cooperativeTaskLoop(step, token) {
  // TODO: boucle qui vérifie token entre itérations
}

async function cancellableResource(factory, token) {
  // TODO: gère création/cleanup quand abort
}

async function abortableFetchLike(url, token) {
  // TODO: simuler fetch qui rejette si token.aborted
}

async function debounceAsync(fn, wait, token) {
  // TODO: anti-rebond annulable
}

async function throttleAsync(fn, wait, token) {
  // TODO: limitation annulable
}

module.exports = {
  createToken,
  isAborted,
  cancelableDelay,
  linkTokens,
  withSignal,
  createController,
  withTimeoutToken,
  raceWithAbort,
  onAbort,
  composeAbortReason,
  cancellableMap,
  cancellablePipeline,
  timeoutController,
  retryUntilAbort,
  combineControllers,
  cooperativeTaskLoop,
  cancellableResource,
  abortableFetchLike,
  debounceAsync,
  throttleAsync
};


