# CodeQuest 2.3 - Spécifications Complètes

> Version: 2.3.0 | Status: Ready for Implementation | Date: 2025-09-06
> Stack-agnostique, centré sur JS/TS + TDD, offline-first

## 0. ASSUMPTIONS & CONTRAINTES (EN TÊTE POUR CLARTÉ)

### Assumptions Techniques
- Environnement Node.js 18+ disponible
- Git installé sur tous les postes
- Discord accessible (non bloqué)
- Mode offline-first (connexion optionnelle)
- Navigateur moderne (Chrome/Firefox/Edge récent)
- 4GB RAM minimum par poste
- Stockage local 500MB disponible

### Assumptions Pédagogiques
- Public: Étudiants L3 informatique ou équivalent
- Prérequis: Bases algorithmiques, Git/CLI basique
- Focus: **JavaScript ES6+, TypeScript, TDD** (pas HTML/CSS)
- Capacité travail autonome
- Anglais technique lu

### Contraintes Imposées
- **Stack agnostique** (aucun framework imposé)
- **Offline-first obligatoire** (réseau optionnel)
- 4 jours maximum (28h)
- 20-30 étudiants par session
- 1-2 formateurs maximum
- Budget hébergement minimal
- Compatibilité multi-OS

## 1. SPÉCIFICATION FONCTIONNELLE

### 1.1 Vision & Philosophie

**Vision**: Plateforme de formation gamifiée **offline-first** permettant l'apprentissage progressif du **JavaScript moderne, TypeScript et TDD** via une métaphore architecturale où chaque étudiant construit sa cité numérique.

**Philosophie Offline-First**:
- La validation se fait via **Git hooks et CI/CD**, pas via UI
- L'UI est une **couche de visualisation**, pas le moteur
- Par défaut: **fichiers JSON et polling**, WebSocket optionnel
- **Import/export manuel** des awards via fichiers

**Changements majeurs vs 2.2**:
- Actes renommés pour coller au programme JS/TS/TDD
- Statuts stockés comme codes (`base`/`bonus`/`challenge`), émojis en UI
- Raids 100% stack-agnostiques
- CLI commands centrales: `challenge start`, `challenge validate`, `challenge help`
- Format rétro ultra-simple (3 lignes)
- Plan minute pour chaque raid

### 1.2 Personas

#### Étudiant (Alice)
- 20 ans, L3 informatique
- Première expérience avec TypeScript et TDD
- Anxiété face aux erreurs de types
- Besoins: progression claire, feedback immédiat, sécurité psychologique

#### Formateur (Bob)
- Expérience pédagogique 5+ ans
- Gère 20-30 étudiants simultanément
- Besoins: vue d'ensemble, détection blocages, interventions ciblées

#### Mentor-Pair (Charlie)
- Étudiant plus avancé
- Rôle de buddy system
- Besoins: outils de communication, reconnaissance

### 1.3 User Stories (format Gherkin-like)

```gherkin
Feature: Progression par Scène avec Git
  En tant qu'étudiant
  Je veux valider mes scènes via Git
  Pour avoir un workflow réaliste

  Scenario: Démarrer une scène
    Given je suis dans le terminal
    When j'exécute `challenge start N03-closures`
    Then le squelette est copié dans `/student-workspace/alice/N03-closures/`
    And un message m'indique le chemin
    And le timer démarre

  Scenario: Valider via Git
    Given j'ai modifié le code de N03
    When je fais `git add . && git commit -m "solve N03" && git push`
    Then le CI/CD hook s'exécute
    And les tests sont lancés automatiquement
    And mon statut est mis à jour (base/bonus/challenge)
    And la scène suivante est débloquée si succès

  Scenario: Panic Button
    Given je suis bloqué depuis 30 minutes
    When j'exécute `challenge help`
    Then un HelpRequest est généré avec contexte complet
    And inclut mon OS, version Node, shell
    And génère un message Discord formaté
    And suggère un buddy approprié
```

### 1.4 Flux Principal: Boucle Git-Centrique

