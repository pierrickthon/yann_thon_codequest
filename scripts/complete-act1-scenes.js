#!/usr/bin/env node

/**
 * Complete Act I scenes with missing files
 */

const fs = require('fs');
const path = require('path');

// Complete scene definitions
const completions = {
  'N03-map-filter': {
    readme: `# 🔀 N03 - Map/Filter Pipeline

## 🎯 Objectifs  
- ✅ **Transformer** données avec \`.map()\`
- ✅ **Filtrer** éléments avec \`.filter()\` 
- ✅ **Chaîner** opérations en pipeline propre
- ✅ **Éviter** boucles for classiques
- ✅ **Composer** fonctions sans if explicites

## 📝 Missions

### 1. \`doubleNumbers(numbers)\`
Double tous les nombres d'un tableau.

### 2. \`filterEven(numbers)\`  
Filtre les nombres pairs uniquement.

### 3. \`evenDoubled(numbers)\`
Pipeline : garde les pairs ET les double.

### Exemples
\`\`\`javascript
doubleNumbers([1, 2, 3])    // → [2, 4, 6]
filterEven([1, 2, 3, 4])    // → [2, 4] 
evenDoubled([1, 2, 3, 4])   // → [4, 8]
\`\`\`

## ⚡ Contraintes
- ✅ **Pipeline** : chaîner \`.filter().map()\`
- ✅ **Pas de boucles for** explicites
- ✅ **Fonctions pures** : pas d'effets de bord
- ✅ **Prédicats** : functions de test réutilisables

## 🏆 Challenge Trophy
**Zéro if** : utiliser prédicats et composition de fonctions pures

## ⚠️ Piège courant
❌ \`numbers.map(n => if (n % 2 === 0) return n * 2)\` // Syntax error!  
✅ \`numbers.filter(n => n % 2 === 0).map(n => n * 2)\` // Clean pipeline

## ⏱️ Estimation : 10-15 minutes`,

    tests: `#!/usr/bin/env node

const { doubleNumbers, filterEven, evenDoubled } = require('./starter.js');

console.log('🧪 N03 - Map/Filter Tests\\n');

let passed = 0, failed = 0;

function test(desc, actual, expected) {
  const match = JSON.stringify(actual) === JSON.stringify(expected);
  if (match) {
    console.log(\`✅ \${desc}\`);
    passed++;
  } else {
    console.log(\`❌ \${desc}\`);
    console.log(\`   Expected: \${JSON.stringify(expected)}\`);
    console.log(\`   Actual:   \${JSON.stringify(actual)}\`);
    failed++;
  }
}

try {
  // Test doubleNumbers
  test('doubleNumbers([1, 2, 3])', doubleNumbers([1, 2, 3]), [2, 4, 6]);
  test('doubleNumbers([0, 5])', doubleNumbers([0, 5]), [0, 10]);
  test('doubleNumbers([])', doubleNumbers([]), []);

  // Test filterEven  
  test('filterEven([1, 2, 3, 4])', filterEven([1, 2, 3, 4]), [2, 4]);
  test('filterEven([1, 3, 5])', filterEven([1, 3, 5]), []);
  test('filterEven([2, 4, 6])', filterEven([2, 4, 6]), [2, 4, 6]);

  // Test pipeline
  test('evenDoubled([1, 2, 3, 4])', evenDoubled([1, 2, 3, 4]), [4, 8]);
  test('evenDoubled([1, 3, 5])', evenDoubled([1, 3, 5]), []);
  
  console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed\`);
  process.exit(failed === 0 ? 0 : 1);
} catch (error) {
  console.log(\`❌ Error: \${error.message}\`);
  process.exit(1);
}`
  },

  'N04-reduce-immutability': {
    readme: `# 📊 N04 - Reduce + Immutability

## 🎯 Objectifs
- ✅ **Maîtriser** \`.reduce()\` pour agrégations
- ✅ **Créer** histogrammes et objets complexes
- ✅ **Maintenir** immutabilité dans accumulateur  
- ✅ **Optimiser** avec complexité O(n)

## 📝 Missions

### 1. \`histogram(arr)\`
Compte les occurrences de chaque élément.

### 2. \`minMax(numbers)\`
Trouve min et max en un seul passage.

### Exemples
\`\`\`javascript
histogram(['a', 'b', 'a'])     // → {a: 2, b: 1}
minMax([3, 1, 4, 1, 5])       // → {min: 1, max: 5}
\`\`\`

## ⚡ Contraintes
- ✅ **Immutabilité** : pas de mutation d'accumulateur
- ✅ **Une seule passe** : complexité O(n) 
- ✅ **Spread operator** : \`{...acc, prop: val}\`

## 🏆 Challenge Trophy  
**Max 2 reduce** ET **complexité O(n)** : efficacité maximale

## ⏱️ Estimation : 15-20 minutes`,

    tests: `#!/usr/bin/env node

const { histogram, minMax } = require('./starter.js');

console.log('🧪 N04 - Reduce Tests\\n');

let passed = 0, failed = 0;

function test(desc, actual, expected) {
  const match = JSON.stringify(actual) === JSON.stringify(expected);
  if (match) {
    console.log(\`✅ \${desc}\`);
    passed++;
  } else {
    console.log(\`❌ \${desc}\`);
    console.log(\`   Expected: \${JSON.stringify(expected)}\`);
    console.log(\`   Actual:   \${JSON.stringify(actual)}\`);
    failed++;
  }
}

try {
  test('histogram(["a", "b", "a"])', 
       histogram(['a', 'b', 'a']), {a: 2, b: 1});
       
  test('histogram([1, 2, 1, 3, 1])',
       histogram([1, 2, 1, 3, 1]), {1: 3, 2: 1, 3: 1});
       
  test('minMax([3, 1, 4, 1, 5])',
       minMax([3, 1, 4, 1, 5]), {min: 1, max: 5});
       
  test('minMax([10])',
       minMax([10]), {min: 10, max: 10});

  console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed\`);
  process.exit(failed === 0 ? 0 : 1);
} catch (error) {
  console.log(\`❌ Error: \${error.message}\`);
  process.exit(1);
}`
  },

  'N05-closures-modules': {
    readme: `# 🔒 N05 - Closures & Modules

## 🎯 Objectifs
- ✅ **Implémenter** \`makeCounter()\` avec closure
- ✅ **Créer** \`createStore()\` avec état privé
- ✅ **Exposer** API minimale get/set/reset
- ✅ **Éviter** variables globales

## 📝 Missions

### 1. \`makeCounter(initial)\`
Compteur avec état privé et API {get, inc, reset}.

### 2. \`createStore(initialValue)\` 
Store avec état privé et API {get, set, reset}.

### Exemples
\`\`\`javascript
const counter = makeCounter(10);
counter.get()    // → 10
counter.inc()    // → 11  
counter.reset()  // → 10

const store = createStore('hello');
store.get()         // → 'hello'
store.set('world')  // → store  
store.get()         // → 'world'
\`\`\`

## ⚡ Contraintes
- ✅ **État privé** : pas d'accès direct aux variables
- ✅ **API claire** : get, set, inc, reset seulement
- ✅ **Closures** : variables capturées dans scope

## 🏆 Challenge Trophy
**Zéro variable globale** + **API minimale** : encapsulation parfaite

## ⏱️ Estimation : 15-20 minutes`,

    tests: `#!/usr/bin/env node

const { makeCounter, createStore } = require('./starter.js');

console.log('🧪 N05 - Closures Tests\\n');

let passed = 0, failed = 0;

function test(desc, actual, expected) {
  if (actual === expected) {
    console.log(\`✅ \${desc}\`);
    passed++;
  } else {
    console.log(\`❌ \${desc}\`);
    console.log(\`   Expected: \${expected}\`);
    console.log(\`   Actual:   \${actual}\`);
    failed++;
  }
}

try {
  // Test makeCounter
  const counter = makeCounter(10);
  test('counter.get() initial', counter.get(), 10);
  test('counter.inc() returns', counter.inc(), 11);
  test('counter.get() after inc', counter.get(), 11);
  test('counter.reset() returns', counter.reset(), 10);

  // Test createStore
  const store = createStore('hello');
  test('store.get() initial', store.get(), 'hello');
  store.set('world');
  test('store.get() after set', store.get(), 'world');
  store.reset();
  test('store.get() after reset', store.get(), 'hello');

  // Test encapsulation  
  const counter2 = makeCounter(0);
  const counter3 = makeCounter(0);
  counter2.inc();
  test('Closures isolated', counter3.get(), 0);

  console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed\`);
  process.exit(failed === 0 ? 0 : 1);
} catch (error) {
  console.log(\`❌ Error: \${error.message}\`);
  process.exit(1);
}`
  },

  'N06-boss-integration': {
    readme: `# 👑 N06 - Boss Integration

## 🎯 Objectifs FINAUX
- ✅ **Intégrer** TOUS les concepts précédents
- ✅ **Pipeline** complet : data → scoreboard  
- ✅ **Tri, calculs, formatage** en une chaîne
- ✅ **Code maintenable** et performant

## 📝 Mission BOSS

### \`generateScoreboard(players)\`
Transformer données brutes en classement trié.

**Input**: \`[{name: 'Alice', score: 100, bonus: 20}, ...]\`
**Output**: \`[{rank: 1, name: 'Alice', total: 120}, ...]\`

### Pipeline complet
1. **Calculer** total = score + bonus  
2. **Trier** par total décroissant
3. **Ajouter** rank (1, 2, 3...)
4. **Formater** output final

### Exemple complet
\`\`\`javascript
const players = [
  { name: 'Alice', score: 100, bonus: 20 },
  { name: 'Bob', score: 80, bonus: 40 },
  { name: 'Charlie', score: 120, bonus: 0 }
];

generateScoreboard(players)
// → [
//   { rank: 1, name: 'Bob', total: 120 },
//   { rank: 2, name: 'Alice', total: 120 }, 
//   { rank: 3, name: 'Charlie', total: 120 }
// ]
\`\`\`

## ⚡ Contraintes BOSS
- ✅ **Tous les concepts** : pure functions, destructuring, map/filter, reduce, immutabilité
- ✅ **Pipeline fluide** : chaînage d'opérations
- ✅ **Code élégant** : lisible et maintenable

## 🏆 Challenge Trophy  
**Max 3 passes** sur les données : efficacité maximale O(n log n)

## 🎉 Récompense
Vous avez maîtrisé les **fondations JavaScript modernes** !  
Ready for Act II: Async/Await & APIs 🚀

## ⏱️ Estimation : 20-25 minutes`,

    tests: `#!/usr/bin/env node

const { generateScoreboard } = require('./starter.js');

console.log('🧪 N06 - Boss Integration Tests\\n');

let passed = 0, failed = 0;

function test(desc, actual, expected) {
  const match = JSON.stringify(actual) === JSON.stringify(expected);
  if (match) {
    console.log(\`✅ \${desc}\`);
    passed++;
  } else {
    console.log(\`❌ \${desc}\`);
    console.log(\`   Expected: \${JSON.stringify(expected, null, 2)}\`);
    console.log(\`   Actual:   \${JSON.stringify(actual, null, 2)}\`);
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

  console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed\`);
  
  if (failed === 0) {
    console.log('\\n🏆 BOSS DEFEATED! Act I completed! 🎉');
    console.log('🚀 Ready for Act II: Async/Await & APIs!');
  }
  
  process.exit(failed === 0 ? 0 : 1);
} catch (error) {
  console.log(\`❌ Error: \${error.message}\`);
  process.exit(1);
}`
  }
};

// Write missing files
Object.entries(completions).forEach(([sceneId, files]) => {
  const scenePath = path.join('levels', 'act-1', sceneId);
  
  if (files.readme) {
    fs.writeFileSync(path.join(scenePath, 'README.md'), files.readme);
    console.log(`✅ Created ${sceneId}/README.md`);
  }
  
  if (files.tests) {
    fs.writeFileSync(path.join(scenePath, 'tests.spec.js'), files.tests);
    console.log(`✅ Created ${sceneId}/tests.spec.js`);
  }
});

console.log('🎉 Act I scenes completed!');