/**
 * CodeQuest 2.3 - Roadmap UI JavaScript
 * Offline-first, reads local progress.json
 */

class RoadmapUI {
    constructor() {
        this.progress = null;
        this.currentLevel = null;
        this.levels = [
            { id: 'N00', title: 'JavaScript Fundamentals', description: 'Variables, functions, control flow' },
            { id: 'N01', title: 'Functions & Scope', description: 'Closures, higher-order functions' },
            { id: 'N02', title: 'Arrays & Objects', description: 'Data manipulation' },
            { id: 'N03', title: 'Async Programming', description: 'Promises, async/await' },
            { id: 'N04', title: 'Error Handling', description: 'try/catch, resilience' },
            { id: 'N05', title: 'Testing Fundamentals', description: 'Assertions, test suites' },
            { id: 'N06', title: 'TDD Methodology', description: 'Red-Green-Refactor' }
        ];
        
        this.init();
    }

    async init() {
        await this.loadProgress();
        this.renderLevels();
        this.updateStats();
        
        // Auto-reload every 5 seconds to catch updates from CLI
        setInterval(() => {
            this.loadProgress();
        }, 5000);
    }

    async loadProgress() {
        try {
            // Try to load from student-workspace/progress.json
            const response = await fetch('../student-workspace/progress.json?' + Date.now());
            if (response.ok) {
                this.progress = await response.json();
                this.updateUI();
            }
        } catch (error) {
            console.log('Loading demo progress...');
            // Fallback to demo progress
            this.progress = {
                currentScene: null,
                scenes: {},
                totalScore: 0,
                hintsUsed: {}
            };
        }
    }

    renderLevels() {
        const container = document.getElementById('act1-levels');
        container.innerHTML = '';

        this.levels.forEach((level, index) => {
            const levelEl = document.createElement('div');
            levelEl.className = 'level';
            levelEl.dataset.levelId = level.id;
            
            // Determine status
            const sceneKey = `${level.id}-scene`;
            let status = 'locked';
            let statusIcon = '🔒';
            
            if (this.progress && this.progress.scenes[sceneKey]) {
                const sceneData = this.progress.scenes[sceneKey];
                if (sceneData.status === 'challenge') {
                    status = 'completed';
                    statusIcon = '🏆';
                } else if (sceneData.status === 'bonus') {
                    status = 'completed';
                    statusIcon = '⭐';
                } else if (sceneData.status === 'base') {
                    status = 'completed';
                    statusIcon = '✅';
                } else {
                    status = 'current';
                    statusIcon = '🎯';
                }
            } else if (this.progress && this.progress.currentScene === sceneKey) {
                status = 'current';
                statusIcon = '🎯';
            } else if (index === 0 || (index > 0 && this.isLevelCompleted(this.levels[index - 1].id))) {
                status = 'available';
                statusIcon = '▶️';
            }

            levelEl.classList.add(status);
            
            levelEl.innerHTML = `
                <div class="level-status">${statusIcon}</div>
                <div class="level-number">${index + 1}</div>
                <div class="level-title">${level.title}</div>
            `;

            levelEl.addEventListener('click', () => this.openLevelPanel(level));
            container.appendChild(levelEl);
        });
    }

    isLevelCompleted(levelId) {
        const sceneKey = `${levelId}-scene`;
        return this.progress && 
               this.progress.scenes[sceneKey] && 
               ['base', 'bonus', 'challenge'].includes(this.progress.scenes[sceneKey].status);
    }

    updateStats() {
        if (!this.progress) return;

        // Calculate completed scenes
        const completedScenes = Object.values(this.progress.scenes || {})
            .filter(s => ['base', 'bonus', 'challenge'].includes(s.status)).length;
        
        const totalScenes = this.levels.length;
        const progressPercent = Math.round((completedScenes / totalScenes) * 100);
        
        // Calculate total time
        const totalMinutes = Object.values(this.progress.scenes || {})
            .reduce((sum, s) => sum + (s.timeSpent || 0), 0);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        // Update UI
        document.getElementById('total-progress').textContent = `${progressPercent}%`;
        document.getElementById('scenes-completed').textContent = `${completedScenes}/${totalScenes}`;
        document.getElementById('current-scene').textContent = 
            this.progress.currentScene ? this.progress.currentScene.replace('-scene', '') : '-';
        document.getElementById('total-time').textContent = 
            hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        
        // Update Act I progress bar
        document.getElementById('act1-progress').style.width = `${progressPercent}%`;
    }

