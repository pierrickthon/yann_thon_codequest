# N00: System Check & Warm-up 🚀

## Objectifs d'apprentissage
- ✅ Vérifier que Node.js fonctionne correctement
- ✅ Comprendre le workflow CodeQuest (code → test → validate)  
- ✅ Réussir votre premier test

## Le Challenge

Votre mission est simple mais importante : vérifier que votre environnement est prêt et comprendre le workflow de base.

Vous devez :
1. Implémenter une fonction `getEnvironment()` qui retourne les infos système
2. Créer une fonction `warmUp()` qui retourne un message de bienvenue
3. Faire passer tous les tests

## Instructions

1. Ouvrez `starter/warmup.js`
2. Complétez les fonctions marquées TODO
3. Testez avec : `node tests.spec.js`
4. Validez avec : `cq validate N00`

## Exemple attendu

```javascript
getEnvironment()
// Retourne : { node: 'v18.19.1', platform: 'linux', ready: true }

warmUp('Alice')
// Retourne : 'Welcome Alice to CodeQuest!'
```

## Pièges à éviter
- ⚠️ Assurez-vous d'avoir Node.js 16+ (vérifiez avec `node -v`)
- ⚠️ N'oubliez pas d'exporter vos fonctions
- ⚠️ Respectez exactement le format de retour

## Critères de succès
- ✅ **Base** : Tous les tests passent
- ⭐ **Bonus** : Terminé sans utiliser de hints
- 🏆 **Challenge** : Complété en moins de 3 minutes

Bonne chance ! C'est parti ! 🎮