# 🎮 CodeQuest 2.3 - Complete Student Guide

## Quick Start (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/your-org/codequest.git
cd codequest

# 2. Install and setup
npm install
npm link

# 3. Start your learning journey
npm run control-room
# Open browser: http://localhost:3000/roadmap
```

---

## 🎯 What is CodeQuest?

CodeQuest is a **gamified learning platform** for mastering JavaScript/TypeScript with Test-Driven Development (TDD). Instead of boring tutorials, you'll progress through **game-like levels** (scenes) that teach real programming skills.

### 🌟 Key Features
- **Visual Game Roadmap**: See your progress like in a video game
- **TDD Methodology**: Learn industry-standard development practices  
- **Git-Centric Workflow**: Real-world version control integration
- **Instant Validation**: Get immediate feedback on your code
- **Help System**: Context-aware hints when you're stuck

---

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js 16+** (check with `node --version`)
- **Git** (check with `git --version`)
- **Text Editor** (VS Code, Sublime, etc.)
- **Terminal/Command Line** access

---

## 🚀 Installation & Setup

### Step 1: Clone CodeQuest
```bash
# Option A: Clone from repository
git clone https://github.com/your-org/codequest.git
cd codequest

# Option B: Download and extract ZIP
# Then navigate to the folder
cd codequest
```

### Step 2: Install Dependencies
```bash
# Install required packages
npm install

# Make CLI available globally
npm link

# Verify installation
cq --help
```

**Expected Output:**
```
CodeQuest 2.3 MVP
Commands:
  cq validate          - Validate current scene
  cq help-me <scene>   - Get help for scene
  cq challenge-mode    - Enter challenge mode
```

### Step 3: Initialize Git (if needed)
```bash
# Set up git identity
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Create initial commit
git add .
git commit -m "Initial CodeQuest setup"
```

---

## 🗺️ Launch the Game Roadmap

### Start the Control Room
```bash
# Launch the visual interface
npm run control-room
```

### Access Your Roadmap
Open your browser and go to:
**http://localhost:3000/roadmap**

You'll see:
- 🗺️ **Visual Learning Path**: Game-like progression through scenes
- 📊 **Progress Stats**: Completion percentage, scores, streaks
- 🏆 **Achievement Levels**: Base, Bonus, Challenge completions
- 🎯 **Current Focus**: Highlighted next scene to tackle

---

## 🎮 How to Play CodeQuest

### The Learning Path (Act I)
```
🗺️ Act I: JavaScript Fundamentals & TDD
├── 01. N00-intro          → JavaScript Fundamentals
├── 02. N01-functions      → Functions & Scope  
├── 03. N02-arrays-objects → Arrays & Objects
├── 04. N03-async          → Async Programming
├── 05. N04-error-handling → Error Handling
├── 06. N05-testing        → Testing Fundamentals
└── 07. N06-tdd           → TDD Methodology
```

### Scene Completion Workflow

#### 1. Start a New Scene
```bash
# Create a git branch for the scene
git checkout -b scene/N00-intro

# Navigate to the scene directory
cd acts/act1/N00-intro

# Read the challenge instructions
cat README.md
```

#### 2. Understand the Challenge
Each scene contains:
- **README.md**: Instructions and learning objectives
- **solution.js**: Template with TODO items to complete
- **test.js**: Test suite that validates your solution
- **hints.json**: Progressive hints if you get stuck

#### 3. Work on Your Solution
```bash
# Open solution.js in your editor
# Example: VS Code
code solution.js

# Complete the TODO items
# Follow the instructions in README.md
```

#### 4. Test Your Implementation
```bash
# Run the tests to check your solution
node test.js
```

**Example Output (Success):**
```
✅ add(2, 3) returns 5
✅ isEven(4) returns true
✅ greet("Alice") returns "Hello, Alice!"

📊 Results: 13/13 tests passed
🎉 All tests passed!
```

#### 5. Validate with CodeQuest
```bash
# Go back to project root
cd /path/to/codequest

