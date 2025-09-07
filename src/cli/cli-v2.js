#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CodeQuestCLI {
  constructor() {
    this.rootDir = path.resolve(__dirname, '../..');
    this.studentWorkspace = path.join(this.rootDir, 'student-workspace');
    this.levelsDir = path.join(this.rootDir, 'levels', 'act-1');
    this.progressFile = path.join(this.studentWorkspace, 'progress.json');
    this.sceneFile = path.join(this.rootDir, '.scene');
    this.progressDropsDir = path.join(this.rootDir, '.progress-drops');
    
    this.ensureDirectories();
  }

  ensureDirectories() {
    [this.studentWorkspace, 
     path.join(this.studentWorkspace, 'current'),
     this.progressDropsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
    
    if (!fs.existsSync(this.progressFile)) {
      this.initProgress();
    }
  }

  initProgress() {
    const initialProgress = {
      studentId: process.env.USER || 'student',
      currentScene: null,
      scenes: {},
      totalScore: 0,
      hintsUsed: {},
      startedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(this.progressFile, JSON.stringify(initialProgress, null, 2));
  }

  loadProgress() {
    if (!fs.existsSync(this.progressFile)) {
      this.initProgress();
    }
    return JSON.parse(fs.readFileSync(this.progressFile, 'utf8'));
  }

  saveProgress(progress) {
    progress.lastUpdated = new Date().toISOString();
    fs.writeFileSync(this.progressFile, JSON.stringify(progress, null, 2));
  }

  // Command: cq start <scene>
  async start(sceneId) {
    console.log(`🚀 Starting scene ${sceneId}...`);
    
    // Normalize scene ID (N00 or N00-scene -> N00-scene)
    const normalizedId = sceneId.includes('-') ? sceneId : `${sceneId}-scene`;
    const scenePath = path.join(this.levelsDir, normalizedId);
    
    if (!fs.existsSync(scenePath)) {
      console.error(`❌ Scene ${sceneId} not found`);
      return;
    }

    // Write .scene file (SceneRef)
    const sceneRef = {
      sceneId: normalizedId,
      startedAt: new Date().toISOString(),
      path: scenePath
    };
    fs.writeFileSync(this.sceneFile, JSON.stringify(sceneRef, null, 2));

    // Copy starter to student workspace (idempotent)
    const starterPath = path.join(scenePath, 'starter');
    const targetPath = path.join(this.studentWorkspace, 'current', normalizedId);
    
    if (fs.existsSync(starterPath)) {
      const targetStarterPath = path.join(targetPath, 'starter');
      this.copyDir(starterPath, targetStarterPath);
      console.log(`✅ Starter code copied to student-workspace/current/${normalizedId}/starter/`);
    }

    // Copy scene test file into student workspace so validation can run
    const sceneTestPath = path.join(scenePath, 'tests.spec.js');
    const targetTestPath = path.join(targetPath, 'tests.spec.js');
    if (fs.existsSync(sceneTestPath)) {
      fs.copyFileSync(sceneTestPath, targetTestPath);
      console.log(`🧪 Tests copied: student-workspace/current/${normalizedId}/tests.spec.js`);
    }

    // Update progress.json
    const progress = this.loadProgress();
    progress.currentScene = normalizedId;
    if (!progress.scenes[normalizedId]) {
      progress.scenes[normalizedId] = {
        startTime: new Date().toISOString(),
        attempts: 0,
        status: 'started',
        timeSpent: 0
      };
    }
    this.saveProgress(progress);

    // Load and display manifest
    const manifestPath = path.join(scenePath, 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      console.log(`\n📚 ${manifest.title}`);
      console.log(`📝 ${manifest.description}`);
      console.log(`⏱️  Estimated: ${manifest.estimatedMinutes} minutes`);
      console.log(`\n🎯 Learning Objectives:`);
      manifest.learningObjectives.forEach(obj => console.log(`  - ${obj}`));
    }

    console.log(`\n📂 Work in: student-workspace/current/${normalizedId}/`);
    console.log(`🧪 Test with: node student-workspace/current/${normalizedId}/tests.spec.js`);
    console.log(`✅ Validate with: cq validate ${sceneId}`);
  }

  // Command: cq validate [scene]
  async validate(sceneId, options = {}) {
    console.log('🔍 CodeQuest Validation Starting...');
    
    const progress = this.loadProgress();
    
    // Use provided scene or current scene
    const targetScene = sceneId || progress.currentScene;
    if (!targetScene) {
      console.error('❌ No scene specified and no current scene set');
      console.log('💡 Use: cq start <scene> to begin a scene');
      return;
    }

    const normalizedId = targetScene.includes('-') ? targetScene : `${targetScene}-scene`;
    const workPath = path.join(this.studentWorkspace, 'current', normalizedId);
    const testPath = path.join(workPath, 'tests.spec.js');
    
    if (!fs.existsSync(testPath)) {
      console.error(`❌ Test file not found for scene ${targetScene}`);
      return;
    }

    console.log(`📍 Validating scene: ${normalizedId}`);
    
    // Run tests
    let testsPassed = false;
    let testOutput = '';
    try {
      testOutput = execSync(`node ${testPath}`, { 
        cwd: workPath, 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      testsPassed = true;
      console.log(testOutput);
    } catch (error) {
      console.log(error.stdout || error.message);
      testsPassed = false;
    }

    // Determine status (base/bonus/challenge)
    let status = 'failed';
    if (testsPassed) {
      status = 'base';
      
      // Check for bonus/challenge criteria
      const criteriaPath = path.join(this.levelsDir, normalizedId, 'criteria.json');
      if (fs.existsSync(criteriaPath)) {
        const criteria = JSON.parse(fs.readFileSync(criteriaPath, 'utf8'));
        const solutionPath = path.join(workPath, 'solution.js');
        
        if (fs.existsSync(solutionPath)) {
          const code = fs.readFileSync(solutionPath, 'utf8');
          
          // Simple bonus check: arrow functions and const/let
          if (code.includes('=>') && (code.includes('const ') || code.includes('let '))) {
            status = 'bonus';
          }
          
          // Simple challenge check: line count and JSDoc
          const lines = code.split('\n').filter(l => l.trim()).length;
          if (lines <= 50 && code.includes('/**')) {
            status = 'challenge';
          }
        }
      }
    }

    // Update progress
    if (!progress.scenes[normalizedId]) {
      progress.scenes[normalizedId] = {
        startTime: new Date().toISOString(),
        attempts: 0,
        status: 'started',
        timeSpent: 0
      };
    }
    
    progress.scenes[normalizedId].attempts++;
    progress.scenes[normalizedId].status = status;
    progress.scenes[normalizedId].lastValidation = new Date().toISOString();
    
    // Calculate time spent
    if (progress.scenes[normalizedId].startTime) {
      const start = new Date(progress.scenes[normalizedId].startTime);
      const now = new Date();
      progress.scenes[normalizedId].timeSpent = Math.round((now - start) / 60000); // minutes
    }
    
    this.saveProgress(progress);

    // Display result
    const statusEmoji = {
      'failed': '❌',
      'base': '✅',
      'bonus': '⭐',
      'challenge': '🏆'
    };
    
    console.log(`\n${statusEmoji[status]} Validation Result: ${status.toUpperCase()}`);
    console.log(`📊 Attempts: ${progress.scenes[normalizedId].attempts}`);
    console.log(`⏱️  Time spent: ${progress.scenes[normalizedId].timeSpent} minutes`);

    // Export snapshot if --drop option
    if (options.drop) {
      const studentId = progress.studentId || 'student';
      const snapshotPath = path.join(this.progressDropsDir, `${studentId}_progress.json`);
      fs.writeFileSync(snapshotPath, JSON.stringify(progress, null, 2));
      console.log(`📸 Snapshot saved to .progress-drops/${studentId}_progress.json`);
    }
  }

  // Command: cq help-me [scene]
  async helpMe(sceneId) {
    const progress = this.loadProgress();
    const targetScene = sceneId || progress.currentScene;
    
    if (!targetScene) {
      console.error('❌ No scene specified');
      return;
    }

    const normalizedId = targetScene.includes('-') ? targetScene : `${targetScene}-scene`;
    
    // Track hint usage
    if (!progress.hintsUsed[normalizedId]) {
      progress.hintsUsed[normalizedId] = 0;
    }
    progress.hintsUsed[normalizedId]++;
    this.saveProgress(progress);

    // Generate help JSON
    const helpData = {
      timestamp: new Date().toISOString(),
      sceneId: normalizedId,
      hintNumber: progress.hintsUsed[normalizedId],
      environment: {
        node: process.version,
        platform: process.platform,
        cwd: process.cwd()
      }
    };

    console.log('🆘 Help Request Generated:');
    console.log(JSON.stringify(helpData, null, 2));

    // Provide progressive hints
    const hints = [
      '💡 Hint 1: Read the test file carefully to understand what each function should do',
      '💡 Hint 2: Start with the simplest function and make one test pass at a time',
      '💡 Hint 3: For default parameters, use: function greet(name = "World")'
    ];

    const hintIndex = Math.min(progress.hintsUsed[normalizedId] - 1, hints.length - 1);
    console.log(`\n${hints[hintIndex]}`);
    console.log(`\n📊 Hints used for this scene: ${progress.hintsUsed[normalizedId]}/3`);
  }

  // Helper: Copy directory recursively
  copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        this.copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

// CLI execution
async function main() {
  const cli = new CodeQuestCLI();
  const [,, command, ...args] = process.argv;

  switch (command) {
    case 'start':
      if (!args[0]) {
        console.error('Usage: cq start <scene>');
        console.log('Example: cq start N00');
        return;
      }
      await cli.start(args[0]);
      break;
      
    case 'validate':
      const dropIndex = args.indexOf('--drop');
      const sceneId = args[0] !== '--drop' ? args[0] : null;
      const options = { drop: dropIndex !== -1 };
      await cli.validate(sceneId, options);
      break;
      
    case 'help-me':
      await cli.helpMe(args[0]);
      break;
      
    case 'challenge-mode':
      console.log('⚡ Challenge Mode - Coming Soon!');
      break;
      
    default:
      console.log('CodeQuest 2.3 CLI');
      console.log('Commands:');
      console.log('  cq start <scene>     - Start a new scene');
      console.log('  cq validate [scene]  - Validate current or specified scene');
      console.log('  cq help-me [scene]   - Get help for scene');
      console.log('  cq challenge-mode    - Enter challenge mode');
      console.log('\nOptions:');
      console.log('  --drop              - Export progress snapshot (with validate)');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = CodeQuestCLI;