/**
 * CodeQuest Gamified Roadmap - Interactive Map
 */

class RoadmapApp {
    constructor() {
        this.apiBase = '/api';
        this.scenes = [
            { id: 'N00-intro', title: 'JavaScript Fundamentals', description: 'Variables, functions, control flow' },
            { id: 'N01-functions', title: 'Functions & Scope', description: 'Closures, higher-order functions' },
            { id: 'N02-arrays-objects', title: 'Arrays & Objects', description: 'Data manipulation, functional programming' },
            { id: 'N03-async', title: 'Async Programming', description: 'Promises, async/await, concurrency' },
            { id: 'N04-error-handling', title: 'Error Handling', description: 'try/catch, custom errors, resilience' },
            { id: 'N05-testing', title: 'Testing Fundamentals', description: 'Assertions, test frameworks' },
            { id: 'N06-tdd', title: 'TDD Methodology', description: 'Red-Green-Refactor cycle' }
        ];
        
        this.currentProgress = null;
        this.currentSceneIndex = 0;
        
        this.init();
    }

    async init() {
        console.log('🗺️ CodeQuest Roadmap initialized');
        
        // Load progress and update UI
        await this.loadProgress();
        this.updateRoadmap();
        this.bindEvents();
        
        // Auto-refresh every 30 seconds
        setInterval(() => {
            this.loadProgress();
        }, 30000);
    }

