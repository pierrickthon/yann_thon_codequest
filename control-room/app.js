/**
 * CodeQuest Control Room v1 - Application Logic
 */

class ControlRoom {
    constructor() {
        this.snapshots = [];
        this.students = [];
        this.scenes = ['N00', 'N01', 'N02', 'N03', 'N04', 'N05', 'N06'];
        
        // Plan B settings
        this.settings = {
            slowThreshold: 30,
            stuckThreshold: 45,
            unlockAllHints: false,
            markOptional: false,
            lowerPass: false,
            projectorMode: false
        };
        
        this.loadSettings();
        this.init();
    }

    init() {
        // Initialize file input
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.loadFiles(e.target.files);
        });
        
        // Initialize Plan B controls
        this.initPlanBControls();
    }
    
    initPlanBControls() {
        // Initialize slider values
        document.getElementById('slowThreshold').value = this.settings.slowThreshold;
        document.getElementById('stuckThreshold').value = this.settings.stuckThreshold;
        document.getElementById('slowValue').textContent = this.settings.slowThreshold;
        document.getElementById('stuckValue').textContent = this.settings.stuckThreshold;
        
        // Initialize toggle states
        document.getElementById('unlockAllHints').checked = this.settings.unlockAllHints;
        document.getElementById('markOptional').checked = this.settings.markOptional;
        document.getElementById('lowerPass').checked = this.settings.lowerPass;
        
        // Apply projector mode if enabled
        if (this.settings.projectorMode) {
            document.body.classList.add('projector-mode');
        }
    }
    
    loadSettings() {
        try {
            const saved = localStorage.getItem('codequest-control-settings');
            if (saved) {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('Could not load settings:', error);
        }
    }
    
    saveSettings() {
        try {
            localStorage.setItem('codequest-control-settings', JSON.stringify(this.settings));
            // Also save to file for persistence
            this.saveSettingsToFile();
        } catch (error) {
            console.warn('Could not save settings:', error);
        }
    }
    
    async saveSettingsToFile() {
        try {
            const response = await fetch('/api/save-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.settings)
            });
        } catch (error) {
            // Fallback: just use localStorage
            console.warn('File save failed, using localStorage only');
        }
    }

    async loadFiles(files) {
        this.snapshots = [];
        const loadedFiles = [];

        for (const file of files) {
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                data.fileName = file.name;
                this.snapshots.push(data);
                loadedFiles.push(file.name);
            } catch (error) {
                console.error(`Error loading ${file.name}:`, error);
            }
        }

        this.displayLoadedFiles(loadedFiles);
        this.processSnapshots();
    }

    displayLoadedFiles(files) {
        const container = document.getElementById('loaded-files');
        container.innerHTML = files.map(f => 
            `<span class="file-tag">📄 ${f}</span>`
        ).join('');
    }

    processSnapshots() {
        // Extract student data
        this.students = this.snapshots.map(snapshot => ({
            id: snapshot.studentId || snapshot.fileName.split('_')[0],
            progress: snapshot.scenes || {},
            currentScene: snapshot.currentScene,
            totalScore: snapshot.totalScore || 0,
            hintsUsed: snapshot.hintsUsed || {}
        }));

        this.updateStats();
        this.buildMatrix();
        this.buildHeatmap();
        this.generateAlerts();
    }

    updateStats() {
        // Total students
        document.getElementById('total-students').textContent = this.students.length;

        // Average progress
        const avgProgress = this.calculateAverageProgress();
        document.getElementById('avg-progress').textContent = `${avgProgress}%`;

        // Stuck and slow counts
        let stuckCount = 0;
        let slowCount = 0;

        this.students.forEach(student => {
            Object.values(student.progress).forEach(scene => {
                if (scene.timeSpent > this.settings.stuckThreshold) stuckCount++;
                else if (scene.timeSpent > this.settings.slowThreshold) slowCount++;
            });
        });

        document.getElementById('stuck-count').textContent = stuckCount;
        document.getElementById('slow-count').textContent = slowCount;
    }

    calculateAverageProgress() {
        if (this.students.length === 0) return 0;

        const progressPerStudent = this.students.map(student => {
            const completed = Object.values(student.progress)
                .filter(s => ['base', 'bonus', 'challenge'].includes(s.status)).length;
            return (completed / this.scenes.length) * 100;
        });

        return Math.round(progressPerStudent.reduce((a, b) => a + b, 0) / this.students.length);
    }

    buildMatrix() {
        const tbody = document.getElementById('matrixBody');
        tbody.innerHTML = '';

        if (this.students.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="empty-state">No data loaded</td></tr>';
            return;
        }

        this.students.forEach(student => {
            const row = document.createElement('tr');
            
            // Student name
            row.innerHTML = `<td><strong>${student.id}</strong></td>`;

            // Scene statuses
            this.scenes.forEach(sceneId => {
                const sceneKey = `${sceneId}-scene`;
                const sceneData = student.progress[sceneKey];
                
                let icon = '⬜';
                let className = 'status-todo';
                
                if (sceneData) {
                    if (sceneData.status === 'challenge') {
                        icon = '🏆';
                        className = 'status-ok';
                    } else if (sceneData.status === 'bonus') {
                        icon = '⭐';
                        className = 'status-ok';
                    } else if (sceneData.status === 'base') {
                        icon = '✅';
                        className = 'status-ok';
                    } else if (sceneData.timeSpent > 45) {
                        icon = '🔴';
                        className = 'status-stuck';
                    } else if (sceneData.timeSpent > 30) {
                        icon = '🟡';
                        className = 'status-slow';
                    } else {
                        icon = '🔵';
                        className = 'status-todo';
                    }
                }

                const cell = document.createElement('td');
                cell.innerHTML = `<span class="status-icon ${className}">${icon}</span>`;
                if (sceneData && sceneData.timeSpent) {
                    cell.title = `Time: ${sceneData.timeSpent} min`;
                }
                row.appendChild(cell);
            });

            // Progress bar
            const completed = Object.values(student.progress)
                .filter(s => ['base', 'bonus', 'challenge'].includes(s.status)).length;
            const progressPercent = Math.round((completed / this.scenes.length) * 100);
            
            const progressCell = document.createElement('td');
            progressCell.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <span style="margin-left: 10px;">${progressPercent}%</span>
            `;
            row.appendChild(progressCell);

            tbody.appendChild(row);
        });
    }

    buildHeatmap() {
        const container = document.getElementById('heatmapGrid');
        container.innerHTML = '';

        this.scenes.forEach(sceneId => {
            const sceneKey = `${sceneId}-scene`;
            const stuckRate = this.calculateStuckRate(sceneKey);
            
            let className = 'easy';
            if (stuckRate > 50) className = 'very-hard';
            else if (stuckRate > 30) className = 'hard';
            else if (stuckRate > 15) className = 'medium';

            const cell = document.createElement('div');
            cell.className = `heatmap-cell ${className}`;
            cell.innerHTML = `
                <div class="scene-label">${sceneId}</div>
                <div class="stuck-rate">${stuckRate}%</div>
                <div style="font-size: 0.8rem;">stuck rate</div>
            `;
            cell.title = `${sceneId}: ${stuckRate}% of students stuck`;
            
            container.appendChild(cell);
        });
    }

    calculateStuckRate(sceneKey) {
        if (this.students.length === 0) return 0;

        const stuckCount = this.students.filter(student => {
            const scene = student.progress[sceneKey];
            return scene && scene.timeSpent > 45 && !['base', 'bonus', 'challenge'].includes(scene.status);
        }).length;

        return Math.round((stuckCount / this.students.length) * 100);
    }

    generateAlerts() {
        const container = document.getElementById('alertsContainer');
        const alerts = [];

        this.students.forEach(student => {
            Object.entries(student.progress).forEach(([sceneKey, sceneData]) => {
                if (sceneData.timeSpent > 45 && !['base', 'bonus', 'challenge'].includes(sceneData.status)) {
                    alerts.push({
                        student: student.id,
                        scene: sceneKey.replace('-scene', ''),
                        time: sceneData.timeSpent,
                        attempts: sceneData.attempts || 0
                    });
                }
            });
        });

        if (alerts.length === 0) {
            container.innerHTML = '<div class="empty-state">No alerts at this time.</div>';
            return;
        }

        // Sort by time (longest first)
        alerts.sort((a, b) => b.time - a.time);

        container.innerHTML = alerts.map(alert => `
            <div class="alert-item">
                <div class="alert-info">
                    <div class="alert-student">${alert.student}</div>
                    <div class="alert-details">
                        Stuck on ${alert.scene} • ${alert.attempts} attempts
                    </div>
                </div>
                <div class="alert-time">${alert.time} min</div>
            </div>
        `).join('');
    }
}

// Global functions
function loadSnapshots() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        window.controlRoom.loadFiles(fileInput.files);
    }
}

function loadDemoData() {
    // Create demo snapshots
    const demoData = [
        {
            studentId: 'alice',
            scenes: {
                'N00-scene': { status: 'challenge', timeSpent: 25, attempts: 2 },
                'N01-scene': { status: 'bonus', timeSpent: 35, attempts: 3 },
                'N02-scene': { status: 'started', timeSpent: 48, attempts: 5 }
            }
        },
        {
            studentId: 'bob',
            scenes: {
                'N00-scene': { status: 'base', timeSpent: 30, attempts: 3 },
                'N01-scene': { status: 'started', timeSpent: 52, attempts: 6 }
            }
        },
        {
            studentId: 'charlie',
            scenes: {
                'N00-scene': { status: 'bonus', timeSpent: 20, attempts: 1 },
                'N01-scene': { status: 'base', timeSpent: 28, attempts: 2 },
                'N02-scene': { status: 'base', timeSpent: 33, attempts: 3 }
            }
        }
    ];

    window.controlRoom.snapshots = demoData;
    window.controlRoom.displayLoadedFiles(['demo_alice.json', 'demo_bob.json', 'demo_charlie.json']);
    window.controlRoom.processSnapshots();
}

function reloadSnapshots() {
    if (window.controlRoom.snapshots.length > 0) {
        window.controlRoom.processSnapshots();
    }
}

function exportCSV() {
    if (!window.controlRoom || window.controlRoom.students.length === 0) {
        alert('No data to export');
        return;
    }

    let csv = 'Student,' + window.controlRoom.scenes.join(',') + ',Progress\n';
    
    window.controlRoom.students.forEach(student => {
        const row = [student.id];
        
        window.controlRoom.scenes.forEach(sceneId => {
            const sceneKey = `${sceneId}-scene`;
            const sceneData = student.progress[sceneKey];
            row.push(sceneData ? sceneData.status || 'started' : 'todo');
        });

        const completed = Object.values(student.progress)
            .filter(s => ['base', 'bonus', 'challenge'].includes(s.status)).length;
        const progressPercent = Math.round((completed / window.controlRoom.scenes.length) * 100);
        row.push(`${progressPercent}%`);

        csv += row.join(',') + '\n';
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codequest_progress_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function filterByTeam() {
    alert('Team filtering will be available in v2');
}

function refreshView() {
    if (window.controlRoom && window.controlRoom.snapshots.length > 0) {
        window.controlRoom.processSnapshots();
    }
}

// Plan B Functions
function updateThreshold(type, value) {
    if (!window.controlRoom) return;
    
    window.controlRoom.settings[type + 'Threshold'] = parseInt(value);
    document.getElementById(type + 'Value').textContent = value;
    
    // Update stats display
    if (window.controlRoom.students.length > 0) {
        window.controlRoom.updateStats();
        window.controlRoom.generateAlerts();
    }
    
    window.controlRoom.saveSettings();
}

function toggleEmergencyMode(type, enabled) {
    if (!window.controlRoom) return;
    
    switch (type) {
        case 'hints':
            window.controlRoom.settings.unlockAllHints = enabled;
            // Send signal to unlock hints globally
            showNotification(enabled ? 'All hints unlocked!' : 'Hints locked');
            break;
        case 'optional':
            window.controlRoom.settings.markOptional = enabled;
            showNotification(enabled ? 'N08-N10 marked optional' : 'All scenes required');
            break;
        case 'lowerpass':
            window.controlRoom.settings.lowerPass = enabled;
            showNotification(enabled ? 'Boss pass lowered to 3/5' : 'Boss pass reset to 5/5');
            break;
    }
    
    window.controlRoom.saveSettings();
}

function generateClassSnapshots() {
    if (!window.controlRoom) return;
    
    // Generate synthetic snapshots for a full class
    const classSize = 25;
    const profiles = ['strong', 'average', 'beginner', 'fast', 'methodical'];
    const syntheticSnapshots = [];
    
    for (let i = 1; i <= classSize; i++) {
        const profile = profiles[i % profiles.length];
        const snapshot = {
            studentId: `student-${i.toString().padStart(2, '0')}`,
            profile,
            scenes: {},
            startedAt: new Date(Date.now() - Math.random() * 3600000).toISOString()
        };
        
        // Generate progress based on profile
        const maxScenes = profile === 'beginner' ? 2 : profile === 'average' ? 4 : 7;
        for (let j = 0; j < maxScenes; j++) {
            const sceneKey = `N0${j}-scene`;
            const baseTime = [5, 10, 15, 12, 20, 15, 25][j];
            const multiplier = profile === 'fast' ? 0.7 : profile === 'beginner' ? 1.8 : 1.0;
            
            snapshot.scenes[sceneKey] = {
                status: Math.random() > 0.7 ? 'bonus' : 'base',
                timeSpent: Math.round(baseTime * multiplier * (0.8 + Math.random() * 0.4)),
                attempts: Math.floor(Math.random() * 5) + 1
            };
        }
        
        syntheticSnapshots.push(snapshot);
    }
    
    window.controlRoom.snapshots = syntheticSnapshots;
    window.controlRoom.displayLoadedFiles([`Generated ${classSize} synthetic students`]);
    window.controlRoom.processSnapshots();
    
    showNotification(`Generated ${classSize} synthetic student snapshots`);
}

function exportEnrichedCSV() {
    if (!window.controlRoom || window.controlRoom.students.length === 0) {
        alert('No data to export');
        return;
    }

    let csv = 'Student,Scene,Status,Time,Attempts,Slow Reason,Stuck Reason,Hints Used\n';
    
    window.controlRoom.students.forEach(student => {
        window.controlRoom.scenes.forEach(sceneId => {
            const sceneKey = `${sceneId}-scene`;
            const sceneData = student.progress[sceneKey];
            
            if (sceneData) {
                const isStuck = sceneData.timeSpent > window.controlRoom.settings.stuckThreshold;
                const isSlow = sceneData.timeSpent > window.controlRoom.settings.slowThreshold;
                
                let slowReason = '';
                let stuckReason = '';
                
                if (isSlow || isStuck) {
                    // Analyze why student is slow/stuck
                    if (sceneData.attempts > 5) {
                        slowReason = 'Multiple failed attempts';
                        stuckReason = isStuck ? 'Excessive retries' : '';
                    } else if (sceneData.timeSpent > 60) {
                        stuckReason = 'Very high time';
                    } else if (isSlow) {
                        slowReason = 'Above average time';
                    }
                }
                
                csv += [
                    student.id,
                    sceneId,
                    sceneData.status,
                    sceneData.timeSpent,
                    sceneData.attempts || 0,
                    slowReason,
                    stuckReason,
                    student.hintsUsed[sceneKey] || 0
                ].join(',') + '\n';
            } else {
                csv += `${student.id},${sceneId},not_started,0,0,,,0\n`;
            }
        });
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codequest_enriched_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function toggleProjectorMode() {
    if (!window.controlRoom) return;
    
    window.controlRoom.settings.projectorMode = !window.controlRoom.settings.projectorMode;
    
    if (window.controlRoom.settings.projectorMode) {
        document.body.classList.add('projector-mode');
        showNotification('Projector mode enabled - Large fonts & high contrast');
    } else {
        document.body.classList.remove('projector-mode');
        showNotification('Projector mode disabled');
    }
    
    window.controlRoom.saveSettings();
}

function showTeamFilter() {
    const teams = prompt('Enter team filter (comma separated, e.g., team1,team2):');
    if (teams) {
        // TODO: Implement team filtering
        showNotification(`Team filter set: ${teams}`);
    }
}

function showNotification(message) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 600;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    window.controlRoom = new ControlRoom();
});