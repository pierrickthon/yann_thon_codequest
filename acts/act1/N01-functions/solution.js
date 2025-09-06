/**
 * N01: Functions & Scope - Solution Template
 */

/**
 * Creates a counter function using closure
 * @param {number} start - Initial count value
 * @returns {function} Counter function
 */
function createCounter(start = 0) {
  // TODO: Implement counter with closure
  let count = start;
  return function() {
    return ++count;
  };
}

/**
 * Multiplies all numbers in array by factor
 * @param {number[]} numbers - Array of numbers
 * @param {number} factor - Multiplication factor
 * @returns {number[]} New array with multiplied values
 */
const multiplyBy = (numbers, factor) => {
  // TODO: Use map to multiply each number
  return numbers.map(num => num * factor);
};

/**
 * Filters array based on predicate function
 * @param {any[]} array - Input array
 * @param {function} predicate - Filter function
 * @returns {any[]} Filtered array
 */
function filterBy(array, predicate) {
  // TODO: Implement filter using higher-order function
  return array.filter(predicate);
}

/**
 * Reduces array to single value
 * @param {any[]} array - Input array
 * @param {function} reducer - Reducer function
 * @param {any} initial - Initial value
 * @returns {any} Reduced value
 */
const reduceArray = (array, reducer, initial) => {
  // TODO: Implement reduce functionality
  return array.reduce(reducer, initial);
};

/**
 * Composes two functions
 * @param {function} f - First function
 * @param {function} g - Second function
 * @returns {function} Composed function
 */
function compose(f, g) {
  // TODO: Return function that applies g then f
  return function(x) {
    return f(g(x));
  };
}

/**
 * Creates a memoized version of a function
 * @param {function} fn - Function to memoize
 * @returns {function} Memoized function
 */
function memoize(fn) {
  // TODO: Implement memoization with closure
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

/**
 * Binds context to a function
 * @param {function} fn - Function to bind
 * @param {object} context - Context object
 * @returns {function} Bound function
 */
const bindContext = (fn, context) => {
  // TODO: Return function bound to context
  return fn.bind(context);
};

// Export functions for testing
module.exports = {
  createCounter,
  multiplyBy,
  filterBy,
  reduceArray,
  compose,
  memoize,
  bindContext
};