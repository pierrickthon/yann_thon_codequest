/**
 * N03: Async Programming - Test Suite
 */

const { 
  delay,
  fetchWithTimeout,
  simulateFetch,
  retryOperation,
  processWithConcurrency,
  sequentialProcess,
  raceWithIndex
} = require('./solution.js');

async function runTests() {
  let passed = 0;
  let total = 0;

  function test(description, fn) {
    total++;
    return fn()
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

  // Test delay
  await test('delay waits for specified time', async () => {
    const start = Date.now();
    await delay(100);
    const elapsed = Date.now() - start;
    assert(elapsed >= 95, `Expected at least 95ms, got ${elapsed}ms`);
  });

  // Test fetchWithTimeout success
  await test('fetchWithTimeout resolves successfully', async () => {
    const result = await fetchWithTimeout('https://api.example.com/data', 2000);
    assert(result.status === 200, 'Expected status 200');
    assert(result.data.includes('Data from'), 'Expected data to contain "Data from"');
  });

  // Test fetchWithTimeout timeout
  await test('fetchWithTimeout handles timeout', async () => {
    try {
      await fetchWithTimeout('https://api.example.com/slow', 100);
      assert(false, 'Should have timed out');
    } catch (error) {
      assert(error.message === 'Request timeout', `Expected timeout error, got ${error.message}`);
    }
  });

  // Test retryOperation success
  await test('retryOperation succeeds on retry', async () => {
    let attempts = 0;
    const flaky = async () => {
      attempts++;
      if (attempts < 3) throw new Error('Flaky error');
      return 'success';
    };
    
    const result = await retryOperation(flaky, 5);
    assertEqual(result, 'success');
    assert(attempts === 3, `Expected 3 attempts, got ${attempts}`);
  });

  // Test retryOperation failure
  await test('retryOperation fails after max retries', async () => {
    const alwaysFails = async () => {
      throw new Error('Always fails');
    };
    
    try {
      await retryOperation(alwaysFails, 2);
      assert(false, 'Should have failed');
    } catch (error) {
      assertEqual(error.message, 'Always fails');
    }
  });

  // Test processWithConcurrency
  await test('processWithConcurrency limits concurrent operations', async () => {
    let concurrent = 0;
    let maxConcurrent = 0;
    
    const processor = async (item) => {
      concurrent++;
      maxConcurrent = Math.max(maxConcurrent, concurrent);
      await delay(50);
      concurrent--;
      return item * 2;
    };
    
    const items = [1, 2, 3, 4, 5, 6];
    const results = await processWithConcurrency(items, processor, 2);
    
    assert(maxConcurrent <= 2, `Expected max 2 concurrent, got ${maxConcurrent}`);
    assert(JSON.stringify(results) === JSON.stringify([2, 4, 6, 8, 10, 12]), 'Incorrect results');
  });

  // Test sequentialProcess
  await test('sequentialProcess processes items in order', async () => {
    const order = [];
    const processor = async (item) => {
      await delay(Math.random() * 50);
      order.push(item);
      return item;
    };
    
    const items = [1, 2, 3];
    await sequentialProcess(items, processor);
    
    assert(JSON.stringify(order) === JSON.stringify([1, 2, 3]), 'Items not processed in order');
  });

  // Test raceWithIndex
  await test('raceWithIndex returns first resolved with index', async () => {
    const promises = [
      delay(200).then(() => 'slow'),
      delay(50).then(() => 'fast'),
      delay(100).then(() => 'medium')
    ];
    
    const result = await raceWithIndex(promises);
    assertEqual(result.index, 1);
    assertEqual(result.result, 'fast');
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