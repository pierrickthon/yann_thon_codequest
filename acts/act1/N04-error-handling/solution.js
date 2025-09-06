/**
 * N04: Error Handling - Solution Template
 */

/**
 * Custom validation error class
 */
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

/**
 * Custom network error class
 */
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

/**
 * Validates user input with custom errors
 * @param {object} userData - User data to validate
 * @returns {object} Validated user data
 * @throws {ValidationError} When validation fails
 */
function validateUser(userData) {
  // TODO: Validate user data and throw ValidationError for invalid fields
  if (!userData.email || !userData.email.includes('@')) {
    throw new ValidationError('Invalid email format', 'email');
  }
  
  if (!userData.age || userData.age < 0 || userData.age > 150) {
    throw new ValidationError('Age must be between 0 and 150', 'age');
  }
  
  if (!userData.name || userData.name.length < 2) {
    throw new ValidationError('Name must be at least 2 characters', 'name');
  }
  
  return userData;
}

/**
 * Safe division that handles errors gracefully
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {object} Result with value or error
 */
function safeDivide(a, b) {
  // TODO: Return {success: true, value} or {success: false, error}
  try {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Arguments must be numbers');
    }
    return { success: true, value: a / b };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Processes array with error collection
 * @param {any[]} items - Items to process
 * @param {function} processor - Processing function
 * @returns {object} Results and errors
 */
function processWithErrorCollection(items, processor) {
  // TODO: Process all items, collect both results and errors
  const results = [];
  const errors = [];
  
  items.forEach((item, index) => {
    try {
      const result = processor(item);
      results.push({ index, result });
    } catch (error) {
      errors.push({ index, error: error.message, item });
    }
  });
  
  return { results, errors };
}

/**
 * Async function with proper error handling
 * @param {function} asyncOperation - Async operation to execute
 * @param {object} fallback - Fallback value on error
 * @returns {Promise} Promise with result or fallback
 */
async function safeAsyncCall(asyncOperation, fallback = null) {
  // TODO: Execute async operation with fallback on error
  try {
    return await asyncOperation();
  } catch (error) {
    console.error('Async operation failed:', error.message);
    return fallback;
  }
}

/**
 * Parses JSON with detailed error information
 * @param {string} jsonString - JSON string to parse
 * @returns {object} Parsed data or error details
 */
function safeJsonParse(jsonString) {
  // TODO: Parse JSON and return detailed error info on failure
  try {
    return { success: true, data: JSON.parse(jsonString) };
  } catch (error) {
    return {
      success: false,
      error: {
        message: error.message,
        position: error.message.match(/position (\d+)/)?.[1] || null,
        input: jsonString.substring(0, 50) + (jsonString.length > 50 ? '...' : '')
      }
    };
  }
}

/**
 * Error boundary function that catches and logs errors
 * @param {function} fn - Function to wrap
 * @returns {function} Wrapped function with error boundary
 */
function withErrorBoundary(fn) {
  // TODO: Return function that catches errors and logs them
  return function(...args) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      console.error(`Error in ${fn.name || 'anonymous function'}:`, error.message);
      console.error('Stack trace:', error.stack);
      throw error; // Re-throw for caller to handle
    }
  };
}

/**
 * Circuit breaker pattern implementation
 */
class CircuitBreaker {
  constructor(threshold = 3, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }

  async execute(operation) {
    // TODO: Implement circuit breaker pattern
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}

// Export functions and classes for testing
module.exports = {
  ValidationError,
  NetworkError,
  validateUser,
  safeDivide,
  processWithErrorCollection,
  safeAsyncCall,
  safeJsonParse,
  withErrorBoundary,
  CircuitBreaker
};