#!/usr/bin/env node

/**
 * CodeQuest 2.3 - J1 Verification Script
 * Teste la chaîne complète du workflow
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class J1Verifier {
  constructor() {
    this.steps = [];
    this.serverProcess = null;
  }

  log(step, status) {
    const icons = {
      start: '🚀',
      success: '✅',
      error: '❌',
      info: 'ℹ️'
    };
    
    console.log(`${icons[status]} ${step}`);
    this.steps.push({ step, status, time: new Date().toISOString() });
  }

  exec(command, options = {}) {
    try {
      const result = execSync(command, {
        encoding: 'utf8',
        stdio: options.silent ? 'pipe' : 'inherit',
        ...options
      });
      return { success: true, output: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Step 1: Clean environment
  step1_cleanup() {
    this.log('Step 1: Nettoyage environnement', 'start');
    
    // Clean student workspace
    const workspace = 'student-workspace/current';
    if (fs.existsSync(workspace)) {
      fs.rmSync(workspace, { recursive: true, force: true });
    }
    fs.mkdirSync(workspace, { recursive: true });
    
    // Reset progress
    const progress = {
      studentId: 'test-student',
      currentScene: null,
      scenes: {},
      totalScore: 0,
      hintsUsed: {},
      startedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync('student-workspace/progress.json', JSON.stringify(progress, null, 2));
    
    // Clean snapshots
    if (fs.existsSync('.progress-drops')) {
      fs.rmSync('.progress-drops', { recursive: true, force: true });
    }
    fs.mkdirSync('.progress-drops', { recursive: true });
    
    this.log('Environnement nettoyé', 'success');
  }

  // Step 2: Start scene N00
  step2_startScene() {
    this.log('Step 2: Démarrage scène N00', 'start');
    
    const result = this.exec('node src/cli/cli-v2.js start N00', { silent: true });
    
    if (result.success) {
      // Verify files copied
      const starterPath = 'student-workspace/current/N00-warmup/warmup.js';
      if (fs.existsSync(starterPath)) {
        this.log('Starter copié avec succès', 'success');
        return true;
      } else {
        this.log('Starter non trouvé', 'error');
        return false;
      }
    } else {
      this.log(`Erreur start: ${result.error}`, 'error');
      return false;
    }
  }

  // Step 3: Complete the scene
  step3_completeScene() {
    this.log('Step 3: Complétion de la scène', 'start');
    
    // Copy solution to student workspace
    const solutionPath = 'levels/act-1/N00-warmup/solution/warmup.js';
    const targetPath = 'student-workspace/current/N00-warmup/warmup.js';
    
    if (fs.existsSync(solutionPath)) {
      fs.copyFileSync(solutionPath, targetPath);
      this.log('Solution copiée', 'success');
      return true;
    } else {
      this.log('Solution non trouvée', 'error');
      return false;
    }
  }

  // Step 4: Validate scene
  step4_validateScene() {
    this.log('Step 4: Validation de la scène', 'start');
    
    const result = this.exec('node src/cli/cli-v2.js validate N00 --drop', { silent: true });
    
    if (result.success) {
      // Check progress updated
      const progress = JSON.parse(fs.readFileSync('student-workspace/progress.json', 'utf8'));
      
      if (progress.scenes['N00-warmup'] && progress.scenes['N00-warmup'].status) {
        this.log(`Validation OK: ${progress.scenes['N00-warmup'].status}`, 'success');
        
        // Check snapshot created
        const snapshots = fs.readdirSync('.progress-drops');
        if (snapshots.length > 0) {
          this.log(`Snapshot créé: ${snapshots[0]}`, 'success');
          return true;
        }
      }
    }
    
    this.log('Validation échouée', 'error');
    return false;
  }

  // Step 5: Start control room
  async step5_startControlRoom() {
    this.log('Step 5: Démarrage Control Room', 'start');
    
    // Start server in background
    this.serverProcess = spawn('node', ['src/static-server.js'], {
      detached: false,
      stdio: 'pipe'
    });
    
    // Wait for server to start
    await this.sleep(2000);
    
    // Test if server is running
    try {
      const http = require('http');
      
      return new Promise((resolve) => {
        http.get('http://localhost:3000/roadmap', (res) => {
          if (res.statusCode === 200) {
            this.log('Control Room accessible', 'success');
            resolve(true);
          } else {
            this.log(`Control Room status: ${res.statusCode}`, 'error');
            resolve(false);
          }
        }).on('error', (err) => {
          this.log(`Control Room error: ${err.message}`, 'error');
          resolve(false);
        });
      });
    } catch (error) {
      this.log(`Erreur serveur: ${error.message}`, 'error');
      return false;
    }
  }

  // Step 6: Test multiple scenes
  step6_multipleScenes() {
    this.log('Step 6: Test scènes multiples', 'start');
    
    const scenes = ['N01', 'N02'];
    let allOk = true;
    
    for (const scene of scenes) {
      // Start scene
      const startResult = this.exec(`node src/cli/cli-v2.js start ${scene}`, { silent: true });
      if (!startResult.success) {
        this.log(`${scene} start failed`, 'error');
        allOk = false;
        continue;
      }
      
      // Copy solution
      const solutionFile = scene === 'N01' ? 'variables.js' : 'immutable.js';
      const sourcePath = `levels/act-1/${scene}-${scene === 'N01' ? 'variables' : 'immutability'}/solution/${solutionFile}`;
      const targetPath = `student-workspace/current/${scene}-${scene === 'N01' ? 'variables' : 'immutability'}/${solutionFile}`;
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
      }
      
      // Validate
      const validateResult = this.exec(`node src/cli/cli-v2.js validate ${scene}`, { silent: true });
      if (validateResult.success) {
        this.log(`${scene} validé`, 'success');
      } else {
        this.log(`${scene} validation failed`, 'error');
        allOk = false;
      }
    }
    
    return allOk;
  }

  // Cleanup
  cleanup() {
    if (this.serverProcess) {
      this.serverProcess.kill();
      this.log('Serveur arrêté', 'info');
    }
  }

  // Run full verification
  async runFullChain() {
    console.log('🧪 CodeQuest 2.3 - J1 Verification\n');
    console.log('='.repeat(50));
    
    const steps = [
      () => this.step1_cleanup(),
      () => this.step2_startScene(),
      () => this.step3_completeScene(),
      () => this.step4_validateScene(),
      () => this.step5_startControlRoom(),
      () => this.step6_multipleScenes()
    ];
    
    let allPassed = true;
    
    for (const step of steps) {
      const result = await step();
      if (result === false) {
        allPassed = false;
        break;
      }
    }
    
    this.cleanup();
    
    console.log('\n' + '='.repeat(50));
    console.log('\n📊 Résumé:');
    
    const successful = this.steps.filter(s => s.status === 'success').length;
    const failed = this.steps.filter(s => s.status === 'error').length;
    
    console.log(`  ✅ Succès: ${successful}`);
    console.log(`  ❌ Échecs: ${failed}`);
    
    if (allPassed) {
      console.log('\n🎉 Chaîne complète validée!');
      console.log('✅ Prêt pour J1 en classe');
      process.exit(0);
    } else {
      console.log('\n❌ Problèmes détectés');
      console.log('📖 Vérifier les étapes échouées');
      process.exit(1);
    }
  }
}

// Run
if (require.main === module) {
  const verifier = new J1Verifier();
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    verifier.cleanup();
    process.exit(1);
  });
  
  verifier.runFullChain().catch(error => {
    console.error('Erreur fatale:', error);
    verifier.cleanup();
    process.exit(1);
  });
}

module.exports = J1Verifier;