/**
 * N05: Testing Fundamentals - Solution Template
 */

/**
 * Simple assertion function
 * @param {boolean} condition - Condition to assert
 * @param {string} message - Error message
 */
function assert(condition, message = 'Assertion failed') {
  // TODO: Implement basic assertion
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * Assert equality with better error messages
 * @param {any} actual - Actual value
 * @param {any} expected - Expected value
 * @param {string} message - Custom message
 */
function assertEqual(actual, expected, message) {
  // TODO: Implement equality assertion with detailed message
  const defaultMessage = `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`;
  assert(actual === expected, message || defaultMessage);
}

/**
 * Assert deep equality for objects/arrays
 * @param {any} actual - Actual value
 * @param {any} expected - Expected value
 * @param {string} message - Custom message
 */
function assertDeepEqual(actual, expected, message) {
  // TODO: Implement deep equality assertion
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  const defaultMessage = `Expected ${expectedStr}, got ${actualStr}`;
  assert(actualStr === expectedStr, message || defaultMessage);
}

/**
 * Simple test framework implementation
 */
class TestRunner {
  constructor() {
    this.tests = [];
    this.currentSuite = null;
    this.stats = { passed: 0, failed: 0, total: 0 };
  }

  /**
   * Groups tests into suites
   * @param {string} suiteName - Name of test suite
   * @param {function} suiteFunction - Function containing tests
   */
  describe(suiteName, suiteFunction) {
    // TODO: Implement test suite grouping
    console.log(`\n📋 ${suiteName}`);
    this.currentSuite = suiteName;
    suiteFunction();
    this.currentSuite = null;
  }

  /**
   * Defines individual test
   * @param {string} testName - Name of test
   * @param {function} testFunction - Test function
   */
  it(testName, testFunction) {
    // TODO: Implement individual test definition
    this.tests.push({
      suite: this.currentSuite,
      name: testName,
      fn: testFunction
    });
  }

  /**
   * Runs all defined tests
   * @returns {object} Test results
   */
  async run() {
    // TODO: Execute all tests and collect results
    console.log('🚀 Running tests...\n');
    
    for (const test of this.tests) {
      this.stats.total++;
      try {
        await test.fn();
        console.log(`  ✅ ${test.name}`);
        this.stats.passed++;
      } catch (error) {
        console.log(`  ❌ ${test.name}: ${error.message}`);
        this.stats.failed++;
      }
    }

    this.printResults();
    return this.stats;
  }

  printResults() {
    console.log(`\n📊 Test Results:`);
    console.log(`Total: ${this.stats.total}`);
    console.log(`Passed: ${this.stats.passed}`);
    console.log(`Failed: ${this.stats.failed}`);
    
    if (this.stats.failed === 0) {
      console.log('🎉 All tests passed!');
    } else {
      console.log('❌ Some tests failed');
    }
  }
}

/**
 * Mock function implementation
 * @param {function} implementation - Optional implementation
 * @returns {object} Mock function with tracking
 */
function createMock(implementation) {
  // TODO: Create mock function with call tracking
  const mock = implementation || (() => undefined);
  const calls = [];
  
  const mockFn = function(...args) {
    calls.push({ args, timestamp: Date.now() });
    return mock.apply(this, args);
  };
  
  mockFn.calls = calls;
  mockFn.callCount = () => calls.length;
  mockFn.calledWith = (...args) => {
    return calls.some(call => 
      call.args.length === args.length && 
      call.args.every((arg, i) => arg === args[i])
    );
  };
  
  return mockFn;
}

/**
 * Test setup and teardown utilities
 */
class TestSuite {
  constructor() {
    this.beforeEachHooks = [];
    this.afterEachHooks = [];
  }

  /**
   * Add setup hook
   * @param {function} hook - Setup function
   */
  beforeEach(hook) {
    // TODO: Add before each hook
    this.beforeEachHooks.push(hook);
  }

  /**
   * Add teardown hook
   * @param {function} hook - Teardown function
   */
  afterEach(hook) {
    // TODO: Add after each hook
    this.afterEachHooks.push(hook);
  }

  /**
   * Run test with setup/teardown
   * @param {function} testFn - Test function
   */
  async runTest(testFn) {
    // TODO: Execute hooks around test
    try {
      // Run setup
      for (const hook of this.beforeEachHooks) {
        await hook();
      }
      
      // Run test
      await testFn();
      
    } finally {
      // Run teardown
      for (const hook of this.afterEachHooks) {
        await hook();
      }
    }
  }
}

/**
 * Spy function that wraps existing function
 * @param {object} obj - Object containing method
 * @param {string} methodName - Method name to spy on
 * @returns {object} Spy with tracking
 */
function spy(obj, methodName) {
  // TODO: Create spy that tracks calls to existing method
  const original = obj[methodName];
  const calls = [];
  
  obj[methodName] = function(...args) {
    calls.push({ args, timestamp: Date.now() });
    return original.apply(this, args);
  };
  
  obj[methodName].calls = calls;
  obj[methodName].restore = () => {
    obj[methodName] = original;
  };
  
  return obj[methodName];
}

// Export testing utilities
module.exports = {
  assert,
  assertEqual,
  assertDeepEqual,
  TestRunner,
  createMock,
  TestSuite,
  spy
};