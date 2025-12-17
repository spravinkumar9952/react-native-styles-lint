# Publishing Guide

## Pre-Publishing Checklist

1. ✅ Build the package (automatically runs before publish)
2. ✅ Update version number if needed
3. ✅ Update repository URLs in package.json (if you have a GitHub repo)
4. ✅ Test the package locally
5. ✅ Ensure you're logged into npm

## Steps to Publish

### 1. Check Package Name Availability

First, check if the package name is available on npm:

```bash
npm view eslint-plugin-react-native-styles-lint
```

If it returns a 404, the name is available. If it returns package info, the name is taken and you'll need to choose a different name.

### 2. Login to npm

If you haven't already, login to your npm account:

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email
- OTP (if 2FA is enabled)

### 3. Update Repository URLs (Optional but Recommended)

If you have a GitHub repository, update the `package.json`:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/react-native-styles-lint.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/react-native-styles-lint/issues"
  },
  "homepage": "https://github.com/yourusername/react-native-styles-lint#readme"
}
```

### 4. Build and Test

Build the package to ensure everything compiles:

```bash
npm run build
```

Test with the example project:

```bash
npm run test:example
```

### 5. Check What Will Be Published

See what files will be included in the package:

```bash
npm pack --dry-run
```

This creates a tarball and shows what will be published without actually publishing.

### 6. Publish to npm

#### For First Time Publishing:

```bash
npm publish
```

#### For Updates (after version bump):

```bash
# Update version first
npm version patch  # for 0.1.0 -> 0.1.1
# or
npm version minor  # for 0.1.0 -> 0.2.0
# or
npm version major  # for 0.1.0 -> 1.0.0

# Then publish
npm publish
```

### 7. Verify Publication

Check that your package is published:

```bash
npm view eslint-plugin-react-native-styles-lint
```

Or visit: https://www.npmjs.com/package/eslint-plugin-react-native-styles-lint

## Publishing Scoped Packages (Optional)

If you want to publish under your npm username scope:

1. Update package name in `package.json`:
   ```json
   {
     "name": "@yourusername/eslint-plugin-react-native-styles-lint"
   }
   ```

2. Publish with public access:
   ```bash
   npm publish --access public
   ```

## Troubleshooting

### Package name already taken
- Choose a different name or use a scoped package name

### Authentication errors
- Run `npm login` again
- Check if you have 2FA enabled and need to use an access token

### Build errors
- Run `npm run build` manually to see errors
- Ensure all dependencies are installed: `npm install`

### Permission errors
- Make sure you're logged in: `npm whoami`
- Verify you own the package name or use a scoped package

## After Publishing

1. Install and test your published package:
   ```bash
   npm install -D eslint-plugin-react-native-styles-lint
   ```

2. Update your README with installation instructions

3. Consider adding badges to your README:
   ```markdown
   [![npm version](https://badge.fury.io/js/eslint-plugin-react-native-styles-lint.svg)](https://badge.fury.io/js/eslint-plugin-react-native-styles-lint)
   ```

