/**
 * CodeQuest 2.3 - N02 Destructuring & Rest/Spread
 */

/**
 * Extrait la propriété name d'un objet user
 */
function extractName(user) {
  // TODO: Utiliser destructuring pour extraire name
  // const { name } = user;
}

/**
 * Fusionne deux objets, obj2 écrase obj1
 */
function mergeObjects(obj1, obj2) {
  // TODO: Utiliser spread pour fusionner
  // return { ...obj1, ...obj2 };
}

/**
 * Ajoute des valeurs par défaut à config
 * Défauts: { lang: 'en', debug: false }
 */
function setDefault(config) {
  // TODO: Fusionner avec défauts
  // const defaults = { lang: 'en', debug: false };
}

/**
 * Supplément: 20 défis (Destructuring / Rest / Spread)
 * 5 simples, 5 faciles, 5 moyens, 5 complexes
 */

// Simples
function firstAndSecond([first, second]) {
  // TODO: Retourner { first, second }
}

function swapPair([a, b]) {
  // TODO: Retourner [b, a]
}

function defaultsParams({ mode = 'light', size = 'md' } = {}) {
  // TODO: Retourner { mode, size }
}

function renameProps({ id: userId, name: fullName }) {
  // TODO: Retourner { userId, fullName }
}

function restArray([head, ...tail]) {
  // TODO: Retourner { head, tail }
}

// Faciles
function mergeArrays(a, b) {
  // TODO: Retourner [...a, ...b]
}

function removeProp(obj, key) {
  // TODO: Retourner nouvel objet sans la propriété key (rest)
}

function pickProps(obj, keys) {
  // TODO: Extraire sous-objet contenant keys
}

function splitFullName({ firstName, lastName, ...rest }) {
  // TODO: Retourner { firstName, lastName, rest }
}

function cloneDeepShallow(obj) {
  // TODO: Retourner une copie superficielle via spread ({...obj})
}

// Moyens
function nestedDestructure(user) {
  // TODO: Extraire user.address.city en { city }
}

function withIndexMap(arr) {
  // TODO: Retourner arr.map((value, index) => ({ index, value }))
}

function mergeMany(...objects) {
  // TODO: Fusionner tous les objets (spread)
}

function arrayToObject(pairs) {
  // TODO: [['a',1],['b',2]] → { a:1, b:2 }
}

function objectToPairs(obj) {
  // TODO: { a:1, b:2 } → [['a',1],['b',2]]
}

// Complexes
function deepMerge(a, b) {
  // TODO: Fusionner récursivement objets/arrays sans mutation (prims de b écrasent a)
}

function pluck(list, path) {
  // TODO: Extraire valeurs par chemin 'a.b.c' via destructuring
}

function partitionByKeys(obj, keys) {
  // TODO: Retourner { picked, omitted }
}

function spreadCall(fn, argsArray) {
  // TODO: Appeler fn(...argsArray)
}

function unzip(pairs) {
  // TODO: [['a',1],['b',2]] → { keys:['a','b'], values:[1,2] }
}

module.exports = {
  extractName,
  mergeObjects,
  setDefault,
  firstAndSecond,
  swapPair,
  defaultsParams,
  renameProps,
  restArray,
  mergeArrays,
  removeProp,
  pickProps,
  splitFullName,
  cloneDeepShallow,
  nestedDestructure,
  withIndexMap,
  mergeMany,
  arrayToObject,
  objectToPairs,
  deepMerge,
  pluck,
  partitionByKeys,
  spreadCall,
  unzip
};