# Validate your progress
cq validate
```

**Possible Results:**
- 🟢 **Base**: Basic requirements met
- 🟡 **Bonus**: Code quality improvements achieved
- 🔴 **Challenge**: Advanced implementation completed

#### 6. Commit Your Progress
```bash
# Add and commit your work
git add .
git commit -m "Complete N00-intro: JavaScript fundamentals

- Implemented all required functions
- All tests passing
- Achieved bonus criteria with JSDoc comments"
```

#### 7. Move to Next Scene
```bash
# Create branch for next scene
git checkout -b scene/N01-functions

# Continue the journey
cd acts/act1/N01-functions
```

---

## 🆘 Getting Help

### Built-in Help System
```bash
# Get contextual hints for current scene
cq help-me N00-intro

# Output includes:
# - Progressive hints
# - Code examples
# - Environment information
```

### Help Request Process
When you use `cq help-me`, CodeQuest automatically:
1. **Captures Context**: Git status, environment, error details
2. **Provides Hints**: Progressive assistance from general to specific
3. **Logs Request**: Makes it available to instructors in Control Room

### Available Resources
- **Scene README**: Detailed instructions and objectives
- **Test Files**: Review test.js to understand requirements exactly
- **Hints Files**: Progressive assistance in hints.json
- **Control Room**: Visual progress tracking at localhost:3000

---

## 📊 Progress Tracking

### Visual Roadmap Features
- **Completed Scenes**: Green with golden glow effect
- **Current Scene**: Blue with pulsing animation
- **Locked Scenes**: Gray with lock icons
- **Progress Bar**: Overall completion percentage
- **Player Stats**: Level, score, streak counters

### Status Levels
- **🟢 Base (70 points)**: Tests pass, basic requirements met
- **🟡 Bonus (100 points)**: Better code quality, additional features
- **🔴 Challenge (150 points)**: Advanced implementation, optimization

### Achievement System
- **Player Level**: Increases with scene completions
- **Total Score**: Points from all completed scenes
- **Streak Counter**: Consecutive successful completions

---

## 🔧 Commands Reference

### CLI Commands
```bash
# Validate current scene progress
cq validate

# Get help for specific scene
cq help-me N00-intro

# Enter challenge mode (future feature)
cq challenge-mode
```

### NPM Scripts
```bash
# Start Control Room interface
npm run control-room

# Run all scene tests
npm test

# Run specific scene test
cd acts/act1/N00-intro && node test.js
```

### Git Commands
```bash
# Create scene branch
git checkout -b scene/SCENE-ID

# Check current branch
git branch --show-current

# View progress
git log --oneline

# Switch branches
git checkout scene/N01-functions
```

---

## 🎯 Success Tips

### 1. Read First, Code Second
- Always read README.md completely before starting
- Understand the learning objectives
- Review the test file to see expected behavior

### 2. Test-Driven Approach
- Run tests frequently: `node test.js`
- Make tests pass incrementally
- Understand why tests fail before fixing

### 3. Aim Higher
- Don't settle for just "base" completion
- Try to achieve "bonus" or "challenge" levels
- Extra effort = better learning + higher scores

### 4. Use Help Wisely
- Try solving independently first
- Use hints progressively (don't jump to final hint)
- `cq help-me SCENE-ID` provides contextual assistance

### 5. Git Best Practices
- Use descriptive commit messages
- Commit frequently (small changes)
- One scene = one branch = focused learning

### 6. Learn from Tests
- Tests are specifications - they tell you exactly what to build
- Read test descriptions carefully
- Test failures are learning opportunities

---

## 🚨 Troubleshooting

### Common Issues & Solutions

#### "Command 'cq' not found"
```bash
# Solution 1: Re-link the CLI
npm link

# Solution 2: Install globally
npm install -g .

# Solution 3: Run directly
node src/cli/index.js validate
```

#### "Tests failing unexpectedly"
```bash
# Check you're in the right directory
pwd  # Should show scene directory

