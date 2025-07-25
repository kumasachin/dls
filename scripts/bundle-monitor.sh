#!/bin/bash
# Bundle Size Monitor - Track bundle size changes

BUNDLE_SIZE_FILE="bundle-size.json"
DIST_DIR="dist"

echo "📊 Bundle Size Analysis"
echo "====================="

# Build the project
echo "Building project..."
npm run build > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Get current bundle size
CURRENT_SIZE=$(find $DIST_DIR -name "*.js" -type f -exec wc -c {} + | awk '{total += $1} END {print total}')
CURRENT_GZIP_SIZE=$(find $DIST_DIR -name "*.js" -type f -exec gzip -c {} \; | wc -c)

echo "Current bundle size: $(($CURRENT_SIZE / 1024))KB"
echo "Current gzipped size: $(($CURRENT_GZIP_SIZE / 1024))KB"

# Check if we have previous data
if [ -f "$BUNDLE_SIZE_FILE" ]; then
    PREVIOUS_SIZE=$(cat $BUNDLE_SIZE_FILE | grep -o '"size":[0-9]*' | cut -d':' -f2)
    PREVIOUS_GZIP_SIZE=$(cat $BUNDLE_SIZE_FILE | grep -o '"gzipSize":[0-9]*' | cut -d':' -f2)
    
    SIZE_DIFF=$((CURRENT_SIZE - PREVIOUS_SIZE))
    GZIP_DIFF=$((CURRENT_GZIP_SIZE - PREVIOUS_GZIP_SIZE))
    
    echo ""
    echo "📈 Size comparison:"
    echo "Bundle size change: $(($SIZE_DIFF / 1024))KB"
    echo "Gzipped size change: $(($GZIP_DIFF / 1024))KB"
    
    # Alert if bundle grew significantly
    if [ $SIZE_DIFF -gt 51200 ]; then  # 50KB threshold
        echo "⚠️  WARNING: Bundle size increased by more than 50KB!"
    fi
else
    echo "🆕 First run - baseline established"
fi

# Save current data
cat > $BUNDLE_SIZE_FILE << EOF
{
  "size": $CURRENT_SIZE,
  "gzipSize": $CURRENT_GZIP_SIZE,
  "timestamp": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
}
EOF

echo ""
echo "✅ Bundle analysis complete. Data saved to $BUNDLE_SIZE_FILE"
