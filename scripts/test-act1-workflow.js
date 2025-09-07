#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Act I Workflow Test
 * Teste le workflow complet N00-N06
 */

const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class Act1WorkflowTest {
  constructor() {
    this.scenes = [
      'N00-warmup-tutorial',
      'N01-pure-functions', 
      'N02-destructuring',
      'N03-map-filter',
      'N04-reduce-immutability',
      'N05-closures-modules',
      'N06-boss-integration'
    ];
    this.results = [];
  }

  log(message, type = 'info') {
    const icons = { info: 'ℹ️', success: '✅', error: '❌', warning: '⚠️' };
    console.log(`${icons[type]} ${message}`);
    this.results.push({ message, type, timestamp: new Date().toISOString() });
  }

  // Test scene structure
  testSceneStructure(sceneId) {
    const scenePath = path.join('levels', 'act-1', sceneId);
    
    if (!fs.existsSync(scenePath)) {
      this.log(`Scene ${sceneId} directory missing`, 'error');
      return false;
    }

    const requiredFiles = ['manifest.json', 'README.md', 'starter.js', 'solution.js', 'tests.spec.js', 'criteria.json'];
    const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(scenePath, file)));
    
    if (missingFiles.length > 0) {
      this.log(`Scene ${sceneId} missing files: ${missingFiles.join(', ')}`, 'error');
      return false;
    }

    this.log(`Scene ${sceneId} structure OK`, 'success');
    return true;
  }

  // Test solution against tests
  testSolution(sceneId) {
    const scenePath = path.join('levels', 'act-1', sceneId);
    const testsPath = path.join(scenePath, 'tests.spec.js');
    const solutionPath = path.join(scenePath, 'solution.js');
    
    // Temporarily replace starter.js with solution.js
    const starterPath = path.join(scenePath, 'starter.js');
    const starterBackup = fs.readFileSync(starterPath, 'utf8');
    const solution = fs.readFileSync(solutionPath, 'utf8');
    
    try {
      fs.writeFileSync(starterPath, solution);
      
      // Run tests
      execSync(`node "${testsPath}"`, { encoding: 'utf8', stdio: 'pipe' });
      this.log(`Scene ${sceneId} solution passes tests`, 'success');
      return true;
    } catch (error) {
      this.log(`Scene ${sceneId} solution fails tests: ${error.message}`, 'error');
      return false;
    } finally {
      // Restore starter
      fs.writeFileSync(starterPath, starterBackup);
    }
  }

  // Test JSON validity
  testManifests() {
    this.log('Testing JSON manifests...', 'info');
    
    // Act manifest
    try {
      const actManifest = JSON.parse(fs.readFileSync('levels/act-1/manifest.json', 'utf8'));
      this.log('Act I manifest valid', 'success');
    } catch (error) {
      this.log(`Act I manifest invalid: ${error.message}`, 'error');
      return false;
    }

    // Scene manifests
    let allValid = true;
    for (const sceneId of this.scenes) {
      try {
        const manifest = JSON.parse(fs.readFileSync(`levels/act-1/${sceneId}/manifest.json`, 'utf8'));
        const criteria = JSON.parse(fs.readFileSync(`levels/act-1/${sceneId}/criteria.json`, 'utf8'));
        this.log(`${sceneId} manifests valid`, 'success');
      } catch (error) {
        this.log(`${sceneId} manifests invalid: ${error.message}`, 'error');
        allValid = false;
      }
    }
    
    return allValid;
  }

  // Test specific CLI-based workflow for N00
  async testN00Workflow() {
    this.log('Testing N00 workflow with CLI adaptation...', 'info');
    
    try {
      // Clean workspace
      const currentDir = path.join('student-workspace', 'current');
      if (fs.existsSync(currentDir)) {
        fs.rmSync(currentDir, { recursive: true, force: true });
      }
      fs.mkdirSync(currentDir, { recursive: true });

      // Copy starter manually (simulating CLI start)
      const starterContent = fs.readFileSync('levels/act-1/N00-warmup-tutorial/starter.js', 'utf8');
      const targetDir = path.join(currentDir, 'N00-warmup-tutorial');
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'starter.js'), starterContent);
      
      this.log('N00 starter copied successfully', 'success');

      // Simulate coding: replace with solution
      const solutionContent = fs.readFileSync('levels/act-1/N00-warmup-tutorial/solution.js', 'utf8');
      fs.writeFileSync(path.join(targetDir, 'starter.js'), solutionContent);

      // Run tests directly
      const testsContent = fs.readFileSync('levels/act-1/N00-warmup-tutorial/tests.spec.js', 'utf8')
        .replace('./starter.js', path.join(process.cwd(), targetDir, 'starter.js'));
      
      const tempTestFile = path.join(targetDir, 'temp-test.js');
      fs.writeFileSync(tempTestFile, testsContent);
      
      execSync(`node "${tempTestFile}"`, { encoding: 'utf8', stdio: 'pipe' });
      this.log('N00 workflow test PASSED', 'success');
      
      // Cleanup
      fs.unlinkSync(tempTestFile);
      return true;
      
    } catch (error) {
      this.log(`N00 workflow test FAILED: ${error.message}`, 'error');
      return false;
    }
  }

  // Generate final report
  generateReport() {
    const successCount = this.results.filter(r => r.type === 'success').length;
    const errorCount = this.results.filter(r => r.type === 'error').length;
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Act I Workflow Test Results');
    console.log('='.repeat(60));
    console.log(`✅ Successes: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    
    if (errorCount > 0) {
      console.log('\n❌ Issues found:');
      this.results.filter(r => r.type === 'error').forEach(r => {
        console.log(`  - ${r.message}`);
      });
    }

    const passed = errorCount === 0;
    console.log(`\n${passed ? '🎉 ACT I READY FOR PRODUCTION!' : '⚠️ Issues need to be fixed'}`);
    
    return passed;
  }

  // Main test runner
  async run() {
    console.log('🧪 CodeQuest 2.3 - Act I Workflow Test\n');
    
    // Test 1: Scene structures
    this.log('Phase 1: Testing scene structures...', 'info');
    for (const sceneId of this.scenes) {
      this.testSceneStructure(sceneId);
    }

    // Test 2: JSON manifests
    this.log('\nPhase 2: Testing manifests...', 'info');
    this.testManifests();

    // Test 3: Solutions pass tests
    this.log('\nPhase 3: Testing solutions...', 'info');
    for (const sceneId of this.scenes) {
      this.testSolution(sceneId);
    }

    // Test 4: N00 workflow
    this.log('\nPhase 4: Testing workflow...', 'info');
    await this.testN00Workflow();

    // Final report
    return this.generateReport();
  }
}

// Run tests
if (require.main === module) {
  const tester = new Act1WorkflowTest();
  tester.run().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
}

module.exports = Act1WorkflowTest;