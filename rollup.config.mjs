import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: ['build/index.js', 'build/controllers/kanban.js', 'build/view/Column.js', 'build/view/Item.js', 'build/view/DropZone.js'],
  treeshake: false, // Disable tree-shaking to ensure all components are included
  output: {
    dir: 'dist/',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'build'
  },
  external: ['lit', 'lit/decorators.js', 'lit/directives/class-map.js'],
  plugins: [
    resolve(),
    // minifyHTML(),
    terser({
      compress: false, // Disable compression to preserve all code
      mangle: false // Don't mangle names
    })
  ]
};