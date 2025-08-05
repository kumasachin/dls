#!/bin/bash

# Demo script to test the version management system
# This script will simulate what happens when you make a commit on main branch

echo "🧪 Testing Version Management System"
echo "====================================="
echo ""

echo "Current branch: $(git rev-parse --abbrev-ref HEAD)"
echo "Current version: $(node -p "require('./package.json').version")"
echo ""

echo "📝 Making a demo change to trigger version management..."

# Create a dummy change
echo "// Demo change at $(date)" >> src/test-demo.ts

echo "✅ Demo change made. Now testing the commit process..."
echo ""

# Stage the change
git add src/test-demo.ts

echo "🔄 Staging change and attempting commit (this will trigger version prompt)..."
echo ""
echo "Note: The version management script will prompt you to choose:"
echo "1) patch (1.0.0 → 1.0.1) - for bug fixes"
echo "2) minor (1.0.0 → 1.1.0) - for new features"  
echo "3) major (1.0.0 → 2.0.0) - for breaking changes"
echo "4) custom - for specific versions"
echo "5) skip - to not update version"
echo ""
echo "Try choosing option 1 (patch) to see the system in action!"
echo ""

# Show the current state
git status

echo ""
echo "⚡ Ready to commit! Run: git commit -m \"test: demo version management\""
echo "   This will trigger the interactive version prompt."
