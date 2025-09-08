#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, execFileSync } = require('child_process');
const TypeScriptManager = require('./typescript');
const FastTracker = require('./fast-track');

class CodeQuestCLI {
  constructor() {
    this.rootDir = process.cwd();
    this.dataDir = path.join(this.rootDir, 'data');
    this.actsDir = path.join(this.rootDir, 'acts');
    this.schemasDir = path.join(this.rootDir, 'src', 'schemas');
    this.typescript = new TypeScriptManager();
    this.fastTracker = new FastTracker(this.rootDir);
    
    this.ensureDirectories();
  }

  ensureDirectories() {
    [this.dataDir, path.join(this.dataDir, 'progress'), path.join(this.dataDir, 'help-requests')]
      .forEach(dir => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
      });
  }

  async validate(withEmoji = false) {
    console.log('🔍 CodeQuest Validation Starting...');
    
    try {
      // Schema check first
      const { execSync } = require('child_process');
      try {
        execSync('node scripts/cq-schema-check.js', { stdio: 'pipe' });
      } catch (schemaError) {
        console.log('⚠️  Schema validation failed - proceeding with validation');
      }
      
      const progress = this.loadProgress();
      const currentScene = this.getCurrentScene();
      
      if (!currentScene) {
        console.log('❌ No active scene found. Use `git checkout` to start a scene.');
        return;
      }

      console.log(`📍 Current Scene: ${currentScene}`);
      
      const validation = await this.validateScene(currentScene);
      
      if (validation.success) {
        console.log('✅ Validation Successful!');
        
        // Format status with optional emoji
        let statusDisplay = validation.status;
        if (withEmoji) {
          const emojiMap = {
            'base': '⭐ base',
            'bonus': '⭐⭐ bonus',
            'challenge': '🏆 challenge'
          };
          statusDisplay = emojiMap[validation.status] || validation.status;
        }
        
        console.log(`Status: ${statusDisplay}`);
        this.updateProgress(currentScene, validation);
      } else {
        console.log('❌ Validation Failed');
        console.log('Issues found:');
        validation.issues.forEach(issue => console.log(`  - ${issue}`));
      }
      
    } catch (error) {
      console.error('Error during validation:', error.message);
    }
  }

  async helpMe(sceneId) {
    if (!sceneId) {
      console.log('Usage: cq help-me <scene-id>');
      console.log('Example: cq help-me N00-intro');
      return;
    }

    console.log(`🆘 Getting help for ${sceneId}...`);
    
    const helpRequest = {
      timestamp: new Date().toISOString(),
      sceneId,
      environment: {
        node: process.version,
        platform: process.platform,
        cwd: process.cwd()
      },
      gitStatus: this.getGitStatus()
    };

    // Save help request
    const filename = `help-${sceneId}-${Date.now()}.json`;
    fs.writeFileSync(
      path.join(this.dataDir, 'help-requests', filename),
      JSON.stringify(helpRequest, null, 2)
    );

    // Load scene hints
    const hints = this.loadSceneHints(sceneId);
    if (hints) {
      console.log('💡 Available hints:');
      hints.forEach((hint, index) => {
        console.log(`${index + 1}. ${hint}`);
      });
    } else {
      console.log('No hints available for this scene.');
    }
  }

  challengeMode() {
    console.log('⚡ Challenge Mode Activated!');
    console.log('Timer-based challenges with bonus points.');
    console.log('Implementation: Advanced feature for future releases.');
  }

  getCurrentScene() {
    try {
      const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
      if (branch.startsWith('scene/')) {
        return branch.replace('scene/', '');
      }
      return null;
    } catch {
      return null;
    }
  }

  getGitStatus() {
    try {
      return execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    } catch {
      return '';
    }
  }

  async validateScene(sceneId) {
    const scenePath = path.join(this.actsDir, 'act1', sceneId);
    if (!fs.existsSync(scenePath)) {
      return { success: false, issues: ['Scene not found'] };
    }

    const issues = [];
    let status = 'base';

    // Check for required files
    const testFile = path.join(scenePath, 'test.js');
    const solutionFile = path.join(scenePath, 'solution.js');
    
    if (!fs.existsSync(testFile)) {
      issues.push('Missing test.js file');
    }
    
    if (!fs.existsSync(solutionFile)) {
      issues.push('Missing solution.js file');
    }

    // Run tests if available
    if (fs.existsSync(testFile) && issues.length === 0) {
      try {
        execFileSync(process.execPath, [testFile], { cwd: scenePath, stdio: 'pipe' });
        status = 'bonus'; // Tests pass
        
        // Check for bonus criteria
        const code = fs.readFileSync(solutionFile, 'utf8');
        if (this.hasBonusCriteria(code, sceneId)) {
          status = 'challenge';
        }
      } catch (error) {
        issues.push(`Tests failed: ${error.message}`);
      }
    }

    return {
      success: issues.length === 0,
      issues,
      status,
      timestamp: new Date().toISOString()
    };
  }

  hasBonusCriteria(code, sceneId) {
    // Basic bonus criteria - could be enhanced per scene
    const bonusPatterns = {
      'N05-testing': /describe|it|test|expect/,
      'N06-tdd': /beforeEach|afterEach|setUp|tearDown/
    };
    
    const pattern = bonusPatterns[sceneId];
    return pattern ? pattern.test(code) : false;
  }

  loadProgress() {
    const progressFile = path.join(this.dataDir, 'progress', 'user-progress.json');
    if (fs.existsSync(progressFile)) {
      return JSON.parse(fs.readFileSync(progressFile, 'utf8'));
    }
    return { scenes: {}, totalScore: 0 };
  }

  updateProgress(sceneId, validation) {
    const progress = this.loadProgress();
    progress.scenes[sceneId] = {
      status: validation.status,
      lastValidation: validation.timestamp,
      attempts: (progress.scenes[sceneId]?.attempts || 0) + 1
    };
    
    const progressFile = path.join(this.dataDir, 'progress', 'user-progress.json');
    fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2));
  }

  loadSceneHints(sceneId) {
    const scenePath = path.join(this.actsDir, 'act1', sceneId, 'hints.json');
    if (fs.existsSync(scenePath)) {
      const hints = JSON.parse(fs.readFileSync(scenePath, 'utf8'));
      return hints.hints || [];
    }
    return null;
  }
}

