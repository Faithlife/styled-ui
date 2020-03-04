const path = require('path');

module.exports = {
	stories: ['../examples/**/*.story.(js|mdx)'],
	addons: [
		{
			name: '@storybook/addon-docs',
			options: {
				sourceLoaderOptions: {
					prettierConfig: { printWidth: 1000, singleQuote: true, tabWidth: 2 },
				},
			},
		},
		'@storybook/addon-actions',
		'@storybook/addon-knobs',
		'@storybook/addon-links',
		{
			name: '@storybook/preset-typescript',
			options: {
				transpileOnly: true,
				include: [path.resolve(__dirname, '../packages'), path.resolve(__dirname, '../examples')],
			},
		},
	],
};
