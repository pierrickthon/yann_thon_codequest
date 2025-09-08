#!/usr/bin/env node
const { extractName, mergeObjects, setDefault } = require('./starter.js');

console.log('🧪 N02 - Destructuring Tests\n');

let passed = 0, failed = 0;

function test(desc, actual, expected) {
  const match = typeof expected === 'object' 
    ? JSON.stringify(actual) === JSON.stringify(expected)
    : actual === expected;
    
  if (match) {
    console.log(`✅ ${desc}`);
    passed++;
  } else {
    console.log(`❌ ${desc}`);
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Actual:   ${JSON.stringify(actual)}`);
    failed++;
  }
}

// Test immutability with Object.freeze
const frozenUser = Object.freeze({ name: 'Alice', age: 25 });
const frozenObj1 = Object.freeze({ a: 1, b: 2 });
const frozenObj2 = Object.freeze({ b: 3, c: 4 });
const frozenConfig = Object.freeze({ theme: 'dark' });

try {
  test('extractName frozen object', extractName(frozenUser), 'Alice');
  test('mergeObjects frozen objects', 
       mergeObjects(frozenObj1, frozenObj2), 
       { a: 1, b: 3, c: 4 });
  test('setDefault frozen config',
       setDefault(frozenConfig),
       { lang: 'en', debug: false, theme: 'dark' });
       
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  process.exit(failed === 0 ? 0 : 1);
} catch (error) {
  console.log(`❌ Mutation detected: ${error.message}`);
  process.exit(1);
}