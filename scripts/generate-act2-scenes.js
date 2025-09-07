#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Act II Scene Generator  
 * Génère les scènes N07-N12 async complètes
 */

const fs = require('fs');
const path = require('path');

// Définitions complètes des scènes Act II
const scenes = {
  'N07-promises-basics': {
    manifest: {
      id: 'N07-promises-basics',
      title: 'Promises Basics', 
      description: 'Maîtriser Promise constructors, conversion callback → Promise',
      estimatedTime: '10-15min',
      objectives: [
        'Convertir fonction callback en Promise avec toPromise()',
        'Wrapper valeurs/erreurs avec wrap()', 
        'Séquencer fonctions asynchrones avec sequence()',
        'Comprendre resolve/reject vs then/catch'
      ],
      trophy: 'Aucune chaîne .then().catch() (new Promise seulement)'
    },

    readme: `# 🔗 N07 - Promises Basics

## 🎯 Objectifs
- ✅ **Convertir** callback → Promise avec \`toPromise()\`
- ✅ **Wrapper** valeurs/erreurs avec \`wrap()\`
- ✅ **Séquencer** fonctions async avec \`sequence()\`
- ✅ **Maîtriser** new Promise(resolve, reject)

## 📝 Missions

### 1. \`toPromise(cbStyleFn)\`
Convertit une fonction callback en Promise.

### 2. \`wrap(value)\` 
Wrappe une valeur ou erreur en Promise.

### 3. \`sequence(functions, seed)\`
Exécute fonctions en séquence avec accumulation.

### Exemples
\`\`\`javascript
// Callback style
const readFile = (path, callback) => {
  setTimeout(() => callback(null, 'content'), 100);
};

const promisified = toPromise(readFile);
// → Promise<string>

wrap('hello')        // → Promise.resolve('hello')
wrap(new Error('fail')) // → Promise.reject(Error('fail'))

sequence([
  x => x + 1,
  x => x * 2  
], 5)                // → Promise.resolve(12)
\`\`\`

## ⚡ Contraintes
- ✅ **new Promise** : utiliser constructeur explicite
- ✅ **resolve/reject** : gestion propre des callbacks
- ✅ **Pas de .then()** direct dans l'implémentation

## 🏆 Challenge Trophy
**Aucune chaîne .then().catch()** : utiliser uniquement new Promise + resolve/reject

## ⏱️ Estimation : 10-15 minutes`,

    starter: `/**
 * CodeQuest 2.3 - N07 Promises Basics
 */

/**
 * Convertit une fonction callback en Promise
 * @param {Function} cbStyleFn - Fonction style callback(err, result)
 * @returns {Function} Version promisifiée
 */
function toPromise(cbStyleFn) {
  // TODO: Retourner une fonction qui renvoie une Promise
  // Utiliser new Promise(resolve, reject)
}

/**
 * Wrappe une valeur ou erreur en Promise
 * @param {any} value - Valeur à wrapper (ou Error)
 * @returns {Promise} Promise résolue ou rejetée
 */
function wrap(value) {
  // TODO: Si value instanceof Error, reject
  // Sinon, resolve avec value
}

/**
 * Séquence de fonctions avec accumulation
 * @param {Function[]} functions - Fonctions à exécuter
 * @param {any} seed - Valeur initiale
 * @returns {Promise} Résultat final
 */
function sequence(functions, seed) {
  // TODO: Appliquer chaque fonction en séquence
  // Chaque fonction reçoit le résultat de la précédente
}

module.exports = { toPromise, wrap, sequence };`,

    solution: `const toPromise = (cbStyleFn) => {
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
      const result = functions[index](current);
      current = result;
      index++;
      setImmediate(next);
    } catch (error) {
      reject(error);
    }
  };
  
  next();
});

module.exports = { toPromise, wrap, sequence };`,

    tests: `#!/usr/bin/env node
const { toPromise, wrap, sequence } = require('./starter.js');

console.log('🧪 N07 - Promises Basics Tests\\n');

let passed = 0, failed = 0;

function test(desc, actual, expected, isAsync = false) {
  if (!isAsync) {
    const match = actual === expected;
    if (match) {
      console.log(\`✅ \${desc}\`);
      passed++;
    } else {
      console.log(\`❌ \${desc}\`);
      console.log(\`   Expected: \${expected}\`);
      console.log(\`   Actual:   \${actual}\`);
      failed++;
    }
    return;
  }
  
  // Async test
  return actual.then(result => {
    if (result === expected) {
      console.log(\`✅ \${desc}\`);
      passed++;
    } else {
      console.log(\`❌ \${desc}\`);
      console.log(\`   Expected: \${expected}\`);
      console.log(\`   Actual:   \${result}\`);
      failed++;
    }
  }).catch(error => {
    if (error.message === expected) {
      console.log(\`✅ \${desc}\`);
      passed++;
    } else {
      console.log(\`❌ \${desc} (error)\`);
      console.log(\`   Expected: \${expected}\`);
      console.log(\`   Actual error: \${error.message}\`);
      failed++;
    }
  });
}

async function runTests() {
  try {
    // Test wrap
    await test('wrap("hello")', wrap('hello'), 'hello', true);
    await test('wrap(Error)', wrap(new Error('test')), 'test', true);

    // Test sequence
    await test('sequence([x=>x+1, x=>x*2], 5)', sequence([x=>x+1, x=>x*2], 5), 12, true);

    // Test toPromise
    const mockCb = (val, cb) => setTimeout(() => cb(null, val * 2), 10);
    const promisified = toPromise(mockCb);
    await test('toPromise works', promisified(5), 10, true);

    console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed\`);
    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.log(\`❌ Test error: \${error.message}\`);
    process.exit(1);
  }
}

runTests();`
  },

  'N08-async-await-control': {
    manifest: {
      id: 'N08-async-await-control',
      title: 'Async/Await Control',
      description: 'Contrôle de flux avec async/await, utilitaires avancés',
      estimatedTime: '15-20min',
      trophy: 'Zéro setTimeout direct (passer par sleep)'
    },

    starter: `/**
 * CodeQuest 2.3 - N08 Async/Await Control
 */

/**
 * Délai asynchrone
 */
async function sleep(ms) {
  // TODO: Promise qui se résout après ms millisecondes
}

/**
 * Polyfill Promise.allSettled
 */
async function allSettledPolyfill(promises) {
  // TODO: Attendre toutes les promises, retourner status/value/reason
}

/**
 * Course avec timeout
 */
async function raceTimeout(promise, ms) {
  // TODO: Promise gagne OU timeout après ms
  // Si timeout, rejeter avec Error('Timeout')
}

module.exports = { sleep, allSettledPolyfill, raceTimeout };`,

    solution: `const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const allSettledPolyfill = async (promises) => {
  const results = await Promise.all(
    promises.map(p => 
      Promise.resolve(p)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    )
  );
  return results;
};

const raceTimeout = async (promise, ms) => {
  const timeout = sleep(ms).then(() => {
    throw new Error('Timeout');
  });
  
  return Promise.race([promise, timeout]);
};

module.exports = { sleep, allSettledPolyfill, raceTimeout };`
  },

  'N09-concurrency-limit': {
    manifest: {
      id: 'N09-concurrency-limit',
      title: 'Concurrency Limit',
      description: 'Files d attente, concurrence limitée avec ordre préservé',
      estimatedTime: '15-20min', 
      trophy: 'File d attente < 30 lignes, pas de dépendance externe'
    },

    starter: `/**
 * CodeQuest 2.3 - N09 Concurrency Limit
 */

/**
 * Exécute tâches avec limite de concurrence
 * @param {Function[]} tasks - Tâches async à exécuter
 * @param {number} limit - Limite de concurrence
 * @returns {Promise<Array>} Résultats dans l'ordre original
 */
async function runWithLimit(tasks, limit) {
  // TODO: File d'attente avec limit concurrentes
  // IMPORTANT: préserver l'ordre des résultats
}

module.exports = { runWithLimit };`,

    solution: `async function runWithLimit(tasks, limit) {
  const results = new Array(tasks.length);
  const executing = [];
  
  for (let i = 0; i < tasks.length; i++) {
    const task = Promise.resolve(tasks[i]()).then(result => {
      results[i] = result;
      executing.splice(executing.indexOf(task), 1);
    });
    
    executing.push(task);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  
  await Promise.all(executing);
  return results;
}

module.exports = { runWithLimit };`
  },

  'N10-retry-timeout-backoff': {
    manifest: {
      id: 'N10-retry-timeout-backoff',
      title: 'Retry + Timeout + Backoff',
      description: 'Robustesse : retry avec backoff exponentiel et timeout',
      estimatedTime: '20-25min',
      trophy: 'Journal d essais retourné sans console.log'
    },

    starter: `/**
 * CodeQuest 2.3 - N10 Retry + Timeout + Backoff
 */

/**
 * Retry avec backoff exponentiel
 */
async function withRetry(fn, options = {}) {
  const { retries = 3, baseDelay = 100, factor = 2 } = options;
  // TODO: Implémenter retry avec backoff géométrique
  // Retourner { result, attempts: [...] } avec timestamps
}

/**
 * Timeout pour Promise
 */
async function withTimeout(promise, ms) {
  // TODO: Rejeter avec TimeoutError après ms
}

module.exports = { withRetry, withTimeout };`,

    solution: `async function withRetry(fn, options = {}) {
  const { retries = 3, baseDelay = 100, factor = 2 } = options;
  const attempts = [];
  
  for (let i = 0; i <= retries; i++) {
    const attempt = { attempt: i + 1, timestamp: Date.now() };
    attempts.push(attempt);
    
    try {
      const result = await fn();
      attempt.status = 'success';
      return { result, attempts };
    } catch (error) {
      attempt.status = 'failed';
      attempt.error = error.message;
      
      if (i === retries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(factor, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

class TimeoutError extends Error {
  constructor(message = 'Operation timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

async function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new TimeoutError(\`Timed out after \${ms}ms\`)), ms);
  });
  
  return Promise.race([promise, timeout]);
}

module.exports = { withRetry, withTimeout, TimeoutError };`
  },

  'N11-cancellation-api': {
    manifest: {
      id: 'N11-cancellation-api',
      title: 'Cancellation API',
      description: 'Annulation propre style AbortController, nettoyage ressources',
      estimatedTime: '20-25min',
      trophy: 'Zéro variable globale, pas de fuite timers'
    },

    starter: `/**
 * CodeQuest 2.3 - N11 Cancellation API
 */

class CancelledError extends Error {
  constructor(message = 'Operation was cancelled') {
    super(message);
    this.name = 'CancelledError';
  }
}

/**
 * Rend une tâche annulable
 */
function makeCancellable(task) {
  // TODO: Retourner { promise, cancel }
  // cancel() doit rejeter avec CancelledError
  // Pas de fuite de timers/ressources
}

module.exports = { makeCancellable, CancelledError };`,

    solution: `class CancelledError extends Error {
  constructor(message = 'Operation was cancelled') {
    super(message);
    this.name = 'CancelledError';
  }
}

function makeCancellable(task) {
  let isCancelled = false;
  let cancelReject = null;
  
  const promise = new Promise(async (resolve, reject) => {
    cancelReject = reject;
    
    if (isCancelled) {
      reject(new CancelledError());
      return;
    }
    
    try {
      const result = await task();
      if (isCancelled) {
        reject(new CancelledError());
      } else {
        resolve(result);
      }
    } catch (error) {
      if (isCancelled) {
        reject(new CancelledError());
      } else {
        reject(error);
      }
    }
  });
  
  const cancel = () => {
    if (!isCancelled) {
      isCancelled = true;
      if (cancelReject) {
        cancelReject(new CancelledError());
      }
    }
  };
  
  return { promise, cancel };
}

module.exports = { makeCancellable, CancelledError };`
  },

  'N12-boss-orchestration': {
    manifest: {
      id: 'N12-boss-orchestration',
      title: 'Boss Orchestration',
      description: 'Orchestration APIs avec concurrence limitée et mode dégradé',
      estimatedTime: '25-30min',
      trophy: 'Max 2 passes tableau, zéro mutation, O(n log n)'
    },

    starter: `/**
 * CodeQuest 2.3 - N12 Boss Orchestration
 */

const { mockFetchProfiles, mockFetchPosts, mockFetchScores } = require('../mock-async.js');

/**
 * Orchestration complète avec mode dégradé
 */
async function orchestrateAPIs(userIds, options = {}) {
  const { concurrencyLimit = 3, timeoutMs = 5000, gracefulMode = true } = options;
  
  // TODO: Orchestrer les 3 APIs
  // 1. Fetch profiles pour tous userIds
  // 2. Fetch posts pour chaque user (si profile OK)  
  // 3. Fetch scores pour game 'default'
  // 4. Combiner en summary trié par score total
  // 5. Mode graceful: continuer même si certains échouent
}

module.exports = { orchestrateAPIs };`,

    solution: `const { mockFetchProfiles, mockFetchPosts, mockFetchScores } = require('../mock-async.js');

async function orchestrateAPIs(userIds, options = {}) {
  const { concurrencyLimit = 3, timeoutMs = 5000, gracefulMode = true } = options;
  
  // Étape 1: Fetch profiles avec gestion d'erreurs
  let profiles = [];
  try {
    const profilesResponse = await Promise.race([
      mockFetchProfiles(userIds),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeoutMs))
    ]);
    profiles = profilesResponse.profiles;
  } catch (error) {
    if (!gracefulMode) throw error;
    // Mode dégradé: créer profiles par défaut
    profiles = userIds.map(id => ({ id, name: \`User \${id}\`, score: 0 }));
  }
  
  // Étape 2: Fetch posts avec concurrence limitée
  const postsPromises = profiles.map(profile => 
    mockFetchPosts(profile.id).then(
      response => ({ userId: profile.id, posts: response.posts }),
      error => gracefulMode ? { userId: profile.id, posts: [] } : Promise.reject(error)
    )
  );
  
  const postsResults = await Promise.all(postsPromises.slice(0, concurrencyLimit));
  
  // Étape 3: Fetch scores
  let scoresData = [];
  try {
    const scoresResponse = await mockFetchScores('default');
    scoresData = scoresResponse.scores;
  } catch (error) {
    if (!gracefulMode) throw error;
  }
  
  // Étape 4: Combinaison et tri (1 seule passe)
  const summary = profiles.map(profile => {
    const userPosts = postsResults.find(p => p.userId === profile.id)?.posts || [];
    const userScore = scoresData.find(s => s.userId === profile.id)?.score || 0;
    
    return {
      userId: profile.id,
      name: profile.name,
      totalScore: profile.score + userScore,
      postsCount: userPosts.length,
      totalLikes: userPosts.reduce((sum, post) => sum + post.likes, 0)
    };
  }).sort((a, b) => b.totalScore - a.totalScore); // O(n log n)
  
  return { summary, errors: [] };
}

module.exports = { orchestrateAPIs };`
  }
};

