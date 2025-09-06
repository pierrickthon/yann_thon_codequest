# Contributing to CodeQuest

Thank you for your interest in contributing to CodeQuest! This document provides guidelines for contributions.

## Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/codequest.git
   cd codequest
   npm install
   ```

2. **Development Installation**
   ```bash
   npm link  # Install CLI globally for testing
   ```

3. **Run Tests**
   ```bash
   # Test all scenes
   npm test
   
   # Test specific scene
   cd acts/act1/N00-intro
   node test.js
   ```

4. **Start Control Room**
   ```bash
   npm run control-room
   # Visit http://localhost:3000
   ```

## Contribution Types

### Scene Content
- New learning scenes
- Improvements to existing scenes
- Additional test cases
- Better hints and documentation

### Platform Features
- CLI enhancements
- Control Room improvements
- Validation logic updates
- Schema modifications

### Documentation
- Tutorial improvements
- API documentation
- Instructor guides
- Student resources

## Scene Development Guidelines

### Creating a New Scene

1. **Scene Structure**
   ```
   acts/actX/NXX-scene-name/
   ├── README.md           # Instructions and objectives
   ├── solution.js         # Template with TODOs
   ├── test.js            # Comprehensive test suite
   └── hints.json         # Structured hints
   ```

2. **Naming Conventions**
   - Scene ID: `NXX-descriptive-name` (e.g., `N07-modules`)
   - Use lowercase with hyphens
   - Keep names concise but descriptive

3. **README.md Template**
   ```markdown
   # NXX: Scene Title
   
   ## Learning Objectives
   - Objective 1
   - Objective 2
   
   ## Challenge
   Brief description of what students need to implement.
   
   ## Instructions
   1. Step-by-step guide
   2. Clear expectations
   
   ## Bonus Criteria
   - Advanced requirements for bonus points
   
   ## Files
   - File descriptions
   ```

4. **Solution Template**
   ```javascript
   /**
    * NXX: Scene Title - Solution Template
    */
   
   /**
    * Function description with JSDoc
    * @param {type} param - Parameter description
    * @returns {type} Return description
    */
   function functionName(param) {
     // TODO: Implement functionality
     // Provide enough structure to guide without giving away solution
   }
   
   module.exports = { functionName };
   ```

5. **Test Suite Requirements**
   ```javascript
   /**
    * NXX: Scene Title - Test Suite
    */
   
   const { functionName } = require('./solution.js');
   
   function runTests() {
     // Test framework implementation
     // Cover happy path, edge cases, error conditions
     // Provide clear pass/fail feedback
   }
   
   runTests();
   ```

6. **Hints Structure**
   ```json
   {
     "hints": [
       "Conceptual hint about the approach",
       "More specific guidance about implementation",
       "Code-level hint if really needed",
       "Last resort hint with example"
     ]
   }
   ```

### Quality Standards

1. **Learning Progression**
   - Each scene builds on previous concepts
   - Appropriate difficulty curve
   - Clear learning objectives

2. **Test Coverage**
   - Happy path scenarios
   - Edge cases and boundary conditions
   - Error handling validation
   - Clear, informative test output

3. **Code Quality**
   - Modern JavaScript/TypeScript patterns
   - Clear variable names and structure
   - Appropriate comments and JSDoc
   - Consistent formatting

4. **Documentation**
   - Clear instructions and expectations
   - Learning objectives explicit
   - Bonus/challenge criteria well-defined
   - Hints progression from general to specific

## Platform Development

### CLI Modifications

The CLI is implemented in `src/cli/index.js`. Key areas:

1. **Validation Logic**
   ```javascript
   async validateScene(sceneId) {
     // Add new validation criteria
     // Update status determination logic
     // Enhance error reporting
   }
   ```

2. **Help System**
   ```javascript
   async helpMe(sceneId) {
     // Improve context gathering
     // Enhance hint delivery
     // Add debugging information
   }
   ```

3. **New Commands**
   - Add command parsing in main switch statement
   - Implement command logic
   - Update help text and README

### Control Room Enhancements

Located in `src/control-room/`:

1. **Backend API** (`server.js`)
   - Add new API endpoints
   - Enhance data processing
   - Improve error handling

2. **Frontend Interface** (`public/`)
   - UI improvements
   - New dashboard widgets
   - Enhanced data visualization

### Schema Updates

JSON schemas in `src/schemas/` define data structures:

1. **Validation**
   - Ensure backward compatibility
   - Update related code when changing schemas
   - Test with existing data

2. **Documentation**
   - Update schema descriptions
   - Provide examples
   - Maintain schema registry

## Testing Guidelines

### Scene Testing
1. **Manual Testing**
   ```bash
   cd acts/act1/new-scene
   node test.js              # Should pass
   cq validate              # Should succeed
   ```

2. **Integration Testing**
   ```bash
   npm test                 # Run all scene tests
   ```

### Platform Testing
1. **CLI Testing**
   ```bash
   cq validate              # Test validation
   cq help-me N00-intro     # Test help system
   ```

2. **Control Room Testing**
   ```bash
   npm run control-room     # Start server
   # Manual UI testing at localhost:3000
   ```

## Submission Process

### Pull Request Guidelines

1. **Branch Naming**
   - Feature: `feature/description`
   - Scene: `scene/NXX-name`  
   - Bug fix: `fix/description`

2. **Commit Messages**
   ```
   feat(N07): add modules scene with ES6 imports
   
   - Implements ES6 module syntax learning
   - Includes CommonJS comparison
   - Covers named and default exports
   - Tests both import/export patterns
   ```

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] New scene
   - [ ] Scene improvement
   - [ ] Platform feature
   - [ ] Bug fix
   - [ ] Documentation
   
   ## Testing
   - [ ] Scene tests pass
   - [ ] Manual validation works
   - [ ] Control room displays correctly
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   ```

### Review Criteria

1. **Educational Value**
   - Clear learning objectives
   - Appropriate difficulty progression
   - Engaging and relevant content

2. **Technical Quality**
   - Tests comprehensive and reliable
   - Code follows modern practices
   - Documentation clear and complete

3. **Platform Integration**
   - Works with existing CLI
   - Displays correctly in Control Room
   - Follows established patterns

## Community Guidelines

### Communication
- Be respectful and constructive
- Focus on improving learning outcomes
- Share knowledge and help others

### Collaboration
- Credit original authors
- Discuss major changes before implementing
- Ask questions when uncertain

### Quality Focus
- Prioritize student learning experience
- Test thoroughly before submitting
- Document your changes clearly

## Getting Help

- **Technical Issues**: Open GitHub issue with details
- **Design Questions**: Start GitHub discussion
- **Educational Concerns**: Contact maintainers

Thank you for contributing to CodeQuest! Every contribution helps create better learning experiences for students worldwide.