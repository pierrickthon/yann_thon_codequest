/**
 * N00: System Check & Warm-up - Test Suite
 */

const { getEnvironment, warmUp } = require('./starter/index');

const startTime = Date.now();
let passed = 0;
let failed = 0;

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('🧪 N00: System Check & Warm-up Tests\n');

// Test getEnvironment
test('getEnvironment returns an object', () => {
  const env = getEnvironment();
  assert(typeof env === 'object' && env !== null, 'Should return an object');
});

test('getEnvironment includes node version', () => {
  const env = getEnvironment();
  assert(env.node, 'Should have node property');
  assert(env.node.startsWith('v'), 'Node version should start with v');
});

test('getEnvironment includes platform', () => {
  const env = getEnvironment();
  assert(env.platform, 'Should have platform property');
  assert(['linux', 'darwin', 'win32'].includes(env.platform), 
    'Platform should be linux, darwin, or win32');
});

test('getEnvironment indicates ready status', () => {
  const env = getEnvironment();
  assert(typeof env.ready === 'boolean', 'ready should be a boolean');
  
  // Check if Node version is >= 16
  const version = parseInt(process.version.slice(1).split('.')[0]);
  assert(env.ready === (version >= 16), 
    `ready should be ${version >= 16} for Node ${process.version}`);
});

// Test warmUp
test('warmUp returns welcome message with name', () => {
  const result = warmUp('Alice');
  assert(result === 'Welcome Alice to CodeQuest!', 
    `Expected "Welcome Alice to CodeQuest!" but got "${result}"`);
});

test('warmUp uses default name when no argument', () => {
  const result = warmUp();
  assert(result === 'Welcome Adventurer to CodeQuest!', 
    `Expected "Welcome Adventurer to CodeQuest!" but got "${result}"`);
});

// Environment check
test('Node.js version is 16 or higher', () => {
  const version = parseInt(process.version.slice(1).split('.')[0]);
  assert(version >= 16, `Node.js version ${process.version} is too old. Need v16+`);
});

// Summary
const elapsedTime = Date.now() - startTime;
console.log('\n' + '='.repeat(50));
console.log(`📊 Results: ${passed}/${passed + failed} tests passed`);
console.log(`⏱️  Time: ${elapsedTime}ms`);

if (failed === 0) {
  console.log('🎉 All tests passed! Well done!');
  
  // Check for bonus/challenge criteria
  if (elapsedTime < 3 * 60 * 1000) { // Less than 3 minutes
    console.log('🏆 Challenge achieved: Completed in under 3 minutes!');
  }
  
  process.exit(0);
} else {
  console.log('❌ Some tests failed. Keep trying!');
  console.log('💡 Hint: Use `cq help-me N00` if you need help');
  process.exit(1);
}