// Setup script to create the ESLint plugin wrapper
const fs = require('fs');
const path = require('path');

const pluginDir = path.join(__dirname, 'node_modules', 'eslint-plugin-react-native-styles-lint');
const pluginFile = path.join(pluginDir, 'index.js');

// Create directory if it doesn't exist
if (!fs.existsSync(pluginDir)) {
  fs.mkdirSync(pluginDir, { recursive: true });
}

// Create the plugin file
fs.writeFileSync(pluginFile, "module.exports = require('@spravinkumar9952/react-native-styles-lint');\n");

console.log('✅ ESLint plugin wrapper created successfully');

