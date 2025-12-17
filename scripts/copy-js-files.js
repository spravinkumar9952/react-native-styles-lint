const fs = require('fs');
const path = require('path');

/**
 * Copy JavaScript files from src to dist maintaining directory structure
 */
function copyJsFiles(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyJsFiles(srcPath, destPath);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      // Only copy .js files (not .ts files as they're compiled)
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy JS files from src to dist
const srcDir = path.join(__dirname, '..', 'src');
const distDir = path.join(__dirname, '..', 'dist');

if (fs.existsSync(srcDir)) {
  copyJsFiles(srcDir, distDir);
  console.log('✓ JavaScript files copied to dist/');
} else {
  console.error('✗ Source directory not found');
  process.exit(1);
}
