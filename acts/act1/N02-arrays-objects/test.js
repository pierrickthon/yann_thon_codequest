/**
 * N02: Arrays & Objects - Test Suite
 */

const { 
  findUsersOlderThan,
  groupBy,
  pickProperties,
  flattenArray,
  mergeObjects,
  deepClone,
  multiSort
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

  function assertDeepEqual(actual, expected, message) {
    assert(
      JSON.stringify(actual) === JSON.stringify(expected),
      message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }

  const users = [
    { name: 'Alice', age: 25, city: 'Paris' },
    { name: 'Bob', age: 30, city: 'London' },
    { name: 'Charlie', age: 20, city: 'Paris' },
    { name: 'Diana', age: 35, city: 'London' }
  ];

  // Test findUsersOlderThan
  test('findUsersOlderThan filters correctly', () => {
    const result = findUsersOlderThan(users, 25);
    assertDeepEqual(result, [
      { name: 'Bob', age: 30, city: 'London' },
      { name: 'Diana', age: 35, city: 'London' }
    ]);
  });

  // Test groupBy
  test('groupBy groups users by city', () => {
    const result = groupBy(users, 'city');
    assertDeepEqual(result, {
      'Paris': [
        { name: 'Alice', age: 25, city: 'Paris' },
        { name: 'Charlie', age: 20, city: 'Paris' }
      ],
      'London': [
        { name: 'Bob', age: 30, city: 'London' },
        { name: 'Diana', age: 35, city: 'London' }
      ]
    });
  });

  // Test pickProperties
  test('pickProperties selects specified fields', () => {
    const result = pickProperties(users, ['name', 'age']);
    assertDeepEqual(result, [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 20 },
      { name: 'Diana', age: 35 }
    ]);
  });

  // Test flattenArray
  test('flattenArray flattens nested arrays', () => {
    const nested = [1, [2, 3], [4, [5, 6]]];
    assertDeepEqual(flattenArray(nested), [1, 2, 3, 4, 5, 6]);
  });

  // Test mergeObjects
  test('mergeObjects merges multiple objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const obj3 = { c: 5, d: 6 };
    assertDeepEqual(mergeObjects(obj1, obj2, obj3), { a: 1, b: 3, c: 5, d: 6 });
  });

  // Test deepClone
  test('deepClone creates independent copy', () => {
    const original = { a: 1, b: { c: 2 } };
    const cloned = deepClone(original);
    cloned.b.c = 3;
    
    assert(original.b.c === 2, 'Original should not be modified');
    assert(cloned.b.c === 3, 'Clone should be modified');
  });

  // Test multiSort
  test('multiSort sorts by multiple criteria', () => {
    const data = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 25 },
      { name: 'Alice', age: 30 }
    ];
    const sorted = multiSort(data, ['age', 'name']);
    assertDeepEqual(sorted, [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 25 },
      { name: 'Alice', age: 30 }
    ]);
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