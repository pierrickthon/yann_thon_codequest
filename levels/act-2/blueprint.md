# 🎯 Acte II - Structures & Async - Blueprint

## 📋 Vue d'ensemble pédagogique

**Durée estimée** : 2h30 (150 min)  
**Niveau** : Intermédiaire  
**Concepts clés** : Promises, async/await, concurrence, orchestration

## 🎓 Objectifs d'apprentissage

### Objectifs primaires
- ✅ **Maîtriser Promises** : conversion callback → Promise, chaînage
- ✅ **async/await** : contrôle de flux lisible et maintenable
- ✅ **Concurrence limitée** : files d'attente, préservation d'ordre
- ✅ **Robustesse** : retry, timeout, backoff exponentiel
- ✅ **Annulation** : AbortController pattern, nettoyage propre
- ✅ **Orchestration** : APIs multiples, mode dégradé

### Objectifs secondaires  
- ✅ Comprendre **event loop** et micro-tâches
- ✅ Gérer **race conditions** et état partagé
- ✅ Implémenter **patterns avancés** (circuit breaker, bulkhead)
- ✅ **Debugging async** : stack traces, timing

## 🗺️ Progression pédagogique

### N07 - Promises Basics (10-15 min)
**Focus** : Fondamentaux Promise, conversion callback  
**Compétences** : `toPromise()`, `wrap()`, `sequence()`  
**Piège principal** : Confusion resolve/reject, chaînes .then()

### N08 - Async/Await Control (15-20 min) 
**Focus** : Contrôle de flux avec async/await  
**Compétences** : `sleep()`, `allSettled()`, `raceTimeout()`  
**Piège principal** : setTimeout direct, gestion d'erreurs

### N09 - Concurrency Limit (15-20 min)
**Focus** : Files d'attente, concurrence limitée  
**Compétences** : `runWithLimit()`, ordre préservé  
**Piège principal** : Race conditions, famine

### N10 - Retry + Timeout + Backoff (20-25 min)
**Focus** : Robustesse, gestion d'échecs  
**Compétences** : `withRetry()`, `withTimeout()`, backoff géométrique  
**Piège principal** : Backoff mal calculé, logs non structurés

### N11 - Cancellation API (20-25 min)
**Focus** : Annulation propre, nettoyage ressources  
**Compétences** : `makeCancellable()`, AbortController pattern  
**Piège principal** : Fuites de timers, état inconsistant

### N12 - Boss Orchestration (25-30 min)
**Focus** : Intégration complète, mode dégradé  
**Compétences** : Orchestration 3 APIs, graceful degradation  
**Piège principal** : Mutations, complexité excessive, pas de fallback

## ⚠️ Pièges courants identifiés

### 🔴 Pièges critiques
1. **Promise hell** : .then().then().catch() imbriqués
2. **Race conditions** : accès concurrent non synchronisé
3. **Memory leaks** : timers non nettoyés lors d'annulation
4. **Error swallowing** : catch sans re-throw approprié

### 🟡 Pièges fréquents
1. **Backoff calculation** : exponentiel vs linéaire mal compris
2. **Order preservation** : résultats mélangés avec concurrence
3. **Timeout handling** : cleanup incomplet après timeout
4. **State mutations** : modifications d'objets partagés

### 🟢 Pièges mineurs
1. **Async function** : return vs await dans certains cas
2. **Promise.all** : fail-fast vs allSettled confusion
3. **Error types** : instanceof vs message matching
4. **Timing precision** : Date.now() vs performance.now()

## 📊 Métriques de réussite attendues

### 🎯 Objectifs quantitatifs
- **>70%** des étudiants finissent N12 Boss
- **<20 min** temps moyen par scène N07-N11
- **<4 hints** utilisés en moyenne par étudiant  
- **100%** offline : zéro appel réseau réel

