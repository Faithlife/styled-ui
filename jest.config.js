module.exports = {
	moduleNameMapper: {
		'\\.svg$': '<rootDir>/tests/__mocks__/svgrMock.js',
	},
	setupFiles: ['./tests/jest.setup.js'],
	testTimeout: 60000,
};
