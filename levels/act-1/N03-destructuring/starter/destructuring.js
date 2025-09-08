function mergeUserPrefs(defaults, incoming) {
  // TODO: Merge with spread, incoming wins
  // return { ...defaults, ...incoming };
}

/**
 * Supplément: 20 défis (Destructuring avancé)
 */

// Simples
function headTail([head, ...tail]) {
  // TODO: Retourner { head, tail }
}

function take3([a, b, c]) {
  // TODO: Retourner [a, b, c]
}

function coords({ x = 0, y = 0 }) {
  // TODO: Retourner `${x},${y}`
}

function alias({ id: userId }) {
  // TODO: Retourner userId
}

function defaultsUser({ role = 'user', active = true } = {}) {
  // TODO: Retourner { role, active }
}

// Faciles
function stripId({ id, ...rest }) {
  // TODO: Retourner rest
}

function joinArrays(a, b) {
  // TODO: Retourner [...a, ...b]
}

function setLocale(config) {
  // TODO: { lang='en', region='US' } via defaults params
}

function pickUser({ id, name, email }) {
  // TODO: Retourner { id, name, email }
}

function nestAddress({ address: { city, country } }) {
  // TODO: Retourner `${city} (${country})`
}

// Moyens
function pairToObject([key, value]) {
  // TODO: Retourner { [key]: value }
}

function objectWithout(obj, keys) {
  // TODO: Retourner un nouvel objet sans keys
}

function deepPick(obj, [k1, k2, k3]) {
  // TODO: Retourner obj[k1][k2][k3] avec garde
}

function splitTuple(tuple) {
  // TODO: [a,b,c,d] → { first:a, middle:[b,c], last:d }
}

function flattenPairs(pairs) {
  // TODO: [['a',1],['b',2]] → ['a',1,'b',2]
}

// Complexes
function mergeConfigs(...configs) {
  // TODO: Fusionner récursivement
}

function zipObject(keys, values) {
  // TODO: ['a','b'],[1,2] → { a:1, b:2 }
}

function unzipObject(obj) {
  // TODO: { a:1, b:2 } → { keys:['a','b'], values:[1,2] }
}

function toEntriesSorted(obj) {
  // TODO: Retourner entries triées par clé asc
}

function invertObject(obj) {
  // TODO: { a:1, b:2 } → { 1:'a', 2:'b' }
}

module.exports = {
  mergeUserPrefs,
  headTail,
  take3,
  coords,
  alias,
  defaultsUser,
  stripId,
  joinArrays,
  setLocale,
  pickUser,
  nestAddress,
  pairToObject,
  objectWithout,
  deepPick,
  splitTuple,
  flattenPairs,
  mergeConfigs,
  zipObject,
  unzipObject,
  toEntriesSorted,
  invertObject
};