### 📈 Indicateurs de progression saine
- **30 min** : Tous ont terminé N07, majoritairement sur N08
- **75 min** : Répartition N09-N11, quelques leaders sur N12
- **120 min** : Majorité sur N11-N12, premiers complétés N12
- **150 min** : >60% ont terminé N12, débriefing async patterns

### 🚨 Signaux d'alarme
- **>25 min sur N07** : Concepts Promise non maîtrisés
- **Abandon N09** : Concurrence trop complexe d'un coup
- **Fuites mémoire N11** : Annulation mal comprise
- **0% completion N12** : Orchestration ratée, revoir approche

## 🛠️ Stratégies de remédiation

### Si blocage conceptuel (N07-N08)
- ✅ Rappels callback hell → Promise chains
- ✅ Exemples visuels event loop + micro-tasks
- ✅ Debug avec console.log timing

### Si complexité excessive (N09-N11)  
- ✅ Découpage en sous-fonctions plus simples
- ✅ Diagrammes de flux pour concurrence
- ✅ Tests unitaires granulaires

### Si orchestration difficile (N12)
- ✅ Mode dégradé par étapes
- ✅ Mocking plus simple avec moins d'échecs
- ✅ Focus sur une API à la fois

## 🏆 Système de gratification

### Base ✅ (100 pts)
Tous les tests passent, implémentation fonctionnelle

### Bonus ⭐ (150 pts) 
**Condition** : Temps < 10min (N07-N08) / 15min (N09-N12) OU 0 hints utilisés

### Challenge 🏆 (200 pts)
**Conditions spécifiques par scène** :
- **N07** : Aucune chaîne .then().catch() (new Promise seulement)
- **N08** : Zéro setTimeout direct (passer par sleep)  
- **N09** : File d'attente < 30 lignes, pas dépendance externe
- **N10** : Journal d'essais retourné sans console.log
- **N11** : Zéro variable globale, pas fuite timers
- **N12** : Max 2 passes tableau, zéro mutation, O(n log n)

## 🎮 Mode Fast-Track Act II

### 📋 Règles Fast-Track
- **Durée** : 2h chrono (120 min)
- **Hints autorisés** : ≤ 2 total sur tout l'acte
- **Scènes requises** : 6/6 (N07→N12) 
- **Validation** : Base minimum sur chaque scène

### 🏆 Récompenses
- **Succès** : Badge "Fast-Tracker Act II" 🚀
- **Échec** : Conservation progression standard acquise

### 📊 Tracking
- `cq fast-track --act 2 start` : Démarre le chrono
- `cq fast-track --act 2 status` : Temps restant, scènes, hints
- `cq fast-track --act 2 abort` : Abandon, retour mode standard

## 🔄 Boucle d'amélioration continue

### Métriques à collecter (J2 remote)
- **Temps par scène async** → Ajustement difficulté
- **Types d'erreurs fréquentes** → Amélioration tests  
- **Patterns d'abandon** → Identification friction
- **Usage Fast-Track** → Optimisation durée

### Évolutions possibles  
- **N13-N15** : WebWorkers, Streams, AbortSignal avancé
- **Mode collaboratif** : Orchestration distribuée
- **Real-time features** : WebSockets simulation
- **Performance monitoring** : Métriques async détaillées

## 🌐 Spécificités J2 Remote

### Adaptations pédagogiques
- **help-me enrichi** : Contexte technique (OS, Node, shell)
- **Check-in 14:00** : Synthèse cohorte vocale
- **Panic mode** : Support réactif Discord
- **Async debugging** : Guides spécifiques timing

### Monitoring formateur
- **Heatmap étendue** : N07-N12 temps réel  
- **Stuck detection** : >30min alertes automatiques
- **Fast-Track dashboard** : Participants actifs
- **Export enrichi** : Métadonnées remote (timezone, connectivity)

---

*Blueprint Acte II v2.3 - Ready for async mastery in remote learning* 🚀