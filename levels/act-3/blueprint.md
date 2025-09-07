# 🔧 Blueprint Act III - Interactions & Types

## 📋 Vue d'ensemble - TypeScript Mastery

**Objectif** : Transition maîtrisée de JavaScript vers TypeScript strict  
**Durée** : 180 min (3h) - 6 scènes progressives  
**Focus** : Typage progressif, migration sécurisée, patterns avancés  

---

## 🎯 Objectifs Pédagogiques

### Compétences Visées
- **Inférence** : Laisser TS déduire, intervention minimale
- **Composition** : Interfaces vs types, DRY principles  
- **Sécurité** : Type guards robustes, never pour exhaustivité
- **Généricité** : Contraintes appropriées, réutilisabilité
- **Transformation** : Mapped types, utility types avancés
- **Migration** : JavaScript → TypeScript strict méthodique

### Progression Cognitive
```
JS dynamique → Inférence → Structures → Guards → 
Génériques → Transformations → Migration complète
```

---

## 🏆 Trophy Conditions (Fast-Track)

**N13** : Zéro `any` explicite et zéro `@ts-ignore`  
**N14** : Pas de duplication (mapped type pour DRY)  
**N15** : Switch exhaustif (aucun default), check `never` testé  
**N16** : Contrainte `extends`, pas de `any` masqué  
**N17** : `DeepReadonly` limité (1 niveau) sans lib externe  
**N18** : 0 any, 0 @ts-ignore, 0 erreurs TS niveau 3  

---

## 📊 Structure Temporelle

### Phase 1 - Fondations (45 min)
**N13-N14** : Inférence + Interfaces  
- Concepts : `unknown` vs `any`, composition d'interfaces
- Patterns : Extension, readonly, intersection types
- Piège : Trop de `any`, interfaces trop rigides

### Phase 2 - Sécurité (45 min) 
**N15-N16** : Guards + Génériques
- Concepts : Discriminated unions, type narrowing, generic constraints
- Patterns : `in`, `typeof`, `instanceof`, `Result<T,E>`
- Piège : Guards incomplets, génériques trop larges

### Phase 3 - Avancé (90 min)
**N17-N18** : Mapped Types + Migration Boss
- Concepts : Utility types, conditional types, strict migration
- Patterns : Custom mapped types, progressive typing
- Piège : Over-engineering, migration brutale

---

## ⚠️ Pièges Pédagogiques Fréquents

### N13 - Types & Inférence
```typescript
// ❌ Piège : any explicite
let data: any = fetchData();

// ✅ Correct : inférence + unknown
let data: unknown = fetchData();
const parsed = data as ParsedData; // avec garde
```

### N14 - Interfaces vs Types
```typescript
// ❌ Piège : duplication
interface User { name: string; age: number; }
interface AdminUser { name: string; age: number; isAdmin: boolean; }

// ✅ Correct : composition
interface User { name: string; age: number; }
interface AdminUser extends User { isAdmin: boolean; }
```

### N15 - Unions & Type Guards
```typescript
// ❌ Piège : switch non exhaustif
switch (shape.type) {
  case 'circle': return Math.PI * shape.radius ** 2;
  case 'rectangle': return shape.width * shape.height;
  // Missing 'triangle' case!
}

// ✅ Correct : exhaustivité guarantie
const exhaustiveCheck = (x: never): never => { throw new Error(`Unhandled: ${x}`); };
```

### N16 - Generics & Constraints
```typescript
// ❌ Piège : générique trop permissif
function process<T>(item: T): T { return item; }

// ✅ Correct : contrainte appropriée
function process<T extends { id: string }>(item: T): T { 
  console.log(`Processing ${item.id}`);
  return item; 
}
```

### N17 - Mapped & Utility Types
```typescript
// ❌ Piège : utility type externe
import { DeepReadonly } from 'utility-types';

// ✅ Correct : implémentation limitée
type DeepReadonly<T> = { readonly [K in keyof T]: T[K] };
```

### N18 - Migration Boss
```typescript
// ❌ Piège : migration brutale avec @ts-ignore
// @ts-ignore
const result = riskyFunction(data);

// ✅ Correct : migration progressive avec guards
function isValidData(data: unknown): data is ValidData {
  return typeof data === 'object' && data !== null;
}
```

---

## 🔧 Outils & Configuration

### TypeScript Levels
- **Level 0** : Lenient (demo only)
- **Level 1** : `noImplicitAny: true`
- **Level 2** : `strict: true` (sauf strictNullChecks)
- **Level 3** : Full strict + `noUncheckedIndexedAccess`

### CLI Commands
```bash
cq ts:strict --level 3        # Active strict mode
cq ts:migrate --act 1         # Migre Act I en TypeScript
cq ts:score                   # Calculate TypeScore
cq ts:budget --ignores 5      # Autorise 5 @ts-ignore
```

### TypeScore Formula
```
score = 100 - 5*(#any) - 3*(#ts-ignore) - 2*(#unknown unnarrowed) - 1*(#TODO types)
```

---

## 🎮 Fast-Track Strategy

**Durée** : 120 min (vs 180 min normal)  
**Contraintes** : ≤ 2 hints total, 6/6 scènes obligatoires  
**Badge** : "TypeScript Wizard" 🧙‍♂️

### Timeline Fast-Track
- **0-30 min** : N13-N14 (fondations rapides)
- **30-60 min** : N15-N16 (guards + génériques)  
- **60-120 min** : N17-N18 (advanced + boss)

### Success Factors
1. **Inférence first** : Laisser TS déduire maximalement
2. **Guards pattern** : `is` predicates systématiques
3. **Composition** : Extend/intersect plutôt que dupliquer
4. **Migration méthodique** : Une erreur TS à la fois

---

## 📈 Évaluation & Feedback

### Critères de Réussite
- **Fonctionnel** : Tests passent avec 0 erreur TS
- **Qualité** : TypeScore ≥ 90 pour badge
- **Style** : Pas de `any`/`@ts-ignore` abusifs
- **Architecture** : Types composables et réutilisables

### Feedback Automatique
- **Real-time** : Erreurs TS en surbrillance
- **TypeScore** : Métrique continue par fichier
- **Budget** : Alertes sur consommation @ts-ignore
- **Completion** : Badge "Type Guardian" à 0 any + 0 @ts-ignore

---

## 🚀 Extensions & Bonus

### Advanced Features
- **Type predicates** custom complexes
- **Conditional types** avec `infer`
- **Template literal types** pour DSLs
- **Decorator patterns** (experimental)

### Integration Continue
- **Pre-commit** : TypeScore minimum
- **CI/CD** : Strict mode obligatoire en prod
- **Code review** : Types comme documentation

---

*Blueprint Act III v2.3 - TypeScript mastery through progressive typing* 🔧📘