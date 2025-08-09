# Development Tools

This design system uses a few key tools to maintain code quality and developer experience.

## Biome for Code Quality

We use [Biome](https://biomejs.dev/) instead of ESLint and Prettier because it's much faster and handles both linting and formatting.

### Commands

```bash
# Check code quality
npm run check:biome

# Auto-fix issues
npm run check:biome:fix

# Format code
npm run format:biome:fix

# Lint only
npm run lint:biome:fix
```

### Why Biome?

- Much faster than ESLint + Prettier combination
- Handles linting, formatting, and import sorting in one tool
- Works well out of the box
- Better error messages
- Good TypeScript support

## Type Validation with Zod

We use type validation at runtime for important component props to catch issues early.

```typescript
import { validateComponentProps, ButtonPropsSchema } from './utils/validation';

// Validate props at runtime
const validatedProps = validateComponentProps(ButtonPropsSchema, props, 'Button');
```

### Features

- Runtime type checking for component props
- Theme validation for consistent design tokens
- Development warnings for invalid props (won't break production)
- Design token validation to prevent invalid CSS values

## Performance Monitoring with Web Vitals

Track real user performance metrics and component render times.

```typescript
import { webVitalsTracker, checkPerformanceBudget } from './utils/webVitals';

// Check if performance budgets are met
checkPerformanceBudget({
  LCP: 2500, // Largest Contentful Paint
  FID: 100, // First Input Delay
  CLS: 0.1, // Cumulative Layout Shift
});

// Get current metrics
const metrics = webVitalsTracker.getMetrics();
```

### Tracked Metrics

- **LCP**: Largest Contentful Paint
- **FID**: First Input Delay
- **CLS**: Cumulative Layout Shift
- **FCP**: First Contentful Paint
- **TTFB**: Time to First Byte
- **Component Performance**: Individual component render times

## Error Boundaries

Production-ready error handling prevents component failures from breaking your app.

```tsx
import { ComponentErrorBoundary, withErrorBoundary } from './components/ErrorBoundary';

// Wrap components for safety
const SafeButton = withErrorBoundary(Button, {
  fallback: <div>Button unavailable</div>,
});

// Or use the boundary directly
<ComponentErrorBoundary componentName="CustomComponent">
  <CustomComponent />
</ComponentErrorBoundary>;
```

### Features

- Component isolation - one broken component won't crash the app
- Themed fallback UI matches your design system
- Development debugging with detailed error information
- Error tracking ready for production monitoring

## Strict TypeScript

Enhanced type safety catches more bugs at compile time.

### Enabled Strict Checks

- `strict: true` - Maximum type safety
- `noImplicitReturns` - All code paths must return
- `noImplicitOverride` - Explicit override modifiers
- `exactOptionalPropertyTypes` - Precise optional types
- `noUncheckedIndexedAccess` - Safe array/object access

### Progressive Migration

```bash
# Check current TypeScript errors
npm run type-check

# Watch mode for continuous checking
npm run type-check:watch
```

## Automated Dependencies with Renovate

Keep dependencies updated automatically with intelligent grouping and scheduling.

### Configuration Highlights

- Scheduled updates every Monday morning
- Auto-merge for patches and dev dependencies
- Grouped updates by ecosystem (React, Testing, Storybook)
- Security alerts processed immediately
- Smart dependency grouping reduces PR noise

### Package Groups

- **React ecosystem**: `react`, `@types/react`
- **Testing**: `@testing-library/*`, `vitest`, `jest`
- **Storybook**: `@storybook/*`, `storybook`
- **TypeScript**: `typescript`, `@types/*`
- **Linting**: `eslint`, `prettier`, `@biomejs/biome`

## Quick Start

### Daily Development

```bash
# Start with quality checks (fast with Biome)
npm run quality:biome:fix

# Develop with hot reload
npm run dev

# View components in Storybook
npm run storybook
```

### Pre-commit Workflow

```bash
# Run all quality checks
npm run quality:biome

# Build for production
npm run build

# Run tests
npm run test:run
```

### CI/CD Integration

```bash
# Full CI pipeline
npm run ci
```

## Performance Benefits

### Speed Improvements

- **Biome**: Much faster than ESLint + Prettier
- **Zod**: Runtime validation with minimal overhead
- **Web Vitals**: Low impact performance monitoring
- **Error Boundaries**: Minimal performance cost

### Bundle Size Impact

- **Zod**: ~14KB gzipped (can be tree-shaken)
- **Web Vitals**: ~2KB gzipped
- **Error Boundaries**: No additional bundle size

## Migration from Legacy Tools

### From ESLint + Prettier to Biome

```bash
# Old workflow
npm run lint:fix && npm run format

# New workflow (faster)
npm run check:biome:fix
```

### Gradual Adoption

You can run both tools side by side during migration:

```bash
# Use legacy tools
npm run quality

# Use new Biome-based workflow
npm run quality:biome
```

## Best Practices

### 1. Error Boundary Usage

- Wrap all public components with error boundaries
- Provide meaningful fallback UI
- Use themed fallbacks that match your design system

### 2. Performance Monitoring

- Set performance budgets for critical metrics
- Monitor component render times in development
- Track real user metrics in production

### 3. Type Safety

- Use Zod schemas for critical component props
- Validate design tokens at build time
- Enable strict TypeScript progressively

### 4. Code Quality

- Use Biome for faster development experience
- Set up pre-commit hooks for quality checks
- Leverage automated dependency updates

## Additional Resources

- [Biome Documentation](https://biomejs.dev/)
- [Zod Documentation](https://zod.dev/)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Renovate Configuration](https://docs.renovatebot.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

This tooling stack helps keep the design system maintainable and reliable.
