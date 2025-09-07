#!/bin/bash

# Script to create all Act I scenes structure
echo "🎮 Creating Act I scenes (N02-N06)..."

# N02: Pure functions & immutability
mkdir -p levels/act-1/N02-immutability/{starter,hints,solution}

# N03: Destructuring, rest/spread
mkdir -p levels/act-1/N03-destructuring/{starter,hints,solution}

# N04: Collections & transformations
mkdir -p levels/act-1/N04-collections/{starter,hints,solution}

# N05: Modules & composition
mkdir -p levels/act-1/N05-modules/{starter,hints,solution}

# N06: Boss - Integration
mkdir -p levels/act-1/N06-boss/{starter,hints,solution}

echo "✅ All scene directories created!"