    async loadProgress() {
        try {
            const [progressRes, statsRes] = await Promise.all([
                fetch(`${this.apiBase}/progress`),
                fetch(`${this.apiBase}/stats`)
            ]);
            
            this.currentProgress = await progressRes.json();
            this.currentStats = await statsRes.json();
            
            this.updateRoadmap();
            this.updatePlayerStats();
            
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    updateRoadmap() {
        if (!this.currentProgress) return;

        const completedScenes = Object.keys(this.currentProgress.scenes || {});
        let currentSceneFound = false;

        this.scenes.forEach((scene, index) => {
            const sceneElement = document.querySelector(`[data-scene="${scene.id}"]`);
            if (!sceneElement) return;

            const sceneData = this.currentProgress.scenes[scene.id];
            
            if (sceneData) {
                // Scene is completed
                this.setSceneState(sceneElement, 'completed', sceneData);
            } else if (!currentSceneFound) {
                // This is the current (next) scene
                this.setSceneState(sceneElement, 'current');
                this.currentSceneIndex = index;
                currentSceneFound = true;
            } else {
                // Scene is locked
                this.setSceneState(sceneElement, 'locked');
            }
        });

        this.updateProgressBar();
    }

    setSceneState(element, state, sceneData = null) {
        // Remove existing state classes
        element.classList.remove('completed', 'current', 'locked');
        element.classList.add(state);

        const levelInfo = element.querySelector('.level-info');
        const statusBadge = element.querySelector('.status-badge');
        const attempts = element.querySelector('.attempts');

        if (state === 'completed' && sceneData) {
            statusBadge.textContent = sceneData.status.toUpperCase();
            statusBadge.className = `status-badge ${sceneData.status}`;
            attempts.textContent = `${sceneData.attempts} attempt${sceneData.attempts > 1 ? 's' : ''}`;
            
            // Add completion animation
            this.addCompletionEffect(element);
            
        } else if (state === 'current') {
            statusBadge.textContent = 'NEXT';
            statusBadge.className = 'status-badge current';
            attempts.textContent = 'Ready to start';
            
            // Add pulsing effect
            this.addCurrentEffect(element);
            
        } else if (state === 'locked') {
            statusBadge.textContent = 'LOCKED';
            statusBadge.className = 'status-badge locked';
            attempts.textContent = '';
        }
    }

    addCompletionEffect(element) {
        const circle = element.querySelector('.level-circle');
        const ring = element.querySelector('.completion-ring');
        
        // Add golden glow effect
        circle.style.boxShadow = '0 0 20px rgba(241, 196, 15, 0.6)';
        
        // Animate completion ring
        if (ring) {
            ring.style.animation = 'completionGlow 2s ease-in-out infinite alternate';
        }
    }

    addCurrentEffect(element) {
        const circle = element.querySelector('.level-circle');
        const pulse = element.querySelector('.current-pulse');
        
        // Add blue glow effect
        circle.style.boxShadow = '0 0 25px rgba(52, 152, 219, 0.7)';
        
        // Animate pulse ring
        if (pulse) {
            pulse.style.animation = 'pulseRing 2s ease-out infinite';
        }
    }

    updatePlayerStats() {
        if (!this.currentStats) return;

        // Update player level based on completion
        const level = Math.floor(this.currentStats.completedScenes / 2) + 1;
        document.getElementById('player-level').textContent = `Lv.${level}`;

        // Calculate score (bonus = 100, base = 70, challenge = 150)
        let totalScore = 0;
        if (this.currentProgress && this.currentProgress.scenes) {
            Object.values(this.currentProgress.scenes).forEach(scene => {
                switch (scene.status) {
                    case 'base': totalScore += 70; break;
                    case 'bonus': totalScore += 100; break;
                    case 'challenge': totalScore += 150; break;
                }
            });
        }
        document.getElementById('total-score').textContent = totalScore;

        // Update completion rate
        document.getElementById('completion-rate').textContent = `${this.currentStats.progressPercentage}%`;

        // Calculate streak (simplified)
        const streak = this.currentStats.completedScenes;
        document.getElementById('streak-count').textContent = streak;
    }

    updateProgressBar() {
        const progressPercentage = this.currentStats ? this.currentStats.progressPercentage : 0;
        const completedScenes = this.currentStats ? this.currentStats.completedScenes : 0;
        const totalScenes = this.scenes.length;

        document.getElementById('overall-progress').style.width = `${progressPercentage}%`;
        document.getElementById('progress-text').textContent = `${completedScenes}/${totalScenes} Scenes Complete`;
    }

    bindEvents() {
        // Scene level clicks
        document.querySelectorAll('.scene-level').forEach(element => {
            element.addEventListener('click', (e) => {
                this.handleSceneClick(e.currentTarget);
            });
        });

        // Action buttons
        document.getElementById('start-scene').addEventListener('click', () => {
            this.startCurrentScene();
        });

        document.getElementById('review-progress').addEventListener('click', () => {
            this.showProgressDetails();
        });

        document.getElementById('get-help').addEventListener('click', () => {
            this.requestHelp();
        });
    }

    handleSceneClick(element) {
        const sceneId = element.dataset.scene;
        const sceneState = element.classList.contains('completed') ? 'completed' : 
                          element.classList.contains('current') ? 'current' : 'locked';

        if (sceneState === 'locked') {
            this.showLockedMessage(sceneId);
            return;
        }

        if (sceneState === 'current') {
            this.startScene(sceneId);
        } else if (sceneState === 'completed') {
            this.reviewScene(sceneId);
        }
    }

    startCurrentScene() {
        const currentScene = this.scenes[this.currentSceneIndex];
        if (currentScene) {
            this.startScene(currentScene.id);
        }
    }

    startScene(sceneId) {
        const scene = this.scenes.find(s => s.id === sceneId);
        if (!scene) return;

        const modal = this.createModal({
            title: `🚀 Start ${scene.title}`,
            content: `
                <div class="scene-start-modal">
                    <p><strong>Description:</strong> ${scene.description}</p>
                    <div class="instructions">
                        <h4>📋 Instructions:</h4>
                        <ol>
                            <li>Create a git branch: <code>git checkout -b scene/${sceneId}</code></li>
                            <li>Navigate to: <code>cd acts/act1/${sceneId}</code></li>
                            <li>Read the README: <code>cat README.md</code></li>
                            <li>Edit solution.js and implement the requirements</li>
                            <li>Test your solution: <code>node test.js</code></li>
                            <li>Validate progress: <code>cq validate</code></li>
                        </ol>
                    </div>
                    <div class="tips">
                        <h4>💡 Tips:</h4>
                        <ul>
                            <li>Aim for bonus or challenge completion</li>
                            <li>Use <code>cq help-me ${sceneId}</code> if you get stuck</li>
                            <li>Read tests carefully to understand requirements</li>
                        </ul>
                    </div>
                </div>
            `,
            actions: [
                { text: 'Start Scene', primary: true, action: () => this.closeModal() },
                { text: 'Cancel', action: () => this.closeModal() }
            ]
        });
    }

    reviewScene(sceneId) {
        const sceneData = this.currentProgress.scenes[sceneId];
        const scene = this.scenes.find(s => s.id === sceneId);
        
        const modal = this.createModal({
            title: `📊 ${scene.title} - Review`,
            content: `
                <div class="scene-review-modal">
                    <div class="completion-status ${sceneData.status}">
                        <span class="status-icon">${this.getStatusIcon(sceneData.status)}</span>
                        <span class="status-text">${sceneData.status.toUpperCase()} COMPLETED</span>
                    </div>
                    <div class="scene-stats">
                        <div class="stat">
                            <label>Attempts:</label>
                            <value>${sceneData.attempts}</value>
                        </div>
                        <div class="stat">
                            <label>Last Validation:</label>
                            <value>${new Date(sceneData.lastValidation).toLocaleDateString()}</value>
                        </div>
                        <div class="stat">
                            <label>Score Earned:</label>
                            <value>${this.getSceneScore(sceneData.status)} points</value>
                        </div>
                    </div>
                    <p>Great work completing this scene! You can always revisit the code to improve your solution.</p>
                </div>
            `,
            actions: [
                { text: 'Close', primary: true, action: () => this.closeModal() }
            ]
        });
    }

    showLockedMessage(sceneId) {
        const scene = this.scenes.find(s => s.id === sceneId);
        const modal = this.createModal({
            title: '🔒 Scene Locked',
            content: `
                <div class="locked-scene-modal">
                    <div class="lock-icon">🔐</div>
                    <h3>${scene.title}</h3>
                    <p>This scene is locked. Complete the previous scenes to unlock it!</p>
                    <p class="description">${scene.description}</p>
                </div>
            `,
            actions: [
                { text: 'OK', primary: true, action: () => this.closeModal() }
            ]
        });
    }

    showProgressDetails() {
        // Redirect to the original dashboard
        window.location.href = '/';
    }

    requestHelp() {
        const currentScene = this.scenes[this.currentSceneIndex];
        if (currentScene) {
            const modal = this.createModal({
                title: '🆘 Get Help',
                content: `
                    <div class="help-modal">
                        <p>Need assistance with <strong>${currentScene.title}</strong>?</p>
                        <div class="help-options">
                            <h4>Available Help:</h4>
                            <ul>
                                <li><strong>CLI Command:</strong> <code>cq help-me ${currentScene.id}</code></li>
                                <li><strong>Scene README:</strong> Check acts/act1/${currentScene.id}/README.md</li>
                                <li><strong>Hints File:</strong> acts/act1/${currentScene.id}/hints.json</li>
                                <li><strong>Test File:</strong> Review test.js to understand requirements</li>
                            </ul>
                        </div>
                    </div>
                `,
                actions: [
                    { text: 'Got it!', primary: true, action: () => this.closeModal() }
                ]
            });
        }
    }

    createModal({ title, content, actions = [] }) {
        const modal = document.createElement('div');
        modal.className = 'game-modal-overlay';
        modal.innerHTML = `
            <div class="game-modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    ${content}
                </div>
                <div class="modal-actions">
                    ${actions.map(action => `
                        <button class="modal-btn ${action.primary ? 'primary' : 'secondary'}" 
                                data-action="${actions.indexOf(action)}">
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Add styles for modal
        this.addModalStyles();

        // Bind events
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        actions.forEach((action, index) => {
            const btn = modal.querySelector(`[data-action="${index}"]`);
            if (btn) {
                btn.addEventListener('click', () => {
                    if (action.action) action.action();
                    this.closeModal();
                });
            }
        });

        document.body.appendChild(modal);
        this.currentModal = modal;

        return modal;
    }

    closeModal() {
        if (this.currentModal) {
            this.currentModal.remove();
            this.currentModal = null;
        }
    }

    addModalStyles() {
        if (document.getElementById('modal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .game-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                backdrop-filter: blur(5px);
            }
            
            .game-modal {
                background: white;
                border-radius: 15px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                animation: modalAppear 0.3s ease;
            }
            
            @keyframes modalAppear {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 2px solid #ecf0f1;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #7f8c8d;
            }
            
            .modal-content {
                padding: 20px;
            }
            
            .modal-actions {
                padding: 20px;
                border-top: 2px solid #ecf0f1;
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            }
            
            .modal-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            .modal-btn.primary {
                background: #3498db;
                color: white;
            }
            
            .modal-btn.secondary {
                background: #ecf0f1;
                color: #2c3e50;
            }
            
            code {
                background: #f8f9fa;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: monospace;
            }
            
            .scene-start-modal ol, .scene-start-modal ul {
                margin: 10px 0;
                padding-left: 20px;
            }
            
            .completion-status {
                text-align: center;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .completion-status.bonus {
                background: linear-gradient(135deg, #f1c40f, #f39c12);
                color: white;
            }
            
            .completion-status.base {
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
            }
            
            .completion-status.challenge {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
            }
            
            .scene-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
                margin: 20px 0;
            }
            
            .stat {
                text-align: center;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 8px;
            }
            
            .stat label {
                display: block;
                font-size: 12px;
                color: #7f8c8d;
                margin-bottom: 5px;
            }
            
            .stat value {
                font-weight: bold;
                color: #2c3e50;
            }
        `;
        document.head.appendChild(styles);
    }

    getStatusIcon(status) {
        const icons = {
            'base': '✅',
            'bonus': '⭐',
            'challenge': '🏆'
        };
        return icons[status] || '✅';
    }

    getSceneScore(status) {
        const scores = {
            'base': 70,
            'bonus': 100,
            'challenge': 150
        };
        return scores[status] || 0;
    }
}

// Initialize the roadmap when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.roadmap = new RoadmapApp();
});