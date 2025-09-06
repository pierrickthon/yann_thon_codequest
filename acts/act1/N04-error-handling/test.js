/**
 * N04: Error Handling - Test Suite
 */

const { 
  ValidationError,
  NetworkError,
  validateUser,
  safeDivide,
  processWithErrorCollection,
  safeAsyncCall,
  safeJsonParse,
  withErrorBoundary,
  CircuitBreaker
} = require('./solution.js');

async function runTests() {
  let passed = 0;
  let total = 0;

  function test(description, fn) {
    total++;
    return Promise.resolve()
      .then(fn)
      .then(() => {
        console.log(`✅ ${description}`);
        passed++;
      })
      .catch(error => {
        console.log(`❌ ${description}: ${error.message}`);
      });
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  function assertEqual(actual, expected, message) {
    assert(actual === expected, message || `Expected ${expected}, got ${actual}`);
  }

  // Test ValidationError
  await test('ValidationError has correct properties', () => {
    const error = new ValidationError('Invalid email', 'email');
    assertEqual(error.name, 'ValidationError');
    assertEqual(error.message, 'Invalid email');
    assertEqual(error.field, 'email');
    assert(error instanceof Error, 'Should be instance of Error');
  });

  // Test NetworkError
  await test('NetworkError has correct properties', () => {
    const error = new NetworkError('Server error', 500);
    assertEqual(error.name, 'NetworkError');
    assertEqual(error.statusCode, 500);
  });

  // Test validateUser success
  await test('validateUser accepts valid user', () => {
    const user = { name: 'Alice', email: 'alice@example.com', age: 25 };
    const result = validateUser(user);
    assertEqual(result.name, 'Alice');
  });

  // Test validateUser validation errors
  await test('validateUser throws ValidationError for invalid email', () => {
    try {
      validateUser({ name: 'Alice', email: 'invalid-email', age: 25 });
      assert(false, 'Should have thrown ValidationError');
    } catch (error) {
      assert(error instanceof ValidationError, 'Should be ValidationError');
      assertEqual(error.field, 'email');
    }
  });

  // Test safeDivide success
  await test('safeDivide returns successful result', () => {
    const result = safeDivide(10, 2);
    assert(result.success === true, 'Should be successful');
    assertEqual(result.value, 5);
  });

  // Test safeDivide error
  await test('safeDivide handles division by zero', () => {
    const result = safeDivide(10, 0);
    assert(result.success === false, 'Should not be successful');
    assert(result.error.includes('Division by zero'), 'Should contain error message');
  });

  // Test processWithErrorCollection
  await test('processWithErrorCollection collects results and errors', () => {
    const processor = (x) => {
      if (x < 0) throw new Error('Negative number');
      return x * 2;
    };
    
    const result = processWithErrorCollection([1, -2, 3, -4, 5], processor);
    
    assertEqual(result.results.length, 3);
    assertEqual(result.errors.length, 2);
    assertEqual(result.results[0].result, 2);
    assert(result.errors[0].error.includes('Negative number'));
  });

  // Test safeAsyncCall success
  await test('safeAsyncCall returns result on success', async () => {
    const operation = async () => 'success';
    const result = await safeAsyncCall(operation, 'fallback');
    assertEqual(result, 'success');
  });

  // Test safeAsyncCall fallback
  await test('safeAsyncCall returns fallback on error', async () => {
    const operation = async () => { throw new Error('Failed'); };
    const result = await safeAsyncCall(operation, 'fallback');
    assertEqual(result, 'fallback');
  });

  // Test safeJsonParse success
  await test('safeJsonParse parses valid JSON', () => {
    const result = safeJsonParse('{"name": "Alice"}');
    assert(result.success === true, 'Should be successful');
    assertEqual(result.data.name, 'Alice');
  });

  // Test safeJsonParse error
  await test('safeJsonParse handles invalid JSON', () => {
    const result = safeJsonParse('{"name": }');
    assert(result.success === false, 'Should not be successful');
    assert(result.error.message, 'Should have error message');
  });

  // Test withErrorBoundary
  await test('withErrorBoundary catches and re-throws errors', () => {
    const faultyFunction = () => { throw new Error('Test error'); };
    const wrapped = withErrorBoundary(faultyFunction);
    
    try {
      wrapped();
      assert(false, 'Should have thrown error');
    } catch (error) {
      assertEqual(error.message, 'Test error');
    }
  });

  // Test CircuitBreaker
  await test('CircuitBreaker opens after threshold failures', async () => {
    const breaker = new CircuitBreaker(2, 1000);
    const failingOperation = async () => { throw new Error('Operation failed'); };
    
    // First failure
    try { await breaker.execute(failingOperation); } catch {}
    // Second failure - should open circuit
    try { await breaker.execute(failingOperation); } catch {}
    
    // Third attempt should fail immediately
    try {
      await breaker.execute(failingOperation);
      assert(false, 'Should have failed due to open circuit');
    } catch (error) {
      assert(error.message.includes('Circuit breaker is OPEN'), 'Should be circuit breaker error');
    }
  });

  console.log(`\n📊 Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed');
    process.exit(1);
  }
}

runTests().catch(console.error);