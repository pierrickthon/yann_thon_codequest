/**
 * CodeQuest 2.3 - N01 Pure Functions
 * 
 * Mission: Implémenter 3 fonctions pures sans effets de bord
 * 
 * Règles des fonctions pures:
 * 1. Même entrée → Même sortie (déterministe)
 * 2. Aucun effet de bord (pas de console.log, mutations, etc.)
 */

/**
 * Additionne deux nombres
 * @param {number} a - Premier nombre
 * @param {number} b - Deuxième nombre  
 * @returns {number} - Somme de a et b
 */
function add(a, b) {
  // TODO: Retourner la somme de a et b
}

/**
 * Vérifie si un nombre est pair
 * @param {number} n - Nombre à tester
 * @returns {boolean} - true si pair, false si impair
 */
function isEven(n) {
  // TODO: Retourner true si n est pair, false sinon
  // Indice: utilisez l'opérateur modulo (%)
}

/**
 * Calcule la somme de tous les éléments d'un tableau
 * @param {number[]} arr - Tableau de nombres
 * @returns {number} - Somme de tous les éléments
 */
function sum(arr) {
  // TODO: Retourner la somme de tous les éléments du tableau
  // Indice: vous pouvez utiliser une boucle ou une méthode tableau
}

/**
 * ==========================
 * SUPPLÉMENT: 20 Défis Pures
 * ==========================
 * Ajoutez des implémentations SANS effets de bord.
 * Groupés par difficulté: 5 simples, 5 faciles, 5 moyens, 5 complexes.
 * Conservez les fonctions pures: même entrée → même sortie, pas d'I/O.
 */

// Simples (compléter pour atteindre 5 simples avec add/isEven/sum)
/**
 * Retourne l'opposé arithmétique
 */
function negate(n) {
  // TODO: Retourner -n
}

/**
 * Retourne le maximum de deux nombres
 */
function maxOfTwo(a, b) {
  // TODO: Retourner a si a >= b sinon b
}

// Faciles (5)
/**
 * Contraint n dans l'intervalle [min, max]
 */
function clamp(n, min, max) {
  // TODO: Retourner min si n < min, max si n > max, sinon n
}

/**
 * Moyenne arithmétique d'un tableau de nombres
 */
function average(arr) {
  // TODO: Utiliser sum(arr) / arr.length (gérer arr vide → NaN ou 0)
}

/**
 * Compte le nombre d'occurrences de value dans arr
 */
function countOccurrences(arr, value) {
  // TODO: Itérer et compter strictement === value
}

/**
 * Vérifie si une chaîne est un palindrome (insensible à la casse/espaces)
 */
function isPalindrome(str) {
  // TODO: Normaliser (lowercase, retirer espaces) puis comparer avec renversé
}

/**
 * Somme des valeurs uniques d'un tableau de nombres
 */
function sumUnique(arr) {
  // TODO: Éliminer doublons puis sommer
}

// Moyens (5)
/**
 * Supprime les doublons en conservant l'ordre initial
 */
function unique(arr) {
  // TODO: Retourner un nouveau tableau sans doublons
}

/**
 * Retourne un nouvel objet avec uniquement les clés listées
 */
function pick(object, keys) {
  // TODO: Construire un nouvel objet { k: object[k] } pour chaque k présent
}

/**
 * Retourne un nouvel objet sans les clés listées
 */
function omit(object, keys) {
  // TODO: Construire un nouvel objet en excluant keys
}

/**
 * Compose deux fonctions f∘g: x → f(g(x))
 */
function compose2(f, g) {
  // TODO: Retourner une fonction (x) => f(g(x))
}

/**
 * Normalise une chaîne en kebab-case (lettres minuscules, mots séparés par '-')
 */
function toKebabCase(str) {
  // TODO: Remplacer espaces/underscores par '-', baisser la casse, compacter multiples '-'
}

// Complexes (5)
/**
 * Tri rapide (quicksort) pur: retourne un nouveau tableau trié (ascendant)
 */
function quickSort(arr) {
  // TODO: Implémenter quicksort sans muter arr
}

/**
 * Mémoïse une fonction unaire (clé = argument JSON.stringify)
 */
function memoizeUnary(fn) {
  // TODO: Retourner une fonction avec cache interne basé sur l'argument
}

/**
 * Test d'égalité profonde (objets/arrays primitifs)
 */
function deepEqual(a, b) {
  // TODO: Comparer récursivement types, longueurs, clés et valeurs
}

/**
 * Pipe de gauche à droite: pipe(f,g,h)(x) = h(g(f(x)))
 */
function pipe(...fns) {
  // TODO: Retourner une fonction qui applique successivement toutes les fns
}

/**
 * Découpe un tableau en morceaux de taille size
 */
function chunk(arr, size) {
  // TODO: Retourner un nouveau tableau de sous-tableaux (dernière tranche courte possible)
}

// Export pour les tests
module.exports = {
  // existants
  add,
  isEven,
  sum,
  // simples
  negate,
  maxOfTwo,
  // faciles
  clamp,
  average,
  countOccurrences,
  isPalindrome,
  sumUnique,
  // moyens
  unique,
  pick,
  omit,
  compose2,
  toKebabCase,
  // complexes
  quickSort,
  memoizeUnary,
  deepEqual,
  pipe,
  chunk
};