// CLI execution
async function main() {
  const cli = new CodeQuestCLI();
  const [,, command, ...args] = process.argv;

  switch (command) {
    case 'validate':
      const emojiFlag = args.includes('--emoji');
      await cli.validate(emojiFlag);
      break;
    case 'help-me':
      await cli.helpMe(args[0]);
      break;
    case 'challenge-mode':
      cli.challengeMode();
      break;
    case 'ts:strict':
      const level = args.find(arg => arg.match(/^\d+$/)) || 
                   (args.includes('--level') ? args[args.indexOf('--level') + 1] : null);
      if (!level) {
        console.log('Usage: cq ts:strict --level <0|1|2|3>');
        break;
      }
      cli.typescript.setStrictLevel(level);
      break;
    case 'ts:migrate':
      const act = args.find(arg => arg.match(/^\d+$/)) || 
                 (args.includes('--act') ? args[args.indexOf('--act') + 1] : null);
      if (!act) {
        console.log('Usage: cq ts:migrate --act <1|2>');
        break;
      }
      cli.typescript.migrateAct(act);
      break;
    case 'ts:score':
      cli.typescript.calculateTypeScore();
      break;
    case 'ts:budget':
      if (args.includes('--ignores')) {
        const limit = args[args.indexOf('--ignores') + 1];
        cli.typescript.setBudget('ignores', limit);
      } else if (args.includes('--any')) {
        const limit = args[args.indexOf('--any') + 1];
        cli.typescript.setBudget('any', limit);
      } else {
        console.log('Usage: cq ts:budget --ignores <n> | --any <n>');
      }
      break;
    case 'fast-track':
      const ftArgs = args.join(' ');
      if (ftArgs.includes('--act')) {
        const actNum = args[args.indexOf('--act') + 1];
        if (ftArgs.includes('start')) {
          cli.fastTracker.start(actNum);
        } else {
          console.log('Usage: cq fast-track --act <n> start');
        }
      } else {
        console.log('Usage: cq fast-track --act <1|2|3> start');
      }
      break;
    default:
      console.log('CodeQuest 2.3 - TypeScript Edition');
      console.log('Commands:');
      console.log('  cq validate             - Validate current scene');
      console.log('  cq help-me <scene>      - Get help for scene');
      console.log('  cq challenge-mode       - Enter challenge mode');
      console.log('  cq ts:strict --level <n>  - Set TypeScript strict level (0-3)');
      console.log('  cq ts:migrate --act <n>   - Migrate Act to TypeScript');
      console.log('  cq ts:score             - Calculate TypeScore');
      console.log('  cq ts:budget --ignores <n> - Set @ts-ignore budget');
      console.log('  cq ts:budget --any <n>     - Set any usage budget');
      console.log('  cq fast-track --act <n> start - Start Fast-Track challenge');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = CodeQuestCLI;