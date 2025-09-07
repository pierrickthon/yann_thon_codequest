#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Accessibility Checker
 * Vérifie conformité ARIA et contrastes
 */

const fs = require('fs');
const path = require('path');

class A11yChecker {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passed = [];
  }

  log(message, type = 'info') {
    const icons = {
      pass: '✅',
      fail: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    console.log(`${icons[type]} ${message}`);
  }

  // Check HTML file for accessibility
  checkHTMLFile(filepath) {
    const content = fs.readFileSync(filepath, 'utf8');
    const filename = path.basename(filepath);
    
    this.log(`Checking ${filename}...`, 'info');
    
    // Check for lang attribute
    if (!content.includes('lang="')) {
      this.issues.push(`${filename}: Missing lang attribute on <html>`);
    } else {
      this.passed.push(`${filename}: Lang attribute present`);
    }
    
    // Check for viewport meta
    if (!content.includes('viewport')) {
      this.warnings.push(`${filename}: Missing viewport meta tag`);
    }
    
    // Check images for alt text
    const imgMatches = content.match(/<img[^>]*>/g) || [];
    imgMatches.forEach(img => {
      if (!img.includes('alt=')) {
        this.issues.push(`${filename}: Image without alt text`);
      }
    });
    
    // Check buttons for accessible text
    const buttonMatches = content.match(/<button[^>]*>.*?<\/button>/g) || [];
    buttonMatches.forEach(button => {
      if (!button.includes('aria-label') && !/>.*\w+.*</.test(button)) {
        this.issues.push(`${filename}: Button without accessible text`);
      }
    });
    
    // Check form inputs for labels
    const inputMatches = content.match(/<input[^>]*>/g) || [];
    inputMatches.forEach(input => {
      if (!input.includes('aria-label') && !input.includes('id=')) {
        this.warnings.push(`${filename}: Input possibly missing label`);
      }
    });
    
    // Check headings hierarchy
    const headings = content.match(/<h[1-6][^>]*>/g) || [];
    let lastLevel = 0;
    headings.forEach(heading => {
      const level = parseInt(heading.match(/h([1-6])/)[1]);
      if (level - lastLevel > 1) {
        this.warnings.push(`${filename}: Heading hierarchy skip (h${lastLevel} to h${level})`);
      }
      lastLevel = level;
    });
    
    // Check for skip links
    if (!content.includes('skip') && !content.includes('Skip')) {
      this.warnings.push(`${filename}: Consider adding skip navigation link`);
    }
    
    // Check ARIA roles
    if (content.includes('role=')) {
      this.passed.push(`${filename}: ARIA roles used`);
    }
    
    // Check for focus indicators in CSS
    if (content.includes('<style>') || content.includes('.css')) {
      this.checkFocusIndicators(content, filename);
    }
  }

  // Check focus indicators
  checkFocusIndicators(content, filename) {
    if (!content.includes(':focus')) {
      this.warnings.push(`${filename}: No :focus styles detected`);
    } else {
      this.passed.push(`${filename}: Focus styles present`);
    }
  }

  // Check color contrasts (simplified)
  checkColorContrast() {
    this.log('Checking color contrasts...', 'info');
    
    // Check CSS files for common contrast issues
    const cssFiles = [
      'control-room/roadmap.css',
      'control-room/dashboard.css'
    ];
    
    cssFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const css = fs.readFileSync(file, 'utf8');
        
        // Check for very light colors on white
        const lightColors = css.match(/#[ef][ef][ef]/gi) || [];
        if (lightColors.length > 0) {
          this.warnings.push(`${file}: Very light colors detected, check contrast`);
        }
        
        // Check for color-only information
        if (css.includes('color:') && !css.includes('text-decoration') && !css.includes('border')) {
          this.warnings.push(`${file}: Ensure information isn't conveyed by color alone`);
        }
        
        this.passed.push(`${file}: Basic contrast check performed`);
      }
    });
  }

  // Check keyboard navigation
  checkKeyboardNav() {
    this.log('Checking keyboard navigation...', 'info');
    
    const jsFiles = [
      'control-room/roadmap.js',
      'control-room/dashboard.js'
    ];
    
    jsFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const js = fs.readFileSync(file, 'utf8');
        
        // Check for keyboard event handlers
        if (js.includes('keydown') || js.includes('keyup') || js.includes('keypress')) {
          this.passed.push(`${file}: Keyboard handlers present`);
        } else {
          this.warnings.push(`${file}: No keyboard handlers detected`);
        }
        
        // Check for tabindex usage
        if (js.includes('tabindex') || js.includes('tabIndex')) {
          this.passed.push(`${file}: Tab index management detected`);
        }
        
        // Check for escape key handling
        if (js.includes('Escape') || js.includes('27')) {
          this.passed.push(`${file}: Escape key handling present`);
        }
      }
    });
  }

  // Apply quick fixes
  applyQuickFixes() {
    this.log('\nApplying quick fixes...', 'info');
    
    // Fix roadmap.html
    const roadmapPath = 'control-room/roadmap.html';
    if (fs.existsSync(roadmapPath)) {
      let content = fs.readFileSync(roadmapPath, 'utf8');
      
      // Add lang attribute if missing
      if (!content.includes('lang=')) {
        content = content.replace('<html>', '<html lang="fr">');
        this.log('Added lang="fr" to roadmap.html', 'pass');
      }
      
      // Add skip link if missing
      if (!content.includes('skip')) {
        const skipLink = '<a href="#main" class="skip-link">Aller au contenu principal</a>';
        content = content.replace('<body>', `<body>\n    ${skipLink}`);
        this.log('Added skip navigation link', 'pass');
      }
      
      // Add aria-label to buttons without text
      content = content.replace(
        /<button([^>]*)class="hint-btn"([^>]*)>/g,
        '<button$1class="hint-btn"$2 aria-label="Obtenir un indice">'
      );
      
      fs.writeFileSync(roadmapPath, content);
    }
    
    // Add focus styles to CSS
    const cssPath = 'control-room/roadmap.css';
    if (fs.existsSync(cssPath)) {
      let css = fs.readFileSync(cssPath, 'utf8');
      
      if (!css.includes(':focus')) {
        css += `
/* Accessibility: Focus indicators */
*:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .level-card {
    border: 2px solid;
  }
  
  .btn-primary {
    border: 2px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`;
        fs.writeFileSync(cssPath, css);
        this.log('Added focus styles and a11y CSS', 'pass');
      }
    }
  }

  // Generate report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        passed: this.passed.length,
        issues: this.issues.length,
        warnings: this.warnings.length
      },
      details: {
        passed: this.passed,
        issues: this.issues,
        warnings: this.warnings
      },
      recommendations: [
        'Test with screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)',
        'Test keyboard-only navigation (Tab, Enter, Escape)',
        'Use browser DevTools Lighthouse for detailed audit',
        'Test with high contrast mode',
        'Validate color contrasts with WebAIM tool'
      ]
    };
    
    fs.writeFileSync('a11y-report.json', JSON.stringify(report, null, 2));
    return report;
  }

  // Run all checks
  async runChecks() {
    console.log('♿ CodeQuest 2.3 - Accessibility Check\n');
    console.log('='.repeat(50));
    
    // Check HTML files
    const htmlFiles = [
      'control-room/roadmap.html',
      'control-room/dashboard.html',
      'control-room/index.html'
    ];
    
    htmlFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.checkHTMLFile(file);
      }
    });
    
    // Check contrasts
    this.checkColorContrast();
    
    // Check keyboard navigation
    this.checkKeyboardNav();
    
    // Apply fixes
    this.applyQuickFixes();
    
    // Generate report
    const report = this.generateReport();
    
    // Display summary
    console.log('\n' + '='.repeat(50));
    console.log('\n📊 Résumé Accessibilité:\n');
    console.log(`✅ Tests réussis: ${report.summary.passed}`);
    console.log(`❌ Problèmes critiques: ${report.summary.issues}`);
    console.log(`⚠️ Avertissements: ${report.summary.warnings}`);
    
    if (report.summary.issues > 0) {
      console.log('\n❌ Problèmes à corriger:');
      report.details.issues.forEach(issue => console.log(`  - ${issue}`));
    }
    
    if (report.summary.warnings > 0) {
      console.log('\n⚠️ Points d\'attention:');
      report.details.warnings.slice(0, 5).forEach(warning => console.log(`  - ${warning}`));
    }
    
    console.log('\n📋 Rapport complet: a11y-report.json');
    console.log('\n✨ Quick fixes appliqués automatiquement!');
    
    // Exit code based on critical issues
    process.exit(report.summary.issues > 0 ? 1 : 0);
  }
}

// Run
if (require.main === module) {
  const checker = new A11yChecker();
  checker.runChecks().catch(console.error);
}

module.exports = A11yChecker;