```
1. START: challenge start <scene>
2. CODE: Modifier les fichiers dans student-workspace/
3. TEST: Exécuter les tests localement (npm test)
4. COMMIT: git add . && git commit -m "solution"
5. PUSH: git push origin main
6. VALIDATE: CI/CD hook automatique
7. FEEDBACK: Résultat dans console + mise à jour UI
8. UNLOCK: Scène suivante disponible si succès
```

### 1.5 Programme Aligné sur le Cours (4 Jours)

#### Acte I - Fondations JS Modernes (J1, Présentiel)
- **Thème**: JavaScript ES6+ et patterns modernes
- **Scènes**:
  - N01: Modules & imports
  - N02: Immutabilité & spread/rest
  - N03: Closures & scope
  - N04: Arrays (map/filter/reduce)
  - N05: Objets & patterns (factory/strategy)
  - N06: Mini-Boss TDD (moteur de scoring)
- **Raid I** (45-60 min): Refactor Rescue

#### Acte II - Asynchronisme & I/O (J2, Remote)
- **Thème**: Promises, async/await, orchestration
- **Scènes**:
  - N07: Promises (création/chaînage)
  - N08: Async/await + try/catch
  - N09: Parallélisme vs séquentiel
  - N10: Timeouts/retry/backoff
  - N11: Orchestrations (patterns composite)
  - N12: Boss "Flux API simulé"
- **Raid II** (90 min, remote): Resilience Orchestrator

#### Acte III - TypeScript (J3, Présentiel)
- **Thème**: Types, interfaces, guards
- **Scènes**:
  - N13: Strict mode progressif
  - N14: Types & interfaces publics
  - N15: Unions & type guards
  - N16: Generics simples
  - N17: Utility types
  - N18: Boss "Migration stable"
- **Raid III** (90 min): Type-Safe Contracts

#### Acte IV - Qualité, Tests & CI/CD (J4, Présentiel)
- **Thème**: TDD, tests, pipeline
- **Scènes**:
  - N19: Tests unitaires (TDD)
  - N20: Mocking minimal
  - N21: Tests d'intégration
  - N22: Coverage sur Boss uniquement
  - N23: Lint/format/commit hooks
  - N24: Pipeline CI (contrats)
  - N25: Boss "Ship-it"
- **Raid IV** (90 min): Ship Night

#### Stretch Goals (S1-S15, Optionnels)
- Variantes avancées: performance, sécurité, patterns complexes
- Activables si la classe progresse rapidement

### 1.6 Rituels

#### Blueprint d'Acte
- Moment: Début de chaque acte
- Format: Présentation 5 min par formateur
- Contenu: Métaphore architecturale, objectifs, pièges courants

#### #aha-moments
- Déclencheur: Découverte significative
- Action: Post dans #aha-moments Discord
- Récompense: Points Mentor au contributeur

#### Team Raids avec Plan Minute
- Format: Équipes de 3-4
- Structure temporelle:
  ```
  Brief: 5 min
  Sprint 1: 25 min
  Sync: 5 min
  Sprint 2: 25 min
  Polish: 10 min
  Demo: 5 min
  Review: 15 min
  ```

#### Rétrospective Simplifiée
- Format markdown ultra-simple:
  ```markdown
  # Retro J{X} - {Nom}
  - J'ai vraiment compris: ...
  - Reste flou: ...
  - Question pour demain: ...
  ```

### 1.7 Règles du Jeu Simplifiées

#### Système de Scoring (Codes Internes)

**Base Validation (stocké: "base")**
```
IF all_tests_pass() AND no_compilation_errors() THEN
  status = "base"  // UI affiche ✅
  unlock_next_scene()
END
```

**Bonus Étoile (stocké: "bonus")**
```
IF status == "base" AND (time < 600 OR hints_used == 0) THEN
  status = "bonus"  // UI affiche ⭐
END
// Note: "élégance" réservée aux Boss/Raids (revue humaine)
```

**Challenge Trophy (stocké: "challenge")**
```
IF status == "base" AND challenge_condition_met() THEN
  status = "challenge"  // UI affiche 🏆
END
```

#### Badges Système (Ajustés)

