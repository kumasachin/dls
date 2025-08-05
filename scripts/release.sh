#!/bin/bash

# Release workflow script for DLS
# This script handles the complete release process including version updates, building, and publishing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 DLS Release Workflow${NC}"
echo "=========================="
echo ""

# Check if we're on main branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$current_branch" != "main" ]; then
    echo -e "${RED}❌ Error: You must be on the main branch to create a release.${NC}"
    echo -e "${YELLOW}💡 Switch to main branch with: git checkout main${NC}"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Error: You have uncommitted changes.${NC}"
    echo -e "${YELLOW}💡 Commit or stash your changes before creating a release.${NC}"
    exit 1
fi

# Check if we're up to date with remote
echo -e "${BLUE}🔄 Checking if branch is up to date...${NC}"
git fetch origin

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

if [ $LOCAL != $REMOTE ]; then
    echo -e "${RED}❌ Error: Your branch is not up to date with origin/main.${NC}"
    echo -e "${YELLOW}💡 Pull the latest changes with: git pull origin main${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Branch is up to date.${NC}"
echo ""

# Run version update
echo -e "${BLUE}📦 Version Update${NC}"
echo "=================="
./scripts/version-update.sh

# Check if version was actually updated
if git diff --cached --name-only | grep -q "package.json"; then
    new_version=$(node -p "require('./package.json').version")
    echo ""
    echo -e "${BLUE}🔨 Building library for v${new_version}...${NC}"
    
    # Run quality checks and build
    npm run ci
    npm run build:lib
    
    echo ""
    echo -e "${BLUE}📤 Publishing to npm...${NC}"
    
    # Publish to npm
    npm publish --access public
    
    echo ""
    echo -e "${GREEN}✅ Successfully published v${new_version} to npm!${NC}"
    echo ""
    echo -e "${BLUE}🏷️  Creating git tag...${NC}"
    
    # Commit the version change
    git commit -m "Release v${new_version}

- Update package version to ${new_version}
- Published to npm registry"
    
    # Create and push tag
    git tag -a "v${new_version}" -m "Release version ${new_version}"
    
    echo -e "${BLUE}📤 Pushing changes and tags...${NC}"
    git push origin main
    git push origin --tags
    
    echo ""
    echo -e "${GREEN}🎉 Release v${new_version} completed successfully!${NC}"
    echo ""
    echo -e "${YELLOW}📋 Release Summary:${NC}"
    echo "• Version: v${new_version}"
    echo "• Published to: https://www.npmjs.com/package/@kumasachin/dls"
    echo "• Git tag: v${new_version}"
    echo "• Installation: npm install @kumasachin/dls@${new_version}"
else
    echo -e "${YELLOW}⏭️  No version update. Release cancelled.${NC}"
fi
