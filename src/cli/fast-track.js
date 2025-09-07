/**
 * CodeQuest 2.3 - Fast-Track System
 * Mode chronométré pour challenges intensifs
 */

const fs = require('fs');
const path = require('path');

class FastTracker {
  constructor(rootDir) {
    this.rootDir = rootDir;
    this.fastTrackFile = path.join(rootDir, '.fast-track.json');
    this.progressFile = path.join(rootDir, 'student-workspace', 'progress.json');
  }

  // Start Fast-Track mode
  start(act) {
    const actConfig = this.getActConfig(act);
    if (!actConfig) {
      throw new Error(`Fast-Track not available for Act ${act}`);
    }

    // Check prerequisites
    if (act === 2 && !this.isActCompleted(1)) {
      throw new Error('Act I must be completed before Fast-Track Act II');
    }

    const session = {
      act: parseInt(act),
      startTime: Date.now(),
      duration: actConfig.duration,
      maxHints: actConfig.maxHints,
      requiredScenes: actConfig.scenes,
      hintsUsed: 0,
      scenesCompleted: [],
      active: true,
      badge: null
    };

    fs.writeFileSync(this.fastTrackFile, JSON.stringify(session, null, 2));
    
    console.log(`🚀 Fast-Track Act ${act} STARTED!`);
    console.log(`⏱️  Duration: ${actConfig.duration / 60000} minutes`);
    console.log(`💡 Max hints: ${actConfig.maxHints}`);
    console.log(`🎯 Required: ${actConfig.scenes.length} scenes`);
    console.log(`⚡ Let's code fast! Use 'cq fast-track --act ${act} status' to check progress.`);
    
    return session;
  }

  // Get current status
  status(act) {
    const session = this.loadSession();
    
    if (!session || !session.active || session.act !== parseInt(act)) {
      console.log(`❌ No active Fast-Track session for Act ${act}`);
      return null;
    }

    const elapsed = Date.now() - session.startTime;
    const remaining = Math.max(0, session.duration - elapsed);
    const progress = this.loadProgress();

    // Count completed scenes in this act
    const completedInAct = session.requiredScenes.filter(sceneId => {
      return progress.scenes[sceneId] && ['base', 'bonus', 'challenge'].includes(progress.scenes[sceneId].status);
    });

    console.log(`⚡ Fast-Track Act ${act} Status:`);
    console.log(`⏱️  Time remaining: ${Math.ceil(remaining / 60000)} minutes`);
    console.log(`🎯 Scenes: ${completedInAct.length}/${session.requiredScenes.length} completed`);
    console.log(`💡 Hints used: ${session.hintsUsed}/${session.maxHints}`);
    
    completedInAct.forEach(sceneId => {
      console.log(`  ✅ ${sceneId}: ${progress.scenes[sceneId].status}`);
    });

    if (remaining === 0) {
      this.evaluateSession(session);
    }

    return {
      elapsed,
      remaining,
      scenesCompleted: completedInAct.length,
      scenesRequired: session.requiredScenes.length,
      hintsUsed: session.hintsUsed,
      maxHints: session.maxHints,
      success: completedInAct.length >= session.requiredScenes.length
    };
  }

  // Abort Fast-Track mode
  abort(act) {
    const session = this.loadSession();
    
    if (!session || !session.active || session.act !== parseInt(act)) {
      console.log(`❌ No active Fast-Track session for Act ${act}`);
      return;
    }

    session.active = false;
    session.aborted = true;
    fs.writeFileSync(this.fastTrackFile, JSON.stringify(session, null, 2));

    console.log(`🛑 Fast-Track Act ${act} ABORTED`);
    console.log('📚 Returning to standard mode. Your progress is preserved.');
  }

  // Record hint usage
  recordHint(sceneId) {
    const session = this.loadSession();
    if (session && session.active) {
      session.hintsUsed++;
      fs.writeFileSync(this.fastTrackFile, JSON.stringify(session, null, 2));
      
      if (session.hintsUsed > session.maxHints) {
        console.log(`⚠️  Fast-Track: Exceeded hint limit (${session.hintsUsed}/${session.maxHints})`);
        this.failSession(session, 'hint_limit_exceeded');
      }
    }
  }

