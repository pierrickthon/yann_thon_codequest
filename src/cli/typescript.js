/**
 * TypeScript CLI Commands for CodeQuest 2.3
 * Commands: ts:strict, ts:migrate, ts:score, ts:budget
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TypeScriptManager {
  constructor() {
    this.configDir = path.join(__dirname, '../../ts');
    this.workspaceDir = path.join(__dirname, '../../student-workspace');
    this.progressFile = path.join(this.workspaceDir, 'progress.json');
  }

  // cq ts:strict --level <0|1|2|3>
  setStrictLevel(level) {
    const validLevels = [0, 1, 2, 3];
    if (!validLevels.includes(parseInt(level))) {
      throw new Error(`Invalid level: ${level}. Use 0-3.`);
    }

    const sourceConfig = path.join(this.configDir, `tsconfig.level-${level}.json`);
    const targetConfig = path.join(process.cwd(), 'tsconfig.json');

    if (!fs.existsSync(sourceConfig)) {
      throw new Error(`Config not found: ${sourceConfig}`);
    }

    fs.copyFileSync(sourceConfig, targetConfig);
    
    console.log(`🔧 TypeScript strict level set to ${level}`);
    console.log(`📋 Active config: ${sourceConfig}`);
    
    if (level >= 2) {
      console.log(`⚠️  Strict mode active - TypeScript errors will block validation`);
    }

    return { level: parseInt(level), config: targetConfig };
  }

  // cq ts:migrate --act <1|2>
  migrateAct(actNumber) {
    const validActs = [1, 2];
    if (!validActs.includes(parseInt(actNumber))) {
      throw new Error(`Invalid act: ${actNumber}. Use 1 or 2.`);
    }

    const act = parseInt(actNumber);
    const actDir = path.join(__dirname, `../../levels/act-${act}`);
    
    if (!fs.existsSync(actDir)) {
      throw new Error(`Act ${act} not found: ${actDir}`);
    }

    // Ensure workspace exists
    if (!fs.existsSync(this.workspaceDir)) {
      fs.mkdirSync(this.workspaceDir, { recursive: true });
    }

    const migratedFiles = [];
    this._scanAndMigrate(actDir, act, migratedFiles);

    // Set default level-1 config
    this.setStrictLevel(1);

    // Create types declaration file
    this._createTypesFile(act);

    console.log(`🚀 Act ${act} migrated to TypeScript`);
    console.log(`📁 Migrated ${migratedFiles.length} files:`);
    migratedFiles.forEach(file => console.log(`   • ${file}`));
    console.log(`🔧 TypeScript level set to 1 (noImplicitAny)`);
    console.log(`📚 Types available in student-workspace/types.d.ts`);

    return { act, migratedFiles, config: 'level-1' };
  }

  // cq ts:score
  calculateTypeScore() {
    const workspaceFiles = this._getTypeScriptFiles();
    
    let totalAny = 0;
    let totalTsIgnore = 0;
    let totalUnknown = 0;
    let totalTodo = 0;
    let fileDetails = [];

    for (const filePath of workspaceFiles) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      const anyCount = (content.match(/:\s*any\b/g) || []).length;
      const tsIgnoreCount = (content.match(/@ts-ignore/g) || []).length;
      const unknownCount = (content.match(/:\s*unknown\b/g) || []).length;
      const todoCount = (content.match(/TODO.*type/gi) || []).length;

      totalAny += anyCount;
      totalTsIgnore += tsIgnoreCount;
      totalUnknown += unknownCount;
      totalTodo += todoCount;

      if (anyCount > 0 || tsIgnoreCount > 0 || unknownCount > 2) {
        fileDetails.push({
          file: path.relative(process.cwd(), filePath),
          any: anyCount,
          tsIgnore: tsIgnoreCount,
          unknown: unknownCount,
          todo: todoCount
        });
      }
    }

    const score = Math.max(0, 100 - 5 * totalAny - 3 * totalTsIgnore - 2 * totalUnknown - 1 * totalTodo);
    const isTypeGuardian = score >= 90 && totalAny === 0 && totalTsIgnore === 0;

    console.log(`🏆 TypeScore: ${score}/100`);
    console.log(`\n📊 Type Analysis:`);
    console.log(`   • any usage: ${totalAny} (-${5 * totalAny} pts)`);
    console.log(`   • @ts-ignore: ${totalTsIgnore} (-${3 * totalTsIgnore} pts)`);
    console.log(`   • unknown unnarrowed: ${totalUnknown} (-${2 * totalUnknown} pts)`);
    console.log(`   • TODO types: ${totalTodo} (-${1 * totalTodo} pts)`);

    if (isTypeGuardian) {
      console.log(`\n🛡️  Type Guardian Badge EARNED! 🏆`);
      console.log(`   ✅ Score ≥ 90: ${score}`);
      console.log(`   ✅ Zero any usage`);
      console.log(`   ✅ Zero @ts-ignore`);
    } else {
      console.log(`\n📈 Type Guardian Requirements:`);
      console.log(`   ${score >= 90 ? '✅' : '❌'} Score ≥ 90 (current: ${score})`);
      console.log(`   ${totalAny === 0 ? '✅' : '❌'} Zero any usage (current: ${totalAny})`);
      console.log(`   ${totalTsIgnore === 0 ? '✅' : '❌'} Zero @ts-ignore (current: ${totalTsIgnore})`);
    }

    if (fileDetails.length > 0) {
      console.log(`\n🔍 Top Offenders:`);
      fileDetails.slice(0, 5).forEach(detail => {
        console.log(`   ${detail.file}: any:${detail.any} ignore:${detail.tsIgnore} unknown:${detail.unknown}`);
      });
    }

    return { score, totalAny, totalTsIgnore, totalUnknown, totalTodo, isTypeGuardian, fileDetails };
  }

  // cq ts:budget --ignores <n> | --any <n>
  setBudget(type, limit) {
    const validTypes = ['ignores', 'any'];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid budget type: ${type}. Use 'ignores' or 'any'.`);
    }

    const numLimit = parseInt(limit);
    if (isNaN(numLimit) || numLimit < 0) {
      throw new Error(`Invalid limit: ${limit}. Use positive number.`);
    }

    // Load existing progress
    let progress = {};
    if (fs.existsSync(this.progressFile)) {
      progress = JSON.parse(fs.readFileSync(this.progressFile, 'utf8'));
    }

    if (!progress.typeScript) {
      progress.typeScript = {};
    }

    progress.typeScript.budgets = progress.typeScript.budgets || {};
    progress.typeScript.budgets[type] = numLimit;

    // Save progress
    fs.writeFileSync(this.progressFile, JSON.stringify(progress, null, 2));

    console.log(`💰 Budget set: ${type} ≤ ${numLimit}`);
    console.log(`⚠️  Using budget will prevent ⭐ trophy eligibility`);

    // Check current usage
    const scoreResult = this.calculateTypeScore();
    const currentUsage = type === 'ignores' ? scoreResult.totalTsIgnore : scoreResult.totalAny;
    
    if (currentUsage > numLimit) {
      console.log(`❌ Budget exceeded! Current ${type}: ${currentUsage}/${numLimit}`);
    } else {
      console.log(`✅ Within budget: Current ${type}: ${currentUsage}/${numLimit}`);
    }

    return { type, limit: numLimit, current: currentUsage };
  }

  // Helper: Scan and migrate JS files to TS
  _scanAndMigrate(actDir, actNumber, migratedFiles) {
    const scenePattern = new RegExp(`N\\d\\d-`);
    const scenes = fs.readdirSync(actDir).filter(name => scenePattern.test(name));

    for (const sceneName of scenes) {
      const scenePath = path.join(actDir, sceneName);
      const jsFiles = ['starter.js', 'solution.js'];
      
      for (const jsFile of jsFiles) {
        const sourcePath = path.join(scenePath, jsFile);
        if (fs.existsSync(sourcePath)) {
          const tsFile = jsFile.replace('.js', '.ts');
          const targetPath = path.join(this.workspaceDir, `${sceneName}-${tsFile}`);
          
          let content = fs.readFileSync(sourcePath, 'utf8');
          
          // Basic JS -> TS migration transforms
          content = this._transformJSToTS(content);
          
          fs.writeFileSync(targetPath, content);
          migratedFiles.push(`${sceneName}-${tsFile}`);
        }
      }
    }
  }

  // Helper: Basic JS to TS transforms
  _transformJSToTS(content) {
    // Add basic type annotations for common patterns
    content = content.replace(/module\.exports\s*=\s*{([^}]+)}/g, (match, exports) => {
      return `export {${exports}};`;
    });

    content = content.replace(/const\s+{\s*([^}]+)\s*}\s*=\s*require\(['"`]([^'"`]+)['"`]\)/g, 
      'import { $1 } from "$2"');

    // Add TODO comments for manual type additions
    content = content.replace(/function\s+(\w+)\s*\(/g, '// TODO: Add parameter and return types\nfunction $1(');
    
    return content;
  }

  // Helper: Create types declaration file
  _createTypesFile(act) {
    const typesContent = `/**
 * CodeQuest Act ${act} - Type Declarations
 * Add common types and interfaces here
 */

// Common Result pattern
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// API Response pattern
export interface ApiResponse<T = unknown> {
  status: number;
  data: T;
  timestamp: number;
}

// User types (example)
export interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Add your custom types below
// TODO: Define interfaces for your specific use cases

declare global {
  // Global type augmentations if needed
}

export {};
`;

    fs.writeFileSync(path.join(this.workspaceDir, 'types.d.ts'), typesContent);
  }

  // Helper: Get all TS files in workspace
  _getTypeScriptFiles() {
    if (!fs.existsSync(this.workspaceDir)) {
      return [];
    }

    const files = fs.readdirSync(this.workspaceDir)
      .filter(file => file.endsWith('.ts') && !file.endsWith('.d.ts'))
      .map(file => path.join(this.workspaceDir, file));

    return files;
  }
}

module.exports = TypeScriptManager;