```
Badge "Maître TDD":
  trigger: fix_failing_tests(count >= 3) in single_validation
  
Badge "Sprinteur":
  trigger: complete_scene(time < 30 minutes)
  
Badge "Type Guardian" (NOUVEAU CRITÈRE):
  trigger: ts_strict_enabled AND no_any_in_public_APIs AND type_guards_on_IO
  // Plus de % coverage sur micro-exos
  
Badge "Mentor":
  trigger: earn_mentor_points(>= 5)
  
Badge "Fast-Tracker":
  trigger: complete_act_in_challenge_mode(time <= 7200, hints <= 2)
```

## 2. MODÈLES DE DONNÉES (JSON SCHEMAS)

### 2.1 ActManifest Schema (Amélioré avec SceneRef)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "ActManifest",
  "type": "object",
  "required": ["id", "title", "theme", "scenes", "blueprint"],
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1,
      "maximum": 4
    },
    "title": {
      "type": "string",
      "examples": ["Fondations JS Modernes", "Asynchronisme & I/O", "TypeScript", "Qualité & Tests"]
    },
    "theme": {
      "type": "string",
      "description": "Thème technique de l'acte"
    },
    "scenes": {
      "type": "object",
      "properties": {
        "core": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/SceneRef"
          },
          "minItems": 6,
          "maxItems": 7
        },
        "stretch": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/SceneRef"
          }
        }
      },
      "required": ["core"]
    },
    "blueprint": {
      "$ref": "#/definitions/Blueprint"
    }
  },
  "definitions": {
    "SceneRef": {
      "type": "object",
      "required": ["id", "path"],
      "properties": {
        "id": {
          "type": ["integer", "string"],
          "description": "1-25 pour core, S1-S15 pour stretch"
        },
        "path": {
          "type": "string",
          "description": "Chemin relatif vers le dossier de la scène"
        }
      }
    },
    "Blueprint": {
      "type": "object",
      "required": ["objectives", "pitfalls", "concepts"],
      "properties": {
        "objectives": {
          "type": "array",
          "items": {"type": "string"}
        },
        "pitfalls": {
          "type": "array",
          "items": {"type": "string"}
        },
        "concepts": {
          "type": "array",
          "items": {"type": "string"}
        }
      }
    }
  }
}
```

### 2.2 Progress Schema (Status au lieu d'émojis)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "Progress",
  "type": "object",
  "required": ["studentId", "currentAct", "currentScene", "scenes"],
  "properties": {
    "studentId": {
      "type": "string"
    },
    "currentAct": {
      "type": "integer"
    },
    "currentScene": {
      "type": ["integer", "string"]
    },
    "scenes": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "status", "timeSpent", "hintsUsed"],
        "properties": {
          "id": {
            "type": ["integer", "string"]
          },
          "status": {
            "enum": ["locked", "in_progress", "base", "bonus", "challenge"],
            "description": "UI maps: base→✅, bonus→⭐, challenge→🏆"
          },
          "timeSpent": {
            "type": "integer",
            "description": "Time in seconds"
          },
          "hintsUsed": {
            "type": "integer"
          },
          "completedAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      }
    }
  }
}
```

### 2.3 HelpRequest Schema (Enrichi)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "HelpRequest",
  "type": "object",
  "required": ["act", "scene", "student", "summary", "env", "timestamp"],
  "properties": {
    "act": {
      "type": "integer",
      "minimum": 1,
      "maximum": 4
    },
    "scene": {
      "type": ["integer", "string"]
    },
    "student": {
      "type": "object",
      "required": ["name", "team"],
      "properties": {
        "name": {"type": "string"},
        "team": {"type": "string"}
      }
    },
    "summary": {
      "type": "string",
      "maxLength": 500
    },
    "failingTests": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {"type": "string"},
          "errorSnippet": {"type": "string"}
        }
      }
    },
    "env": {
      "type": "object",
      "required": ["os", "node", "shell"],
      "properties": {
        "os": {
          "enum": ["win", "mac", "linux"]
        },
        "node": {
          "type": "string",
          "pattern": "^\\d+\\.\\d+\\.\\d+$"
        },
        "shell": {
          "enum": ["bash", "zsh", "powershell", "cmd", "fish"]
        }
      }
    },
    "attachments": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "Paths to optional screenshots or logs"
      }
    },
    "timeSpentMin": {
      "type": "integer"
    },
    "hintsUsed": {
      "type": "integer"
    },
    "commitHash": {
      "type": "string"
    },
    "buddySuggested": {
      "type": "string"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

### 2.4 Trophy Schema (Normalisé)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "Trophy",
  "type": "object",
  "required": ["id", "source", "title"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^(raid-\\d{2}|scene-\\d+-challenge)$"
    },
    "source": {
      "enum": ["raid", "scene"]
    },
    "title": {
      "type": "string"
    },
    "engraved": {
      "type": "array",
      "items": {"type": "string"},
      "description": "Team members for raid trophies"
    },
    "earnedAt": {
      "type": "string",
      "format": "date-time"
    }
  }
}
```

## 3. CONTRATS D'API ET CLI (Stack-agnostique)

### 3.1 CLI Commands (Centrales)

```bash
# Commandes principales
challenge start <scene>        # Copie le squelette dans student-workspace/
challenge validate [scene]     # Validation locale (avant push)
challenge help                 # Génère HelpRequest avec contexte
challenge hint <level>         # Affiche hint H1/H2/H3
challenge status              # Affiche progression actuelle
challenge fast-track <act>    # Lance le mode challenge 2h

