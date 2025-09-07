/**
 * CodeQuest Game-like Roadmap Map - Dynamic component for visual roadmap
 * @file roadmap-map.js
 */

class RoadmapMap {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            dataSource: 'student-workspace/progress.json',
            enableAnimations: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            enableTooltips: true,
            enableConfetti: true,
            ...options
        };
        
        this.progressData = null;
        this.actData = null;
        this.nodes = [];
        this.svgTrack = null;
        this.currentView = 'map'; // 'map' or 'grid'
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadProgressData();
            this.setupMapStructure();
            this.setupNodes();
            this.setupTrack();
            this.setupEventListeners();
            this.updateDisplay();
        } catch (error) {
            console.warn('Failed to initialize roadmap map, falling back to grid view:', error);
            this.fallbackToGrid();
        }
    }
    
    async loadProgressData() {
        try {
            // Try to load from student workspace first (offline-first)
            const response = await fetch('/student-workspace/progress.json');
            if (response.ok) {
                this.progressData = await response.json();
            } else {
                // Fallback to mock data for development
                this.progressData = this.generateMockProgress();
            }
            
            // Load act manifest
            const actResponse = await fetch('/levels/act-1/manifest.json');
            if (actResponse.ok) {
                this.actData = await actResponse.json();
            }
        } catch (error) {
            console.warn('Using mock progress data:', error);
            this.progressData = this.generateMockProgress();
        }
    }
    
    generateMockProgress() {
        return {
            currentAct: 1,
            currentScene: 'N02-arrays-objects',
            completedScenes: ['N00-intro', 'N01-functions'],
            stats: {
                totalScore: 1250,
                completionRate: 28.6,
                streak: 3,
                level: 2
            },
            sceneDetails: {
                'N00-intro': { completed: true, score: 650, attempts: 1, perfect: true },
                'N01-functions': { completed: true, score: 600, attempts: 2, perfect: false },
                'N02-arrays-objects': { completed: false, unlocked: true }
            }
        };
    }
    
    setupMapStructure() {
        this.container.innerHTML = `
            <div class="roadmap-map">
                <svg class="roadmap-svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
                    ${this.getSVGContent()}
                </svg>
                <div class="game-nodes" id="game-nodes"></div>
                <button class="view-toggle" id="view-toggle" aria-label="Toggle between map and grid view">
                    🗺️ Map View
                </button>
            </div>
        `;
        
        this.svgElement = this.container.querySelector('.roadmap-svg');
        this.nodesContainer = this.container.querySelector('#game-nodes');
        this.viewToggle = this.container.querySelector('#view-toggle');
    }
    
    getSVGContent() {
        return `
            <defs>
                <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#87ceeb;stop-opacity:1" />
                    <stop offset="70%" style="stop-color:#98fb98;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8fbc8f;stop-opacity:1" />
                </linearGradient>
                <pattern id="clouds" patternUnits="userSpaceOnUse" width="120" height="80">
                    <ellipse cx="30" cy="40" rx="25" ry="15" fill="white" opacity="0.4"/>
                    <ellipse cx="90" cy="35" rx="20" ry="12" fill="white" opacity="0.3"/>
                </pattern>
                <radialGradient id="treeGradient" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#32cd32;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#228b22;stop-opacity:1" />
                </radialGradient>
                <filter id="trackShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
                </filter>
                <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.2"/>
                </filter>
            </defs>
            
            <rect x="0" y="0" width="1200" height="600" fill="url(#skyGradient)"/>
            <rect x="0" y="0" width="1200" height="400" fill="url(#clouds)"/>
            
            <g class="decorations" opacity="0.8">
                <ellipse cx="120" cy="480" rx="30" ry="45" fill="url(#treeGradient)"/>
                <rect x="115" y="505" width="10" height="40" fill="#8b4513"/>
                <ellipse cx="320" cy="450" rx="35" ry="50" fill="url(#treeGradient)"/>
                <rect x="315" y="480" width="10" height="45" fill="#8b4513"/>
                <ellipse cx="580" cy="470" rx="28" ry="40" fill="url(#treeGradient)"/>
                <rect x="575" y="495" width="10" height="35" fill="#8b4513"/>
                <ellipse cx="880" cy="460" rx="32" ry="48" fill="url(#treeGradient)"/>
                <rect x="875" y="490" width="10" height="42" fill="#8b4513"/>
                <ellipse cx="1080" cy="475" rx="30" ry="45" fill="url(#treeGradient)"/>
                <rect x="1075" y="500" width="10" height="38" fill="#8b4513"/>
                <polygon points="0,400 150,250 300,400" fill="#9370db" opacity="0.3"/>
                <polygon points="200,400 400,180 600,400" fill="#9370db" opacity="0.25"/>
                <polygon points="500,400 750,200 1000,400" fill="#9370db" opacity="0.3"/>
                <polygon points="900,400 1100,220 1200,400" fill="#9370db" opacity="0.25"/>
                <ellipse cx="200" cy="520" rx="40" ry="15" fill="#90ee90" opacity="0.6"/>
                <ellipse cx="450" cy="540" rx="35" ry="12" fill="#90ee90" opacity="0.6"/>
                <ellipse cx="750" cy="530" rx="45" ry="18" fill="#90ee90" opacity="0.6"/>
                <ellipse cx="1000" cy="545" rx="38" ry="14" fill="#90ee90" opacity="0.6"/>
            </g>
            
            <path id="track-background" 
                  d="M 100 420 Q 200 450, 280 400 Q 380 340, 480 370 Q 580 400, 680 350 Q 780 300, 880 330 Q 980 360, 1080 310 Q 1140 280, 1100 340"
                  stroke="var(--cq-track-pending)" stroke-width="24" fill="none" stroke-linecap="round" filter="url(#trackShadow)"/>
            <path id="track-progress" 
                  d="M 100 420 Q 200 450, 280 400 Q 380 340, 480 370 Q 580 400, 680 350 Q 780 300, 880 330 Q 980 360, 1080 310 Q 1140 280, 1100 340"
                  stroke="var(--cq-track-completed)" stroke-width="24" fill="none" stroke-linecap="round" style="stroke-dasharray: 0 1000"/>
            
            <g class="path-decorations" opacity="0.6">
                <circle cx="150" cy="435" r="3" fill="#ff69b4"/>
                <circle cx="155" cy="430" r="2" fill="#ffc0cb"/>
                <circle cx="350" cy="365" r="3" fill="#ff69b4"/>
                <circle cx="345" cy="370" r="2" fill="#ffc0cb"/>
                <circle cx="550" cy="385" r="3" fill="#ff69b4"/>
                <circle cx="545" cy="380" r="2" fill="#ffc0cb"/>
                <circle cx="750" cy="325" r="3" fill="#ff69b4"/>
                <circle cx="755" cy="330" r="2" fill="#ffc0cb"/>
                <circle cx="950" cy="345" r="3" fill="#ff69b4"/>
                <circle cx="955" cy="350" r="2" fill="#ffc0cb"/>
                <ellipse cx="220" cy="425" rx="4" ry="3" fill="#696969"/>
                <ellipse cx="420" cy="390" rx="5" ry="4" fill="#696969"/>
                <ellipse cx="620" cy="365" rx="4" ry="3" fill="#696969"/>
                <ellipse cx="820" cy="345" rx="5" ry="4" fill="#696969"/>
            </g>
            
            <g class="sun" transform="translate(1050, 80)">
                <circle cx="0" cy="0" r="35" fill="#ffd700" opacity="0.8"/>
                <g stroke="#ffd700" stroke-width="3" opacity="0.6">
                    <line x1="-50" y1="0" x2="-40" y2="0"/>
                    <line x1="40" y1="0" x2="50" y2="0"/>
                    <line x1="0" y1="-50" x2="0" y2="-40"/>
                    <line x1="0" y1="40" x2="0" y2="50"/>
                    <line x1="-35" y1="-35" x2="-28" y2="-28"/>
                    <line x1="28" y1="28" x2="35" y2="35"/>
                    <line x1="35" y1="-35" x2="28" y2="-28"/>
                    <line x1="-28" y1="28" x2="-35" y2="35"/>
                </g>
            </g>
        `;
    }
    
    setupNodes() {
        const nodePositions = [
            { id: 'N00-intro', x: 100, y: 420, title: 'JavaScript Fundamentals', description: 'Variables, functions, control flow' },
            { id: 'N01-functions', x: 280, y: 400, title: 'Functions & Scope', description: 'Closures, higher-order functions' },
            { id: 'N02-arrays-objects', x: 480, y: 370, title: 'Arrays & Objects', description: 'Data manipulation, functional programming' },
            { id: 'N03-async', x: 680, y: 350, title: 'Async Programming', description: 'Promises, async/await, concurrency' },
            { id: 'N04-error-handling', x: 880, y: 330, title: 'Error Handling', description: 'try/catch, custom errors, resilience' },
            { id: 'N05-testing', x: 1080, y: 310, title: 'Testing Fundamentals', description: 'Assertions, test frameworks' },
            { id: 'N06-tdd', x: 1150, y: 320, title: 'TDD Methodology', description: 'Red-Green-Refactor cycle' }
        ];
        
        this.nodes = nodePositions.map((node, index) => {
            const nodeElement = this.createNodeElement(node, index);
            this.nodesContainer.appendChild(nodeElement);
            return { ...node, element: nodeElement };
        });
    }
    
    createNodeElement(node, index) {
        const nodeState = this.getNodeState(node.id);
        const nodeDiv = document.createElement('div');
        nodeDiv.className = `game-node ${nodeState}`;
        nodeDiv.style.left = `${(node.x / 1200) * 100}%`;
        nodeDiv.style.top = `${(node.y / 600) * 100}%`;
        nodeDiv.setAttribute('data-scene', node.id);
        nodeDiv.setAttribute('role', 'button');
        nodeDiv.setAttribute('tabindex', nodeState === 'locked' ? '-1' : '0');
        nodeDiv.setAttribute('aria-label', `${node.title} - ${nodeState}`);
        
        const sceneDetails = this.progressData?.sceneDetails?.[node.id];
        const nodeNumber = String(index + 1).padStart(2, '0');
        
        nodeDiv.innerHTML = `
            <div class="node-circle">
                ${nodeState === 'current' ? '<div class="node-pulse"></div>' : ''}
                ${nodeState === 'completed' ? '<div class="node-check">' + this.getCheckmarkSVG() + '</div>' : ''}
                ${nodeState === 'locked' ? '<div class="node-lock">' + this.getLockSVG() + '</div>' : ''}
                <span class="node-number">${nodeNumber}</span>
                ${sceneDetails?.perfect ? '<div class="node-trophy">🏆</div>' : ''}
            </div>
            ${this.options.enableTooltips ? this.createTooltip(node, sceneDetails) : ''}
        `;
        
        if (nodeState !== 'locked') {
            nodeDiv.addEventListener('click', () => this.handleNodeClick(node));
            nodeDiv.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleNodeClick(node);
                }
            });
        }
        
        return nodeDiv;
    }
    
    createTooltip(node, sceneDetails) {
        const attempts = sceneDetails?.attempts || 0;
        const score = sceneDetails?.score || 0;
        
        return `
            <div class="node-tooltip">
                <div class="tooltip-title">${node.title}</div>
                <div class="tooltip-description">${node.description}</div>
                <div class="tooltip-stats">
                    <span class="tooltip-time">${attempts > 0 ? `${attempts} attempt${attempts > 1 ? 's' : ''}` : 'Ready to start'}</span>
                    ${score > 0 ? `<span class="tooltip-score">⭐ ${score}</span>` : ''}
                </div>
            </div>
        `;
    }
    
    getNodeState(sceneId) {
        const completedScenes = this.progressData?.completedScenes || [];
        const currentScene = this.progressData?.currentScene;
        
        if (completedScenes.includes(sceneId)) {
            return 'completed';
        } else if (currentScene === sceneId) {
            return 'current';
        } else {
            // Simple unlock logic: scene is unlocked if previous scene is completed or it's the first scene
            const sceneOrder = ['N00-intro', 'N01-functions', 'N02-arrays-objects', 'N03-async', 'N04-error-handling', 'N05-testing', 'N06-tdd'];
            const sceneIndex = sceneOrder.indexOf(sceneId);
            const prevSceneId = sceneOrder[sceneIndex - 1];
            
            if (sceneIndex === 0 || completedScenes.includes(prevSceneId)) {
                return 'unlocked';
            }
            return 'locked';
        }
    }
    
    setupTrack() {
        const trackProgress = this.container.querySelector('#track-progress');
        if (!trackProgress) return;
        
        const completedScenes = this.progressData?.completedScenes || [];
        const totalScenes = 7;
        const progressPercentage = (completedScenes.length / totalScenes) * 100;
        
        // Animate track progress
        const pathLength = trackProgress.getTotalLength ? trackProgress.getTotalLength() : 1000;
        const dashArray = `${(progressPercentage / 100) * pathLength} ${pathLength}`;
        
        if (this.options.enableAnimations) {
            trackProgress.style.strokeDasharray = '0 1000';
            setTimeout(() => {
                trackProgress.style.strokeDasharray = dashArray;
            }, 500);
        } else {
            trackProgress.style.strokeDasharray = dashArray;
        }
    }
    
    setupEventListeners() {
        this.viewToggle?.addEventListener('click', () => this.toggleView());
        
        // Keyboard navigation
        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                this.handleArrowNavigation(e.key === 'ArrowRight' ? 1 : -1);
                e.preventDefault();
            }
        });
        
        // Resize handler for responsive behavior
        window.addEventListener('resize', this.debounce(() => this.updateDisplay(), 250));
    }
    
    handleNodeClick(node) {
        const nodeState = this.getNodeState(node.id);
        
        if (nodeState === 'locked') return;
        
        // Trigger confetti for completed nodes
        if (nodeState === 'completed' && this.options.enableConfetti) {
            this.triggerConfetti();
        }
        
        // Dispatch custom event for parent application to handle
        this.container.dispatchEvent(new CustomEvent('nodeClick', {
            detail: { sceneId: node.id, nodeState, node }
        }));
        
        console.log(`Navigate to scene: ${node.id} (${nodeState})`);
    }
    
    handleArrowNavigation(direction) {
        const currentFocus = document.activeElement;
        const focusableNodes = Array.from(this.nodesContainer.querySelectorAll('.game-node[tabindex="0"]'));
        const currentIndex = focusableNodes.indexOf(currentFocus);
        
        if (currentIndex >= 0) {
            const nextIndex = currentIndex + direction;
            if (nextIndex >= 0 && nextIndex < focusableNodes.length) {
                focusableNodes[nextIndex].focus();
            }
        } else if (focusableNodes.length > 0) {
            focusableNodes[0].focus();
        }
    }
    
    toggleView() {
        if (this.currentView === 'map') {
            this.switchToGridView();
        } else {
            this.switchToMapView();
        }
    }
    
    switchToGridView() {
        this.currentView = 'grid';
        this.viewToggle.innerHTML = '🗺️ Map View';
        this.container.classList.add('grid-view');
        
        // Fallback to original roadmap display
        this.fallbackToGrid();
    }
    
    switchToMapView() {
        this.currentView = 'map';
        this.viewToggle.innerHTML = '📋 Grid View';
        this.container.classList.remove('grid-view');
        this.updateDisplay();
    }
    
    triggerConfetti() {
        if (!this.options.enableConfetti) return;
        
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = `confetti ${Math.random() > 0.5 ? 'circle' : 'square'}`;
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 20);
        }
    }
    
    updateDisplay() {
        // Update stats if available
        if (this.progressData?.stats) {
            this.updateStats(this.progressData.stats);
        }
        
        // Update node states
        this.nodes.forEach(node => {
            const newState = this.getNodeState(node.id);
            node.element.className = `game-node ${newState}`;
            node.element.setAttribute('aria-label', `${node.element.querySelector('.tooltip-title')?.textContent || node.title} - ${newState}`);
        });
        
        this.setupTrack();
    }
    
    updateStats(stats) {
        // Update external stats display if available
        document.getElementById('total-score')?.textContent = stats.totalScore || 0;
        document.getElementById('completion-rate')?.textContent = `${Math.round(stats.completionRate || 0)}%`;
        document.getElementById('streak-count')?.textContent = stats.streak || 0;
        document.getElementById('player-level')?.textContent = `Lv.${stats.level || 1}`;
        
        const progressFill = document.getElementById('overall-progress');
        if (progressFill) {
            progressFill.style.width = `${stats.completionRate || 0}%`;
        }
        
        const progressText = document.getElementById('progress-text');
        if (progressText) {
            const completed = this.progressData?.completedScenes?.length || 0;
            progressText.textContent = `${completed}/7 Scenes Complete`;
        }
    }
    
    fallbackToGrid() {
        // Fallback implementation - show simple message
        this.container.innerHTML = `
            <div style="padding: 40px; text-align: center; background: var(--cq-gray-light); border-radius: 12px; margin: 20px;">
                <h3>Roadmap Map Unavailable</h3>
                <p>Falling back to grid view. Please refresh to try the visual map again.</p>
                <button onclick="location.reload()" style="margin-top: 16px; padding: 8px 16px; background: var(--cq-node-current); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    🔄 Retry Map View
                </button>
            </div>
        `;
    }
    
    // Helper methods
    getCheckmarkSVG() {
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
    }
    
    getLockSVG() {
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Export for module usage or global usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RoadmapMap;
} else {
    window.RoadmapMap = RoadmapMap;
}