// Génération des fichiers
Object.entries(scenes).forEach(([sceneId, scene]) => {
  const scenePath = path.join('levels', 'act-2', sceneId);
  
  // Manifest
  const manifest = {
    id: scene.manifest.id,
    act: 'act-2',
    title: scene.manifest.title,
    type: 'core',
    difficulty: 'intermediate',
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
  
  fs.writeFileSync(path.join(scenePath, 'manifest.json'), JSON.stringify(manifest, null, 2));
  
  // Files
  if (scene.readme) fs.writeFileSync(path.join(scenePath, 'README.md'), scene.readme);
  if (scene.starter) fs.writeFileSync(path.join(scenePath, 'starter.js'), scene.starter);  
  if (scene.solution) fs.writeFileSync(path.join(scenePath, 'solution.js'), scene.solution);
  if (scene.tests) fs.writeFileSync(path.join(scenePath, 'tests.spec.js'), scene.tests);
  
  // Criteria
  fs.writeFileSync(path.join(scenePath, 'criteria.json'), JSON.stringify({
    base: { description: 'Tous les tests passent', criteria: 'testsPass' },
    star: { description: 'Terminé rapidement ou sans aide', criteria: 'timeUnder:600 OR noHints:true' },
    trophy: { description: scene.manifest.trophy, criteria: 'custom' }
  }, null, 2));
  
  // Basic hints
  const hintsDir = path.join(scenePath, 'hints');
  fs.writeFileSync(path.join(hintsDir, 'H1.md'), \`# 💡 \${sceneId} - Indice H1\\n\\n## Concept clé\\nCette scène porte sur: \${scene.manifest.description}\\n\`);
  fs.writeFileSync(path.join(hintsDir, 'H2.md'), \`# 💡 \${sceneId} - Indice H2\\n\\n## Structure\\nVoir le starter.js pour la structure attendue.\\n\`);
  fs.writeFileSync(path.join(hintsDir, 'H3.md'), \`# 💡 \${sceneId} - Indice H3\\n\\n## Solution\\nVoir solution.js pour l'implémentation complète.\\n\`);
  
  console.log(\`✅ Generated \${sceneId}\`);
});

console.log('🎉 All Act II scenes generated!');