import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		isEmail: 'src/isEmail.ts',
		isPhone: 'src/isPhone.ts',
		isStrongPassword: 'src/isStrongPassword.ts',
	},
	format: ['cjs', 'esm'],
	dts: true,
	splitting: true,
	clean: true,
	minify: true,
	treeshake: true,
	external: ['phone'],
});