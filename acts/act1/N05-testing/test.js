/**
 * N05: Testing Fundamentals - Test Suite
 */

const { 
  assert,
  assertEqual,
  assertDeepEqual,
  TestRunner,
  createMock,
  TestSuite,
  spy
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

  // Test basic assert
  await test('assert passes for true condition', () => {
    assert(true, 'Should not throw');
  });

  await test('assert throws for false condition', () => {
    try {
      assert(false, 'Custom message');
      throw new Error('Should have thrown');
    } catch (error) {
      if (error.message !== 'Custom message') {
        throw new Error(`Expected 'Custom message', got '${error.message}'`);
      }
    }
  });

  // Test assertEqual
  await test('assertEqual passes for equal values', () => {
    assertEqual(5, 5);
    assertEqual('hello', 'hello');
  });

  await test('assertEqual throws for unequal values', () => {
    try {
      assertEqual(5, 10);
      throw new Error('Should have thrown');
    } catch (error) {
      if (!error.message.includes('Expected 10, got 5')) {
        throw new Error(`Unexpected error message: ${error.message}`);
      }
    }
  });

  // Test assertDeepEqual
  await test('assertDeepEqual passes for equal objects', () => {
    assertDeepEqual([1, 2, 3], [1, 2, 3]);
    assertDeepEqual({a: 1, b: 2}, {a: 1, b: 2});
  });

  // Test TestRunner
  await test('TestRunner executes tests correctly', async () => {
    const runner = new TestRunner();
    
    runner.describe('Sample Suite', () => {
      runner.it('should pass', () => {
        assert(true);
      });
      
      runner.it('should also pass', () => {
        assertEqual(2 + 2, 4);
      });
    });
    
    const results = await runner.run();
    assert(results.passed === 2, `Expected 2 passed, got ${results.passed}`);
    assert(results.failed === 0, `Expected 0 failed, got ${results.failed}`);
  });

  // Test createMock
  await test('createMock tracks function calls', () => {
    const mock = createMock((x) => x * 2);
    
    const result1 = mock(5);
    const result2 = mock(10);
    
    assert(result1 === 10, 'Mock should execute implementation');
    assert(result2 === 20, 'Mock should execute implementation');
    assert(mock.callCount() === 2, 'Should track call count');
    assert(mock.calledWith(5), 'Should track specific calls');
  });

  // Test TestSuite with hooks
  await test('TestSuite executes hooks correctly', async () => {
    const suite = new TestSuite();
    let setupCalled = false;
    let teardownCalled = false;
    
    suite.beforeEach(() => { setupCalled = true; });
    suite.afterEach(() => { teardownCalled = true; });
    
    await suite.runTest(() => {
      assert(setupCalled, 'Setup should be called before test');
    });
    
    assert(teardownCalled, 'Teardown should be called after test');
  });

  // Test spy function
  await test('spy tracks calls to existing methods', () => {
    const obj = {
      greet: (name) => `Hello, ${name}!`
    };
    
    const greetSpy = spy(obj, 'greet');
    
    const result = obj.greet('Alice');
    
    assert(result === 'Hello, Alice!', 'Spy should preserve original behavior');
    assert(greetSpy.calls.length === 1, 'Spy should track calls');
    assert(greetSpy.calls[0].args[0] === 'Alice', 'Spy should track arguments');
    
    greetSpy.restore();
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