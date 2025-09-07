# N13 - Types & Inférence

## 🎯 Objectif

Maîtriser l'inférence de types TypeScript et éviter les pièges `any`/`unknown`. Apprendre à laisser TypeScript déduire les types automatiquement tout en restant explicite quand nécessaire.

**🏆 Challenge Trophy** : Zéro `any` explicite et zéro `@ts-ignore`

---

## 📚 Concepts Clés

### 1. Type Inference (Inférence)
TypeScript déduit automatiquement les types :
```typescript
// ✅ Inférence automatique
let name = "Alice";        // string
let count = 42;           // number
let isActive = true;      // boolean

// ❌ Explicite inutile
let name: string = "Alice";
```

### 2. Unknown vs Any
```typescript
// ❌ any = disable type checking
let data: any = fetchData();
data.foo.bar.baz; // No error, runtime crash possible

// ✅ unknown = type-safe any
let data: unknown = fetchData();
if (typeof data === 'object' && data !== null) {
  // Type narrowing required
}
```

### 3. Function Typing
```typescript
// ✅ Inférence des paramètres et retour
const add = (a: number, b: number) => a + b; // returns number

// ✅ Fonction avec type guard
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

### 4. Type Assertions (avec prudence)
```typescript
// ❌ Assertion dangereuse
const data = fetchData() as User;

// ✅ Assertion avec validation
function assertUser(data: unknown): asserts data is User {
  if (!isUser(data)) throw new Error('Invalid user');
}
```

---

## 🎮 Exercice Pratique

Implémenter un système de validation de données avec :

1. **Parser sécurisé** : `unknown` → types spécifiques
2. **Type guards** : Fonctions de validation
3. **Inférence maximale** : Laisser TS déduire
4. **Zéro any/ignore** : Challenge condition

### Fonctions à Compléter

```typescript
// 1. Parser with type guards
function parseUser(data: unknown): User | null

// 2. Safe property access  
function getProperty<T>(obj: unknown, key: string): T | undefined

// 3. Array type inference
function filterNumbers(items: unknown[]): number[]

// 4. Function overloads with inference
function process(input: string): string
function process(input: number): number
function process(input: string | number): string | number
```

---

## 🔍 Patterns à Maîtriser

### Type Narrowing
```typescript
function example(value: string | number) {
  if (typeof value === 'string') {
    // value is string here
    return value.toUpperCase();
  }
  // value is number here  
  return value * 2;
}
```

### Discriminated Unions
```typescript
type Result = 
  | { type: 'success'; data: any }
  | { type: 'error'; message: string };

function handle(result: Result) {
  switch (result.type) {
    case 'success':
      return result.data; // TS knows it's success
    case 'error':
      return result.message; // TS knows it's error
  }
}
```

---

## ⚠️ Pièges à Éviter

1. **Any abuse** : `let data: any` disable tout
2. **@ts-ignore overuse** : Cache les vraies erreurs  
3. **Explicit redundancy** : `let x: string = "hello"`
4. **Unsafe assertions** : `data as User` sans validation

---

## 🧪 Tests & Validation

```bash
# Lancer les tests
npm test N13

# Vérifier TypeScript errors
cq ts:strict --level 1
cq validate N13

# Calculer TypeScore
cq ts:score
```

**Critères de réussite** :
- ✅ Tous les tests passent
- ✅ 0 erreurs TypeScript 
- ✅ 0 `any` explicites
- ✅ 0 `@ts-ignore` utilisés
- ✅ TypeScore ≥ 95

---

## 💡 Hints Disponibles

- **H1** : Type guards pattern avec `typeof` et `instanceof`
- **H2** : Unknown narrowing avec validation functions  
- **H3** : Function overloads avec inférence de retour

---

**⏱️ Temps estimé** : 15 minutes  
**🎯 Next** : N14 - Interfaces vs Types (composition patterns)