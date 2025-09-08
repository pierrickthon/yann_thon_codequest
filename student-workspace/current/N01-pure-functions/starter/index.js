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

// Export pour les tests
module.exports = { add, isEven, sum };


