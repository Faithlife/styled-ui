const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	optimization: {
		nodeEnv: false,
		usedExports: true,
	},
	entry: {
		main: './index.js',
		'text-input': './components/text-input/index.js',
		'share-dialog': './components/share-dialog/index.js',
		icons12: './components/icons/12px/index.js',
		icons18: './components/icons/18px/index.js',
	},
	devtool: 'sourcemap',
	output: {
		filename: '[name].js',
		path: path.resolve('./dist'),
		libraryTarget: 'commonjs2',
		jsonpFunction: 'styledUIJsonp',
	},
	externals: [nodeExternals()],
	plugins: [],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: [/node_modules/],
			},
			{
				test: /\.(svg)$/,
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
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};
