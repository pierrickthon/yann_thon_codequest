#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Demo Data Generator
 * Génère des progressions fictives pour démo
 */

const fs = require('fs');
const path = require('path');

class DemoGenerator {
  constructor() {
    this.students = [
      { id: 'alice-forte', name: 'Alice', profile: 'strong', speed: 1.2 },
      { id: 'bob-moyen', name: 'Bob', profile: 'average', speed: 1.0 },
      { id: 'charlie-debutant', name: 'Charlie', profile: 'beginner', speed: 0.7 },
      { id: 'diana-rapide', name: 'Diana', profile: 'fast', speed: 1.5 },
      { id: 'edgar-methodique', name: 'Edgar', profile: 'methodical', speed: 0.9 }
    ];
    
    this.scenes = [
      'N00-warmup',
      'N01-variables',
      'N02-immutability',
      'N03-destructuring',
      'N04-collections',
      'N05-modules',
      'N06-boss'
    ];
    
    this.dropDir = '.progress-drops';
  }

  log(message, icon = '🎮') {
    console.log(`${icon} ${message}`);
  }

  // Clean existing demo data
  cleanExisting() {
    if (fs.existsSync(this.dropDir)) {
      fs.rmSync(this.dropDir, { recursive: true, force: true });
    }
    fs.mkdirSync(this.dropDir, { recursive: true });
    this.log('Dossier drops nettoyé');
  }

  // Generate progress for a student
  generateStudentProgress(student) {
    const progress = {
      studentId: student.id,
      studentName: student.name,
      currentScene: null,
      scenes: {},
      totalScore: 0,
      hintsUsed: {},
      startedAt: this.getRandomPastDate(7),
      lastUpdated: new Date().toISOString()
    };

    // Determine how many scenes completed based on profile
    let scenesToComplete = 0;
    switch (student.profile) {
      case 'strong':
      case 'fast':
        scenesToComplete = 7; // All done
        break;
      case 'average':
        scenesToComplete = 5; // In progress
        break;
      case 'methodical':
        scenesToComplete = 4; // Steady progress
        break;
      case 'beginner':
        scenesToComplete = 2; // Just starting
        break;
    }

    // Generate scene progress
    for (let i = 0; i < scenesToComplete && i < this.scenes.length; i++) {
      const sceneId = this.scenes[i];
      const baseTime = this.getBaseTime(i);
      const actualTime = Math.round(baseTime / student.speed);
      
      // Determine status level
      let status = 'base';
      if (student.profile === 'strong' || student.profile === 'fast') {
        if (actualTime < baseTime * 0.7) status = 'challenge';
        else if (actualTime < baseTime * 0.9) status = 'bonus';
      } else if (student.profile === 'average') {
        if (Math.random() > 0.5) status = 'bonus';
      }

      // Hints used
      let hintsUsed = 0;
      if (student.profile === 'beginner') {
        hintsUsed = Math.floor(Math.random() * 3) + 1;
      } else if (student.profile === 'methodical') {
        hintsUsed = Math.random() > 0.7 ? 1 : 0;
      }

      progress.scenes[sceneId] = {
        status,
        completedAt: this.getSequentialDate(progress.startedAt, i),
        timeSpent: actualTime,
        testsPass: true,
        hintsUsed
      };

      // Score calculation
      let score = 100;
      if (status === 'bonus') score = 150;
      if (status === 'challenge') score = 200;
      score -= hintsUsed * 10;
      progress.totalScore += Math.max(score, 50);

      if (hintsUsed > 0) {
        progress.hintsUsed[sceneId] = hintsUsed;
      }
    }

    // Set current scene
    if (scenesToComplete < this.scenes.length) {
      progress.currentScene = this.scenes[scenesToComplete];
    } else {
      progress.currentScene = 'completed';
    }

    return progress;
  }

  // Get base completion time for scene (minutes)
  getBaseTime(sceneIndex) {
    const baseTimes = [5, 10, 15, 12, 20, 15, 25];
    return baseTimes[sceneIndex] || 15;
  }

  // Get random date in past N days
  getRandomPastDate(days) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * days));
    date.setHours(9 + Math.floor(Math.random() * 8)); // 9am-5pm
    return date.toISOString();
  }

  // Get sequential date for scene completion
  getSequentialDate(startDate, sceneIndex) {
    const date = new Date(startDate);
    date.setHours(date.getHours() + sceneIndex * 2); // 2 hours between scenes
    return date.toISOString();
  }

  // Create snapshot file
  createSnapshot(progress) {
    const timestamp = Date.now();
    const filename = `progress-${progress.studentId}-${timestamp}.json`;
    const filepath = path.join(this.dropDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(progress, null, 2));
    return filename;
  }

  // Generate demo loop data
  generateLoopData() {
    this.log('Génération données loop pour animation...');
    
    // Create time-series snapshots
    const loopStates = [];
    const student = { id: 'demo-loop', name: 'Demo', profile: 'average', speed: 1.0 };
    
    for (let i = 0; i <= this.scenes.length; i++) {
      const progress = {
        studentId: student.id,
        currentScene: i < this.scenes.length ? this.scenes[i] : 'completed',
        scenes: {},
        totalScore: 0
      };

      // Add completed scenes
      for (let j = 0; j < i; j++) {
        progress.scenes[this.scenes[j]] = {
          status: 'bonus',
          completedAt: new Date().toISOString(),
          timeSpent: 10,
          testsPass: true
        };
        progress.totalScore += 150;
      }

      loopStates.push(progress);
    }

    // Save loop states
    fs.writeFileSync(
      path.join(this.dropDir, 'demo-loop-states.json'),
      JSON.stringify(loopStates, null, 2)
    );
    
    this.log('  ✓ États de loop créés');
  }

  // Run generation
  async generate() {
    console.log('🎮 CodeQuest 2.3 - Demo Data Generator\n');
    console.log('='.repeat(50));
    
    this.cleanExisting();
    
    // Generate progress for each student
    this.log('Génération progressions étudiants...\n');
    
    for (const student of this.students) {
      const progress = this.generateStudentProgress(student);
      const filename = this.createSnapshot(progress);
      
      const completedCount = Object.keys(progress.scenes).length;
      const emoji = student.profile === 'strong' ? '🌟' : 
                   student.profile === 'fast' ? '⚡' :
                   student.profile === 'beginner' ? '🌱' : '📚';
      
      this.log(
        `${emoji} ${student.name} (${student.profile}): ${completedCount}/${this.scenes.length} scènes`,
        '  '
      );
      this.log(`     Score: ${progress.totalScore} pts`, '  ');
      this.log(`     Fichier: ${filename}`, '  ');
    }

    // Generate loop data
    console.log('\n' + '-'.repeat(50));
    this.generateLoopData();

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('\n✅ Données de démo générées!');
    console.log(`📁 ${this.students.length} progressions dans ${this.dropDir}/`);
    console.log('🔄 États de loop pour animation roadmap');
    console.log('\n🚀 Utilisez ces données pour démos en classe!');
  }
}

// Run
if (require.main === module) {
  const generator = new DemoGenerator();
  generator.generate().catch(console.error);
}

module.exports = DemoGenerator;