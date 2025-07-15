import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/index.ts',
		isEmail: 'src/isEmail.ts',
		isPhone: 'src/isPhone.ts',
		isStrongPassword: 'src/isStrongPassword.ts',
		isUsername: 'src/isUsername.ts',
		isEqual: 'src/isEqual.ts',
		isCreditCard: 'src/isCreditCard.ts',
		isUrl: 'src/isUrl.ts',
		isDate: 'src/isDate.ts',
	},
	format: ['cjs', 'esm'],
	dts: true,
	splitting: true,
	clean: true,
	minify: true,
	treeshake: true,
	external: ['phone'],
});