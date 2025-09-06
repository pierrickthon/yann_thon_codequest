/**
 * N00: JavaScript Fundamentals - Test Suite
 */

const { add, isEven, max, greet, countTo } = require('./solution.js');

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

  // Test add function
  test('add(2, 3) returns 5', () => {
    assertEqual(add(2, 3), 5);
  });

  test('add(-1, 1) returns 0', () => {
    assertEqual(add(-1, 1), 0);
  });

  // Test isEven function
  test('isEven(4) returns true', () => {
    assertEqual(isEven(4), true);
  });

  test('isEven(7) returns false', () => {
    assertEqual(isEven(7), false);
  });

  test('isEven(0) returns true', () => {
    assertEqual(isEven(0), true);
  });

  // Test max function
  test('max(5, 3) returns 5', () => {
    assertEqual(max(5, 3), 5);
  });

  test('max(-2, -8) returns -2', () => {
    assertEqual(max(-2, -8), -2);
  });

  test('max(10, 10) returns 10', () => {
    assertEqual(max(10, 10), 10);
  });

  // Test greet function
  test('greet("Alice") returns "Hello, Alice!"', () => {
    assertEqual(greet("Alice"), "Hello, Alice!");
  });

  test('greet() returns "Hello, World!"', () => {
    assertEqual(greet(), "Hello, World!");
  });

  // Test countTo function
  test('countTo(3) returns [1, 2, 3]', () => {
    assertDeepEqual(countTo(3), [1, 2, 3]);
  });

  test('countTo(0) returns []', () => {
    assertDeepEqual(countTo(0), []);
  });

  test('countTo(1) returns [1]', () => {
    assertDeepEqual(countTo(1), [1]);
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