    updateUI() {
        this.renderLevels();
        this.updateStats();
        
        // Animate completed levels
        document.querySelectorAll('.level.completed').forEach(el => {
            if (!el.classList.contains('animated')) {
                el.classList.add('animated');
                el.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    el.style.animation = '';
                }, 500);
            }
        });
    }

    openLevelPanel(level) {
        this.currentLevel = level;
        const sceneKey = `${level.id}-scene`;
        
        // Update panel content
        document.getElementById('panel-title').textContent = `Level ${level.id}: ${level.title}`;
        document.getElementById('panel-description').textContent = level.description;
        
        // Load objectives (mock for now)
        const objectives = [
            'Master core concepts',
            'Write clean, testable code',
            'Pass all test cases'
        ];
        document.getElementById('panel-objectives').innerHTML = 
            objectives.map(obj => `<li>${obj}</li>`).join('');
        
        // Load criteria
        this.loadCriteria(level.id);
        
        // Update hints counter
        const hintsUsed = (this.progress && this.progress.hintsUsed[sceneKey]) || 0;
        document.getElementById('h1-count').textContent = hintsUsed >= 1 ? '✓' : '0';
        document.getElementById('h2-count').textContent = hintsUsed >= 2 ? '✓' : '0';
        document.getElementById('h3-count').textContent = hintsUsed >= 3 ? '✓' : '0';
        
        // Update button states
        const isCompleted = this.isLevelCompleted(level.id);
        const startBtn = document.getElementById('start-level-btn');
        
        if (isCompleted) {
            startBtn.textContent = '✅ Completed';
            startBtn.disabled = true;
        } else if (this.progress && this.progress.currentScene === sceneKey) {
            startBtn.textContent = '▶️ Continue';
            startBtn.disabled = false;
        } else {
            startBtn.textContent = '🚀 Start Level';
            startBtn.disabled = false;
        }
        
        // Show panel
        document.getElementById('levelPanel').classList.add('active');
    }

    async loadCriteria(levelId) {
        try {
            const response = await fetch(`../levels/act-1/${levelId}-scene/criteria.json`);
            if (response.ok) {
                const criteria = await response.json();
                const html = `
                    <div><strong>Base:</strong> ${criteria.base.description}</div>
                    <div><strong>Bonus:</strong> ${criteria.bonus.description}</div>
                    <div><strong>Challenge:</strong> ${criteria.challenge.description}</div>
                `;
                document.getElementById('panel-criteria').innerHTML = html;
            }
        } catch (error) {
            document.getElementById('panel-criteria').innerHTML = 'Criteria not available';
        }
    }
}

// Global functions for button actions
function closeLevelPanel() {
    document.getElementById('levelPanel').classList.remove('active');
}

function startLevel() {
    if (!window.roadmap || !window.roadmap.currentLevel) return;
    
    const levelId = window.roadmap.currentLevel.id;
    const command = `cq start ${levelId}`;
    
    // Copy command to clipboard
    navigator.clipboard.writeText(command).then(() => {
        alert(`Command copied! Run in terminal:\n${command}`);
    });
    
    // Update local progress to mark as started
    if (window.roadmap.progress) {
        const sceneKey = `${levelId}-scene`;
        if (!window.roadmap.progress.scenes[sceneKey]) {
            window.roadmap.progress.scenes[sceneKey] = {
                status: 'started',
                startTime: new Date().toISOString(),
                attempts: 0
            };
        }
        window.roadmap.progress.currentScene = sceneKey;
        
        // Note: In real implementation, this would write back to progress.json
        // For now, the CLI handles all writes
    }
    
    closeLevelPanel();
}

function openInstructions() {
    if (!window.roadmap || !window.roadmap.currentLevel) return;
    
    const levelId = window.roadmap.currentLevel.id;
    // In a real implementation, this would open the README.md file
    window.open(`../levels/act-1/${levelId}-scene/README.md`, '_blank');
}

function useHint() {
    if (!window.roadmap || !window.roadmap.currentLevel) return;
    
    const levelId = window.roadmap.currentLevel.id;
    const command = `cq help-me ${levelId}`;
    
    navigator.clipboard.writeText(command).then(() => {
        alert(`Command copied! Run in terminal:\n${command}`);
    });
}

function copyCommand() {
    if (!window.roadmap || !window.roadmap.currentLevel) return;
    
    const levelId = window.roadmap.currentLevel.id;
    const command = `cq validate ${levelId}`;
    
    navigator.clipboard.writeText(command).then(() => {
        alert(`Command copied! Run in terminal:\n${command}`);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.roadmap = new RoadmapUI();
});