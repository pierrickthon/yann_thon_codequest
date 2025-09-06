/**
 * N06: TDD Methodology - Comprehensive Test Suite
 * 
 * This test suite demonstrates TDD principles:
 * - Tests are written before implementation
 * - Tests cover both happy path and edge cases
 * - Tests guide the design of the implementation
 */

const { Calculator, ScientificCalculator } = require('./solution.js');

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

  function assertThrows(fn, expectedMessage, message) {
    try {
      fn();
      assert(false, message || 'Expected function to throw');
    } catch (error) {
      if (expectedMessage && !error.message.includes(expectedMessage)) {
        assert(false, `Expected error containing "${expectedMessage}", got "${error.message}"`);
      }
    }
  }

  console.log('🧪 Testing Calculator with TDD approach\n');

  // Test Calculator instantiation
  test('Calculator can be instantiated', () => {
    const calc = new Calculator();
    assert(calc instanceof Calculator, 'Should create Calculator instance');
    assertEqual(calc.memory, 0, 'Memory should start at 0');
  });

  // Test basic arithmetic operations
  test('Calculator.add() adds two numbers', () => {
    const calc = new Calculator();
    assertEqual(calc.add(2, 3), 5, 'Should add positive numbers');
    assertEqual(calc.add(-1, 1), 0, 'Should handle negative numbers');
    assertEqual(calc.add(0.1, 0.2), 0.30000000000000004, 'Should handle decimals'); // Floating point reality
  });

  test('Calculator.subtract() subtracts two numbers', () => {
    const calc = new Calculator();
    assertEqual(calc.subtract(5, 3), 2, 'Should subtract numbers');
    assertEqual(calc.subtract(3, 5), -2, 'Should handle negative results');
  });

  test('Calculator.multiply() multiplies two numbers', () => {
    const calc = new Calculator();
    assertEqual(calc.multiply(3, 4), 12, 'Should multiply positive numbers');
    assertEqual(calc.multiply(-2, 3), -6, 'Should handle negative numbers');
    assertEqual(calc.multiply(0, 5), 0, 'Should handle zero');
  });

  test('Calculator.divide() divides two numbers', () => {
    const calc = new Calculator();
    assertEqual(calc.divide(6, 2), 3, 'Should divide evenly');
    assertEqual(calc.divide(5, 2), 2.5, 'Should handle decimal results');
  });

  test('Calculator.divide() throws error for division by zero', () => {
    const calc = new Calculator();
    assertThrows(
      () => calc.divide(5, 0),
      'Division by zero is not allowed',
      'Should throw error for division by zero'
    );
  });

  test('Calculator.power() calculates exponentiation', () => {
    const calc = new Calculator();
    assertEqual(calc.power(2, 3), 8, 'Should calculate 2^3');
    assertEqual(calc.power(5, 0), 1, 'Should handle exponent 0');
    assertEqual(calc.power(2, -1), 0.5, 'Should handle negative exponents');
  });

  test('Calculator.sqrt() calculates square root', () => {
    const calc = new Calculator();
    assertEqual(calc.sqrt(9), 3, 'Should calculate square root of 9');
    assertEqual(calc.sqrt(0), 0, 'Should handle zero');
  });

  test('Calculator.sqrt() throws error for negative numbers', () => {
    const calc = new Calculator();
    assertThrows(
      () => calc.sqrt(-1),
      'Cannot calculate square root of negative number',
      'Should throw error for negative input'
    );
  });

  // Test input validation
  test('Calculator validates numeric inputs', () => {
    const calc = new Calculator();
    assertThrows(() => calc.add('a', 2), 'All inputs must be valid numbers');
    assertThrows(() => calc.add(2, NaN), 'All inputs must be valid numbers');
    assertThrows(() => calc.subtract(null, 2), 'All inputs must be valid numbers');
  });

  // Test memory functions
  test('Calculator memory functions work correctly', () => {
    const calc = new Calculator();
    
    // Initial memory should be 0
    assertEqual(calc.memoryRecall(), 0, 'Memory should start at 0');
    
    // Store value in memory
    calc.memoryStore(42);
    assertEqual(calc.memoryRecall(), 42, 'Should recall stored value');
    
    // Clear memory
    calc.memoryClear();
    assertEqual(calc.memoryRecall(), 0, 'Memory should be cleared');
  });

  // Test history functions
  test('Calculator tracks operation history', () => {
    const calc = new Calculator();
    
    // Initially empty
    assertEqual(calc.getHistory().length, 0, 'History should start empty');
    
    // Perform operations
    calc.add(2, 3);
    calc.multiply(4, 5);
    
    const history = calc.getHistory();
    assertEqual(history.length, 2, 'Should track 2 operations');
    assertEqual(history[0].operation, 'add', 'Should record operation type');
    assertEqual(history[0].result, 5, 'Should record result');
    
    // Clear history
    calc.clearHistory();
    assertEqual(calc.getHistory().length, 0, 'History should be cleared');
  });

  // Test ScientificCalculator
  test('ScientificCalculator extends Calculator', () => {
    const calc = new ScientificCalculator();
    assert(calc instanceof Calculator, 'Should inherit from Calculator');
    assert(calc instanceof ScientificCalculator, 'Should be ScientificCalculator instance');
  });

  test('ScientificCalculator.sin() calculates sine', () => {
    const calc = new ScientificCalculator();
    assertEqual(calc.sin(0), 0, 'sin(0) should be 0');
    
    // Test with π/2 (should be close to 1)
    const result = calc.sin(Math.PI / 2);
    assert(Math.abs(result - 1) < 1e-10, `sin(π/2) should be close to 1, got ${result}`);
  });

  test('ScientificCalculator.cos() calculates cosine', () => {
    const calc = new ScientificCalculator();
    assertEqual(calc.cos(0), 1, 'cos(0) should be 1');
    
    // Test with π/2 (should be close to 0)
    const result = calc.cos(Math.PI / 2);
    assert(Math.abs(result) < 1e-10, `cos(π/2) should be close to 0, got ${result}`);
  });

  test('ScientificCalculator.log() calculates natural logarithm', () => {
    const calc = new ScientificCalculator();
    assertEqual(calc.log(1), 0, 'log(1) should be 0');
    assert(Math.abs(calc.log(Math.E) - 1) < 1e-10, 'log(e) should be close to 1');
  });

  test('ScientificCalculator.log() throws error for invalid inputs', () => {
    const calc = new ScientificCalculator();
    assertThrows(() => calc.log(0), 'Logarithm undefined for non-positive numbers');
    assertThrows(() => calc.log(-1), 'Logarithm undefined for non-positive numbers');
  });

  // Test scientific calculator inherits basic functionality
  test('ScientificCalculator inherits basic operations', () => {
    const calc = new ScientificCalculator();
    assertEqual(calc.add(2, 3), 5, 'Should inherit add operation');
    assertEqual(calc.divide(6, 2), 3, 'Should inherit divide operation');
  });

  // Test that scientific operations are recorded in history
  test('ScientificCalculator records scientific operations in history', () => {
    const calc = new ScientificCalculator();
    
    calc.sin(0);
    calc.log(Math.E);
    
    const history = calc.getHistory();
    assertEqual(history.length, 2, 'Should record scientific operations');
    assertEqual(history[0].operation, 'sin', 'Should record sin operation');
    assertEqual(history[1].operation, 'log', 'Should record log operation');
  });

  console.log(`\n📊 Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All tests passed! TDD methodology successfully applied!');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed');
    process.exit(1);
  }
}

runTests();