# Verify git branch
git branch --show-current  # Should match scene

# Check file syntax
node -c solution.js
```

#### "Git branch not detected"
```bash
# Ensure you're in a scene branch
git checkout -b scene/N00-intro

# Verify from project root
cd /path/to/codequest
cq validate
```

#### "Control Room won't start"
```bash
# Check port availability
lsof -ti:3000

# Kill existing processes
kill $(lsof -ti:3000)

# Try alternative port
PORT=3001 npm run control-room
```

#### "Node.js version issues"
```bash
# Check version (needs 16+)
node --version

# Update if necessary (using nvm)
nvm install 16
nvm use 16
```

---

## 📈 Tracking Your Progress

### Control Room Dashboard
1. **Main Dashboard**: http://localhost:3000
   - Detailed progress statistics
   - Help request history
   - Export functionality

2. **Game Roadmap**: http://localhost:3000/roadmap
   - Visual scene progression
   - Interactive level map
   - Achievement tracking

### Progress Data Location
Your progress is stored in:
```
codequest/
├── data/
│   ├── progress/
│   │   └── user-progress.json     # Your completion data
│   └── help-requests/
│       └── help-*.json            # Your help requests
```

### Exporting Progress
1. Open Control Room: http://localhost:3000
2. Click "Export Data" button
3. Downloads JSON file with all your progress

---

## 🎓 Learning Outcomes

By completing CodeQuest Act I, you'll master:

### Technical Skills
- ✅ **JavaScript ES6+**: Modern syntax and features
- ✅ **Functions & Scope**: Closures, higher-order functions
- ✅ **Data Structures**: Arrays, objects, manipulation techniques
- ✅ **Async Programming**: Promises, async/await, error handling
- ✅ **Testing**: Writing and running test suites
- ✅ **TDD Methodology**: Red-Green-Refactor cycle

### Professional Skills
- ✅ **Git Workflow**: Branch-based development
- ✅ **Problem Solving**: Systematic debugging approach
- ✅ **Code Quality**: Clean, readable, maintainable code
- ✅ **Documentation**: JSDoc and inline comments
- ✅ **Testing Mindset**: Test-first development approach

---

## 🎉 Completion & Next Steps

### After Finishing Act I
1. **Celebrate!** You've mastered JavaScript fundamentals with TDD
2. **Review Your Progress**: Check the Control Room for final stats
3. **Prepare for Act II**: Advanced topics and real-world projects

### Act II Preview (Coming Soon)
- Advanced JavaScript patterns
- Framework integration
- Full-stack development
- Team collaboration features

---

## 📚 Additional Resources

### Documentation
- **Getting Started**: `docs/GETTING_STARTED.md`
- **Contributing**: `docs/CONTRIBUTING.md`
- **Instructor Guide**: `docs/INSTRUCTOR_GUIDE.md`

### Support
- **Issues**: Report bugs or suggest features
- **Community**: Connect with other CodeQuest learners
- **Updates**: Check for new releases

---

## ⚡ Quick Reference Card

```bash
# Setup (once)
git clone <repo> && cd codequest
npm install && npm link

# Start Session
npm run control-room              # Launch roadmap
open http://localhost:3000/roadmap

# Scene Workflow
git checkout -b scene/N00-intro   # Start scene
cd acts/act1/N00-intro           # Navigate
cat README.md                    # Read challenge
# [Edit solution.js]             # Code solution
node test.js                     # Test solution
cd ../../../                     # Back to root
cq validate                      # Validate
git add . && git commit -m "..."  # Commit progress

# Help & Debug
cq help-me N00-intro             # Get hints
cq validate                      # Check progress
npm test                         # Run all tests
```

---

**Ready to start your CodeQuest adventure?** 

🚀 **Begin with:** `npm run control-room` → Open http://localhost:3000/roadmap

Happy coding! 🎮✨