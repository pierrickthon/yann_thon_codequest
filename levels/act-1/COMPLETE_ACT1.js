/**
 * Script to generate remaining Act I scenes quickly
 */

const fs = require('fs');
const path = require('path');

// N03: Destructuring & Spread
const N03 = {
  readme: `# N03: Destructuring, Rest/Spread 🎯

## Challenge
Implement mergeUserPrefs with destructuring and spread.

\`\`\`javascript
const defaults = { theme: 'light', lang: 'en', notifications: true };
const incoming = { theme: 'dark', beta: true };
mergeUserPrefs(defaults, incoming);
// => { theme: 'dark', lang: 'en', notifications: true, beta: true }
\`\`\`

## Rules
- Use destructuring in parameters
- Use spread for merging
- Incoming overrides defaults`,

  starter: `function mergeUserPrefs(defaults, incoming) {
  // TODO: Merge with spread, incoming wins
  // return { ...defaults, ...incoming };
}

module.exports = { mergeUserPrefs };`,

  test: `const { mergeUserPrefs } = require('./starter/destructuring');
console.log('🧪 N03: Destructuring Tests\\n');

const defaults = { theme: 'light', lang: 'en', notifications: true };
const incoming = { theme: 'dark', beta: true };
const result = mergeUserPrefs(defaults, incoming);

console.log(result.theme === 'dark' ? '✅ Theme overridden' : '❌ Theme fail');
console.log(result.lang === 'en' ? '✅ Default preserved' : '❌ Default fail');
console.log(result.beta === true ? '✅ New prop added' : '❌ New prop fail');
process.exit(0);`,

  solution: `function mergeUserPrefs(defaults, incoming) {
  return { ...defaults, ...incoming };
}
module.exports = { mergeUserPrefs };`
};

// N04: Collections & Transformations
const N04 = {
  readme: `# N04: Collections & Transformations 📊

## Challenge
Process orders to calculate totals and find top products.

\`\`\`javascript
const orders = [
  { product: 'Laptop', price: 1000, qty: 2 },
  { product: 'Mouse', price: 20, qty: 5 },
  { product: 'Keyboard', price: 80, qty: 3 }
];

summarizeOrders(orders);
// => {
//   totalHT: 2340,
//   tva: 468,
//   totalTTC: 2808,
//   topProducts: ['Laptop', 'Keyboard', 'Mouse']
// }
\`\`\`

## Rules
- Use map, filter, reduce
- TVA = 20% 
- Sort by total value (price * qty)`,

  starter: `function summarizeOrders(orders) {
  // TODO: Calculate totalHT (sum of price * qty)
  // TODO: Calculate TVA (20% of totalHT)
  // TODO: Calculate totalTTC (totalHT + TVA)
  // TODO: Get top 3 products by value
  
  return {
    totalHT: 0,
    tva: 0,
    totalTTC: 0,
    topProducts: []
  };
}

module.exports = { summarizeOrders };`,

  test: `const { summarizeOrders } = require('./starter/collections');
console.log('🧪 N04: Collections Tests\\n');

const orders = [
  { product: 'Laptop', price: 1000, qty: 2 },
  { product: 'Mouse', price: 20, qty: 5 },
  { product: 'Keyboard', price: 80, qty: 3 }
];

const result = summarizeOrders(orders);
console.log(result.totalHT === 2340 ? '✅ TotalHT correct' : '❌ TotalHT fail');
console.log(result.tva === 468 ? '✅ TVA correct' : '❌ TVA fail');
console.log(result.totalTTC === 2808 ? '✅ TotalTTC correct' : '❌ TotalTTC fail');
console.log(result.topProducts[0] === 'Laptop' ? '✅ Top product correct' : '❌ Top fail');
process.exit(0);`,

  solution: `function summarizeOrders(orders) {
  const totalHT = orders.reduce((sum, o) => sum + o.price * o.qty, 0);
  const tva = totalHT * 0.2;
  const totalTTC = totalHT + tva;
  
  const topProducts = orders
    .sort((a, b) => (b.price * b.qty) - (a.price * a.qty))
    .slice(0, 3)
    .map(o => o.product);
  
  return { totalHT, tva, totalTTC, topProducts };
}
module.exports = { summarizeOrders };`
};

