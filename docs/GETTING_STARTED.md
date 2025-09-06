# Getting Started with CodeQuest 2.3

Welcome to CodeQuest - a gamified learning platform for JavaScript/TypeScript with TDD methodology.

## Prerequisites

- Node.js 16+ 
- Git
- Terminal/Command Line
- Text editor (VS Code recommended)

## Installation

1. **Clone or download the CodeQuest repository**
   ```bash
   git clone https://github.com/your-org/codequest.git
   cd codequest
   ```

2. **Install and link the CLI globally**
   ```bash
   npm install
   npm link
   ```

3. **Verify installation**
   ```bash
   cq --help
   ```

## Your First Scene

1. **Navigate to Act I, Scene N00**
   ```bash
   cd acts/act1/N00-intro
   ```

2. **Create a git branch for this scene**
   ```bash
   git checkout -b scene/N00-intro
   ```

3. **Read the challenge instructions**
   ```bash
   cat README.md
   ```

4. **Edit the solution file**
   ```bash
   # Open solution.js in your editor
   # Complete the TODO items
   ```

5. **Test your solution**
   ```bash
   node test.js
   ```

6. **Validate with CodeQuest**
   ```bash
   cq validate
   ```

7. **Commit your progress**
   ```bash
   git add .
   git commit -m "Complete N00-intro: JavaScript fundamentals"
   ```

## Git-Centric Workflow

CodeQuest uses Git branches to track scenes:

- Create branch: `git checkout -b scene/SCENE-ID`
- Work on solution in the branch
- Use `cq validate` to check progress
- Commit when satisfied: `git commit -m "Complete SCENE-ID"`
- Move to next scene: `git checkout -b scene/NEXT-SCENE`

## CLI Commands

### `cq validate`
Validates your current scene implementation:
- Checks required files exist
- Runs test suite
- Determines completion status (base/bonus/challenge)
- Updates progress tracking

### `cq help-me <scene-id>`
Requests help for a specific scene:
- Provides context-aware hints
- Logs help request for instructor review
- Includes environment and git status information

### `cq challenge-mode`
Activates challenge mode for timed challenges and bonus scoring.

## Control Room

Monitor progress and help requests through the web interface:

```bash
npm run control-room
# Open http://localhost:3000
```

The control room shows:
- Overall progress statistics
- Individual scene completion status
- Recent help requests from students
- Activity monitoring

## Understanding Status Levels

- **Base**: Meets basic requirements, tests pass
- **Bonus**: Meets bonus criteria (better code quality, additional features)
- **Challenge**: Meets advanced criteria (optimization, comprehensive testing)

## Directory Structure

```
codequest/
├── acts/
│   └── act1/           # Act I: Foundation
│       ├── N00-intro/  # Scene directories
│       ├── N01-functions/
│       └── ...
├── src/
│   ├── cli/            # CLI implementation
│   ├── control-room/   # Web interface
│   └── schemas/        # Data validation schemas
├── data/
│   ├── progress/       # Your progress tracking
│   └── help-requests/  # Help request logs
└── docs/              # Documentation
```

## Act I Content Overview

- **N00: JavaScript Fundamentals** - Variables, functions, control flow
- **N01: Functions & Scope** - Closures, higher-order functions
- **N02: Arrays & Objects** - Data manipulation, functional programming
- **N03: Async Programming** - Promises, async/await, concurrency
- **N04: Error Handling** - try/catch, custom errors, resilience
- **N05: Testing Fundamentals** - Assertions, test frameworks
- **N06: TDD Methodology** - Red-Green-Refactor cycle

## Tips for Success

1. **Read the README** in each scene directory
2. **Start with failing tests** - embrace the TDD methodology
3. **Use hints sparingly** - try to solve independently first
4. **Ask for help** when truly stuck using `cq help-me`
5. **Commit frequently** - small, focused commits
6. **Aim for bonus/challenge** criteria when possible

## Getting Help

- Use `cq help-me <scene-id>` for automated hints
- Check the control room for instructor visibility
- Read documentation in `/docs` directory
- Review JSON schemas in `/src/schemas` for data structures

## Troubleshooting

### CLI not found after `npm link`
```bash
# Try installing globally
npm install -g .
```

### Tests failing unexpectedly
```bash
# Ensure you're in the correct scene directory
pwd
# Check git branch matches scene
git branch --show-current
```

### Control room not starting
```bash
# Check port availability (default: 3000)
lsof -ti:3000
# Kill process if needed
kill $(lsof -ti:3000)
```

Ready to start your CodeQuest journey? Begin with:

```bash
cd acts/act1/N00-intro
git checkout -b scene/N00-intro
cq validate
```