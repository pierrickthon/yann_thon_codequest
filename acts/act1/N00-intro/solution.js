/**
 * N00: JavaScript Fundamentals - Solution Template
 */

/**
 * Calculates the sum of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
  // TODO: Implement addition
  return a + b;
}

/**
 * Checks if a number is even
 * @param {number} num - Number to check
 * @returns {boolean} True if even, false if odd
 */
const isEven = (num) => {
  // TODO: Implement even check
  return num % 2 === 0;
};

/**
 * Returns the larger of two numbers
 * @param {number} x - First number
 * @param {number} y - Second number
 * @returns {number} The larger number
 */
function max(x, y) {
  // TODO: Implement max function
  return x > y ? x : y;
}

/**
 * Creates a greeting message
 * @param {string} name - Name to greet
 * @returns {string} Greeting message
 */
const greet = (name = 'World') => {
  // TODO: Implement greeting with default parameter
  return `Hello, ${name}!`;
};

/**
 * Counts from 1 to n and returns array
 * @param {number} n - Upper limit
 * @returns {number[]} Array of numbers from 1 to n
 */
function countTo(n) {
  // TODO: Implement counting function
  const result = [];
  for (let i = 1; i <= n; i++) {
    result.push(i);
  }
  return result;
}

// Export functions for testing
module.exports = {
  add,
  isEven,
  max,
  greet,
  countTo
};