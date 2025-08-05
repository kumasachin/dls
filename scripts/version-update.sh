#!/bin/bash

# Version update script for DLS
# This script prompts for version updates when committing to main branch

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're on main branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$current_branch" != "main" ]; then
    echo -e "${BLUE}ℹ️  Not on main branch. Skipping version update.${NC}"
    exit 0
fi

# Check if running in non-interactive mode (CI/CD)
if [ ! -t 0 ]; then
    echo -e "${BLUE}ℹ️  Non-interactive mode detected. Skipping version update.${NC}"
    exit 0
fi

# Get current version from package.json
current_version=$(node -p "require('./package.json').version")

echo -e "${BLUE}📦 Current version: ${YELLOW}v${current_version}${NC}"
echo ""
echo -e "${YELLOW}Would you like to update the version? ${NC}"
echo "1) patch (bug fixes) - increment last number (e.g., 1.0.0 → 1.0.1)"
echo "2) minor (new features) - increment middle number (e.g., 1.0.0 → 1.1.0)"
echo "3) major (breaking changes) - increment first number (e.g., 1.0.0 → 2.0.0)"
echo "4) custom - enter a specific version"
echo "5) skip - don't update version"
echo ""

while true; do
    read -p "Choose an option (1-5): " choice
    case $choice in
        1)
            echo -e "${GREEN}🔧 Bumping patch version...${NC}"
            npm version patch --no-git-tag-version
            new_version=$(node -p "require('./package.json').version")
            echo -e "${GREEN}✅ Updated to v${new_version}${NC}"
            git add package.json
            break
            ;;
        2)
            echo -e "${GREEN}✨ Bumping minor version...${NC}"
            npm version minor --no-git-tag-version
            new_version=$(node -p "require('./package.json').version")
            echo -e "${GREEN}✅ Updated to v${new_version}${NC}"
            git add package.json
            break
            ;;
        3)
            echo -e "${GREEN}💥 Bumping major version...${NC}"
            npm version major --no-git-tag-version
            new_version=$(node -p "require('./package.json').version")
            echo -e "${GREEN}✅ Updated to v${new_version}${NC}"
            git add package.json
            break
            ;;
        4)
            read -p "Enter custom version (e.g., 2.1.3-beta.1): " custom_version
            if [[ $custom_version =~ ^[0-9]+\.[0-9]+\.[0-9]+.*$ ]]; then
                npm version $custom_version --no-git-tag-version
                echo -e "${GREEN}✅ Updated to v${custom_version}${NC}"
                git add package.json
                break
            else
                echo -e "${RED}❌ Invalid version format. Please use semantic versioning (e.g., 1.2.3)${NC}"
            fi
            ;;
        5)
            echo -e "${YELLOW}⏭️  Skipping version update.${NC}"
            break
            ;;
        *)
            echo -e "${RED}❌ Invalid choice. Please enter 1, 2, 3, 4, or 5.${NC}"
            ;;
    esac
done

echo ""
