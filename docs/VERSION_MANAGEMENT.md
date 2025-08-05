# Version Management & Release Workflow

This document describes the automated version management and release workflow for the DLS (Design System Library).

## Overview

The DLS project now includes automated version management that prompts for version updates on every commit to the main branch. This ensures consistent versioning and helps maintain proper semantic versioning practices.

## How It Works

### Automatic Version Prompts

When you commit changes to the main branch, the pre-commit hook will automatically prompt you to update the version:

1. **Patch Version** (1.0.0 → 1.0.1) - For bug fixes and small improvements
2. **Minor Version** (1.0.0 → 1.1.0) - For new features that are backward compatible
3. **Major Version** (1.0.0 → 2.0.0) - For breaking changes
4. **Custom Version** - Enter a specific version (supports pre-release versions like 1.0.0-beta.1)
5. **Skip** - Don't update the version for this commit

### Automatic Git Tagging

When a version is updated, the post-commit hook automatically creates a git tag with the new version number (e.g., `v1.0.1`).

## Usage

### Regular Development Workflow

```bash
# Make your changes
git add .
git commit -m "Add new Button variant"

# The pre-commit hook will prompt:
# "Would you like to update the version?"
# Choose the appropriate option (1-5)

# If you chose to update the version:
# - package.json is automatically updated
# - A git tag is created after the commit
```

### Manual Version Update

If you want to update the version without committing:

```bash
npm run version-update
```

### Complete Release Workflow

For a full release with building, testing, and publishing to npm:

```bash
npm run release
```

This script will:

1. Check that you're on the main branch
2. Verify no uncommitted changes exist
3. Ensure the branch is up to date with remote
4. Prompt for version update
5. Run quality checks and build the library
6. Publish to npm
7. Create and push git tags
8. Push changes to remote repository

## Semantic Versioning Guidelines

### Patch (x.x.X)

- Bug fixes
- Documentation updates
- Performance improvements
- Code refactoring (no API changes)

**Example commit messages:**

- `fix: resolve Button hover state issue`
- `docs: update installation instructions`
- `perf: optimize bundle size`

### Minor (x.X.x)

- New features
- New components
- New props or options
- Deprecations (with backward compatibility)

**Example commit messages:**

- `feat: add new Toast component`
- `feat: add size prop to Button component`
- `feat: add dark theme support`

### Major (X.x.x)

- Breaking changes
- Removed features
- Major API changes
- Updated peer dependencies with breaking changes

**Example commit messages:**

- `feat!: redesign Button API with breaking changes`
- `feat!: remove deprecated components`
- `feat!: upgrade to React 19 (breaking change)`

## Branch Protection

The version management system only activates on the main branch. Feature branches and other branches skip the version update prompt automatically.

## Scripts Reference

| Script                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `npm run version-update` | Manually trigger version update prompt                   |
| `npm run release`        | Complete release workflow (version, build, publish, tag) |

## Git Hooks

| Hook          | Purpose                                                      |
| ------------- | ------------------------------------------------------------ |
| `pre-commit`  | Prompts for version updates on main branch, runs lint-staged |
| `post-commit` | Creates git tags when version is updated                     |
| `pre-push`    | Runs quality checks before pushing                           |

## Troubleshooting

### Version Update Not Triggered

- Ensure you're on the main branch: `git branch`
- Check if the script is executable: `ls -la scripts/version-update.sh`

### Release Script Fails

- Ensure you're logged into npm: `npm whoami`
- Check if you have write permissions to the package
- Verify no uncommitted changes: `git status`

### Git Tags Not Created

- Check if the post-commit hook is executable: `ls -la .husky/post-commit`
- Verify the version was actually changed in package.json

## Best Practices

1. **Always use meaningful commit messages** that clearly describe the change
2. **Choose the appropriate version bump** based on the type of change
3. **Use the release script for important releases** to ensure quality checks pass
4. **Review the generated changelog** and update it if necessary
5. **Test the package locally** before releasing major versions

## Integration with CI/CD

The workflow is designed to work with both local development and CI/CD pipelines. The version prompts only appear in interactive terminals, making it safe for automated environments.
