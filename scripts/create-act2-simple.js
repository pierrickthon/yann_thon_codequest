#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create N07 - Promises Basics
const n07Dir = 'levels/act-2/N07-promises-basics';

fs.writeFileSync(path.join(n07Dir, 'manifest.json'), JSON.stringify({
  "id": "N07-promises-basics",
  "act": "act-2",
  "title": "Promises Basics",
  "type": "core",
  "difficulty": "intermediate",
  "estimatedTime": "10-15min",
  "version": "2.3.0",
  "description": "Maîtriser Promise constructors, conversion callback vers Promise",
  "objectives": [
    "Convertir fonction callback en Promise avec toPromise()",
    "Wrapper valeurs/erreurs avec wrap()",
    "Séquencer fonctions asynchrones avec sequence()"
  ],
  "validation": {
    "criteria": {
      "base": {"description": "Tous les tests passent", "criteria": "testsPass"},
      "star": {"description": "Terminé rapidement ou sans aide", "criteria": "timeUnder:600 OR noHints:true"},
      "trophy": {"description": "Aucune chaîne .then().catch() (new Promise seulement)", "criteria": "custom"}
    }
  }
}, null, 2));

fs.writeFileSync(path.join(n07Dir, 'README.md'), `# 🔗 N07 - Promises Basics

## 🎯 Objectifs
- ✅ **Convertir** callback → Promise avec \`toPromise()\`
- ✅ **Wrapper** valeurs/erreurs avec \`wrap()\`
- ✅ **Séquencer** fonctions async avec \`sequence()\`

## 📝 Missions

### 1. \`toPromise(cbStyleFn)\`
Convertit une fonction callback en Promise.

### 2. \`wrap(value)\` 
Wrappe une valeur ou erreur en Promise.

### 3. \`sequence(functions, seed)\`
Exécute fonctions en séquence avec accumulation.

### Exemples
\`\`\`javascript
const readFile = (path, callback) => {
  setTimeout(() => callback(null, 'content'), 100);
};

const promisified = toPromise(readFile);
wrap('hello')        // → Promise.resolve('hello')
sequence([x => x + 1, x => x * 2], 5) // → Promise.resolve(12)
\`\`\`

## 🏆 Challenge Trophy
**Aucune chaîne .then().catch()** : utiliser uniquement new Promise + resolve/reject
`);

fs.writeFileSync(path.join(n07Dir, 'starter.js'), `/**
 * CodeQuest 2.3 - N07 Promises Basics
 */

/**
 * Convertit une fonction callback en Promise
 */
function toPromise(cbStyleFn) {
  // TODO: Retourner une fonction qui renvoie une Promise
  // Utiliser new Promise(resolve, reject)
}

/**
 * Wrappe une valeur ou erreur en Promise
 */
function wrap(value) {
  // TODO: Si value instanceof Error, reject
  // Sinon, resolve avec value
}

/**
 * Séquence de fonctions avec accumulation
 */
function sequence(functions, seed) {
  // TODO: Appliquer chaque fonction en séquence
}

module.exports = { toPromise, wrap, sequence };`);

fs.writeFileSync(path.join(n07Dir, 'solution.js'), `const toPromise = (cbStyleFn) => {
  return (...args) => new Promise((resolve, reject) => {
    cbStyleFn(...args, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const wrap = (value) => new Promise((resolve, reject) => {
  if (value instanceof Error) reject(value);
  else resolve(value);
});

const sequence = (functions, seed) => new Promise((resolve, reject) => {
  let current = seed;
  let index = 0;
  
  const next = () => {
    if (index >= functions.length) {
      resolve(current);
      return;
    }
    
    try {
      current = functions[index](current);
      index++;
      setImmediate(next);
    } catch (error) {
      reject(error);
    }
  };
  
  next();
});

module.exports = { toPromise, wrap, sequence };`);

fs.writeFileSync(path.join(n07Dir, 'criteria.json'), JSON.stringify({
  "base": {"description": "Tous les tests passent", "criteria": "testsPass"},
  "star": {"description": "Terminé rapidement ou sans aide", "criteria": "timeUnder:600 OR noHints:true"},
  "trophy": {"description": "Aucune chaîne .then().catch()", "criteria": "custom"}
}, null, 2));

