#!/usr/bin/env node

/**
 * CodeQuest 2.3 - Schema Validation
 * Validates all Act and Scene manifests using AJV
 */

const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

const ajv = new Ajv({ allErrors: true });

// Schema definitions
const actManifestSchema = {
  type: "object",
  properties: {
    id: { type: "string", pattern: "^act-[1-4]$" },
    title: { type: "string", minLength: 1 },
    version: { type: "string" },
    description: { type: "string", minLength: 1 },
    estimatedDuration: { type: "string" },
    difficulty: { type: "string" },
    scenes: {
      type: "object",
      properties: {
        core: {
          type: "array",
          items: { type: "string", pattern: "^N\\d{2}-[a-z-]+$" },
          minItems: 1
        }
      },
      required: ["core"]
    }
  },
  required: ["id", "title", "description", "scenes"],
  additionalProperties: true
};

const sceneManifestSchema = {
  type: "object",
  properties: {
    id: { type: "string", pattern: "^N\\d{2}$" },
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    estimatedTime: { type: "number", minimum: 1 },
    difficulty: { type: "number", minimum: 1, maximum: 5 },
    concepts: {
      type: "array",
      items: { type: "string" },
      minItems: 1
    },
    files: {
      type: "object",
      properties: {
        starter: { type: "string" },
        solution: { type: "string" },
        tests: { type: "string" }
      },
      required: ["starter", "solution", "tests"]
    }
  },
  required: ["id", "title", "description", "estimatedTime", "difficulty"],
  additionalProperties: true
};

const criteriaSchema = {
  type: "object",
  properties: {
    base: { type: "object" },
    bonus: { type: "object" },
    challenge: { type: "object" }
  },
  required: ["base"],
  additionalProperties: false
};

// Compile validators
const validateActManifest = ajv.compile(actManifestSchema);
const validateSceneManifest = ajv.compile(sceneManifestSchema);
const validateCriteria = ajv.compile(criteriaSchema);

function validateFile(filePath, validator, schemaName) {
  try {
    if (!fs.existsSync(filePath)) {
      return { valid: false, errors: [`File not found: ${filePath}`] };
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const valid = validator(content);
    
    if (!valid) {
      return {
        valid: false,
        errors: validator.errors.map(err => 
          `${err.instancePath || 'root'}: ${err.message}${err.data ? ` (got: ${JSON.stringify(err.data)})` : ''}`
        )
      };
    }

    return { valid: true, content };
  } catch (error) {
    return { valid: false, errors: [`Parse error in ${filePath}: ${error.message}`] };
  }
}

function findActManifests() {
  const levelsDir = path.join(__dirname, '../levels');
  const acts = [];
  
  if (!fs.existsSync(levelsDir)) {
    return acts;
  }

  fs.readdirSync(levelsDir).forEach(item => {
    const actDir = path.join(levelsDir, item);
    const manifestPath = path.join(actDir, 'manifest.json');
    
    if (fs.statSync(actDir).isDirectory() && fs.existsSync(manifestPath)) {
      acts.push({ actDir: item, manifestPath });
    }
  });
  
  return acts;
}

function findSceneManifests(actDir) {
  const scenes = [];
  const actPath = path.join(__dirname, '../levels', actDir);
  
  if (!fs.existsSync(actPath)) {
    return scenes;
  }

  fs.readdirSync(actPath).forEach(item => {
    const sceneDir = path.join(actPath, item);
    const manifestPath = path.join(sceneDir, 'manifest.json');
    const criteriaPath = path.join(sceneDir, 'criteria.json');
    
    if (fs.statSync(sceneDir).isDirectory() && item.match(/^N\d{2}-/)) {
      scenes.push({
        sceneId: item,
        manifestPath: fs.existsSync(manifestPath) ? manifestPath : null,
        criteriaPath: fs.existsSync(criteriaPath) ? criteriaPath : null
      });
    }
  });
  
  return scenes;
}

function main() {
  console.log('🔍 CodeQuest Schema Validation Starting...\n');
  
  let totalErrors = 0;
  let totalValidated = 0;

  // Validate Act manifests
  console.log('📋 Validating Act Manifests...');
  const acts = findActManifests();
  
  if (acts.length === 0) {
    console.log('⚠️  No Act manifests found in levels/');
    totalErrors++;
  }

  acts.forEach(({ actDir, manifestPath }) => {
    const result = validateFile(manifestPath, validateActManifest, 'ActManifest');
    totalValidated++;
    
    if (result.valid) {
      console.log(`✅ ${actDir}/manifest.json - Valid`);
    } else {
      console.log(`❌ ${actDir}/manifest.json - Invalid:`);
      result.errors.forEach(error => console.log(`   • ${error}`));
      totalErrors++;
    }
  });

  console.log('');

  // Validate Scene manifests
  console.log('📋 Validating Scene Manifests...');
  acts.forEach(({ actDir }) => {
    const scenes = findSceneManifests(actDir);
    console.log(`\n🎬 ${actDir}:`);
    
    if (scenes.length === 0) {
      console.log(`⚠️  No scenes found in ${actDir}`);
      return;
    }

    scenes.forEach(({ sceneId, manifestPath, criteriaPath }) => {
      if (manifestPath) {
        const result = validateFile(manifestPath, validateSceneManifest, 'SceneManifest');
        totalValidated++;
        
        if (result.valid) {
          console.log(`  ✅ ${sceneId}/manifest.json`);
        } else {
          console.log(`  ❌ ${sceneId}/manifest.json:`);
          result.errors.forEach(error => console.log(`     • ${error}`));
          totalErrors++;
        }
      } else {
        console.log(`  ⚠️  ${sceneId}/manifest.json - Missing`);
        totalErrors++;
      }

      // Validate criteria.json
      if (criteriaPath) {
        const result = validateFile(criteriaPath, validateCriteria, 'Criteria');
        totalValidated++;
        
        if (result.valid) {
          console.log(`  ✅ ${sceneId}/criteria.json`);
        } else {
          console.log(`  ❌ ${sceneId}/criteria.json:`);
          result.errors.forEach(error => console.log(`     • ${error}`));
          totalErrors++;
        }
      } else {
        console.log(`  ⚠️  ${sceneId}/criteria.json - Missing`);
        totalErrors++;
      }
    });
  });

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log(`📊 Schema Validation Summary:`);
  console.log(`   • Files validated: ${totalValidated}`);
  console.log(`   • Errors found: ${totalErrors}`);
  
  if (totalErrors === 0) {
    console.log('✅ All schemas valid! Ready for production.');
    process.exit(0);
  } else {
    console.log('❌ Schema validation failed. Fix errors before deployment.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { validateActManifest, validateSceneManifest, validateCriteria };