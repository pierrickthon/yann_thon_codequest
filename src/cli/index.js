#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CodeQuestCLI {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.actsDir = path.join(process.cwd(), 'acts');
    this.schemasDir = path.join(process.cwd(), 'src', 'schemas');
    
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

  async validate() {
    console.log('🔍 CodeQuest Validation Starting...');
    
    try {
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
        console.log(`Status: ${validation.status}`);
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
        execSync(`node ${testFile}`, { cwd: scenePath });
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
      await cli.validate();
      break;
    case 'help-me':
      await cli.helpMe(args[0]);
      break;
    case 'challenge-mode':
      cli.challengeMode();
      break;
    default:
      console.log('CodeQuest 2.3 MVP');
      console.log('Commands:');
      console.log('  cq validate          - Validate current scene');
      console.log('  cq help-me <scene>   - Get help for scene');
      console.log('  cq challenge-mode    - Enter challenge mode');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = CodeQuestCLI;