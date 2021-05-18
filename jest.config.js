module.exports = {
	testEnvironment: 'jest-environment-jsdom',
	moduleNameMapper: {
		'\\.svg': require.resolve('./__mocks__/svgMock.js'),
	},
	testPathIgnorePatterns: ['/node_modules/'],
	testMatch: ['<rootDir>/**/*.test.{ts,tsx,js,jsx}'],
	setupFiles: ['core-js'],
	setupFilesAfterEnv: [
		'babel-polyfill',
		'@testing-library/jest-dom/extend-expect',
		'jest-axe/extend-expect',
	],
	moduleDirectories: ['node_modules', '*/node_modules'],
};
