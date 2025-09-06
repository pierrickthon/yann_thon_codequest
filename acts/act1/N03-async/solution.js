/**
 * N03: Async Programming - Solution Template
 */

/**
 * Creates a delay using Promise
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
function delay(ms) {
  // TODO: Return promise that resolves after ms milliseconds
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetches data with timeout
 * @param {string} url - URL to fetch (simulated)
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise} Promise with data or timeout error
 */
async function fetchWithTimeout(url, timeout = 5000) {
  // TODO: Simulate fetch with timeout
  const fetchPromise = simulateFetch(url);
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Request timeout')), timeout)
  );
  
  return Promise.race([fetchPromise, timeoutPromise]);
}

/**
 * Simulates a fetch operation
 * @param {string} url - URL to fetch
 * @returns {Promise} Promise with simulated data
 */
function simulateFetch(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('error')) {
        reject(new Error('Fetch failed'));
      } else {
        resolve({ data: `Data from ${url}`, status: 200 });
      }
    }, Math.random() * 1000 + 500);
  });
}

/**
 * Retries an async operation
 * @param {function} operation - Async function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @returns {Promise} Promise with operation result
 */
async function retryOperation(operation, maxRetries = 3) {
  // TODO: Retry operation up to maxRetries times
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) {
        throw lastError;
      }
      await delay(Math.pow(2, attempt) * 100); // Exponential backoff
    }
  }
}

/**
 * Processes array items concurrently with limit
 * @param {any[]} items - Items to process
 * @param {function} processor - Async processor function
 * @param {number} concurrency - Max concurrent operations
 * @returns {Promise} Promise with processed results
 */
async function processWithConcurrency(items, processor, concurrency = 3) {
  // TODO: Process items with concurrency limit
  const results = [];
  const executing = [];
  
  for (const item of items) {
    const promise = processor(item).then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= concurrency) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}

/**
 * Chains async operations in sequence
 * @param {any[]} items - Items to process
 * @param {function} processor - Async processor function
 * @returns {Promise} Promise with all results
 */
async function sequentialProcess(items, processor) {
  // TODO: Process items sequentially
  const results = [];
  
  for (const item of items) {
    const result = await processor(item);
    results.push(result);
  }
  
  return results;
}

/**
 * Races multiple async operations
 * @param {Promise[]} promises - Array of promises
 * @returns {Promise} First resolved promise with index
 */
async function raceWithIndex(promises) {
  // TODO: Return first resolved promise with its index
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then(result => resolve({ index, result }))
        .catch(reject);
    });
  });
}

// Export functions for testing
module.exports = {
  delay,
  fetchWithTimeout,
  simulateFetch,
  retryOperation,
  processWithConcurrency,
  sequentialProcess,
  raceWithIndex
};