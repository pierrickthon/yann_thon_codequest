/**
 * CodeQuest 2.3 - N01 Pure Functions - Solution
 */

// Version compacte pour challenge trophy
const add = (a, b) => a + b;
const isEven = (n) => n % 2 === 0;
const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);

// Export pour les tests
module.exports = { add, isEven, sum };


