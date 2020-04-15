const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	optimization: {
		nodeEnv: false,
	},
	entry: {
		main: './index.js',
		v6: './index-v6.js',
		'ag-grid': './components/grid/index.js',
		'text-input': './components/text-input/index.js',
		'text-input-v2': './components/text-input-v2/index.js',
		'group-selector': './components/group-selector/index.js',
		'share-dialog': './components/share-dialog/index.js',
		'product-drawer': './components/product-drawer/index.js',
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
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: [/node_modules/],
			},
			{
				test: /\.scss?$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
