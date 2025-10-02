# Column Loading Fix - October 1, 2025

## Problem
After configuring the kanban-board for npm package distribution with external Lit dependencies, the columns were not loading in the demo `index.html`. The kanban-board component rendered but showed a blank page with no columns.

## Root Causes

### Issue 1: Missing JSON Converter in Column Component
The `Column.ts` component's `items` property was defined as:
```typescript
@property({ type: Array, reflect: true })
items: KanbanItem[];
```

However, the parent component was passing items as a JSON string:
```typescript
items="${JSON.stringify(column.items)}"
```

Lit's default Array converter doesn't parse JSON strings, so `this.items` was undefined/empty.

**Fix:** Added a custom converter to parse JSON:
```typescript
@property({ 
  type: Array, 
  reflect: true,
  converter: {
    fromAttribute: (value: string | null) => {
      if (!value) return [];
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    },
    toAttribute: (value: KanbanItem[]) => {
      return JSON.stringify(value);
    }
  }
})
items: KanbanItem[];
```

### Issue 2: Tree-Shaking Removing Column Registration
When building the demo bundle with Rollup, the Column component's `@customElement("kanban-column")` decorator wasn't being executed because:
1. Side-effect import `import "./view/Column"` wasn't sufficient
2. Tree-shaking was removing the unused Column class from the bundle
3. Terser minification was further optimizing away "unused" code

**Fix Applied Two Solutions:**

1. **Changed import to explicit:**
```typescript
import Column from "./view/Column";
// Force Column to be included in bundle
void Column;
```

2. **Disabled tree-shaking in demo build:**
```javascript
// rollup.demo.config.mjs
export default {
  treeshake: false, // Disable tree-shaking
  plugins: [
    resolve(),
    terser({
      compress: {
        side_effects: false // Don't remove side-effect imports
      }
    })
  ]
};
```

## Solution Summary

### Files Modified

1. **src/view/Column.ts**
   - Added JSON converter to `items` property

2. **src/index.ts**
   - Changed from side-effect import to explicit import of Column
   - Added `void Column;` to ensure class is included in bundle

3. **rollup.demo.config.mjs**
   - Disabled tree-shaking for demo build
   - Configured Terser to preserve side-effect imports

### Build Configuration

- **NPM Package Build** (`dist/index.js`): Keeps Lit as external peer dependency - correct for npm distribution
- **Demo Build** (`dist/demo.js`): Bundles Lit and all dependencies - correct for standalone demo

## Testing

After applying fixes:
- ✅ Columns render correctly in browser
- ✅ All three columns (Todo, Doing, Done) visible
- ✅ Component registration working properly
- ✅ JSON data parsing working correctly

## Key Learnings

1. **Custom Converters Needed**: When passing complex data as HTML attributes, always provide custom converters
2. **Tree-Shaking Issues**: Decorator-based registration can be removed by tree-shaking if not careful
3. **Side-Effect Imports**: May not work reliably in bundled builds - prefer explicit imports
4. **Demo vs Package Builds**: Demo builds need different configuration than package builds
