#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

/**
 * Simple static file server for CodeQuest control room
 * Stack-agnostic, no external dependencies
 */
class ControlRoomServer {
  constructor(port = 3000) {
    this.port = port;
    this.publicDir = path.join(__dirname, 'public');
    this.dataDir = path.join(process.cwd(), 'data');
  }

  start() {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(this.port, () => {
      console.log(`🎮 CodeQuest Control Room running at http://localhost:${this.port}`);
      console.log('📊 View progress, help requests, and team activity');
    });
  }

  handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // API routes
    if (pathname.startsWith('/api/')) {
      this.handleApiRequest(pathname, parsedUrl.query, res);
      return;
    }

    // Static files
    if (pathname === '/') {
      this.serveFile('index.html', res);
    } else {
      this.serveFile(pathname.substring(1), res);
    }
  }

  handleApiRequest(pathname, query, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
      switch (pathname) {
        case '/api/progress':
          this.serveProgress(res);
          break;
        case '/api/help-requests':
          this.serveHelpRequests(res);
          break;
        case '/api/stats':
          this.serveStats(res);
          break;
        default:
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'API endpoint not found' }));
      }
    } catch (error) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: error.message }));
    }
  }

  serveProgress(res) {
    const progressFile = path.join(this.dataDir, 'progress', 'user-progress.json');
    if (fs.existsSync(progressFile)) {
      const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
      res.end(JSON.stringify(progress));
    } else {
      res.end(JSON.stringify({ scenes: {}, totalScore: 0 }));
    }
  }

  serveHelpRequests(res) {
    const helpDir = path.join(this.dataDir, 'help-requests');
    if (!fs.existsSync(helpDir)) {
      res.end(JSON.stringify([]));
      return;
    }

    const files = fs.readdirSync(helpDir)
      .filter(f => f.endsWith('.json'))
      .sort((a, b) => b.localeCompare(a)) // Most recent first
      .slice(0, 10); // Last 10 requests

    const requests = files.map(file => {
      const content = fs.readFileSync(path.join(helpDir, file), 'utf8');
      return JSON.parse(content);
    });

    res.end(JSON.stringify(requests));
  }

  serveStats(res) {
    const progressFile = path.join(this.dataDir, 'progress', 'user-progress.json');
    const helpDir = path.join(this.dataDir, 'help-requests');

    let totalScenes = 0;
    let completedScenes = 0;
    let helpRequestCount = 0;

    // Count scenes
    if (fs.existsSync(progressFile)) {
      const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
      totalScenes = Object.keys(progress.scenes).length;
      completedScenes = Object.values(progress.scenes)
        .filter(scene => scene.status !== 'pending').length;
    }

    // Count help requests
    if (fs.existsSync(helpDir)) {
      helpRequestCount = fs.readdirSync(helpDir)
        .filter(f => f.endsWith('.json')).length;
    }

    const stats = {
      totalScenes,
      completedScenes,
      progressPercentage: totalScenes > 0 ? Math.round((completedScenes / totalScenes) * 100) : 0,
      helpRequestCount,
      timestamp: new Date().toISOString()
    };

    res.end(JSON.stringify(stats));
  }

  serveFile(filename, res) {
    const filePath = path.join(this.publicDir, filename);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(this.publicDir)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    if (!fs.existsSync(filePath)) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filename);
    const contentType = this.getContentType(ext);
    
    res.setHeader('Content-Type', contentType);
    const content = fs.readFileSync(filePath);
    res.end(content);
  }

  getContentType(ext) {
    const types = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    };
    return types[ext] || 'text/plain';
  }
}

// Start server if run directly
if (require.main === module) {
  const server = new ControlRoomServer();
  server.start();
}

module.exports = ControlRoomServer;