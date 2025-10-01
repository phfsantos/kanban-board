import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';

export default {
  input: ['build/index.js'],
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
    terser(),
    strip({
      functions: ['console.log']
    })
  ]
};