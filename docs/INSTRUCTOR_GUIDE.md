# Instructor Guide - CodeQuest 2.3

This guide helps instructors effectively deploy and manage CodeQuest for their students.

## Quick Setup

1. **Prepare the Environment**
   ```bash
   git clone https://github.com/your-org/codequest.git
   cd codequest
   npm install
   ```

2. **Test the Installation**
   ```bash
   npm link
   cq validate
   npm run control-room
   ```

3. **Share with Students**
   - Provide repository access or distribute as ZIP
   - Share `docs/GETTING_STARTED.md`
   - Demonstrate CLI commands

## Control Room Overview

The Control Room (`http://localhost:3000`) provides real-time monitoring:

### Dashboard Features
- **Progress Statistics**: Completion rates across all students
- **Help Requests**: Real-time student assistance needs
- **Activity Monitoring**: Scene completions and time tracking
- **Export Functionality**: Data export for gradebooks

### Monitoring Student Progress

1. **Individual Progress**
   - Scene-by-scene completion status
   - Attempt counts and validation timestamps
   - Status levels (base/bonus/challenge)

2. **Help Request System**
   - Automatic context capture (environment, git status)
   - Timestamp and scene identification
   - Environment details for debugging assistance

3. **Activity Analytics**
   - Time spent per scene
   - Common bottlenecks and help patterns
   - Completion rate analysis

## Pedagogical Integration

### Course Structure Alignment

**Week 1-2: JavaScript Fundamentals**
- N00: JavaScript Fundamentals
- N01: Functions & Scope
- N02: Arrays & Objects

**Week 3-4: Async and Error Handling**
- N03: Async Programming  
- N04: Error Handling

**Week 5-6: Testing and TDD**
- N05: Testing Fundamentals
- N06: TDD Methodology

### Assessment Strategy

1. **Formative Assessment**
   - Monitor daily progress via Control Room
   - Review help requests for common struggles
   - Use completion rates to adjust pacing

2. **Summative Assessment Options**
   - Scene completion grades (Base=70%, Bonus=85%, Challenge=100%)
   - Portfolio assessment of final implementations
   - Peer code review sessions
   - TDD process evaluation

3. **Grading Integration**
   ```bash
   # Export progress data
   # Navigate to Control Room → Export Data
   # Import JSON into your gradebook system
   ```

## Customization Guidelines

### Adding New Scenes

1. **Create Scene Directory**
   ```bash
   mkdir acts/act1/N07-new-topic
   cd acts/act1/N07-new-topic
   ```

2. **Required Files**
   - `README.md` - Scene instructions and objectives
   - `solution.js` - Template with TODO comments
   - `test.js` - Comprehensive test suite
   - `hints.json` - Structured hints array

3. **Follow Naming Convention**
   - Scene ID: `N##-topic-name` (e.g., `N07-modules`)
   - Use lowercase with hyphens for topic names
   - Maintain sequential numbering

### Modifying Existing Content

1. **Test Template Changes**
   ```bash
   cd acts/act1/scene-directory
   node test.js  # Verify tests pass with reference solution
   ```

2. **Update Hints Appropriately**
   - Start with conceptual hints
   - Progress to implementation hints
   - Avoid giving away complete solutions

3. **Validate Schema Compliance**
   - Check JSON files against schemas in `/src/schemas`
   - Maintain consistent data structures

### Institution-Specific Adaptations

1. **Technology Stack Adjustments**
   - Modify test runners for different frameworks
   - Adapt validation logic in `src/cli/index.js`
   - Update scene content for stack-specific patterns

2. **Assessment Criteria**
   - Modify bonus/challenge criteria per scene
   - Adjust point values in validation logic
   - Customize badge/achievement systems

## Troubleshooting Student Issues

### Common Problems and Solutions

1. **"CLI command not found"**
   ```bash
   # Have student run:
   npm install
   npm link
   # Or install globally:
   npm install -g .
   ```

2. **"Tests failing unexpectedly"**
   - Verify student is in correct scene directory
   - Check git branch matches scene name
   - Ensure Node.js version compatibility (16+)

3. **"Git workflow confusion"**
   - Review branch naming: `scene/SCENE-ID`
   - Demonstrate: checkout → work → validate → commit
   - Provide git cheat sheet

4. **"Control room won't start"**
   - Check port 3000 availability
   - Verify data directory permissions
   - Try alternative port: `PORT=3001 npm run control-room`

### Student Support Workflow

1. **Monitor Help Requests**
   - Check Control Room regularly
   - Review context provided in help requests
   - Prioritize by scene difficulty and student attempt count

2. **Intervention Strategies**
   - **1-2 attempts**: Let student struggle productively
   - **3-5 attempts**: Provide targeted hints
   - **5+ attempts**: Schedule one-on-one assistance

3. **Office Hours Preparation**
   - Export recent help requests
   - Review common error patterns
   - Prepare targeted mini-lessons

## Advanced Features

### Team Raids (Future Enhancement)

Current MVP focuses on individual learning. Team features planned:
- Shared repositories with RAID_LOG
- Collaborative problem-solving scenes
- Peer review workflows

### Extensibility

1. **Custom Validation Logic**
   - Modify `src/cli/index.js` validation functions
   - Add scene-specific validation rules
   - Integrate with existing testing frameworks

2. **Data Integration**
   - Export progress JSON to LMS systems
   - Connect to institutional databases
   - Integrate with communication platforms

3. **Content Management**
   - Version control scene content
   - A/B test different approaches
   - Track content effectiveness metrics

## Best Practices

### Deployment
1. **Pre-semester Testing**
   - Test on all target operating systems
   - Verify with different Node.js versions
   - Validate network/proxy environments

2. **Student Onboarding**
   - Provide clear installation instructions
   - Demonstrate first scene completion
   - Set expectations for help-seeking

3. **Ongoing Management**
   - Monitor Control Room daily
   - Address help requests promptly
   - Adjust pacing based on progress data

### Assessment Integration
1. **Grade Mapping**
   - Base completion: 70-79%
   - Bonus completion: 80-89% 
   - Challenge completion: 90-100%

2. **Progress Tracking**
   - Weekly progress check-ins
   - Milestone completion requirements
   - Make-up policies for missed scenes

### Student Success
1. **Clear Expectations**
   - Communicate TDD process importance
   - Set realistic time estimates per scene
   - Encourage help-seeking when appropriate

2. **Motivation Maintenance**
   - Celebrate challenge completions
   - Share interesting solutions anonymously
   - Provide regular progress feedback

## Support and Community

- **Technical Issues**: Check repository issues page
- **Pedagogical Questions**: CodeQuest educator community
- **Customization Support**: Contributor guidelines

Ready to deploy CodeQuest in your classroom? Start with the technical setup, then focus on student onboarding and progress monitoring!