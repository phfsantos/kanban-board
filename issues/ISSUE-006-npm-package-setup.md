# ISSUE-006: NPM Package Configuration

## Severity
🔴 **HIGH** - Critical for npm distribution

## Description
The package is not properly configured for npm distribution and consumption by other projects.

## Current Issues

### 1. Missing Package.json Fields
```json
{
  "name": "kanban-board", // Too generic, likely taken
  "version": "1.1.1",
  "main": "dist/index.js", // Points to wrong location
  // Missing critical fields below
}
```

### 2. Missing Fields
- `module`: ES module entry point
- `types` or `typings`: TypeScript definitions
- `exports`: Modern package exports map
- `files`: Which files to include in npm package
- `engines`: Node version requirements
- `peerDependencies`: Lit should be peer dependency
- `publishConfig`: npm registry configuration
- `sideEffects`: For tree-shaking

### 3. Incorrect Entry Points
- `main` points to `dist/index.js` but build outputs to `build/`
- No TypeScript definitions exported
- No separate CJS/ESM builds

### 4. Build Output Issues
- TypeScript outputs to `build/`
- Rollup outputs to `dist/`
- Inconsistent structure
- Missing minified builds
- No source maps in dist

### 5. Missing Development Files
- No `.npmignore` file
- Will publish unnecessary files (src/, tests/, etc.)
- No prepublish checks

## Proposed Solution

### 1. Update Package.json
```json
{
  "name": "@your-scope/kanban-board",
  "version": "1.1.1",
  "description": "A kanban board web component for markdown files",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    },
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "sideEffects": [
    "*.css",
    "dist/index.js"
  ],
  "engines": {
    "node": ">=16.0.0"
  },
  "peerDependencies": {
    "lit": "^3.0.0"
  },
  "dependencies": {},
  "keywords": [
    "kanban",
    "web-component",
    "lit-element",
    "lit",
    "markdown",
    "task-board",
    "custom-element"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

### 2. Create .npmignore
```
# Source files
src/
build/

# Development files
node_modules/
*.log
.DS_Store

# Config files
tsconfig.json
rollup.config.mjs
.github/
.vscode/

# Testing
test/
*.test.ts
coverage/

# Documentation
docs/
*.md
!README.md
!LICENSE

# Assets for development only
assets/
index.html
```

### 3. Fix Build Process
```json
{
  "scripts": {
    "clean": "rimraf dist build",
    "build:ts": "tsc",
    "build:rollup": "rollup -c",
    "build": "npm run clean && npm run build:ts && npm run build:rollup",
    "prepublishOnly": "npm run build && npm test",
    "preversion": "npm test",
    "postversion": "git push && git push --tags"
  }
}
```

### 4. Update TypeScript Config
```json
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true
  }
}
```

### 5. Update Rollup Config
```javascript
export default {
  input: ['build/index.js'],
  output: {
    dir: 'dist/',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'build'
  }
}
```

### 6. Add Package Testing
```json
{
  "scripts": {
    "test:package": "npm pack --dry-run",
    "check:exports": "publint",
    "check:types": "tsc --noEmit"
  },
  "devDependencies": {
    "publint": "^0.2.0"
  }
}
```

## Files to Create
- `.npmignore`
- `CHANGELOG.md`
- `CONTRIBUTING.md`

## Files to Update
- `package.json`
- `tsconfig.json`
- `rollup.config.mjs`
- `README.md` (add installation/usage for npm)

## Validation Checklist
- [ ] `npm pack --dry-run` shows correct files
- [ ] TypeScript types are exported
- [ ] Can be imported as ESM
- [ ] Tree-shaking works
- [ ] Source maps are included
- [ ] Peer dependencies are correct
- [ ] Package name is available on npm
- [ ] README has npm installation instructions

## References
- [npm package.json documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [Package exports guide](https://nodejs.org/api/packages.html#package-entry-points)
- [Publishing to npm](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
