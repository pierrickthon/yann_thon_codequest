# 🔧 Guide de Migration TypeScript - CodeQuest 2.3

## 📋 Vue d'ensemble

Ce guide détaille la migration progressive de JavaScript vers TypeScript dans CodeQuest, avec des étapes concrètes et des patterns éprouvés pour une transition maîtrisée.

---

## 🎯 Philosophie de Migration

### Principe : Typage Progressif
```
any partout → unknown sélectif → types explicites → strict mode
```

**Objectif** : Améliorer la robustesse sans casser l'existant  
**Méthode** : Niveaux de strictness progressifs (0→3)  
**Validation** : TypeScore pour mesurer la qualité  

---

## 🏗️ Niveaux de Configuration

### Level 0 : Lenient (Démonstration)
```json
{
  "strict": false,
  "noImplicitAny": false,
  "allowJs": true
}
```
**Usage** : Première migration, compatibilité maximale

### Level 1 : noImplicitAny
```json
{
  "noImplicitAny": true,
  "noImplicitReturns": true,
  "allowJs": true
}
```
**Usage** : Éliminer les `any` implicites, premier typage

### Level 2 : Strict (sauf null)
```json
{
  "strict": true,
  "strictNullChecks": false
}
```
**Usage** : Production standard, typage robuste

### Level 3 : Full Strict
```json
{
  "strict": true,
  "strictNullChecks": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}
```
**Usage** : Code critique, robustesse maximale

---

## 🚀 Étapes de Migration

### Étape 1 : Setup Projet (10 min)
```bash
# Configuration TypeScript
cq ts:strict --level 1

# Migration des fichiers
cq ts:migrate --act 1
```

**Résultat** : Fichiers .ts créés, configuration active

### Étape 2 : Élimination des `any` Explicites (20 min)
```typescript
// ❌ Avant
let data: any = fetchData();
data.foo.bar.baz; // Danger !

// ✅ Après  
let data: unknown = fetchData();
if (isValidData(data)) {
  console.log(data.foo.bar.baz); // Sûr !
}
```

**Pattern** : Remplacer `any` par `unknown` + type guards

### Étape 3 : Type Guards Systématiques (30 min)
```typescript
// Pattern de base
function isUser(data: unknown): data is User {
  return typeof data === 'object' && 
         data !== null &&
         typeof (data as any).id === 'number' &&
         typeof (data as any).name === 'string';
}

// Utilisation
function processUser(userData: unknown) {
  if (isUser(userData)) {
    // userData est maintenant typé comme User
    console.log(userData.name);
  }
}
```

### Étape 4 : Interfaces et Composition (25 min)
```typescript
// Interfaces réutilisables
interface BaseEntity {
  id: number;
  createdAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
}

// Composition avec utility types
type CreateUser = Omit<User, 'id' | 'createdAt'>;
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;
```

### Étape 5 : Génériques Pratiques (20 min)
```typescript
// Result pattern générique
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// API Response générique
interface ApiResponse<T> {
  status: number;
  data: T;
  meta?: { count: number; page: number };
}

// Usage
async function fetchUser(id: number): Promise<Result<User, ApiError>> {
  try {
    const response: ApiResponse<User> = await api.get(`/users/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error as ApiError };
  }
}
```

### Étape 6 : Mode Strict (15 min)
```bash
# Activation strict mode
cq ts:strict --level 3
```

**Ajustements** : Gestion explicite de `null`/`undefined`

---

## 🛡️ Patterns de Type Guards

### Guards Primitifs
```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}
```

### Guards d'Objets
```typescript
function hasProperty<T extends object, K extends keyof T>(
  obj: T, 
  key: K
): obj is T & Record<K, NonNullable<T[K]>> {
  return obj[key] != null;
}

