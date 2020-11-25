const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pathToInlineSvg = path.resolve(__dirname, '../components/icons');

module.exports = {
	stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
	webpackFinal: async config => {
		const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
		fileLoaderRule.exclude = pathToInlineSvg;

		config.module.rules.push(
			...[
				{
					test: /\.scss?$/,
					use: ['css-loader', 'postcss-loader', 'sass-loader'],
					include: path.resolve(__dirname, '../'),
				},
				{
					test: /\.(svg)$/,
					include: pathToInlineSvg,
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
			],
		);

		// Return the altered config
		return config;
	},
};
