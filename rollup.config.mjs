import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'build/index.js',
  treeshake: false, // Disable tree-shaking to ensure all components are included
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
    inlineDynamicImports: true
  },
  // Only external packages, NOT local files
  external: (id) => {
    // Keep lit packages as external
    if (id.startsWith('lit')) return true;
    // Bundle everything else (local files)
    return false;
  },
  plugins: [
    resolve({
      // Resolve local modules from the build directory
      moduleDirectories: ['build', 'node_modules']
    }),
    terser({
      compress: false, // Disable compression to preserve all code
      mangle: false // Don't mangle names
    })
  ]
};