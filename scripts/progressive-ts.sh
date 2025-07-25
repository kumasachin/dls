#!/bin/bash
# Progressive TypeScript Strictness Enhancement Script

echo "🔧 Progressive TypeScript Strictness Enhancement"
echo "=============================================="

# Function to test TypeScript compilation
test_typescript() {
    echo "Testing TypeScript compilation..."
    if npm run type-check > /dev/null 2>&1; then
        echo "✅ TypeScript compilation successful"
        return 0
    else
        echo "❌ TypeScript compilation failed"
        return 1
    fi
}

# Function to update tsconfig setting
update_tsconfig() {
    local setting=$1
    local value=$2
    echo "Enabling $setting: $value"
    
    # Create a backup
    cp tsconfig.app.json tsconfig.app.json.backup
    
    # Update the setting using sed
    sed -i '' "s/\"$setting\": false/\"$setting\": $value/g" tsconfig.app.json
    
    if test_typescript; then
        echo "✅ $setting enabled successfully"
        rm tsconfig.app.json.backup
    else
        echo "❌ $setting caused errors, reverting..."
        mv tsconfig.app.json.backup tsconfig.app.json
    fi
}

echo ""
echo "Phase 1: Testing current configuration..."
test_typescript

echo ""
echo "Phase 2: Attempting to enable exactOptionalPropertyTypes..."
update_tsconfig "exactOptionalPropertyTypes" "true"

echo ""
echo "Phase 3: Attempting to enable noPropertyAccessFromIndexSignature..."
update_tsconfig "noPropertyAccessFromIndexSignature" "true"

echo ""
echo "Phase 4: Attempting to enable noUncheckedIndexedAccess..."
update_tsconfig "noUncheckedIndexedAccess" "true"

echo ""
echo "🎉 Progressive TypeScript enhancement complete!"
echo "Run 'npm run type-check' to verify all settings are working."
