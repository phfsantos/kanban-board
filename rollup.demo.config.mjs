import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
	input: 'build/index.js',
	treeshake: false, // Disable tree-shaking to ensure all components are included
	output: {
		file: 'dist/demo.js',
		format: 'esm',
		sourcemap: true
	},
	plugins: [
		resolve(), // This will bundle Lit into the output
		terser({
			compress: false, // Disable compression to preserve all code
			mangle: false // Don't mangle names
		})
	]
};
