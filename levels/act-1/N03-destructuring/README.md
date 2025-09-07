# N03: Destructuring, Rest/Spread 🎯

## Challenge
Implement mergeUserPrefs with destructuring and spread.

```javascript
const defaults = { theme: 'light', lang: 'en', notifications: true };
const incoming = { theme: 'dark', beta: true };
mergeUserPrefs(defaults, incoming);
// => { theme: 'dark', lang: 'en', notifications: true, beta: true }
```

## Rules
- Use destructuring in parameters
- Use spread for merging
- Incoming overrides defaults