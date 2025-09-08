# Guide Étudiant – CodeQuest 2.3 (Windows)

Bienvenue dans CodeQuest, une plateforme ludique pour apprendre JavaScript/TypeScript avec la méthode TDD.
Ce guide explique clairement les étapes pour installer, démarrer et valider vos scènes, en évitant les commandes avec `&&`.

---

## 1) Prérequis

- Windows 10/11
- Node.js 16+ (LTS conseillé) – `https://nodejs.org`
- (Optionnel) Git – `https://git-scm.com/download/win`
- Un éditeur de code (VS Code conseillé)

Vérifier les versions:
```powershell
node --version
npm --version
```

---

## 2) Installation du projet

Dans PowerShell, placez-vous à la racine du projet CodeQuest puis exécutez:
```powershell
npm install
npm link
```
Si `cq` n’est pas reconnu après `npm link`, essayez:
```powershell
npm install -g .
```
Vérifier que l’outil est installé:
```powershell
cq --help
```

---

## 3) Lancer l’interface « Control Room »

Démarrez l’interface visuelle (carte de progression):
```powershell
npm run control-room
```
Puis ouvrez votre navigateur à l’adresse: `http://localhost:3000/roadmap`

---

## 4) Démarrer votre première scène

Deux chemins de travail existent selon le parcours:
- Parcours « acts »: `acts/act1/N00-intro`
- Parcours « levels »: `levels/act-1/N00-warmup-tutorial`

Exemple (parcours acts):
```powershell
cd acts\act1\N00-intro
type README.md
```
Ouvrez ensuite les fichiers indiqués (ex: `starter\index.js` ou `solution.js`) et complétez les TODO.

---

## 5) Lancer les tests de la scène

Selon la scène, le test peut s’appeler `test.js` (acts) ou `tests.spec.js` (levels):
```powershell
# Scènes avec test.js
node test.js

# Scènes avec tests.spec.js
node tests.spec.js
```
Corrigez votre code jusqu’à obtenir « tous les tests passés ».

---

## 6) Valider votre progression (CLI)

Revenez à la racine du projet puis validez:
```powershell
cd ..\..\..\
cq validate
```
Résultats possibles: Base, Bonus, Challenge.

---

## 7) Demander de l’aide (hints)

Si vous êtes bloqué:
```powershell
cq help-me N00-intro
```
Remplacez `N00-intro` par l’identifiant de votre scène.

---

## 8) Bonnes pratiques

- Lisez le `README.md` de la scène puis le fichier de test pour comprendre les attentes.
- Exécutez les tests fréquemment.
- Validez régulièrement avec `cq validate` depuis la racine.
- (Optionnel) Utilisez Git: une branche par scène.

Exemple Git:
```powershell
git checkout -b scene/N00-intro
# travail...
git add .
git commit -m "Complete N00-intro"
```

---

## 9) Dépannage rapide (Windows)

- « cq n’est pas reconnu »: refaire `npm link`, ou `npm install -g .`, puis relancer PowerShell.
- Port 3000 occupé:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
npm run control-room
```
- Exécution bloquée (ExecutionPolicy):
```powershell
# Lancer PowerShell en Administrateur
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
- Node trop ancien: installez la dernière LTS depuis `https://nodejs.org`.

Plus de cas dans `docs/TROUBLESHOOTING.md`.

---

## 10) Aide‑mémoire (sans `&&`)

Installation:
```powershell
npm install
npm link
cq --help
```
Lancer l’interface:
```powershell
npm run control-room
# Ouvrir: http://localhost:3000/roadmap
```
Première scène (acts):
```powershell
cd acts\act1\N00-intro
type README.md
node test.js
```
Validation (depuis la racine):
```powershell
cd ..\..\..\
cq validate
```
Aide:
```powershell
cq help-me N00-intro
```

Bon apprentissage et amusez-vous bien avec CodeQuest ! 🚀
