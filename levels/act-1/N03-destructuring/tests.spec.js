const { mergeUserPrefs } = require('./starter/destructuring');
console.log('🧪 N03: Destructuring Tests\n');

const defaults = { theme: 'light', lang: 'en', notifications: true };
const incoming = { theme: 'dark', beta: true };
const result = mergeUserPrefs(defaults, incoming);

console.log(result.theme === 'dark' ? '✅ Theme overridden' : '❌ Theme fail');
console.log(result.lang === 'en' ? '✅ Default preserved' : '❌ Default fail');
console.log(result.beta === true ? '✅ New prop added' : '❌ New prop fail');
process.exit(0);