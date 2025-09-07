#!/usr/bin/env node

/**
 * CodeQuest 2.3 - J1 Pre-flight Checklist
 * Vérifie tout avant le jour J
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');
const { createServer } = require('http');

class PreflightJ1 {
  constructor() {
    this.checks = [];
    this.errors = [];
    this.warnings = [];
    this.serverProcess = null;
    this.startTime = Date.now();
  }

  log(message, type = 'info') {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      step: '🎯'
    };
    console.log(`${icons[type]} ${message}`);
    
    this.checks.push({
      message,
      type,
      timestamp: new Date().toISOString()
    });
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Check environment
  async checkEnvironment() {
    this.log('='.repeat(60), 'info');
    this.log('PHASE 1: Environment Check', 'step');
    this.log('='.repeat(60), 'info');

    // Node version
    const nodeVersion = process.version;
    const major = parseInt(nodeVersion.slice(1).split('.')[0]);
    if (major >= 16) {
      this.log(`Node.js ${nodeVersion} ✓`, 'success');
    } else {
      this.log(`Node.js ${nodeVersion} - Version trop ancienne (requis: 16+)`, 'error');
      this.errors.push('Node.js version');
    }

    // npm available
    try {
      const npmVersion = execSync('npm -v', { encoding: 'utf8' }).trim();
      this.log(`npm ${npmVersion} ✓`, 'success');
    } catch {
      this.log('npm non disponible', 'error');
      this.errors.push('npm missing');
    }

    // Essential files
    const essentialFiles = [
      'src/cli/cli-v2.js',
      'control-room/index.html',
      'control-room/roadmap.html',
      'levels/act-1/N00-warmup',
      'student-workspace',
      'package.json'
    ];

    for (const file of essentialFiles) {
      if (fs.existsSync(file)) {
        this.log(`${file} ✓`, 'success');
      } else {
        this.log(`${file} manquant`, 'error');
        this.errors.push(`Missing: ${file}`);
      }
    }

    // Port availability
    await this.checkPorts();
  }

  async checkPorts() {
    const ports = [3000, 3001, 8080];
    
    for (const port of ports) {
      try {
        const server = createServer();
        await new Promise((resolve, reject) => {
          server.once('error', reject);
          server.once('listening', () => {
            server.close();
            resolve();
          });
          server.listen(port);
        });
        
        this.log(`Port ${port} disponible ✓`, 'success');
        return port; // Return first available port
      } catch {
        this.log(`Port ${port} occupé`, 'warning');
      }
    }
    
    this.log('Aucun port disponible dans 3000-8080', 'error');
    this.errors.push('No ports available');
    return null;
  }

  // Test CLI commands
  async testCLICommands() {
    this.log('='.repeat(60), 'info');
    this.log('PHASE 2: CLI Commands Test', 'step');
    this.log('='.repeat(60), 'info');

    const commands = [
      { cmd: 'node src/cli/cli-v2.js --version', desc: 'Version check' },
      { cmd: 'node src/cli/cli-v2.js --help', desc: 'Help display' },
      { cmd: 'node src/cli/cli-v2.js list', desc: 'List scenes' },
      { cmd: 'node src/cli/cli-v2.js start N00', desc: 'Start scene N00' },
      { cmd: 'node src/cli/cli-v2.js validate N00 --dry-run', desc: 'Validate (dry run)' },
      { cmd: 'node src/cli/cli-v2.js help-me N00', desc: 'Show hints' },
      { cmd: 'node src/cli/cli-v2.js reset N00', desc: 'Reset scene' },
      { cmd: 'node src/cli/cli-v2.js status', desc: 'Show progress' },
      { cmd: 'npm run smoke-test', desc: 'Smoke test' },
      { cmd: 'npm run demo', desc: 'Generate demo data' }
    ];

    let commandsOk = 0;

    for (const { cmd, desc } of commands) {
      try {
        execSync(cmd, { 
          encoding: 'utf8', 
          stdio: 'pipe',
          timeout: 10000 
        });
        this.log(`${desc} ✓`, 'success');
        commandsOk++;
      } catch (error) {
        this.log(`${desc} ❌ - ${error.message}`, 'error');
        this.errors.push(`CLI: ${desc}`);
      }
    }

    this.log(`Commandes CLI: ${commandsOk}/${commands.length} réussies`, 'info');
  }

  // Start servers and open views
  async startServersAndViews() {
    this.log('='.repeat(60), 'info');
    this.log('PHASE 3: Start Servers & Open Views', 'step');
    this.log('='.repeat(60), 'info');

    // Start control room server
    this.log('Démarrage du serveur Control Room...', 'info');
    this.serverProcess = spawn('node', ['src/static-server.js'], {
      detached: false,
      stdio: 'pipe'
    });

    // Wait for server to start
    await this.sleep(3000);

    // Test server accessibility
    try {
      const http = require('http');
      
      const testUrl = (url) => new Promise((resolve, reject) => {
        http.get(url, (res) => {
          if (res.statusCode === 200) {
            resolve(true);
          } else {
            reject(new Error(`Status: ${res.statusCode}`));
          }
        }).on('error', reject);
      });

      await testUrl('http://localhost:3000/');
      this.log('Control Room accessible ✓', 'success');

      await testUrl('http://localhost:3000/roadmap');
      this.log('Student Roadmap accessible ✓', 'success');

    } catch (error) {
      this.log(`Serveur inaccessible: ${error.message}`, 'error');
      this.errors.push('Server not accessible');
    }

    // Open views automatically
    this.openViews();
  }

  openViews() {
    const urls = [
      'http://localhost:3000/',              // Control Room
      'http://localhost:3000/roadmap'       // Student Roadmap  
    ];

    this.log('Ouverture automatique des vues...', 'info');

    urls.forEach((url, index) => {
      setTimeout(() => {
        try {
          const command = process.platform === 'win32' ? 'start' : 
                         process.platform === 'darwin' ? 'open' : 'xdg-open';
          execSync(`${command} ${url}`, { stdio: 'ignore' });
          
          const viewName = url.includes('roadmap') ? 'Student Roadmap' : 'Control Room';
          this.log(`${viewName} ouvert ✓`, 'success');
        } catch (error) {
          this.log(`Impossible d'ouvrir ${url}`, 'warning');
        }
      }, index * 1000);
    });
  }

  // Check offline package
  checkOfflinePackage() {
    this.log('='.repeat(60), 'info');
    this.log('PHASE 4: Offline Package Check', 'step');
    this.log('='.repeat(60), 'info');

    const offlineItems = [
      'dist/offline-kit',
      'codequest-offline-kit.zip',
      'scripts/package-offline.js'
    ];

    let packageReady = true;

    for (const item of offlineItems) {
      if (fs.existsSync(item)) {
        const stats = fs.statSync(item);
        const size = stats.isDirectory() ? 'directory' : `${Math.round(stats.size/1024/1024)}MB`;
        this.log(`${item} (${size}) ✓`, 'success');
      } else {
        this.log(`${item} manquant - Génération...`, 'warning');
        packageReady = false;
      }
    }

    if (!packageReady) {
      try {
        execSync('npm run package:offline', { encoding: 'utf8', stdio: 'pipe' });
        this.log('Package offline généré ✓', 'success');
      } catch (error) {
        this.log('Échec génération package offline', 'error');
        this.errors.push('Offline package generation failed');
      }
    }
  }

  // Generate materials
  generateMaterials() {
    this.log('='.repeat(60), 'info');
    this.log('PHASE 5: Generate Materials', 'step');
    this.log('='.repeat(60), 'info');

    // Generate video script
    this.generateVideoScript();
    
    // Generate blueprint
    this.generateBlueprint();
    
    // Update runbook
    this.updateRunbook();
  }

  generateVideoScript() {
    const script = `# 🎬 CodeQuest 2.3 - Vidéo d'Introduction (3 min)

## 🎯 Objectif
Présenter CodeQuest 2.3 aux étudiants - de zéro au premier niveau réussi en 3 minutes.

## 📝 Script avec Captions

### [00:00-00:15] - Hook & Présentation
**Caption:** "CodeQuest 2.3 - Apprendre JavaScript en résolvant des missions"

**Voix Off:** 
"Salut ! Aujourd'hui on va découvrir CodeQuest 2.3, une plateforme gamifiée pour apprendre JavaScript. En 3 minutes, tu vas passer de zéro à ta première mission réussie !"

**À l'écran:** Animation logo CodeQuest → Roadmap avec niveaux

### [00:15-00:45] - Interface Découverte  
**Caption:** "Interface intuitive - Roadmap visuelle de progression"

**Voix Off:**
"Voici ta roadmap personnalisée. Chaque hexagone représente une mission. Tu commences par N00, puis tu débloques progressivement N01, N02, etc. Les couleurs indiquent ton avancement : gris = à faire, bleu = en cours, vert = réussi."

**À l'écran:** 
- Zoom sur roadmap
- Survol des niveaux N00-N06
- États : locked → current → completed

### [00:45-01:15] - Premier Niveau
**Caption:** "Mission N00 - Warm-up : Vérification environnement"

**Voix Off:**
"Cliquons sur N00 pour commencer. Cette première mission vérifie que ton environnement est prêt. Tu vois les objectifs, les instructions, et 3 boutons : Start pour commencer, Validate pour tester, Help pour des indices."

**À l'écran:**
- Clic N00 → Panel s'ouvre
- Scroll dans README
- Boutons Start/Validate/Help mis en évidence

### [01:15-01:45] - CLI en Action
**Caption:** "Terminal intégré - Commandes simples et puissantes"

**Voix Off:**
"On commence avec 'cq start N00'. Cette commande copie les fichiers de départ dans ton workspace. Puis on code dans notre éditeur favori. Une fois fini, 'cq validate N00' lance les tests automatiquement."

**À l'écran:**
- Terminal : cq start N00
- Fichiers copiés dans student-workspace/
- Éditeur avec warmup.js
- Terminal : cq validate N00

### [01:45-02:15] - Système de Tests
**Caption:** "Tests automatisés - Feedback instantané"

**Voix Off:**
"Les tests te disent exactement ce qui marche et ce qui ne marche pas. Messages clairs, pas de mystère. Si tu réussis tous les tests de base : badge vert. Si tu finis rapidement : badge doré bonus. Si tu maîtrises sans aide : badge légendaire !"

**À l'écran:**
- Tests qui passent un par un ✅
- Badges base/bonus/challenge
- Retour sur roadmap avec N00 en vert

### [02:15-02:45] - Progression & Gamification
**Caption:** "Progression gamifiée - Déblocage progressif des niveaux"

**Voix Off:**
"Chaque réussite débloque le niveau suivant. Tu accumules des points, des badges. Le formateur peut suivre ta progression en temps réel via le Control Room. Et si tu bloques, le système d'indices t'accompagne étape par étape."

**À l'écran:**
- Animation déblocage N01
- Score qui augmente  
- Control Room formateur (vue rapide)
- Système hints H1→H2→H3

### [02:45-03:00] - Call to Action
**Caption:** "Prêt à coder ? Lance ta première mission !"

**Voix Off:**
"C'est parti ! Lance ton terminal, tape 'cq start N00', et embarque dans l'aventure CodeQuest. Bon code !"

**À l'écran:**
- Retour roadmap
- N00 qui pulse "Start Here"
- Logo CodeQuest final

## 🎥 Instructions Tournage

### Setup Technique
- **Résolution:** 1920x1080, 60fps  
- **Navigateur:** Chrome en mode plein écran
- **Terminal:** Police large (16pt minimum)
- **Curseur:** Visible et animé

### Timing Critique
- **0-15s:** Hook fort, rythme soutenu
- **15-45s:** Découverte interface, tempo calme  
- **45s-2m15:** Demo technique, rythme moyen
- **2m15-3m:** Motivation, montée d'énergie

### Éléments Visuels Clés
1. **Transitions fluides** entre écrans
2. **Zoom/Focus** sur éléments importants  
3. **Animations cursor** pour guider l'œil
4. **Sound design** : clic, success, notifications
5. **Branding** : Logo discret mais présent

### Post-Production
- **Captions:** Police sans-serif, contraste élevé
- **Musique:** Background tech/gaming, volume -20dB
- **Exports:** MP4 H.264, sous-titres .srt inclus
- **Durée finale:** 2:50-3:10 maximum

---

*Script généré automatiquement par CodeQuest 2.3 Preflight*
*Timestamp: ${new Date().toISOString()}*`;

    fs.writeFileSync('materials/video-script-3min.md', script);
    this.log('Script vidéo 3 min généré ✓', 'success');
  }

  generateBlueprint() {
    const blueprint = `# 📋 CodeQuest 2.3 - Blueprint Act I

## 🎯 Vue d'ensemble Act I

### Objectifs pédagogiques
- **Variables & const** : Immutabilité JavaScript
- **Template literals** : Formatage moderne  
- **Fonctions pures** : Programmation fonctionnelle
- **Destructuring & spread** : Syntaxe ES6+
- **Collections** : map, filter, reduce
- **Modules** : Import/export, composition
- **Intégration** : Boss combinant tous les concepts

### Progression suggérée (120 min)
1. **N00 - Warmup** (5 min) : Environnement ✓
2. **N01 - Variables** (15 min) : const, template literals  
3. **N02 - Immutability** (20 min) : Deep freeze, no mutations
4. **N03 - Destructuring** (15 min) : { }, [ ], spread operator
5. **N04 - Collections** (25 min) : map, filter, reduce chains
6. **N05 - Modules** (20 min) : Composition de fonctions
7. **N06 - Boss** (20 min) : Intégration finale leaderboard

## 🎮 Mécaniques de jeu

### Système de scoring
- **Base (100 pts)** : Tests de base réussis
- **Bonus (150 pts)** : Temps < seuil OU style élégant  
- **Challenge (200 pts)** : Sans hints ET temps record

### Système d'indices (H1→H2→H3)
- **H1** : Direction générale, concept clé
- **H2** : Structure de code, exemples
- **H3** : Solution quasi-complète

### États visuels roadmap
- **🔒 Locked** : Gris, non-cliquable
- **🎯 Current** : Bleu pulsant, ready to start
- **✅ Completed** : Vert, score affiché
- **⭐ Bonus** : Doré, effet sparkle
- **🏆 Challenge** : Violet, effet legendary

## 🔧 Commandes essentielles

### Étudiants
\`\`\`bash
cq start N00        # Commencer une scène
cq validate N00     # Tester sa solution  
cq help-me N00      # Obtenir des indices
cq status           # Voir sa progression
\`\`\`

### Formateurs  
\`\`\`bash
npm run control-room     # Interface monitoring
npm run demo             # Générer données fictives
npm run smoke-test       # Vérifier environnement
npm run preflight:j1     # Checklist complète
\`\`\`

## 📊 Métriques de réussite

### Indicateurs verts 🟢
- **>80%** étudiants finissent N00-N06
- **<30 min** temps moyen par niveau  
- **<3 hints** moyenne par étudiant
- **0 blocage** technique environnement

### Signaux d'alerte 🔴  
- **>45 min** sur un niveau = stuck
- **>5 hints** = struggling  
- **0 progression** après 20 min = help needed

## 🎯 Points de contrôle formateur

### 15 min : Checkpoint N01
- Tous ont démarré N00 ✅
- Premiers sur N01 Variables ✅  
- Aucun bloqué sur setup ✅

### 45 min : Checkpoint N03  
- Groupe majoritairement sur N02-N03 ✅
- Niveaux N00-N01 complétés ✅
- Plan B activé si >20% stuck ⚠️

### 75 min : Checkpoint N05
- Leaders attaquent N05-N06 ✅
- Queue groupe sur N03-N04 ✅  
- Assistance individuelle ciblée ✅

### 105 min : Boss Time
- Majorité sur N06 Boss ✅
- Quelques completions N06 ✅
- Débriefing collectif préparé ✅

## 🆘 Plan B - Actions d'urgence

### Si >30% stuck (slider configurable)
- ✅ Unlock all hints globalement
- ✅ Mark N08-N10 optional (futures extensions)
- ✅ Lower boss pass to 3/5 tests
- ✅ Projector mode pour aide collective

### Si serveur crash  
- ✅ Kit offline prêt (.zip complet)
- ✅ Setup scripts Win/Mac/Linux  
- ✅ Mode dégradé sans interface web

### Si environnement hostile
- ✅ Troubleshooting.md complet
- ✅ Solutions Windows/antivirus/proxy
- ✅ Backup sur clés USB multiples

## 📈 Post-session Analytics

### Données collectées
- **Temps par étudiant/niveau** 
- **Nb hints utilisés**
- **Patterns d'erreurs communes**
- **Taux de completion Act I**

### Insights pédagogiques
- **Levels les plus difficiles** → Améliorer énoncés
- **Hints les plus demandés** → Revoir progression  
- **Abandons fréquents** → Identifier friction
- **Stars performers** → Proposer défis bonus

---

*Blueprint généré automatiquement*  
*CodeQuest 2.3 - Ready for Action* 🚀`;

    // Ensure materials directory exists
    if (!fs.existsSync('materials')) {
      fs.mkdirSync('materials', { recursive: true });
    }

    fs.writeFileSync('materials/blueprint-act1.md', blueprint);
    this.log('Blueprint Act I généré ✓', 'success');
    
    // Note: PDF generation would require additional dependencies
    this.log('Blueprint MD → PDF : nécessite pandoc/wkhtmltopdf', 'warning');
  }

  updateRunbook() {
    const runbook = `# 📖 J1 - Minute by Minute Runbook

## 🕘 H-15 min : Setup Final

### Formateur
- [ ] **Écran projeté** : [Control Room](http://localhost:3000/) ouvert
- [ ] **Onglet 2** : [Student Roadmap](http://localhost:3000/roadmap) en demo
- [ ] **Terminal formateur** : \`npm run preflight:j1\` validé ✅
- [ ] **Kit offline** : Clés USB backup prêtes
- [ ] **Plan B activé** : Seuils configurés (slow: 30min, stuck: 45min)

### Étudiants
- [ ] **Node.js 16+** installé et vérifié
- [ ] **CodeQuest décompressé** dans ~/CodeQuest ou C:\\CodeQuest
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
> Commande magique : \`cq start N00\`. Go !"

### What to Click 🖱️
1. **[Control Room](http://localhost:3000/)** → Switch sur vue formateur
2. **Load Demo Data** pour montrer l'interface
3. **Monitor la section "Alerts"** pour détecter les blocages

### Expected Outcome ✅
- Tous les étudiants lancent \`cq start N00\`
- Fichiers apparaissent dans \`student-workspace/current/N00-warmup/\`
- Premiers \`cq validate N00\` au bout de 5 minutes

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
- **Port 3000 occupé** → \`PORT=3001 npm run control-room\`

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
- **[Pre-flight J1](../scripts/preflight-j1.js)** : \`npm run preflight:j1\`
- **[Smoke Test](../scripts/smoke-test.js)** : \`npm run smoke-test\`
- **[Troubleshooting](../docs/TROUBLESHOOTING.md)** : Solutions problèmes

### 🎯 Key Commands
- **Start scene** : \`cq start N00\`
- **Validate** : \`cq validate N00\` 
- **Hints** : \`cq help-me N00\`
- **Status** : \`cq status\`
- **Reset** : \`cq reset N00\`

### 🆘 Emergency Actions
- **Port conflict** : \`PORT=3001 npm run control-room\`
- **Offline fallback** : Décompresser \`codequest-offline-kit.zip\`
- **Demo data** : \`npm run demo\` + Load Demo Data button
- **Plan B unlock** : Toggles dans Control Room Plan B panel

---

*Runbook mis à jour automatiquement*  
*Ready for J1 - Let's code! 🎮*`;

    // Ensure runbooks directory exists
    if (!fs.existsSync('runbooks')) {
      fs.mkdirSync('runbooks', { recursive: true });
    }

    fs.writeFileSync('runbooks/J1-minute-by-minute.md', runbook);
    this.log('Runbook J1 mis à jour ✓', 'success');
  }

  // Final report
  generateReport() {
    const duration = Math.round((Date.now() - this.startTime) / 1000);
    
    console.log('\n' + '='.repeat(60));
    console.log('🚀 PREFLIGHT J1 - RAPPORT FINAL');
    console.log('='.repeat(60));
    
    const successCount = this.checks.filter(c => c.type === 'success').length;
    const errorCount = this.errors.length;
    const warningCount = this.warnings.length;
    
    console.log(`\n📊 Résumé (${duration}s):`);
    console.log(`  ✅ Succès: ${successCount}`);
    console.log(`  ❌ Erreurs: ${errorCount}`);
    console.log(`  ⚠️ Avertissements: ${warningCount}`);

    if (errorCount > 0) {
      console.log('\n❌ Erreurs à corriger:');
      this.errors.forEach(error => console.log(`  - ${error}`));
    }

    console.log('\n🎯 Vues ouvertes automatiquement:');
    console.log('  - Control Room: http://localhost:3000/');
    console.log('  - Student Roadmap: http://localhost:3000/roadmap');

    console.log('\n📋 Matériel généré:');
    console.log('  - materials/video-script-3min.md');
    console.log('  - materials/blueprint-act1.md'); 
    console.log('  - runbooks/J1-minute-by-minute.md');

    if (errorCount === 0) {
      console.log('\n🎉 READY FOR J1! Tous les systèmes sont GO! 🚀');
      process.exit(0);
    } else {
      console.log('\n⚠️ Corriger les erreurs avant J1');
      process.exit(1);
    }
  }

  // Cleanup
  cleanup() {
    if (this.serverProcess && !this.serverProcess.killed) {
      this.serverProcess.kill();
    }
  }

  // Main execution
  async run() {
    console.log('🚀 CodeQuest 2.3 - J1 Pre-flight Checklist\n');
    
    // Handle interruptions
    process.on('SIGINT', () => {
      this.cleanup();
      process.exit(1);
    });

    try {
      await this.checkEnvironment();
      await this.testCLICommands();
      this.checkOfflinePackage();
      await this.startServersAndViews();
      
      // Wait a bit for views to load
      await this.sleep(2000);
      
      this.generateMaterials();
      this.generateReport();
      
    } catch (error) {
      console.error('Erreur fatale:', error);
      this.cleanup();
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const preflight = new PreflightJ1();
  preflight.run();
}

module.exports = PreflightJ1;