# 🎮 CodeQuest 2.3 - Guide Étudiant

## Démarrage Rapide (10 étapes)

### 1️⃣ Installation
```bash
git clone <repo>
cd codequest
npm install
npm link
```

### 2️⃣ Lancer la Roadmap
```bash
npm run control-room
```
Ouvrir: http://localhost:3000/roadmap

### 3️⃣ Choisir une scène
Cliquer sur le niveau 1 (N00) dans la Roadmap UI

### 4️⃣ Démarrer la scène
```bash
cq start N00
```
Le starter est copié dans `student-workspace/current/N00-scene/`

### 5️⃣ Coder la solution
```bash
cd student-workspace/current/N00-scene
# Éditer solution.js avec votre éditeur favori
```

### 6️⃣ Tester localement
```bash
node test.js
```

### 7️⃣ Valider avec CodeQuest
```bash
cq validate N00
```
Résultat: base ✅ | bonus ⭐ | challenge 🏆

### 8️⃣ Voir la progression
Retourner sur http://localhost:3000/roadmap
Le niveau devient vert avec animation!

### 9️⃣ Demander de l'aide
```bash
cq help-me N00
```
Compteur de hints: H1, H2, H3

### 🔟 Exporter pour le formateur
```bash
cq validate N00 --drop
```
Crée un snapshot dans `.progress-drops/`

## Workflow Git-centré

```bash
# 1. Créer une branche pour la scène
git checkout -b scene/N00

# 2. Travailler sur la solution
cq start N00
cd student-workspace/current/N00-scene
# ... coder ...

# 3. Valider
cq validate N00

# 4. Commit quand terminé
git add .
git commit -m "Complete N00: JavaScript Fundamentals"

# 5. Passer à la scène suivante
git checkout -b scene/N01
cq start N01
```

## Structure des fichiers

```
codequest/
├── student-workspace/      # Votre espace de travail
│   ├── current/           # Scène en cours
│   │   └── N00-scene/     # Code de la scène
│   └── progress.json      # Votre progression
├── control-room/          # Interface web
│   ├── roadmap.html       # Vue étudiant
│   └── index.html         # Vue formateur
├── levels/act-1/          # Contenus pédagogiques
│   └── N00-scene/
│       ├── manifest.json  # Métadonnées
│       ├── criteria.json  # Critères de validation
│       └── starter/       # Code de départ
└── .progress-drops/       # Snapshots pour formateur
```

## Commandes CLI

| Commande | Description |
|----------|-------------|
| `cq start <scene>` | Démarre une nouvelle scène |
| `cq validate [scene]` | Valide la scène courante ou spécifiée |
| `cq help-me [scene]` | Demande un hint (max 3) |
| `cq validate --drop` | Exporte un snapshot pour le formateur |

## Statuts de progression

- **⬜ TODO**: Pas encore commencé
- **🔵 STARTED**: En cours
- **✅ BASE**: Tests passent
- **⭐ BONUS**: Critères bonus atteints
- **🏆 CHALLENGE**: Critères challenge atteints
- **🟡 SLOW**: >30min sur la scène
- **🔴 STUCK**: >45min sur la scène

## Tips

1. **Toujours tester avant de valider** : `node test.js`
2. **Viser le challenge** : Regarder criteria.json pour les objectifs
3. **Utiliser les hints progressivement** : H1 → H2 → H3
4. **Rafraîchir la Roadmap** : Auto-refresh toutes les 5 secondes
5. **Exporter régulièrement** : `--drop` pour que le formateur suive

## Troubleshooting

### La Roadmap ne se met pas à jour
- Vérifier que `student-workspace/progress.json` existe
- Rafraîchir la page (F5)

### `cq start` ne copie pas les fichiers
- Vérifier que la scène existe dans `levels/act-1/`
- Utiliser l'ID correct (N00, N01, etc.)

### Tests échouent
- Lire attentivement les messages d'erreur
- Vérifier la syntaxe JavaScript
- Utiliser `cq help-me` pour des indices

### Port 3000 occupé
```bash
PORT=3001 npm run control-room
```