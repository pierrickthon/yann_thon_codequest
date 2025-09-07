#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Smoke Test Suite
 * Vérifie l'environnement avant déploiement
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const net = require('net');
const os = require('os');

class SmokeTest {
  constructor() {
    this.platform = process.platform;
    this.results = [];
    this.errors = [];
  }

  log(message, status = 'info') {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    console.log(`${icons[status]} ${message}`);
    this.results.push({ message, status });
  }

  // Test Node.js version
  testNodeVersion() {
    try {
      const version = process.version;
      const major = parseInt(version.slice(1).split('.')[0]);
      
      if (major >= 16) {
        this.log(`Node.js ${version} OK (>= 16)`, 'success');
        return true;
      } else {
        this.log(`Node.js ${version} trop ancien (besoin >= 16)`, 'error');
        return false;
      }
    } catch (error) {
      this.log(`Erreur vérification Node.js: ${error.message}`, 'error');
      return false;
    }
  }

  // Test npm availability
  testNpm() {
    try {
      const version = execSync('npm -v', { encoding: 'utf8' }).trim();
      this.log(`npm ${version} disponible`, 'success');
      return true;
    } catch (error) {
      this.log('npm non disponible', 'error');
      return false;
    }
  }

  // Test Git availability
  testGit() {
    try {
      const version = execSync('git --version', { encoding: 'utf8' }).trim();
      this.log(`${version} disponible`, 'success');
      return true;
    } catch (error) {
      this.log('Git non disponible (optionnel)', 'warning');
      return true; // Not critical
    }
  }

  // Test port availability
  async testPort(port = 3000) {
    return new Promise((resolve) => {
      const server = net.createServer();
      
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          this.log(`Port ${port} déjà utilisé`, 'error');
          this.log(`Solution: PORT=${port + 1} npm run control-room`, 'info');
          resolve(false);
        } else {
          this.log(`Erreur port ${port}: ${err.message}`, 'error');
          resolve(false);
        }
      });

      server.once('listening', () => {
        server.close();
        this.log(`Port ${port} disponible`, 'success');
        resolve(true);
      });

