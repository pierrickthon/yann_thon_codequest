#!/usr/bin/env node

/**
 * CodeQuest 2.3 - N00 Warmup Tutorial - Tests
 */

const { ping } = require('./starter.js');

console.log('🧪 N00 - Warmup Tutorial Tests\n');

let passed = 0;
let failed = 0;

function test(description, actual, expected) {
  if (actual === expected) {
    console.log(`✅ ${description}`);
    passed++;
  } else {
    console.log(`❌ ${description}`);
    console.log(`   Expected: "${expected}"`);
    console.log(`   Actual:   "${actual}"`);
    failed++;
  }
}

// Test cases
try {
  test('ping("hello") should return "pong: hello"', 
       ping("hello"), "pong: hello");
  
  test('ping("world") should return "pong: world"', 
       ping("world"), "pong: world");
  
  test('ping("CodeQuest") should return "pong: CodeQuest"', 
       ping("CodeQuest"), "pong: CodeQuest");
  
  test('ping("") should return "pong: "', 
       ping(""), "pong: ");
  
  test('ping("123") should return "pong: 123"', 
       ping("123"), "pong: 123");

  // Test function purity (no side effects)
  const originalLog = console.log;
  let logCalled = false;
  console.log = () => { logCalled = true; };
  
  ping("test");
  console.log = originalLog;
  
  test('Function should be pure (no console.log side effects)', 
       logCalled, false);

} catch (error) {
  console.log(`❌ Error running tests: ${error.message}`);
  failed++;
}

console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('🎉 All tests passed! Well done!');
  process.exit(0);
} else {
  console.log('💪 Keep going! Fix the failing tests.');
  process.exit(1);
}