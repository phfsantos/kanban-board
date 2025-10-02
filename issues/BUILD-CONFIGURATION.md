# Build Configuration Summary

## Overview

This project has **two separate build configurations** serving different purposes:

### 1. Main NPM Package Build (`rollup.config.mjs`)

**Purpose:** Create a modular npm package that can be installed and imported in other projects.

**Configuration:**
```javascript
{
  input: [
    'build/index.js',
    'build/controllers/kanban.js', 
    'build/view/Column.js',
    'build/view/Item.js',
    'build/view/DropZone.js'
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true
  },
  external: ['lit', 'lit/decorators.js', 'lit/directives/class-map.js'],
  treeshake: true // Default: enabled
}
```

**Key Features:**
- ✅ **Multiple entry points** - Each component is a separate file
- ✅ **preserveModules: true** - Maintains module structure for tree-shaking by consumers
- ✅ **Lit as external dependency** - Consumers provide their own Lit installation
- ✅ **Tree-shaking enabled** - Unused code can be removed by consumer bundlers
- ✅ **Component decorators preserved** - All `@customElement` decorators execute

**Output Structure:**
```
dist/
├── index.js              (exports all components)
├── controllers/
│   └── kanban.js
└── view/
    ├── Column.js         (@customElement("kanban-column"))
    ├── Item.js           (@customElement("kanban-item"))
    └── DropZone.js       (@customElement("kanban-dropzone"))
```

**Usage:**
```javascript
// Option 1: Import main component
import { KanbanBoard } from '@phfsantos/kanban-board';

// Option 2: Import individual components
import { Column, Item, DropZone } from '@phfsantos/kanban-board';

// Option 3: Import everything
import { KanbanBoard, Column, Item, DropZone } from '@phfsantos/kanban-board';
```

---

### 2. Demo Standalone Build (`rollup.demo.config.mjs`)

**Purpose:** Create a single-file bundle for direct use in HTML without npm/node_modules.

**Configuration:**
```javascript
{
  input: 'build/index.js',
  treeshake: false, // DISABLED - must include all components
  output: {
    file: 'dist/demo.js',
    format: 'esm'
  },
  plugins: [
    resolve(), // Bundles Lit into output
    terser({
      compress: false,
      mangle: false
    })
  ]
}
```

**Key Features:**
- ✅ **Single entry point** - Everything in one file
- ⚠️ **Tree-shaking disabled** - Required to preserve component registrations
- ✅ **Lit bundled** - No external dependencies needed
- ✅ **Minimal minification** - Preserves decorator side-effects

**Output:**
```
dist/
└── demo.js  (single file with Lit + all components)
```

**Usage:**
```html
<!DOCTYPE html>
<html>
<body>
    <kanban-board data="..."></kanban-board>
    <script src="./dist/demo.js" type="module"></script>
</body>
</html>
```

---

## Why Two Different Configurations?

### Main Build (NPM Package)
- **Optimized for distribution** - Consumers can tree-shake unused code
- **Smaller bundle size** - External Lit dependency shared across projects
- **Flexible imports** - Import only what you need
- **Better for production apps** - Integrates with modern build tools

### Demo Build (Standalone)
- **Optimized for simplicity** - Works without npm or build tools
- **Self-contained** - All dependencies bundled
- **Demos & prototypes** - Quick testing without installation
- **CDN-friendly** - Can be hosted and linked directly

---

## Tree-Shaking Issue Explanation

### The Problem

When tree-shaking is enabled for the demo build, Rollup removes "unused" code. Since the components are exported but never explicitly used in the demo bundle, Rollup incorrectly identifies them as dead code and removes the component class definitions.

### Why This Happens

1. **Export without usage**: Components are exported but the demo doesn't import them
2. **Decorator side-effects**: The `@customElement` decorators need to execute to register components
3. **Tree-shaking logic**: Rollup sees exports with no imports and removes them

### The Solution for Demo Build

**Disable tree-shaking** - Ensures all component code is included and decorators execute:

```javascript
treeshake: false
```

### Why Main Build Doesn't Have This Issue

1. **Module preservation** - `preserveModules: true` keeps components in separate files
2. **Explicit exports** - Each component file is an entry point
3. **Consumer responsibility** - Users importing components trigger their execution

---

## Testing Component Registration

You can verify component registration with this code:

```javascript
// Check if all components are registered
const components = [
  'kanban-board',
  'kanban-column', 
  'kanban-item',
  'kanban-dropzone'
];

components.forEach(name => {
  const isRegistered = customElements.get(name);
  console.log(`${name}: ${isRegistered ? '✓ registered' : '✗ not registered'}`);
});
```

---

## Build Commands

```bash
# Build npm package (main build)
npm run build

# Build standalone demo
npm run build:demo

# Build both
npm run build && npm run build:demo
```

---

## Key Takeaways

1. ✅ **Main npm bundle works perfectly** with tree-shaking enabled
2. ⚠️ **Demo bundle requires tree-shaking disabled** to preserve component registrations
3. ✅ **Both builds are optimized** for their specific use cases
4. ✅ **Component decorators work** in both builds
5. ✅ **All components are exported** and can be imported individually

---

## Related Files

- `rollup.config.mjs` - Main npm package build configuration
- `rollup.demo.config.mjs` - Standalone demo build configuration  
- `package.json` - Build scripts and npm configuration
- `src/index.ts` - Main entry point with component exports
- `index.html` - Demo page using standalone build
- `test-import.html` - Test page for npm package imports
