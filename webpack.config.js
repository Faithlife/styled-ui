const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('es7-object-polyfill'); // jenkins needs this, it runs Node 6

module.exports = {
	optimization: {
		nodeEnv: false,
	},
	entry: {
		main: './index.js',
		grid: './components/grid/index.js',
		'text-input': './components/text-input/index.js',
		'text-input-v2': './components/text-input-v2/index.js',
		'group-selector': './components/group-selector/index.js',
		'share-dialog': './components/share-dialog/index.js',
		'product-drawer': './components/product-drawer/index.js',
	},
	devtool: 'sourcemap',
	output: {
		filename: '[name].js',
		path: path.resolve('./dist'),
		libraryTarget: 'commonjs2',
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
						loader: 'url-loader',
						options: {
							limit: 8192,
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [
									{ cleanupAttrs: true },
									{ removeDoctype: true },
									{ removeComments: true },
									{ removeMetadata: true },
									{ removeTitle: true },
									{ removeDesc: true },
									{ removeEditorsNSData: true },
									{ removeUselessStrokeAndFill: true },
									{ cleanupIDs: true },
									{ collapseGroups: true },
									{ convertShapeToPath: true },
								],
							},
						},
					},
					{
						loader: 'svg-colorize-loader',
						options: {
							color1: '#000000',
							color2: '#FFFFFF',
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