      server.listen(port);
    });
  }

  // Test file permissions
  testFilePermissions() {
    const testPaths = [
      'src/cli/cli-v2.js',
      'student-workspace',
      'levels/act-1',
      'control-room'
    ];

    let allOk = true;
    
    testPaths.forEach(testPath => {
      try {
        const fullPath = path.join(process.cwd(), testPath);
        
        if (!fs.existsSync(fullPath)) {
          this.log(`Manquant: ${testPath}`, 'error');
          allOk = false;
          return;
        }

        const stats = fs.statSync(fullPath);
        
        // Check read permission
        fs.accessSync(fullPath, fs.constants.R_OK);
        
        // Check write permission for directories
        if (stats.isDirectory()) {
          fs.accessSync(fullPath, fs.constants.W_OK);
        }
        
        this.log(`Permissions OK: ${testPath}`, 'success');
      } catch (error) {
        this.log(`Permissions KO: ${testPath} - ${error.message}`, 'error');
        allOk = false;
      }
    });

    return allOk;
  }

  // Test encoding (UTF-8)
  testEncoding() {
    try {
      const testFile = path.join('levels', 'act-1', 'N00-warmup', 'README.md');
      const content = fs.readFileSync(testFile, 'utf8');
      
      // Check for emojis and special chars
      if (content.includes('🚀') && content.includes('✅')) {
        this.log('Encodage UTF-8 OK', 'success');
        return true;
      } else {
        this.log('Emojis non détectés (encodage?)', 'warning');
        return true;
      }
    } catch (error) {
      this.log(`Erreur test encodage: ${error.message}`, 'warning');
      return true;
    }
  }

  // Test disk space
  testDiskSpace() {
    try {
      const cwd = process.cwd();
      
      if (this.platform === 'win32') {
        // Windows: use wmic
        try {
          const output = execSync('wmic logicaldisk get size,freespace,caption', { encoding: 'utf8' });
          this.log('Espace disque vérifié (Windows)', 'success');
        } catch {
          this.log('Impossible de vérifier l\'espace disque', 'warning');
        }
      } else {
        // Unix: use df
        const output = execSync(`df -h "${cwd}"`, { encoding: 'utf8' });
        const lines = output.split('\n');
        if (lines.length > 1) {
          const parts = lines[1].split(/\s+/);
          const available = parts[3];
          this.log(`Espace disponible: ${available}`, 'success');
        }
      }
      return true;
    } catch (error) {
      this.log('Vérification espace disque échouée', 'warning');
      return true;
    }
  }

  // Platform specific tests
  testPlatformSpecific() {
    this.log(`Plateforme: ${this.platform} (${os.release()})`, 'info');
    this.log(`Architecture: ${os.arch()}`, 'info');
    this.log(`CPUs: ${os.cpus().length} cores`, 'info');
    this.log(`RAM: ${Math.round(os.totalmem() / 1024 / 1024 / 1024)}GB`, 'info');

    if (this.platform === 'win32') {
      // Windows specific
      this.testWindowsSpecific();
    } else if (this.platform === 'darwin') {
      // macOS specific
      this.testMacSpecific();
    } else {
      // Linux specific
      this.testLinuxSpecific();
    }
  }

  testWindowsSpecific() {
    this.log('Tests Windows...', 'info');
    
    // Check PowerShell
    try {
      execSync('powershell -Command "echo test"', { encoding: 'utf8' });
      this.log('PowerShell disponible', 'success');
    } catch {
      this.log('PowerShell non disponible', 'warning');
    }

    // Check execution policy
    try {
      const policy = execSync('powershell Get-ExecutionPolicy', { encoding: 'utf8' }).trim();
      if (policy === 'Restricted') {
        this.log('Execution Policy restrictive', 'warning');
        this.log('Solution: Set-ExecutionPolicy RemoteSigned -Scope CurrentUser', 'info');
      } else {
        this.log(`Execution Policy: ${policy}`, 'success');
      }
    } catch {
      this.log('Impossible de vérifier Execution Policy', 'warning');
    }
  }

  testMacSpecific() {
    this.log('Tests macOS...', 'info');
    
    // Check Xcode CLI tools
    try {
      execSync('xcode-select -p', { encoding: 'utf8' });
      this.log('Xcode CLI tools installés', 'success');
    } catch {
      this.log('Xcode CLI tools non installés (optionnel)', 'warning');
    }
  }

  testLinuxSpecific() {
    this.log('Tests Linux...', 'info');
    
    // Check build-essential
    try {
      execSync('which gcc', { encoding: 'utf8' });
      this.log('GCC disponible', 'success');
    } catch {
      this.log('GCC non disponible (optionnel)', 'warning');
    }
  }

  // Run all tests
  async runAll() {
    console.log('🔍 CodeQuest 2.3 - Smoke Tests\n');
    console.log('='.repeat(50));
    
    const tests = [
      () => this.testNodeVersion(),
      () => this.testNpm(),
      () => this.testGit(),
      () => this.testPort(3000),
      () => this.testFilePermissions(),
      () => this.testEncoding(),
      () => this.testDiskSpace(),
      () => this.testPlatformSpecific()
    ];

    let allPassed = true;
    
    for (const test of tests) {
      const result = await test();
      if (result === false) {
        allPassed = false;
      }
    }

    console.log('\n' + '='.repeat(50));
    
    const successCount = this.results.filter(r => r.status === 'success').length;
    const errorCount = this.results.filter(r => r.status === 'error').length;
    const warningCount = this.results.filter(r => r.status === 'warning').length;
    
    console.log(`\n📊 Résultats:`);
    console.log(`  ✅ Succès: ${successCount}`);
    console.log(`  ❌ Erreurs: ${errorCount}`);
    console.log(`  ⚠️ Avertissements: ${warningCount}`);
    
    if (errorCount === 0) {
      console.log('\n🎉 Environnement prêt pour CodeQuest!');
      process.exit(0);
    } else {
      console.log('\n❌ Des problèmes doivent être résolus');
      console.log('📖 Voir docs/TROUBLESHOOTING.md pour solutions');
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const smokeTest = new SmokeTest();
  smokeTest.runAll().catch(console.error);
}

module.exports = SmokeTest;