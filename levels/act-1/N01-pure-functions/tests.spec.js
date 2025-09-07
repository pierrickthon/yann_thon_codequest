#!/usr/bin/env node

/**
 * CodeQuest 2.3 - N01 Pure Functions - Tests
 */

const { add, isEven, sum } = require('./starter.js');

console.log('🧪 N01 - Pure Functions Tests\n');

let passed = 0;
let failed = 0;

function test(description, actual, expected) {
  if (actual === expected) {
    console.log(`✅ ${description}`);
    passed++;
  } else {
    console.log(`❌ ${description}`);
    console.log(`   Expected: ${expected}`);
    console.log(`   Actual:   ${actual}`);
    failed++;
  }
}

// Test add function
try {
  console.log('📋 Testing add(a, b)...');
  test('add(2, 3) should return 5', add(2, 3), 5);
  test('add(0, 0) should return 0', add(0, 0), 0);
  test('add(-1, 1) should return 0', add(-1, 1), 0);
  test('add(10, -5) should return 5', add(10, -5), 5);
  test('add(0.1, 0.2) should be close to 0.3', 
       Math.abs(add(0.1, 0.2) - 0.3) < 0.001, true);
} catch (error) {
  console.log(`❌ Error testing add: ${error.message}`);
  failed++;
}

console.log();

// Test isEven function
try {
  console.log('📋 Testing isEven(n)...');
  test('isEven(4) should return true', isEven(4), true);
  test('isEven(3) should return false', isEven(3), false);
  test('isEven(0) should return true', isEven(0), true);
  test('isEven(-2) should return true', isEven(-2), true);
  test('isEven(-1) should return false', isEven(-1), false);
  test('isEven(100) should return true', isEven(100), true);
} catch (error) {
  console.log(`❌ Error testing isEven: ${error.message}`);
  failed++;
}

console.log();

// Test sum function
try {
  console.log('📋 Testing sum(arr)...');
  test('sum([1, 2, 3]) should return 6', sum([1, 2, 3]), 6);
  test('sum([]) should return 0', sum([]), 0);
  test('sum([5]) should return 5', sum([5]), 5);
  test('sum([5, -2, 7]) should return 10', sum([5, -2, 7]), 10);
  test('sum([-1, -2, -3]) should return -6', sum([-1, -2, -3]), -6);
} catch (error) {
  console.log(`❌ Error testing sum: ${error.message}`);
  failed++;
}

console.log();

// Test function purity (no side effects)
try {
  console.log('📋 Testing function purity...');
  
  const originalLog = console.log;
  let logCalled = false;
  console.log = () => { logCalled = true; };
  
  // Call all functions to check for side effects
  add(1, 2);
  isEven(4);
  sum([1, 2, 3]);
  
  console.log = originalLog;
  
  test('Functions should be pure (no console.log side effects)', 
       logCalled, false);

  // Test determinism (same input = same output)
  const result1 = add(5, 3);
  const result2 = add(5, 3);
  test('Functions should be deterministic (add)', result1, result2);

  const result3 = isEven(7);
  const result4 = isEven(7);
  test('Functions should be deterministic (isEven)', result3, result4);

} catch (error) {
  console.log(`❌ Error testing purity: ${error.message}`);
  failed++;
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All tests passed! Pure functions mastered! 🧪');
  process.exit(0);
} else {
  console.log('💪 Keep going! Pure functions are worth it!');
  process.exit(1);
}