// N05: Modules & Composition
const N05 = {
  readme: `# N05: Modules & Composition 🔧

## Challenge
Create composable scoring functions.

\`\`\`javascript
// Calculate score with bonuses
calcScore({ base: 100, timeBonus: 20, comboMultiplier: 1.5 });
// => 180 (base + timeBonus) * multiplier
\`\`\`

## Requirements
- Split into pure functions
- Each function does ONE thing
- Compose them together`,

  starter: `// TODO: Split into smaller functions
function addBonus(score, bonus) {
  // Add bonus to score
}

function applyMultiplier(score, multiplier) {
  // Multiply score
}

function calcScore({ base, timeBonus, comboMultiplier }) {
  // Compose functions to calculate final score
}

module.exports = { calcScore, addBonus, applyMultiplier };`,

  test: `const { calcScore } = require('./starter/modules');
console.log('🧪 N05: Modules Tests\\n');

const r1 = calcScore({ base: 100, timeBonus: 20, comboMultiplier: 1.5 });
console.log(r1 === 180 ? '✅ Score correct' : '❌ Score fail');

const r2 = calcScore({ base: 50, timeBonus: 0, comboMultiplier: 2 });
console.log(r2 === 100 ? '✅ No bonus works' : '❌ No bonus fail');
process.exit(0);`,

  solution: `function addBonus(score, bonus) {
  return score + bonus;
}

function applyMultiplier(score, multiplier) {
  return score * multiplier;
}

function calcScore({ base, timeBonus, comboMultiplier }) {
  const withBonus = addBonus(base, timeBonus);
  return applyMultiplier(withBonus, comboMultiplier);
}

module.exports = { calcScore, addBonus, applyMultiplier };`
};

// N06: Boss - Integration
const N06 = {
  readme: `# N06: BOSS - Daily Leaderboard 🏆

## Final Challenge
Build a leaderboard using ALL previous concepts!

\`\`\`javascript
const users = [
  { id: 1, first: 'Alice', last: 'Smith', role: 'player' },
  { id: 2, first: 'Bob', last: 'Jones', role: 'admin' }
];

const scores = [
  { userId: 1, base: 100, timeBonus: 20, combo: 1.5 },
  { userId: 2, base: 80, timeBonus: 40, combo: 2.0 }
];

generateLeaderboard(users, scores);
// => [
//   { rank: 1, name: 'ADMIN: Jones, Bob', score: 240 },
//   { rank: 2, name: 'PLAYER: Smith, Alice', score: 180 }
// ]
\`\`\`

## Use concepts from:
- N01: formatUser
- N02: Immutability
- N03: Destructuring
- N04: Transformations
- N05: Score calculation`,

  starter: `function generateLeaderboard(users, scores) {
  // TODO: Combine all concepts
  // 1. Calculate scores (like N05)
  // 2. Format names (like N01)
  // 3. Sort by score (like N04)
  // 4. Add rank
  // 5. Return top 5
  
  return [];
}

module.exports = { generateLeaderboard };`,

  test: `const { generateLeaderboard } = require('./starter/boss');
console.log('🧪 N06: BOSS Tests\\n');

const users = [
  { id: 1, first: 'Alice', last: 'Smith', role: 'player' },
  { id: 2, first: 'Bob', last: 'Jones', role: 'admin' }
];

const scores = [
  { userId: 1, base: 100, timeBonus: 20, combo: 1.5 },
  { userId: 2, base: 80, timeBonus: 40, combo: 2.0 }
];

const result = generateLeaderboard(users, scores);
console.log(result[0].rank === 1 ? '✅ Rank 1 correct' : '❌ Rank fail');
console.log(result[0].score === 240 ? '✅ Top score correct' : '❌ Score fail');
console.log(result[0].name.includes('Jones') ? '✅ Name formatted' : '❌ Name fail');
console.log(result.length <= 5 ? '✅ Top 5 limit' : '❌ Limit fail');
process.exit(0);`,

  solution: `function formatUser({ first, last, role }) {
  return \`\${role.toUpperCase()}: \${last}, \${first}\`;
}

function calcScore({ base, timeBonus, combo }) {
  return (base + timeBonus) * combo;
}

function generateLeaderboard(users, scores) {
  const userMap = Object.fromEntries(users.map(u => [u.id, u]));
  
  const leaderboard = scores
    .map(s => ({
      name: formatUser(userMap[s.userId]),
      score: calcScore(s)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((entry, index) => ({
      rank: index + 1,
      ...entry
    }));
  
  return leaderboard;
}

module.exports = { generateLeaderboard };`
};

// Write all files
const scenes = {
  'N03-destructuring': N03,
  'N04-collections': N04,
  'N05-modules': N05,
  'N06-boss': N06
};

Object.entries(scenes).forEach(([dir, content]) => {
  const basePath = path.join('levels', 'act-1', dir);
  
  fs.writeFileSync(path.join(basePath, 'README.md'), content.readme);
  fs.writeFileSync(path.join(basePath, 'starter', `${dir.split('-')[1]}.js`), content.starter);
  fs.writeFileSync(path.join(basePath, 'tests.spec.js'), content.test);
  fs.writeFileSync(path.join(basePath, 'solution', `${dir.split('-')[1]}.js`), content.solution);
  
  // Simple criteria for all
  fs.writeFileSync(path.join(basePath, 'criteria.json'), JSON.stringify({
    base: { description: "All tests pass", criteria: "testsPass" },
    bonus: { description: "Under 10 minutes", criteria: "timeSpent < 10" },
    challenge: { description: "No hints used", criteria: "hintsUsed === 0" }
  }, null, 2));
  
  console.log(`✅ Created ${dir}`);
});

console.log('\n🎉 Act I complete!');