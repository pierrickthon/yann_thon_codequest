#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Offline Packaging Script
 * Crée un kit complet pour installation sans réseau
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
// const archiver = require('archiver'); // Will fallback if not available

class OfflinePackager {
  constructor() {
    this.buildDir = 'dist/offline-kit';
    this.outputFile = 'codequest-offline-kit.zip';
  }

  log(message, icon = '📦') {
    console.log(`${icon} ${message}`);
  }

  // Prepare build directory
  prepareBuildDir() {
    this.log('Préparation du dossier de build...');
    
    if (fs.existsSync(this.buildDir)) {
      fs.rmSync(this.buildDir, { recursive: true, force: true });
    }
    fs.mkdirSync(this.buildDir, { recursive: true });
  }

  // Copy essential files
  copyEssentials() {
    this.log('Copie des fichiers essentiels...');
    
    const essentials = [
      'package.json',
      'package-lock.json',
      'README.md',
      'src',
      'levels',
      'control-room',
      'docs',
      'scripts',
      'schemas'
    ];
    
    essentials.forEach(item => {
      const src = path.join(process.cwd(), item);
      const dest = path.join(this.buildDir, item);
      
      if (fs.existsSync(src)) {
        if (fs.statSync(src).isDirectory()) {
          this.copyDir(src, dest);
        } else {
          fs.copyFileSync(src, dest);
        }
        this.log(`  ✓ ${item}`);
      }
    });
  }

  // Copy directory recursively
  copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and .git
        if (entry.name === 'node_modules' || entry.name === '.git') {
          continue;
        }
        this.copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  // Create setup scripts
  createSetupScripts() {
    this.log('Création des scripts d\'installation...');
    
    // Windows setup script
    const setupPs1 = `# CodeQuest 2.3 - Windows Setup Script
Write-Host "🎮 CodeQuest 2.3 - Installation Offline" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check Node.js
Write-Host "Vérification de Node.js..." -ForegroundColor Yellow
$nodeVersion = node -v 2>$null
if ($?) {
    Write-Host "✅ Node.js $nodeVersion détecté" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js non trouvé. Installez Node.js 16+ d'abord" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installation des dépendances..." -ForegroundColor Yellow
npm install --offline --prefer-offline

# Setup CLI
Write-Host "Configuration du CLI..." -ForegroundColor Yellow
npm link

# Create workspace
Write-Host "Création du workspace..." -ForegroundColor Yellow
if (!(Test-Path "student-workspace")) {
    New-Item -ItemType Directory -Path "student-workspace"
    New-Item -ItemType Directory -Path "student-workspace/current"
}

# Initialize progress
Write-Host "Initialisation de la progression..." -ForegroundColor Yellow
@"
{
  "studentId": "local-student",
  "currentScene": null,
  "scenes": {},
  "totalScore": 0,
  "hintsUsed": {},
  "startedAt": "$(Get-Date -Format o)",
  "lastUpdated": "$(Get-Date -Format o)"
}
"@ | Out-File -FilePath "student-workspace/progress.json" -Encoding UTF8

Write-Host ""
Write-Host "✅ Installation terminée!" -ForegroundColor Green
Write-Host ""
Write-Host "Commandes disponibles:" -ForegroundColor Cyan
Write-Host "  npm run control-room  - Lancer l'interface web" -ForegroundColor White
Write-Host "  cq start N00         - Démarrer la première scène" -ForegroundColor White
Write-Host "  cq validate          - Valider votre code" -ForegroundColor White
Write-Host ""
Write-Host "Ouvrez http://localhost:3000/roadmap pour commencer!" -ForegroundColor Yellow
`;

    fs.writeFileSync(path.join(this.buildDir, 'setup.ps1'), setupPs1);

    // Unix setup script
    const setupSh = `#!/bin/bash
# CodeQuest 2.3 - Unix Setup Script

echo "🎮 CodeQuest 2.3 - Installation Offline"
echo "====================================="

# Check Node.js
echo "Vérification de Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js $(node -v) détecté"
else
    echo "❌ Node.js non trouvé. Installez Node.js 16+ d'abord"
    exit 1
fi

# Install dependencies
echo "Installation des dépendances..."
npm install --offline --prefer-offline

# Setup CLI
echo "Configuration du CLI..."
npm link

# Create workspace
echo "Création du workspace..."
mkdir -p student-workspace/current

# Initialize progress
echo "Initialisation de la progression..."
cat > student-workspace/progress.json << EOF
{
  "studentId": "local-student",
  "currentScene": null,
  "scenes": {},
  "totalScore": 0,
  "hintsUsed": {},
  "startedAt": "$(date -Iseconds)",
  "lastUpdated": "$(date -Iseconds)"
}
EOF

echo ""
echo "✅ Installation terminée!"
echo ""
echo "Commandes disponibles:"
echo "  npm run control-room  - Lancer l'interface web"
echo "  cq start N00         - Démarrer la première scène"
echo "  cq validate          - Valider votre code"
echo ""
echo "Ouvrez http://localhost:3000/roadmap pour commencer!"
`;

    fs.writeFileSync(path.join(this.buildDir, 'setup.sh'), setupSh);
    fs.chmodSync(path.join(this.buildDir, 'setup.sh'), '755');
    
    this.log('  ✓ setup.ps1 (Windows)');
    this.log('  ✓ setup.sh (Mac/Linux)');
  }