fs.writeFileSync(path.join(n07Dir, 'tests.spec.js'), `#!/usr/bin/env node
const { toPromise, wrap, sequence } = require('./starter.js');

console.log('🧪 N07 - Promises Basics Tests\\n');

async function runTests() {
  let passed = 0, failed = 0;

  try {
    // Test wrap
    const result1 = await wrap('hello');
    if (result1 === 'hello') {
      console.log('✅ wrap("hello") works');
      passed++;
    } else {
      console.log('❌ wrap("hello") failed');
      failed++;
    }

    // Test sequence
    const result2 = await sequence([x=>x+1, x=>x*2], 5);
    if (result2 === 12) {
      console.log('✅ sequence works');
      passed++;
    } else {
      console.log('❌ sequence failed');
      failed++;
    }

    console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed\`);
    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.log(\`❌ Test error: \${error.message}\`);
    process.exit(1);
  }
}

runTests();`);

// Create simple hints
fs.writeFileSync(path.join(n07Dir, 'hints/H1.md'), `# 💡 N07 - Indice H1

## Concept clé
Les Promises encapsulent des opérations asynchrones avec resolve/reject.

## Direction
Utilisez new Promise(resolve, reject) comme base pour toutes les fonctions.`);

fs.writeFileSync(path.join(n07Dir, 'hints/H2.md'), `# 💡 N07 - Indice H2

## Structure toPromise
\`\`\`javascript
function toPromise(cbStyleFn) {
  return (...args) => new Promise((resolve, reject) => {
    cbStyleFn(...args, (err, result) => {
      // TODO: gérer err vs result
    });
  });
}
\`\`\``);

fs.writeFileSync(path.join(n07Dir, 'hints/H3.md'), `# 💡 N07 - Indice H3

Voir solution.js pour l'implémentation complète.`);

console.log('✅ Created N07-promises-basics');

// Create similar structure for other scenes...
// N08, N09, N10, N11, N12 with simplified content

const scenes = [
  {id: 'N08-async-await-control', title: 'Async/Await Control'},
  {id: 'N09-concurrency-limit', title: 'Concurrency Limit'},
  {id: 'N10-retry-timeout-backoff', title: 'Retry Timeout Backoff'},
  {id: 'N11-cancellation-api', title: 'Cancellation API'},
  {id: 'N12-boss-orchestration', title: 'Boss Orchestration'}
];

scenes.forEach(scene => {
  const sceneDir = \`levels/act-2/\${scene.id}\`;
  
  fs.writeFileSync(path.join(sceneDir, 'manifest.json'), JSON.stringify({
    id: scene.id,
    act: 'act-2',
    title: scene.title,
    type: 'core',
    difficulty: 'intermediate',
    estimatedTime: '15-20min',
    version: '2.3.0'
  }, null, 2));
  
  fs.writeFileSync(path.join(sceneDir, 'README.md'), \`# \${scene.title}\n\nObjectifs et instructions à compléter.\`);
  fs.writeFileSync(path.join(sceneDir, 'starter.js'), \`// \${scene.title} starter\nmodule.exports = {};\`);
  fs.writeFileSync(path.join(sceneDir, 'solution.js'), \`// \${scene.title} solution\nmodule.exports = {};\`);
  fs.writeFileSync(path.join(sceneDir, 'tests.spec.js'), \`console.log('Tests \${scene.title}');\`);
  fs.writeFileSync(path.join(sceneDir, 'criteria.json'), '{}');
  
  fs.writeFileSync(path.join(sceneDir, 'hints/H1.md'), \`# Indice H1 - \${scene.title}\`);
  fs.writeFileSync(path.join(sceneDir, 'hints/H2.md'), \`# Indice H2 - \${scene.title}\`);
  fs.writeFileSync(path.join(sceneDir, 'hints/H3.md'), \`# Indice H3 - \${scene.title}\`);
  
  console.log(\`✅ Created \${scene.id} (skeleton)\`);
});

console.log('🎉 Act II scenes created!');