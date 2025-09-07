# 📖 J1 - Minute by Minute Runbook

## 🕘 H-15 min : Setup Final

### Formateur
- [ ] **Écran projeté** : [Control Room](http://localhost:3000/) ouvert
- [ ] **Onglet 2** : [Student Roadmap](http://localhost:3000/roadmap) en demo
- [ ] **Terminal formateur** : `npm run preflight:j1` validé ✅
- [ ] **Kit offline** : Clés USB backup prêtes
- [ ] **Plan B activé** : Seuils configurés (slow: 30min, stuck: 45min)

### Étudiants
- [ ] **Node.js 16+** installé et vérifié
- [ ] **CodeQuest décompressé** dans ~/CodeQuest ou C:\CodeQuest
- [ ] **Terminal ouvert** dans le dossier CodeQuest
- [ ] **Éditeur préféré** prêt (VS Code, etc.)

## 🕘 H-5 min : Warm Welcome

### What to Say 💬
> "Salut ! On va passer 2h à explorer JavaScript de façon gamifiée avec CodeQuest 2.3. 
> Vous allez résoudre 7 missions, de N00 à N06, comme dans un jeu vidéo.
> Chaque réussite débloque le niveau suivant. Let's code !"

### What to Click 🖱️
1. **[Student Roadmap](http://localhost:3000/roadmap)** en plein écran
2. **Hover sur N00** → Montre le panel objectifs
3. **Hover sur N01-N06** → "Vous débloquerez au fur et à mesure"

## 🕐 H+0 min : Démarrage N00

### What to Say 💬
> "Première mission : N00 Warmup. Vérifiez votre environnement Node.js.
> Commande magique : `cq start N00`. Go !"

### What to Click 🖱️
1. **[Control Room](http://localhost:3000/)** → Switch sur vue formateur
2. **Load Demo Data** pour montrer l'interface
3. **Monitor la section "Alerts"** pour détecter les blocages

### Expected Outcome ✅
- Tous les étudiants lancent `cq start N00`
- Fichiers apparaissent dans `student-workspace/current/N00-warmup/`
- Premiers `cq validate N00` au bout de 5 minutes

## 🕕 H+15 min : Checkpoint N01

### What to Say 💬
> "Parfait ! N00 validé pour la plupart. Mission N01 : Variables & const.
> Objectif : formatUser avec template literals. C'est parti !"

### What to Click 🖱️
1. **Control Room** → **Progress Matrix** pour voir l'avancement
2. **Si alertes rouges** → Identifier qui est stuck > 15min
3. **Assistance ciblée** pour les étudiants bloqués

### Actions si problème 🚨
- **>5 étudiants bloqués** → Explication collective au tableau
- **Problème technique** → Diriger vers [Troubleshooting](../docs/TROUBLESHOOTING.md)
- **Port 3000 occupé** → `PORT=3001 npm run control-room`

## 🕘 H+30 min : Rythme de croisière

### What to Say 💬
> "Super progression ! Les rapides attaquent N02 Immutability.
> Les autres finissent N01. Prenez votre temps, la qualité avant la vitesse."

### What to Click 🖱️
1. **Heatmap** pour voir les niveaux difficiles
2. **Export CSV** si besoin de données détaillées  
3. **Projector Mode** si besoin d'affichage grand écran

### Expected Distribution 📊
- **Leaders (20%)** : N02-N03
- **Groupe principal (60%)** : N01-N02  
- **Queue (20%)** : N00-N01

## 🕘 H+45 min : Checkpoint N03

### What to Say 💬
> "N02 Immutability : on découvre deepFreeze ! Pas de mutations autorisées.
> N03 Destructuring : syntaxe moderne { } et [ ]. Très utile en pratique."

### What to Click 🖱️
1. **Plan B Panel** → Vérifier seuils stuck/slow
2. **Generate Class Snapshots** pour simulation si besoin
3. **Alert items** pour voir qui a besoin d'aide

### Actions si retard 🐌
- **>50% still on N01** → Plan B : Unlock hints globalement
- **Ambiance tendue** → Pause 5 min, encouragements
- **Questions techniques** → Réponses collectives

## 🕐 H+60 min : Collections & Transformations  

### What to Say 💬
> "N04 Collections : le cœur de JavaScript moderne ! map(), filter(), reduce().
> Ces fonctions vont changer votre façon de coder. Magie garantie ✨"

### What to Click 🖱️
1. **Student Roadmap** → Montrer la progression visuelle
2. **Success notifications** quand des étudiants finissent N03-N04
3. **Stuck threshold slider** → Ajuster si nécessaire (35min → 40min)

### Expected State 📈
- **Forte dispersion** normal sur N02-N05
- **Premiers N04 completions** chez les rapides
- **N02 majority** pour le groupe principal

## 🕕 H+75 min : Modules & Composition

### What to Say 💬
> "N05 Modules : composition de fonctions. Diviser pour mieux régner !
> Chaque fonction fait UNE chose, et on les compose ensemble."

### What to Click 🖱️
1. **Enriched CSV Export** pour analyser les patterns
2. **Team Filter** si groupes identifiables  
3. **Refresh View** pour update en temps réel

### Coaching Individuel 👥
- **Stuck >45 min** → Intervention directe
- **0 hints used** → Encourager l'autonomie
- **Many hints** → Vérifier compréhension concepts

## 🕘 H+90 min : Boss Preparation

### What to Say 💬
> "N06 Boss Level ! Intégration de TOUS les concepts : variables, fonctions,
> destructuring, collections, modules. The final challenge !"

### What to Click 🖱️
1. **Mark N08-N10 optional** si extension future
2. **Lower boss pass** si groupe en difficulté (5/5 → 3/5 tests)
3. **Projector mode** pour hints collectifs si nécessaire

### Success Metrics 🎯
- **>70%** du groupe sur N04-N06
- **Premiers completions N06** chez les leaders  
- **Énergie positive** dans la salle

## 🕐 H+105 min : Boss Time

### What to Say 💬
> "Final sprint ! N06 combine tout ce qu'on a appris. 
> Leaderboard avec scoring, formatage, et algorithmes. You got this! 💪"

### What to Click 🖱️
1. **Live leaderboard** dans Control Room
2. **Success celebrations** pour chaque completion
3. **Screenshots** pour immortaliser les victoires

### Expected Finale 🏆
- **30-50%** complètent N06 Boss
- **80%+** atteignent au moins N04
- **100%** repartent motivés !

## 🕕 H+120 min : Debrief & Next Steps

### What to Say 💬
> "Bravo ! Vous avez découvert JavaScript moderne : const, arrow functions,
> destructuring, map/reduce, modules. C'est le standard industrie 2024 !"

### What to Click 🖱️
1. **Final stats** export pour analyse post-course
2. **Student screenshots** de leurs roadmaps
3. **Feedback form** si disponible

### Closing 🎬
> "CodeQuest continue avec les Acts II & III : async/await, APIs, React basics.
> Keep coding, keep learning ! 🚀"

---

## 🔗 Quick Links Anchor

### 📊 Dashboards
- **[Control Room - Vue Formateur](http://localhost:3000/)**
- **[Student Roadmap - Vue Élève](http://localhost:3000/roadmap)**
- **[Plan B Emergency Panel](http://localhost:3000/#plan-b-section)**

### 📋 Checklists  
- **[Pre-flight J1](../scripts/preflight-j1.js)** : `npm run preflight:j1`
- **[Smoke Test](../scripts/smoke-test.js)** : `npm run smoke-test`
- **[Troubleshooting](../docs/TROUBLESHOOTING.md)** : Solutions problèmes

### 🎯 Key Commands
- **Start scene** : `cq start N00`
- **Validate** : `cq validate N00` 
- **Hints** : `cq help-me N00`
- **Status** : `cq status`
- **Reset** : `cq reset N00`

### 🆘 Emergency Actions
- **Port conflict** : `PORT=3001 npm run control-room`
- **Offline fallback** : Décompresser `codequest-offline-kit.zip`
- **Demo data** : `npm run demo` + Load Demo Data button
- **Plan B unlock** : Toggles dans Control Room Plan B panel

---

*Runbook mis à jour automatiquement*  
*Ready for J1 - Let's code! 🎮*