# CodeQuest 2.3 MVP

Gamified learning platform for JavaScript/TypeScript with TDD methodology.

## Quick Start

```bash
npm install
npm link
cq validate
```

## Commands

- `cq validate` - Validate current challenge progress
- `cq help-me <scene-id>` - Get help for a specific scene
- `cq challenge-mode` - Enter challenge mode (timed challenges)

## Directory Structure

```
codequest/
├── acts/
│   └── act1/           # Act I: Foundation (N00-N06)
├── src/
│   ├── cli/            # CLI tools
│   ├── control-room/   # Static control room
│   └── schemas/        # JSON validation schemas
├── data/               # User progress data
└── docs/              # Documentation
```

## Act I Content

- **N00**: JavaScript Fundamentals
- **N01**: Functions & Scope
- **N02**: Arrays & Objects
- **N03**: Async Programming
- **N04**: Error Handling
- **N05**: Testing Fundamentals
- **N06**: TDD Methodology

## Stack-Agnostic Design

CodeQuest works with any JavaScript runtime and testing framework. No external dependencies required.