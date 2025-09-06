/**
 * N01: Functions & Scope - Test Suite
 */

const { 
  createCounter, 
  multiplyBy, 
  filterBy, 
  reduceArray, 
  compose, 
  memoize, 
  bindContext 
} = require('./solution.js');

function runTests() {
  let passed = 0;
  let total = 0;

  function test(description, fn) {
    total++;
    try {
      fn();
      console.log(`✅ ${description}`);
      passed++;
    } catch (error) {
      console.log(`❌ ${description}: ${error.message}`);
    }
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  function assertEqual(actual, expected, message) {
    assert(actual === expected, message || `Expected ${expected}, got ${actual}`);
  }

  function assertDeepEqual(actual, expected, message) {
    assert(
      JSON.stringify(actual) === JSON.stringify(expected),
      message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }

  // Test createCounter
  test('createCounter creates working counter', () => {
    const counter = createCounter(5);
    assertEqual(counter(), 6);
    assertEqual(counter(), 7);
  });

  test('createCounter with default start', () => {
    const counter = createCounter();
    assertEqual(counter(), 1);
  });

  // Test multiplyBy
  test('multiplyBy multiplies all numbers', () => {
    assertDeepEqual(multiplyBy([1, 2, 3], 2), [2, 4, 6]);
  });

  test('multiplyBy handles empty array', () => {
    assertDeepEqual(multiplyBy([], 5), []);
  });

  // Test filterBy
  test('filterBy filters with predicate', () => {
    const isEven = x => x % 2 === 0;
    assertDeepEqual(filterBy([1, 2, 3, 4], isEven), [2, 4]);
  });

  // Test reduceArray
  test('reduceArray sums numbers', () => {
    const sum = (acc, curr) => acc + curr;
    assertEqual(reduceArray([1, 2, 3, 4], sum, 0), 10);
  });

  // Test compose
  test('compose combines functions', () => {
    const add1 = x => x + 1;
    const double = x => x * 2;
    const add1ThenDouble = compose(double, add1);
    assertEqual(add1ThenDouble(3), 8); // (3 + 1) * 2
  });

  // Test memoize
  test('memoize caches results', () => {
    let callCount = 0;
    const expensive = (n) => {
      callCount++;
      return n * n;
    };
    
    const memoized = memoize(expensive);
    assertEqual(memoized(5), 25);
    assertEqual(memoized(5), 25);
    assertEqual(callCount, 1); // Should only be called once
  });

  // Test bindContext
  test('bindContext binds this correctly', () => {
    const obj = { value: 10 };
    function getValue() {
      return this.value;
    }
    
    const bound = bindContext(getValue, obj);
    assertEqual(bound(), 10);
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

runTests();