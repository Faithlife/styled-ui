const extensions = ['.ts', '.tsx', '.js', '.json', '.jsx'];
const tsRule = {
	test: /\.(ts|tsx)$/,
	include: ['C:\\Code\\Styled-Ui', 'C:\\Code\\Styled-Ui\\catalog'],
	exclude: /node_modules/,
	loader: 'babel-loader',
	options: { babelrc: true, presets: [], cacheDirectory: true },
};

module.exports = {
	webpack: catalogWebpackConfig => {
		const modifiedConfig = { ...catalogWebpackConfig };
		modifiedConfig.resolve.extensions = extensions;
		modifiedConfig.module.rules[0].oneOf.splice(
			modifiedConfig.module.rules[0].oneOf.length - 2,
			0,
			tsRule,
		);

		return modifiedConfig;
	},
};
