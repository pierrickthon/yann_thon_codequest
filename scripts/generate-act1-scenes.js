#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Act I Scene Generator
 * Génère rapidement les scènes N02-N06
 */

const fs = require('fs');
const path = require('path');

// Définitions des scènes
const scenes = {
  'N02-destructuring': {
    manifest: {
      id: 'N02-destructuring',
      title: 'Destructuring & Rest/Spread',
      description: 'Maîtriser destructuring, rest/spread et immutabilité',
      estimatedTime: '10-15min',
      objectives: [
        'Utiliser destructuring pour extraire propriétés',
        'Maîtriser rest/spread operators',
        'Fusionner objets sans mutation',
        'Respecter immutabilité avec Object.freeze'
      ],
      trophy: 'Aucune mutation (Object.freeze dans tests)'
    },
    readme: `# ⚡ N02 - Destructuring & Rest/Spread

## 🎯 Objectifs
- ✅ **Destructuring** : extraire propriétés \`{ name, age } = user\`
- ✅ **Rest/Spread** : copier et fusionner \`{ ...obj1, ...obj2 }\`
- ✅ **Immutabilité** : pas de mutations d'objets
- ✅ **Object.freeze** : protection contre modifications

## 📝 Missions

### 1. \`extractName(user)\`
Extraire la propriété \`name\` d'un objet user.

### 2. \`mergeObjects(obj1, obj2)\`  
Fusionner deux objets, obj2 écrase obj1 en cas de conflit.

### 3. \`setDefault(config)\`
Ajouter des valeurs par défaut à un objet config.

### Exemples
\`\`\`javascript
extractName({ name: 'Alice', age: 25 })  // → 'Alice'

mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 })  
// → { a: 1, b: 3, c: 4 }

setDefault({ theme: 'dark' })
// → { theme: 'dark', lang: 'en', debug: false }
\`\`\`

## ⚡ Contraintes
- ✅ **Immutabilité** : ne pas modifier les objets d'entrée
- ✅ **Destructuring** : utiliser syntaxe \`{ }\`
- ✅ **Spread** : utiliser \`...obj\` pour copier

## 🏆 Challenge Trophy
**Aucune mutation** : tests utilisent \`Object.freeze\` pour détecter modifications`,

    starter: `/**
 * CodeQuest 2.3 - N02 Destructuring & Rest/Spread
 */

/**
 * Extrait la propriété name d'un objet user
 */
function extractName(user) {
  // TODO: Utiliser destructuring pour extraire name
  // const { name } = user;
}

/**
 * Fusionne deux objets, obj2 écrase obj1
 */
function mergeObjects(obj1, obj2) {
  // TODO: Utiliser spread pour fusionner
  // return { ...obj1, ...obj2 };
}

/**
 * Ajoute des valeurs par défaut à config
 * Défauts: { lang: 'en', debug: false }
 */
function setDefault(config) {
  // TODO: Fusionner avec défauts
  // const defaults = { lang: 'en', debug: false };
}

module.exports = { extractName, mergeObjects, setDefault };`,

    solution: `const extractName = ({ name }) => name;
const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });
const setDefault = (config) => ({ lang: 'en', debug: false, ...config });

module.exports = { extractName, mergeObjects, setDefault };`,

    tests: `#!/usr/bin/env node
const { extractName, mergeObjects, setDefault } = require('./starter.js');

console.log('🧪 N02 - Destructuring Tests\\n');

let passed = 0, failed = 0;

function test(desc, actual, expected) {
  const match = typeof expected === 'object' 
    ? JSON.stringify(actual) === JSON.stringify(expected)
    : actual === expected;
    
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
       
  console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed\`);
  process.exit(failed === 0 ? 0 : 1);
} catch (error) {
  console.log(\`❌ Mutation detected: \${error.message}\`);
  process.exit(1);
}`
  },

  'N03-map-filter': {
    manifest: {
      id: 'N03-map-filter',
      title: 'Map/Filter Pipeline',
      description: 'Pipeline de transformation avec map/filter, éviter les boucles',
      estimatedTime: '10-15min',
      objectives: [
        'Transformer données avec .map()',
        'Filtrer éléments avec .filter()',
        'Chaîner opérations en pipeline',
        'Éviter boucles for classiques'
      ],
      trophy: 'Zéro if (utiliser prédicats/composition)'
    },
    starter: `/**
 * CodeQuest 2.3 - N03 Map/Filter Pipeline
 */

/**
 * Double tous les nombres d'un tableau
 */
function doubleNumbers(numbers) {
  // TODO: Utiliser .map() pour doubler
}

/**
 * Filtre les nombres pairs
 */
function filterEven(numbers) {
  // TODO: Utiliser .filter() avec isEven
}

/**
 * Pipeline: garde les pairs et les double
 */
function evenDoubled(numbers) {
  // TODO: Chaîner .filter().map()
}

module.exports = { doubleNumbers, filterEven, evenDoubled };`,
    solution: `const doubleNumbers = (numbers) => numbers.map(n => n * 2);
const filterEven = (numbers) => numbers.filter(n => n % 2 === 0);
const evenDoubled = (numbers) => numbers.filter(n => n % 2 === 0).map(n => n * 2);

module.exports = { doubleNumbers, filterEven, evenDoubled };`
  },

  'N04-reduce-immutability': {
    manifest: {
      id: 'N04-reduce-immutability',
      title: 'Reduce + Immutability',
      description: 'Agrégations avec reduce, accumulateurs immutables',
      estimatedTime: '15-20min',
      objectives: [
        'Maîtriser .reduce() pour agrégations',
        'Créer histogrammes avec accumulateur',
        'Maintenir immutabilité dans reduce',
        'Optimiser complexité algorithmique'
      ],
      trophy: 'Max 2 reduce ET complexité O(n)'
    },
    starter: `/**
 * CodeQuest 2.3 - N04 Reduce + Immutability
 */

/**
 * Compte occurrences de chaque élément
 */
function histogram(arr) {
  // TODO: Utiliser reduce pour compter
}

/**
 * Trouve min et max en un seul passage
 */
function minMax(numbers) {
  // TODO: Une seule passe avec reduce
  // Retourner { min: X, max: Y }
}

module.exports = { histogram, minMax };`,
    solution: `const histogram = (arr) => arr.reduce((acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }), {});
const minMax = (numbers) => numbers.reduce((acc, val) => ({ min: Math.min(acc.min, val), max: Math.max(acc.max, val) }), { min: numbers[0], max: numbers[0] });

module.exports = { histogram, minMax };`
  },

  'N05-closures-modules': {
    manifest: {
      id: 'N05-closures-modules',
      title: 'Closures & Modules',
      description: 'Encapsulation avec closures, API privée/publique',
      estimatedTime: '15-20min',
      objectives: [
        'Implémenter makeCounter() avec closure',
        'Créer createStore() avec state privé',
        'Exposer API minimale get/set/reset',
        'Éviter variables globales'
      ],
      trophy: 'Zéro variable globale, API minimale'
    },
    starter: `/**
 * CodeQuest 2.3 - N05 Closures & Modules
 */

/**
 * Crée un compteur avec closure
 */
function makeCounter(initial = 0) {
  // TODO: Variable privée + fonctions
}

/**
 * Crée un store avec état privé
 */
function createStore(initialValue) {
  // TODO: State privé + API { get, set, reset }
}

module.exports = { makeCounter, createStore };`,
    solution: `const makeCounter = (initial = 0) => {
  let count = initial;
  return { get: () => count, inc: () => ++count, reset: () => count = initial };
};

const createStore = (initialValue) => {
  let state = initialValue;
  return { get: () => state, set: (val) => state = val, reset: () => state = initialValue };
};

module.exports = { makeCounter, createStore };`
  },

  'N06-boss-integration': {
    manifest: {
      id: 'N06-boss-integration',
      title: 'Boss Integration',
      description: 'Projet intégration : transformer données en scoreboard',
      estimatedTime: '20-25min',
      objectives: [
        'Intégrer tous les concepts précédents',
        'Pipeline complet data → scoreboard',
        'Tri, calculs, formatage en une chaîne',
        'Code maintenable et performant'
      ],
      trophy: 'Max 3 passes sur les données'
    },
    starter: `/**
 * CodeQuest 2.3 - N06 Boss Integration
 */

/**
 * Transforme données brutes en scoreboard trié
 * Input: [{ name: 'Alice', score: 100, bonus: 20 }, ...]
 * Output: [{ rank: 1, name: 'Alice', total: 120 }, ...]
 */
function generateScoreboard(players) {
  // TODO: Intégrer tous les concepts
  // 1. Calculer total = score + bonus
  // 2. Trier par total décroissant  
  // 3. Ajouter rank (1, 2, 3...)
  // 4. Format final { rank, name, total }
}

module.exports = { generateScoreboard };`,
    solution: `const generateScoreboard = (players) => 
  players
    .map(p => ({ ...p, total: p.score + p.bonus }))
    .sort((a, b) => b.total - a.total)
    .map((p, i) => ({ rank: i + 1, name: p.name, total: p.total }));

module.exports = { generateScoreboard };`
  }
};

