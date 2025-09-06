#!/usr/bin/env node

/**
 * CodeQuest Test Runner
 * Runs all scene tests to validate the entire platform
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TestRunner {
  constructor() {
    this.actsDir = path.join(__dirname, '..', 'acts');
    this.results = {
      passed: 0,
      failed: 0,
      total: 0,
      failures: []
    };
  }

  async runAllTests() {
    console.log('🧪 CodeQuest Test Runner');
    console.log('Running all scene tests...\n');

    const acts = this.getActs();
    
    for (const act of acts) {
      console.log(`\n📚 Testing ${act}:`);
      await this.runActTests(act);
    }

    this.printSummary();
    process.exit(this.results.failed > 0 ? 1 : 0);
  }

  getActs() {
    return fs.readdirSync(this.actsDir)
      .filter(item => {
        const actPath = path.join(this.actsDir, item);
        return fs.statSync(actPath).isDirectory() && item.startsWith('act');
      })
      .sort();
  }

  getScenes(actPath) {
    return fs.readdirSync(actPath)
      .filter(item => {
        const scenePath = path.join(actPath, item);
        return fs.statSync(scenePath).isDirectory() && /^[A-Z]\d{2}-/.test(item);
      })
      .sort();
  }

  async runActTests(actName) {
    const actPath = path.join(this.actsDir, actName);
    const scenes = this.getScenes(actPath);

    for (const scene of scenes) {
      await this.runSceneTest(actPath, scene);
    }
  }

  async runSceneTest(actPath, sceneName) {
    const scenePath = path.join(actPath, sceneName);
    const testFile = path.join(scenePath, 'test.js');

    if (!fs.existsSync(testFile)) {
      console.log(`  ⚠️  ${sceneName}: No test file found`);
      return;
    }

    this.results.total++;

    try {
      // Run the test in the scene directory
      execSync(`node test.js`, { 
        cwd: scenePath, 
        stdio: 'pipe',
        timeout: 30000 // 30 second timeout
      });
      
      console.log(`  ✅ ${sceneName}: Tests passed`);
      this.results.passed++;
    } catch (error) {
      console.log(`  ❌ ${sceneName}: Tests failed`);
      this.results.failed++;
      this.results.failures.push({
        scene: `${path.basename(actPath)}/${sceneName}`,
        error: error.toString()
      });
    }
  }

  printSummary() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 Test Results Summary');
    console.log('='.repeat(50));
    console.log(`Total Scenes: ${this.results.total}`);
    console.log(`Passed: ${this.results.passed}`);
    console.log(`Failed: ${this.results.failed}`);
    console.log(`Success Rate: ${this.getSuccessRate()}%`);

    if (this.results.failures.length > 0) {
      console.log('\n❌ Failed Tests:');
      this.results.failures.forEach(failure => {
        console.log(`  - ${failure.scene}`);
        if (process.env.VERBOSE) {
          console.log(`    ${failure.error.split('\n')[0]}`);
        }
      });
      
      if (!process.env.VERBOSE) {
        console.log('\nRun with VERBOSE=1 for detailed error messages');
      }
    } else {
      console.log('\n🎉 All tests passed!');
    }
  }

  getSuccessRate() {
    if (this.results.total === 0) return 0;
    return Math.round((this.results.passed / this.results.total) * 100);
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
CodeQuest Test Runner

Usage:
  npm test                    # Run all scene tests
  node src/test-runner.js     # Same as above
  VERBOSE=1 npm test          # Show detailed error messages

Options:
  -h, --help                  # Show this help message
`);
    return;
  }

  const runner = new TestRunner();
  await runner.runAllTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = TestRunner;