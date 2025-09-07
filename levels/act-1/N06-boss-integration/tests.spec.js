#!/usr/bin/env node

const { generateScoreboard } = require('./starter.js');

console.log('🧪 N06 - Boss Integration Tests\n');

let passed = 0, failed = 0;

function test(desc, actual, expected) {
  const match = JSON.stringify(actual) === JSON.stringify(expected);
  if (match) {
    console.log(`✅ ${desc}`);
    passed++;
  } else {
    console.log(`❌ ${desc}`);
    console.log(`   Expected: ${JSON.stringify(expected, null, 2)}`);
    console.log(`   Actual:   ${JSON.stringify(actual, null, 2)}`);
    failed++;
  }
}

try {
  const players1 = [
    { name: 'Alice', score: 100, bonus: 20 },
    { name: 'Bob', score: 80, bonus: 40 },
    { name: 'Charlie', score: 120, bonus: 0 }
  ];
  
  const expected1 = [
    { rank: 1, name: 'Alice', total: 120 },
    { rank: 1, name: 'Bob', total: 120 },
    { rank: 1, name: 'Charlie', total: 120 }
  ];
  
  // Note: En cas d'égalité, on peut accepter différents ordres
  const result1 = generateScoreboard(players1);
  const hasCorrectTotals = result1.every(p => 
    (p.name === 'Alice' && p.total === 120) ||
    (p.name === 'Bob' && p.total === 120) ||  
    (p.name === 'Charlie' && p.total === 120)
  );
  
  test('Correct totals calculated', hasCorrectTotals, true);
  test('All ranks assigned', result1.every(p => p.rank >= 1), true);
  test('Length preserved', result1.length, 3);

  // Test with clear ranking
  const players2 = [
    { name: 'Winner', score: 200, bonus: 0 },
    { name: 'Runner', score: 100, bonus: 50 },
    { name: 'Third', score: 100, bonus: 0 }
  ];
  
  const result2 = generateScoreboard(players2);
  test('Winner has rank 1', result2.find(p => p.name === 'Winner').rank, 1);
  test('Winner total correct', result2.find(p => p.name === 'Winner').total, 200);

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('\n🏆 BOSS DEFEATED! Act I completed! 🎉');
    console.log('🚀 Ready for Act II: Async/Await & APIs!');
  }
  
  process.exit(failed === 0 ? 0 : 1);
} catch (error) {
  console.log(`❌ Error: ${error.message}`);
  process.exit(1);
}