const newRules = [
	{
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	},
];

module.exports = {
	webpack: catalogWebpackConfig => {
		const modifiedConfig = { ...catalogWebpackConfig };
		modifiedConfig.module.rules[0].oneOf = modifiedConfig.module.rules[0].oneOf.unshift(
			...newRules,
		);
		return catalogWebpackConfig;
	},
};
