# Guide Étudiant – CodeQuest 2.3 (Windows)

Bienvenue dans CodeQuest, une plateforme ludique pour apprendre JavaScript/TypeScript avec la méthode TDD.
Ce guide explique clairement les étapes pour installer, démarrer et valider vos scènes, en évitant les commandes avec `&&` et sans utiliser la « Control Room » (réservée à l’enseignant). Les étudiants utilisent la page Roadmap et la CLI.

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
Si la commande CLI n’est pas disponible, vous pouvez aussi faire:
```powershell
npm install -g .
```
Vérifier que la CLI est accessible via npm scripts:
```powershell
npm run cq
```

---

## 3) Lancer une scène (création de l’espace de travail)

Utilisez la CLI pour préparer votre espace de travail étudiant. Exemple avec la première scène « N00-warmup »:
```powershell
npm run cq start N00-warmup
```
Cela crée/copiera les fichiers nécessaires dans:
```
student-workspace\current\N00-warmup\
```

Éditez votre code dans:
```
student-workspace\current\N00-warmup\starter\index.js
```
(Il n’y a plus de `solution.js` à modifier.)

---

## 4) Lancer les tests de la scène

Après modification de `starter\index.js`, lancez les tests copiés dans l’espace de travail:
```powershell
node student-workspace\current\N00-warmup\tests.spec.js
```
Corrigez votre code jusqu’à obtenir « tous les tests passés ».

---

## 5) Valider votre progression (via npm scripts)

Validez avec la CLI via npm scripts pour éviter les soucis d’environnement:
```powershell
npm run cq validate N00-warmup
```
Résultats possibles: Base, Bonus, Challenge.

---

## 6) Demander de l’aide (hints)

Si vous êtes bloqué, demandez de l’aide contextuelle (via npm scripts):
```powershell
npm run cq help-me N00-warmup
```

---

## 7) Voir la Roadmap (étudiants)

La page Roadmap permet de visualiser votre progression. Elle est généralement servie par l’environnement de cours. Si votre enseignant l’a lancée, ouvrez:
```
http://localhost:3000/roadmap
```
(Si aucun serveur n’est disponible, concentrez-vous sur la CLI et les tests en local.)

---

## 8) Bonnes pratiques

- Lisez les consignes de la scène (fichiers `README.md`/`manifest.json`) et ouvrez les tests pour comprendre les attentes.
- Travaillez dans `student-workspace\current\<scene>\starter\`.
- Testez souvent avec `node ...\tests.spec.js`.
- Validez régulièrement avec `npm run cq validate <scene>`.
- (Optionnel) Utilisez Git: une branche par scène.

Exemple Git:
```powershell
git checkout -b scene/N00-warmup
# travail...
git add .
git commit -m "Complete N00-warmup"
```

---

## 9) Dépannage rapide (Windows)

- « CLI indisponible »: refaire `npm link`, ou `npm install -g .`, puis relancer PowerShell. Utilisez toujours `npm run cq ...` dans ce guide.
- Port 3000 (Roadmap) occupé: (si l’enseignant a lancé un serveur)
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
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
npm run cq
```
Préparer la scène:
```powershell
npm run cq start N00-warmup
```
Éditer et tester:
```powershell
# Éditez: student-workspace\current\N00-warmup\starter\index.js
node student-workspace\current\N00-warmup\tests.spec.js
```
Validation:
```powershell
npm run cq validate N00-warmup
```
Aide:
```powershell
npm run cq help-me N00-warmup
```

Bon apprentissage et amusez-vous bien avec CodeQuest ! 🚀
