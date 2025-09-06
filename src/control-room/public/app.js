/**
 * CodeQuest Control Room Frontend
 * Stack-agnostic JavaScript for the control room interface
 */

class ControlRoomApp {
    constructor() {
        this.apiBase = '/api';
        this.refreshInterval = 30000; // 30 seconds
        this.refreshTimer = null;
        
        this.init();
    }

    init() {
        console.log('🎮 CodeQuest Control Room initialized');
        
        // Load initial data
        this.loadAllData();
        
        // Start auto-refresh
        this.startAutoRefresh();
        
        // Handle visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoRefresh();
            } else {
                this.startAutoRefresh();
                this.loadAllData();
            }
        });
    }

    async loadAllData() {
        try {
            await Promise.all([
                this.loadStats(),
                this.loadProgress(),
                this.loadHelpRequests()
            ]);
            
            this.updateConnectionStatus(true);
        } catch (error) {
            console.error('Error loading data:', error);
            this.updateConnectionStatus(false);
        }
    }

    async loadStats() {
        try {
            const response = await fetch(`${this.apiBase}/stats`);
            const stats = await response.json();
            
            this.updateStatsUI(stats);
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }

    async loadProgress() {
        try {
            const response = await fetch(`${this.apiBase}/progress`);
            const progress = await response.json();
            
            this.updateProgressUI(progress);
        } catch (error) {
            console.error('Error loading progress:', error);
        }
    }

    async loadHelpRequests() {
        try {
            const response = await fetch(`${this.apiBase}/help-requests`);
            const helpRequests = await response.json();
            
            this.updateHelpRequestsUI(helpRequests);
        } catch (error) {
            console.error('Error loading help requests:', error);
        }
    }

    updateStatsUI(stats) {
        document.getElementById('progress-percentage').textContent = `${stats.progressPercentage}%`;
        document.getElementById('completed-scenes').textContent = `${stats.completedScenes}/${stats.totalScenes}`;
        document.getElementById('help-requests').textContent = stats.helpRequestCount;
        
        const lastUpdate = new Date(stats.timestamp);
        document.getElementById('last-update').textContent = lastUpdate.toLocaleTimeString();
    }

    updateProgressUI(progress) {
        const progressList = document.getElementById('progress-list');
        
        if (!progress.scenes || Object.keys(progress.scenes).length === 0) {
            progressList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📚</div>
                    <p>No progress data available</p>
                    <small>Complete some scenes to see progress here</small>
                </div>
            `;
            return;
        }

        const scenes = Object.entries(progress.scenes)
            .sort(([a], [b]) => a.localeCompare(b));

        progressList.innerHTML = scenes.map(([sceneId, sceneData]) => `
            <div class="progress-item">
                <div class="scene-info">
                    <div class="scene-id">${sceneId}</div>
                    <div class="scene-status">
                        Attempts: ${sceneData.attempts || 0} | 
                        Last: ${new Date(sceneData.lastValidation).toLocaleString()}
                    </div>
                </div>
                <span class="status-badge status-${sceneData.status}">
                    ${sceneData.status.toUpperCase()}
                </span>
            </div>
        `).join('');
    }

    updateHelpRequestsUI(helpRequests) {
        const helpList = document.getElementById('help-list');
        
        if (!helpRequests || helpRequests.length === 0) {
            helpList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🆘</div>
                    <p>No recent help requests</p>
                    <small>Help requests will appear here when students ask for assistance</small>
                </div>
            `;
            return;
        }

        helpList.innerHTML = helpRequests.map(request => `
            <div class="help-item">
                <div class="help-header">
                    <span class="help-scene">🎯 ${request.sceneId}</span>
                    <span class="help-time">${new Date(request.timestamp).toLocaleString()}</span>
                </div>
                <div class="help-details">
                    Platform: ${request.environment.platform} | 
                    Node: ${request.environment.node} | 
                    Working Dir: ${this.truncatePath(request.environment.cwd)}
                </div>
                ${request.gitStatus ? `
                    <div class="help-git-status">
                        <small>Git Status: ${request.gitStatus.split('\\n').length - 1} changes</small>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    truncatePath(path, maxLength = 50) {
        if (path.length <= maxLength) return path;
        return '...' + path.slice(-(maxLength - 3));
    }

    updateConnectionStatus(connected) {
        const statusEl = document.getElementById('connection-status');
        if (connected) {
            statusEl.textContent = '🟢 Connected';
            statusEl.style.color = '#48bb78';
        } else {
            statusEl.textContent = '🔴 Connection Lost';
            statusEl.style.color = '#e53e3e';
        }
    }

    startAutoRefresh() {
        this.stopAutoRefresh();
        this.refreshTimer = setInterval(() => {
            this.loadAllData();
        }, this.refreshInterval);
    }

    stopAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }
}

// Global functions for UI actions
function refreshData() {
    console.log('🔄 Manual refresh triggered');
    if (window.controlRoom) {
        window.controlRoom.loadAllData();
    }
}

function openTerminal() {
    console.log('💻 Terminal action - would open terminal or command palette');
    alert('Terminal integration: Open your terminal and run "cq validate" or "cq help-me <scene-id>"');
}

function viewLogs() {
    console.log('📋 View logs action');
    const logsWindow = window.open('', '_blank', 'width=800,height=600');
    logsWindow.document.write(`
        <html>
            <head><title>CodeQuest Logs</title></head>
            <body>
                <h1>CodeQuest System Logs</h1>
                <pre id="logs">Loading logs...</pre>
                <script>
                    document.getElementById('logs').textContent = 
                        'Log integration: Connect to your preferred logging system\\n' +
                        'Suggested: tail -f data/logs/codequest.log\\n' +
                        'Or implement custom logging as needed';
                </script>
            </body>
        </html>
    `);
}

function exportData() {
    console.log('📤 Export data action');
    
    // Simple data export
    Promise.all([
        fetch('/api/progress').then(r => r.json()),
        fetch('/api/help-requests').then(r => r.json()),
        fetch('/api/stats').then(r => r.json())
    ]).then(([progress, helpRequests, stats]) => {
        const exportData = {
            timestamp: new Date().toISOString(),
            progress,
            helpRequests,
            stats
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `codequest-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('📤 Data exported successfully');
    }).catch(error => {
        console.error('Export failed:', error);
        alert('Export failed: ' + error.message);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.controlRoom = new ControlRoomApp();
});