/**
 * N00: System Check & Warm-up
 * Your first CodeQuest challenge!
 */

/**
 * Returns environment information
 * @returns {Object} Environment details with node version, platform, and ready status
 */
function getEnvironment() {
  // TODO: Return an object with:
  // - node: process.version (Node.js version)
  // - platform: process.platform (OS platform)
  // - ready: true if node version >= 16
  return {
    node: process.version,
    platform: process.platform,
    ready: true
  };
  // Your code here
}

/**
 * Creates a welcome message
 * @param {string} name - The name to welcome
 * @returns {string} Welcome message
 */
function warmUp(name = 'Adventurer') {
  // TODO: Return "Welcome [name] to CodeQuest!"
  return `Welcome ${name} to CodeQuest!`;
  // Your code here
}

/**
 * ==============================
 * Extra: 20 Warm-up mini-défis
 * ==============================
 * 5 simples, 5 faciles, 5 moyens, 5 complexes.
 */

// Simples
function greetUpper(name) {
  // TODO: Retourner un message en UPPERCASE: `HELLO, ${name}!`
  return `HELLO, ${name}!`;
}

function reverseString(s) {
  // TODO: Retourner la chaîne inversée
  return s.split("").reverse().join("");
}

function repeatString(s, n) {
  // TODO: Répéter s n fois (n>=0) sans effets de bord
  return s.repeat(n);
}

function parseSemver(version) {
  // TODO: Retourner { major, minor, patch } depuis 'v16.14.2' ou '16.14.2'
  if (version.startsWith("v")) version = version.slice(1);
  const [major, minor, patch] = version.split(".");
  return {
    major: parseInt(major, 10),
    minor: parseInt(minor, 10),
    patch: parseInt(patch, 10)
  };
}

function isNodeGte(required) {
  // TODO: Retourner true si process.version >= required (ex: '16.0.0') sans effets de bord
  const current = parseSemver(process.version);
  const target = parseSemver(required);

  if (current.major > target.major) return true;
  if (current.major < target.major) return false;

  if (current.minor > target.minor) return true;
  if (current.minor < target.minor) return false;

  return current.patch >= target.patch;
}

// Faciles
function sumRange(n) {
  // TODO: Somme 1..n (n>=1)
  return n * (n + 1) / 2;
}

function factorial(n) {
  // TODO: Factorielle de n (0! = 1)
  if (n < 0) throw new Error("n must be >= 0");
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function isPrime(n) {
  // TODO: Tester primalité (n entier >= 0)
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function toKebab(str) {
  // TODO: Convertir 'Hello World_test' → 'hello-world-test'
  return str
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function formatBytes(bytes) {
  // TODO: Retourner une chaîne formatée (ex: 1024 → '1 KB') sans I/O
  if (bytes === 0) return '0 B';
  if (bytes < 0) throw new Error('bytes must be >= 0');

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  const base = 1024;
  let i = 0;
  let value = Number(bytes);

  while (value >= base && i < units.length - 1) {
    value /= base;
    i++;
  }

  const rounded = Math.round(value) === value
    ? String(value)
    : String(Math.round(value * 10) / 10);

  return `${rounded} ${units[i]}`;
}

// Moyens
function range(start, end, step = 1) {
  // TODO: Retourner un tableau [start, start+step, ..., <= end]
  if (step === 0) throw new Error("step must not be 0");

  const length = Math.floor((end - start) / step) + 1;
  if (length <= 0) return [];

  return Array.from({ length }, (_, i) => start + i * step);
}

function uniqueSorted(arr) {
  // TODO: Retourner valeurs uniques triées (asc)
  return [...new Set(arr)].sort((a, b) => a - b);
}

function chunkArray(arr, size) {
  // TODO: Retourner un tableau de sous-tableaux de taille size
  if (size <= 0) throw new Error("size must be > 0");
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function median(arr) {
  // TODO: Retourner la médiane (tableau non vide)
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid];
  return (sorted[mid - 1] + sorted[mid]) / 2;
}


// Don't forget to export your functions!
module.exports = {
  getEnvironment,
  warmUp,
  // extras
  greetUpper,
  reverseString,
  repeatString,
  parseSemver,
  isNodeGte,
  sumRange,
  factorial,
  isPrime,
  toKebab,
  formatBytes,
  range,
  uniqueSorted,
  chunkArray,
  median
};
module.exports = {
  getEnvironment,
  warmUp,
  greetUpper,
  reverseString,
  repeatString,
  parseSemver,
  isNodeGte,
  sumRange,
  factorial,
  isPrime,
  toKebab,
  formatBytes,
  range,
  uniqueSorted,
  chunkArray,
  median
};