  // Evaluate session completion
  evaluateSession(session) {
    const progress = this.loadProgress();
    const completedScenes = session.requiredScenes.filter(sceneId => {
      return progress.scenes[sceneId] && ['base', 'bonus', 'challenge'].includes(progress.scenes[sceneId].status);
    });

    const elapsed = Date.now() - session.startTime;
    const timeExpired = elapsed >= session.duration;
    const allScenesComplete = completedScenes.length >= session.requiredScenes.length;
    const hintsOK = session.hintsUsed <= session.maxHints;

    session.active = false;
    session.completedAt = Date.now();
    session.finalScenes = completedScenes.length;

    if (allScenesComplete && hintsOK && !timeExpired) {
      // SUCCESS!
      session.badge = `Fast-Tracker Act ${session.act}`;
      session.success = true;
      
      // Update progress with badge
      progress.badges = progress.badges || [];
      progress.badges.push(session.badge);
      progress.lastUpdated = new Date().toISOString();
      fs.writeFileSync(this.progressFile, JSON.stringify(progress, null, 2));
      
      console.log('\n🏆 FAST-TRACK SUCCESS!');
      console.log(`🎖️  Badge earned: "${session.badge}"`);
      console.log(`⏱️  Completed in: ${Math.ceil(elapsed / 60000)} minutes`);
      console.log(`💡 Hints used: ${session.hintsUsed}/${session.maxHints}`);
    } else {
      // FAILURE
      session.success = false;
      let reason = [];
      if (timeExpired) reason.push('time expired');
      if (!allScenesComplete) reason.push(`only ${completedScenes.length}/${session.requiredScenes.length} scenes`);
      if (!hintsOK) reason.push('too many hints');
      
      console.log('\n⏰ Fast-Track session ended');
      console.log(`❌ Requirements not met: ${reason.join(', ')}`);
      console.log('📚 Your progress is preserved in standard mode.');
    }

    fs.writeFileSync(this.fastTrackFile, JSON.stringify(session, null, 2));
  }

  // Fail session immediately
  failSession(session, reason) {
    session.active = false;
    session.success = false;
    session.failureReason = reason;
    fs.writeFileSync(this.fastTrackFile, JSON.stringify(session, null, 2));

    console.log(`❌ Fast-Track FAILED: ${reason}`);
    console.log('📚 Returning to standard mode. Your progress is preserved.');
  }

  // Check if act is completed
  isActCompleted(act) {
    const progress = this.loadProgress();
    const actScenes = this.getActConfig(act)?.scenes || [];
    
    return actScenes.every(sceneId => {
      return progress.scenes[sceneId] && ['base', 'bonus', 'challenge'].includes(progress.scenes[sceneId].status);
    });
  }

  // Load session
  loadSession() {
    if (!fs.existsSync(this.fastTrackFile)) return null;
    try {
      return JSON.parse(fs.readFileSync(this.fastTrackFile, 'utf8'));
    } catch {
      return null;
    }
  }

  // Load progress
  loadProgress() {
    if (!fs.existsSync(this.progressFile)) return { scenes: {}, badges: [] };
    try {
      return JSON.parse(fs.readFileSync(this.progressFile, 'utf8'));
    } catch {
      return { scenes: {}, badges: [] };
    }
  }

  // Get act configuration
  getActConfig(act) {
    const configs = {
      1: {
        duration: 90 * 60 * 1000, // 90 minutes  
        maxHints: 2,
        scenes: ['N00-warmup-tutorial', 'N01-pure-functions', 'N02-destructuring', 'N03-map-filter', 'N04-reduce-immutability', 'N05-closures-modules', 'N06-boss-integration']
      },
      2: {
        duration: 120 * 60 * 1000, // 120 minutes
        maxHints: 2,
        scenes: ['N07-promises-basics', 'N08-async-await-control', 'N09-concurrency-limit', 'N10-retry-timeout-backoff', 'N11-cancellation-api', 'N12-boss-orchestration']
      }
    };
    
    return configs[parseInt(act)];
  }
}

module.exports = FastTracker;