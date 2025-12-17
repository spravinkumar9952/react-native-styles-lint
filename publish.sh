#!/bin/bash

# Publishing script for @spravinkumar9952/react-native-styles-lint

echo "🚀 Publishing @spravinkumar9952/react-native-styles-lint"
echo ""

# Check if logged in
if ! npm whoami &> /dev/null; then
  echo "❌ Not logged into npm. Please run: npm login"
  exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Build the package
echo "📦 Building package..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "✅ Build successful!"
echo ""

# Show what will be published
echo "📋 Files that will be published:"
npm pack --dry-run 2>/dev/null | grep -A 100 "Tarball Contents" || echo "Run 'npm pack --dry-run' to see contents"

echo ""
read -p "Continue with publish? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ Publish cancelled"
  exit 1
fi

# Publish
echo "🚀 Publishing to npm..."
npm publish --access public

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Successfully published!"
  echo ""
  echo "📦 Package: @spravinkumar9952/react-native-styles-lint"
  echo "🌐 View at: https://www.npmjs.com/package/@spravinkumar9952/react-native-styles-lint"
else
  echo ""
  echo "❌ Publish failed!"
  exit 1
fi

