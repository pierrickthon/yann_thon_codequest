# 🎯 Acte I - Fondations JS moderne - Blueprint

## 📋 Vue d'ensemble pédagogique

**Durée estimée** : 2h (120 min)  
**Niveau** : Débutant vers intermédiaire  
**Concepts clés** : Pureté, immutabilité, composition, modules

## 🎓 Objectifs d'apprentissage

### Objectifs primaires
- ✅ Écrire des **fonctions pures** sans effets de bord
- ✅ Maîtriser la **syntaxe ES6+** : destructuring, rest/spread
- ✅ Utiliser les **méthodes tableau** : map, filter, reduce 
- ✅ Implémenter des **closures** et patterns module
- ✅ **Composer** toutes ces compétences dans un projet intégré

### Objectifs secondaires  
- ✅ Adopter une approche **TDD** (Test-Driven Development)
- ✅ Développer des réflexes **immutables** par défaut
- ✅ Écrire du code **lisible** et **maintenable**
- ✅ Comprendre les bases de la **programmation fonctionnelle**

## 🗺️ Progression pédagogique

### N00 - Warmup Tutorial (5-10 min)
**Focus** : Validation environnement + familiarisation CLI  
**Compétences** : Setup, debugging, workflow de base  
**Piège principal** : Problèmes technique bloquants dès le début

### N01 - Pure Functions (10-15 min) 
**Focus** : Fonctions pures, pas d'effets de bord  
**Compétences** : `add()`, `isEven()`, `sum()` sans mutations  
**Piège principal** : Modification involontaire de paramètres

### N02 - Destructuring (10-15 min)
**Focus** : Syntaxe moderne ES6+, immutabilité  
**Compétences** : `{ }`, `[ ]`, `...spread`, `Object.freeze`  
**Piège principal** : Shallow vs deep copy, mutations cachées

### N03 - Map/Filter (10-15 min)
**Focus** : Pipeline de transformation propre  
**Compétences** : Chaînage `.map().filter()`, éviter `for`  
**Piège principal** : Logique complexe dans les callbacks

### N04 - Reduce + Immutability (15-20 min)
**Focus** : Agrégations complexes, accumulation  
**Compétences** : `reduce()` lisible, objets immutables  
**Piège principal** : Mutation de l'accumulateur, complexité O(n²)

### N05 - Closures & Modules (15-20 min)
**Focus** : Encapsulation, state privé  
**Compétences** : `makeCounter()`, `createStore()`, API minimale  
**Piège principal** : Variables globales, fuites de scope

### N06 - Boss Integration (20-25 min)
**Focus** : Intégration de tous les concepts  
**Compétences** : Pipeline complet data → scoreboard  
**Piège principal** : Sur-ingénierie, passes multiples inutiles

## ⚠️ Pièges courants identifiés

### 🔴 Pièges critiques
1. **Mutations invisibles** : `array.sort()` mute l'original
2. **Effets de bord** : console.log dans les fonctions pures  
3. **Références partagées** : shallow copy au lieu de deep copy
4. **Complexité inutile** : `reduce` quand `map` suffit

### 🟡 Pièges fréquents
1. **This-binding** : Perte de contexte dans callbacks
2. **Closure scope** : Variables capturées par référence
3. **Array methods** : Confusion entre mutant/non-mutant
4. **Object spread** : Shallow copy des objets imbriqués

### 🟢 Pièges mineurs
1. **Destructuring syntax** : Parenthèses manquantes
2. **Default values** : Undefined vs null behavior
3. **Rest parameters** : Position en fin uniquement
4. **Arrow functions** : Syntaxe return implicite

## 📊 Métriques de réussite attendues

### 🎯 Objectifs quantitatifs
- **>80%** des étudiants finissent N06 Boss
- **<15 min** temps moyen par scène N01-N05  
- **<3 hints** utilisés en moyenne par étudiant
- **100%** des tests passent sans compromis

### 📈 Indicateurs de progression saine
- **15 min** : Tous ont terminé N00, majoritairement sur N01
- **45 min** : Répartition N02-N04, quelques leaders sur N05
- **90 min** : Majorité sur N05-N06, premiers complétés N06
- **120 min** : >50% ont terminé N06, débriefing collectif

### 🚨 Signaux d'alarme
- **>20 min sur N00** : Problèmes techniques environnement
- **>5 hints sur une scène** : Concept non compris
- **Abandon massif N04-N05** : Courbe difficulté trop abrupte
- **0% completion N06** : Intégration ratée, revoir approche

## 🛠️ Stratégies de remédiation

### Si blocage technique (N00)
- ✅ Troubleshooting.md détaillé disponible
- ✅ Support individuel immédiat
- ✅ Kit offline en backup

### Si concepts difficiles (N02-N04)  
- ✅ Système hints progressifs H1→H2→H3
- ✅ Plan B : déblocage hints global
- ✅ Exemples supplémentaires au tableau

### Si retard général (>30% stuck)
- ✅ Pause collective explicative  
- ✅ Mode projecteur pour aide visuelle
- ✅ Réduction scope N06 si nécessaire

## 🏆 Système de gratification

### Base ✅ (100 pts)
Tous les tests passent, implémentation fonctionnelle

### Bonus ⭐ (150 pts) 
**Condition** : Temps < 10 min OU 0 hints utilisés

### Challenge 🏆 (200 pts)
**Conditions spécifiques par scène** :
- **N00** : 1 seul return, 0 variable temporaire
- **N01** : Code ≤ 5 lignes cumulées  
- **N02** : Aucune mutation (Object.freeze)
- **N03** : 0 if (utiliser prédicats/composition)
- **N04** : Max 2 reduce ET complexité O(n)
- **N05** : 0 variable globale, API minimale
- **N06** : Max 3 passes sur les données

## 🔄 Boucle d'amélioration continue

### Métriques à collecter
- **Temps par scène** → Ajustement difficulté
- **Hints les plus utilisés** → Amélioration énoncés  
- **Taux abandon par scène** → Identification friction
- **Patterns d'erreurs** → Enrichissement tests

### Évolutions possibles  
- **Extensions optionnelles** : N07-N10 pour les rapides
- **Variantes challenges** : Contraintes différentes
- **Mode collaboratif** : Challenges en équipe
- **Adaptive difficulty** : Ajustement automatique

---

*Blueprint Acte I v2.3 - Ready for pedagogical excellence* ✨