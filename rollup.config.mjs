import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import strip from '@rollup/plugin-strip';

export default {
  input: ['build/index.js'],
  output: {
    dir: 'dist/',
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    // minifyHTML(),
    terser(),
    strip({
      functions: ['console.log']
    })
  ]
};