// Génération des fichiers
Object.entries(scenes).forEach(([sceneId, scene]) => {
  const basePath = path.join('levels', 'act-1', sceneId);
  
  // Manifest
  const manifest = {
    id: scene.manifest.id,
    act: 'act-1',
    title: scene.manifest.title,
    type: 'core',
    difficulty: 'beginner-intermediate',
    estimatedTime: scene.manifest.estimatedTime,
    version: '2.3.0',
    description: scene.manifest.description,
    objectives: scene.manifest.objectives,
    validation: {
      criteria: {
        base: { description: 'Tous les tests passent', criteria: 'testsPass' },
        star: { description: 'Terminé rapidement ou sans aide', criteria: 'timeUnder:600 OR noHints:true' },
        trophy: { description: scene.manifest.trophy, criteria: 'custom' }
      }
    }
  };
  
  fs.writeFileSync(path.join(basePath, 'manifest.json'), JSON.stringify(manifest, null, 2));
  
  // Files
  if (scene.readme) fs.writeFileSync(path.join(basePath, 'README.md'), scene.readme);
  if (scene.starter) fs.writeFileSync(path.join(basePath, 'starter.js'), scene.starter);
  if (scene.solution) fs.writeFileSync(path.join(basePath, 'solution.js'), scene.solution);
  if (scene.tests) fs.writeFileSync(path.join(basePath, 'tests.spec.js'), scene.tests);
  
  // Criteria
  fs.writeFileSync(path.join(basePath, 'criteria.json'), JSON.stringify({
    base: { description: 'Tous les tests passent', criteria: 'testsPass' },
    star: { description: 'Terminé rapidement ou sans aide', criteria: 'timeUnder:600 OR noHints:true' },
    trophy: { description: scene.manifest.trophy, criteria: 'custom' }
  }, null, 2));
  
  console.log(`✅ Generated ${sceneId}`);
});

console.log('🎉 All Act I scenes generated!');