#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Simple Static Server
 * Serves control-room files and provides API access
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');
const CONTROL_ROOM_DIR = path.join(ROOT_DIR, 'control-room');
const STUDENT_WORKSPACE_DIR = path.join(ROOT_DIR, 'student-workspace');
const LEVELS_DIR = path.join(ROOT_DIR, 'levels');
const PROGRESS_DROPS_DIR = path.join(ROOT_DIR, '.progress-drops');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

class StaticServer {
    start() {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(PORT, () => {
            console.log(`
╔══════════════════════════════════════════════════════╗
║         🎮 CodeQuest 2.3 Control Room                 ║
╠══════════════════════════════════════════════════════╣
║                                                        ║
║  Student Roadmap:  http://localhost:${PORT}/roadmap      ║
║  Instructor View:  http://localhost:${PORT}/              ║
║                                                        ║
║  Press Ctrl+C to stop the server                      ║
╚══════════════════════════════════════════════════════╝
            `);
        });
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        let pathname = parsedUrl.pathname;

        // Enable CORS for local development
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Handle OPTIONS for CORS
        if (req.method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        // Route handlers
        if (pathname === '/') {
            // Serve instructor control room
            this.serveFile(path.join(CONTROL_ROOM_DIR, 'index.html'), res);
        } else if (pathname === '/roadmap') {
            // Serve student roadmap
            this.serveFile(path.join(CONTROL_ROOM_DIR, 'roadmap.html'), res);
        } else if (pathname.startsWith('/control-room/')) {
            // Serve control room assets
            const file = pathname.replace('/control-room/', '');
            this.serveFile(path.join(CONTROL_ROOM_DIR, file), res);
        } else if (pathname.startsWith('/student-workspace/')) {
            // Serve student workspace files (for roadmap to read progress.json)
            const file = pathname.replace('/student-workspace/', '');
            this.serveFile(path.join(STUDENT_WORKSPACE_DIR, file), res);
        } else if (pathname.startsWith('/levels/')) {
            // Serve level manifests and criteria
            const file = pathname.replace('/levels/', '');
            this.serveFile(path.join(LEVELS_DIR, file), res);
        } else if (pathname.startsWith('/.progress-drops/')) {
            // Serve progress snapshots
            const file = pathname.replace('/.progress-drops/', '');
            this.serveFile(path.join(PROGRESS_DROPS_DIR, file), res);
        } else if (pathname.startsWith('/api/')) {
            // API endpoints (future expansion)
            this.handleAPI(pathname, parsedUrl.query, res);
        } else {
            // Try to serve from control-room directory
            this.serveFile(path.join(CONTROL_ROOM_DIR, pathname.substring(1)), res);
        }
    }

    serveFile(filePath, res) {
        // Security: prevent directory traversal
        const normalizedPath = path.normalize(filePath);
        if (!normalizedPath.startsWith(ROOT_DIR)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('Forbidden');
            return;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                }
                return;
            }

            const ext = path.extname(filePath);
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }

    handleAPI(pathname, query, res) {
        res.setHeader('Content-Type', 'application/json');

        switch (pathname) {
            case '/api/progress':
                // Return current student progress
                const progressPath = path.join(STUDENT_WORKSPACE_DIR, 'progress.json');
                fs.readFile(progressPath, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(404);
                        res.end(JSON.stringify({ error: 'Progress not found' }));
                    } else {
                        res.writeHead(200);
                        res.end(data);
                    }
                });
                break;

            case '/api/snapshots':
                // List available snapshots
                fs.readdir(PROGRESS_DROPS_DIR, (err, files) => {
                    if (err) {
                        res.writeHead(200);
                        res.end(JSON.stringify([]));
                    } else {
                        const jsonFiles = files.filter(f => f.endsWith('.json'));
                        res.writeHead(200);
                        res.end(JSON.stringify(jsonFiles));
                    }
                });
                break;

            default:
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'API endpoint not found' }));
        }
    }
}

// Start server if run directly
if (require.main === module) {
    const server = new StaticServer();
    server.start();
}

module.exports = StaticServer;