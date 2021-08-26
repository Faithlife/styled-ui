const newRules = [
	{
		test: /\.svg$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					replaceAttrValues: {
						'#7A7A7A': '{props.color || "#7A7A7A"}',
						'#888': '{props.color || "#7A7A7A"}',
					},
				},
			},
		],
	},
];

module.exports = {
	webpack: catalogWebpackConfig => {
		const modifiedConfig = { ...catalogWebpackConfig };
		modifiedConfig.module.rules[0].oneOf.unshift(...newRules);
		modifiedConfig.plugins = catalogWebpackConfig.plugins.filter(
			x => x.constructor.name !== 'UglifyJsPlugin',
		);
		return modifiedConfig;
	},
};
