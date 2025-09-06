/**
 * N06: TDD Methodology - Solution Template
 * 
 * This implementation follows Test-Driven Development:
 * 1. Write failing test (Red)
 * 2. Write minimal code to pass (Green)
 * 3. Refactor while keeping tests passing (Refactor)
 */

/**
 * Calculator class implementing basic arithmetic operations
 * Built using TDD methodology
 */
class Calculator {
  constructor() {
    this.history = [];
    this.memory = 0;
  }

  /**
   * Adds two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum of a and b
   */
  add(a, b) {
    // TODO: Implement addition (write test first!)
    this._validateNumbers(a, b);
    const result = a + b;
    this._recordOperation('add', [a, b], result);
    return result;
  }

  /**
   * Subtracts second number from first
   * @param {number} a - First number
   * @param {number} b - Number to subtract
   * @returns {number} Difference
   */
  subtract(a, b) {
    // TODO: Implement subtraction (write test first!)
    this._validateNumbers(a, b);
    const result = a - b;
    this._recordOperation('subtract', [a, b], result);
    return result;
  }

  /**
   * Multiplies two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Product
   */
  multiply(a, b) {
    // TODO: Implement multiplication (write test first!)
    this._validateNumbers(a, b);
    const result = a * b;
    this._recordOperation('multiply', [a, b], result);
    return result;
  }

  /**
   * Divides first number by second
   * @param {number} a - Dividend
   * @param {number} b - Divisor
   * @returns {number} Quotient
   * @throws {Error} When dividing by zero
   */
  divide(a, b) {
    // TODO: Implement division with zero check (write test first!)
    this._validateNumbers(a, b);
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    const result = a / b;
    this._recordOperation('divide', [a, b], result);
    return result;
  }

  /**
   * Calculates power of a number
   * @param {number} base - Base number
   * @param {number} exponent - Exponent
   * @returns {number} Result of base^exponent
   */
  power(base, exponent) {
    // TODO: Implement power operation (write test first!)
    this._validateNumbers(base, exponent);
    const result = Math.pow(base, exponent);
    this._recordOperation('power', [base, exponent], result);
    return result;
  }

  /**
   * Calculates square root
   * @param {number} n - Number to find square root of
   * @returns {number} Square root
   * @throws {Error} For negative numbers
   */
  sqrt(n) {
    // TODO: Implement square root (write test first!)
    this._validateNumbers(n);
    if (n < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    const result = Math.sqrt(n);
    this._recordOperation('sqrt', [n], result);
    return result;
  }

  /**
   * Stores value in memory
   * @param {number} value - Value to store
   */
  memoryStore(value) {
    // TODO: Implement memory store (write test first!)
    this._validateNumbers(value);
    this.memory = value;
  }

  /**
   * Recalls value from memory
   * @returns {number} Value from memory
   */
  memoryRecall() {
    // TODO: Implement memory recall (write test first!)
    return this.memory;
  }

  /**
   * Clears memory
   */
  memoryClear() {
    // TODO: Implement memory clear (write test first!)
    this.memory = 0;
  }

  /**
   * Gets calculation history
   * @returns {array} Array of past operations
   */
  getHistory() {
    // TODO: Implement history retrieval (write test first!)
    return [...this.history];
  }

  /**
   * Clears calculation history
   */
  clearHistory() {
    // TODO: Implement history clearing (write test first!)
    this.history = [];
  }

  /**
   * Validates that inputs are numbers
   * @private
   * @param {...any} numbers - Numbers to validate
   * @throws {Error} If any input is not a number
   */
  _validateNumbers(...numbers) {
    for (const num of numbers) {
      if (typeof num !== 'number' || isNaN(num)) {
        throw new Error('All inputs must be valid numbers');
      }
    }
  }

  /**
   * Records operation in history
   * @private
   * @param {string} operation - Operation name
   * @param {array} operands - Input values
   * @param {number} result - Operation result
   */
  _recordOperation(operation, operands, result) {
    this.history.push({
      operation,
      operands,
      result,
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Advanced calculator with additional functionality
 * Demonstrates TDD with inheritance
 */
class ScientificCalculator extends Calculator {
  /**
   * Calculates sine of angle in radians
   * @param {number} angle - Angle in radians
   * @returns {number} Sine value
   */
  sin(angle) {
    // TODO: Implement sine function (write test first!)
    this._validateNumbers(angle);
    const result = Math.sin(angle);
    this._recordOperation('sin', [angle], result);
    return Math.round(result * 1e10) / 1e10; // Round to avoid floating point errors
  }

  /**
   * Calculates cosine of angle in radians
   * @param {number} angle - Angle in radians
   * @returns {number} Cosine value
   */
  cos(angle) {
    // TODO: Implement cosine function (write test first!)
    this._validateNumbers(angle);
    const result = Math.cos(angle);
    this._recordOperation('cos', [angle], result);
    return Math.round(result * 1e10) / 1e10; // Round to avoid floating point errors
  }

  /**
   * Calculates natural logarithm
   * @param {number} n - Number
   * @returns {number} Natural logarithm
   * @throws {Error} For non-positive numbers
   */
  log(n) {
    // TODO: Implement logarithm function (write test first!)
    this._validateNumbers(n);
    if (n <= 0) {
      throw new Error('Logarithm undefined for non-positive numbers');
    }
    const result = Math.log(n);
    this._recordOperation('log', [n], result);
    return result;
  }
}

// Export classes for testing
module.exports = {
  Calculator,
  ScientificCalculator
};