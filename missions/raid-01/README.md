# 🌦️ Raid #1 - Weather Service

## 🚀 Démarrage Rapide

### Installation & Setup
```bash
# Depuis la racine CodeQuest
cd missions/raid-01

# Lancer les tests de base
node tests.spec.js

# Votre point de départ
# → scaffold/weather-service.js
```

### Structure du Projet
```
raid-01/
├── mission-brief.md      # Brief complet de mission
├── scaffold/             # Code de départ
│   └── weather-service.js
├── inputs/               # Données de test
├── expected/             # Sorties attendues
├── tests.spec.js         # Tests de validation
├── RAID_LOG.template.md  # Journal d'équipe
└── emergency-hint.md     # Plan B si blocage
```

## 🎯 Objectif

Implémenter un **service météo robuste** avec :
- ✅ APIs multiples et failover
- ✅ Circuit breaker pattern
- ✅ Cache intelligent avec TTL
- ✅ Retry avec backoff exponentiel
- ✅ Rate limiting per source
- ✅ Mode graceful degradation

## 🧪 Tests & Évaluation

### Tests de Base
```bash
node tests.spec.js
```

### Tests Avancés (après implémentation)
```bash
# Test de charge
node test-load.js

# Test de panne
node test-failure-scenarios.js

# Test de performance
node test-performance.js
```

### Scoring
- **40 pts** : Fonctionnalités de base
- **25 pts** : Robustesse (retry, timeout, errors)
- **20 pts** : Architecture propre
- **10 pts** : Tests de qualité
- **5 pts** : Features bonus

**Seuil de réussite : 55+ points**

## 💡 Conseils d'Implémentation

### Phase 1 - MVP (30 min)
1. Compléter `getCurrentWeather()` basique
2. Implémenter cache simple (Map + TTL)
3. Ajouter gestion d'erreurs de base

### Phase 2 - Robustesse (60 min)
1. Circuit breaker pattern
2. Retry avec exponential backoff
3. Timeout handling approprié
4. Rate limiting par source

### Phase 3 - Optimisations (30 min)
1. Batch processing intelligent
2. Concurrence limitée (max 3 parallèles)
3. Agrégation multi-sources
4. Health monitoring

## 🆘 En Cas de Blocage

1. **Architecture trop complexe ?**
   → Commencez simple, ajoutez couche par couche
   
2. **Problèmes avec les Promises ?**
   → Utilisez async/await, évitez .then()
   
3. **Tests qui échouent ?**
   → Vérifiez les logs, utilisez console.log pour debug
   
4. **Plus de 1h de blocage ?**
   → Consultez emergency-hint.md
   
5. **Besoin d'aide formateur ?**
   → Max 2 interventions de 10 min disponibles

## 📚 Ressources Utiles

- **mock-async.js** : Simulation réaliste d'APIs météo
- **Act II scenes** : Patterns de retry, timeout, concurrency
- **mission-brief.md** : Spécifications complètes
- **RAID_LOG.template.md** : Template journal d'équipe

## 🏆 Critères d'Excellence

**Code Production-Ready :**
- ✅ Gestion d'erreurs complète
- ✅ Logs structurés pour monitoring
- ✅ Tests couvrant happy path ET edge cases
- ✅ Documentation API claire
- ✅ Architecture extensible

**Architecture Patterns :**
- ✅ Separation of concerns
- ✅ Dependency injection
- ✅ Error boundaries
- ✅ Graceful degradation
- ✅ Observability (health, metrics)

---

**🌦️ Let the coding storm begin! Build weather intelligence! ⛈️**