  // Create offline README
  createOfflineReadme() {
    this.log('Création du README offline...');
    
    const readme = `# 🎮 CodeQuest 2.3 - Kit Offline

## Installation rapide

### Windows (PowerShell Admin)
\`\`\`powershell
.\\setup.ps1
\`\`\`

### Mac/Linux
\`\`\`bash
chmod +x setup.sh
./setup.sh
\`\`\`

## Contenu du kit

- ✅ Code source complet
- ✅ Tous les niveaux Act I (N00-N06)
- ✅ Interface Control Room
- ✅ CLI pré-configuré
- ✅ Documentation complète

## Démarrage

1. Installer avec le script approprié
2. Lancer: \`npm run control-room\`
3. Ouvrir: http://localhost:3000/roadmap
4. Commencer: \`cq start N00\`

## Sans installation npm

Si npm install ne fonctionne pas:
1. Décompresser node_modules.tar.gz (si fourni)
2. Lancer directement: \`node src/static-server.js\`

## Support

- docs/TROUBLESHOOTING.md pour les problèmes
- docs/GETTING_STARTED.md pour débuter
- docs/INSTRUCTOR_GUIDE.md pour les formateurs

Bon apprentissage! 🚀
`;

    fs.writeFileSync(path.join(this.buildDir, 'README_OFFLINE.md'), readme);
  }

  // Create archive
  async createArchive() {
    this.log('Création de l\'archive ZIP...');
    
    // Try using native zip if archiver not available
    try {
      if (process.platform === 'win32') {
        // Windows: use PowerShell
        execSync(`powershell Compress-Archive -Path "${this.buildDir}/*" -DestinationPath "${this.outputFile}" -Force`);
      } else {
        // Unix: use zip command
        execSync(`cd dist && zip -r "../${this.outputFile}" offline-kit/`);
      }
      
      this.log(`✅ Archive créée: ${this.outputFile}`);
    } catch (error) {
      this.log('⚠️ Impossible de créer le ZIP automatiquement', '⚠️');
      this.log(`📁 Kit disponible dans: ${this.buildDir}`);
    }
  }

  // Run packaging
  async package() {
    console.log('📦 CodeQuest 2.3 - Offline Packaging\n');
    console.log('='.repeat(50));
    
    this.prepareBuildDir();
    this.copyEssentials();
    this.createSetupScripts();
    this.createOfflineReadme();
    await this.createArchive();
    
    const stats = fs.statSync(this.buildDir);
    const sizeMB = (this.getDirSize(this.buildDir) / 1024 / 1024).toFixed(2);
    
    console.log('\n' + '='.repeat(50));
    console.log('\n✅ Kit offline créé avec succès!');
    console.log(`📦 Taille: ${sizeMB} MB`);
    console.log(`📍 Emplacement: ${this.outputFile} ou ${this.buildDir}`);
    console.log('\n🚀 Prêt pour distribution offline!');
  }

  // Get directory size
  getDirSize(dir) {
    let size = 0;
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        size += this.getDirSize(filePath);
      } else {
        size += stats.size;
      }
    }
    
    return size;
  }
}

// Run
if (require.main === module) {
  const packager = new OfflinePackager();
  packager.package().catch(console.error);
}

module.exports = OfflinePackager;