# Workflow Git-centrique
git add . && git commit -m "solve N03" && git push
# → Déclenche CI/CD hook automatique
# → Validation et mise à jour du statut
```

### 3.2 Endpoints Optionnels (HTTP ou Fichiers)

```yaml
# Par défaut: FICHIERS
reports/*.json                 # Export local des progressions
awards/grants.json            # Import manuel des trophées
retro/retro-J*.md            # Rétrospectives quotidiennes

# Optionnel: HTTP (si réseau disponible)
POST /api/progress/validate
  Input: { scene_id, student_id, commit_hash }
  Output: { status: "base"|"bonus"|"challenge", next_scene }
  Idempotence: commit_hash comme clé

GET /api/monitor/state
  Output: { students: Progress[], heatmap: {}, alerts: [] }
  Default: HTTP polling every 5 min
  Optional: WebSocket for real-time (NOT required)

POST /api/help/request
  Input: HelpRequest (avec env + attachments)
  Rate-limit: 1/5min + backoff si 3 en 15min
```

### 3.3 Capabilities (Abstractions)

```typescript
// Stack-agnostique: implémentable en n'importe quel langage
interface ProgressCapability {
  validateScene(sceneId: string, solution: any): Promise<ValidationResult>
  grantAward(studentId: string, type: "badge"|"trophy", id: string): Promise<boolean>
  // Idempotence: sans effet si déjà possédé
}

interface MonitoringCapability {
  getHeatmap(): Promise<{[sceneId: string]: DifficultyMetrics}>
  detectStuckStudents(threshold: number): Promise<Student[]>
  // Default: file-based polling; Optional: WebSocket
}
```

## 4. FORMATS ET TEMPLATES

### 4.1 Structure Niveau Clarifiée

```
/levels/
  /act-1-js-moderne/
    manifest.json              # ActManifest
    blueprint.md              # Présentation architecturale
    /N01-modules/
      manifest.json           # SceneManifest
      README.md              # Instructions
      challenge/
        index.js             # Squelette à compléter
        index.test.js        # Tests fournis
      solution/
        index.js             # Solution cachée (gitignored)
      hints.json             # {"H1": "...", "H2": "...", "H3": "..."}
    /N02-immutability/
    ...
    /N06-mini-boss-tdd/
```

### 4.2 Message "Dossier de Mission" (Template d'Urgence)

```markdown
[URGENT] De: CTO @ TechCorp
Sujet: Alerte - Module critique défaillant

Équipe {{TEAM}}, votre mission (timebox 90 min):
1) Refactorer le module en fonctions pures
2) 100% tests verts (fournis)
3) Rapport "dette technique éliminée" (1 paragraphe)
4) Démo 3 min au board

Assets → missions/raid-01/
Score ≥ 70 débloque le Trophée "Refactor Hero"
Bonne chance.
```

### 4.3 RAID_LOG Simplifié

```markdown
# RAID LOG - {{TEAM}} - {{RAID_ID}}

## Décisions d'Architecture
- [HH:MM] Décision - Raison - Trade-offs

## Log IA
- [HH:MM] Prompt → Gardé/Écarté

## Aha! Moments
- [HH:MM] {{Prénom}} - Insight
```

### 4.4 Format Retro Ultra-Simple

```markdown
# Retro J{{X}} - {{NOM}}
- J'ai vraiment compris: {{CONCEPT}}
- Reste flou: {{DIFFICULTÉ}}
- Question pour demain: {{QUESTION}}
```

## 5. TEAM RAIDS (Stack-Agnostiques & Réalistes)

### 5.1 Raid I: Refactor Rescue (J1, 45-60 min)

```yaml
theme: "Logique pure et TDD"
objectives:
  - Extraire logique métier en fonctions pures
  - Atteindre 100% tests passants
  - Documenter les choix d'architecture
constraints:
  - Pas d'effets de bord dans le core
  - Données simulées (pas d'I/O réel)
  - Tests fournis, ne pas les modifier
deliverables:
  - Code refactoré
  - RAID_LOG.md
  - README avec ROI de la dette éliminée
rubric:
  correctness: 40
  purity: 20
  documentation: 20
  teamwork: 10
  demo: 10
```

### 5.2 Raid II: Resilience Orchestrator (J2, 90 min, Remote-OK)

```yaml
theme: "Orchestration d'appels asynchrones"
objectives:
  - Implémenter retry/timeout/backoff
  - Gérer les dépendances entre appels
  - Fallback gracieux sur erreurs
constraints:
  - Utiliser des services mockés fournis
  - Pas de librairie externe de retry
  - Solution générique (pas lié à une stack)
black_box:
  inputs: ["sequence of API calls with dependencies"]
  outputs: ["aggregated result or graceful error"]
```

### 5.3 Raid III: Type-Safe Contracts (J3, 90 min)

```yaml
theme: "Contrats TypeScript robustes"
objectives:
  - Définir interfaces publiques strictes
  - Implémenter type guards complets
  - Zero 'any' dans les APIs publiques
constraints:
  - TypeScript strict mode
  - Validation runtime des inputs externes
  - Documentation TSDoc complète
deliverables:
  - contracts.ts avec toutes les interfaces
  - guards.ts avec les type guards
  - validation.test.ts prouvant la robustesse
```

### 5.4 Raid IV: Ship Night (J4, 90 min)

```yaml
theme: "Pipeline de livraison complète"
objectives:
  - Tests d'intégration complets
  - Pipeline CI/CD (format agnostique)
  - Déploiement simulé avec rollback
constraints:
  - Coverage > 80% sur le module critique
  - Tous les checks passent (lint, format, tests)
  - Documentation de déploiement
demo:
  - Montrer le pipeline complet
  - Déclencher un rollback live
  - Métriques de qualité
```

## 6. INSTRUMENTATION ET MONITORING

### 6.1 Métriques Collectées (Simplifiées)

```yaml
Student:
  - scenes_completed: [id, status, time, hints]
  - current_position: act/scene
  - help_requests: count
  - fast_track_attempts: [{act, success, time}]

Collective:
  - progression_matrix: student × scene → status
  - difficulty_heatmap: scene → stuck_count
  - common_errors: pattern → frequency

System:
  - validation_time: p50/p95/p99
  - storage_usage: MB
  - active_students: count
```

### 6.2 Monitoring (Offline-First)

```yaml
Default Mode:
  - Files: reports/*.json exportés localement
  - Import: Manual upload to Control Room
  - Polling: Every 5 min if network available

Optional Enhancement:
  - WebSocket: Real-time updates (NOT required for MVP)
  - Stream: Continuous metrics flow
  - Alerts: Push notifications
```

## 7. MVP CHECKLIST (Actualisée)

```markdown
## Infrastructure
- [ ] Git repo avec hooks configurés
- [ ] Structure /levels avec Acte I complet
- [ ] CLI `challenge` fonctionnel

## Acte I - JS Moderne (6 scènes + boss)
- [ ] N01: Modules - squelette + tests
- [ ] N02: Immutability - squelette + tests
- [ ] N03: Closures - squelette + tests
- [ ] N04: Arrays - squelette + tests
- [ ] N05: Patterns - squelette + tests
- [ ] N06: Mini-Boss TDD - challenge complet
- [ ] Hints (H1/H2/H3) pour chaque niveau
- [ ] Solutions cachées validées

## Validation & Tests
- [ ] CI/CD hook sur push
- [ ] Validation automatique des solutions
- [ ] Testeur Alpha: N1-N5 < 60 min
- [ ] Testeur Beta: validation technique
- [ ] Dry-run complet 2h

## Discord & Communication
- [ ] Channels: #general, #stuck, #aha-moments
- [ ] Templates messages configurés
- [ ] Bot activity (ping si inactif > 60 min)

## Documentation
- [ ] Student guide avec workflow Git
- [ ] Trainer guide J1-J4
- [ ] Vidéo démo 3 min (script ready)
- [ ] Troubleshooting guide

## Definition of Done
- [ ] 3 profils testeurs: Acte I < 2h
- [ ] Workflow Git → Validation fluide
- [ ] Panic button génère bon contexte
- [ ] Awards import/export fonctionnel
- [ ] Formateur confiant pour J1
```

## 8. PLANS B (Inchangés mais Critiques)

### 8.1 J1 Traîne
- Trigger: 50% encore sur N5 à 15:00
- Action: Skip N4-N5, direct au Boss simplifié
- Recovery: Session rattrapage soir ou J2 matin

### 8.2 Remote J2 Fail
- Trigger: >30% absents au check-in 14:00
- Action: Mode asynchrone complet, solutions partielles fournies
- Recovery: Pair programming J3 matin

### 8.3 TypeScript Trop Dur
- Trigger: >50% bloqués sur types >45 min
- Progressive: any autorisé → @ts-ignore → .js accepté
- Keep: Types sur APIs publiques uniquement

### 8.4 Tests Impossibles
- Trigger: <50% tests passent après 1h
- Action: Identifier 3 tests critiques, ignorer les autres
- Alternative: Validation par démo live

## 9. GUIDE ANIMATION J1 (Extrait Actualisé)

```markdown
## J1 - PRÉSENTIEL - FONDATIONS JS MODERNES

### 09:00-09:30 - Onboarding
- [ ] Présentation CodeQuest 2.3
- [ ] Philosophie Git-centrique
- [ ] Demo workflow: challenge start → code → push → validate
- [ ] Distribution buddies

### 10:00-12:00 - Acte I (N1-N3)
- [ ] N01: Modules (20 min target)
- [ ] N02: Immutability (25 min target)
- [ ] N03: Closures (30 min target)
- [ ] Circulation active, aide si 3+ bloqués

### 13:00-15:00 - Acte I Suite (N4-N6)
- [ ] N04: Arrays (25 min target)
- [ ] N05: Patterns (35 min target)
- [ ] Check progression collective
- [ ] Activer Plan B si retard

### 15:00-16:00 - Raid I: Refactor Rescue
- [ ] Brief 5 min
- [ ] Sprint 25 min
- [ ] Sync 5 min
- [ ] Sprint final 20 min
- [ ] Demos 5 min

### 16:00-17:00 - N06: Mini-Boss TDD
- [ ] Challenge plus complexe
- [ ] Introduction au TDD

### 17:00-17:30 - Rétro J1
- [ ] Format 3 lignes
- [ ] Collecte retro-J1.md
- [ ] Preview J2 remote
```

## CONCLUSION

CodeQuest 2.3 représente une évolution **pragmatique et alignée** sur les objectifs pédagogiques réels:
- **Focus JS/TS/TDD** (exit HTML/CSS)
- **Git-centrique** (validation via push, pas UI)
- **Offline-first** (polling/fichiers par défaut)
- **Stack-agnostique** (aucune techno imposée)
- **Simplicité** (statuts comme codes, rétro 3 lignes)

**Next Steps Immédiats**:
1. Créer le repo avec structure `/levels/act-1/`
2. Implémenter N01-N06 avec tests
3. Configurer Git hooks CI/CD
4. Tester avec 3 profils < 2h
5. Enregistrer vidéo démo 3 min

---
*Document de spécification v2.3.0 - CodeQuest*
*Status: Ready for Implementation*