// Usage
if (hasProperty(user, 'email')) {
  // user.email est garanti non-null
  sendEmail(user.email);
}
```

### Guards avec Validation
```typescript
function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && 
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && 
         !isNaN(value) && 
         value > 0;
}
```

---

## 🚨 Quand Utiliser Unknown

### ✅ Bons Cas d'Usage
```typescript
// 1. Parsing JSON
function parseJSON<T>(json: string, validator: (data: unknown) => data is T): T | null {
  try {
    const parsed: unknown = JSON.parse(json);
    return validator(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

// 2. API Responses non-typées
async function fetchData(url: string): Promise<unknown> {
  const response = await fetch(url);
  return response.json(); // unknown jusqu'à validation
}

// 3. Configuration dynamique
function processConfig(config: unknown): AppConfig {
  if (isValidConfig(config)) {
    return config;
  }
  throw new Error('Invalid configuration');
}
```

### ❌ Éviter Unknown Quand
```typescript
// ❌ Pour des types connus
let count: unknown = 42; // Devrait être number

// ❌ Propagation sans validation
function process(data: unknown): unknown { // Pas utile
  return data;
}

// ❌ Unknown non-réduit
function example(value: unknown) {
  console.log(value.toString()); // Erreur ! Réduire d'abord
}
```

---

## 📊 Mesure de Qualité : TypeScore

### Formule
```
TypeScore = 100 - 5*(#any) - 3*(#@ts-ignore) - 2*(#unknown non-réduit) - 1*(#TODO types)
```

### Objectifs par Phase
- **Phase 1** : Score ≥ 70 (any éliminés)
- **Phase 2** : Score ≥ 85 (guards en place)  
- **Phase 3** : Score ≥ 95 (strict mode)
- **Badge "Type Guardian"** : Score ≥ 90, 0 any, 0 @ts-ignore

### Monitoring Continu
```bash
# Check régulier pendant développement
cq ts:score

# Avec détails par fichier
cq ts:score --verbose

# Définir des budgets temporaires
cq ts:budget --ignores 5  # Max 5 @ts-ignore
cq ts:budget --any 3      # Max 3 any
```

---

## 🔧 Outils de Migration

### CLI Commands
```bash
# Configuration
cq ts:strict --level <0-3>    # Changer niveau de strictness

# Migration
cq ts:migrate --act <1-2>     # Migrer un acte complet

# Qualité
cq ts:score                   # Calculer TypeScore
cq ts:budget --ignores <n>    # Définir budgets temporaires
```

### Workflow Recommandé
1. **Start** : `cq ts:strict --level 1`
2. **Migrate** : `cq ts:migrate --act 1`  
3. **Fix** : Corriger erreurs niveau par niveau
4. **Score** : `cq ts:score` régulièrement
5. **Upgrade** : `cq ts:strict --level 2` puis 3

---

## ⚠️ Pièges à Éviter

### Piège 1 : Any Partout
```typescript
// ❌ Solution paresseuse
function process(data: any): any {
  return data.someProperty;
}

// ✅ Solution typée
function process<T extends { someProperty: unknown }>(data: T): T['someProperty'] {
  return data.someProperty;
}
```

### Piège 2 : @ts-ignore Abuse
```typescript
// ❌ Cache le problème
// @ts-ignore
const result = unsafeFunction(data);

// ✅ Résout le problème
const result = isValidInput(data) ? safeFunction(data) : null;
```

### Piège 3 : Migration Brutale
```typescript
// ❌ Tout changer d'un coup
// Active strict mode niveau 3 sur codebase JS

// ✅ Migration progressive
// Level 1 → Fix errors → Level 2 → Fix errors → Level 3
```

### Piège 4 : Type Guards Incomplets
```typescript
// ❌ Guard partiel
function isUser(data: unknown): data is User {
  return typeof data === 'object';
}

// ✅ Guard complet
function isUser(data: unknown): data is User {
  return typeof data === 'object' && 
         data !== null &&
         typeof (data as any).id === 'number' &&
         typeof (data as any).name === 'string' &&
         typeof (data as any).email === 'string';
}
```

---

## 🏆 Checklist de Réussite

### ✅ Migration Réussie
- [ ] **Level 3** : Strict mode activé sans erreurs
- [ ] **0 any** : Aucun `any` explicite dans le code
- [ ] **0 @ts-ignore** : Aucun @ts-ignore non-justifié
- [ ] **TypeScore ≥ 90** : Score de qualité élevé
- [ ] **Tests passent** : Fonctionnalité préservée
- [ ] **Performance** : Pas de régression de perf

### ✅ Code Quality
- [ ] **Type Guards** : Validation systématique des données externes
- [ ] **Interfaces** : Structures de données bien définies
- [ ] **Génériques** : Réutilisabilité avec contraintes appropriées
- [ ] **Error Handling** : Gestion robuste des cas d'erreur
- [ ] **Documentation** : Types comme documentation vivante

---

## 🚀 Aller Plus Loin

### Advanced Patterns
- **Conditional Types** : Types dynamiques avec `extends`
- **Template Literal Types** : DSLs typées
- **Branded Types** : Types nominaux pour la sécurité

### Integration Continue
- **Pre-commit Hooks** : TypeScore minimum requis
- **CI/CD Pipeline** : Strict mode obligatoire en production
- **Code Review** : Types comme critère de review

---

*Guide de Migration v2.3 - Du JavaScript vers TypeScript avec maîtrise* 🔧📘