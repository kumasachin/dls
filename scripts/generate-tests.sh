#!/bin/bash
# Generate unit tests for all components

echo "🧪 Generating Unit Tests for All Components"
echo "=========================================="

# Get all component files
COMPONENTS=$(find src/atomic -name "*.tsx" -not -name "*.test.tsx" -not -name "*.stories.tsx")

echo "Found components:"
echo "$COMPONENTS"

echo ""
echo "Generating tests..."

# Counter for tracking progress
count=0
total=$(echo "$COMPONENTS" | wc -l)

for component_file in $COMPONENTS; do
    ((count++))
    
    # Extract component info
    component_dir=$(dirname "$component_file")
    component_name=$(basename "$component_file" .tsx)
    test_file="${component_dir}/${component_name}.test.tsx"
    
    # Skip if test already exists
    if [ -f "$test_file" ]; then
        echo "[$count/$total] ✅ $component_name (test exists)"
        continue
    fi
    
    echo "[$count/$total] 🔧 Generating test for $component_name..."
    
    # Create basic test template
    cat > "$test_file" << EOF
import { render, screen } from '@testing-library/react'
import { ${component_name} } from './${component_name}'

describe('${component_name} Component', () => {
  it('renders without crashing', () => {
    // TODO: Add proper props based on component interface
    render(<${component_name} />)
    // TODO: Add specific assertions
  })

  // TODO: Add more specific tests based on component functionality
})
EOF
    
    echo "    Generated: $test_file"
done

echo ""
echo "🎉 Test generation complete!"
echo "📝 Remember to:"
echo "  1. Add proper props to each test based on component interfaces"
echo "  2. Add specific test cases for component functionality"
echo "  3. Run 'npm run test' to validate all tests"
