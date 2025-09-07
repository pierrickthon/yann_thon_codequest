# 🌦️ Raid #1 - API Weather Service

## 📋 Mission Brief - Template 2.3

**Mission ID** : RAID-01  
**Code Name** : Weather Watcher  
**Difficulty** : ⭐⭐⭐ (Intermediate)  
**Duration** : 2-3 heures  
**Team Size** : 2-4 développeurs  

---

## 🎯 Objectif Principal

Développer un **service météo intelligent** capable d'agréger des données de multiples sources, gérer les pannes et fournir des prévisions fiables même en mode dégradé.

### Contraintes Techniques
- **100% Offline** : Aucun appel réseau réel
- **Simulation realistic** : Délais, rate limits, échecs probabilistes  
- **Robustesse** : Retry, timeout, circuit breaker
- **Performance** : Concurrence limitée, cache intelligent

---

## 📊 Spécifications Fonctionnelles

### API Endpoints à Implémenter

#### 1. `GET /weather/current/:city`
Météo actuelle pour une ville.

**Response Format :**
```json
{
  "city": "Paris",
  "temperature": 18,
  "description": "cloudy", 
  "humidity": 65,
  "windSpeed": 15,
  "timestamp": 1640995200000,
  "source": "primary",
  "confidence": 0.95
}
```

#### 2. `GET /weather/forecast/:city`
Prévisions 7 jours avec agrégation multi-sources.

#### 3. `GET /weather/batch`
Météo pour plusieurs villes (body: `{"cities": ["Paris", "London", "Berlin"]}`)

#### 4. `GET /health`
Status du service et des sources de données.

---

## 🔧 Architecture Technique

### Sources de Données Simulées
1. **PrimaryWeatherAPI** : Rapide, fiable à 90%
2. **BackupWeatherAPI** : Plus lent, fiable à 95% 
3. **LocalWeatherCache** : Instantané, données 1h max

### Patterns à Implémenter
- **Circuit Breaker** : Isolation des sources défaillantes
- **Retry with Backoff** : Récupération intelligente
- **Graceful Degradation** : Mode dégradé avec cache
- **Rate Limiting** : Respect des quotas API
- **Concurrent Processing** : Max 3 requêtes parallèles

---

## 📈 Critères d'Acceptation

### Fonctionnels ✅
- [ ] **Météo actuelle** : Réponse < 2s pour ville connue
- [ ] **Prévisions** : Agrégation 2+ sources quand disponible
- [ ] **Batch processing** : 10 villes en < 5s
- [ ] **Mode dégradé** : Réponse même si sources primaires down
- [ ] **Cache intelligent** : Évite requêtes redondantes

### Non-Fonctionnels ✅  
- [ ] **Resilience** : Continue avec 1 seule source disponible
- [ ] **Rate Limits** : Respecte 10 req/min par source
- [ ] **Timeout handling** : Abandon après 3s par requête
- [ ] **Error handling** : Messages clairs pour debug
- [ ] **Monitoring** : Logs structurés, métriques de santé

### Bonus 🏆
- [ ] **Intelligent caching** : TTL adaptatif selon fiabilité source
- [ ] **Load balancing** : Répartition intelligente des requêtes  
- [ ] **Predictive prefetch** : Anticipe les demandes fréquentes
- [ ] **A/B testing** : Compare efficacité des stratégies

---

## 🧪 Plan de Test

### Scénarios Nominaux
1. **Happy Path** : Toutes sources OK, ville populaire
2. **Cache Hit** : Données récentes en cache
3. **Batch Request** : 5 villes européennes

### Scénarios de Panne  
1. **Primary Down** : Basculement sur backup
2. **All APIs Down** : Mode cache seul
3. **Rate Limited** : Attente et retry
4. **Timeout Network** : Abandon propre après 3s

### Tests de Performance
1. **Load Test** : 100 req/s pendant 1 min
2. **Stress Test** : Montée en charge progressive
3. **Endurance** : Stabilité sur 30 min

---

## 📦 Livrables Attendus

### Code Source
- **`src/weather-service.js`** : API principale
- **`src/data-sources/`** : Implémentations sources
- **`src/utils/`** : Circuit breaker, cache, retry
- **`tests/`** : Tests unitaires + intégration

### Documentation
- **`API.md`** : Documentation endpoints
- **`DEPLOYMENT.md`** : Instructions de déploiement  
- **`ARCHITECTURE.md`** : Schémas et décisions techniques
- **`RAID_LOG.md`** : Journal d'équipe et décisions

---

## 🚨 Plan B & Emergency Hints

### Si blocage architecture
1. **Commencer simple** : Une source, pas de retry
2. **Ajouter couche par couche** : Cache → Retry → Circuit breaker
3. **Tester au fur et à mesure** : Validation incrémentale

### Si problèmes techniques
1. **Mock d'abord** : Données statiques pour valider structure
2. **Logs détaillés** : console.log pour debugging
3. **Tests unitaires** : Isoler chaque composant

### Support Formateur
- **Aide disponible** : Max 2 interventions de 10 min/équipe
- **Debug session** : Si bloquage > 1h
- **Code review** : À mi-parcours si demandé

---

## 🏆 Scoring Rubric (100 points)

| Critère | Points | Description |
|---------|--------|-------------|
| **Fonctionnel** | 40 pts | API endpoints fonctionnels |
| **Robustesse** | 25 pts | Gestion erreurs, retry, timeout |
| **Architecture** | 20 pts | Code structuré, patterns appropriés |
| **Tests** | 10 pts | Couverture et qualité des tests |
| **Bonus** | 5 pts | Features bonus implémentées |

### Seuils
- **85+ pts** : 🏆 Excellent (ready for production)
- **70+ pts** : ⭐ Bien (solid implementation) 
- **55+ pts** : ✅ Correct (meets requirements)
- **<55 pts** : 🔄 À retravailler

---

## ⏰ Timeline Recommandé

### H+0 : Setup & Planning (30 min)
- Lecture mission brief
- Architecture rough design
- Attribution des rôles équipe
- Setup environnement dev

### H+30 : Core Implementation (90 min)  
- Structure projet de base
- Mock des sources de données
- API endpoints principaux
- Tests unitaires essentiels

### H+2h : Advanced Features (45 min)
- Circuit breaker
- Cache intelligent
- Retry with backoff
- Rate limiting

### H+2h45 : Testing & Polish (30 min)
- Tests d'intégration
- Documentation
- Code cleanup
- Préparation démo

### H+3h15 : Demo (15 min)
- Présentation architecture
- Démo fonctionnalités
- Tests de robustesse live
- Q&R formateur

---

**🚀 Let's build something awesome! Weather never felt so technical! 🌦️**

*Mission généée par CodeQuest 2.3 - Raid Generator v2.3.0*