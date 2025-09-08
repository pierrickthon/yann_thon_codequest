/**
 * CodeQuest 2.3 - N00 Warmup Tutorial
 * 
 * Mission: Implémenter la fonction ping() qui préfixe un message avec "pong: "
 * 
 * Exemples:
 *   ping("hello") → "pong: hello"
 *   ping("world") → "pong: world"
 *   ping("")      → "pong: "
 */

function ping(message) {
  // TODO: Retourner le message préfixé par "pong: "
  // Indice: Utiliser la concaténation de strings ou template literals
}

/**
 * Supplément: 20 mini-défis (strings)
 * 5 simples, 5 faciles, 5 moyens, 5 complexes
 */

// Simples
function echoUpper(s) {
  // TODO: Retourner s en majuscules
}

function trimAndPing(s) {
  // TODO: `pong: ${s.trim()}`
}

function prefix(s, p = '>> ') {
  // TODO: Préfixer s par p
}

function suffix(s, suf = ' <<') {
  // TODO: Suffixer s par suf
}

function surround(s, left = '[', right = ']') {
  // TODO: Entourer s avec left/right
}

// Faciles
function countWords(s) {
  // TODO: Compter mots séparés par espaces multiples
}

function maskEmail(email) {
  // TODO: 'john.doe@example.com' → 'j***@example.com'
}

function kebab(str) {
  // TODO: Kebab-case
}

function snake(str) {
  // TODO: Snake_case
}

function capitalizeWords(str) {
  // TODO: Capitaliser chaque mot
}

// Moyens
function wrapAt(s, width) {
  // TODO: Couper en lignes <= width sans casser mots si possible
}

function parseQuery(query) {
  // TODO: '?a=1&b=2' → { a:'1', b:'2' }
}

function serializeQuery(obj) {
  // TODO: { a:1, b:'x y' } → '?a=1&b=x%20y'
}

function stripAnsi(s) {
  // TODO: Retirer séquences ANSI
}

function isAnagram(a, b) {
  // TODO: Tester anagrammes (ignorer espaces/casse)
}

// Complexes
function wrapMarkdownCodeBlocks(md) {
  // TODO: Détecter ```blocs``` et les entourer de balises <pre><code>
}

function highlightKeyword(s, kw) {
  // TODO: Retourner string avec [kw] entouré de ** (markdown)
}

function justifyText(s, width) {
  // TODO: Justifier lignes à width (espaces redistribués)
}

function diffStrings(a, b) {
  // TODO: Retourner liste minimale d'opérations (insert/delete/keep)
}

function slugifyWithStopwords(s, stopwords = ['the','a','of']) {
  // TODO: Slugifier en supprimant stopwords
}

// Export pour les tests
module.exports = {
  ping,
  echoUpper,
  trimAndPing,
  prefix,
  suffix,
  surround,
  countWords,
  maskEmail,
  kebab,
  snake,
  capitalizeWords,
  wrapAt,
  parseQuery,
  serializeQuery,
  stripAnsi,
  isAnagram,
  wrapMarkdownCodeBlocks,
  highlightKeyword,
  justifyText,
  diffStrings,
  slugifyWithStopwords
};


